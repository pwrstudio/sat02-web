<script lang="ts">
  import { COLOR, LANGUAGE, type Node } from "$lib/modules/types"
  import Tag from "$lib/components/Elements/Tag.svelte"
  import Map from "$lib/components/Map/Map.svelte"
  import { languageStore } from "$lib/modules/stores"
  import { ArabicTerms } from "$lib/modules/constants"
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
    <Tag color={COLOR.WHITE}
      >{$languageStore === LANGUAGE.ARABIC
        ? ArabicTerms.VENUE_S
        : "Venues"}</Tag
    >
  </div>

  <Map {venues} disableZoom={true} />
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
    background: var(--orange);
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
