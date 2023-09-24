<script lang="ts">
  // Set language
  import { LANGUAGE } from "$lib/modules/types"
  import { languageStore } from "$lib/modules/stores"
  languageStore.set(LANGUAGE.ARABIC)
  // ...
  import Section from "$lib/components/LandingPage/Section.svelte"
  export let data
  const { frontpage, venues } = data
</script>

<div class="landing-container">
  {#each frontpage as node}
    {#if node.type === "section"}
      <Section {node} {venues} />
    {/if}
  {/each}
</div>
