<script>
  import { onMount, createEventDispatcher } from 'svelte'
  export let name = 'Kevin Vargas'
  export let actionText = 'Salir'

  let headerRef = null;
  const dispatch = createEventDispatcher();

  const handleClick = () => {
    dispatch('action')
  }
  onMount(() => {
    dispatch('load', headerRef ? headerRef.clientHeight : 0)
  })
</script>
<style>
  h1 {
    color: var(--primary);
    font-weight: bold;
    flex: 1;
    letter-spacing: 0.25em;
    font-size: 1.7em;
  }
  header {
    z-index: 15;
    height: 55px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2),
      0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
    background: white;
    position: fixed;
    top: 0;
    width: 100%;
  }
  .cont {
    min-width: 90%;
    display: flex;
    align-items: center;
  }
  .cont p {
    color: var(--dark);
    font-size: 1.3em;
    padding-right: 12px;
  }
  .cont button {
    font-size: 1em;
    letter-spacing: 0.2em;
    background: white;
    color: var(--primary);
    cursor: pointer;
    padding: 6px 12px;
    border: 1px solid var(--primary);
    border-radius: 6px;
    transition: background 0.4s, color 0.4s;
  }
  .cont button:hover {
    background: var(--primary);
    color: white;
  }
</style>

<header bind:this={headerRef}>
  <div class="cont">
    <h1>RECTIFIER</h1>
    <p>{name}</p>
    <button on:click={handleClick}>
      {actionText}
    </button>
  </div>
</header>
