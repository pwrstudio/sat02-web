<script lang="ts">
  import { afterNavigate } from "$app/navigation"
  import { slide, fade } from "svelte/transition"
  import { quadOut } from "svelte/easing"
  import { menuActive } from "$lib/modules/stores"
  import { MENU_ITEMS } from "$lib/modules/constants"
  import { splitArrayIntoTwoParts } from "$lib/modules/utils"
  import Search from "./Search.svelte"
  import delay from "lodash/delay.js"

  let selectedItem = ""

  const closeMenu = () => {
    menuActive.set(false)
  }

  afterNavigate(async () => {
    delay(closeMenu, 700)
  })
</script>

<div class="menu" in:slide={{ duration: 160, easing: quadOut }}>
  <!-- INNER MENU -->
  <div class="menu-inner">
    <!-- FIRST COLUMN -->
    <div class="column first" in:fade={{ duration: 400, delay: 100 }}>
      {#each splitArrayIntoTwoParts(MENU_ITEMS)[0] as item}
        <div
          class="menu-item"
          class:hidden={selectedItem && selectedItem != item.title}
        >
          <a
            href={item.link}
            on:click={() => {
              selectedItem = item.title
            }}>{item.title}</a
          >
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
            href={item.link}
            on:click={() => {
              selectedItem = item.title
            }}>{item.title}</a
          >
        </div>
      {/each}
    </div>
  </div>

  <!-- SEARCH -->
  <div
    class="search-container"
    class:hidden={selectedItem}
    in:fade={{ duration: 400, delay: 140 }}
  >
    <Search />
  </div>
</div>

<style lang="scss">
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

    .menu-inner {
      font-size: var(--font-size-menu);
      line-height: 1.2em;
      display: flex;
      width: 100%;

      .column {
        padding: var(--default-padding);
        width: 50%;

        .menu-item {
          &.hidden {
            opacity: 0.5;
          }

          a {
            color: inherit;
            text-decoration: none;

            &:hover {
              color: var(--orange);
              text-decoration: underline;
            }
          }
        }
      }
    }

    .search-container {
      font-size: var(--font-size-menu);
      margin-bottom: 20px;
      padding: var(--default-padding);
      width: 100%;

      &.hidden {
        opacity: 0.5;
      }
    }
  }
</style>
