import { reqDetailList, reqAddOrUpdateCart } from '@/api'
import { getUUID } from '@/utils/uuid_token'
const actions = {
    async getGoodsinfo({ commit }, skuId) {
        let result = await reqDetailList(skuId)
        if (result.code == 200) {
            commit('GETGOODSINFO', result.data)
        }
    },
    async AddOrUpdateCart({ commit }, { skuId, skuNum }) {
        let result = await reqAddOrUpdateCart(skuId, skuNum)
        if (result.code == 200) {
            return 'ok'

        } else {
            Promise.reject(new Error('faile'))
        }
    }
}
const mutations = {
    GETGOODSINFO(state, goodinfo) {
        state.goodinfo = goodinfo
    }
}
const state = {
    goodinfo: {},
    uuid_token: getUUID()
}
const getters = {
    categoryView(state) {
        return state.goodinfo.categoryView || {}
    },
    skuInfo(state) {
        return state.goodinfo.skuInfo || {}
    },
    spuSaleAttrList(state) {
        return state.goodinfo.spuSaleAttrList || []
    }
}
export default {
    actions, mutations, state, getters
}