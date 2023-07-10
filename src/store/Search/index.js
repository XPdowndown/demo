//准备actions——用于响应组件中的动作,一般在此处写业务逻辑，如果完全没有业务逻辑的话，可以跳过此步
const actions = {
    async getSearchList({ commit }, params = {}) {
        let result = await reqSearchList(params)
        if (result.code == 200) {
            commit('GETSEARCHLIST', result.data)
        }
    }

}
// 用于操纵数据
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }


}
// 相当于计算属性
const getters = {
    attrsList(state) {
        return state.searchList.attrsList
    },
    goodsList(state) {
        return state.searchList.goodsList
    },
    trademarkList(state) {
        return state.searchList.trademarkList
    }

}
// 数据存储的核心，相当于data
const state = {
    searchList: {}

}
import { reqSearchList } from "@/api"
export default {
    actions, mutations, state, getters,
}