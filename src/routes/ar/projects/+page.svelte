<script lang="ts">
  // Set language
  import { LANGUAGE } from "$lib/modules/types"
  import { languageStore } from "$lib/modules/stores"
  languageStore.set(LANGUAGE.ARABIC)
  // ...
  import Listing from "$lib/components/Listing/Listing.svelte"
  export let data
  const { projects, page } = data
</script>

<Listing posts={projects} {page} />
