<script lang="ts">
  import { COLOR, LANGUAGE } from "$lib/modules/types"
  import { languageStore } from "$lib/modules/stores"
  import { fade } from "svelte/transition"
  import { renderBlockText } from "$lib/modules/sanity"

  import ListingHeader from "../Listing/ListingHeader.svelte"
  import ListingItem from "../Listing/ListingItem.svelte"

  import PlaceholderText from "$lib/components/Page/PlaceholderText.svelte"
  import DecoPageTwo from "$lib/components/LandingPage/Deco/DecoPageTwo.svelte"
  import DecoCircleTwo from "../LandingPage/Deco/DecoCircleTwo.svelte"
  import { onMount } from "svelte"
  export let page: any
  export let pressReleases: any[] = []
  export let pressCoverage: any[] = []
  let showPressReleaseImages = false
  let showPressCoverageImages = false

  let height = 0

  onMount(() => {
    height = document.body.scrollHeight
  })
</script>

<!-- DECO -->
<div class="deco-container" style={"height:" + height + "px;"}>
  <DecoPageTwo />
  <!-- <DecoCircleTwo color={COLOR.GREY} /> -->
</div>

<div class="page {page._type}" in:fade={{ duration: 200 }}>
  <!-- LEFT -->
  <div class="column text">
    <!-- CONTENT -->
    <div class="content">
      {#if $languageStore == LANGUAGE.ARABIC}
        <!-- ARABIC -->
        {#if page.content_ar}
          {@html renderBlockText(page.content_ar.content)}
        {:else}
          <PlaceholderText />
        {/if}
        <!-- ENGLISH -->
      {:else if page.content}
        {@html renderBlockText(page.content.content)}
      {:else}
        <PlaceholderText />
      {/if}
    </div>

    {#if page._id === "press"}
      <div class="press-kit">
        <a
          href="https://www.sharjaharchitecture.org/pages/media/press-kit"
          target="_blank"
        >
          Request press kit
        </a>
      </div>
    {/if}
  </div>

  <div class="column list">
    {#if page._id === "press"}
      <!-- PRESS RELEASES -->
      <ListingHeader
        page={{ title: "Press Releases" }}
        posts={pressReleases}
        on:images={e => {
          showPressReleaseImages = e.detail
        }}
      />
      <div class="listing" in:fade={{ duration: 200, delay: 1000 }}>
        {#each pressReleases as post, index}
          <ListingItem {post} {index} showImages={showPressReleaseImages} />
        {/each}
      </div>
      <!-- PRESS COVERAGE -->
      <ListingHeader
        page={{ title: "Press Coverage" }}
        posts={pressCoverage}
        on:images={e => {
          showPressCoverageImages = e.detail
        }}
      />
      <div class="listing" in:fade={{ duration: 200, delay: 1000 }}>
        {#each pressCoverage as post, index}
          <ListingItem {post} {index} showImages={showPressCoverageImages} />
        {/each}
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  @import "../../styles/responsive.scss";

  .page {
    display: flex;
    min-height: 100vh;

    @include screen-size("phone") {
      flex-wrap: wrap;
    }

    .column {
      width: 50%;

      @include screen-size("small") {
        width: 100%;
      }

      &.list {
        background: var(--orange);
        padding-bottom: 200px;
      }

      &.text {
        background: var(--green);
        padding-bottom: 200px;
        color: var(--white);
        padding: var(--default-padding);
      }
    }
  }

  .deco-container {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .content {
    position: relative;
    z-index: var(--z-index-content);
  }

  .press-kit {
    position: relative;
    z-index: var(--z-index-content);

    a {
      display: inline-block;
      margin-top: 2em;
      padding: var(--default-padding);
      background: var(--white);
      color: var(--black);

      &:hover {
        background: var(--orange);
        color: var(--white);
      }
    }
  }
</style>
