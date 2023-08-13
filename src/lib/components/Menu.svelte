<script lang="ts">
  import { slide } from "svelte/transition"
  import { quadOut } from "svelte/easing"
  import { menuActive } from "$lib/modules/stores"
  import { MENU_ITEMS } from "$lib/modules/constants"
  import { splitArrayIntoTwoParts } from "$lib/modules/utils"
  import Search from "./Search.svelte"

  const closeMenu = () => {
    menuActive.set(false)
  }
</script>

<div class="menu" transition:slide={{ duration: 200, easing: quadOut }}>
  <!-- INNER MENU -->
  <div class="menu-inner">
    <!-- FIRST COLUMN -->
    <div class="column first">
      {#each splitArrayIntoTwoParts(MENU_ITEMS)[0] as item}
        <div class="menu-item">
          <a href={item.link} on:click={closeMenu}>{item.title}</a>
        </div>
      {/each}
    </div>
    <!-- SECOND COLUMN -->
    <div class="column second">
      {#each splitArrayIntoTwoParts(MENU_ITEMS)[1] as item}
        <div class="menu-item">
          <a href={item.link} on:click={closeMenu}>{item.title}</a>
        </div>
      {/each}
    </div>
  </div>

  <!-- SEARCH -->
  <div class="search-container">
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
    z-index: 1000;
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    .menu-inner {
      font-size: var(--font-size-xl);
      line-height: 1.2em;
      display: flex;
      width: 100%;

      .column {
        padding: var(--default-padding);
        width: 50%;
        .menu-item {
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
      font-size: var(--font-size-xl);
      margin-bottom: 20px;
      padding: var(--default-padding);
      width: 100%;
    }
  }
</style>
