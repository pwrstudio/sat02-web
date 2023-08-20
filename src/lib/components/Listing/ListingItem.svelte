<script lang="ts">
  export let post: any
  export let index: number
  export let category: "participants" | "calendar" | "projects"
</script>

<div class="listing-item" class:even={index % 2 == 0}>
  <!-- TITLE -->
  <a
    class="title"
    href={category + "/" + post.slug.current}
    data-sveltekit-preload-data
  >
    {post.title}
  </a>

  <!-- PARTICIPANTS -->
  {#if post.participants}
    <div class="participants">
      {#each post.participants as item}
        <div class="venues">{item.title}</div>
      {/each}
    </div>
  {/if}

  <!-- VENUES -->
  {#if post.venues}
    <div class="venues">
      {#each post.venues as item}
        <div class="venues">{item.title}</div>
      {/each}
    </div>
  {/if}
</div>

<style lang="scss">
  .listing-item {
    display: flex;
    flex-wrap: wrap;
    min-height: 100px;
    width: 100%;
    padding: var(--default-padding);
    padding-bottom: 10px;
    border-top: 1px solid var(--black);
    align-items: center;
    position: relative;
    z-index: var(--z-content);

    &.even {
      // background: var(--white);
    }

    .title {
      display: block;
      width: 40%;
    }

    .participants {
      display: block;
      width: 30%;
    }

    .venues {
      display: block;
      width: 30%;
    }
  }
</style>
