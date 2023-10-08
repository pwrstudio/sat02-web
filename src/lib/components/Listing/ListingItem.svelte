<script lang="ts">
  import Thumbnail from "./Thumbnail.svelte"
  export let post: any
  export let index: number
  export let showImages: boolean = false
  export let category: "participants" | "calendar" | "projects"

  console.log(post)
  console.log("showImages", showImages)
</script>

<a
  class="listing-item"
  class:images={showImages}
  class:even={index % 2 == 0}
  href={category + "/" + post.slug.current}
  data-sveltekit-preload-data
>
  <!-- IMAGE -->
  {#if showImages && post.featuredImage && post.featuredImage.asset}
    <div class="image">
      <Thumbnail {post} />
    </div>
  {/if}

  <!-- TITLE -->
  <a class="title" href={category + "/" + post.slug.current}>
    {post.title}
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
  }
</style>
