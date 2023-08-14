<script lang="ts">
  export let style: "rounded" | "square" = "square"
  export let border: boolean = false
</script>

<div class="tag {style}" class:border>
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
    word-spacing: -0.3em;
    user-select: none;

    &.rounded {
      padding: 5px 16px;
      border-radius: 10px;
    }

    &.border {
      border: 1px solid var(--black);
    }
  }
</style>
