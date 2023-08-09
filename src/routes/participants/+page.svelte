<script lang="ts">
  import HeaderBar from "$lib/components/HeaderBar.svelte"
  import Listing from "$lib/components/Listing.svelte"
  export let data
  const { participants } = data
</script>

<HeaderBar />

<header>PARTICIPANTS ({participants.length})</header>

<Listing posts={participants} category="participants" />

<style lang="scss">
  header {
    padding: var(--default-padding);
  }
</style>
