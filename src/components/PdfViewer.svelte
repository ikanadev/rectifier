<style>
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
</style>

<script>
  import Icon from 'svelte-awesome'
  import { exclamationCircle } from 'svelte-awesome/icons'
  import { onMount } from 'svelte'
  import pdfjsLib from 'pdfjs-dist'
  import pdfjsViewer, { EventBus } from 'pdfjs-dist/web/pdf_viewer.js'

  import ObsModal from './ObsModal.svelte'

  export let pdfPath
  export let observations = []

  const workerPath = '/pdf.worker.min.js'

  let showModal = false
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
    showModal = false
  }

  function load() {
    pdfViewer = new pdfjsViewer.PDFViewer({
      container: containerRef,
      useOnlyCssZoom: true,
      eventBus: new EventBus(),
    })
    var loadingTask = pdfjsLib.getDocument(pdfPath)
    loadingTask.promise.then(function (doc) {
      pdfViewer.setDocument(doc)
      // pdfViewer.currentScale = 1
      // console.log(pdfViewer.currentScale);
    })
  }
  onMount(() => {
    load()
  })
  const handleClick = (e) => {
    modalCoords = { x: e.clientX, y: e.clientY + scrollY }
    showModal = true
    const divPos = e.currentTarget.getBoundingClientRect()
    const x = e.pageX - divPos.left
    const y = e.pageY - divPos.top
    markerCoords = { x, y }
  }
</script>

<svelte:window bind:scrollY />
<div>
  <ObsModal
    top="{`${modalCoords.y - 30 - (showModal ? scrollY : 0)}px`}"
    left="{`${modalCoords.x + 10}px`}"
    hidden="{!showModal}"
    onClose="{closeModal}"
    markerCoords="markerCoords"
  />
  <div
    class="{'pdfjs-container'}"
    bind:this="{containerRef}"
    on:click="{handleClick}"
  >
    <div class="{'pdfViewer'}"></div>
    {#each observations as { x, y }}
      <span
        class="iconCont"
        style="--top:{`${y - 21}px`};--left:{`${x - 21}px`}"
      >
        <Icon data="{exclamationCircle}" scale="3" />
      </span>
    {/each}
  </div>
</div>
