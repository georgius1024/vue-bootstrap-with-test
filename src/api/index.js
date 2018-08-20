import axios from 'axios'
import config from '@/config'

const addTrailingSlash = (url) => String(url).replace(/\/?$/, '/')

const Api = {
  apiStatus: '',
  apiError: false,
  token: false,
  onGetToken: false,
  onStartRequest: false,
  onCompleteRequest: false,
  onMessage: false,
  onError: false
}
Api.request = (request) => {
  request.url = addTrailingSlash(config.API_URL) + request.url
  if (Api.onGetToken) {
    Api.token = Api.onGetToken()
  }
  if (Api.token) {
    request.headers = {
      Authorization: 'Bearer ' + Api.token
    }
  }
  return axios(request)
}

Api.rest = (request) => {
  return new Promise((resolve, reject) => {
    if (Api.onStartRequest) {
      Api.onStartRequest()
    }
    Api.request(request)
      .then(response => {
        if (Api.onCompleteRequest) {
          Api.onCompleteRequest()
        }
        if (response.data) {
          if (Api.onMessage && response.data.message) {
            Api.onMessage(response.data.message)
          }
          if (response.data.auth) {
            Api.token = response.data.auth.token
          }
        }
        resolve(response.data)
      })
      .catch(error => {
        let errorMessage = 'Общая ошибка'
        let errorStatus = 900
        if (error.response) {
          if (error.response.data) {
            errorMessage = error.response.data.message
            errorStatus = error.response.status
          }
        }
        if (Api.onError) {
          Api.onError(errorMessage, errorStatus)
        }
        reject(error)
      })
  })
}

export default Api
