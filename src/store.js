import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 储存用户权限信息,初始为空
    roles: '',
    names: ''
  },
  mutations: {
    // 添加用户权限,如果存在,不添加
    addRoles (state, { roles }) {
      state.roles = roles
      // console.log(state.roles)
    },
    addNames (state, names) {
      state.names = names
      // console.log(state.names)
    }
    // 添加sessionStorage到roles
  },
  actions: {
    // commit给mutations,not used
    addRoles: ({ commit }, { roles }) => {
      commit('addRoles', { roles })
    }
  },
  getters: {
    // getters返回state.roles,not used
    getRoles: state => state.roles
  }
})
