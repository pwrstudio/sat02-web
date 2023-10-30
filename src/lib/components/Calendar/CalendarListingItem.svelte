<script lang="ts">
  import { languageStore } from "$lib/modules/stores"
  import { LANGUAGE } from "$lib/modules/types"
  import { formatTime } from "$lib/modules/date"
  import Thumbnail from "$lib/components/Listing/Thumbnail.svelte"
  export let post: any
  export let showImages: boolean = false
</script>

<a
  class="listing-item {post._type}"
  class:images={showImages}
  href={"/calendar/" + post.slug.current}
  data-sveltekit-preload-data
>
  <!-- DATE -->
  {#if post._type === "event"}
    <div class="date">{formatTime(post.dateTime)}</div>
  {/if}

  <!-- IMAGE -->
  {#if showImages && post.featuredImage && post.featuredImage.asset}
    <div class="image">
      <Thumbnail {post} />
    </div>
  {/if}

  <!-- TITLE -->
  <a class="title" href={"/calendar/" + post.slug.current}>
    {#if $languageStore == LANGUAGE.ENGLISH}→{/if}
    {post.title}
    {#if $languageStore == LANGUAGE.ARABIC}→{/if}
  </a>
</a>

<style lang="scss">
  .listing-item {
    display: flex;
    flex-wrap: wrap;
    min-height: 100px;
    width: 100%;
    padding: var(--default-padding);
    font-size: var(--font-size-normal);
    padding-bottom: 10px;
    border-top: 1px solid var(--black);
    background: var(--white);

    &:hover {
      background: var(--white-select);
    }

    .date {
      width: 80px;
      z-index: var(--z-content);
      position: relative;
    }

    .title {
      display: block;
      width: calc(100% - 80px);
      padding-right: 30px;
      font-weight: bold;
      z-index: var(--z-content);
      position: relative;
    }

    &.images {
      .image {
        width: 220px;
      }

      .title {
        width: calc(60% - 140px);
      }
    }
  }
</style>
