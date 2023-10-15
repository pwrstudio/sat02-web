<script lang="ts">
  // Set language
  import { LANGUAGE } from "$lib/modules/types"
  import { languageStore } from "$lib/modules/stores"
  languageStore.set(LANGUAGE.ARABIC)
  // ...
  import Calendar from "$lib/components/Calendar/Calendar.svelte"
  export let data
  const { page, events } = data
</script>

<Calendar posts={events} {page} />
