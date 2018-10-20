import mockAxios from '../mocks/axios.mock'
import Api from '@/api'
import config from '@/config'
Api.http = mockAxios

'use strict'

const accessToken = 'a123'

describe('Api client', () => {
  it('Can set Base Url', () => {
    Api.setBaseUrl(config.API_URL)
    expect(Api.http.defaults.baseURL).toBe(config.API_URL)
  })

  it('Can set accessToken', () => {
    Api.setAccessToken(accessToken)
    expect(Api.http.defaults.headers.common['Authorization']).toBe('Bearer ' + accessToken)
  })

  it('Can clear token', () => {
    Api.clearAccessToken()
    expect(Api.http.defaults.headers.common['Authorization']).toBeFalsy()
  })

  it('Can GET', async () => {
    const returnData = {
      data: 'PNH',
      status: 'success',
      message: '123'
    }
    mockAxios.intercept = (request) => {
      return {
        status: 200,
        data: returnData
      }
    }
    const x = await Api.get('about')
    expect(x).toBeTruthy()
    expect(x).toBe(returnData)
    expect(Api.message).toBe(returnData.message)
    expect(Api.status).toBe(200)
  })
})
