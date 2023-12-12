<script lang="ts">
  import { createEventDispatcher } from "svelte"
  import { languageStore } from "$lib/modules/stores"
  import { urlPrefix } from "$lib/modules/stores"
  import { LANGUAGE } from "$lib/modules/types"
  import { formatTime } from "$lib/modules/date"
  import Thumbnail from "./Thumbnail.svelte"
  export let post: any
  export let showImages: boolean = false
  export let activeItem = ""

  const dispatch = createEventDispatcher()

  const getPath = (post: any) => {
    switch (post._type) {
      case "event":
        return "calendar"
      case "storeItem":
        return "design-store"
      case "fieldNote":
        return "field-notes"
      case "project":
        return "projects"
      case "participant":
        return "participants"
      case "venue":
        return "venues"
      default:
        return ""
    }
  }

  const getUrl = () => {
    if (post._type == "pressCoverage" || post._type == "pressRelease") {
      if (post.targetType === "link") {
        return post.link
      } else if (post.targetType === "pdf") {
        return $languageStore == LANGUAGE.ARABIC
          ? post.pdf_ar_url
          : post.pdf_url
      } else {
        return ""
      }
    } else {
      return getPath(post) + "/" + post.slug.current
    }
  }

  $: pdfUrl = $languageStore == LANGUAGE.ARABIC ? post.pdf_ar_url : post.pdf_url

  const isPressRelease = post._type == "pressRelease"
  const isPressCoverage = post._type == "pressCoverage"
  const isPress = isPressRelease || isPressCoverage
</script>

<a
  class="listing-item {post._type}"
  class:images={showImages && post.featuredImage && post.featuredImage.asset}
  class:active={activeItem === post._id}
  href={isPressRelease
    ? pdfUrl
    : (isPressCoverage ? "" : $urlPrefix) + getUrl()}
  target={isPress ? "_blank" : "_self"}
  data-sveltekit-preload-data
  on:mouseenter={() => {
    dispatch("hoverstart", post._id)
  }}
  on:mouseleave={() => {
    dispatch("hoverend")
  }}
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
  <div class="title">
    {#if $languageStore == LANGUAGE.ENGLISH}→{/if}
    {#if $languageStore == LANGUAGE.ARABIC}←{/if}
    {$languageStore == LANGUAGE.ENGLISH ? post.title : post.title_ar}
  </div>

  <!-- PARTICIPANTS -->
  {#if post.participants}
    <div class="participants">
      {#each post.participants as item}
        <div>{item.title}</div>
      {/each}
    </div>
  {/if}

  <!-- PUBLICATION -->
  {#if post.publication}
    <div class="publication">
      <div>{post.publication}</div>
    </div>
  {/if}

  <!-- OPENING HOURS -->
  {#if post.openingHours}
    <div class="opening-hours">
      <pre>{post.openingHours}</pre>
    </div>
  {/if}
</a>

<style lang="scss">
  @import "../../styles/responsive.scss";

  :global(.opening-hours pre) {
    display: block;
    font-size: var(--font-size-normal);
    font-family: var(--font-family);
  }

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

    &.active {
      background: var(--white-select);
    }

    &:first-child {
      border-top: none;
    }

    &:hover {
      background: var(--white-select);
    }

    .title {
      display: block;
      padding-right: 20px;
      font-weight: bold;
      z-index: var(--z-content);
      position: relative;
      width: 60%;
    }

    .participants {
      display: block;
      width: 40%;
      padding-right: 20px;
      font-style: italic;
      z-index: var(--z-content);
      position: relative;
    }

    &.images {
      .image {
        width: 180px;
        z-index: var(--z-content);
        position: relative;
      }

      .title {
        width: calc(60% - 90px);
        @include screen-size("phone") {
          width: calc(100% - 180px);
        }
      }

      .participants {
        width: calc(40% - 90px);
        @include screen-size("phone") {
          display: none;
        }
      }
    }
  }
</style>
