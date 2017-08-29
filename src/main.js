// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import vInview from 'vueinview'

import App from './App'
import router from './router'
import store from './store'
import 'normalize.css/normalize.css'
import 'swiper/dist/css/swiper.css'
import './assets/style.scss'

Vue.config.productionTip = false

window.axios = axios

function getCookie (cname) {
  var name = cname + '='
  var ca = document.cookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1)
    if (c.indexOf(name) !== -1) return c.substring(name.length, c.length)
  }
  return ''
}

axios.interceptors.request.use(
  config => {
    config.headers['Session-Token'] = getCookie('Session-Token')

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    switch (response.data.code) {
      case 200:
        return response.data.results
      default:
        return Promise.reject(response.data)
    }
  },
  error => {
    console.log('错误', error)
    return Promise.reject(error)
  }
)

Vue.use(vInview)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
