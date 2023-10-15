<script lang="ts">
  import { onMount } from "svelte"
  import { COLOR } from "$lib/modules/types"
  import DecoPage from "$lib/components/LandingPage/Deco/DecoPage.svelte"
  import { DECO_TYPE } from "$lib/modules/types"
  import DecoCircleOne from "$lib/components/LandingPage/Deco/DecoCircleOne.svelte"
  import DecoCircleTwo from "$lib/components/LandingPage/Deco/DecoCircleTwo.svelte"
  import DecoLineOne from "$lib/components/LandingPage/Deco/DecoLineOne.svelte"
  import DecoLineTwo from "$lib/components/LandingPage/Deco/DecoLineTwo.svelte"
  export let title = ""

  let height = 0

  onMount(() => {
    height = document.body.scrollHeight
  })

  const getDecoComponent = (title: string) => {
    console.log("title", title)
    switch (title) {
      case "Participants":
        return { component: DecoCircleTwo, props: { color: COLOR.BLUE } }
      case "Projects":
        return { component: DecoCircleTwo, props: { color: COLOR.ORANGE } }
      default:
        return { component: DecoCircleTwo, props: { color: COLOR.BLUE } }
    }
  }
  const decoComponent = getDecoComponent(title)
</script>

<!-- DECO -->
<div class="deco-container" style={"height:" + height + "px;"}>
  <svelte:component this={decoComponent.component} {...decoComponent.props} />
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
