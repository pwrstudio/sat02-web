<svg
  id="Layer_2"
  data-name="Layer 2"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 537.89 537.89"
>
  <path
    class="cls-1"
    d="m268.65,0c148.52,0,269.24,120.73,269.24,268.94s-120.72,268.94-269.24,268.94S0,417.16,0,268.94,120.43,0,268.65,0"
  />
</svg>

<style lang="scss">
  svg {
    transform: scale(1.6);
    /* animation: rotateInLoop 10s infinite linear;
      transform-origin: center; */

    .cls-1 {
      // fill: var(--black);
      stroke-width: 0px;
      fill: var(--orange);
    }

    &.orange {
      .cls-1 {
        fill: var(--orange);
      }
    }

    &.blue {
      .cls-1 {
        fill: var(--blue);
      }
    }

    &.purple {
      .cls-1 {
        fill: var(--purple);
      }
    }
  }

  @keyframes rotateInLoop {
    0% {
      transform: scale(1.5) rotate(0deg);
    }
    100% {
      transform: scale(1.5) rotate(360deg);
    }
  }
</style>
