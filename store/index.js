import Vuex from 'vuex'
import Cookie from 'js-cookie'

var cookieparser = require('cookieparser')

const createStore = () => {
  return new Vuex.Store({
    state: {
      auth: null
    },
    mutations: {
      update (state, data) {
        state.auth = data
      },
      clearAuth() {
        Cookie.remove('auth');
        this.state.auth = null
      }
    },
    actions: {
      updateUser({commit}, data) {
        commit('update', data)
      },
      nuxtServerInit ({ commit }, { req }) {
        let accessToken = null
        if (req.headers.cookie) {
          var parsed = cookieparser.parse(req.headers.cookie)
          accessToken = JSON.parse(parsed.auth)
        }
        commit('update', accessToken)
      },
      logout({commit}) {
        commit('clearAuth')
      }
    }
  })
}

export default createStore