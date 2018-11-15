import mockAxios from '../mocks/axios.mock'
import Api from '@/api'
import config from '@/config'
import eventBus from  '@/event-bus'
Api.http = mockAxios

'use strict'

const tokens = {
  oldAccessToken: '100',
  oldRefreshToken: '100',
  newAccessToken: 'new-access-token',
  newRefeshToken: 'new-refresh-token'
}

const securedEndPoint = (request) => {
  if (request.url === 'bad-request') {
    return Promise.reject({
      response: {
        status: 404,
        data: {
          message: 'Not found'
        }
      }
    })
  }
  if (request.url === 'impossible') {
    return Promise.reject({
      response: {
        status: 401,
        data: {
          message: 'Shall not pass!!!'
        }
      }
    })
  }
  if (request.url === Api.refreshEndPoint && request.method === 'post') { // Запрос на обновление
    if (request.data.token === tokens.oldRefreshToken) { // Пришла правильная refreshToken
      // Возвращаем новые токены
      return Promise.resolve({
        status: 200,
        data: {
          auth: {
            accessToken: tokens.newAccessToken,
            refreshToken: tokens.newRefeshToken
          }
        }
      })
    } else {
      // Возвращаем 401
      return Promise.reject({
        response: {
          status: 401,
          data: {
            message: 'Невозможно обновить токен, перелогиньтесь, пожалуйста'
          }
        }
      })
    }

  } else {
    if (Api.http.defaults.headers.common['Authorization'] === 'Bearer ' + tokens.newAccessToken) {
      // Запрос пришел с правильным токеном
      return Promise.resolve({
        status: 200,
        data: {
          message: 'OK'
        }
      })
    } else {
      // Неправильный токен
      return Promise.reject({
        response: {
          status: 401,
          data: {
            message: 'Authentication Error'
          }
        }
      })
    }
  }
}

