<script lang="ts">
  import { fade } from "svelte/transition"
  import ListingItem from "./ListingItem.svelte"
  import ListingHeader from "./ListingHeader.svelte"
  import { COLOR, type Post } from "$lib/modules/types"
  export let posts: Post[] = [] as Post[]
  export let page: Post = {} as Post
  export let color: COLOR = COLOR.ORANGE

  let filter = "all"
  let showImages = false

  const filterList = (posts: Post[], filter: string) =>
    posts.filter(post =>
      filter === "all" ? true : post.exhibitionStrand === filter,
    )

  $: filteredPosts = filterList(posts, filter)
</script>

<ListingHeader
  {page}
  posts={filteredPosts}
  {color}
  on:filter={e => {
    filter = e.detail
  }}
  on:images={e => {
    showImages = e.detail
  }}
/>

<div class="listing" in:fade={{ duration: 200, delay: 1000 }}>
  {#each filteredPosts as post}
    <ListingItem {post} {showImages} />
  {/each}
</div>
