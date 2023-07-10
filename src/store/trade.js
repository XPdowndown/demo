import { reqAddressInfo, reqShopInfo } from "@/api";
const actions = {
    // 获取地址信息
    async getAddressInfo({ commit }) {
        let result = await reqAddressInfo();

        if (result.code == 200) {
            commit('GETADDRESSINFO', result.data)
        }
    },
    // 获取商品清单数据
    async getShopInfo({ commit }) {
        let result = await reqShopInfo();

        if (result.code == 200) {
            commit('GETSHOPINFO', result.data)
        }
    },
};
const mutations = {
    GETADDRESSINFO(state, address) {
        state.address = address;
    },
    GETSHOPINFO(state, orderInfo) {
        state.orderInfo = orderInfo;
    }
};
const state = {
    address: [],
    orderInfo: {},
};
const getters = {};
export default {
    actions, mutations, state, getters
}