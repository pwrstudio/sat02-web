<script lang="ts">
  import { fade } from "svelte/transition"
  import ListingItem from "./ListingItem.svelte"
  import ListingHeader from "./ListingHeader.svelte"
  import DecoLineTwo from "../LandingPage/Deco/DecoLineTwo.svelte"
  import { renderBlockText } from "$lib/modules/sanity"
  import { languageStore } from "$lib/modules/stores"
  import { LANGUAGE, COLOR } from "$lib/modules/types"
  export let posts: any[] = []
  export let page: any = {}

  let sortOrder = "title"
  let showImages = false
</script>

<DecoLineTwo color={COLOR.GREY} />

<div class="list-page">
  <!-- TEXT -->
  <div class="column text">
    <div class="inner">
      {#if $languageStore == LANGUAGE.ARABIC}
        {#if page.content_ar}
          {@html renderBlockText(page.content_ar.content)}
        {/if}
      {:else if page.content}
        {@html renderBlockText(page.content.content)}
      {/if}
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
        <ListingItem {post} {index} {showImages} />
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  .list-page {
    display: flex;
    .column {
      width: 50%;

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
</style>
