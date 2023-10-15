<script lang="ts">
  import { LANGUAGE } from "$lib/modules/types"
  import { languageStore } from "$lib/modules/stores"
  import { fade } from "svelte/transition"
  import Map from "$lib/components/Map.svelte"
  //   import DecoPageTwo from "$lib/components/LandingPage/Deco/DecoPageTwo.svelte"
  import { onMount } from "svelte"
  export let venues: any

  let height = 0

  onMount(() => {
    height = document.body.scrollHeight
  })

  console.log("venues", venues)
</script>

<!-- DECO -->
<!-- <div class="deco-container" style={"height:" + height + "px;"}>
  <DecoPageTwo />
</div> -->

<div class="venues" in:fade={{ duration: 200 }}>
  <!-- LEFT -->
  <div class="column one">
    <div class="header">VENUES LIST</div>
    <div class="listing">
      {#each venues as venue, index (index)}
        <a href={"/venues/" + venue.slug.current} class="item">{venue.title}</a>
      {/each}
    </div>
  </div>
  <div class="column two">
    <div class="map-container">
      <Map {venues} />
    </div>
  </div>
</div>

<style lang="scss">
  @import "../../styles/responsive.scss";

  .venues {
    display: flex;

    @include screen-size("phone") {
      flex-wrap: wrap;
    }

    .column {
      width: 50%;
      @include screen-size("small") {
        width: 100%;
      }

      &.two {
        min-height: calc(100vh - 62px);
      }
    }
  }

  .map-container {
    width: 100%;
    height: 100%;
  }

  .deco-container {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
  }

  .listing {
    .item {
      display: block;
      padding: var(--default-padding);
    }
  }
</style>
