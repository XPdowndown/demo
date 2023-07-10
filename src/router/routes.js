//路由配置信息
// import Home from '../pages/Home/index.vue'
// import Register from '../pages/Register/index.vue'
// import Login from '../pages/Login/index.vue'
// import Search from '../pages/search/index.vue'
// import Detail from '@/pages/Detail'
// import AddCartSuccess from '@/pages/AddCartSuccess'
// import ShopCart from '@/pages/ShopCart'
// import Trade from '@/pages/Trade'
// import Pay from "@/pages/Pay"
// import PaySuccess from '@/pages/PaySuccess'
// import Center from '@/pages/Center'
// import MyOrder from '@/pages/Center/MyOrder'
// import GroupOrder from '@/pages/Center/GroupOrder'
/* 当打包构建应用时，JavaScript包会变得非常大，影响页面加载。
如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了 */

export default [
    {
        path: '/center',
        name: 'Center',
        component: () => import('@/pages/Center'),
        meta: { show: true },
        children: [
            { path: 'myorder', component: () => import('@/pages/Center/MyOrder') },
            { path: 'grouporder', component: () => import('@/pages/Center/GroupOrder') },
            { path: '/center', redirect: '/center/myorder' }
        ]
    },
    {
        path: '/paysuccess',
        name: 'PaySuccess',
        component: () => import('@/pages/PaySuccess'),
        meta: { show: true }
    },
    {
        path: '/pay',
        name: 'Pay',
        component: () => import('@/pages/Pay'),
        meta: { show: true }
    },
    {
        path: '/trade',
        name: 'Trade',
        component: () => import('@/pages/Trade'),
        meta: { show: true }
    },
    {
        path: '/shopcart',
        name: 'shopcart',
        component: () => import('@/pages/ShopCart'),
        meta: { show: true }
    },
    {
        path: '/addcartsuccess',
        name: 'addcartsuccess',
        component: () => import('@/pages/AddCartSuccess'),
        meta: { show: true }
    },
    {
        path: '/home',
        component: () => import('@/pages/Home'),
        meta: { show: true },
    },
    {
        path: '/detail/:skuId?',
        component: () => import('@/pages/Detail'),
        meta: { show: true },
    },
    {
        path: '/register',
        component: () => import('@/pages/Register'),
        meta: { show: false },
    },
    {
        path: '/login',
        component: () => import('@/pages/Login'),
        meta: { show: false },
    },
    {
        path: '/user',
        component: () => import('@/pages/User/User.vue'),
        meta: { show: false },
    },
    {
        path: '/announce',
        component: () => import('@/pages/User/Anonounce.vue'),
        meta: { show: false },
    },
    {
        path: '/search/:keyword?',
        component: () => import('@/pages/search'),
        meta: { show: true },
        name: 'search'
    },
    {
        path: '*',
        redirect: '/home'
    }
]