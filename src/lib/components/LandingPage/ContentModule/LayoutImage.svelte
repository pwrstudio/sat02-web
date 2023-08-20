<script lang="ts">
  import type { Node } from "$lib/modules/types"
  import Image from "$lib/components/LandingPage/ContentModule/Image.svelte"
  import ParticipantList from "$lib/components/ParticipantList.svelte"
  export let node: Node
</script>

<div class="layout image">
  {#if node.post.featuredImage}
    <Image {node} />
  {/if}
  <!-- TITLE -->
  <h2>
    {node.post.title}
  </h2>
  <!-- PARTICIPANTS -->
  {#if node.type == "project" || node.type == "event"}
    <h3>
      <ParticipantList participants={node.post.participants} linked={false} />
    </h3>
  {/if}
</div>

<style lang="scss">
  @import "../../../styles/responsive.scss";

  .image {
    h2 {
      font-weight: normal;
      font-size: var(--font-size-large);
      margin: 0;
      position: relative;
      z-index: var(--z-content);
    }

    h3 {
      padding-top: 0.5em;
      font-weight: normal;
      font-style: italic;
      font-size: var(--font-size-large);
      margin: 0;
      position: relative;
      z-index: var(--z-content);
      margin-bottom: var(--default-padding);
    }
  }
</style>
