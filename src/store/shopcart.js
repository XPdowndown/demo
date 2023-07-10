

const actions = {
    async getCartList({ commit }) {
        let result = await reqShopCart();
        if (result.code == 200) {
            commit('GETCARTLIST', result.data)
        }
    },
    async deleteCartList({ commit }, skuId) {
        let result = await reqDeleteCart(skuId)
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    async changeChecked({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateChecked(skuId, isChecked)
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'))
        }
    }

}
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList;
    }

}

const getters = {
    cartInfo(state) {
        return state.cartList[0] || {}
        // return state.cartList[0]
    }
}
const state = {
    cartList: []

}
import { reqShopCart, reqDeleteCart, reqUpdateChecked } from '@/api'
export default {
    actions, mutations, state, getters
}