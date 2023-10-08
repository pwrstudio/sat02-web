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
    <!-- MENU TOGGLE: DESKTOP -->
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
    <!-- MENU TOGGLE: PHONE -->
    <button
      class="menu-toggle-phone {LANGUAGE[$languageStore]}"
      on:click={toggleMenu}
    >
      {#if $menuActive}
        &#xE000; {$languageStore == LANGUAGE.ENGLISH ? "CLOSE" : "أغلق"}
      {:else}
        &#xE002; {$languageStore == LANGUAGE.ENGLISH ? "MENU" : "قائمة"}
      {/if}
    </button>
  </div>
</nav>

{#if $menuActive}
  <Menu />
{/if}

<style lang="scss">
  @import "../styles/responsive.scss";

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

    @include screen-size("small") {
      flex-wrap: wrap;
      height: var(--menubar-height-phone);
      padding-left: var(--default-padding);
      padding-right: var(--default-padding);
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
    font-weight: bold;

    @include screen-size("small") {
      width: 100%;
      text-align: left;
      height: 41px;
      line-height: 51px;
    }

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
    @include screen-size("small") {
      width: 100%;
      // background: yellow;
      justify-content: space-between;
      padding-bottom: 10px;
    }

    &.ARABIC {
      flex-direction: row-reverse;
    }

    .menu-toggle {
      border-bottom: 1.5px solid transparent;

      &:hover {
        border-bottom: 1.5px solid var(--black);
      }

      @include screen-size("small") {
        display: none;
      }
    }

    .menu-toggle-phone {
      border-bottom: 1.5px solid transparent;
      display: none;
      height: 100%;
      width: 100%;
      height: 41px;
      line-height: 31px;
      position: relative;
      top: -2px;
      text-align: right;
      // border-right: 1.5px solid var(--black);
      // font-size: var(--font-size-large);

      @include screen-size("small") {
        display: block;
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
      @include screen-size("small") {
        display: none;
      }
    }

    .language-toggle-phone {
      position: relative;
      font-weight: normal;
      display: none;
      height: 40px;
      width: 100%;
      // background: green;
      text-align: center;

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
        // top: -4px;
      }

      @include screen-size("small") {
        display: block;
      }
    }
  }
</style>
