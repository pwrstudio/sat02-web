<script lang="ts">
  import { onMount } from "svelte"
  import { renderBlockText } from "$lib/modules/sanity"
  import { languageStore } from "$lib/modules/stores"
  import { LANGUAGE, COLOR } from "$lib/modules/types"

  import Metadata from "$lib/components/Metadata/Metadata.svelte"
  import ListingComponent from "./ListingComponent.svelte"
  import DecoLineTwo from "../Deco/DecoLineTwo.svelte"
  import TitleHeader from "../Elements/TitleHeader.svelte"
  import SlideshowHeader from "../Elements/SlideshowHeader.svelte"

  export let posts: any[] = []
  export let page: any = {}

  let height = 0

  const handleResize = () => {
    height = document.body.scrollHeight
  }

  onMount(() => {
    handleResize()
    window.addEventListener("resize", handleResize)
  })
</script>

<!-- METADATA -->
<Metadata {page} />

<div class="deco-container" style={"height:" + height + "px;"}>
  <!-- <DecoLineTwo color={COLOR.GREY} /> -->
</div>

<div class="list-page">
  <!-- TEXT -->
  <div class="column text">
    <!-- HEADER: TITLE -->
    <TitleHeader {page} />
    <div class="inner">
      {#if $languageStore == LANGUAGE.ARABIC}
        {#if page.content_ar}
          {@html renderBlockText(page.content_ar.content)}
        {/if}
      {:else if page.content}
        {@html renderBlockText(page.content.content)}
      {/if}
    </div>
  </div>

  <!-- LIST -->
  <div class="column list">
    <!-- HEADER: SLIDESHOW -->
    <SlideshowHeader {page} />
    <!-- LISTING COMPONENT -->
    <ListingComponent {posts} {page} />
  </div>
</div>

<style lang="scss">
  @import "../../styles/responsive.scss";

  .list-page {
    display: flex;

    min-height: 90vh;

    @include screen-size("phone") {
      flex-wrap: wrap;
    }

    .column {
      width: 50%;

      @include screen-size("phone") {
        width: 100%;
      }

      &.list {
        background: var(--orange);
        padding-bottom: 200px;

        @include screen-size("phone") {
          padding-bottom: 60px;
        }
      }

      &.text {
        background: var(--green);
        padding-bottom: 200px;

        @include screen-size("phone") {
          padding-bottom: 0px;
        }

        .inner {
          color: var(--white);
          padding: var(--default-padding);
          padding-top: 0;
          line-height: 1.1em;

          @include screen-size("phone") {
            font-size: var(--font-size-normal);
          }
        }
      }
    }
  }

  .deco-container {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
