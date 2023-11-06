<script lang="ts">
  import { onMount } from "svelte"
  import { COLOR } from "$lib/modules/types"
  import { createDottedCircle, revealGroups } from "$lib/modules/graphics"

  let circleOneEl: HTMLDivElement
  let circleTwoEl: HTMLDivElement
  let circleThreeEl: HTMLDivElement

  let svgElements: SVGSVGElement[] = []
  let decoEl: HTMLDivElement

  export let color: COLOR = COLOR.ORANGE

  onMount(async () => {
    svgElements = [
      createDottedCircle(circleOneEl, 2000, 7, 80, color, 5, 5),
      createDottedCircle(circleTwoEl, 2000, 20, 80, color, 5, 5),
      createDottedCircle(circleThreeEl, 1000, 10, 60, color, 5, 5),
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
  <div class="circle three" bind:this={circleThreeEl} />
</div>

<style lang="scss">
  @import "../../styles/responsive.scss";

  .deco {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: var(--z-deco);
    pointer-events: none;
    overflow: hidden;
    // background: rgba(255, 0, 0, 0.3);
    width: 100%;
    height: 100%;
  }

  .circle {
    width: 100%;
    height: 100%;

    &.one {
      position: absolute;
      left: 500px;
      top: 100px;
    }

    &.two {
      position: absolute;
      top: 0px;
      right: 0px;
    }

    &.three {
      position: absolute;
      top: 100px;
      left: -500px;
      transform: rotate(-135deg);
      // background: red;
    }
  }
</style>
