<script lang="ts">
  import { COLOR, type Node } from "$lib/modules/types"
  export let node: Node
</script>

<div
  class="dates"
  class:white={node.bgColor == COLOR.WHITE}
  style={"background-color: " + node.bgColor + ";"}
>
  <div class="date start">11.11.2023</div>
  <div class="line" />
  <div class="date end">10.03.2024</div>
</div>

<style lang="scss">
  @import "../../../styles/responsive.scss";

  .dates {
    height: 80px;
    display: flex;
    align-items: center;
    color: var(--black);
    width: 100%;
    padding: var(--default-padding);
    background: var(--white);
    color: var(--white);

    .date {
      position: relative;
      z-index: var(--z-content);

      &.start {
        padding-right: var(--default-padding);
      }
      &.end {
        padding-left: var(--default-padding);
      }
    }

    .line {
      position: relative;
      z-index: var(--z-content);
      flex-grow: 1; // make the line element grow to take up all available space
      height: 1.5px; // height of the line
      background-color: var(--white); // color of the line
      // background: var(--white);
    }
  }
</style>
