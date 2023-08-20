<script lang="ts">
  import { onMount } from "svelte"
  import { createDottedLine } from "$lib/modules/graphics"

  let dotLineEl: HTMLDivElement

  onMount(() => {
    createDottedLine(dotLineEl, 2000, 10, 40, "#ff6c2f", 5, 5)
  })
</script>

<div class="dot-line" bind:this={dotLineEl} />

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
