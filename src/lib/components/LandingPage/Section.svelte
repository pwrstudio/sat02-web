<script lang="ts">
  import type { Node } from "$lib/modules/types"
  import { DECO_TYPE } from "$lib/modules/types"
  import DecoCircleOne from "$lib/components/Deco/DecoCircleOne.svelte"
  import DecoCircleTwo from "$lib/components/Deco/DecoCircleTwo.svelte"
  import DecoLineOne from "$lib/components/Deco/DecoLineOne.svelte"
  import DecoLineTwo from "$lib/components/Deco/DecoLineTwo.svelte"
  import Column from "./Column.svelte"
  import SingleModule from "./SingleModule.svelte"
  export let node: Node
  export let venues: any

  const getDecoComponent = (decoType: DECO_TYPE) => {
    switch (decoType) {
      case DECO_TYPE.CIRCLE_ONE:
        return { component: DecoCircleOne, props: { color: node.decoColor } }
      case DECO_TYPE.CIRCLE_TWO:
        return { component: DecoCircleTwo, props: { color: node.decoColor } }
      case DECO_TYPE.LINE_ONE:
        return { component: DecoLineOne, props: { color: node.decoColor } }
      case DECO_TYPE.LINE_TWO:
        return { component: DecoLineTwo, props: { color: node.decoColor } }
      default:
        return { component: null, props: { node } }
    }
  }
  const decoComponent = getDecoComponent(node.decoType || DECO_TYPE.NONE)
</script>

{#if node.children}
  <section class:spaced={node.spaced}>
    <!-- Deco -->
    <svelte:component this={decoComponent.component} {...decoComponent.props} />
    {#each node.children as child}
      {#if child.type === "column"}
        <Column node={child} {venues} />
      {:else}
        <SingleModule node={child} {venues} />
      {/if}
    {/each}
  </section>
{/if}

<style lang="scss">
  @import "../../styles/responsive.scss";

  section {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    background: var(--green);

    &.spaced {
      padding-top: 100px;
      @include screen-size("small") {
        padding-top: 25px;
      }
    }
  }
</style>
