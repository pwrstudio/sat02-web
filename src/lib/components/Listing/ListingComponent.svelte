<script lang="ts">
  import { fade } from "svelte/transition"
  import ListingItem from "./ListingItem.svelte"
  import ListingHeader from "./ListingHeader.svelte"
  import { COLOR, type Post } from "$lib/modules/types"
  export let posts: Post[] = [] as Post[]
  export let page: Post = {} as Post
  export let color: COLOR = COLOR.ORANGE

  let sortOrder = "title"
  let showImages = false
</script>

<ListingHeader
  {page}
  {posts}
  {color}
  on:sort={e => {
    sortOrder = e.detail
  }}
  on:images={e => {
    showImages = e.detail
  }}
/>

<div class="listing" in:fade={{ duration: 200, delay: 1000 }}>
  {#each posts as post, index}
    <ListingItem {post} {index} {showImages} />
  {/each}
</div>
