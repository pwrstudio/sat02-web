<script lang="ts">
  export let pressKitLink = ""

  const FORM_ID = "Lno6CbI7"

  let name = ""
  let publication = ""
  let email = ""
  let showLink = false
  let processing = false

  const handleSubmit = async () => {
    processing = true
    await fetch("https://submit-form.com/" + FORM_ID, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        publication,
        email,
      }),
    })
    processing = false
    showLink = true
  }
</script>

<div class="press-kit">
  {#if processing}
    <div class="download-text">
      <strong>Processing form...</strong>
    </div>
  {:else if showLink}
    <div class="download-text">
      <strong>Thank you.</strong>
      <div class="download-text">Download the press kit below.</div>
    </div>
    <a href={pressKitLink} target="_blank"> Download press kit </a>
  {:else}
    <div class="download-text">
      <strong>Press Kit</strong>
      <div class="download-text">Submit form to get access to press kit.</div>
    </div>
    <form on:submit|preventDefault={handleSubmit}>
      <div>
        <label for="name">Name</label>
        <input type="text" id="name" name="name" required bind:value={name} />
      </div>

      <div>
        <label for="publication">Publication</label>
        <input
          type="text"
          id="publication"
          name="publication"
          required
          bind:value={publication}
        />
      </div>

      <div>
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          bind:value={email}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  {/if}
</div>

<style lang="scss">
  .press-kit {
    position: relative;
    z-index: var(--z-content);
    border-top: 1.5px solid var(--white-transparent);
    padding-top: 1em;
    margin-top: 2em;

    .download-text {
      margin-bottom: 1em;
    }
    form {
      label {
        display: block;
      }

      input {
        width: 50ch;
        max-width: 100%;
        font-size: inherit;
        padding: 5px;
        font-family: inherit;
      }
      div {
        margin-bottom: 0.5em;
      }

      button {
        font-size: inherit;
        font-family: inherit;
        display: inline-block;
        margin-top: 0.5em;
        padding: var(--default-padding);
        background: var(--white);
        color: var(--black);
        border: unset;
        cursor: pointer;

        &:hover {
          background: var(--orange);
          color: var(--white);
        }
      }
    }

    a {
      display: inline-block;
      margin-top: 1em;
      padding: var(--default-padding);
      background: var(--white);
      color: var(--black);
      user-select: none;

      &:hover {
        background: var(--orange);
        color: var(--white);
      }
    }
  }
</style>
