<script lang="ts">
  import HeaderBar from "$lib/components/HeaderBar.svelte"
  import Listing from "$lib/components/Listing/Listing.svelte"
  export let data
  const { events } = data
</script>

<HeaderBar title="Events" />
<Listing posts={events} category="calendar" />
