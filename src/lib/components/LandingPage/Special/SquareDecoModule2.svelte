<script lang="ts">
  import { COLOR, type Node } from "$lib/modules/types"
  import Dots from "$lib/components/Graphics/Dots.svelte"
  export let node: Node
</script>

<div
  class="square-deco"
  class:white={node.bgColor == COLOR.WHITE}
  style={"background-color: " + node.bgColor + ";"}
>
  <Dots />
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
