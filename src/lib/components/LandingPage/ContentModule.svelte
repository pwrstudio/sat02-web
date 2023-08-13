<script lang="ts">
  import type { Node } from "$lib/modules/types"
  import Tag from "../Tag.svelte"
  import { urlFor } from "$lib/modules/sanity"
  import has from "lodash/has.js"

  export let node: Node
  console.log(node)
</script>

<div class="module {node.bgColor || 'green'}">
  {#if node.post}
    <!-- META TOP -->
    <div class="meta-top">
      <!-- TYPE -->
      <Tag border={node.bgColor === "white"}>
        {node.post._type}
      </Tag>
      <!-- VENUE -->
      {#if has(node, "post.venues[0].title")}
        <Tag border={node.bgColor === "white"}>
          {node.post.venues[0].title}
        </Tag>
      {/if}
    </div>

    <!-- CONTENT -->
    <div class="content">
      <a href={node.post._type + "s/" + node.post.slug.current}>
        <!-- IMAGE -->
        {#if node.post.featuredImage}
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
        {/if}
        <!-- TITLE -->
        <h2>
          {node.post.title}
        </h2>
      </a>
    </div>

    <!-- META BOTTOM -->
    <div class="meta-bottom" />
  {/if}
</div>

<style lang="scss">
  @import "../../styles/responsive.scss";

  .module {
    min-height: var(--module-min-height);
    padding: var(--default-padding);
    display: flex;
    flex-direction: column;
    width: 100%;
    color: var(--white);
    flex-shrink: 2;
    flex-grow: 4;
    flex-basis: 1;
    overflow: hidden;

    &.white {
      background: var(--white);
      color: var(--black);
    }

    &.orange {
      background: var(--orange);
    }

    &.blue {
      background: var(--blue);
    }

    &.green {
      background: var(--green);
    }

    &.purple {
      background: var(--purple);
    }

    .meta-top {
      width: 100%;
      margin-bottom: var(--default-padding);
      display: flex;
      justify-content: space-between;
    }

    .content {
      line-height: 1.6em;
      height: 600px;

      .image-container {
        width: 600px;
        height: 400px;
        max-width: 100%;
        background: var(--grey);
        overflow: hidden;
        margin-bottom: var(--default-padding);

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          margin-bottom: var(--default-padding);
          mix-blend-mode: multiply;
        }
      }

      h2 {
        font-weight: normal;
        font-size: var(--font-size-large);
        margin: 0;
      }
    }
  }
</style>
