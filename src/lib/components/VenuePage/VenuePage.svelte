<script lang="ts">
  import type { Project, Venue } from "$lib/types/sanity.types"
  import { onMount, tick } from "svelte"
  import { LANGUAGE } from "$lib/modules/types"
  import { fade } from "svelte/transition"

  import { COLOR } from "$lib/modules/types"

  import { languageStore } from "$lib/modules/stores"
  import { ArabicTerms } from "$lib/modules/constants"

  import Metadata from "$lib/components/Metadata/Metadata.svelte"
  import Slideshow from "$lib/components/Page/Slideshow.svelte"
  import Content from "$lib/components/Elements/Content.svelte"
  import Credits from "$lib/components/Elements/Credits.svelte"
  import DecoPageTwo from "$lib/components/Deco/DecoPageTwo.svelte"
  import ListingComponent from "../Listing/ListingComponent.svelte"
  import TitleHeader from "../Elements/TitleHeader.svelte"

  export let page: Venue
  export let posts: Project[]

  let slideshowOpen = false
  let matterportOpen = false
  let height = 0

  const getTagText = (text: string, language: LANGUAGE) => {
    if (language === LANGUAGE.ENGLISH) {
      if (text === "fieldNote") return "Field Note"
      if (text === "storeItem") return "Design store"
      return text
    } else {
      if (text === "project") return ArabicTerms.PROJECT_S
      if (text === "event") return ArabicTerms.EVENT
      if (text === "participant") return ArabicTerms.PARTICIPANT_S
      return text
    }
  }

  let tagText = getTagText(page._type, $languageStore)
  $: tagText = getTagText(page._type, $languageStore)

  const toogleSlideshow = () => {
    slideshowOpen = !slideshowOpen
  }

  const toggleMatterport = () => {
    matterportOpen = !matterportOpen
  }

  const handleResize = async () => {
    await tick()
    height = document.body.scrollHeight
  }

  onMount(() => {
    handleResize()
    window.addEventListener("resize", handleResize)
  })
</script>

<!-- METADATA -->
<Metadata {page} />

<!-- DECO -->
<div class="deco-container" style={"height:" + height + "px;"}>
  <DecoPageTwo color={COLOR.PURPLE} />
</div>