describe('Api client', () => {

  it('Can set Base Url', () => {
    Api.setBaseUrl(config.API_URL)
    expect(Api.http.defaults.baseURL).toBe(config.API_URL)
  })

  it('Can set accessToken', () => {
    Api.setAccessToken(tokens.oldAccessToken)
    expect(Api.http.defaults.headers.common['Authorization']).toBe('Bearer ' + tokens.oldAccessToken)
  })

  it('Can set refreshToken', () => {
    Api.setRefreshToken(tokens.oldRefreshToken)
    expect(Api.refreshToken).toBe(tokens.oldRefreshToken)
  })

  it('Can set setRefreshEndpoint', () => {
    const old = Api.refreshEndPoint
    Api.setRefreshEndpoint('-')
    expect(Api.refreshEndPoint).toBe('-')
    Api.setRefreshEndpoint(old)
  })

  it('Can clear token', () => {
    Api.clearAccessToken()
    expect(Api.http.defaults.headers.common['Authorization']).toBeFalsy()
  })

  it('Can send request with various methods and recieve response', async () => {
    const methods = ['get', 'post', 'put', 'delete']
    const returnData = {
      data: 'Some data',
      status: 'success',
      message: '123'
    }
    mockAxios.intercept = () => {
      return Promise.resolve({
        status: 200,
        data: returnData
      })
    }
    await Promise.all(methods.map(async (method) => {
      const x = await Api[method]('about')
      expect(x).toBeTruthy()
      expect(x).toBe(returnData)
      expect(Api.message).toBe(returnData.message)
      expect(Api.status).toBe(200)
    }))
  })
  it('Can emit message event', async () => {
    const messageCallback = jest.fn()
    eventBus.on(eventBus.events.message, messageCallback)

    const message = 'Api-Message'
    mockAxios.intercept = () => {
      return Promise.resolve({
        status: 200,
        data: {
          message
        }
      })
    }
    await Api.get('about')
    expect(messageCallback).toBeCalled()
    expect(messageCallback).toBeCalledWith(message)
    eventBus.off(eventBus.events.message, messageCallback)
  })

  it('Can hande network error', async () => {
    const errorCallback = jest.fn()
    eventBus.on(eventBus.events.error, errorCallback)
    mockAxios.intercept = () => {
      return Promise.reject({
        code: 'ECONNREFUSED'
      })
    }
    try {
      await Api.get('about')
    } catch (error) {
      expect(error.code).toBe('ECONNREFUSED')
    }
    expect(Api.message).toBe('Пропала связь с сервером')
    expect(Api.status).toBe('')
    expect(Api.error.code).toBe('ECONNREFUSED')
    expect(errorCallback).toBeCalled()
    expect(errorCallback).toBeCalledWith(Api.message)
    eventBus.off(eventBus.events.error, errorCallback)
  })

  it('Can hande server error', async () => {
    const errorCallback = jest.fn()
    eventBus.on(eventBus.events.error, errorCallback)
    const message = 'Api-error'
    mockAxios.intercept = () => {
      return Promise.reject({
        response: {
          status: 500,
          data: {
            status: 'error',
            message
          }
        }
      })
    }
    try {
      await Api.get('about')
    } catch (error) {
      expect(error.response).toBeTruthy()
    }
    expect(Api.message).toBe(message)
    expect(Api.status).toBe(500)
    expect(errorCallback).toBeCalled()
    expect(errorCallback).toBeCalledWith(Api.message)
    eventBus.off(eventBus.events.error, errorCallback)
  })

  it('Can get access with valid access token', async () => {

    Api.setAccessToken(tokens.newAccessToken)
    mockAxios.intercept = securedEndPoint
    await Api.get('about')
    expect(Api.message).toBe('OK')
    expect(Api.status).toBe(200)
  })

  it('Can not get access without valid access token', async () => {
    const logoutCallback = jest.fn()
    eventBus.on(eventBus.events.logout, logoutCallback)

    Api.setAccessToken(tokens.oldAccessToken)
    Api.clearRefreshToken() // Не используктся refreshToken
    mockAxios.intercept = securedEndPoint
    try {
      await Api.get('about')
    } catch (error) {
      expect(error.response).toBeTruthy()
    }
    expect(Api.message).toBe('Authentication Error')
    expect(Api.status).toBe(401)
    expect(logoutCallback).toBeCalled()
    eventBus.off(eventBus.events.logout, logoutCallback)
  })

  it('Can restore access with valid refresh token', async () => {
    try {
      Api.setAccessToken(tokens.oldAccessToken)
      Api.setRefreshToken(tokens.oldRefreshToken)
      await Api.get('about')
      expect(Api.message).toBe('OK')
      expect(Api.status).toBe(200)
      expect(Api.accessToken).toBe(tokens.newAccessToken)
      expect(Api.refreshToken).toBe(tokens.newRefeshToken)
    } catch (error) {
      console.error(error)
    }
  })

  it('Can not restore access with invalid refresh token', async () => {
    Api.setAccessToken(tokens.oldAccessToken)
    Api.setRefreshToken('Wrong token')

    expect(Api.accessToken).toBe(tokens.oldAccessToken)
    expect( Api.http.defaults.headers.common['Authorization']).toBe('Bearer ' + Api.accessToken)

    try {
      await Api.get('about')
    } catch (error) {
      expect(error.response).toBeTruthy()
      expect(error.response.status).toBe(401)
    }
    expect(Api.message).toBe('Невозможно обновить токен, перелогиньтесь, пожалуйста')
    expect(Api.status).toBe(401)
  })

  it('Can handle 404 error', async () => {
    try {
      await Api.get('bad-request')
    } catch (error) {
      expect(error.response).toBeTruthy()
      expect(error.response.status).toBe(404)
    }
    expect(Api.message).toBe('Not found')
    expect(Api.status).toBe(404)
  })

  it('If restore fails, it can return last error', async () => {
    Api.setAccessToken(tokens.oldAccessToken)
    Api.setRefreshToken(tokens.oldRefreshToken)

    expect(Api.accessToken).toBe(tokens.oldAccessToken)
    expect( Api.http.defaults.headers.common['Authorization']).toBe('Bearer ' + Api.accessToken)

    try {
      await Api.get('impossible')
    } catch (error) {
      expect(error.response).toBeTruthy()
      expect(error.response.status).toBe(401)
    }
    expect(Api.message).toBe('Shall not pass!!!')
    expect(Api.status).toBe(401)
  })
  it('Listen credentials event', async () => {
    Api.clearAccessToken()
    Api.clearRefreshToken()

    const user = {
      fullName: 'Ефремов В.Г.'
    }
    const auth = {
      accessToken: tokens.oldAccessToken,
      refreshToken: tokens.oldRefreshToken
    }

    eventBus.emit(eventBus.events.credentials, auth)
    expect(Api.accessToken).toBe(tokens.oldAccessToken)
    expect(Api.refreshToken).toBe(tokens.oldRefreshToken)
  })

  it('Listen logout event', async () => {
    Api.setAccessToken(tokens.oldAccessToken)
    Api.setRefreshToken(tokens.oldRefreshToken)

    eventBus.emit(eventBus.events.logout)
    expect(Api.accessToken).toBe('')
    expect(Api.refreshToken).toBe('')
  })



})
