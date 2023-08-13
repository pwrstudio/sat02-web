<script lang="ts">
  export let style: "rounded" | "square" = "square"
</script>

<div class="tag {style}">
  <slot />
</div>

<style lang="scss">
  .tag {
    font-size: var(--font-size-xs);
    font-family: var(--font-family-mono);
    padding: 5px 12px;
    background: var(--white-transparent);
    display: inline-block;
    text-transform: uppercase;
    // letter-spacing: 0.1em;

    &.rounded {
      border-radius: 10px;
    }
  }
</style>