<div class="page {page._type}" in:fade={{ duration: 200 }}>
  <!-- LEFT -->
  <div class="column left">
    <TitleHeader {page} />

    <div class="row content">
      <!-- CONTENT -->
      <Content {page} />

      <!-- CREDITS -->
      <Credits {page} />
    </div>
  </div>

  <!-- RIGHT -->
  <div class="column right">
    <!-- HEADER: SLIDESHOW
    <SlideshowHeader {page} /> -->
    <!-- LISTING -->
    <div class="row listing">
      {#if posts.length > 0}
        <ListingComponent
          {page}
          matterportLink={page.matterportLink}
          {posts}
          color={COLOR.PURPLE}
        />
      {/if}
    </div>
  </div>
</div>

{#if slideshowOpen}
  <Slideshow {page} on:close={toogleSlideshow} />
{/if}

<style lang="scss">
  @import "../../styles/responsive.scss";

  .page {
    display: flex;

    @include screen-size("phone") {
      flex-wrap: wrap;
    }

    .tag {
      position: absolute;
      top: 20px;
      left: 20px;

      &.ARABIC {
        left: unset;
        right: 20px;
      }
    }

    .matterport {
      padding-inline: var(--default-padding);
      margin-bottom: 2em;
      width: 100%;

      .open-matterport {
        border: 0;
        outline: none;
        background: var(--purple);
        color: var(--white);
        padding: var(--default-padding);
        cursor: pointer;
        z-index: var(--z-content);
        position: relative;
        user-select: none;
        font-size: var(--font-size-normal);
        font-family: var(--font-family);

        &.ARABIC {
          font-family: var(--font-family-arabic);
        }

        &:hover {
          background: var(--white-transparent);
          color: var(--black);
        }
      }
    }

    .column {
      width: 50%;
      display: flex;
      flex-grow: 1;
      flex-direction: column;

      @include screen-size("phone") {
        width: 100%;
      }

      &.left {
        @include screen-size("phone") {
          min-height: 90vh;
        }
      }

      &.right {
        @include screen-size("phone") {
          // display: none;
        }
      }

      .row {
        width: 100%;
        padding: var(--default-padding);
      }

      .header {
        height: var(--header-height);
        position: relative;
        padding-top: 5em;

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

        .time {
          font-size: var(--font-size-xlarge);
          font-weight: normal;
          position: relative;
          z-index: var(--z-content);
          line-height: 1.1em;
          margin-bottom: 0.5em;

          @include screen-size("phone") {
            font-size: var(--font-size-large);
          }
        }

        .venue {
          font-size: var(--font-size-xlarge);
          font-weight: normal;
          position: relative;
          z-index: var(--z-content);
          line-height: 1.1em;
          margin-bottom: 0.5em;

          @include screen-size("phone") {
            font-size: var(--font-size-large);
          }

          a {
            &:hover {
              color: var(--orange);
            }
          }
        }

        .adress {
          font-size: var(--font-size-xlarge);
          font-weight: normal;
          position: relative;
          z-index: var(--z-content);
          line-height: 1.1em;
          margin-bottom: 0.5em;

          @include screen-size("phone") {
            font-size: var(--font-size-large);
          }

          a {
            &:hover {
              color: var(--orange);
            }
          }
        }

        &.right {
          // border-left: 1.5px solid var(--white-transparent);
          @include screen-size("phone") {
            display: none;
          }
        }
      }

      .slideshow {
        background: var(--grey);
        height: 600px;
        position: relative;
        padding: 0;
        cursor: pointer;
        z-index: var(--z-content);

        @include screen-size("phone") {
          display: none;
          height: 400px;
        }

        img {
          width: 100%;
          height: 100%;
          //   object-fit: contain;
          object-fit: cover;
          mix-blend-mode: multiply;
          object-position: center center;

          @include screen-size("phone") {
            object-fit: contain;
          }
        }

        .open-slideshow {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 100%;
          padding: var(--default-padding);
          background: var(--orange);
          color: var(--white);
          text-decoration: none;
          text-align: center;
          border: 0;
          cursor: pointer;
          font-size: var(--font-size-normal);

          &.ARABIC {
            font-family: var(--font-family-arabic);
          }
        }
      }

      .phone-slideshow {
        position: relative;
        padding: 0;
        cursor: pointer;
        z-index: var(--z-content);
        display: none;

        @include screen-size("phone") {
          display: block;
        }

        .open-slideshow {
          width: 100%;
          padding: var(--double-padding) var(--default-padding);
          background: var(--orange);
          color: var(--white);
          text-decoration: none;
          text-align: center;
          border: 0;
          cursor: pointer;
          font-size: var(--font-size-normal);

          &.ARABIC {
            font-family: var(--font-family-arabic);
          }
        }
      }

      .divider {
        height: 60px;
        background: var(--grey);
      }

      .listing {
        min-height: 500px;
        background: var(--purple);

        flex-grow: 1;
        padding: 0;

        @include screen-size("phone") {
          min-height: unset;
        }
      }

      .content {
        padding: var(--default-padding);
      }
    }

    &.venue {
      .left {
        background: var(--green);
        color: var(--white);
      }
    }
  }

  .orange {
    background: var(--orange);
  }

  .green {
    background: var(--green);
    color: var(--white);
    line-height: 1.6em;
  }

  .deco-container {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .phone-info {
    display: none;
    @include screen-size("phone") {
      display: block;
    }
  }

  .line {
    width: 100%;
    height: 1.5px;
    background: var(--white-transparent);
    margin-bottom: 10px;
  }

  :global(.venue .content p:first-child) {
    margin-top: 0;
  }
</style>
