<script lang="ts">
  import { urlFor } from "$lib/modules/sanity"
  export let post: any
  let imageLoaded: boolean = false
</script>

<div class="image-container">
  <img
    class:loaded={imageLoaded}
    src={urlFor(post.featuredImage)
      .width(300)
      .height(200)
      .saturation(-100)
      .auto("format")
      .quality(100)
      .url()}
    alt={post.title}
    on:load={() => (imageLoaded = true)}
  />
</div>

<style lang="scss">
  //   @import "../../../../styles/responsive.scss";

  .image-container {
    width: 160px;
    height: 160px;
    background: var(--grey);
    overflow: hidden;
    margin-bottom: var(--default-padding);
    position: relative;
    z-index: var(--z-content);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      margin-bottom: var(--default-padding);
      mix-blend-mode: multiply;
      position: relative;
      z-index: var(--z-content);
      opacity: 0;
      transition: opacity 0.2s ease-in;
      &.loaded {
        opacity: 1;
      }
    }
  }
</style>
