import Axios from 'axios'
import conf from '../utils/conf'
import { AUTHORIZATION, CONTENT_TYPE, APP_JSON } from '../utils/consts'
import { getToken } from '../utils/functions'
import user from './user'
import observation from './observation'

const axios = Axios.create({
  baseURL: conf.baseURL,
  responseType: 'json',
  headers: {
    [CONTENT_TYPE]: APP_JSON,
  },
})

axios.interceptors.request.use((config) => {
  config.headers[AUTHORIZATION] = getToken()
  return config
})

axios.interceptors.response.use(
  (res) => res,
  (error) => {
    return Promise.reject(error.response)
  }
)

export default {
  user: user(axios),
  observation: observation(axios),
}
