<script lang="ts">
  import { LANGUAGE } from "$lib/modules/types"
  import { languageStore } from "$lib/modules/stores"
  import { urlFor } from "$lib/modules/sanity"
  import { ArabicTerms } from "$lib/modules/constants"

  import Slideshow from "$lib/components/Page/Slideshow.svelte"
  import SlidesCounter from "$lib/components/Page/SlidesCounter.svelte"

  export let page: any

  let slideshowOpen = false

  let hasImage: boolean
  $: hasImage = page.featuredImage && page.featuredImage.asset

  const toogleSlideshow = () => {
    slideshowOpen = !slideshowOpen
  }
</script>

<!-- HEADER -->
{#if hasImage}
  <div class="slideshow-header" class:tall={hasImage}>
    {#if hasImage}
      {#if page._type != "venue" && page.featuredImage?.asset}
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
          <button
            on:click={toogleSlideshow}
            class="open-slideshow {LANGUAGE[$languageStore]}"
          >
            {#if $languageStore === LANGUAGE.ARABIC}
              {ArabicTerms.OPEN_SLIDESHOW} <SlidesCounter {page} />
            {:else}
              OPEN SLIDESHOW <SlidesCounter {page} />
            {/if}
          </button>
        </div>
      {/if}
    {/if}
  </div>
{/if}

{#if slideshowOpen}
  <Slideshow {page} on:close={toogleSlideshow} />
{/if}

<style lang="scss">
  @import "../../styles/responsive.scss";

  .slideshow-header {
    height: 400px;
    position: relative;
    width: 100%;
    background: var(--green);
    color: var(--white);
    display: flex;

    @include screen-size("phone") {
      height: unset;
    }

    .header-column {
      width: 50%;

      @include screen-size("phone") {
        width: 100%;
      }

      &.left {
        padding-top: 2em;
      }

      &.right {
        padding-top: 2em;
        display: flex;
        justify-content: center;
        align-items: center;

        @include screen-size("phone") {
          display: none;
        }

        img {
          position: relative;
          z-index: var(--z-content);
          height: 90%;
          max-width: 90%;
          object-fit: cover;
          margin-bottom: var(--default-padding);
          // mix-blend-mode: multiply;
          position: relative;
          z-index: var(--z-content);
        }
      }
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

    .slideshow {
      background: var(--grey);
      height: 100%;
      width: 100%;
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
        top: 0;
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
  }
</style>
