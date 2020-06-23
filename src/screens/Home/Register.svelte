<style>
  .formCont {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  input {
    border: none;
    border-bottom: 0.8px solid #888;
    padding: 8px;
    padding-bottom: 2px;
    font-weight: 300;
    font-size: 20px;
    min-width: 220px;
    margin-bottom: 12px;
  }
  input:focus {
    outline: none;
  }
  button {
    border-radius: 6px;
    border: none;
    height: 35px;
    color: white;
    background: #f83e06;
    margin-top: 15px;
    font-weight: 300;
    cursor: pointer;
    font-size: 16px;
    padding: 4px 15px;
  }
  button:hover {
    background: #fa4e16;
  }
</style>

<script>
  import { fade } from 'svelte/transition'
</script>

<form class="formCont" in:fade>
  <input type="text" placeholder="Nombre(s)" />
  <input type="text" placeholder="Apellido(s)" />
  <input type="text" placeholder="Correo electrónico" />
  <input type="password" placeholder="Password" />
  <button>REGISTRARME</button>
</form>
