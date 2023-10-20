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
  let popupElement: HTMLDivElement
  let popupVisible = false // To control the visibility of the custom popup
  let popupContent = "" // Content of the custom popup (venue's title)
  let popupX = "0px" // x-coordinate of the custom popup
  let popupY = "0px" // y-coordinate of the custom popup

  type Feature = {
    type: "Feature"
    properties: {
      id: string
      title: string
      slug: string
    }
    geometry: {
      type: "Point"
      coordinates: [number, number]
    }
  }

  type FeatureCollection = {
    type: "FeatureCollection"
    features: Feature[]
  }

  let pointsGeoJson: FeatureCollection = {
    type: "FeatureCollection",
    features: [],
  }

  // Watch for changes in activeItem and update map style
  $: {
    if (map && map.isStyleLoaded()) {
      // When activeItem has a value, update the style to highlight the active venue
      if (activeItem) {
        map.setPaintProperty("unclustered-point", "circle-color", [
          "case",
          ["==", ["get", "id"], activeItem],
          "#ffffff", // Color for active item
          "#000000", // Color for non-active items
        ])
        map.setPaintProperty("unclustered-point", "circle-stroke-color", [
          "case",
          ["==", ["get", "id"], activeItem],
          "#000000", // Color for active item
          "#ffffff", // Color for non-active items
        ])
      } else {
        // Reset the style to default when activeItem is an empty string
        map.setPaintProperty("unclustered-point", "circle-color", "#000000")
        map.setPaintProperty(
          "unclustered-point",
          "circle-stroke-color",
          "#ffffff"
        )
      }
    }
  }

  onMount(async () => {
    // Construct feature collection
    for (const venue of venues) {
      pointsGeoJson.features.push({
        type: "Feature",
        properties: {
          id: venue._id,
          title: venue.title,
          slug: venue.slug.current,
        },
        geometry: {
          type: "Point",
          coordinates: [venue.location.lng, venue.location.lat],
        },
      })
    }

    map = new mapboxgl.Map({
      container: "map",
      accessToken: MAPBOXGL_ACCESS_TOKEN,
      center: Al_QASIMIA_SCHOOL_COORDINATES,
      zoom: 13.5,
      style: "mapbox://styles/mapbox/light-v11",
      scrollZoom: !disableZoom,
    })

    map.on("load", () => {
      // Add venues
      map.addSource("points", {
        type: "geojson",
        data: pointsGeoJson,
        cluster: false,
      })

      // Add venue layer
      map.addLayer({
        id: "unclustered-point",
        type: "circle",
        source: "points",
        filter: ["!", ["has", "point_count"]],
        paint: {
          "circle-color": [
            "case",
            ["==", ["get", "id"], activeItem], // Check if venue id matches the activeItem
            "#666666",
            "#000000", // Color for non-active items
          ],
          "circle-radius": 14,
          "circle-stroke-width": 2,
          "circle-stroke-color": [
            "case",
            ["==", ["get", "id"], activeItem], // Check if venue id matches the activeItem
            "#000000",
            "#ffffff", // Color for non-active items
          ],
        },
      })

      map.on("click", "unclustered-point", e => {
        const slug = e.features[0].properties.slug
        goto("map/" + slug)
      })

      map.on("mouseenter", "unclustered-point", e => {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = "pointer"

        // Get the venue's title from the feature properties.
        let title = e.features[0].properties.title
        popupContent = title

        // Get the x, y coordinates of the mouse over the map
        let coordinates = e.features[0].geometry.coordinates.slice()
        let position = map.project(coordinates)

        popupX = position.x + "px"
        popupY = position.y + "px"

        popupVisible = true
      })

      map.on("mouseleave", "unclustered-point", e => {
        map.getCanvas().style.cursor = ""
        popupVisible = false
        popupContent = ""
      })
    })
  })
</script>

<div class="map" id="map" />

<!-- The custom popup div -->
<div
  bind:this={popupElement}
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

  .custom-popup {
    position: absolute;
    background-color: white;
    padding: 5px 10px;
    // border: 1px solid black;
    // border-radius: 3px;
    z-index: 1000;
    pointer-events: none; // Make sure this doesn't interfere with map interactions
  }
</style>
