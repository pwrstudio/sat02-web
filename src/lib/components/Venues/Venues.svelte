<script lang="ts">
  import { fade } from "svelte/transition"
  import { COLOR } from "$lib/modules/types"
  import { onMount, tick } from "svelte"
  import Metadata from "$lib/components/Metadata/Metadata.svelte"
  import ListingItem from "$lib/components/Listing/ListingItem.svelte"
  import ListingHeader from "$lib/components/Listing/ListingHeader.svelte"
  import DecoVenues from "../Deco/DecoVenues.svelte"
  import Map from "$lib/components/Map/Map.svelte"

  export let posts: any[] = []
  export let page: any = {}

  const color = COLOR.PURPLE

  let showImages = false
  let activeItem = ""

  let height = 0

  const handleResize = async () => {
    await tick()
    height = document.body.scrollHeight
  }

  onMount(() => {
    handleResize()
    window.addEventListener("resize", handleResize)
  })
</script>

<!-- METADATA -->
<Metadata {page} />

<div class="deco-container" style={"height:" + height + "px;"}>
  <DecoVenues />
</div>

<div class="list-page">
  <!-- TEXT -->
  <div class="column text">
    <div class="map-container">
      <Map venues={posts} {activeItem} />
    </div>
  </div>

  <!-- LIST -->
  <div class="column list">
    <!-- LISTING -->
    <ListingHeader
      {page}
      {posts}
      {color}
      on:images={e => {
        showImages = e.detail
      }}
    />
    <div class="listing" in:fade={{ duration: 200, delay: 1000 }}>
      {#each posts as post, index}
        <ListingItem
          {post}
          {showImages}
          on:hoverstart={e => {
            activeItem = e.detail
          }}
          on:hoverend={e => {
            activeItem = ""
          }}
        />
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  @import "../../styles/responsive.scss";

  .list-page {
    display: flex;

    @include screen-size("phone") {
      flex-wrap: wrap;
    }

    .column {
      width: 50%;
      position: relative;

      @include screen-size("phone") {
        width: 100%;
      }

      &.list {
        background: var(--purple);
        padding-bottom: 200px;
        @include screen-size("phone") {
          padding-bottom: 60px;
        }
      }

      &.text {
        background: var(--green);
        padding-bottom: 200px;

        @include screen-size("phone") {
          min-height: 50vh;
          padding-bottom: 60px;
        }

        .inner {
          color: var(--white);
          font-size: var(--font-size-large);
          padding: var(--default-padding);
          line-height: 1.1em;
        }
      }
    }
  }

  .map-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--green);
  }

  .deco-container {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
