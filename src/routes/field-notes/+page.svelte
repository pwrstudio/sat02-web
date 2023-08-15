<script lang="ts">
  import HeaderBar from "$lib/components/HeaderBar.svelte"
  import Listing from "$lib/components/Listing/Listing.svelte"
  export let data
  const { fieldNotes } = data
</script>

<HeaderBar />

<header>Field notes ({fieldNotes.length})</header>

<Listing posts={fieldNotes} category="calendar" />

<style lang="scss">
  header {
    padding: var(--default-padding);
  }
</style>
