<script lang="ts">
  import { onMount } from "svelte"
  import { fade } from "svelte/transition"
  import { COLOR } from "$lib/modules/types"
  import { createDottedCircle, createDottedLine } from "$lib/modules/graphics"
  let circleOneEl: HTMLDivElement
  let circleTwoEl: HTMLDivElement
  let circleThreeEl: HTMLDivElement
  let lineOneEl: HTMLDivElement

  export let color: COLOR = COLOR.ORANGE

  onMount(() => {
    createDottedCircle(circleOneEl, 2200, 10, 80, color, 5, 5)
    createDottedCircle(circleTwoEl, 3000, 20, 80, color, 5, 5)
    // createDottedLine(lineOneEl, 2000, 10, 40, color, 5, 5)
  })
</script>

<div class="deco" in:fade={{ delay: 1000 }}>
  <div class="circle one" bind:this={circleOneEl} />
  <div class="circle two" bind:this={circleTwoEl} />
  <!-- <div class="circle three" bind:this={circleThreeEl} /> -->
  <!-- <div class="line one" bind:this={lineOneEl} /> -->
</div>

<style lang="scss">
  @import "../../../styles/responsive.scss";

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

    .circle {
      width: 100%;
      height: 100%;

      &.one {
        position: absolute;
        left: -900px;
        top: 100px;
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
