<script lang="ts">
  export let style: "rounded" | "square" = "square"
  export let border: boolean = false
  export let caps: boolean = true
</script>

<div class="tag {style}" class:border class:caps>
  <slot />
</div>

<style lang="scss">
  .tag {
    font-size: var(--font-size-xs);
    font-family: var(--font-family-mono);
    padding: 5px 12px;
    background: var(--white-transparent);
    display: inline-block;
    word-spacing: -0.3em;
    user-select: none;
    position: relative;
    z-index: var(--z-content);

    &.rounded {
      padding: 5px 16px;
      border-radius: 10px;
    }

    &.border {
      border: 1px solid var(--black);
    }

    &.caps {
      text-transform: uppercase;
    }
  }
</style>
