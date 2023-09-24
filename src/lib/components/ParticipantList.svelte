<script lang="ts">
  import { urlPrefix } from "$lib/modules/stores"
  export let participants: any[]
  export let linked = true
</script>

{#if participants && participants.length > 0}
  {#each participants as participant, index}
    {#if linked}
      <a
        class="participant"
        href={$urlPrefix + "participants/" + participant.slug.current}
        data-sveltekit-preload-data
      >
        {participant.title}
      </a>
    {:else}
      <span class="participant">
        {participant.title}
      </span>
    {/if}
    {#if index < participants.length - 2}
      ,&nbsp;
    {:else if index == participants.length - 2}
      &amp;&nbsp;
    {/if}
  {/each}
{/if}

<style lang="scss">
  a {
    &:hover {
      text-decoration: underline;
    }
  }
</style>
