<script lang="ts">
  import { goto } from "$app/navigation"
  import { page } from "$app/stores"

  import Menu from "$lib/components/Menu/Menu.svelte"
  import { menuActive, languageStore, urlPrefix } from "$lib/modules/stores"
  import { ArabicTerms, siteTitle } from "$lib/modules/constants"
  import { LANGUAGE } from "$lib/modules/types"
  languageStore.set(LANGUAGE.ENGLISH)

  const toggleMenu = () => {
    menuActive.set(!$menuActive)
  }

  const toggleLanguage = () => {
    languageStore.set(
      $languageStore == LANGUAGE.ENGLISH ? LANGUAGE.ARABIC : LANGUAGE.ENGLISH,
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
    <div class="full-title">
      {$languageStore == LANGUAGE.ENGLISH ? siteTitle.en : siteTitle.ar}
    </div>
    <div class="short-title">SAT02</div>
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
        <span class="icon">&#xE000;</span>
        {$languageStore == LANGUAGE.ENGLISH ? "CLOSE" : ArabicTerms.CLOSE}
      {:else}
        <span class="icon"> &#xE002;</span>
        {$languageStore == LANGUAGE.ENGLISH ? "MENU" : ArabicTerms.MENU}
      {/if}
    </button>
  </div>
</nav>

{#if $menuActive}
  <Menu />
{/if}

<style lang="scss">
  @import "../../styles/responsive.scss";

  nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
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
    color: var(--black);
    text-decoration: none;

    &.ARABIC {
      flex-direction: row-reverse;
      font-family: var(--font-family-arabic);
    }
  }

  .title {
    border-bottom: 1.5px solid transparent;
    // font-weight: bold;

    .short-title {
      display: none;
      @include screen-size("small") {
        display: block;
        font-weight: bold;
      }
    }

    .full-title {
      display: block;
      @include screen-size("small") {
        display: none;
      }
    }

    // @include screen-size("small") {
    //   width: 100%;
    //   text-align: left;
    //   height: 41px;
    //   line-height: 51px;
    // }

    &:hover {
      // border-bottom: 1.5px solid var(--black);
      color: var(--orange);
    }

    &.ARABIC {
      // font-size: 24px;
      font-family: var(--font-family-arabic);
    }
  }

  .actions {
    display: flex;
    align-items: center;

    // @include screen-size("small") {
    //   width: 100%;
    //   // background: yellow;
    //   justify-content: space-between;
    //   padding-bottom: 10px;
    // }

    &.ARABIC {
      flex-direction: row-reverse;
    }

    .menu-toggle {
      border-bottom: 1.5px solid transparent;

      &:hover {
        color: var(--orange);
        // border-bottom: 1.5px solid var(--black);
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

      &:hover {
        color: var(--orange);
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

  .icon {
    font-family: var(--font-family);
  }
</style>
