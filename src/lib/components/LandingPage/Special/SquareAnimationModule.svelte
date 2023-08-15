<script lang="ts">
  import ani from "$lib/assets/ani.mp4"
</script>

<div class="square-deco">
  <video src={ani} autoplay loop muted />
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

    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
</style>
