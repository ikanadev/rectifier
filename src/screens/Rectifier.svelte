<style>
  main {
    display: flex;
    flex-wrap: wrap;
  }
  .pdfCont {
    flex: 1;
    min-width: 820px;
    overflow: hidden;
    display: flex;
    justify-content: center;
  }
  .observationsCont {
    width: 400px;
  }
</style>

<script>
  import PdfViewer from '../components/PdfViewer.svelte'
  import Observations from '../components/Observations.svelte'

  const observations = [
    { id: 1, x: 582.5, y: 229, text: 'ALGUNA OBSERVACION' },
    { id: 2, x: 699.5, y: 834, text: 'OTRA OBSERVACION' },
    { id: 3, x: 699.5, y: 83, text: 'Una observacion larga que necesita ser corregida lo mas antes posible.' },
    { id: 4, x: 69.5, y: 83, text: 'MMMMMMMMM MMMMMMMMMMMM MMMMMMMM MMMMM' },
    { id: 1, x: 582.5, y: 229, text: 'ALGUNA OBSERVACION' },
    { id: 2, x: 699.5, y: 834, text: 'OTRA OBSERVACION' },
    { id: 3, x: 699.5, y: 83, text: 'Una observacion larga que necesita ser corregida lo mas antes posible.' },
    { id: 4, x: 69.5, y: 83, text: 'MMMMMMMMM MMMMMMMMMMMM MMMMMMMM MMMMM' },
    { id: 1, x: 582.5, y: 229, text: 'ALGUNA OBSERVACION' },
    { id: 2, x: 699.5, y: 834, text: 'OTRA OBSERVACION' },
    { id: 3, x: 699.5, y: 83, text: 'Una observacion larga que necesita ser corregida lo mas antes posible.' },
    { id: 4, x: 69.5, y: 83, text: 'MMMMMMMMM MMMMMMMMMMMM MMMMMMMM MMMMM' },
    { id: 1, x: 582.5, y: 229, text: 'ALGUNA OBSERVACION' },
    { id: 2, x: 699.5, y: 834, text: 'OTRA OBSERVACION' },
    { id: 3, x: 699.5, y: 83, text: 'Una observacion larga que necesita ser corregida lo mas antes posible.' },
    { id: 4, x: 69.5, y: 83, text: 'MMMMMMMMM MMMMMMMMMMMM MMMMMMMM MMMMM' },
  ]
</script>

<main>
  <div class="pdfCont">
    <PdfViewer pdfPath="/img/tesisprueba.pdf" {observations} />
  </div>
  <div class="observationsCont">
    <Observations {observations} />
  </div>
</main>
