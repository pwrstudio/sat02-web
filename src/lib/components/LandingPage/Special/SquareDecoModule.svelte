<script lang="ts">
  import dots from "$lib/assets/dots3.svg"
</script>

<div class="square-deco">
  <div class="inner">
    <img src={dots} alt="dots" />
  </div>
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
    // padding: var(--default-padding);
    background: var(--orange);
    overflow: hidden;

    .inner {
      width: 85%;
      height: 85%;
      background: var(--green);
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      // transform: rotate(45deg);

      img {
        aspect-ratio: 1;
        width: 260%;
        height: 260%;
        object-fit: cover;
        object-position: center;
      }
    }
  }
</style>
