<style>
  h3 {
    text-align: center;
    color: var(--text);
    font-weight: bold;
    font-size: 22px;
  }
  .buttonsCont {
    display: flex;
    justify-content: flex-end;
  }
  form {
    display: flex;
    flex-direction: column;
  }
  textarea {
    border: none;
    outline: none;
    background: none;
    font-size: 18px;
    color: #555;
    padding: 8px 30px;
    font-weight: 300;
    margin-top: 20px;
    margin-bottom: 20px;
    border-radius: 25px;
    box-shadow: inset 8px 8px 8px #cbced1, inset -8px -8px 8px #ffffff;
  }
  .pdfCont {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .pdfInput {
    display: none;
  }
  .pdfIcon {
    color: var(--disabled);
  }
  .pdfSelected {
    color: var(--red);
  }
  .loadingBar {
    width: 100%;
    height: 12px;
    background: var(--disabled);
    border-radius: 6px;
    overflow: hidden;
  }
  .loadingBar div {
    height: 100%;
    overflow: hidden;
    color: white;
    font-size: 10px;
    text-align: center;
    width: var(--percent);
    background: var(--blue);
  }
</style>

<script>
  import { createEventDispatcher } from 'svelte'
  import Icon from 'svelte-awesome'
  import { filePdfO } from 'svelte-awesome/icons'

  import popUps from '../../store/popups'

  import Modal from '../../components/Modal.svelte'
  import Button from '../../components/Button.svelte'

  export let open = false
  export let loading = false
  export let percentUploaded = 0

  let inputFileRef = null
  let text = ''
  let file = new File([], '')
  let fileName = 'Seleccione un documento'

  const dispatch = createEventDispatcher()

  const resetValues = () => {
    text = ''
    file = new File([], '')
    fileName = 'Selecciones un documento'
  }

  const onOpenFileSelecter = () => {
    if (inputFileRef) {
      inputFileRef.click()
    }
  }
  const onChangeFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      fileName = selectedFile.name
      file = selectedFile
    }
  }
  const onRegister = () => {
    if (text === '' || file.size === 0) {
      popUps.addWarningPopUp('Seleccione un documento y agregue un comentario')
      return
    }
    dispatch('register', {
      text,
      file,
      resetValues,
    })
  }
  const onClose = () => {
    dispatch('close')
  }
</script>

<Modal {open}>
  <h3>Agregar documento</h3>
  <form>
    <div class="pdfCont">
      <br />
      <span class="pdfIcon" class:pdfSelected="{file.size > 0}">
        <Icon data="{filePdfO}" scale="3" />
      </span>
      {#if loading}
        <div class="loadingBar" style="--percent:{`${percentUploaded}%`}">
          <div>{percentUploaded}%</div>
        </div>
      {/if}
      <p>{fileName}</p>
      <br />
      <input
        bind:this="{inputFileRef}"
        class="pdfInput"
        type="file"
        accept="application/pdf"
        id="new-pdf-input"
        on:change="{onChangeFile}"
      />
      <label for="new-pdf-input">
        <Button
          disabled="{loading}"
          primary
          text="{file.size === 0 ? 'Agregar PDF' : 'Cambiar PDF'}"
          on:action="{onOpenFileSelecter}"
        />
      </label>
    </div>
    <textarea
      bind:value="{text}"
      rows="4"
      placeholder="Comentarios para el revisor..."
    ></textarea>
    <div class="buttonsCont">
      <Button
        type="submit"
        text="{loading ? 'SUBIENDO' : 'CREAR'}"
        blue
        on:action="{onRegister}"
        disabled="{loading}"
      />
      <Button text="CANCELAR" on:action="{onClose}" disabled="{loading}" />
    </div>
  </form>
</Modal>
