<script lang="ts">
  import { onMount } from "svelte"
  import { COLOR } from "$lib/modules/types"
  import { createDottedCircle, revealGroups } from "$lib/modules/graphics"
  let circleOneEl: HTMLDivElement
  let circleTwoEl: HTMLDivElement

  let svgElements: SVGSVGElement[] = []
  let decoEl: HTMLDivElement

  export let color: COLOR = COLOR.ORANGE

  onMount(() => {
    svgElements = [
      createDottedCircle(circleOneEl, 2200, 10, 80, color, 5, 5),
      createDottedCircle(circleTwoEl, 3000, 20, 80, color, 5, 5),
    ]
    for (let i = 0; i < svgElements.length; i++) {
      revealGroups(svgElements[i], 2000)
    }
    new simpleParallax(decoEl, {
      delay: 0,
      orientation: "up",
      scale: 1.2,
      overflow: true,
    })
  })
</script>

<div class="deco" bind:this={decoEl}>
  <div class="circle one" bind:this={circleOneEl} />
  <div class="circle two" bind:this={circleTwoEl} />
</div>

<style lang="scss">
  @import "../../styles/responsive.scss";

  .deco {
    position: absolute;
    top: -10px;
    left: 0;
    width: 100%;
    z-index: var(--z-deco);
    pointer-events: none;
    overflow: hidden;
    width: 100%;
    height: 100%;
    height: 200%;

    .circle {
      width: 100%;
      height: 100%;

      &.one {
        position: absolute;
        left: -900px;
        top: 0px;
      }

      &.two {
        position: absolute;
        top: 0px;
        right: -200px;
      }

      &.three {
        position: absolute;
        top: 0px;
        left: 0px;
        // background: red;
      }
    }
  }
</style>
