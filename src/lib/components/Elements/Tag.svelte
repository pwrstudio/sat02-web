<script lang="ts">
  import { languageStore } from "$lib/modules/stores"
  import { COLOR, LANGUAGE } from "$lib/modules/types"
  export let color: COLOR = COLOR.WHITE
  export let linked: boolean = false
</script>

<div
  class:linked
  class="tag {LANGUAGE[$languageStore]}"
  class:black={color === COLOR.BLACK}
>
  <slot />
</div>

<style lang="scss">
  @import "../../styles/responsive.scss";

  .tag {
    font-size: var(--font-size-small);
    font-family: var(--font-family);
    padding: 5px 12px;
    display: inline-block;
    user-select: none;
    position: relative;
    z-index: var(--z-content);
    text-transform: capitalize;
    color: var(--white);
    border: 1px solid var(--white-transparent);
    margin-right: 10px;

    &.linked {
      &:hover {
        cursor: pointer;
        background: var(--white-transparent);
        color: var(--black);
      }
    }

    &.ARABIC {
      font-family: var(--font-family-arabic);
    }

    &.black {
      color: var(--black);
      border: 1px solid var(--black);
    }
  }
</style>
