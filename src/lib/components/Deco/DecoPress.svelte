<script lang="ts">
  import { onMount } from "svelte"
  import { fade } from "svelte/transition"
  import { COLOR } from "$lib/modules/types"
  import { createVerticalDottedLine } from "$lib/modules/graphics"

  let lineOneEl: HTMLDivElement
  let lineTwoEl: HTMLDivElement
  let lineThreeEl: HTMLDivElement

  export let color: COLOR = COLOR.ORANGE

  onMount(() => {
    createVerticalDottedLine(lineOneEl, 6000, 10, 60, color, 2, 2)
    createVerticalDottedLine(lineTwoEl, 6000, 5, 60, color, 2, 2)
    createVerticalDottedLine(lineThreeEl, 6000, 5, 60, color, 2, 2)
  })
</script>

<div class="deco" in:fade={{ delay: 1000 }}>
  <div class="line one" bind:this={lineOneEl} />
  <div class="line two" bind:this={lineTwoEl} />
  <div class="line three" bind:this={lineThreeEl} />
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
        left: calc(50% - 15px);
        top: 0;
        @include screen-size("phone") {
          display: none;
        }
      }

      &.two {
        position: absolute;
        top: 0;
        left: calc(20% - 10px);
        @include screen-size("phone") {
          left: calc(50% - 10px);
        }
      }

      &.three {
        position: absolute;
        top: 0;
        left: calc(85% - 15px);
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
        right: 10px;
      }
    }
  }
</style>
