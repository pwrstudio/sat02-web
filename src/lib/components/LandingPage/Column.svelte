<script lang="ts">
  import type { Node } from "$lib/modules/types"
  import SingleModule from "./SingleModule.svelte"
  export let node: Node
</script>

{#if node.children}
  <div class="column">
    {#each node.children as child}
      <SingleModule node={child} />
    {/each}
  </div>
{/if}

<style lang="scss">
  .column {
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    align-items: stretch;
    width: 50%;
  }
</style>
