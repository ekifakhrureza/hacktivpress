import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
const instance = axios.create({
  baseURL: 'http://localhost:3000',
  // headers: { 'token': localStorage.getItem('token') }
})
export default new Vuex.Store({
  state: {
    article: '',
    checkToken: localStorage.getItem('token'),
    checkTokenName: localStorage.getItem('name'),
    checkTokenEmail: localStorage.getItem('email')
  },
  getters: {
    getArticle: state => {
      return state.article
    },
    getToken: state => {
      return state.checkToken
    },
    getTokenName: state => {
      return state.checkTokenName
    },
    getTokenEmail: state => {
      return state.checkTokenEmail
    }
  },
  mutations: {
    setArticle (state, payload) {
      state.article = payload
    },
    setToken (state, payload) {
      state.checkToken = payload
    },
    setTokenName (state, payload) {
      state.checkTokenName = payload
    },
    setTokenEmail (state, payload) {
      state.checkTokenEmail = payload
    }
  },
  actions: {
    getAllArticle({ commit }) {
      axios
        .get(`http://localhost:3000/articles`, {})
        .then(response => {
          commit('setArticle', response.data.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getDetailArticle({ commit }, payload) {
      axios
        .get(`http://localhost:3000/articles/${payload}`, {})
        .then(response => {
          commit('setArticle', response.data.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addArticle(context, payload) {
      instance
        .post('/articles/add', {
          title: payload.title,
          content: payload.content,
          category: payload.category
        },{
          headers: { 'token': localStorage.getItem('token') }
        })
        .then(response => {
          context.dispatch('getAllArticle')
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateArticle(context, payload) {
      instance
        .put(`/articles/update/${payload.id}`, {
          title: payload.title,
          content: payload.content
        })
        .then(response => {
          context.dispatch('getDetailArticle', payload.id)
        })
        .catch(err => {
          console.log(err)
        })
    },
    removeArticle(context, payload) {
      console.log(payload.id)
      instance
        .delete(`/articles/delete/${payload.id}`, {})
        .then(response => {
          context.dispatch('getAllArticle')
        }).catch(err => {
          console.log(err)
        })
    }
  }
})
