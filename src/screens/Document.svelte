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
  import api from '../api/api'

  import Header from '../components/Header.svelte'
  import Modal from '../components/Modal.svelte'
  import Button from '../components/Button.svelte'
  import PdfViewer from '../components/PdfViewer.svelte'
  import Observations from '../components/Observations.svelte'
  import DeleteModal from '../components/DeleteModal.svelte'

  export let editable = false

  let marginTop = 0
  let name = ''
  let isOpenModal = true
  let isLoadingObsModal = false
  let isOpenObsModal = false
  let isOpenDelObsModal = false
  let isLoadingDelObsModal = false
  let selectedObs = { id: 0, x: 0, y:0, text: '' }

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
  const newObservation = ({ detail }) => {
    isLoadingObsModal = true
    api.observation
      .newObservation($document.id, detail.x, detail.y, detail.text, name, $document.accessCode)
      .then((res) => {
        popUps.addSuccessPopUp('Observación registrada')
        document.addObservation(res)
        isLoadingObsModal = false
        isOpenObsModal = false
      })
      .catch((err) => {
        isLoadingObsModal = false
        if (!err || !err.data) {
          popUps.addErrorPopUp('Error conectando al servidor')
          return
        }
        popUps.addWarningPopUp(err.data.message)
      })
  }
  const onSelectObservation = ({ detail }) => {
    selectedObs = detail
    window.scrollTo({
      top: selectedObs.y - 60,
      behavior: 'smooth'
    });
  }
  const deleteObservation = () => {
    isLoadingDelObsModal = true
    api.observation
      .delObservation(selectedObs.id, $document.accessCode)
      .then(() => {
        isLoadingDelObsModal = false
        popUps.addSuccessPopUp('Observación eliminada')
        document.deleteObservation(selectedObs.id)
        isOpenDelObsModal = false
      })
      .catch((err) => {
        isLoadingDelObsModal = false
        if (!err || !err.data) {
          popUps.addErrorPopUp('Error conectando al servidor')
          return
        }
        popUps.addWarningPopUp(err.data.message)
      })
  }
  const onDeleteObservation = () => {
    isOpenDelObsModal = true
  }
  const openObsModal = () => {
    isOpenObsModal = true
  }
  const closeObsModal = () => {
    isOpenObsModal = false
  }
  const closeDelObsModal = () => {
    isOpenDelObsModal = false
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
<DeleteModal
  message={`Borrar observación: ${selectedObs.text}`}
  open={isOpenDelObsModal}
  loading={isLoadingDelObsModal}
  on:delete={deleteObservation}
  on:close={closeDelObsModal}
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
    <PdfViewer
      editable={editable}
      pdfPath={$document.url}
      observations={$document.observations}
      selectedObs={selectedObs}
      on:selectObs={onSelectObservation}
      on:newObservation={newObservation}
      on:openObsModal={openObsModal}
      on:closeObsModal={closeObsModal}
      {isOpenObsModal}
      {isLoadingObsModal}
    />
  </div>
  <div class="observationsCont">
    <Observations
      editable={editable}
      observations={$document.observations}
      selectedObs={selectedObs}
      on:selectObs={onSelectObservation}
      on:delete={onDeleteObservation}
    />
  </div>
</main>
