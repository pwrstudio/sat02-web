<script lang="ts">
  // import Swiper JS
  import Swiper from "swiper"
  // import Swiper styles
  import "swiper/css"
  import { fade } from "svelte/transition"
  import { createEventDispatcher } from "svelte"
  import { onMount } from "svelte"
  import { urlFor, renderBlockText } from "$lib/modules/sanity"
  import has from "lodash/has.js"
  export let page: any

  const dispatch = createEventDispatcher()

  console.log("page", page)

  const sendClose = () => {
    dispatch("close")
  }

  let swiper

  onMount(() => {
    swiper = new Swiper(".swiper")
  })
</script>

<div class="slideshow" in:fade={{ duration: 100 }}>
  <div class="top-bar">
    <div class="title">{page.title}</div>
    <button class="close" on:click={sendClose}>CLOSE</button>
  </div>

  <div class="inner">
    <!-- Slider main container -->
    <div class="swiper">
      <!-- Additional required wrapper -->
      <div class="swiper-wrapper">
        <!-- Slides -->
        {#if page.processMedia}
          {#each page.processMedia as media}
            {#if has(media, "asset")}
              <div class="swiper-slide">
                <img src={urlFor(media.asset).width(1200).url()} alt="" />
              </div>
            {/if}
          {/each}
        {/if}
      </div>
      <!-- If we need pagination -->
      <div class="swiper-pagination" />

      <!-- If we need navigation buttons -->
      <div class="swiper-button-prev" />
      <div class="swiper-button-next" />
    </div>
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
    z-index: 10000;
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
      z-index: 1000;
    }
  }

  .swiper {
    margin-top: 10vh;
    height: 80vh;

    .swiper-wrapper {
      height: 100%;

      .swiper-slide {
        height: 100%;
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
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
  }
</style>
