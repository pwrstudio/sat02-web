<script lang="ts">
  import { COLOR, type Node } from "$lib/modules/types"
  // import subtitle from "$lib/assets/subtitle.svg"
  export let node: Node
</script>

<div class="subtitle">
  <div class="inner">
    <!-- <img src={subtitle} alt="subtitle" /> -->
  </div>
</div>

<style
  lang="scss"
  class:white={node.bgColor == COLOR.WHITE}
  style={"background-color: " + node.bgColor + ";"}
>
  @import "../../../styles/responsive.scss";

  .subtitle {
    height: 100px;
    display: flex;
    align-items: center;
    color: var(--black);
    width: 100%;
    padding: var(--default-padding);
    background: var(--green);

    .inner {
      width: 100%;
      height: 100%;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        aspect-ratio: 1;
        width: 100%;
        height: 100%;
        object-fit: contain;
        object-position: center;
      }
    }
  }
</style>
