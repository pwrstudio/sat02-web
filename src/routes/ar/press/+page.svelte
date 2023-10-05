<script lang="ts">
  // Set language
  import { LANGUAGE } from "$lib/modules/types"
  import { languageStore } from "$lib/modules/stores"
  languageStore.set(LANGUAGE.ARABIC)
  // ...
  import Press from "$lib/components/Press/Press.svelte"
  export let data
  const { page, pressReleases, pressCoverage } = data
</script>

<Press {page} {pressReleases} {pressCoverage} />
