<script lang="ts">
  import { languageStore } from "$lib/modules/stores"
  import { LANGUAGE, type Post } from "$lib/modules/types"
  import { ArabicTerms, EXHIBITION_STRANDS } from "$lib/modules/constants"
  import { COLOR } from "$lib/modules/types"
  import RoundTag from "../Elements/RoundTag.svelte"
  import { createEventDispatcher, onMount } from "svelte"
  import Matterport from "$lib/components/Matterport/Matterport.svelte"

  const dispatch = createEventDispatcher()
  export let posts: Post[] = [] as Post[]
  export let page: Post = {} as Post
  export let matterportLink: string | undefined = undefined
  export let color: COLOR = COLOR.ORANGE

  let showImages = false
  let filter = "all"
  let matterportOpen = false

  const toggleMatterport = () => {
    matterportOpen = !matterportOpen
  }

  function setImageDisplay() {
    dispatch("images", showImages)
  }

  function setFilter() {
    window.location.hash = filter
    dispatch("filter", filter)
  }

  onMount(() => {
    if (page?._id !== "projects-page") return

    filter = Object.keys(EXHIBITION_STRANDS).includes(
      window.location.hash.substring(1),
    )
      ? window.location.hash.substring(1)
      : "all"
    setFilter()
  })
</script>

{#if matterportLink && matterportOpen}
  <Matterport
    {matterportLink}
    title={page.title ?? ""}
    title_ar={page.title_ar ?? ""}
    on:close={toggleMatterport}
  />
{/if}

<div class="listing-header" style={"background:" + color + ";"}>
  <div class="left-side">
    <div class="title">
      <strong>
        {#if page._type == "venue"}
          PROJECTS
        {:else}
          {$languageStore == LANGUAGE.ENGLISH ? page.title : page.title_ar}
        {/if}
      </strong>
      <span class="counter">
        <RoundTag black={true} {color}>{posts.length}</RoundTag>
      </span>
    </div>
    <div
      class="image-toggle {page.slug?.current ?? ''} {LANGUAGE[$languageStore]}"
    >
      <label for="images">
        {$languageStore == LANGUAGE.ARABIC
          ? ArabicTerms.SHOW_IMAGES
          : "Show images"}
      </label>
      <input
        type="checkbox"
        id="images"
        name="images"
        bind:checked={showImages}
        on:change={setImageDisplay}
      />
    </div>
    <!-- MATTERPORT LINK -->
    {#if matterportLink}
      <button
        on:click={toggleMatterport}
        class="matterport-button {LANGUAGE[$languageStore]}"
      >
        {#if $languageStore === LANGUAGE.ARABIC}
          {ArabicTerms.OPEN_MATTERPORT}
        {:else}
          Open 3D tour
        {/if}
      </button>
    {/if}
    <!-- PROJECT FILTER  -->
    {#if page?._id === "projects-page"}
      <div class="filter {LANGUAGE[$languageStore]}">
        <select bind:value={filter} on:change={setFilter}>
          <option value="all">
            <span class="arrow-down">↓&nbsp;</span>
            {#if $languageStore === LANGUAGE.ARABIC}
              مواضيع المعرض الرئيسية
            {:else}
              All exhibition strands
            {/if}
          </option>
          {#each Object.entries(EXHIBITION_STRANDS) as [key, value]}
            <option value={key}>
              <span class="arrow-down">↓&nbsp;</span>
              {$languageStore === LANGUAGE.ARABIC ? value.ar : value.en}
            </option>
          {/each}
        </select>
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  @import "../../styles/responsive.scss";

  .listing-header {
    display: flex;
    justify-content: space-between;
    min-height: 100px;

    @include screen-size("phone") {
      font-size: var(--font-size-small);
      min-height: 60px;
    }

    .left-side {
      display: flex;
      padding: var(--default-padding);

      .title {
        text-transform: uppercase;
        margin-right: var(--double-padding);
        margin-right: 30px;
        z-index: var(--z-content);
        position: relative;

        @include screen-size("phone") {
          margin-right: var(--default-padding);
        }
      }

      .image-toggle {
        margin-right: var(--default-padding);
        display: flex;
        justify-content: center;
        z-index: var(--z-content);
        position: relative;

        &.ARABIC {
          margin-right: 30px;
        }

        @include screen-size("phone") {
          margin-right: var(--default-padding);
        }

        &.projects {
          @include screen-size("phone") {
            display: none;
          }
        }

        label {
          display: block;
          margin-right: 5px;
        }

        &.ARABIC {
          label {
            margin-left: 5px;
            margin-right: unset;
          }
        }
      }

      .filter {
        // margin-left: var(--default-padding);
        display: flex;
        z-index: var(--z-content);

        select {
          position: relative;
          top: 2px;
          font-family: var(--font-family);
          font-size: var(--font-size-small);
          outline: none;
          background: transparent;
          border: 1px solid var(--black);
          border-radius: 0;
          padding-right: 5px;
          padding-left: 5px;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          color: var(--black);
          height: 24px !important;
          box-sizing: border-box;
          position: relative;
          top: 1px;
          @include screen-size("phone") {
            top: -1px;
          }
        }

        &.ARABIC {
          margin-right: var(--double-padding);
        }
      }

      .matterport-button {
        border: 1px solid var(--black);
        background: transparent;
        z-index: var(--z-content);
        text-align: center;
        cursor: pointer;
        position: relative;
        user-select: none;
        font-size: var(--font-size-normal);
        font-family: var(--font-family);
        padding: 0;
        padding-inline: 1em;
        height: 24px;
        line-height: 20px;
        top: 1px;
        color: var(--black);
        font-size: 16.5px;

        @include screen-size("phone") {
          font-size: var(--font-size-small);
        }

        &.ARABIC {
          font-family: var(--font-family-arabic);
        }

        &:hover {
          background: var(--white-transparent);
        }
      }
    }
  }

  input[type="checkbox"] {
    box-sizing: border-box;
    -webkit-appearance: none;
    appearance: none;
    background-color: var(--form-background);
    margin: 0;
    font: inherit;
    color: currentColor;
    width: 22px;
    height: 22px;
    line-height: 0;
    border: none; /* Remove border */
    border-radius: 0; /* Remove border radius */
    display: grid;
    place-content: center;
    outline: 1px solid var(--black);
    cursor: pointer;
    position: relative;
    top: 2px;
    aspect-ratio: 1;
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

  .counter {
    @include screen-size("phone") {
      display: none;
    }
  }
</style>
