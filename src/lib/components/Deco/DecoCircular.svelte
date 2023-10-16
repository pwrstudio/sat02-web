<script lang="ts">
  import { onMount } from "svelte"
  import { fade } from "svelte/transition"
  import { COLOR } from "$lib/modules/types"
  import { createCircularPattern } from "$lib/modules/graphics"
  let circularOneEl: HTMLDivElement

  export let color: COLOR = COLOR.ORANGE

  onMount(() => {
    createCircularPattern(circularOneEl, 2000, 10, 80, color, 5, 5)
  })
</script>

<div class="deco" in:fade={{ delay: 1000 }}>
  <div class="circular one" bind:this={circularOneEl} />
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
        top: 10%;
        // left: 50px;
        // top: 100px;
      }

      &.two {
        position: absolute;
        bottom: 10%;
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
