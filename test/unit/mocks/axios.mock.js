/**
 * Created by georgius on 20.10.18.
 */

const mockAxios = function (request) {
  const response = mockAxios.intercept(request)
  response.status = response.status || 200
  if (response.status >= 400) {
    return Promise.reject(response)
  } else {
    return Promise.resolve(response)
  }
}
mockAxios.intercept = function (request) {
  return {
    status: 200
  }
}

mockAxios.defaults = {
  baseUrl: '',
  headers: {
    common: []
  }
}
export default mockAxios
