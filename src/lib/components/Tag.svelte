<script lang="ts">
  export let style: "rounded" | "square" = "square"
</script>

<div class="tag {style}">
  <slot />
</div>

<style lang="scss">
  .tag {
    font-size: var(--font-size-xs);
    padding: 3px 12px;
    background: var(--white-transparent);
    display: inline-block;
    text-transform: capitalize;

    &.rounded {
      border-radius: 10px;
    }
  }
</style>
