import Api from '@/api'
import axios from 'axios'
const testApi = 'https://reqres.in/api' // https://reqres.in/
const token = 'QpwL5tke4Pnpja7X'
const message = 'Ololololololo'

describe('Api client', () => {

  Api.setBaseUrl(testApi)
  it('Can GET list', async () => {
    const response = await Api.get('users')
    expect(response.data).toHaveLength(3)
  })

  it('Can GET single', async () => {
    const response = await Api.get('users/2')
    expect(response.data.id).toBe(2)
  })

  it('Can GET error', async () => {
    let errors = 0
    try {
      await Api.get('users/200')
    } catch (error) {
      errors++
      expect(error.response.status).toBe(404)
    }
    expect(Api.status).toBe(404)
    expect(Api.message).toBe('Request failed with status code 404')
    expect(errors).toBe(1)
  })

  it('Can POST data', async () => {
    const response = await Api.post('users', {
      'name': 'morpheus',
      'job': 'leader'
    })
    expect(Api.status).toBe(201)
    expect(response.name).toBe('morpheus')
    expect(response.job).toBe('leader')
    expect(response.createdAt).toBeTruthy()
  })

  it('Can PUT data', async () => {
    const response = await Api.put('users', {
      'name': 'morpheus',
      'job': 'zion resident'
    })
    expect(Api.status).toBe(200)
    expect(response.name).toBe('morpheus')
    expect(response.job).toBe('zion resident')
    expect(response.updatedAt).toBeTruthy()
  })

  it('Can DELETE data', async () => {
    await Api.delete('users/2')
    expect(Api.status).toBe(204)
  })

  it('Can set token', async () => {
    Api.setToken(token)
    expect(axios.defaults.headers.common['Authorization']).toBe('Bearer ' + token)
  })

  it('Can clear token', async () => {
    Api.clearToken()
    expect(axios.defaults.headers.common['Authorization']).toBeFalsy()
  })

  it('can subscribe and unsubscribe event listener with key', () => {
    Api.subscribe('error', jest.fn(), 'key1')
    Api.subscribe('error', jest.fn(), 'key2')
    expect(Api.subscriptions.error).toHaveLength(2)
    expect(Api.unsubscribe('error', 'key1')).toBe(true)
    expect(Api.subscriptions.error).toHaveLength(1)
    expect(Api.unsubscribe('error', 'key2')).toBe(true)
    expect(Api.subscriptions.error).toBeFalsy()
    expect(Api.unsubscribe('error')).toBe(false)

  })

  it('can subscribe and unsubscribe event listener without key', () => {
    Api.subscribe('error', jest.fn())
    Api.subscribe('error', jest.fn())
    expect(Api.subscriptions.error).toHaveLength(2)
    Api.unsubscribe('error')
    expect(Api.subscriptions.error).toBeFalsy()
  })

  it('can subscribe and unsubscribe event listener within ON function', () => {
    Api.on('error', jest.fn())
    Api.on('error', jest.fn())
    expect(Api.subscriptions.error).toHaveLength(2)
    Api.on('error', false)
    expect(Api.subscriptions.error).toBeFalsy()
  })

  it('can subscribe and catch event', () => {
    let onErrorCalled = 0
    let error  = {}
    Api.on('error', error => {
      onErrorCalled++
      error.message = message
    })
    expect(Api.subscriptions.error).toHaveLength(1)
    Api.emit('error', error)
    expect(onErrorCalled).toBe(1)
    expect(error.message).toBe(message)
    Api.on('error', false)
    expect(Api.subscriptions.error).toBeFalsy()
  })

  it('Can GET error message from server', async () => {
    let onErrorCalled = 0
    Api.on('errorCatch', error => {
      onErrorCalled++
      error.response.status = -404
      error.response.data = {
        message
      }
    })
    expect(Api.subscriptions.errorCatch).toBeTruthy()
    let errors = 0
    try {
      await Api.get('users/200')
    } catch (error) {
      errors++
      error.response.status = -404
    }
    expect(errors).toBe(1)
    expect(onErrorCalled).toBe(1)
    expect(Api.status).toBe(-404)
    expect(Api.message).toBe(message)
    Api.on('errorCatch', false)
    expect(Api.subscriptions.errorCatch).toBeFalsy()
  })

  it('Can GET message from server', async () => {
    Api.on('complete', response => {
      response.data.message = message
    })
    let onMessageCalled = 0
    Api.on('message', newMessage => {
      onMessageCalled++
      expect(newMessage).toBe(message)
    })
    expect(Api.subscriptions.message).toBeTruthy()
    await Api.get('users')
    expect(onMessageCalled).toBe(1)
    expect(Api.message).toBe(message)
    Api.on('complete', false)
    Api.on('message', false)
  })

  it('Can GET auth from server', async () => {
    expect(axios.defaults.headers.common['Authorization']).toBeFalsy()

    Api.on('complete', response => {
      response.data.auth = { token }
    })
    let onAuthCalled = 0
    Api.on('auth', data => {
      onAuthCalled++
      expect(data.auth.token).toBe(token)
    })
    expect(Api.subscriptions.auth).toBeTruthy()
    await Api.get('users')
    expect(onAuthCalled).toBe(1)

    expect(axios.defaults.headers.common['Authorization']).toBe('Bearer ' + token)

    Api.on('complete', false)
    Api.on('auth', false)
  })

})
