<script lang="ts">
  // Set language
  import { LANGUAGE } from "$lib/modules/types"
  import { languageStore } from "$lib/modules/stores"
  languageStore.set(LANGUAGE.ENGLISH)
  // ...
  import Listing from "$lib/components/Listing/Listing.svelte"
  export let data
  const { page, storeItems } = data
</script>

<Listing posts={storeItems} {page} />
