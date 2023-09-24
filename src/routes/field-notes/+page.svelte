<script lang="ts">
  // Set language
  import { LANGUAGE } from "$lib/modules/types"
  import { languageStore } from "$lib/modules/stores"
  languageStore.set(LANGUAGE.ENGLISH)
  // ...
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
