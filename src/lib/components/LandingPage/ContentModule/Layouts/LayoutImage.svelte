<script lang="ts">
  import type { Node } from "$lib/modules/types"
  import { LANGUAGE } from "$lib/modules/types"
  import { languageStore } from "$lib/modules/stores"
  import Image from "$lib/components/LandingPage/ContentModule/Image.svelte"
  import ParticipantList from "$lib/components/ParticipantList.svelte"
  import Title from "$lib/components/Title.svelte"
  export let node: Node
</script>

<div class="layout image">
  {#if node.post.featuredImage}
    <Image {node} />
  {/if}
  <!-- TITLE -->
  <h2>
    {#if $languageStore == LANGUAGE.ENGLISH}→{/if}
    <Title page={node.post} />
    {#if $languageStore == LANGUAGE.ARABIC}→{/if}
  </h2>
  <!-- PARTICIPANTS -->
  {#if node.type == "project" || node.type == "event"}
    <h3>
      <ParticipantList participants={node.post.participants} linked={false} />
    </h3>
  {/if}
</div>

<style lang="scss">
  @import "../../../../styles/responsive.scss";

  .image {
    padding-top: 0.5em;
    h2 {
      font-weight: normal;
      font-size: var(--font-size-large);
      margin: 0;
      position: relative;
      z-index: var(--z-content);
      margin-bottom: 0.5em;
    }

    h3 {
      font-weight: normal;
      font-style: italic;
      font-size: var(--font-size-large);
      margin: 0;
      position: relative;
      z-index: var(--z-content);
      margin-bottom: var(--double-padding);
    }
  }
</style>
