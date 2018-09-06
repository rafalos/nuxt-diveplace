import Vuex from 'vuex'
import axios from 'axios'

const createStore = () => {
  return new Vuex.Store({
    state: {
      authUser: null
    },
    mutations: {
      SET_USER (state, data) {
        state.authUser = data
      }
    },
    actions: {
      UpdateUserData({commit}, data){
        commit('SET_USER', data)
      },
      Logout({commit}) {
        axios.post('/api/logout')
        .then((response) => {
          commit('SET_USER', null)
          Router.push('/diveplaces');
        })
      },
      Authenticate({commit}, data) {
        commit('SET_USER', data)
      },
      nuxtServerInit ({ commit }, { req }) {
        if (req.session && req.session.authUser) {
          commit('SET_USER', req.session.authUser.user)
        }
      }
    },
    getters: {
      userData(state){
        return state.authUser
      }
    }
  })
}

export default createStore