<script lang="ts">
  import { MENU_ITEMS } from "$lib/modules/constants"
  import { splitArrayIntoTwoParts } from "$lib/modules/utils"
</script>

<footer>
  <div class="menu-inner">
    <!-- FIRST COLUMN -->
    <div class="column first">
      {#each splitArrayIntoTwoParts(MENU_ITEMS)[0] as item}
        <div class="menu-item">
          <a href={item.link}>{item.title}</a>
        </div>
      {/each}
    </div>
    <!-- SECOND COLUMN -->
    <div class="column second">
      {#each splitArrayIntoTwoParts(MENU_ITEMS)[1] as item}
        <div class="menu-item">
          <a href={item.link}>{item.title}</a>
        </div>
      {/each}
    </div>
    <!-- THIRD COLUMN -->
    <div class="column second">
      <div class="menu-item">
        <a href="/search">Search...</a>
      </div>
    </div>
  </div>
  <div class="title-line">
    <!-- TITLE -->
    <div>
      <a href="/" class="title" data-sveltekit-preload-data>
        SHARJAH ARCHITECTURE TRIENNIAL 02
      </a>
    </div>
    <!-- DATES -->
    <div>11.11.2023 – 10.02.2024</div>
  </div>
</footer>

<style lang="scss">
  footer {
    // height: var(--footer-height);
    background: var(--grey);
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .menu-inner {
      font-size: var(--font-size-small);
      line-height: 1.2em;
      display: flex;
      width: 100%;

      .column {
        padding: var(--default-padding);
        width: 33%;
        .menu-item {
          a {
            color: inherit;
            text-decoration: none;

            &:hover {
              color: var(--orange);
              text-decoration: underline;
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
    }
  }
</style>
