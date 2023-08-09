<script lang="ts">
  import Module from "$lib/components/Module.svelte"
  export let data
  const { projects, participants, events } = data
</script>

<div class="landing-container">
  {#each projects.slice(0, 4) as post}
    <Module {post} bgcolor="green" width="half" category="project" />
  {/each}

  {#each participants.slice(0, 4) as post}
    <Module {post} bgcolor="orange" width="half" category="participant" />
  {/each}
</div>

<style lang="scss">
  .landing-container {
    display: flex;
    flex-wrap: wrap;
  }
</style>
