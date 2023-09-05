<script lang="ts">
  import { fade } from "svelte/transition"
  import { renderBlockText } from "$lib/modules/sanity"

  import PlaceholderText from "$lib/components/Page/PlaceholderText.svelte"
  import DecoPage from "$lib/components/LandingPage/Deco/DecoPage.svelte"
  import DecoPageTwo from "$lib/components/LandingPage/Deco/DecoPageTwo.svelte"
  import { onMount } from "svelte"
  export let page: any

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
      {#if page.content}
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
    }
  }

  .deco-container {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
