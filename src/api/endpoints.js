export default {
  user: {
    login: 'login',
    register: 'register',
    token: 'token',
    newProject: 'v1/project',
    getProjects: 'v1/project',
    delProject: (id) => `v1/project/${id}`,
    // this must be multipart/form
    newDocument: 'v1/document',
    getProjectDocs: (projectID) => `v1/project/${projectID}/documents`,
    genNewDocumentCode: (documentID) => `v1/document/${documentID}/generate`,
    delDocument: (documentID) => `v1/document/${documentID}`,
  },
  observation: {
    newObservation: (docCode) => `v1/observation/${docCode}`,
    docObservations: (docCode) => `v1/documentobs/${docCode}`,
    delObservation: (obsID, docCode) => `v1/observation/${obsID}/${docCode}`,
    rectifyDocument: (docCode) => `v1/documentrectify/${docCode}`,
  },
}
