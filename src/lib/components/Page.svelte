<script lang="ts">
  import { urlFor } from "$lib/modules/sanity"
  import Tag from "./Tag.svelte"
  export let page: any
</script>

<div class="page">
  <!-- LEFT -->
  <div class="column left">
    <!-- TITLE -->
    <div class="row header orange">
      <!-- TYPE -->
      <Tag>{page._type}</Tag>
      <!-- TITLE -->
      <h1>{page.title}</h1>
      <!-- VENUE -->
      {#if page.venues && page.venues[0] && page.venues[0].title}
        <Tag>
          {page.venues[0].title}
        </Tag>
      {/if}
    </div>
    <!-- CONTENT -->
    <div class="row content">
      <p>
        Focusing on the relationship between materials, context and landscape,
        an installation by Angolan artist Sandra Poulson will analyse the
        ever-present dust in Luanda to reflect on the city’s economic, social
        and cultural framework. Ola Uduku & Michael Collins will present works
        by British-Nigerian architect Alan Vaughan-Richards (1925-1989) and
        review his environmentally-conscious explorations that would make up the
        canon of West African Tropical Modernism.
      </p>
      <p>
        The effect of climate change on Sharjahs biodiversity is central to
        projects such as a fabric-based temple by London/Amazon-based architect
        Yussef Agbo-Ola that will honour non-human life and endangered species
        from the region. Elsewhere, Lagos-based practice MOE+ Art Architecture
        (MOE+AA) will be embedded in Sharjah’s industrial environment – creating
        a moment of ecological pause that will act as a counterpoint to the
        man-made, mechanised landscapes that have become ubiquitous across the
        Emirates.
      </p>
    </div>
  </div>

  <!-- RIGHT -->
  <div class="column right">
    <!-- PARTICIPANTS  -->
    <div class="row header green">
      {#if page.participants && page.participants[0] && page.participants[0].title}
        <h2>
          {page.participants[0].title}
        </h2>
      {/if}
    </div>
    <!-- SLIDESHOW -->
    {#if page.processMedia && page.processMedia[0]}
      <div class="row slideshow">
        <img
          src={urlFor(page.processMedia[0])
            .width(800)
            .saturation(-100)
            .auto("format")
            .quality(100)
            .url()}
          alt={page.title}
        />
        <a href="" class="open-slideshow">
          OPEN SLIDESHOW ({page.processMedia.length})
        </a>
      </div>
    {/if}

    <!-- DIVIDER -->
    <div class="row divider" />
    <!-- EVENTS -->
    <div class="row events">EVENTS</div>
  </div>
</div>

<style lang="scss">
  @import "../styles/responsive.scss";

  .page {
    display: flex;

    @include screen-size("phone") {
      flex-wrap: wrap;
    }

    .column {
      width: 50%;

      @include screen-size("phone") {
        width: 100%;
      }

      .row {
        width: 100%;
        padding: var(--default-padding);
      }

      .header {
        height: var(--header-height);
      }

      .slideshow {
        background: var(--grey);
        height: 500px;
        position: relative;
        padding: 0;
        cursor: pointer;

        img {
          width: 100%;
          height: 100%;
          //   object-fit: contain;
          object-fit: cover;
          mix-blend-mode: multiply;
        }

        .open-slideshow {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 100%;
          padding: var(--double-padding);
          background: var(--orange);
          color: var(--white);
          text-decoration: none;
          text-align: center;
        }
      }

      .divider {
        height: 60px;
        background: var(--grey);
      }

      .events {
        height: 500px;
        background: var(--green);
      }

      .content {
        padding: var(--double-padding);
      }
    }
  }

  .orange {
    background: var(--orange);
  }

  .green {
    background: var(--green);
  }

  h1,
  h2 {
    font-size: var(--font-size-large);
    font-weight: normal;
  }
</style>
