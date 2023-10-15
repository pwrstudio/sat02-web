<script lang="ts">
  import { createEventDispatcher } from "svelte"
  const dispatch = createEventDispatcher()
  import Select from "svelte-select"
  export let posts: any[] = []
  export let category: "participants" | "calendar" | "projects"

  const itemId = "id"
  const label = "title"

  // const items = [
  //   { id: 0, title: "Foo" },
  //   { id: 1, title: "Bar" },
  // ]

  // export let items = [
  //   {
  //     id: "title",
  //     title: "title",
  //   },
  //   {
  //     id: "participant",
  //     title: "Participant",
  //   },
  //   {
  //     id: "venue",
  //     title: "Venue",
  //   },
  // ]

  let sortOrder = "title"
  let showImages = false

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
  <div class="title"><strong>{category}</strong> ({posts.length})</div>
  <div class="image-toggle">
    <label for="images">Show images</label>
    <input
      type="checkbox"
      id="images"
      name="images"
      bind:checked={showImages}
      on:change={setImageDisplay}
    />
  </div>
</div>

<!-- <div class="order">
    <label for="order">Order by</label>
    <Select
      name="order"
      {items}
      {itemId}
      {label}
      searchable={false}
      showChevron={true}
      clearable={false}
      --border-radius="0"
      --width="200px"
    />
  </div> -->
<!-- <div class="search">Search</div> -->

<style lang="scss">
  .listing-header {
    display: flex;
    position: relative;
    z-index: var(--z-content);
    padding: var(--default-padding);

    .title {
      text-transform: uppercase;
      margin-right: 30px;
    }

    .image-toggle {
      margin-right: var(--double-padding);
      display: flex;
      label {
        display: block;
        margin-right: 5px;
      }
    }

    .order {
      display: flex;
      position: relative;
      z-index: var(--z-modal);
      label {
        margin-right: 10px;
      }
    }
  }

  input[type="checkbox"] {
    -webkit-appearance: none;
    appearance: none;
    background-color: var(--form-background);
    margin: 0;
    font: inherit;
    color: currentColor;
    width: 1em;
    height: 1em;
    border: none; /* Remove border */
    border-radius: 0; /* Remove border radius */
    display: grid;
    place-content: center;
    outline: 1px solid var(--black);
    cursor: pointer;
    position: relative;
    top: 3px;
  }

  input[type="checkbox"]::before {
    content: "";
    width: 0.5em;
    height: 0.5em;
    border-radius: 50%; /* Make it a circle */
    transform: scale(0);
    box-shadow: inset 1em 1em var(--form-control-color);
    background-color: CanvasText;
  }

  input[type="checkbox"]:checked::before {
    transform: scale(1);
  }

  input[type="checkbox"]:disabled {
    --form-control-color: var(--form-control-disabled);
    color: var(--form-control-disabled);
    cursor: not-allowed;
  }
</style>
