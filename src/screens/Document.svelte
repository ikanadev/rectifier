<style>
  .titleCont {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  .titleCont div {
    flex: 1;
    max-width: 800px;
    display: flex;
    align-items: center;
  }
  .backIcon {
    cursor: pointer;
    background: var(--primary);
    color: white;
    margin-right: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    box-shadow: 6px 6px 12px var(--dark), -6px -6px 12px white;
  }
  .backIcon:hover {
    box-shadow: 10px 10px 20px var(--dark), -10px -10px 20px white;
  }
  h2 {
    color: var(--primary);
  }
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
  import Icon from 'svelte-awesome'
  import { arrowLeft } from 'svelte-awesome/icons'

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
  let isOpenModal = editable
  let isLoadingObsModal = false
  let isOpenObsModal = false
  let isOpenDelObsModal = false
  let isLoadingDelObsModal = false
  let selectedObs = { id: 0, x: 0, y: 0, text: '' }

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
    api.observation
      .rectifyDocument($document.accessCode)
      .then(() => {
        popUps.addSuccessPopUp('Documento revisado')
        document.setDocument({})
      })
      .catch(() => {
        if (!err || !err.data) {
          popUps.addErrorPopUp('Hubo un error con el servidor')
          return
        }
        popUps.addWarningPopUp(err.data.message)
      })
  }
  const newObservation = ({ detail }) => {
    isLoadingObsModal = true
    api.observation
      .newObservation(
        $document.id,
        detail.x,
        detail.y,
        detail.text,
        name,
        $document.accessCode
      )
      .then((res) => {
        popUps.addSuccessPopUp('Observación registrada')
        document.addObservation(res)
        isLoadingObsModal = false
        isOpenObsModal = false
      })
      .catch((err) => {
        isLoadingObsModal = false
        if (!err || !err.data) {
          popUps.addErrorPopUp('Hubo un error con el servidor')
          return
        }
        popUps.addWarningPopUp(err.data.message)
      })
  }
  const onSelectObservation = ({ detail }) => {
    selectedObs = detail
    window.scrollTo({
      top: selectedObs.y - 60,
      behavior: 'smooth',
    })
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
          popUps.addErrorPopUp('Hubo un error con el servidor')
          return
        }
        popUps.addWarningPopUp(err.data.message)
      })
  }
  const goBack = () => {
    document.setDocument({})
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

{#if editable}
  <Header
    {name}
    actionText="TERMINAR"
    on:load="{onLoadHeader}"
    on:action="{onFinish}"
  />
{:else}
  <div class="titleCont">
    <div>
      <span class="backIcon" on:click="{goBack}">
        <Icon data="{arrowLeft}" scale="1.5" />
      </span>
      <h2>Observaciones</h2>
    </div>
  </div>
{/if}
<DeleteModal
  message="{`Borrar observación: ${selectedObs.text}`}"
  open="{isOpenDelObsModal}"
  loading="{isLoadingDelObsModal}"
  on:delete="{deleteObservation}"
  on:close="{closeDelObsModal}"
/>
<Modal open="{isOpenModal}">
  <h3>Ingrese su Nombre</h3>
  <div class="inputCont">
    <input
      placeholder="Las observaciones se mostrarán con este nombre"
      type="text"
      bind:value="{name}"
    />
  </div>
  <Button text="CONTINUAR" on:action="{onContinue}" blue />
</Modal>
<main style="--marginTop:{marginTop}px">
  <div class="pdfCont">
    <PdfViewer
      {editable}
      pdfPath="{$document.url}"
      observations="{$document.observations}"
      {selectedObs}
      on:selectObs="{onSelectObservation}"
      on:newObservation="{newObservation}"
      on:openObsModal="{openObsModal}"
      on:closeObsModal="{closeObsModal}"
      {isOpenObsModal}
      {isLoadingObsModal}
    />
  </div>
  <div class="observationsCont">
    <Observations
      {editable}
      comment="{$document.comment}"
      observations="{$document.observations}"
      {selectedObs}
      on:selectObs="{onSelectObservation}"
      on:delete="{onDeleteObservation}"
      pdfPath="{$document.url}"
    />
  </div>
</main>
