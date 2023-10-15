<script lang="ts">
  import { languageStore } from "$lib/modules/stores"
  import { LANGUAGE } from "$lib/modules/types"
  import { formatTime } from "$lib/modules/date"
  import Thumbnail from "./Thumbnail.svelte"
  export let post: any
  export let index: number
  export let showImages: boolean = false
  export let category: "participants" | "calendar" | "projects"

  console.log(post)
  console.log("showImages", showImages)
</script>

<a
  class="listing-item {post._type}"
  class:images={showImages}
  href={category + "/" + post.slug.current}
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
  <a class="title" href={category + "/" + post.slug.current}>
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
  {#if post.venues}
    <div class="venues">
      {#each post.venues as item}
        <div>{item.title}</div>
      {/each}
    </div>
  {/if}
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
    // align-items: center;
    // position: relative;

    &:hover {
      background: var(--white-select);
    }

    .title {
      display: block;
      width: 40%;
      padding-right: 30px;
      font-weight: bold;
      z-index: var(--z-content);
      position: relative;
    }

    .participants {
      display: block;
      width: 40%;
      padding-right: 30px;
      font-style: italic;
      z-index: var(--z-content);
      position: relative;
    }

    .venues {
      display: block;
      width: 20%;
      padding-right: 30px;
      z-index: var(--z-content);
      position: relative;
    }

    &.images {
      .image {
        width: 20%;
        z-index: var(--z-content);
        position: relative;
      }

      .title {
        // padding-top: 60px;
        width: 30%;
      }

      .participants {
        // padding-top: 60px;
        width: 30%;
      }

      .venues {
        // padding-top: 60px;
        width: 20%;
      }
    }

    &.event {
      .date {
        width: 20%;
      }
      .title {
        width: 30%;
      }

      .participants {
        width: 30%;
      }

      .venues {
        width: 20%;
      }

      &.images {
        .date {
          width: 10%;
        }

        .image {
          width: 20%;
        }

        .title {
          width: 30%;
        }

        .participants {
          width: 30%;
        }

        .venues {
          // padding-top: 60px;
          width: 10%;
        }
      }
    }
  }
</style>
