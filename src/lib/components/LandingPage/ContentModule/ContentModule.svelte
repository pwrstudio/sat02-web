<script lang="ts">
  import { COLOR, LANGUAGE, LAYOUT, type Node } from "$lib/modules/types"
  import Tag from "$lib/components/Elements/Tag.svelte"
  import Borders from "$lib/components/LandingPage/ContentModule/Borders.svelte"
  import LayoutQuote from "$lib/components/LandingPage/ContentModule/Layouts/LayoutQuote.svelte"
  import LayoutImage from "$lib/components/LandingPage/ContentModule/Layouts/LayoutImage.svelte"
  import LayoutFull from "$lib/components/LandingPage/ContentModule/Layouts/LayoutFull.svelte"
  import { languageStore, urlPrefix } from "$lib/modules/stores"
  import { ArabicTerms } from "$lib/modules/constants"

  export let node: Node

  const getTagText = (text: string, language: LANGUAGE) => {
    console.log(text)
    if (language === LANGUAGE.ENGLISH) return text
    if (text === "project") return ArabicTerms.PROJECT_S
    if (text === "event") return ArabicTerms.EVENT
    if (text === "participant") return ArabicTerms.PARTICIPANT_S
    return ""
  }

  let href = ""
  $: href =
    $urlPrefix +
    (node.post._type == "event" ? "calendar" : node.post._type + "s") +
    "/" +
    node.post.slug.current

  let tagText = getTagText(node.post._type, $languageStore)
  $: tagText = getTagText(node.post._type, $languageStore)
</script>

<div
  class="module"
  class:white={node.bgColor == COLOR.WHITE}
  class:green={node.bgColor == COLOR.GREEN}
  class:blue={node.bgColor == COLOR.BLUE}
  class:orange={node.bgColor == COLOR.ORANGE}
  class:purple={node.bgColor == COLOR.PURPLE}
>
  {#if node.post}
    <!-- META TOP -->
    <div class="meta-top">
      <!-- TYPE -->
      <Tag color={node.bgColor === COLOR.WHITE ? COLOR.BLACK : COLOR.WHITE}>
        {tagText}
      </Tag>
    </div>

    <!-- CONTENT -->
    <div class="content">
      <!-- QUOTE LAYOUT -->
      {#if node.layout === LAYOUT.QUOTE}
        <LayoutQuote {node} {href} />
      {/if}
      <!-- IMAGE LAYOUT -->
      {#if node.layout == LAYOUT.IMAGE}
        <LayoutImage {node} {href} />
      {/if}
      <!-- FULL LAYOUT -->
      {#if node.layout == LAYOUT.FULL}
        <LayoutFull {node} {href} />
      {/if}
    </div>

    <!-- BORDERS -->
    {#if node.border}
      <Borders
        border={node.border}
        color={node.bgColor == COLOR.WHITE ? COLOR.BLACK : COLOR.WHITE}
      />
    {/if}
  {/if}
</div>

<style lang="scss">
  @import "../../../styles/responsive.scss";

  .module {
    min-height: var(--module-min-height);
    padding: var(--double-padding);
    // padding-top: var(--default-padding);
    display: flex;
    flex-direction: column;
    width: 100%;
    color: var(--white);
    flex-shrink: 2;
    flex-grow: 4;
    overflow: hidden;
    user-select: none;
    position: relative;

    @include screen-size("small") {
      min-height: unset;
      padding: var(--default-padding);
    }

    &.white {
      background: var(--white);
      color: var(--black);
    }

    &.orange {
      background: var(--orange);
    }

    &.blue {
      background: var(--blue);
    }

    &.green {
      background: var(--green);
    }

    &.purple {
      background: var(--purple);
    }

    .meta-top {
      width: 100%;
      margin-bottom: var(--default-padding);
      display: flex;
      justify-content: space-between;
    }

    .meta-bottom {
      width: 100%;
      margin-bottom: var(--default-padding);
      display: flex;
      justify-content: space-between;
    }

    .content {
      line-height: 1.6em;
      min-height: 500px;
      position: relative;

      @include screen-size("small") {
        min-height: unset;
      }
    }
  }
</style>
