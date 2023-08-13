<script lang="ts">
  import Menu from "$lib/components/Menu.svelte"
  import { menuActive } from "$lib/modules/stores"

  const toggleMenu = () => {
    menuActive.set(!$menuActive)
  }
</script>

<nav>
  <a href="/" class="title" data-sveltekit-preload-data>
    SHARJAH ARCHITECTURE TRIENNIAL 02
  </a>
  <div>
    <button class="menu-toggle" on:click={toggleMenu}>
      {$menuActive ? "CLOSE" : "MENU"}
    </button>
    <button class="language-toggle">ع</button>
  </div>
</nav>

{#if $menuActive}
  <Menu />
{/if}

<style lang="scss">
  nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: var(--menubar-height);
    background: var(--grey);
    display: flex;
    align-items: center;
    padding-left: var(--default-padding);
    padding-right: var(--double-padding);
    justify-content: space-between;
    z-index: 1000;
  }

  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
      // color: var(--orange);
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

  .menu-toggle {
    border-bottom: 1.5px solid var(--black);
  }

  .language-toggle {
    font-family: var(--font-family-arabic);
    margin-left: var(--double-padding);
    position: relative;
    top: -4px;
  }
</style>
