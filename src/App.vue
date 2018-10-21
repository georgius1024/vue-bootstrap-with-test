<template>
  <v-app>
    <app-toolbar
      :title="config.APP_NAME"
      :profile="profile"
    />
    <app-view-port />
    <v-content>
      <v-btn @click="messageAction" v-html="'message'"/>
      <v-btn @click="errorAction" v-html="'error'"/>
      <v-btn @click="waitAction" v-html="'Wait'"/>
      <v-btn @click="loginAction" v-html="'Login'"/>
      <v-btn @click="logoutAction" v-html="'Logout'"/>
    </v-content>
    <app-footer :copyright="config.APP_COPYRIGHT" :application="config.APP_NAME" :version="config.APP_VERSION" />
    <app-message :message="message" :level="level" v-model="showMessage" />
    <app-spinner :active="spinner" :timeout="1000*3" @timeout="timedOut"/>
    <app-scroll-top :bottom="44" :right="4" :speed="20"/>
  </v-app>
</template>

<script>
import AppToolbar from '@/components/app/toolbar'
import AppFooter from '@/components/app/footer'
import AppMessage from '@/components/app/message'
import AppSpinner from '@/components/app/spinner'
import AppScrollTop from '@/components/app/scroll-top'
import AppViewPort from '@/components/app/view-port'
import { mapGetters, mapMutations } from 'vuex'

import config from '@/config'
import eventBus from '@/event-bus'

export default {
  name: 'App',
  data () {
    return {
      message: '',
      level: '',
      showMessage: false,
      spinner: false,
      config
    }
  },
  created () {
    eventBus.on(eventBus.events.restore, (user) => console.log('restore', user))
    eventBus.on(eventBus.events.login, (user) => console.log('login', user))
    eventBus.on(eventBus.events.logout, () => console.log('logout'))

    eventBus.on(eventBus.events.error, (error) => this.raiseError(error))
    eventBus.on(eventBus.events.message, (message) => this.raiseMessage(message))

    eventBus.on(eventBus.events.busy, () => this.startSpinner())
    eventBus.on(eventBus.events.idle, () => this.stopSpinner())
  },
  computed: {
    profile () {
      return this.isAuthenticated ? this.user : false
    },
    ...mapGetters({
      user: 'account/user',
      token: 'account/token',
      isAuthenticated: 'account/isAuthenticated'
    })
  },
  methods: {
    raiseMessage (message) {
      this.level = ''
      this.message = message
      this.showMessage = !!message
    },
    raiseError (error) {
      this.level = 'error'
      this.message = error
      this.showMessage = !!error
    },
    startSpinner () {
      this.spinner = true
    },
    stopSpinner () {
      this.spinner = false
    },
    timedOut () {
      this.spinner = false
      this.raiseError('Процесс завершился тайм-аутом')
    },
    messageAction () {
      eventBus.emit(eventBus.events.message, 'Сообщение пришло по шине')
    },
    errorAction () {
      eventBus.emit(eventBus.events.error, 'Сообщение об ошибке пришло по шине')
    },
    waitAction () {
      eventBus.emit(eventBus.events.busy)
    },

    loginAction () {
      const user = {
        fullName: 'Ефремов В.Г.'
      }
      const auth = {
        accessToken: 'a1122',
        refreshToken: 'r1122'
      }
      this.login({ user, auth })
    },
    logoutAction () {
      this.logout()
    },
    ...mapMutations({
      login: 'account/login',
      logout: 'account/logout'
    })
  },
  components: {
    AppToolbar,
    AppFooter,
    AppMessage,
    AppSpinner,
    AppScrollTop,
    AppViewPort
  }
}
</script>
