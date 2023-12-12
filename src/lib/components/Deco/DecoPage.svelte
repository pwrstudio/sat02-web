<script lang="ts">
  import { onMount } from "svelte"
  import { fade } from "svelte/transition"
  import { COLOR } from "$lib/modules/types"
  import { createDottedCircle, revealGroups } from "$lib/modules/graphics"
  let circleOneEl: HTMLDivElement
  let circleTwoEl: HTMLDivElement

  let svgElements: SVGSVGElement[] = []

  export let color: COLOR = COLOR.ORANGE

  onMount(() => {
    svgElements = [
      createDottedCircle(circleOneEl, 2000, 10, 80, color, 5, 5),
      createDottedCircle(circleTwoEl, 2000, 20, 80, color, 5, 5),
    ]
    for (let i = 0; i < svgElements.length; i++) {
      revealGroups(svgElements[i], 2000)
    }
  })
</script>

<div class="deco" in:fade={{ delay: 1000 }}>
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
    // background: rgba(255, 0, 0, 0.3);
    width: 100%;
    height: 100%;

    .line {
      width: 100%;
      height: 100%;

      &.one {
        position: absolute;
        left: calc(50% - 10px);
        top: 0;
      }
    }

    .circle {
      width: 100%;
      height: 100%;

      &.one {
        position: absolute;
        left: -700px;
        top: 100px;
      }

      &.two {
        position: absolute;
        top: -5px;
        right: -120px;
      }

      &.three {
        position: absolute;
        top: 0px;
        left: 0px;
      }
    }
  }
</style>
