<script lang="ts">
  import { urlFor } from "$lib/modules/sanity"
  export let bgcolor: "white" | "orange" | "blue" | "green" | "purple" = "white"
  export let width: "full" | "half" = "half"
  export let post: any
</script>

<div class="module {width} {bgcolor}">
  <h2>
    {post.title}
  </h2>

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
</div>

<style lang="scss">
  .module {
    height: 500px;
    padding: var(--default-padding);

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

    img {
      max-width: 80%;
      max-height: 80%;
    }
  }
</style>
