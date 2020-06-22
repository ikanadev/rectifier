<script>
  import { createEventDispatcher } from 'svelte'
  export let text = 'button'
  export let red = false
  export let blue = false
  export let primary = false
  export let disabled = false
  export let type = 'button'

  const dispatch = createEventDispatcher()
  const onClick = () => {
    dispatch('action')
  }
</script>

<style>
  button {
    border: none;
    padding: 4px 12px;
    height: 40px;
    border-radius: 20px;
    color: white;
    box-shadow: 6px 6px 12px var(--dark), -6px -6px 12px white;
    letter-spacing: 0.12em;
    transition: all 0.5s;
    margin-right: 6px;
    margin-left: 6px;
    background-color: var(--dark);
  }
  button:hover {
    box-shadow: 10px 10px 20px var(--dark), -10px -10px 20px white;
  }
  .red {
    background-color: var(--red);
  }
  .blue {
    background-color: var(--blue);
  }
  .primary {
    background-color: var(--primary);
  }
  .disabled {
    background-color: var(--disabled);
    box-shadow: none;
  }
  .disabled:hover {
    box-shadow: none;
  }
</style>

<button type={type} class:red class:blue class:primary class:disabled on:click|preventDefault={onClick} disabled={disabled}>
  {text}
</button>