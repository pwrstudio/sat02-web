<script lang="ts">
  import { onMount } from "svelte"
  import MenuBar from "$lib/components/Menu/MenuBar.svelte"
  import Footer from "$lib/components/Elements/Footer.svelte"
  import { languageStore } from "$lib/modules/stores"
  import { LANGUAGE } from "$lib/modules/types"

  let bodyElement: HTMLElement | null
  let htmlElement: HTMLElement | null

  $: if ($languageStore === LANGUAGE.ARABIC) {
    switchLanguage(LANGUAGE.ARABIC)
  } else if ($languageStore === LANGUAGE.ENGLISH) {
    switchLanguage(LANGUAGE.ENGLISH)
  }

  const switchLanguage = (language: LANGUAGE) => {
    if (!htmlElement) return
    if (!bodyElement) return

    if (language === LANGUAGE.ARABIC) {
      bodyElement.classList.remove("ENGLISH")
      bodyElement.classList.add("ARABIC")
      htmlElement.setAttribute("lang", "ar")
    }

    if (language === LANGUAGE.ENGLISH) {
      bodyElement.classList.remove("ARABIC")
      bodyElement.classList.add("ENGLISH")
      htmlElement.setAttribute("lang", "en")
    }
  }

  onMount(() => {
    bodyElement = document.body
    htmlElement = document.querySelector("html")
    switchLanguage($languageStore)
  })
</script>

<MenuBar />
<main class={LANGUAGE[$languageStore]}>
  <slot />
</main>
<Footer />

<style lang="scss">
  @import "../lib/styles/responsive.scss";

  main {
    width: 100vw;
    padding-top: var(--menubar-height);
    overflow-x: hidden;
    overflow-y: hidden;

    @include screen-size("small") {
      padding-top: var(--menubar-height-phone);
    }

    &.ARABIC {
      direction: rtl;
      text-align: right;
      font-family: var(--font-family-arabic);
    }
  }
</style>
