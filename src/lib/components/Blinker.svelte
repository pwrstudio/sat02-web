<span class="blinker-container">
  <span class="blinker"></span>
</span>

<style lang="scss">
  .blinker-container {
    width: 32px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
  .blinker {
    animation: blinker 2s ease-out infinite;
  }

  @keyframes blinker {
    50% {
      opacity: 0.6;
    }
  }
</style>
