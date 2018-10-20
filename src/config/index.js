let production = {
  APP_ID: 'bbt-web',
  APP_NAME: 'Большие Банковские Тесты',
  APP_VERSION: '5.0.0.0 pre',
  APP_COPYRIGHT: '© 1999, 2018 Агентство ВЭП',
  API_URL: '/api/'
}

let development = Object.assign({}, production, {
  API_URL: 'http://localhost:3800/'
})

let test = Object.assign({}, development)

let config = {
  development,
  test,
  production
}

let env = process.env.NODE_ENV || 'development'
export default config[env]
