<script lang="ts">
  import dots from "$lib/assets/dots3.svg"
  import Dots from "$lib/components/Graphics/Dots.svelte"
</script>

<div class="square-deco">
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

    img {
      aspect-ratio: 1;
      width: 260%;
      height: 260%;
      object-fit: cover;
      object-position: center;
    }
  }
</style>
