//引入VueRouter
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


//引入路由组件
import Home from '../pages/Home'
import Category from '../pages/Category'
import Cart from '../pages/Cart'
import Profile from '../pages/Profile'
import GoodsList from '../pages/GoodsList'
import GoodDetail from '../pages/GoodDetail'
import GoodsSearch from '../pages/GoodsSearch'
import ShouCang from '../pages/ShouCang'
import Err from '../pages/Err'

export default new VueRouter({
    routes: [{
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/category',
        component: Category
    },
    {
        path: '/cart',
        component: Cart
    },
    {
        path: '/profile',
        component: Profile
    },
    {
        path: '/goodsList',
        component: GoodsList
    },
    {
        path: '/gooddetail',
        component: GoodDetail
    },
    {
        path: '/goodsSearch',
        component: GoodsSearch
    },
    {
        path: '/shouCang',
        component: ShouCang
    },
    {
        path: '/err',
        component: Err
    },
    ]
})