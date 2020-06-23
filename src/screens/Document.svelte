<style>
  main {
    margin-top: var(--marginTop);
    display: flex;
  }
  .pdfCont {
    flex: 1;
    min-width: 820px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }
  .observationsCont {
    width: 400px;
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
  import { onMount } from 'svelte'

  import { LIC_NAME } from '../utils/consts'
  import popUps from '../store/popups'
  import document from '../store/document'

  import Header from '../components/Header.svelte'
  import Modal from '../components/Modal.svelte'
  import Button from '../components/Button.svelte'
  import PdfViewer from '../components/PdfViewer.svelte'
  import Observations from '../components/Observations.svelte'


  let marginTop = 0
  let name = ''
  let isOpenModal = true

  const onContinue = () => {
    if (name.trim() === '') {
      popUps.addWarningPopUp('Debe ingresar un nombre para continuar')
      return
    }
    localStorage.setItem(LIC_NAME, name)
    isOpenModal = false
  }
  const onLoadHeader = (e) => {
    marginTop = e.detail
  }
  const onFinish = () => {
    console.log('FINISH')
  }
  onMount(() => {
    const localValue = localStorage.getItem(LIC_NAME)
    if (localValue !== null) {
      name = localValue
    }
  })
</script>

<Header
  name={name}
  actionText="TERMINAR"
  on:load={onLoadHeader}
  on:action={onFinish}
/>
<Modal open={isOpenModal}>
  <h3>Ingrese su Nombre</h3>
  <div class="inputCont">
    <input
      placeholder="Las observaciones se mostrarán con este nombre"
      type="text"
      bind:value="{name}"
    />
  </div>
  <Button text="CONTINUAR" on:action={onContinue} blue />
</Modal>
<main style="--marginTop:{marginTop}px">
  <div class="pdfCont">
    <PdfViewer pdfPath={$document.url} observations={$document.observations} />
  </div>
  <div class="observationsCont">
    <Observations observations={$document.observations} />
  </div>
</main>
