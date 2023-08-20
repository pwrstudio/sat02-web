<script lang="ts">
  import { goto } from "$app/navigation"
  import { page } from "$app/stores"

  import Menu from "$lib/components/Menu.svelte"
  import { menuActive } from "$lib/modules/stores"

  const toggleMenu = () => {
    menuActive.set(!$menuActive)
  }

  const handleLogoClick = () => {
    if ($page.route.id === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      goto("/")
    }
  }
</script>

<nav>
  <button class="title" on:click={handleLogoClick}>
    SHARJAH ARCHITECTURE TRIENNIAL 02
  </button>
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
    z-index: var(--z-nav);
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

  .title {
    border-bottom: 1.5px solid transparent;

    &:hover {
      border-bottom: 1.5px solid var(--black);
    }
  }

  .menu-toggle {
    border-bottom: 1.5px solid transparent;

    &:hover {
      border-bottom: 1.5px solid var(--black);
    }
  }

  .language-toggle {
    font-family: var(--font-family-arabic);
    margin-left: var(--double-padding);
    position: relative;
    top: -4px;
  }
</style>
