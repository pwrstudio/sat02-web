<script lang="ts">
  import { renderBlockText } from "$lib/modules/sanity"
  import { languageStore } from "$lib/modules/stores"
  import { LANGUAGE, COLOR } from "$lib/modules/types"

  import Metadata from "$lib/components/Metadata/Metadata.svelte"
  import ListingComponent from "./ListingComponent.svelte"
  import DecoLineTwo from "../Deco/DecoLineTwo.svelte"

  export let posts: any[] = []
  export let page: any = {}
</script>

<!-- METADATA -->
<Metadata {page} />

<DecoLineTwo color={COLOR.GREY} />

<div class="list-page">
  <!-- TEXT -->
  <div class="column text">
    <div class="inner">
      {#if $languageStore == LANGUAGE.ARABIC}
        {#if page.content_ar}
          {@html renderBlockText(page.content_ar.content)}
        {/if}
      {:else if page.content}
        {@html renderBlockText(page.content.content)}
      {/if}
    </div>
  </div>

  <!-- LIST -->
  <div class="column list">
    <ListingComponent {posts} {page} />
  </div>
</div>

<style lang="scss">
  @import "../../styles/responsive.scss";

  .list-page {
    display: flex;

    @include screen-size("phone") {
      flex-wrap: wrap;
    }

    .column {
      width: 50%;

      @include screen-size("phone") {
        width: 100%;
      }

      &.list {
        background: var(--orange);
        padding-bottom: 200px;

        @include screen-size("phone") {
          padding-bottom: 60px;
        }
      }

      &.text {
        background: var(--green);
        padding-bottom: 200px;

        @include screen-size("phone") {
          padding-bottom: 0px;
        }

        .inner {
          color: var(--white);
          padding: var(--default-padding);
          line-height: 1.1em;

          @include screen-size("phone") {
            font-size: var(--font-size-normal);
          }
        }
      }
    }
  }
</style>
