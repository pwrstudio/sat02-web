<script lang="ts">
  import { onMount } from "svelte"
  import { COLOR, type Node } from "$lib/modules/types"
  import { createDottedLine } from "$lib/modules/graphics"

  export let node: Node

  let dotLineEl: HTMLDivElement

  onMount(() => {
    createDottedLine(dotLineEl, 2000, 10, 40, "#ff6c2f", 5, 5)
  })
</script>

<div
  class="dot-line"
  class:white={node.bgColor == COLOR.WHITE}
  style={"background-color: " + node.bgColor + ";"}
  bind:this={dotLineEl}
/>

<style lang="scss">
  @import "../../../styles/responsive.scss";

  .dot-line {
    height: 60px;
    display: flex;
    align-items: center;
    color: var(--black);
    width: 100%;
    padding: 0, var(--default-padding);
    background: var(--green);
  }
</style>
