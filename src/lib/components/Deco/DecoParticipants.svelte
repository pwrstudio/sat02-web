<script lang="ts">
  import { onMount } from "svelte"
  import { fade } from "svelte/transition"
  import { COLOR } from "$lib/modules/types"
  import {
    createDottedCircle,
    createDottedLine,
    revealGroups,
  } from "$lib/modules/graphics"
  let circleOneEl: HTMLDivElement
  let circleTwoEl: HTMLDivElement

  let lineOneEl: HTMLDivElement
  let lineTwoEl: HTMLDivElement

  let svgElements: SVGSVGElement[] = []

  export let color: COLOR = COLOR.ORANGE

  onMount(() => {
    svgElements = [
      createDottedCircle(circleOneEl, 1500, 5, 80, color, 5, 5),
      createDottedCircle(circleTwoEl, 2000, 10, 80, color, 5, 5),
      createDottedLine(lineOneEl, 3000, 5, 80, color, 5, 5),
    ]
    for (let i = 0; i < svgElements.length; i++) {
      revealGroups(svgElements[i], 2000)
    }
  })
</script>

<div class="deco" in:fade={{ delay: 1000 }}>
  <div class="circle one" bind:this={circleOneEl} />
  <div class="circle two" bind:this={circleTwoEl} />

  <div class="line one" bind:this={lineOneEl} />
  <div class="line two" bind:this={lineTwoEl} />
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

    .line {
      &.one {
        position: absolute;
        top: 500px;
        display: none;
        // top: 100px;
      }

      &.two {
        position: absolute;
        bottom: 10%;
      }

      &.three {
        position: relative;
        top: 200px;
      }
    }
  }

  .circle {
    width: 100%;
    height: 100%;

    &.one {
      position: absolute;
      right: 500px;
      top: 100px;
    }

    &.two {
      position: absolute;
      top: 0px;
      right: 0px;
    }

    &.three {
      position: absolute;
      top: 0px;
      left: 0px;
      // background: red;
    }
  }
</style>
