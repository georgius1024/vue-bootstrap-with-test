/**
 * Created by georgius on 20.10.18.
 */
'use strict'

const mockAxios = function (request) {
  return new Promise((resolve, reject) => {
    mockAxios.intercept(request)
      .then(response => {
        response.status = response.status || 200
        return resolve(response)
      })
      .catch(error => {
        request.headers = request.headers || {}
        error.config = request
        return reject(error)
      })
  })
}
mockAxios.intercept = function () {
  return Promise.resolve({
    status: 200,
    data: {
      message: 'OK'
    }
  })
}

mockAxios.defaults = {
  baseUrl: '',
  headers: {
    common: []
  }
}
export default mockAxios
