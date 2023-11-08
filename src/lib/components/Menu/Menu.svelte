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

  const toggleLanguage = () => {
    languageStore.set(
      $languageStore == LANGUAGE.ENGLISH ? LANGUAGE.ARABIC : LANGUAGE.ENGLISH
    )
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
    <div class="language-switch-phone">
      <!-- LANGUAGE TOGGLE -->
      <button
        class="language-toggle {LANGUAGE[$languageStore]}"
        on:click={toggleLanguage}
      >
        {$languageStore == LANGUAGE.ENGLISH ? "ع" : "EN"}
      </button>
    </div>

    <div class="column-container {LANGUAGE[$languageStore]}">
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
</div>

<style lang="scss">
  @import "../../styles/responsive.scss";

  .menu {
    position: fixed;
    top: var(--menubar-height);
    left: 0;
    width: 100vw;
    height: calc(100dvh - var(--menubar-height));
    background: var(--grey);
    z-index: var(--z-nav);
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    @include screen-size("small") {
      top: var(--menubar-height-phone);
      height: calc(100dvh - var(--menubar-height-phone));
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
      position: relative;

      @include screen-size("small") {
        height: 100%;
      }

      .column-container {
        font-size: var(--font-size-xlarge);
        line-height: 1.2em;
        display: flex;
        width: 100%;
        position: relative;

        &.ARABIC {
          flex-direction: row-reverse;
        }

        @include screen-size("small") {
          flex-direction: column;
          font-size: var(--font-size-phone-menu);
          height: calc(100% - 46px);
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
            @include screen-size("small") {
              padding-bottom: 0.2em;
            }
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
  }

  .language-switch-phone {
    display: none;
    width: 100%;
    justify-content: flex-end;
    position: absolute;

    @include screen-size("small") {
      display: flex;
      bottom: 0;
      left: 0;
      background: var(--orange);
      height: 82px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    button {
      display: block;
      margin-right: var(--default-padding);
      border: 0;
      padding: 0;
      background: transparent;
      font-size: var(--font-size-large);
      font-family: var(--font-family);
      color: var(--grey);
      cursor: pointer;
      user-select: none;
      width: 100%;
      height: 100%;
      line-height: 82px;
      // line-height: 1em;

      &.ARABIC {
        flex-direction: row-reverse;
        font-family: var(--font-family-arabic);
      }
    }
  }
</style>
