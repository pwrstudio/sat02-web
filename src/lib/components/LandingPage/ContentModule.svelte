<script lang="ts">
  import type { Node } from "$lib/modules/types"
  import Tag from "../Tag.svelte"
  import { urlFor } from "$lib/modules/sanity"
  export let node: Node
  console.log(node)
</script>

<div class="module {node.bgColor || 'green'}">
  {#if node.post}
    <!-- META TOP -->
    <div class="meta-top">
      <Tag>
        {node.post._type}
      </Tag>
      {#if node.post.venues && node.post.venues[0] && node.post.venues[0].title}
        <Tag>
          {node.post.venues[0].title}
        </Tag>
      {/if}
    </div>

    <!-- CONTENT -->
    <div class="content">
      <!-- IMAGE -->
      <a href={node.post._type + "s/" + node.post.slug.current}>
        {#if node.post.processMedia && node.post.processMedia[0]}
          <img
            src={urlFor(node.post.processMedia[0])
              .width(500)
              .auto("format")
              .quality(100)
              .url()}
            alt={node.post.title}
          />
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
    min-height: 260px;
    padding: var(--default-padding);
    display: flex;
    flex-direction: column;
    width: 100%;
    color: var(--white);
    flex-shrink: 2;
    flex-grow: 2;
    flex-basis: 0;

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
      // background: yellow;
      width: 100%;
      margin-bottom: var(--default-padding);
      display: flex;
      justify-content: space-between;
    }

    .content {
      // background: red;
      line-height: 1.4em;
      height: 80%;

      img {
        max-width: 80%;
        max-height: 60%;
        margin-bottom: var(--default-padding);
      }

      h2 {
        font-weight: normal;
        font-size: var(--font-size-large);
        margin: 0;
      }
    }
  }
</style>
