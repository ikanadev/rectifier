<style>
  @keyframes alert {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.3);
    }
    100% {
      transform: scale(1);
    }
  }
  .pdfjs-container {
    width: 100%;
    position: relative;
  }
  .pdfViewer {
    display: inline-block;
  }
  .iconCont {
    position: absolute;
    top: var(--top);
    left: var(--left);
    color: #f83e0681;
    cursor: pointer;
  }
  .iconCont:hover {
    color: #f83e06;
  }
  .selected {
    animation: alert 2s infinite;
    color: #f83e06;
    transform: scale(1.2);
  }
  .selected:hover {
    color: #f83e0681;
  }
</style>

<script>
  import Icon from 'svelte-awesome'
  import { exclamationCircle } from 'svelte-awesome/icons'
  import { onMount, createEventDispatcher } from 'svelte'
  import pdfjsLib from 'pdfjs-dist'
  import pdfjsViewer, { EventBus } from 'pdfjs-dist/web/pdf_viewer.js'

  import ObsModal from './ObsModal.svelte'

  export let pdfPath
  export let observations = []
  export let selectedObs = { id: 0, x: 0, y: 0 }
  export let isOpenObsModal = false
  export let isLoadingObsModal = false
  export let editable = false

  const workerPath = '/pdf.worker.min.js'
  const dispatch = createEventDispatcher()

  let loading = true
  let modalCoords = {
    x: 0,
    y: 0,
  }
  let markerCoords = {
    x: 0,
    y: 0,
  }
  let scrollY = 0
  let containerRef
  let pdfViewer
  pdfjsLib.GlobalWorkerOptions.workerSrc = workerPath

  const closeModal = () => {
    dispatch('closeObsModal')
  }

  function load() {
    pdfViewer = new pdfjsViewer.PDFViewer({
      container: containerRef,
      useOnlyCssZoom: true,
      eventBus: new EventBus(),
    })
    var loadingTask = pdfjsLib.getDocument(pdfPath)
    loadingTask.promise.then(function (doc) {
      loading = false
      pdfViewer.setDocument(doc)
      // pdfViewer.currentScale = 1
    })
  }
  onMount(() => {
    load()
  })
  const handleClick = (e) => {
    if (!editable) {
      return
    }
    modalCoords = { x: e.clientX, y: e.clientY + scrollY }
    dispatch('openObsModal')
    const divPos = e.currentTarget.getBoundingClientRect()
    const x = Math.round(e.pageX - divPos.left)
    const y = Math.round(e.pageY - (divPos.top + scrollY))
    markerCoords = { x, y }
  }
  const handleObsClick = (observation) => (e) => {
    e.stopPropagation()
    dispatch('selectObs', observation)
  }
</script>

<svelte:window bind:scrollY />
<div>
  <ObsModal
    top="{`${modalCoords.y - 30 - (isOpenObsModal ? scrollY : 0)}px`}"
    left="{`${modalCoords.x + 10}px`}"
    hidden="{!isOpenObsModal}"
    isLoading="{isLoadingObsModal}"
    onClose="{closeModal}"
    {markerCoords}
    on:newObservation
  />
  <div
    class="{'pdfjs-container'}"
    bind:this="{containerRef}"
    on:click="{handleClick}"
  >
    <div class="{'pdfViewer'}"></div>
    {#if loading}
      <h1>LOADING...</h1>
    {:else}
      {#each observations as { x, y, id, text }}
        <span
          class="iconCont"
          style="--top:{`${y - 21}px`};--left:{`${x - 21}px`}"
          on:click="{handleObsClick({ x, y, id, text })}"
          class:selected="{selectedObs.id === id}"
        >
          <Icon data="{exclamationCircle}" scale="3" />
        </span>
      {/each}
    {/if}
  </div>
</div>
