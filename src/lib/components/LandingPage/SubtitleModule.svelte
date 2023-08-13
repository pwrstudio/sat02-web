<script lang="ts">
  import subtitle from "$lib/assets/subtitle.svg"
  console.log("")
</script>

<div class="subtitle">
  <div class="inner">
    <img src={subtitle} alt="subtitle" />
  </div>
</div>

<style lang="scss">
  @import "../../styles/responsive.scss";

  .subtitle {
    height: 120px;
    display: flex;
    align-items: center;
    color: var(--black);
    width: 50%;
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
