//引入Vue核心库
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//应用Vuex插件
Vue.use(Vuex)

//准备actions对象——响应组件中用户的动作
const actions = {}
//准备mutations对象——修改state中的数据
const mutations = {
    addShouCang(state, goods_id) {
        state.ShouCang.push(goods_id)
        localStorage.setItem('ShouCang', JSON.stringify(state.ShouCang))
    },
    deleteShouCang(state, goods_id) {
        state.ShouCang = state.ShouCang.filter(val => val !== goods_id)
        localStorage.setItem('ShouCang', JSON.stringify(state.ShouCang))
    },
    isShow(state) {
        state.bottomShow = true
    },
    isHide(state) {
        state.bottomShow = false
    }
}
//准备state对象——保存具体的数据
const state = {
    ShouCang: JSON.parse(localStorage.getItem('ShouCang')) ? JSON.parse(localStorage.getItem('ShouCang')) : [],
    bottomShow: true
}

//创建并暴露store
export default new Vuex.Store({
    actions,
    mutations,
    state
})
