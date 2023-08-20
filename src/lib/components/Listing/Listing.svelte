<script lang="ts">
  import { fade } from "svelte/transition"
  import ListingItem from "./ListingItem.svelte"
  import ListingHeader from "./ListingHeader.svelte"
  export let posts: any[] = []
  export let category: "participants" | "calendar" | "projects"
</script>

<ListingHeader />

<div class="listing" in:fade={{ duration: 200, delay: 1000 }}>
  {#each posts as post, index}
    <ListingItem {post} {category} {index} />
  {/each}
</div>
