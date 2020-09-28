import * as types from './mutation-types'

export const state = {
  root: false
}

export const getters = {
  root: state.root
}

export const mutations = {
  [types.ROOT_RECEIVE] () {
    state.root = true
  }
}
