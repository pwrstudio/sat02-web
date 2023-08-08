<script lang="ts">
  import { MENU_ITEMS } from "$lib/modules/constants"
</script>

<footer>
  <a href="/" class="title" data-sveltekit-preload-data>
    SHARJAH ARCHITECTURE TRIENNIAL 02
  </a>
  {#each MENU_ITEMS as item}
    <div class="menu-item">
      <a href={item.link}>{item.title}</a>
    </div>
  {/each}
</footer>

<style lang="scss">
  footer {
    height: var(--footer-height);
    background: var(--grey);
    width: 100%;
  }
</style>
