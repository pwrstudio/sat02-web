<script lang="ts">
  import { goto } from "$app/navigation"
  import { page } from "$app/stores"

  import Menu from "$lib/components/Menu.svelte"
  import { menuActive, languageStore, urlPrefix } from "$lib/modules/stores"
  import { siteTitle } from "$lib/modules/constants"
  import { LANGUAGE } from "$lib/modules/types"
  languageStore.set(LANGUAGE.ENGLISH)

  const toggleMenu = () => {
    menuActive.set(!$menuActive)
  }

  const toggleLanguage = () => {
    languageStore.set(
      $languageStore == LANGUAGE.ENGLISH ? LANGUAGE.ARABIC : LANGUAGE.ENGLISH
    )
  }

  const handleLogoClick = () => {
    if ($page.route.id === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      goto($urlPrefix)
    }
  }
</script>

<nav class={LANGUAGE[$languageStore]}>
  <!-- TITLE -->
  <button class="title {LANGUAGE[$languageStore]}" on:click={handleLogoClick}>
    {$languageStore == LANGUAGE.ENGLISH ? siteTitle.en : siteTitle.ar}
  </button>
  <div class="actions {LANGUAGE[$languageStore]}">
    <!-- MENU TOGGLE -->
    <button
      class="menu-toggle {LANGUAGE[$languageStore]}"
      on:click={toggleMenu}
    >
      {#if $menuActive}
        {$languageStore == LANGUAGE.ENGLISH ? "CLOSE" : "أغلق"}
      {:else}
        {$languageStore == LANGUAGE.ENGLISH ? "MENU" : "قائمة"}
      {/if}
    </button>
    <!-- LANGUAGE TOGGLE -->
    <button
      class="language-toggle {LANGUAGE[$languageStore]}"
      on:click={toggleLanguage}
    >
      {$languageStore == LANGUAGE.ENGLISH ? "ع" : "EN"}
    </button>
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

    &.ARABIC {
      flex-direction: row-reverse;
      font-family: var(--font-family-arabic);
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

    &.ARABIC {
      flex-direction: row-reverse;
      font-family: var(--font-family-arabic);
    }
  }

  .title {
    border-bottom: 1.5px solid transparent;

    &:hover {
      border-bottom: 1.5px solid var(--black);
    }

    &.ARABIC {
      // font-size: 24px;
      font-family: var(--font-family-arabic);
    }
  }

  .actions {
    display: flex;
    align-items: center;

    &.ARABIC {
      flex-direction: row-reverse;
    }

    .menu-toggle {
      border-bottom: 1.5px solid transparent;

      &:hover {
        border-bottom: 1.5px solid var(--black);
      }
    }

    .language-toggle {
      position: relative;
      font-weight: normal;

      // English text is shown when in arabic mode
      &.ARABIC {
        margin-right: var(--default-padding);
        margin-left: 0;
      }

      // Arabic text is shown when in english mode
      &.ENGLISH {
        margin-right: 0;
        margin-left: var(--double-padding);
        font-family: var(--font-family-arabic);
        top: -4px;
      }
    }
  }
</style>
