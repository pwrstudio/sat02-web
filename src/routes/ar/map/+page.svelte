<script lang="ts">
  // Set language
  import { LANGUAGE } from "$lib/modules/types"
  import { languageStore } from "$lib/modules/stores"
  languageStore.set(LANGUAGE.ARABIC)
  // ...
  import Map from "$lib/components/Map/Map.svelte"
  export let data
  const { venues } = data
</script>

<div class="map-container">
  <Map {venues} />
</div>

<style lang="scss">
  .map-container {
    height: 100vh;
    width: 100vw;
    position: relative;
    background: var(--green);
  }
</style>
