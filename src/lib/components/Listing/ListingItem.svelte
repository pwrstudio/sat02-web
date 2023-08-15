<script lang="ts">
  export let post: any
  export let category: "participants" | "calendar" | "projects"
</script>

<div class="listing-item">
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
    margin-bottom: 10px;
    border-top: 1px solid var(--black);
    align-items: center;

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
