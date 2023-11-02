<script lang="ts">
  import { onMount } from "svelte"
  import { renderBlockText } from "$lib/modules/sanity"
  import { languageStore } from "$lib/modules/stores"
  import { LANGUAGE, COLOR } from "$lib/modules/types"

  import Metadata from "$lib/components/Metadata/Metadata.svelte"
  import ListingComponent from "./ListingComponent.svelte"
  import TitleHeader from "../Elements/TitleHeader.svelte"
  import SlideshowHeader from "../Elements/SlideshowHeader.svelte"

  import DecoProjects from "$lib/components/Deco/DecoProjects.svelte"
  import DecoParticipants from "$lib/components/Deco/DecoParticipants.svelte"
  import DecoFieldNotes from "$lib/components/Deco/DecoFieldNotes.svelte"
  import DecoDesignStore from "../Deco/DecoDesignStore.svelte"

  export let posts: any[] = []
  export let page: any = {}
  console.log(page)

  let height = 0
  let decoColor = COLOR.ORANGE
  let color = COLOR.ORANGE

  const setColor = () => {
    switch (page._id) {
      case "projects-page":
        decoColor = COLOR.BLUE
        color = COLOR.ORANGE
        break
      case "participants-page":
        decoColor = COLOR.ORANGE
        color = COLOR.BLUE
        break
      case "field-notes":
        decoColor = COLOR.ORANGE
        color = COLOR.BLUE
        break
      case "design-store":
        decoColor = COLOR.BLUE
        color = COLOR.BLUE
        break
      default:
        decoColor = COLOR.ORANGE
        color = COLOR.ORANGE
        break
    }
  }

  setColor()

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
  {#if page._id === "projects-page"}
    <DecoProjects color={decoColor} />
  {:else if page._id === "participants-page"}
    <DecoParticipants color={decoColor} />
  {:else if page._id === "field-notes"}
    <DecoFieldNotes color={decoColor} />
  {:else if page._id === "design-store"}
    <DecoDesignStore color={decoColor} />
  {/if}
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
  <div class="column list" style={"background:" + color + ";"}>
    <!-- HEADER: SLIDESHOW -->
    <SlideshowHeader {page} />
    <!-- LISTING COMPONENT -->
    <ListingComponent {posts} {page} {color} />
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
