<script lang="ts">
  import { LANGUAGE } from "$lib/modules/types"
  import type { Project, Venue } from "$lib/types/sanity.types"
  import { languageStore } from "$lib/modules/stores"
  import { fade } from "svelte/transition"
  import { createEventDispatcher } from "svelte"
  import { ArabicTerms } from "$lib/modules/constants"

  export let page: Project | Venue

  console.log(page)

  const dispatch = createEventDispatcher()

  const sendClose = () => {
    dispatch("close")
  }
</script>

<div class="matterport" in:fade={{ duration: 100 }}>
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
    <div class="embed">
      <iframe
        title={page.title}
        src={`${page.matterportLink}&play=1&qs=1&mt=0`}
        allowfullscreen
        allow="xr-spatial-tracking"
        style="border: 0; width: 100%; height: 100%;"
      />
    </div>
  </div>
</div>

<style lang="scss">
  @import "../../styles/responsive.scss";

  .matterport {
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

    .inner {
      width: 100dvw;
      height: 100dvh;
      display: flex;
      justify-content: center;
      align-items: center;

      .embed {
        aspect-ratio: 16/9;
        width: 900px;

        iframe {
          width: 100%;
          height: 100%;
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
