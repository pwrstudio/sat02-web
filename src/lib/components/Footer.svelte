<script lang="ts">
  import { MENU_ITEMS } from "$lib/modules/constants"
</script>

<footer>
  <div>
    {#each MENU_ITEMS as item}
      <div class="menu-item">
        <a href={item.link}>{item.title}</a>
      </div>
    {/each}
  </div>
  <div>
    <a href="/" class="title" data-sveltekit-preload-data>
      SHARJAH ARCHITECTURE TRIENNIAL 02
    </a>
  </div>
</footer>

<style lang="scss">
  footer {
    padding: var(--default-padding);
    height: var(--footer-height);
    background: var(--grey);
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
</style>
