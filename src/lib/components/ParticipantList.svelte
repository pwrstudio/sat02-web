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
        {participant.title}{index < participants.length - 2
          ? ", "
          : index === participants.length - 2
          ? " &"
          : ""}
      </a>
    {:else}
      <span class="participant">
        {participant.title}{index < participants.length - 2
          ? ", "
          : index === participants.length - 2
          ? " &"
          : ""}
      </span>
    {/if}
  {/each}
{/if}

<style lang="scss">
  a {
    &:hover {
      color: var(--orange);
    }
  }
</style>
