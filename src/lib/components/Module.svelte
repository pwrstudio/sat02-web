<script lang="ts">
  import Tag from "./Tag.svelte"
  import { urlFor } from "$lib/modules/sanity"
  export let bgcolor: "white" | "orange" | "blue" | "green" | "purple" = "white"
  export let width: "full" | "half" = "half"
  export let category: "project" | "event" | "participant"
  export let post: any
  console.log(post)
</script>

<div class="module {width} {bgcolor}">
  <!-- META TOP -->
  <div class="meta-top">
    <Tag>
      {post._type}
    </Tag>
    {#if post.venues && post.venues[0] && post.venues[0].title}
      <Tag>
        {post.venues[0].title}
      </Tag>
    {/if}
  </div>

  <!-- CONTENT -->
  <div class="content">
    <a href={category + "s/" + post.slug.current}>
      {#if post.processMedia && post.processMedia[0]}
        <img
          src={urlFor(post.processMedia[0])
            .width(500)
            .auto("format")
            .quality(100)
            .url()}
          alt={post.title}
        />
      {/if}

      <h2>
        {post.title}
      </h2>
    </a>
  </div>

  <!-- META BOTTOM -->
  <div class="meta-bottom" />
</div>

<style lang="scss">
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
