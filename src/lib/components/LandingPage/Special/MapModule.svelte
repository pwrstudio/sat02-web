<script lang="ts">
  import { COLOR, type Node } from "$lib/modules/types"
  import Tag from "$lib/components/Tag.svelte"
  import Map from "$lib/components/Map.svelte"
  export let node: Node
  export let venues: any[]
</script>

<div
  class="map"
  class:white={node.bgColor == COLOR.WHITE}
  style={"background-color: " + node.bgColor + ";"}
>
  <!-- META TOP -->
  <div class="meta-top">
    <!-- TYPE -->
    <Tag color={COLOR.WHITE}>Venues</Tag>
  </div>

  <Map {venues} />
</div>

<style lang="scss">
  @import "../../../styles/responsive.scss";

  .map {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    color: var(--black);
    width: 100%;
    height: 100%;
    background: var(--green);

    .meta-top {
      position: absolute;
      top: var(--double-padding);
      left: var(--double-padding);
      width: 100%;
      margin-bottom: var(--default-padding);
      display: flex;
      justify-content: space-between;
    }
  }
</style>
