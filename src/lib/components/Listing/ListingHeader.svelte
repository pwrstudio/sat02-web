<script>
</script>

<div class="listing-header">
  <div class="image-toggle">
    <input type="checkbox" id="images" name="images" />
    <label for="images">Show images</label>
  </div>
  <div class="sort">
    <select>
      <option value="newest"> Newest </option>
      <option value="oldest">Oldest</option>
      <option value="alphabetical">Alphabetical</option>
    </select>
  </div>
  <div class="search">Search</div>
</div>

<style lang="scss">
  .listing-header {
    display: flex;
    justify-content: space-between;
    padding: var(--default-padding);
    padding-top: 0;
    padding-bottom: var(--double-padding);
    padding-right: var(--double-padding);
    position: relative;
    z-index: var(--z-content);
  }
</style>
