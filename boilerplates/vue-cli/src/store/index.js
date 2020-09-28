import Vue from 'vue'
import Vuex from 'vuex'
import {state, getters, mutations} from './store'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  getters,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
