<script lang="ts">
  import { onMount } from "svelte"
  import { SHARJAH_COORDINATES } from "$lib/modules/constants"
  import mapboxgl from "mapbox-gl"
  import "mapbox-gl/dist/mapbox-gl.css"

  const center = { lat: 25.3463, lon: 55.4209 }
  let map: mapboxgl.Map

  mapboxgl.accessToken =
    "pk.eyJ1IjoicHdyc3R1ZGlvIiwiYSI6ImNsYnc5NmQzOTB2MWQzcW55ZzAyODRucG8ifQ.6RvyoY4e0kM10ABYxicjBg"

  //   function geocodeAddress(
  //     address: string,
  //     apiKey: string
  //   ): Promise<{ lat: number; lng: number }> {
  //     // Make a request to the Geocoding API to convert the address to coordinates
  //     const requestUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
  //       address
  //     )}&key=${apiKey}`
  //     return fetch(requestUrl)
  //       .then(response => response.json())
  //       .then(data => {
  //         if (data.status === "OK") {
  //           return data.results[0].geometry.location
  //         } else {
  //           console.log(address)
  //           console.log(data)
  //           throw new Error(data.error_message)
  //         }
  //       })
  //   }

  //   type Feature = {
  //     type: "Feature"
  //     properties: {
  //       title: string
  //       slug: string
  //     }
  //     geometry: {
  //       type: "Point"
  //       coordinates: [number, number]
  //     }
  //   }

  //   type FeatureCollection = {
  //     type: "FeatureCollection"
  //     features: Feature[]
  //   }

  //   function randomShiftCoordinate(
  //     coordinate: [number, number],
  //     shiftAmount: number
  //   ): [number, number] {
  //     // Generate random values for the latitude and longitude shift
  //     const latShift = (Math.random() * 2 - 1) * shiftAmount
  //     const lngShift = (Math.random() * 2 - 1) * shiftAmount

  //     // Add the shift values to the original coordinate
  //     const newLat = coordinate[1] + latShift
  //     const newLng = coordinate[0] + lngShift

  //     // Return the new coordinate as an array
  //     return [newLng, newLat]
  //   }

  //   async function generateGeoJson() {
  //     let geoJson: FeatureCollection = {
  //       type: "FeatureCollection",
  //       features: [],
  //     }

  //     $filteredPosts.forEach(p => {
  //       if (p.locationText_sve) {
  //         geocodeAddress(p.locationText_sve, GOOGLE_API_KEY)
  //           .then(coordinates => {
  //             console.log(coordinates)
  //             geoJson.features.push({
  //               type: "Feature",
  //               properties: {
  //                 title: p.title,
  //                 slug: p.slug.current ?? "",
  //               },
  //               geometry: {
  //                 type: "Point",
  //                 coordinates: randomShiftCoordinate(
  //                   [coordinates.lng, coordinates.lat],
  //                   0.0008
  //                 ),
  //               },
  //             })
  //           })
  //           .catch(error => {
  //             console.error(error)
  //           })
  //       }
  //     })

  //     return geoJson
  //   }

  onMount(async () => {
    map = new mapboxgl.Map({
      container: "map",
      center: SHARJAH_COORDINATES,
      zoom: 12,
      style: "mapbox://styles/mapbox/light-v11",
    })

    // const pointsGeoJson = await generateGeoJson()
    // console.log(pointsGeoJson)

    // map.on("load", () => {
    //   map.addSource("points", {
    //     type: "geojson",
    //     data: pointsGeoJson,
    //     cluster: true,
    //     clusterMaxZoom: 14, // Max zoom to cluster points on
    //     clusterRadius: 40, // Radius of each cluster when clustering points (defaults to 50)
    //   })
    //   map.addLayer({
    //     id: "clusters",
    //     type: "circle",
    //     source: "points",
    //     filter: ["has", "point_count"],
    //     paint: {
    //       "circle-color": [
    //         "step",
    //         ["get", "point_count"],
    //         "#000000",
    //         100,
    //         "#000000",
    //         750,
    //         "#000000",
    //       ],
    //       "circle-radius": [
    //         "step",
    //         ["get", "point_count"],
    //         20,
    //         100,
    //         30,
    //         750,
    //         40,
    //       ],
    //     },
    //   })
    //   map.addLayer({
    //     id: "cluster-count",
    //     type: "symbol",
    //     source: "points",
    //     filter: ["has", "point_count"],
    //     layout: {
    //       "text-field": ["get", "point_count_abbreviated"],
    //       "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
    //       "text-size": 12,
    //     },
    //     paint: {
    //       "text-color": "#ffffff",
    //     },
    //   })
    //   map.addLayer({
    //     id: "unclustered-point",
    //     type: "circle",
    //     source: "points",
    //     filter: ["!", ["has", "point_count"]],
    //     paint: {
    //       "circle-color": "#000000",
    //       "circle-radius": 14,
    //       "circle-stroke-width": 2,
    //       "circle-stroke-color": "#ffffff",
    //     },
    //   })
    // inspect a cluster on click
    //   map.on("click", "clusters", e => {
    //     const features = map.queryRenderedFeatures(e.point, {
    //       layers: ["clusters"],
    //     })
    //     const clusterId = features[0].properties.cluster_id
    //     map
    //       .getSource("points")
    //       .getClusterExpansionZoom(clusterId, (err, zoom) => {
    //         if (err) return
    //         map.easeTo({
    //           center: features[0].geometry.coordinates,
    //           zoom: zoom,
    //         })
    //       })
    //   })
    //   map.on("click", "unclustered-point", e => {
    //     const slug = e.features[0].properties.slug
    //     // goto($urlPrefix + "post/" + slug)
    //     activePost = $rawPosts.find(p => p.slug.current === slug)
    //   })
    //   map.on("mouseenter", "unclustered-point", () => {
    //     map.getCanvas().style.cursor = "pointer"
    //   })
    //   map.on("mouseleave", "unclustered-point", () => {
    //     map.getCanvas().style.cursor = ""
    //   })
    // })
  })
</script>

<div class="map" id="map" />

<style lang="scss">
  .map {
    mix-blend-mode: multiply;
    height: 100%;
    width: 100%;
  }

  //   :global(.marker) {
  //     width: 30px;
  //     height: 30px;
  //     background: var(--orange);
  //     border-radius: 50%;
  //     cursor: pointer;

  //     &:hover {
  //       opacity: 0.8;
  //     }
  //   }
</style>
