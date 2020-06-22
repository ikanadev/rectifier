<style>
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
  .bookIcon {
    color: var(--blue);
    padding: 10px;
    padding-left: 20px;
  }
  .delIcon {
    align-self: stretch;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    background: #f94647;
    color: white;
    cursor: pointer;
  }
  .delIcon:hover {
    background: #ee2525;
  }
  article > div {
    padding: 10px 15px;
    display: flex;
    flex: 1;
    flex-direction: column;
    cursor: pointer;
  }
  h3 {
    font-size: 25px;
  }
  .details {
    display: flex;
    font-style: italic;
    margin-top: 5px;
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
</style>

<script>
  import { createEventDispatcher } from 'svelte'
  import Icon from 'svelte-awesome'
  import { times, book, file } from 'svelte-awesome/icons'
  import { scale } from 'svelte/transition'

  import api from '../../api/api'
  import popUps from '../../store/popups'
  import userData from '../../store/userData'
  import DeleteModal from './DeleteModal.svelte'
  import AddModal from './AddModal.svelte'
  import FloatButton from '../../components/FloatButton.svelte'
  import { text } from 'svelte/internal'

  export let projects = {}

  const dispatch = createEventDispatcher()

  let isOpenAddModal = false
  let isLoadingAddModal = false
  let isOpenDelModal = false
  let isLoadingDelModal = false
  let selectedItem = { id: 0, name: '' }

  const getDateFromString = (dateStr) => {
    const date = new Date(dateStr)
    return `${('0' + date.getDate()).slice(-2)}-${(
      '0' +
      (date.getMonth() + 1)
    ).slice(-2)}-${date.getFullYear()}`
  }

  const onDelete = () => {
    isLoadingDelModal = true
    api.user
      .delProject(selectedItem.id)
      .then(() => {
        userData.deleteProject(selectedItem.id)
        popUps.addSuccessPopUp(`Proyecto ${selectedItem.name} borrado.`)
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

  const onRegister = ({ detail: { name, institute }}) => {
    if (name.trim() === '' || institute.trim() === '') {
      popUps.addWarningPopUp('Nombre e institución no pueden estar vacíos')
      return
    }
    isLoadingAddModal = true
    api.user
      .newProject(name, institute)
      .then((res) => {
        userData.addProject(res)
        popUps.addSuccessPopUp(`Proyecto ${res.name} guardado`)
        isLoadingAddModal = false
        isOpenAddModal = false
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
  const openAddModal = () => {
    isOpenAddModal = true
  }
  const closeAddModal = () => {
    isOpenAddModal = false
  }
  const openDelModal = (item) => () => {
    selectedItem = item
    isOpenDelModal = true
  }
  const closeDelModal = () => {
    isOpenDelModal = false
  }
</script>

<DeleteModal
  open="{isOpenDelModal}"
  loading="{isLoadingDelModal}"
  message="{`Borrar proyecto ${selectedItem.name}`}"
  on:close="{closeDelModal}"
  on:delete="{onDelete}"
/>
{#each Object.keys(projects) as key}
  <div class="itemCont">
    <article>
      <span class="bookIcon">
        <Icon data="{book}" scale="2.5" />
      </span>
      <div>
        <h3>{projects[key].name}</h3>
        <hr />
        <div class="details">
          <p>{projects[key].institute}</p>
          <p>Creado el: {getDateFromString(projects[key].created_at)}</p>
        </div>
      </div>
      <span class="delIcon" on:click="{openDelModal(projects[key])}">
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
<AddModal
  open="{isOpenAddModal}"
  loading="{isLoadingAddModal}"
  on:close="{closeAddModal}"
  on:register="{onRegister}"
/>
