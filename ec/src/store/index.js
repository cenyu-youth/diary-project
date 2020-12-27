import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name:'EC',
    email:'1904845564@qq.com',
    address:'中国广州',
    phone:14736370241,
    author:'chan'
  },
  mutations: {
    changePhone(state,obj){

      console.info(obj)

      state[obj.obj] = obj.val
    }
  },
  actions: {
  },
  modules: {
  }
})
