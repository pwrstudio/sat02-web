<script lang="ts">
  import { languageStore } from "$lib/modules/stores"
  import { LANGUAGE } from "$lib/modules/types"
  import { formatTime } from "$lib/modules/date"
  import Thumbnail from "./Thumbnail.svelte"
  export let post: any
  export let index: number
  export let showImages: boolean = false

  const getPath = (post: any) => {
    switch (post._type) {
      case "event":
        return "/calendar"
      case "storeItem":
        return "/design-store"
      case "fieldNote":
        return "/field-notes"
      case "project":
        return "/projects"
      case "participant":
        return "/participants"
      case "venue":
        return "/venues"
      default:
        return ""
    }
  }

  const href = getPath(post) + "/" + post.slug.current
</script>

<a
  class="listing-item {post._type}"
  class:images={showImages}
  {href}
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
  <a class="title" {href}>
    {#if $languageStore == LANGUAGE.ENGLISH}→{/if}
    {post.title}
    {#if $languageStore == LANGUAGE.ARABIC}→{/if}
  </a>

  <!-- PARTICIPANTS -->
  {#if post.participants}
    <div class="participants">
      {#each post.participants as item}
        <div>{item.title}</div>
      {/each}
    </div>
  {/if}

  <!-- VENUES -->
  <!-- {#if post.venues}
    <div class="venues">
      {#each post.venues as item}
        <div>{item.title}</div>
      {/each}
    </div>
  {/if} -->
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
    // align-items: center;
    // position: relative;

    &:first-child {
      border-top: none;
    }

    &:hover {
      background: var(--white-select);
    }

    .title {
      display: block;
      padding-right: 30px;
      font-weight: bold;
      z-index: var(--z-content);
      position: relative;
      width: 60%;
    }

    .participants {
      display: block;
      width: 40%;
      padding-right: 30px;
      font-style: italic;
      z-index: var(--z-content);
      position: relative;
    }

    // .venues {
    //   display: block;
    //   width: 20%;
    //   padding-right: 30px;
    //   z-index: var(--z-content);
    //   position: relative;
    //   font-size: var(--font-size-small);
    // }

    &.images {
      .image {
        width: 180px;
        z-index: var(--z-content);
        position: relative;
      }

      .title {
        width: calc(60% - 90px);
      }

      .participants {
        width: calc(40% - 90px);
      }
    }
  }
</style>
