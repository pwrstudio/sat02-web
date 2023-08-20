<script lang="ts">
  import { COLOR, type Node } from "$lib/modules/types"
  import { onMount } from "svelte"
  import { createDottedCircle, createDottedLine } from "$lib/modules/graphics"
  export let node: Node

  let circleOneEl: HTMLDivElement
  let circleTwoEl: HTMLDivElement
  let circleThreeEl: HTMLDivElement
  let lineOneEl: HTMLDivElement

  onMount(() => {
    createDottedCircle(circleOneEl, 2000, 10, 80, "#ff6c2f", 5, 5)
    createDottedCircle(circleTwoEl, 2000, 20, 80, "#ff6c2f", 5, 5)
    createDottedCircle(circleThreeEl, 1000, 20, 80, "#ff6c2f", 5, 5)
    createDottedLine(lineOneEl, 200, 10, 40, "#ff6c2f", 5, 5)
  })
</script>

<div
  class="square-deco"
  class:white={node.bgColor == COLOR.WHITE}
  style={"background-color: " + node.bgColor + ";"}
>
  <div class="circle one" bind:this={circleOneEl} />
  <div class="circle two" bind:this={circleTwoEl} />
  <div class="circle three" bind:this={circleThreeEl} />
  <!-- <div class="line one" bind:this={lineOneEl} /> -->
</div>

<style lang="scss">
  @import "../../../styles/responsive.scss";

  .square-deco {
    aspect-ratio: 2 / 1;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--black);
    width: 100%;
    background: var(--green);
    // overflow: hidden;
    z-index: var(--z-deco);
    pointer-events: none;

    .line {
      width: 100%;
      height: 100%;
      background: red;

      &.one {
        position: absolute;
        left: 50px;
        top: 100px;
      }

      &.two {
        position: relative;
        top: 200px;
      }

      &.three {
        position: relative;
        top: 200px;
      }
    }

    .circle {
      width: 100%;
      height: 100%;

      &.one {
        position: absolute;
        left: 50px;
        top: 100px;
      }

      &.two {
        position: relative;
        top: 0px;
      }

      &.three {
        position: relative;
        top: 200px;
      }
    }
  }
</style>
