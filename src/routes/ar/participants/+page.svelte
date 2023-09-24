<script lang="ts">
  // Set language
  import { LANGUAGE } from "$lib/modules/types"
  import { languageStore } from "$lib/modules/stores"
  languageStore.set(LANGUAGE.ARABIC)
  // ...
  import HeaderBar from "$lib/components/HeaderBar.svelte"
  import Listing from "$lib/components/Listing/Listing.svelte"
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
