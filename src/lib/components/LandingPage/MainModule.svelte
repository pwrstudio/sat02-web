<script lang="ts">
  import Tag from "../Tag.svelte"
  import { urlFor } from "$lib/modules/sanity"
  import type { FrontpagePost } from "$lib/modules/types"
  export let post: FrontpagePost
</script>

<div class="module {post.width} {post.bgColor}">
  <!-- META TOP -->
  <div class="meta-top">
    <Tag>
      {post.category}
    </Tag>
    {#if post.post.venues && post.post.venues[0] && post.post.venues[0].title}
      <Tag>
        {post.post.venues[0].title}
      </Tag>
    {/if}
  </div>

  <!-- CONTENT -->
  <div class="content">
    <a href={post.category + "s/" + post.post.slug.current}>
      {#if post.post.processMedia && post.post.processMedia[0]}
        <img
          src={urlFor(post.post.processMedia[0])
            .width(500)
            .auto("format")
            .quality(100)
            .url()}
          alt={post.post.title}
        />
      {/if}

      <h2>
        {post.post.title}
      </h2>
    </a>
  </div>

  <!-- META BOTTOM -->
  <div class="meta-bottom" />
</div>

<style lang="scss">
  @import "../../styles/responsive.scss";

  .module {
    height: 500px;
    padding: var(--default-padding);
    display: flex;
    flex-direction: column;

    &.white {
      background: var(--white);
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

    &.full {
      width: 100%;
    }

    &.half {
      width: 50%;

      @include screen-size("phone") {
        width: 100%;
      }
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
      color: var(--white);
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
