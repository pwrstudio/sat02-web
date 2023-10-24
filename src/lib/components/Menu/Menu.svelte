<script lang="ts">
  import { onMount } from "svelte"
  import { afterNavigate } from "$app/navigation"
  import { slide, fade } from "svelte/transition"
  import { quadOut } from "svelte/easing"
  import { COLOR, LANGUAGE, type CircleGroup } from "$lib/modules/types"
  import { menuActive, languageStore, urlPrefix } from "$lib/modules/stores"
  import { MENU_ITEMS } from "$lib/modules/constants"
  import { splitArrayIntoTwoParts } from "$lib/modules/utils"
  import { createNestedCircularPatternWithGroups } from "$lib/modules/graphics"
  import delay from "lodash/delay.js"
  // import { disablePageScroll, enablePageScroll } from "scroll-lock"
  let color: COLOR = COLOR.GREEN

  let selectedItem = ""

  const closeMenu = () => {
    menuActive.set(false)
  }

  afterNavigate(async () => {
    delay(closeMenu, 700)
  })

  let circularOneEl: HTMLDivElement

  onMount(() => {
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
    }
  })
</script>

<div
  class="menu {LANGUAGE[$languageStore]}"
  in:slide={{ duration: 160, easing: quadOut }}
>
  <!-- INNER MENU -->
  <div class="menu-inner {LANGUAGE[$languageStore]}">
    <!-- FIRST COLUMN -->
    <div class="column first" in:fade={{ duration: 400, delay: 100 }}>
      {#each splitArrayIntoTwoParts(MENU_ITEMS)[0] as item}
        <div
          class="menu-item"
          class:hidden={selectedItem && selectedItem != item.title}
        >
          <a
            href={$urlPrefix + item.link}
            on:click={() => {
              selectedItem = item.title
            }}
          >
            {$languageStore === LANGUAGE.ENGLISH ? item.title : item.ar}
          </a>
        </div>
      {/each}
    </div>
    <!-- SECOND COLUMN -->
    <div class="column second" in:fade={{ duration: 400, delay: 160 }}>
      {#each splitArrayIntoTwoParts(MENU_ITEMS)[1] as item}
        <div
          class="menu-item"
          class:hidden={selectedItem && selectedItem != item.title}
        >
          <a
            href={$urlPrefix + item.link}
            on:click={() => {
              selectedItem = item.title
            }}
          >
            {$languageStore === LANGUAGE.ENGLISH ? item.title : item.ar}
          </a>
        </div>
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  @import "../../styles/responsive.scss";

  .menu {
    position: fixed;
    top: var(--menubar-height);
    left: 0;
    width: 100vw;
    height: calc(100vh - var(--menubar-height));
    background: var(--grey);
    z-index: var(--z-nav);
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    @include screen-size("small") {
      top: var(--menubar-height-phone);
      height: calc(100vh - var(--menubar-height-phone));
    }

    &.ARABIC {
      font-family: var(--font-family-arabic);
      text-align: right;
    }

    .menu-inner {
      font-size: var(--font-size-xlarge);
      line-height: 1.2em;
      display: flex;
      width: 100%;

      @include screen-size("small") {
        flex-direction: column;
        font-size: var(--font-size-large);
      }

      &.ARABIC {
        flex-direction: row-reverse;
        @include screen-size("small") {
          flex-direction: column-reverse;
        }
      }

      .column {
        padding: var(--default-padding);
        width: 50%;

        @include screen-size("small") {
          width: 100%;
          padding-top: 0;
        }

        .menu-item {
          &.hidden {
            opacity: 0.5;
          }

          a {
            color: inherit;
            text-decoration: none;

            &:hover {
              color: var(--orange);
            }
          }
        }
      }
    }
  }
</style>