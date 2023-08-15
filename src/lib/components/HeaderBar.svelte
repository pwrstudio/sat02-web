<script lang="ts">
  import Dots from "./Graphics/Dots.svelte"
</script>

<div class="header-bar">
  <div class="inner">
    <Dots />
  </div>
</div>

<style lang="scss">
  .header-bar {
    height: var(--header-height);
    background: var(--green);
    width: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

    .inner {
      width: 100%;
      height: 100%;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
