<script lang="ts">
  import dots from "$lib/assets/dots3.svg"
</script>

<div class="header-bar">
  <img src={dots} alt="dots" />
</div>

<style lang="scss">
  .header-bar {
    height: var(--header-height);
    background: var(--orange);
    width: 100%;
    overflow: hidden;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
</style>
