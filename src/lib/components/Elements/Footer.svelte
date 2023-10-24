<script lang="ts">
  import { MENU_ITEMS } from "$lib/modules/constants"
  import { splitArrayIntoTwoParts } from "$lib/modules/utils"
  import { languageStore, urlPrefix } from "$lib/modules/stores"
  import { LANGUAGE } from "$lib/modules/types"
  import { siteTitle } from "$lib/modules/constants"
</script>

<footer class={LANGUAGE[$languageStore]}>
  <!-- INNER MENU -->
  <div class="menu-inner {LANGUAGE[$languageStore]}">
    <!-- FIRST COLUMN -->
    <div class="column first">
      {#each splitArrayIntoTwoParts(MENU_ITEMS)[0] as item}
        <div class="menu-item">
          <a href={$urlPrefix + item.link}>
            {$languageStore === LANGUAGE.ENGLISH ? item.title : item.ar}
          </a>
        </div>
      {/each}
    </div>
    <!-- SECOND COLUMN -->
    <div class="column second">
      {#each splitArrayIntoTwoParts(MENU_ITEMS)[1] as item}
        <div class="menu-item">
          <a href={$urlPrefix + item.link}>
            {$languageStore === LANGUAGE.ENGLISH ? item.title : item.ar}
          </a>
        </div>
      {/each}
    </div>
  </div>
  <div class="title-line {LANGUAGE[$languageStore]}">
    <!-- TITLE -->
    <div>
      <a href="/" class="title" data-sveltekit-preload-data>
        <div class="full-title">
          {$languageStore == LANGUAGE.ENGLISH ? siteTitle.en : siteTitle.ar}
        </div>
        <div class="short-title">SAT02</div>
      </a>
    </div>
    <!-- DATES -->
    <div dir="ltr">11.11.2023 – 10.02.2024</div>
  </div>
</footer>

<style lang="scss">
  @import "../../styles/responsive.scss";

  footer {
    background: var(--grey);
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    z-index: var(--z-content);

    &.ARABIC {
      font-family: var(--font-family-arabic);
      text-align: right;
    }

    .menu-inner {
      font-size: var(--font-size-normal);
      line-height: 1.2em;
      display: flex;
      width: 100%;

      &.ARABIC {
        flex-direction: row-reverse;
      }

      .column {
        padding: var(--default-padding);
        width: 33%;

        @include screen-size("phone") {
          width: 50%;
        }

        .menu-item {
          a {
            color: inherit;
            text-decoration: none;

            &:hover {
              color: var(--orange);
            }
          }
        }
      }
    }

    .title-line {
      margin-top: 20px;
      height: var(--menubar-height);
      padding-left: var(--default-padding);
      padding-right: var(--double-padding);
      display: flex;
      justify-content: space-between;
      align-items: center;

      @include screen-size("small") {
        flex-wrap: wrap;
        padding-right: var(--default-padding);
      }

      .title {
        // font-weight: bold;

        &:hover {
          color: var(--orange);
        }
      }

      &.ARABIC {
        flex-direction: row-reverse;
        padding-left: var(--double-padding);
        padding-right: var(--default-padding);
      }
    }

    .short-title {
      display: none;
      @include screen-size("small") {
        display: block;
        font-weight: bold;
      }
    }

    .full-title {
      display: block;
      @include screen-size("small") {
        display: none;
      }
    }
  }
</style>
