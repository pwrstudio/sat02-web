<script lang="ts">
  import Listing from "$lib/components/Listing.svelte"
  export let data
  const { events } = data
</script>

<header>CALENDAR ({events.length})</header>

<Listing posts={events} category="calendar" />

<style lang="scss">
  header {
    padding: var(--default-padding);
  }
</style>
