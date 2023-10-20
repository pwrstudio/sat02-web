<script lang="ts">
  import { fade } from "svelte/transition"
  import ListingItem from "$lib/components/Listing/ListingItem.svelte"
  import ListingHeader from "$lib/components/Listing/ListingHeader.svelte"
  import DecoLineTwo from "../Deco/DecoLineTwo.svelte"
  import Map from "$lib/components/Map.svelte"
  export let posts: any[] = []
  export let page: any = {}

  let sortOrder = "title"
  let showImages = false
  let activeItem = ""
</script>

<DecoLineTwo />

<div class="list-page">
  <!-- TEXT -->
  <div class="column text">
    <div class="map-container">
      <Map venues={posts} {activeItem} />
    </div>
  </div>

  <!-- LIST -->
  <div class="column list">
    <ListingHeader
      {page}
      {posts}
      on:sort={e => {
        sortOrder = e.detail
      }}
      on:images={e => {
        showImages = e.detail
      }}
    />
    <div class="listing" in:fade={{ duration: 200, delay: 1000 }}>
      {#each posts as post, index}
        <ListingItem
          {post}
          {index}
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
        background: var(--orange);
        padding-bottom: 200px;
      }

      &.text {
        background: var(--green);
        padding-bottom: 200px;

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
</style>
