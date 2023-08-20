<script lang="ts">
  import type { Node } from "$lib/modules/types"
  import { COLOR } from "$lib/modules/types"
  import Deco from "$lib/components/LandingPage/Deco/Deco.svelte"
  import Column from "./Column.svelte"
  import SingleModule from "./SingleModule.svelte"
  export let node: Node
</script>

{#if node.children}
  <section>
    <Deco color={node.decoColor} />
    {#each node.children as child}
      {#if child.type === "column"}
        <Column node={child} />
      {:else}
        <SingleModule node={child} />
      {/if}
    {/each}
  </section>
{/if}

<style lang="scss">
  section {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    position: relative;
  }
</style>
