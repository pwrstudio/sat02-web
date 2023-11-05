<script lang="ts">
  import { onMount } from "svelte"
  import { fade } from "svelte/transition"
  import { COLOR } from "$lib/modules/types"
  import { createVerticalDottedLine, revealGroups } from "$lib/modules/graphics"
  let lineOneEl: HTMLDivElement
  let lineTwoEl: HTMLDivElement

  let svgElements: SVGSVGElement[] = []

  export let color: COLOR = COLOR.ORANGE

  onMount(() => {
    svgElements = [
      createVerticalDottedLine(lineOneEl, 5000, 10, 60, color, 2, 2),
      createVerticalDottedLine(lineTwoEl, 5000, 5, 60, color, 2, 2),
    ]
    for (let i = 0; i < svgElements.length; i++) {
      revealGroups(svgElements[i], 4000)
    }
  })
</script>

<div class="deco" in:fade={{ delay: 1000 }}>
  <div class="line one" bind:this={lineOneEl} />
  <div class="line two" bind:this={lineTwoEl} />
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
        top: 0;
        left: 20%;
        // top: 100px;
        @include screen-size("phone") {
          left: calc(0% - 10px);
        }
      }

      &.two {
        position: absolute;
        top: 0;
        left: 90%;
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
