<script lang="ts">
  import { onMount } from "svelte"
  import { COLOR } from "$lib/modules/types"
  import { createNestedCircularPattern } from "$lib/modules/graphics"
  let circularOneEl: HTMLDivElement
  export let node: Node

  export let color: COLOR = COLOR.BLUE

  onMount(() => {
    createNestedCircularPattern(circularOneEl, 1000, 10, 30, color, 0, 0)
  })
</script>

<div
  class="full-width-deco"
  class:white={node.bgColor == COLOR.WHITE}
  style={"background-color: " + node.bgColor + ";"}
>
  <div
    class:white={node.bgColor == COLOR.WHITE}
    style={"background-color: " + node.bgColor + ";"}
    bind:this={circularOneEl}
  />
</div>

<style lang="scss">
  @import "../../../styles/responsive.scss";

  .full-width-deco {
    width: 100%;
    aspect-ratio: 4 / 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--green);
  }
</style>
