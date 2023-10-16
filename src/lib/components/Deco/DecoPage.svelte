<script lang="ts">
  import { onMount } from "svelte"
  import { fade } from "svelte/transition"
  import { COLOR } from "$lib/modules/types"
  import {
    createDottedCircle,
    createVerticalDottedLine,
  } from "$lib/modules/graphics"
  let circleOneEl: HTMLDivElement
  let circleTwoEl: HTMLDivElement
  let lineOneEl: HTMLDivElement

  export let color: COLOR = COLOR.ORANGE

  onMount(() => {
    createDottedCircle(circleOneEl, 2200, 10, 80, color, 5, 5)
    createDottedCircle(circleTwoEl, 3000, 20, 80, color, 5, 5)
    // createVerticalDottedLine(lineOneEl, 2000, 10, 60, color, 2, 2)
  })
</script>

<div class="deco" in:fade={{ delay: 1000 }}>
  <div class="circle one" bind:this={circleOneEl} />
  <div class="circle two" bind:this={circleTwoEl} />
  <!-- <div class="line one" bind:this={lineOneEl} /> -->
  <!-- <div class="circle three" bind:this={circleThreeEl} /> -->
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
