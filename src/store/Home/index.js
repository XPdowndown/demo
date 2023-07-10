import { reqCategory, reqBannerList, reqFloorList, reqGoodsInfo, reqLikeList, reqDaliyHotList } from '@/api'
//准备actions——用于响应组件中的动作,一般在此处写业务逻辑，如果完全没有业务逻辑的话，可以跳过此步
const actions = {
    async categoryList({ commit }) {
        let result = await reqCategory()
        if (result.code == 200) {
            commit('CATEGORYLIST', result.data)

        }
    },
    async getBannerList({ commit }) {
        let result = await reqBannerList()
        // console.log(result);

        if (result.code == 200) {
            commit('GETBANNERLIST', result.data)
        }

    },
    async getFloorList({ commit }) {
        let result = await reqFloorList()
        if (result.code == 200) {
            commit('GETFLOORLIST', result.data)
        }
    },
    async getGoodsInfo({ commit }) {
        let res = await reqGoodsInfo()

        commit('GETGOODSINFO', res);
    },
    async getLikesList({ commit }) {
        let res = await reqLikeList()
        if (res.code == 200) {

            commit('GETLIKELIST', res.data);
        }
    },
    async getDaliyHotList({ commit }) {
        let res = await reqDaliyHotList()
        if (res.code == 200) {
            console.log(res);
            commit('GETDALIYHOTLIST', res.data)
        }

    }

}
// 用于操纵数据
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList
    },
    GETGOODSINFO(state, goodsInfo) {
        state.goodsInfo = goodsInfo;
    },
    GETLIKELIST(state, likesInfo) {
        state.likesInfo = likesInfo;
    },
    GETDALIYHOTLIST(state, daliyHotInfo) {
        state.daliyHotInfo = daliyHotInfo;
    }

}
// 相当于计算属性
const getters = {

}
// 数据存储的核心，相当于data
const state = {
    categoryList: [],
    bannerList: [],
    floorList: [],
    goodsInfo: [],
    likesInfo: [],
    daliyHotInfo: [],


}
export default {
    // namespaced: true,
    actions, mutations, state, getters,
}