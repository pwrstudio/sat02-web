<script lang="ts">
  import { LANGUAGE } from "$lib/modules/types"
  import { fade } from "svelte/transition"
  import { urlFor, renderBlockText } from "$lib/modules/sanity"
  import has from "lodash/has.js"

  import Slideshow from "$lib/components/Page/Slideshow.svelte"
  import Tag from "$lib/components/Tag.svelte"
  import PlaceholderText from "$lib/components/Page/PlaceholderText.svelte"
  import ParticipantList from "$lib/components/ParticipantList.svelte"
  import SlidesCounter from "./SlidesCounter.svelte"
  import DecoPage from "$lib/components/LandingPage/Deco/DecoPage.svelte"
  import DecoPageTwo from "$lib/components/LandingPage/Deco/DecoPageTwo.svelte"
  import { onMount } from "svelte"
  import { languageStore } from "$lib/modules/stores"
  export let page: any

  let slideshowOpen = false
  let height = 0

  const toogleSlideshow = () => {
    slideshowOpen = !slideshowOpen
  }

  onMount(() => {
    height = document.body.scrollHeight
  })
</script>

<!-- DECO -->
<div class="deco-container" style={"height:" + height + "px;"}>
  {#if page._type == "participant"}
    <DecoPageTwo />
  {:else}
    <DecoPage />
  {/if}
</div>

<div class="page {page._type}" in:fade={{ duration: 200 }}>
  <!-- LEFT -->
  <div class="column left">
    <!-- TITLE -->
    <div class="row header green">
      <!-- TYPE -->
      <Tag>{page._type}</Tag>
      <!-- TITLE -->
      <h1>{page.title}</h1>
      <!-- VENUE -->
      {#if has(page, "venues[0].title")}
        <Tag>
          {page.venues[0].title}
        </Tag>
      {/if}
    </div>
    <!-- CONTENT -->
    <div class="row content">
      {#if page.description}
        {@html renderBlockText(page.description.content)}
      {:else}
        <PlaceholderText />
      {/if}
    </div>
  </div>

  <!-- RIGHT -->
  <div class="column right">
    <!-- PARTICIPANTS  -->
    <div class="row header right green">
      <h2>
        <ParticipantList participants={page.participants} />
      </h2>
    </div>
    <!-- SLIDESHOW -->
    {#if page.featuredImage?.asset}
      <div class="row slideshow">
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <img
          src={urlFor(page.featuredImage)
            .width(800)
            .height(600)
            .saturation(-100)
            .auto("format")
            .quality(100)
            .url()}
          alt={page.title}
          on:click={toogleSlideshow}
        />
        <button on:click={toogleSlideshow} class="open-slideshow">
          {#if $languageStore === LANGUAGE.ARABIC}
            فتح العرض التقديمي <SlidesCounter {page} />
          {:else}
            OPEN SLIDESHOW <SlidesCounter {page} />
          {/if}
        </button>
      </div>
    {/if}

    <!-- DIVIDER -->
    <div class="row divider" />
    <!-- EVENTS -->
    <div class="row events">RELATED EVENTS</div>
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

    .column {
      width: 50%;

      @include screen-size("phone") {
        width: 100%;
      }

      .row {
        width: 100%;
        padding: var(--default-padding);

        &.right {
          padding-top: 53px;
        }
      }

      .header {
        height: var(--header-height);
      }

      .slideshow {
        background: var(--grey);
        height: 600px;
        position: relative;
        padding: 0;
        cursor: pointer;
        z-index: var(--z-content);

        img {
          width: 100%;
          height: 100%;
          //   object-fit: contain;
          object-fit: cover;
          mix-blend-mode: multiply;
          object-position: center center;
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
        }
      }

      .divider {
        height: 60px;
        background: var(--grey);
      }

      .events {
        height: 500px;
        background: var(--green);
      }

      .content {
        padding: var(--double-padding);
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

  h1,
  h2 {
    font-size: var(--font-size-large);
    font-weight: normal;
    position: relative;
    z-index: var(--z-content);

    a {
      color: var(--white);
      text-decoration: none;
      &:hover {
        text-decoration: underline;
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
