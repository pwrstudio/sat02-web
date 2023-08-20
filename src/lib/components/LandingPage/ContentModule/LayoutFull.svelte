<script lang="ts">
  import { ALIGNMENT, type Node } from "$lib/modules/types"
  import Image from "$lib/components/LandingPage/ContentModule/Image.svelte"
  import ParticipantList from "$lib/components/ParticipantList.svelte"
  export let node: Node
</script>

<div class="layout full" class:reversed={node.alignment == ALIGNMENT.LEFT}>
  <div class="column">
    {#if node.post.featuredImage}
      <Image {node} />
    {/if}
  </div>

  <div class="column text">
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
</div>

<style lang="scss">
  @import "../../../styles/responsive.scss";

  .full {
    display: flex;
    padding-top: 2em;

    .column {
      &.text {
        padding: var(--default-padding);
        padding-top: 0;
        padding-right: 40px;
        line-height: 1.1em;
        font-size: var(--font-size-xl);

        h2 {
          font-weight: normal;
          margin: 0;
          position: relative;
          z-index: var(--z-content);
          font-size: var(--font-size-xl);
        }

        h3 {
          font-weight: normal;
          font-style: italic;
          font-size: var(--font-size-xl);
          margin: 0;
          position: relative;
          z-index: var(--z-content);
          font-size: var(--font-size-xl);
        }
      }
    }

    &.reversed {
      flex-direction: row-reverse;

      .column {
        &.text {
          padding-left: 0;
        }
      }
    }
  }
</style>
