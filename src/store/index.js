//该文件用于创建Vuex中最为核心的store
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
import Home from './Home'
import Search from './Search'
import Detail from './detail'
import ShopCart from './shopcart'
import user from './user'
import trade from './trade'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        Home,
        Search,
        Detail,
        ShopCart,
        user,
        trade
    }

})