<script lang="ts">
  import { COLOR, type Node } from "$lib/modules/types"
  import Map from "$lib/components/Map.svelte"
  export let node: Node
</script>

<div
  class="map"
  class:white={node.bgColor == COLOR.WHITE}
  style={"background-color: " + node.bgColor + ";"}
>
  <Map />
</div>

<style lang="scss">
  @import "../../../styles/responsive.scss";

  .map {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--black);
    width: 100%;
    height: 100%;
    background: var(--green);
  }
</style>
