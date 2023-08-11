<script lang="ts">
  import { slide } from "svelte/transition"
  import { quadOut } from "svelte/easing"
  import { menuActive } from "$lib/modules/stores"
  import { MENU_ITEMS } from "$lib/modules/constants"
  const closeMenu = () => {
    menuActive.set(false)
  }
</script>

<div class="menu" transition:slide={{ duration: 200, easing: quadOut }}>
  <div class="menu-inner">
    {#each MENU_ITEMS as item}
      <div class="menu-item">
        <a href={item.link} on:click={closeMenu}>{item.title}</a>
      </div>
    {/each}
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

    .menu-inner {
      padding: var(--default-padding);
      font-size: var(--font-size-xl);
      line-height: 1.2em;

      .menu-item {
        a {
          color: inherit;
          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
</style>
