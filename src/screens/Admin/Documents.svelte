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
  .itemCont {
    display: flex;
    justify-content: center;
  }
  article {
    flex: 1;
    max-width: 800px;
    display: flex;
    align-items: center;
    border-radius: 10px;
    margin-bottom: 22px;
    box-shadow: 6px 6px 12px var(--dark), -6px -6px 12px white;
    overflow: hidden;
    background: linear-gradient(145deg, var(--background), #ffffff);
    background: var(--background);
    transition: all 0.5s;
  }
  article:hover {
    box-shadow: 10px 10px 20px var(--dark), -10px -10px 20px white;
  }
  .pdfIcon {
    color: var(--red);
    padding: 10px;
    padding-left: 20px;
  }
  .icon {
    align-self: stretch;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    color: white;
    cursor: pointer;
    transition: transform 0.5s;
  }
  .icon:hover {
    transform: scaleX(1.1);
  }
  .keyIcon {
    background: var(--blue);
  }
  .delIcon {
    background: var(--red);
  }
  .checkIcon {
    background: var(--disabled);
  }
  .checked {
    background: var(--green);
  }
  article > div {
    padding: 10px 15px;
    display: flex;
    flex: 1;
    flex-direction: column;
    cursor: pointer;
  }
  .details {
    display: flex;
    font-style: italic;
    margin-top: 5px;
    flex-wrap: wrap;
  }
  .details p:first-child {
    flex: 1;
  }
  .addCont {
    display: flex;
    justify-content: center;
    margin-top: 0px;
    margin-bottom: 15px;
  }
  .addCont div {
    flex: 1;
    max-width: 800px;
    display: flex;
    justify-content: flex-end;
  }
  .code {
    font-size: 35px;
    font-family: monospace;
    margin-top: 15px;
    margin-bottom: 15px;
    text-align: center;
  }
</style>

<script>
  import { onMount } from 'svelte'
  import Icon from 'svelte-awesome'
  import {
    clockO,
    check,
    arrowLeft,
    filePdfO,
    times,
    key as keyData,
  } from 'svelte-awesome/icons'

  import api from '../../api/api'
  import { getDateFromString } from '../../utils/functions'
  import selected from '../../store/selected'
  import popUps from '../../store/popups'
  import userData, { getDocuments } from '../../store/userData'

  import Modal from '../../components/Modal.svelte'
  import Button from '../../components/Button.svelte'
  import FloatButton from '../../components/FloatButton.svelte'
  import AddDocModal from './AddDocModal.svelte'
  import DeleteModal from '../../components/DeleteModal.svelte'

  const project = $userData.projects[$selected.project]
  let documents = getDocuments(project.id)

  let isOpenAddModal = false
  let isLoadingAddModal = false
  let isOpenDelModal = false
  let isLoadingDelModal = false
  let isOpenCodeModal = false
  let selectedID = 0
  let selectedCode = ''

  const onDelete = () => {
    isLoadingDelModal = true
    api.user
      .delDocument(selectedID)
      .then(() => {
        userData.deleteDocument(selectedID, project.id)
        popUps.addSuccessPopUp('Documento eliminado')
        isLoadingDelModal = false
        isOpenDelModal = false
      })
      .catch((err) => {
        isLoadingDelModal = false
        isOpenDelModal = false
        if (!err || !err.data) {
          popUps.addErrorPopUp('Error conectando al servidor')
          return
        }
        popUps.addWarningPopUp(err.data.message)
      })
  }
  const onRegister = ({ detail: { text, file } }) => {
    isLoadingAddModal = true
    api.user
      .newDocument(project.id, text, file)
      .then((res) => {
        isLoadingAddModal = false
        isOpenAddModal = false
        userData.addDocument(project.id, res)
        popUps.addSuccessPopUp('Documento registrado')
      })
      .catch((err) => {
        isLoadingAddModal = false
        isOpenAddModal = false
        if (!err || !err.data) {
          popUps.addErrorPopUp('Error conectando al servidor')
          return
        }
        popUps.addWarningPopUp(err.data.message)
      })
  }
  const goBack = () => {
    selected.clearData()
  }
  const openAddModal = () => {
    isOpenAddModal = true
  }
  const closeAddModal = () => {
    isOpenAddModal = false
  }
  const openDelModal = (docID) => () => {
    selectedID = docID
    isOpenDelModal = true
  }
  const closeDelModal = () => {
    isOpenDelModal = false
  }
  const openCodeModal = (code) => () => {
    selectedCode = code
    isOpenCodeModal = true
  }
  const closeCodeModal = () => {
    isOpenCodeModal = false
  }
  onMount(() => {
    if (Object.keys($documents).length === 0) {
      api.user
        .getProjectDocs(project.id)
        .then((res) => {
          userData.setDocuments(project.id, res.documents)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  })
</script>

<Modal open="{isOpenCodeModal}">
  <p>Envía este código a tu revisor:</p>
  <p class="code">{selectedCode}</p>
  <Button on:action="{closeCodeModal}" text="CERRAR" />
</Modal>
<DeleteModal
  open="{isOpenDelModal}"
  loading="{isLoadingDelModal}"
  message="{`Borrar documento?`}"
  on:close="{closeDelModal}"
  on:delete="{onDelete}"
/>
<AddDocModal
  open="{isOpenAddModal}"
  loading="{isLoadingAddModal}"
  on:close="{closeAddModal}"
  on:register="{onRegister}"
/>
<div class="titleCont">
  <div>
    <span class="backIcon" on:click="{goBack}">
      <Icon data="{arrowLeft}" scale="1.5" />
    </span>
    <h2>Documentos de {project.name}</h2>
  </div>
</div>
<div class="titleCont">
  <div>
    <p>
      Para compartir un documento con tu revisor, presiona el ícono
      <span>
        <Icon data="{keyData}" />
      </span>
      y envíale el código de accesso.
    </p>
  </div>
</div>
{#each Object.keys($documents) as key}
  <div class="itemCont">
    <article>
      <span class="icon checkIcon" class:checked="{$documents[key].rectified}">
        <Icon data="{$documents[key].rectified ? check : clockO}" scale="2" />
      </span>
      <span class="pdfIcon">
        <Icon data="{filePdfO}" scale="2.5" />
      </span>
      <div>
        <p>{$documents[key].comment}</p>
        <hr />
        <div class="details">
          <!-- <p>{$documents[key].accessCode}</p> -->
          <p>
            Estado: {$documents[key].rectified ? 'Revisado' : 'Por revisar.'}
          </p>
          <p>Creado el: {getDateFromString($documents[key].created_at)}</p>
        </div>
      </div>
      <span
        class="icon keyIcon"
        on:click="{openCodeModal($documents[key].accessCode)}"
      >
        <Icon data="{keyData}" scale="2" />
      </span>
      <span class="icon delIcon" on:click="{openDelModal($documents[key].id)}">
        <Icon data="{times}" scale="2" />
      </span>
    </article>
  </div>
{/each}
<div class="addCont">
  <div>
    <FloatButton on:action="{openAddModal}" primary />
  </div>
</div>
