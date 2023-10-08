<script lang="ts">
  import { urlFor } from "$lib/modules/sanity"
  export let post: any
</script>

<div class="image-container">
  <img
    src={urlFor(post.featuredImage)
      .width(300)
      .height(200)
      .saturation(-100)
      .auto("format")
      .quality(100)
      .url()}
    alt={post.title}
  />
</div>

<style lang="scss">
  //   @import "../../../../styles/responsive.scss";

  .image-container {
    width: 200px;
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
    }
  }
</style>
