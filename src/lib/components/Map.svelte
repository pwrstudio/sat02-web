<script lang="ts">
  import { onMount } from "svelte"
  import { goto } from "$app/navigation"
  import {
    MAPBOXGL_ACCESS_TOKEN,
    SHARJAH_COORDINATES,
    Al_QASIMIA_SCHOOL_COORDINATES,
    AL_JUBAIL_OLD_VEGETABLE_MARKET_COORDINATES,
  } from "$lib/modules/constants"
  // import singleDot from "$lib/assets/singleDot.svg"
  import mapboxgl from "mapbox-gl"
  import "mapbox-gl/dist/mapbox-gl.css"

  export let venues: any[] = []

  let map: mapboxgl.Map

  type Feature = {
    type: "Feature"
    properties: {
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

  onMount(async () => {
    // Construct feature collection
    for (const venue of venues) {
      pointsGeoJson.features.push({
        type: "Feature",
        properties: {
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
      // style: "mapbox://styles/mapbox/light-v11",
      style: "mapbox://styles/pwrstudio/clljm4fgz019d01pl73yighlc",
    })

    // map.on("load", () => {
    //   map.addSource("points", {
    //     type: "geojson",
    //     data: pointsGeoJson,
    //     cluster: true,
    //     clusterMaxZoom: 14,
    //     clusterRadius: 40,
    //   })

    //   console.log("singleDot", singleDot)
    //   map.loadImage(singleDot, (error, image) => {
    //     if (error) throw error
    //     map.addImage("custom-marker", image)

    //     map.addLayer({
    //       id: "unclustered-point",
    //       type: "symbol",
    //       source: "points",
    //       filter: ["!", ["has", "point_count"]],
    //       layout: {
    //         "icon-image": "custom-marker",
    //         "icon-size": 0.5, // adjust this value to change the size of the SVG
    //       },
    //     })

    //     map.on("click", "unclustered-point", e => {
    //       const slug = e.features[0].properties.slug
    //       window.alert(slug)
    //       goto("map/" + slug)
    //     })

    //     map.on("mouseenter", "unclustered-point", () => {
    //       map.getCanvas().style.cursor = "pointer"
    //     })

    //     map.on("mouseleave", "unclustered-point", () => {
    //       map.getCanvas().style.cursor = ""
    //     })
    //   })
    // })

    map.on("load", () => {
      map.addSource("points", {
        type: "geojson",
        data: pointsGeoJson,
        cluster: false,
        // clusterMaxZoom: 14, // Max zoom to cluster points on
        // clusterRadius: 40, // Radius of each cluster when clustering points (defaults to 50)
      })
      map.addLayer({
        id: "unclustered-point",
        type: "circle",
        source: "points",
        filter: ["!", ["has", "point_count"]],
        paint: {
          "circle-color": "#000000",
          "circle-radius": 14,
          "circle-stroke-width": 2,
          "circle-stroke-color": "#ffffff",
        },
      })
      map.on("click", "unclustered-point", e => {
        const slug = e.features[0].properties.slug
        goto("map/" + slug)
      })
      map.on("mouseenter", "unclustered-point", () => {
        map.getCanvas().style.cursor = "pointer"
      })
      map.on("mouseleave", "unclustered-point", () => {
        map.getCanvas().style.cursor = ""
      })
    })
  })
</script>

<div class="map" id="map" />

<style lang="scss">
  .map {
    mix-blend-mode: multiply;
    height: 100%;
    width: 100%;
  }
</style>
