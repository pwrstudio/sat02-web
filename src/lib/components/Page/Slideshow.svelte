<script lang="ts">
  import { LANGUAGE } from "$lib/modules/types"
  import type { Event, Project, Venue, Page } from "$lib/types/sanity.types"
  import { languageStore } from "$lib/modules/stores"
  import { fade } from "svelte/transition"
  import { createEventDispatcher } from "svelte"
  import { onMount } from "svelte"
  import { urlFor } from "$lib/modules/sanity"
  import Swiper from "swiper"
  import "swiper/css"
  import VideoPlayer from "./VideoPlayer.svelte"
  // import { disablePageScroll, enablePageScroll } from "scroll-lock"
  import has from "lodash/has.js"
  import { ArabicTerms } from "$lib/modules/constants"

  export let page: Project | Event | Venue | Page

  const dispatch = createEventDispatcher()

  let mediaList = page.processMedia || page.media || page.images || []

  if (page.featuredImage) {
    mediaList = [page.featuredImage, ...mediaList]
  }

  let swiper: Swiper
  let activeIndex = 0

  $: isMultiSlide = has(swiper, "slides") && swiper.slides.length > 1
  $: isBeginning = activeIndex === 0
  $: isEnd = has(swiper, "slides") && activeIndex === swiper.slides.length - 1

  const sendClose = () => {
    dispatch("close")
  }

  const nextSlide = () => {
    swiper.slideNext()
  }

  const prevSlide = () => {
    swiper.slidePrev()
  }

  onMount(() => {
    // disablePageScroll()
    swiper = new Swiper(".swiper")
    swiper.on("slideChange", () => {
      activeIndex = swiper.activeIndex
    })
  })

  // onDestroy(() => {
  //   enablePageScroll()
  // })
</script>

<div class="slideshow" in:fade={{ duration: 100 }}>
  <div class="top-bar">
    <div class="title">
      {#if $languageStore == LANGUAGE.ENGLISH}→{/if}
      {#if $languageStore == LANGUAGE.ARABIC}←{/if}
      <strong>
        {$languageStore == LANGUAGE.ENGLISH ? page.title : page.title_ar}
      </strong>
    </div>
    <button class="close" on:click={sendClose}>
      <span class="icon">&#xE000;</span>
      {$languageStore === LANGUAGE.ENGLISH ? "CLOSE" : ArabicTerms.CLOSE}
    </button>
  </div>

  <div class="inner">
    <!-- Slider main container -->
    <div class="swiper">
      <!-- Additional required wrapper -->
      <div class="swiper-wrapper">
        <!-- Slides -->
        {#if mediaList.length > 0}
          {#each mediaList as media}
            {#if media._type === "video"}
              <div class="swiper-slide">
                <VideoPlayer url={media.url} />
              </div>
            {:else if media._type === "image"}
              {#if has(media, "asset")}
                <div class="swiper-slide">
                  <img src={urlFor(media.asset).width(1200).url()} alt="" />
                </div>
              {/if}
            {/if}
          {/each}
        {/if}
      </div>
    </div>
  </div>

  {#if isMultiSlide}
    <button
      class="arrow left"
      class:disabled={isBeginning}
      on:click={prevSlide}
    >
      ←
    </button>
    <button class="arrow right" class:disabled={isEnd} on:click={nextSlide}>
      →
    </button>
  {/if}

  <div class="caption">
    {#if isMultiSlide}
      <div>{activeIndex + 1}/{swiper.slides.length}</div>
    {/if}
    <!-- CAPTION ENGLISH -->
    {#if $languageStore == LANGUAGE.ENGLISH}
      {#if mediaList[activeIndex]?.caption}
        <div class="caption-text">{mediaList[activeIndex].caption}</div>
      {/if}
    {/if}
    <!-- CAPTION: ARABIC -->
    {#if $languageStore == LANGUAGE.ARABIC}
      {#if mediaList[activeIndex]?.caption_ar}
        <div class="caption-text">{mediaList[activeIndex].caption_ar}</div>
      {/if}
    {/if}
  </div>
</div>

<style lang="scss">
  @import "../../styles/responsive.scss";

  .slideshow {
    height: 100dvh;
    width: 100dvw;
    position: fixed;
    top: 0;
    left: 0;
    background: var(--green);
    z-index: var(--z-modal);
    color: var(--white);
    overflow: hidden;

    .top-bar {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: var(--menubar-height);
      // background: var(--grey);
      display: flex;
      align-items: center;
      padding-left: var(--default-padding);
      padding-right: var(--double-padding);
      justify-content: space-between;

      @include screen-size("phone") {
        height: var(--menubar-height-phone);
        padding-right: var(--default-padding);
      }
      .close {
        position: relative;
        top: -2px;
      }

      .title {
        position: relative;
        top: -2px;
      }
    }
  }

  .counter {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    height: var(--menubar-height);
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .caption {
    position: fixed;
    bottom: 5vh;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: var(--font-size-small);
  }

  .swiper {
    margin-top: 10dvh;
    height: 75dvh;

    .swiper-wrapper {
      height: 100%;

      .swiper-slide {
        height: 100%;
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 5rem;
        user-select: none;
        cursor: grab;

        img {
          max-height: 100%;
          max-width: 100%;

          @include screen-size("phone") {
            max-width: 80%;
          }
        }
      }
    }
  }

  button {
    border: 0;
    background: transparent;
    font-size: var(--font-size-normal);
    font-family: var(--font-family);
    cursor: pointer;
    padding: 0;
    line-height: 1em;
    color: var(--white);
  }

  .close {
    &:hover {
      color: var(--orange);
    }
  }

  .arrow {
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    font-size: var(--font-size-large);
    z-index: var(--z-modal);

    @include screen-size("phone") {
      top: unset;
      bottom: 5vh;
    }

    &.left {
      left: 7vw;
      padding: var(--double-padding);
    }

    &.right {
      right: 7vw;
      padding: var(--double-padding);
    }

    &:hover {
      color: var(--black);
    }

    &.disabled {
      opacity: 0.3;
      pointer-events: none;
    }
  }

  .icon {
    font-family: var(--font-family);
  }
</style>
