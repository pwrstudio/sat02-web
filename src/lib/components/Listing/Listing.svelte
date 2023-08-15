<script lang="ts">
  import ListingItem from "./ListingItem.svelte"
  export let posts: any[] = []
  export let category: "participants" | "calendar" | "projects"
</script>

<div class="listing">
  {#each posts as post}
    <ListingItem {post} {category} />
  {/each}
</div>
