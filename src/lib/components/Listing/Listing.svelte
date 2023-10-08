<script lang="ts">
  import { fade } from "svelte/transition"
  import ListingItem from "./ListingItem.svelte"
  import ListingHeader from "./ListingHeader.svelte"
  export let posts: any[] = []
  export let category: "participants" | "calendar" | "projects"

  let sortOrder = "title"
  let showImages = false
</script>

<ListingHeader
  {category}
  {posts}
  on:sort={e => {
    sortOrder = e.detail
  }}
  on:images={e => {
    showImages = e.detail
  }}
/>

<div class="listing" in:fade={{ duration: 200, delay: 1000 }}>
  {#each posts as post, index}
    <ListingItem {post} {category} {index} {showImages} />
  {/each}
</div>
