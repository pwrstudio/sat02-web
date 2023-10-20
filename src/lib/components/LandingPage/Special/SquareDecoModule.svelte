<script lang="ts">
  import { onMount } from "svelte"
  import { COLOR, type CircleGroup } from "$lib/modules/types"
  import { createNestedCircularPatternWithGroups } from "$lib/modules/graphics"
  let circularOneEl: HTMLDivElement
  export let node: Node

  export let color: COLOR = COLOR.BLUE

  onMount(() => {
    const circleGroups: CircleGroup[] = [
      {
        circleCount: 2,
        dotRadius: 20,
        baseDistance: 48,
        verticalShiftRange: 1,
        horizontalShiftRange: 1,
      },
      {
        circleCount: 6,
        dotRadius: 12,
        baseDistance: 40,
        verticalShiftRange: 1,
        horizontalShiftRange: 1,
      },
      {
        circleCount: 3,
        dotRadius: 20,
        baseDistance: 50,
        verticalShiftRange: 1,
        horizontalShiftRange: 1,
      },
    ]
    createNestedCircularPatternWithGroups(circularOneEl, circleGroups, color)
  })
</script>

<div
  class="square-deco"
  class:white={node.bgColor == COLOR.WHITE}
  style={"background-color: " + node.bgColor + ";"}
>
  <div bind:this={circularOneEl} />
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
    overflow: hidden;
    position: relative;
    z-index: var(--z-content);

    img {
      aspect-ratio: 1;
      width: 260%;
      height: 260%;
      object-fit: cover;
      object-position: center;
    }
  }
</style>
