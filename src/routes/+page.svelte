<script lang="ts">
  import Module from "$lib/components/Module.svelte"
  export let data
  const { frontpage } = data
</script>

<div class="landing-container">
  {#each frontpage as post}
    <Module {post} />
  {/each}
</div>

<style lang="scss">
  .landing-container {
    display: flex;
    flex-wrap: wrap;
  }
</style>
