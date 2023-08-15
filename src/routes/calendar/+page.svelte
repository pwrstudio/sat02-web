<script lang="ts">
  import HeaderBar from "$lib/components/HeaderBar.svelte"
  import Listing from "$lib/components/Listing/Listing.svelte"
  export let data
  const { events } = data
</script>

<HeaderBar />

<header>CALENDAR ({events.length})</header>

<Listing posts={events} category="calendar" />

<style lang="scss">
  header {
    padding: var(--default-padding);
  }
</style>
