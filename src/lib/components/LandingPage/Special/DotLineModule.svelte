<script lang="ts">
  import DotLine from "$lib/components/Graphics/DotLine.svelte"
</script>

<div class="dot-line">
  <DotLine />
  <!-- <DotLine /> -->
</div>

<style lang="scss">
  @import "../../../styles/responsive.scss";

  .dot-line {
    height: 80px;
    display: flex;
    align-items: center;
    color: var(--black);
    width: 100%;
    padding: var(--default-padding);
    background: var(--green);
  }
</style>
