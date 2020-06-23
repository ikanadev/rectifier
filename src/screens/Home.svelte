<style>
  .cont {
    width: 100%;
    height: 100vh;
    background: #f27121;
    background: linear-gradient(90deg, #8a2387 0%, #e94057 75%, #f27121 100%);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .content {
    width: 90%;
    max-width: 1200px;
    min-height: 60%;
    background: white;
    border-radius: 40px;
    box-shadow: 10px 10px 35px 0px #444444;
    display: flex;
    flex-wrap: wrap;
    padding: 25px;
  }
  .svgCont {
    flex: 5;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-right: 30px;
  }

  .svgCont h1 {
    text-align: right;
    color: var(--primary);
    font-size: 2.7em;
  }

  .svgCont p {
    text-align: right;
    font-size: 1.3em;
  }
  .svgCont div {
    align-self: center;
    width: 80%;
  }

  .inputCont {
    flex: 4;
    display: flex;
    flex-direction: column;
  }
  .docCont {
    width: 60%;
    align-self: center;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .buttons {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    font-style: italic;
  }
  h3 {
    cursor: pointer;
    text-decoration: underline;
    margin-right: 1em;
    margin-left: 0.5em;
    color: var(--primary);
    font-family: 'Heebo', sans-serif;
    font-size: 1em;
  }
  .hidden {
    display: none;
  }
</style>

<script>
  import PaperSVG from '../assets/paper.svelte'
  import DocumentSVG from '../assets/document.svelte'

  import Code from './Home/Code.svelte'
  import Register from './Home/Register.svelte'
  import Login from './Home/Login.svelte'
  // selected can be review, login and register
  let selected = 'login'
</script>

<div class="cont">
  <div class="content">
    <div class="svgCont">
      <h1>RECTIFIER</h1>
      <p>
        Herramienta que te permite almacenar y administrar documentos que
        requieren revisión en formato PDF.
      </p>
      <div>
        <PaperSVG />
      </div>
    </div>
    <div class="inputCont">
      <div class="docCont">
        <DocumentSVG />
      </div>
      {#if selected === 'review'}
        <Code />
      {/if}
      {#if selected === 'login'}
        <Login />
      {/if}
      {#if selected === 'register'}
        <Register />
      {/if}
      <div class="buttons">
        O también puede:
        <h3
          class:hidden="{selected === 'review'}"
          on:click="{() => {
            selected = 'review'
          }}"
        >
          Revisar PDF
        </h3>
        <h3
          class:hidden="{selected === 'login'}"
          on:click="{() => {
            selected = 'login'
          }}"
        >
          Ingresar
        </h3>
        <h3
          class:hidden="{selected === 'register'}"
          on:click="{() => {
            selected = 'register'
          }}"
        >
          Registrarse
        </h3>
      </div>
    </div>
  </div>
</div>
