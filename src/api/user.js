import endpoints from './endpoints'
import { CONTENT_TYPE, MULTIPART_FORM } from '../utils/consts'

export default (axios) => ({
  login: async (email, password) => {
    const data = {
      email,
      password,
    }
    const resp = await axios.post(endpoints.user.login, data)
    return resp.data
  },

  register: async (name, lastName, password, email) => {
    const data = {
      name,
      lastName,
      password,
      email,
    }
    const resp = await axios.post(endpoints.user.register, data)
    return resp.data
  },

  checkToken: async () => {
    const resp = await axios.get(endpoints.user.token)
    return resp.data
  },

  newProject: async (name, institute) => {
    const data = {
      name,
      institute,
    }
    const resp = await axios.post(endpoints.user.newProject, data)
    return resp.data
  },

  projectList: async () => {
    const resp = await axios.get(endpoints.user.getProjects)
    return resp.data
  },

  delProject: async (projectID) => {
    const resp = await axios.delete(endpoints.user.delProject(projectID))
    return resp.data
  },

  newDocument: async (projectID, comment, document, cb) => {
    const config = {
      headers: {
        [CONTENT_TYPE]: MULTIPART_FORM,
      },
      onUploadProgress: (progressEvent) =>
        cb(progressEvent.loaded, progressEvent.total),
    }
    const dataForm = new FormData()
    dataForm.set('projectId', projectID)
    dataForm.set('comment', comment)
    dataForm.set('document', document)

    const resp = await axios.post(endpoints.user.newDocument, dataForm, config)
    return resp.data
  },

  getProjectDocs: async (projectID) => {
    const resp = await axios.get(endpoints.user.getProjectDocs(projectID))
    return resp.data
  },

  genNewDocCode: async (documentID) => {
    const resp = await axios.patch(
      endpoints.user.genNewDocumentCode(documentID)
    )
    return resp.data
  },

  delDocument: async (documentID) => {
    const resp = await axios.delete(endpoints.user.delDocument(documentID))
    return resp.data
  },
})
