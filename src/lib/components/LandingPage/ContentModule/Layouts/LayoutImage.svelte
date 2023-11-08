<script lang="ts">
  import type { Node } from "$lib/modules/types"
  import { LANGUAGE } from "$lib/modules/types"
  import { languageStore } from "$lib/modules/stores"
  import Image from "$lib/components/LandingPage/ContentModule/Image.svelte"
  import ParticipantList from "$lib/components/Elements/ParticipantList.svelte"
  import Title from "$lib/components/Elements/Title.svelte"
  export let node: Node
  export let href = ""
</script>

<div class="layout image">
  {#if node.post.featuredImage}
    <a {href} data-sveltekit-preload-data>
      <Image {node} />
    </a>
  {/if}
  <!-- TITLE -->
  <a {href} data-sveltekit-preload-data>
    <h2>
      {#if $languageStore == LANGUAGE.ENGLISH}→{/if}
      {#if $languageStore == LANGUAGE.ARABIC}←{/if}
      <Title page={node.post} />
    </h2>
    <!-- PARTICIPANTS -->
    {#if node.type == "project" || node.type == "event"}
      <h3>
        <ParticipantList participants={node.post.participants} linked={false} />
      </h3>
    {/if}
  </a>
</div>

<style lang="scss">
  @import "../../../../styles/responsive.scss";

  .image {
    padding-top: 0.5em;

    a {
      &:hover {
        color: var(--grey);
        img {
          opacity: 0.8;
        }
      }
    }

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
