<script lang="ts">
  import { createEventDispatcher } from "svelte"
  const dispatch = createEventDispatcher()

  export let sortOptions = [
    {
      value: "alphabetical",
      label: "Alphabetical",
    },
    {
      value: "newest",
      label: "Newest",
    },
    {
      value: "oldest",
      label: "Oldest",
    },
  ]

  let sortOrder = "alphabetical"
  let showImages = false
  let searchQuery = ""

  function setSortOrder() {
    console.log("sortOrder", sortOrder)
    dispatch("sort", sortOrder)
  }

  function setImageDisplay() {
    console.log("showImages", showImages)
    dispatch("images", showImages)
  }
</script>

<div class="listing-header">
  <div class="image-toggle">
    <input
      type="checkbox"
      id="images"
      name="images"
      bind:checked={showImages}
      on:change={setImageDisplay}
    />
    <label for="images">Show images</label>
  </div>
  <div class="sort">
    <select bind:value={sortOrder} on:change={setSortOrder}>
      {#each sortOptions as option}
        <option value={option.value}>{option.label}</option>
      {/each}
    </select>
  </div>
  <div class="search">Search</div>
</div>

<style lang="scss">
  .listing-header {
    display: flex;
    justify-content: space-between;
    padding: var(--default-padding);
    padding-top: 0;
    padding-bottom: var(--double-padding);
    padding-right: var(--double-padding);
    position: relative;
    z-index: var(--z-content);
  }
</style>
