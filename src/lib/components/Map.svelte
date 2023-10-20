<script lang="ts">
  import { onMount } from "svelte"
  import { goto } from "$app/navigation"
  import {
    MAPBOXGL_ACCESS_TOKEN,
    Al_QASIMIA_SCHOOL_COORDINATES,
  } from "$lib/modules/constants"
  import mapboxgl from "mapbox-gl"
  import "mapbox-gl/dist/mapbox-gl.css"

  export let venues: any[] = []
  export let disableZoom: boolean = false
  export let activeItem = ""

  let map: mapboxgl.Map
  let markers: mapboxgl.Marker[] = []
  let popupVisible = false // To control the visibility of the custom popup
  let popupContent = "" // Content of the custom popup (venue's title)
  let popupX = "0px" // x-coordinate of the custom popup
  let popupY = "0px" // y-coordinate of the custom popup

  onMount(async () => {
    map = new mapboxgl.Map({
      container: "map",
      accessToken: MAPBOXGL_ACCESS_TOKEN,
      center: Al_QASIMIA_SCHOOL_COORDINATES,
      zoom: 13.5,
      style: "mapbox://styles/mapbox/light-v11",
      scrollZoom: !disableZoom,
    })

    map.on("load", () => {
      for (const venue of venues) {
        const element = document.createElement("div")
        element.className = "venue-marker"
        if (venue._id === activeItem) {
          element.classList.add("active")
        }

        const marker = new mapboxgl.Marker(element)
          .setLngLat([venue.location.lng, venue.location.lat])
          .addTo(map)

        element.addEventListener("click", () => {
          goto("map/" + venue.slug.current)
        })

        element.addEventListener("mouseenter", e => {
          // Get the venue's title from the feature properties.
          popupContent = venue.title

          // Get the x, y coordinates of the mouse over the map
          let coordinates = [venue.location.lng, venue.location.lat]
          let position = map.project(coordinates)

          popupX = position.x + 10 + "px"
          popupY = position.y - 50 + "px"

          popupVisible = true
        })

        element.addEventListener("mouseleave", e => {
          popupVisible = false
          popupContent = ""
        })

        markers.push(marker)
      }
    })
  })

  $: if (map) {
    markers.forEach((marker, index) => {
      if (activeItem === venues[index]._id) {
        marker.getElement().classList.add("active")
      } else {
        marker.getElement().classList.remove("active")
      }
    })
  }
</script>

<div class="map" id="map" />

<!-- The custom popup div -->
<div
  class="custom-popup"
  style="top: {popupY}; left: {popupX}; display: {popupVisible
    ? 'block'
    : 'none'};"
>
  {popupContent}
</div>

<style lang="scss">
  .map {
    mix-blend-mode: multiply;
    height: 100%;
    width: 100%;
  }

  :global(.venue-marker) {
    background-color: #000000;
    border: 2px solid #ffffff;
    border-radius: 50%;
    width: 35px;
    height: 35px;
    cursor: pointer;
  }

  :global(.venue-marker.active) {
    background-color: #ffffff;
    border-color: #000000;
  }

  .custom-popup {
    position: absolute;
    background-color: white;
    padding: 5px 10px;
    z-index: 1000;
    pointer-events: none; // Make sure this doesn't interfere with map interactions
  }
</style>
