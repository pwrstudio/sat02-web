<script lang="ts">
  import { LANGUAGE } from "$lib/modules/types"
  import { languageStore } from "$lib/modules/stores"
  import { fade } from "svelte/transition"
  import { createEventDispatcher, onDestroy } from "svelte"
  import { onMount } from "svelte"
  import { urlFor } from "$lib/modules/sanity"
  import Swiper from "swiper"
  import "swiper/css"
  import { disablePageScroll, enablePageScroll } from "scroll-lock"
  import has from "lodash/has.js"
  import ParticipantList from "../ParticipantList.svelte"
  export let page: any

  const dispatch = createEventDispatcher()

  let mediaList = page.processMedia || page.media || []

  let swiper: Swiper
  let activeIndex = 1

  $: isMultiSlide = has(swiper, "slides") && swiper.slides.length > 1
  $: isBeginning = activeIndex === 1
  $: isEnd = has(swiper, "slides") && activeIndex === swiper.slides.length

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
    disablePageScroll()
    swiper = new Swiper(".swiper")
    swiper.on("slideChange", () => {
      activeIndex = swiper.activeIndex + 1
    })
  })

  onDestroy(() => {
    enablePageScroll()
  })
</script>

<div class="slideshow" in:fade={{ duration: 100 }}>
  <div class="top-bar">
    <div class="title">
      {page.title},&nbsp;
      <ParticipantList participants={page.participants} />
    </div>
    <button class="close" on:click={sendClose}>
      {$languageStore === LANGUAGE.ENGLISH ? "Close" : "أغلق"}
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
            {#if has(media, "asset")}
              <div class="swiper-slide">
                <img src={urlFor(media.asset).width(1200).url()} alt="" />
              </div>
            {/if}
          {/each}
        {:else if page.featuredImage}
          <div class="swiper-slide">
            <img
              src={urlFor(page.featuredImage.asset).width(1200).url()}
              alt=""
            />
          </div>
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
      <div>{activeIndex}/{swiper.slides.length}</div>
    {/if}
    <div>Caption, credits, etc...</div>
  </div>
</div>

<style lang="scss">
  @import "../../styles/responsive.scss";

  .slideshow {
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    background: var(--green);
    z-index: var(--z-modal);
    color: var(--white);
    overflow: hidden;
    // display: flex;
    // justify-content: center;
    // align-items: center;

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
  }

  .swiper {
    margin-top: 10vh;
    height: 75vh;

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

        img {
          max-height: 100%;
          max-width: 100%;
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
      text-decoration: underline;
    }
  }

  .arrow {
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    font-size: var(--font-size-large);
    z-index: var(--z-modal);

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
</style>
