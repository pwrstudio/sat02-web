<script lang="ts">
</script>

<div class="round-tag">
  <slot />
</div>

<style lang="scss">
  .round-tag {
    font-size: var(--font-size-small);
    color: var(--orange);
    background: var(--white);
    display: inline-block;
    word-spacing: -0.3em;
    user-select: none;
    position: relative;
    z-index: var(--z-content);
    border-radius: 50%;
    aspect-ratio: 1/1;
    height: 25px;
    width: 25px;
    line-height: 25px;
    margin-left: var(--half-padding);
    margin-right: var(--half-padding);
    position: relative;
    top: -2px;
  }
</style>
