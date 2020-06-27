<style>
  .cont {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 50;
    background: #242424dd;
    display: flex;
    justify-content: stretch;
    align-items: center;
  }
  .modalCont {
    flex: 1;
    display: flex;
    justify-content: center;
  }
  .modal {
    flex: 1;
    max-width: 600px;
    padding: 20px 25px;
    display: flex;
    flex-direction: column;
    background: var(--background);
    border-radius: 10px;
  }
</style>

<script>
  import { fade } from 'svelte/transition'

  export let open = false
</script>

{#if open}
  <div class="cont" transition:fade>
    <div class="modalCont">
      <div class="modal">
        <slot />
      </div>
    </div>
  </div>
{/if}
