<script lang="ts">
  import type { Node } from "$lib/modules/types"
  import { urlFor } from "$lib/modules/sanity"
  export let node: Node
  let imageLoaded: boolean = true
</script>

{#if node.post?.featuredImage && node.post.featuredImage.asset}
  <div class="image-container">
    <img
      class:loaded={imageLoaded}
      src={urlFor(node.post.featuredImage)
        .width(700)
        .height(500)
        .saturation(-100)
        .auto("format")
        .quality(100)
        .url()}
      alt={node.post.title}
      on:load={() => (imageLoaded = true)}
    />
  </div>
{/if}

<style lang="scss">
  @import "../../../styles/responsive.scss";

  .image-container {
    width: 600px;
    height: 400px;
    max-width: 90%;
    background: var(--grey);
    overflow: hidden;
    margin-bottom: var(--default-padding);
    position: relative;
    z-index: var(--z-content);
    outline: 0;

    &:hover {
      outline: 2px solid var(--white-transparent);
    }

    @include screen-size("small") {
      width: 100%;
      height: auto;
      max-width: unset;
      background: unset;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      margin-bottom: var(--default-padding);
      mix-blend-mode: multiply;
      position: relative;
      z-index: var(--z-content);
      opacity: 0;

      &.loaded {
        opacity: 1;
      }
    }
  }
</style>
