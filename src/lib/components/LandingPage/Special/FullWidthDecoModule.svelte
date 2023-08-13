<script lang="ts">
  import dots from "$lib/assets/dots3.svg"
</script>

<div class="full-width-deco">
  <div class="inner">
    <img src={dots} alt="dots" />
  </div>
</div>

<style lang="scss">
  @import "../../../styles/responsive.scss";

  .full-width-deco {
    width: 100%;
    aspect-ratio: 4 / 1;
    display: flex;
    align-items: center;
    justify-content: center;
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
        object-fit: cover;
        object-position: center;
      }
    }
  }
</style>
