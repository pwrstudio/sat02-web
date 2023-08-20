<script lang="ts">
  import type { Node } from "$lib/modules/types"
  import { urlFor } from "$lib/modules/sanity"
  export let node: Node
</script>

<div class="image-container">
  <img
    src={urlFor(node.post.featuredImage)
      .width(700)
      .height(500)
      .saturation(-100)
      .auto("format")
      .quality(100)
      .url()}
    alt={node.post.title}
  />
</div>

<style lang="scss">
  @import "../../../styles/responsive.scss";

  .image-container {
    width: 600px;
    height: 400px;
    max-width: 100%;
    background: var(--grey);
    overflow: hidden;
    margin-bottom: var(--default-padding);
    // border-radius: 30px;
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
      //   border-radius: 30px;
    }
  }
</style>
