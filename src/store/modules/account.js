import config from '@/config'
import eventBus from '@/event-bus'

import { getStored, putStored, deleteAll } from '@/lib/local-storage'

const stored = (key, defVal) => {
  return getStored(config.APP_ID + '-' + key, defVal)
}

const store = (key, value) => {
  return putStored(config.APP_ID + '-' + key, value)
}

const state = {
  user: stored('user', {}),
  accessToken: stored('access-token'),
  refreshToken: stored('refresh-token')
}

const getters = {
  user: state => state.user,
  accessToken: state => state.accessToken,
  refreshToken: state => state.refreshToken,
  isAuthenticated: state => Boolean(state.refreshToken)
}

const mutations = {
  setUser: (state, user) => {
    state.user = user
    store('user', state.user)
  },
  setAccessToken: (state, accessToken) => {
    state.accessToken = accessToken
    store('access-token', state.accessToken)
  },
  setRefreshToken: (state, refreshToken) => {
    state.refreshToken = refreshToken
    store('refresh-token', state.refreshToken)
  },
  login: (state, {user, auth}) => {
    state.user = user
    const { accessToken, refreshToken } = auth
    state.accessToken = accessToken
    state.refreshToken = refreshToken
    store('user', state.user)
    store('access-token', state.accessToken)
    store('refresh-token', state.refreshToken)
    eventBus.emit(eventBus.events.login, state.user)
    eventBus.emit(eventBus.events.credentials, auth)
  },
  logout: state => {
    state.user = {}
    state.accessToken = ''
    state.refreshToken = ''
    deleteAll()
    eventBus.emit(eventBus.events.logout)
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations
}
