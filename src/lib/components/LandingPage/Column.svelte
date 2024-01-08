<script lang="ts">
  import type { Node, Post } from "$lib/modules/types"
  import SingleModule from "./SingleModule.svelte"
  export let node: Node
  export let venues: Post[]
</script>

{#if node.children}
  <div class="column">
    {#each node.children as child}
      <SingleModule node={child} {venues} />
    {/each}
  </div>
{/if}

<style lang="scss">
  @import "../../styles/responsive.scss";

  .column {
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    align-items: stretch;
    width: 50%;

    @include screen-size("small") {
      width: 100%;
    }
  }
</style>
