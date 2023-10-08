<script lang="ts">
  import { onMount } from "svelte"
  import { COLOR } from "$lib/modules/types"
  import DecoPage from "$lib/components/LandingPage/Deco/DecoPage.svelte"
  export let title = ""

  let height = 0

  onMount(() => {
    height = document.body.scrollHeight
  })
</script>

<!-- DECO -->
<div class="deco-container" style={"height:" + height + "px;"}>
  <DecoPage color={COLOR.BLUE} />
</div>

<div class="header-bar">
  <!-- <div class="inner">
    {title}
  </div> -->
</div>

<style lang="scss">
  @import "../styles/responsive.scss";

  .header-bar {
    height: var(--headerbar-height);
    background: var(--green);
    width: 100%;
    overflow: hidden;
    padding: var(--double-padding);
    font-size: var(--font-size-xlarge);
  }

  .deco-container {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
