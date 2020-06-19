import { writable } from 'svelte/store'

const createPopUpsStore = () => {
  // popup struct {message: '', type: ''}
  const { subscribe, update } = writable([]);
  return {
    subscribe,
    addWarningPopUp: (message) => {
      const id = Math.random().toString(36).slice(-6)
      update((popUps) => [...popUps, {message, type: 'warning', id }])
    },
    addSuccessPopUp: (message) => {
      const id = Math.random().toString(36).slice(-6)
      update((popUps) => [...popUps, {message, type: 'success', id }])
    },
    addErrorPopUp: (message) => {
      const id = Math.random().toString(36).slice(-6)
      update((popUps) => [...popUps, {message, type: 'error', id }])
    },
    removePopUp: (id) => {
      update((popUps) => popUps.filter((popUp) => popUp.id !== id))
    },
  }
}

const popUps = createPopUpsStore()
export default popUps
