<script lang="ts">
  import HeaderBar from "$lib/components/HeaderBar.svelte"
  import Listing from "$lib/components/Listing/Listing.svelte"
  export let data
  const { projects } = data
</script>

<HeaderBar />

<header>PROJECTS ({projects.length})</header>

<Listing posts={projects} category="projects" />

<style lang="scss">
  header {
    padding: var(--default-padding);
  }
</style>
