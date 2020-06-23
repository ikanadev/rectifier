import { writable } from 'svelte/store'

const intialState = {
  project: 0,
  document: 0,
}

const createSelectedStore = () => {
  const { set, update, subscribe } = writable(intialState)
  return {
    subscribe,
    clearData: () => set(intialState),
    setProject: (projectID) => {
      update((data) => ({ ...data, project: projectID }))
    },
    setDocument: (docID) => {
      update((data) => ({ ...data, document: docID }))
    },
    clearDocument: () => {
      update((data) => ({ ...data, document: 0 }))
    },
  }
}

const selected = createSelectedStore()
export default selected
