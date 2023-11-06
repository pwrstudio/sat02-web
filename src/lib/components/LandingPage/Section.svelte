<script lang="ts">
  import type { Node } from "$lib/modules/types"
  import { DECO_TYPE } from "$lib/modules/types"

  import DecoCircleOne from "$lib/components/Deco/DecoCircleOne.svelte"
  import DecoCircleTwo from "$lib/components/Deco/DecoCircleTwo.svelte"
  import DecoLineOne from "$lib/components/Deco/DecoLineOne.svelte"
  import DecoLineTwo from "$lib/components/Deco/DecoLineTwo.svelte"
  import Column from "./Column.svelte"
  import SingleModule from "./SingleModule.svelte"
  import IntersectionObserver from "svelte-intersection-observer"

  export let node: Node
  export let venues: any
  let sectionEl: HTMLElement

  let inView = false

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
  <IntersectionObserver
    element={sectionEl}
    on:intersect={e => {
      inView = true
      console.log(e.detail) // IntersectionObserverEntry
      console.log(e.detail.isIntersecting) // true
    }}
  >
    <section class:spaced={node.spaced} bind:this={sectionEl}>
      <!-- Deco -->
      {#if inView}
        <svelte:component
          this={decoComponent.component}
          {...decoComponent.props}
        />
      {/if}
      {#each node.children as child}
        {#if child.type === "column"}
          <Column node={child} {venues} />
        {:else}
          <SingleModule node={child} {venues} />
        {/if}
      {/each}
    </section>
  </IntersectionObserver>
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
    overflow: hidden;
  }
</style>
