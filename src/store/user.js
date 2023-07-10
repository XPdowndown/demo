import { reqGetCode, reqRegister, reqUserLogin, reqUserInfo, reqUserLogout } from "@/api";
const actions = {
    // 获取验证码
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone)
        if (result.code == 200) {
            commit('GETCODE', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 注册业务
    async userRegister({ commit }, user) {
        let result = await reqRegister(user)
        if (result.code == 200) {
            return '0k'
        } else {
            return Promise.reject(new Error('faile'))
        }

    },
    //登录业务
    async userLogin({ commit }, user) {
        let result = await reqUserLogin(user);
        // 服务器下发token，是用户唯一标识符，相当于游客登录时使用的UUID
        // 将来经常通过带token找服务器要用户信息进行展示
        if (result.code == 200) {
            commit('USERLOGIN', result.data.token)
            localStorage.setItem('token', result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('falie'))
        }
    },
    // 获取用户信息
    async userInfo({ commit }) {
        let result = await reqUserInfo()

        if (result.code == 200) {

            commit('USERINFO', result.data)
            console.log(result.data);
            return 'ok'

        } else {
            return Promise(new Error('faile'))
        }
    },
    // 退出登录业务
    async userLogOut({ commit }) {
        let result = await reqUserLogout();
        if (result.code == 200) {
            commit('CLEAR')
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'));
        }
    }


};
const mutations = {
    GETCODE(state, code) {
        state.code = code;
    },
    USERLOGIN(state, token) {
        state.token = token;
    },
    USERINFO(state, userInfo) {
        state.nickName = userInfo.nickName;
        state.userInfo = userInfo;
    },
    CLEAR(state) {
        state.token = '';
        state.nickName = '';
        localStorage.removeItem('token');
    }

}
const state = {
    code: '',
    token: localStorage.getItem('token'),
    nickName: '',
    userInfo: ''
}
const getters = {}

export default {
    actions, mutations, state, getters
}