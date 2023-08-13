<script lang="ts">
  import Map from "$lib/components/Map.svelte"
</script>

<div class="map-container">
  <Map />
</div>

<style lang="scss">
  .map-container {
    height: 100vh;
    width: 100vw;
    position: relative;
    z-index: 1;
    background: var(--orange);
  }
</style>
