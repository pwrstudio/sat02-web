<script lang="ts">
  import type { Node } from "$lib/modules/types"
  import Column from "./Column.svelte"
  import SingleModule from "./SingleModule.svelte"
  export let node: Node
</script>

{#if node.children}
  <section>
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
  }
</style>
