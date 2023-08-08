<script lang="ts">
  import Listing from "$lib/components/Listing.svelte"
  export let data
  const { participants } = data
</script>

<header>PARTICIPANTS ({participants.length})</header>

<Listing posts={participants} category="participants" />

<style lang="scss">
  header {
    padding: var(--default-padding);
  }
</style>
