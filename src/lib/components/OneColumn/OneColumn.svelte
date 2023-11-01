<script lang="ts">
  import { onMount } from "svelte"
  import { COLOR, LANGUAGE, type CircleGroup } from "$lib/modules/types"
  import {
    createNestedCircularPatternWithGroups,
    createAnimatedNestedCircularPatternWithDots,
  } from "$lib/modules/graphics"
  import { languageStore } from "$lib/modules/stores"
  import { fade } from "svelte/transition"
  import { renderBlockText } from "$lib/modules/sanity"

  import Metadata from "$lib/components/Metadata/Metadata.svelte"
  import ListingHeader from "../Listing/ListingHeader.svelte"
  import ListingItem from "../Listing/ListingItem.svelte"
  import DecoPageTwo from "$lib/components/Deco/DecoPageTwo.svelte"
  import PressKitForm from "../Elements/PressKitForm.svelte"
  import PageHeader from "../Elements/PageHeader.svelte"

  export let page: any
  export let pressReleases: any[] = []
  export let pressCoverage: any[] = []
  export let color: COLOR = COLOR.GREEN

  let showPressReleaseImages = false
  let showPressCoverageImages = false

  let height = 0
  let circularOneEl: HTMLDivElement

  onMount(() => {
    height = document.body.scrollHeight

    const circleGroups: CircleGroup[] = [
      {
        circleCount: 2,
        dotRadius: 10,
        baseDistance: 30,
        verticalShiftRange: 1,
        horizontalShiftRange: 1,
      },
      {
        circleCount: 10,
        dotRadius: 7,
        baseDistance: 30,
        verticalShiftRange: 1,
        horizontalShiftRange: 1,
      },
      {
        circleCount: 10,
        dotRadius: 15,
        baseDistance: 40,
        verticalShiftRange: 1,
        horizontalShiftRange: 1,
      },
    ]
    if (circularOneEl) {
      createNestedCircularPatternWithGroups(circularOneEl, circleGroups, color)
      // createAnimatedNestedCircularPatternWithDots(
      //   circularOneEl,
      //   circleGroups,
      //   color,
      //   1
      // )
    }
  })
</script>

<Metadata {page} />

<!-- DECO -->
<div class="deco-container" style={"height:" + height + "px;"}>
  {#if page._id === "press"}
    <DecoPageTwo />
  {/if}
  <!-- <DecoCircleTwo color={COLOR.GREY} /> -->
</div>

<PageHeader {page} />

<div class="page {page._type}" in:fade={{ duration: 200 }}>
  <!-- LEFT -->
  <div class="column text">
    <!-- CONTENT -->
    <div class="content">
      {#if $languageStore == LANGUAGE.ARABIC}
        <!-- ARABIC -->
        {#if page.content_ar}
          {@html renderBlockText(page.content_ar.content)}
        {/if}
        <!-- ENGLISH -->
      {:else if page.content}
        {@html renderBlockText(page.content.content)}
      {/if}
    </div>

    {#if page._id === "press"}
      <PressKitForm pressKitLink={page.pressKitLink} />
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
        {#each pressReleases as post}
          <ListingItem {post} showImages={showPressReleaseImages} />
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
        {#each pressCoverage as post}
          <ListingItem {post} showImages={showPressCoverageImages} />
        {/each}
      </div>
    {:else}
      <div class="pattern-container">
        <div bind:this={circularOneEl} />
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

  .pattern-container {
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: var(--z-index-content);
    overflow: hidden;

    div {
      position: relative;
      z-index: var(--z-index-content);
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

  .header {
    height: var(--header-height);
    position: relative;
    padding: var(--default-padding);
    padding-top: 5em;
    width: 100%;
    background: var(--green);
    color: var(--white);

    @include screen-size("phone") {
      height: unset;
    }

    h1,
    h2 {
      font-size: var(--font-size-xlarge);
      font-weight: normal;
      position: relative;
      z-index: var(--z-content);
      line-height: 1.1em;
      padding: 0;
      margin: 0;
      margin-bottom: 0.5em;

      @include screen-size("phone") {
        font-size: var(--font-size-large);
        line-height: 0.9em;
      }

      a {
        color: var(--white);
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }

    h2 {
      font-style: italic;
    }
  }
</style>
