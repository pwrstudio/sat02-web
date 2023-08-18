<script lang="ts">
  import Map from "$lib/components/Map.svelte"
  export let data
  const { venues } = data
  console.log(venues)
</script>

<div class="map-container">
  <Map {venues} />
</div>

<style lang="scss">
  .map-container {
    height: 100vh;
    width: 100vw;
    position: relative;
    z-index: 1;
    background: var(--green);
  }
</style>
