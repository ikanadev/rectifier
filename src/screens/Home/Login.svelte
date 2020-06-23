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

  import { LS_TOKEN } from '../../utils/consts'
  import user from '../../store/user'
  import api from '../../api/api'
  import popUps from '../../store/popups'

  let email = ''
  let password = ''

  const handleLogin = () => {
    api.user
      .login(email, password)
      .then((res) => {
        localStorage.setItem(LS_TOKEN, `Bearer ${res.token}`)
        user.setUser(res.user)
        popUps.addSuccessPopUp(`Bienvenido a rectify ${res.user.name}!`)
      })
      .catch((err) => {
        if (!err || !err.data) {
          popUps.addErrorPopUp('Error conectando al servidor')
          return
        }
        popUps.addWarningPopUp(err.data.message)
      })
  }
</script>

<form class="formCont" in:fade>
  <input type="email" bind:value="{email}" placeholder="Correo electrónico" />
  <input type="password" bind:value="{password}" placeholder="Password" />
  <button on:click|preventDefault="{handleLogin}">INGRESAR</button>
</form>
