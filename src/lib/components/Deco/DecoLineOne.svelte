<script lang="ts">
  import { onMount } from "svelte"
  import { fade } from "svelte/transition"
  import { COLOR } from "$lib/modules/types"
  import {
    createDottedCircle,
    createDottedLine,
    createVerticalDottedLine,
    revealGroups,
  } from "$lib/modules/graphics"
  let circleOneEl: HTMLDivElement
  let lineOneEl: HTMLDivElement
  let lineTwoEl: HTMLDivElement

  let svgElements: SVGSVGElement[] = []

  export let color: COLOR = COLOR.ORANGE

  onMount(() => {
    svgElements = [
      createDottedLine(lineOneEl, 2000, 5, 40, color, 5, 5),
      createVerticalDottedLine(lineTwoEl, 6000, 5, 40, color, 5, 5),
      createDottedCircle(circleOneEl, 2600, 10, 80, color, 5, 5),
    ]
    for (let i = 0; i < svgElements.length; i++) {
      revealGroups(svgElements[i], 2000)
    }
  })
</script>

<div class="deco" in:fade={{ delay: 1000 }}>
  <div class="line one" bind:this={lineOneEl} />
  <div class="line two" bind:this={lineTwoEl} />
  <div class="circle one" bind:this={circleOneEl} />
  <!-- <div class="line two" bind:this={lineTwoEl} /> -->
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
    width: 100%;
    height: 100%;

    .line {
      &.one {
        position: absolute;
        top: 3%;
        // left: 50px;
        // top: 100px;
      }

      &.two {
        position: absolute;
        left: 50%;
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
      left: -1200px;
      top: 200px;
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
