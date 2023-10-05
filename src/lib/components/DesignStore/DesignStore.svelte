<script lang="ts">
  import { LANGUAGE } from "$lib/modules/types"
  import { languageStore } from "$lib/modules/stores"
  import { fade } from "svelte/transition"
  import { renderBlockText } from "$lib/modules/sanity"

  import PlaceholderText from "$lib/components/Page/PlaceholderText.svelte"
  import DecoPageTwo from "$lib/components/LandingPage/Deco/DecoPageTwo.svelte"
  import { onMount } from "svelte"
  export let page: any
  export let storeItems: any[]

  console.log("storeItems", storeItems)

  let height = 0

  onMount(() => {
    height = document.body.scrollHeight
  })
</script>

<!-- DECO -->
<div class="deco-container" style={"height:" + height + "px;"}>
  <DecoPageTwo />
</div>

<div class="page {page._type}" in:fade={{ duration: 200 }}>
  <!-- LEFT -->
  <div class="column one">
    <!-- CONTENT -->
    <div class="content">
      {#if $languageStore == LANGUAGE.ARABIC}
        <!-- ARABIC -->
        {#if page.content_ar}
          {@html renderBlockText(page.content_ar.content)}
        {:else}
          <PlaceholderText />
        {/if}
        <!-- ENGLISH -->
      {:else if page.content}
        {@html renderBlockText(page.content.content)}
      {:else}
        <PlaceholderText />
      {/if}
    </div>
  </div>
</div>

<style lang="scss">
  @import "../../styles/responsive.scss";

  .page {
    display: flex;
    // justify-content: center;

    @include screen-size("phone") {
      flex-wrap: wrap;
    }

    .column {
      width: 50%;
      padding: var(--default-padding);

      @include screen-size("small") {
        width: 100%;
      }
    }
  }

  .deco-container {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
  }
</style>
