<style>
  form {
    display: flex;
    flex-direction: column;
  }
  .buttonsCont {
    display: flex;
    justify-content: flex-end;
  }
  input {
    border: none;
    outline: none;
    background: none;
    font-size: 18px;
    color: #555;
    padding: 8px 30px;
    width: 100%;
    font-weight: 300;
  }
  input::placeholder {
    color: #868686;
    font-style: italic;
  }
  .inputCont {
    margin-top: 20px;
    margin-bottom: 20px;
    border-radius: 25px;
    box-shadow: inset 8px 8px 8px #cbced1, inset -8px -8px 8px #ffffff;
  }
  h3 {
    text-align: center;
    color: var(--text);
    font-weight: bold;
    font-size: 22px;
  }
</style>

<script>
  import { createEventDispatcher } from 'svelte'

  import Modal from '../../components/Modal.svelte'
  import Button from '../../components/Button.svelte'

  export let open = false
  export let loading = false

  let name = ''
  let institute = ''

  const dispatch = createEventDispatcher()
  const onClose = () => {
    dispatch('close')
  }
  const onRegister = () => {
    dispatch('register', {
      name,
      institute,
    })
  }
</script>

<Modal {open}>
  <h3>Agregar Proyecto</h3>
  <form>
    <div class="inputCont">
      <input placeholder="Nombre" bind:value="{name}" type="text" />
    </div>
    <div class="inputCont">
      <input
        placeholder="Intitución (ej.: UMSA, UPEA, etc...)"
        bind:value="{institute}"
        type="text"
      />
    </div>
    <div class="buttonsCont">
      <Button
        type="submit"
        text="CREAR"
        blue
        on:action="{onRegister}"
        disabled="{loading}"
      />
      <Button text="CANCELAR" on:action="{onClose}" disabled="{loading}" />
    </div>
  </form>
</Modal>
