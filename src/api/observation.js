import endpoints from './endpoints'

export default (axios) => ({
  newObservation: async (documentId, x, y, text, author, docCode) => {
    const data = {
      documentId,
      x,
      y,
      text,
      author,
    }
    const resp = await axios.post(endpoints.observation.newObservation(docCode), data)
    return resp.data
  },

  docObservations: async (docCode) => {
    const resp = await axios.get(endpoints.observation.docObservations(docCode))
    return resp.data
  },

  delObservation: async (obsID, docCode) => {
    const resp = await axios.delete(endpoints.observation.delObservation(obsID, docCode))
    return resp.data
  }
})
