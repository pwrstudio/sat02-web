<script lang="ts">
  import { languageStore } from "$lib/modules/stores"
  import type { BorderOption } from "$lib/modules/types"
  import { LANGUAGE } from "$lib/modules/types"
  import { COLOR } from "$lib/modules/types"

  export let border: BorderOption
  export let color: COLOR

  let colorClass = color === COLOR.WHITE ? "white" : "black"

  console.log("border", border)
</script>

<!-- DIVIDER: ENGLISH => LEFT, ARABIC => RIGHT -->
{#if border.left}
  <div
    class="divider {$languageStore === LANGUAGE.ARABIC
      ? 'right'
      : 'left'} {colorClass}"
  >
    <div class="line" />
  </div>
{/if}

<!-- DIVIDER: ENGLISH => RIGHT, ARABIC => LEFT -->
{#if border.right}
  <div
    class="divider {$languageStore === LANGUAGE.ARABIC
      ? 'left'
      : 'right'}  {colorClass}"
  >
    <div class="line" />
  </div>
{/if}

<!-- DIVIDER TOP -->
{#if border.top}
  <div class="divider top {colorClass}">
    <div class="line" />
  </div>
{/if}

<!-- DIVIDER BOTTOM -->
{#if border.bottom}
  <div class="divider bottom {colorClass}">
    <div class="line" />
  </div>
{/if}

<style lang="scss">
  @import "../../../styles/responsive.scss";

  .divider {
    position: absolute;
    z-index: var(--z-content);

    --line-width: 1.5px;
    --padding: var(--double-padding);

    &.white {
      background: var(--white-transparent);
    }

    &.black {
      background: var(--black);
    }

    &.left {
      width: var(--line-width);
      left: 0;
      top: var(--padding);
      height: calc(100% - 2 * var(--padding));
    }

    &.right {
      width: var(--line-width);
      right: 0;
      top: var(--padding);
      height: calc(100% - 2 * var(--padding));
    }

    &.bottom {
      height: var(--line-width);
      bottom: 0;
      left: var(--padding);
      width: calc(100% - 2 * var(--padding));
    }

    &.top {
      height: var(--line-width);
      top: 0;
      left: var(--padding);
      width: calc(100% - 2 * var(--padding));
    }
  }
</style>
