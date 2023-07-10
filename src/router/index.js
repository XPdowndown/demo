import Vue from "vue";
import VueRouter from "vue-router";
import routes from './routes'
import store from '@/store/index'
Vue.use(VueRouter);
//把人家原型对象的push方法进行保存
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//VueRouter.prototype原型对象添加一个方法
//location:路由跳转相关的信息
VueRouter.prototype.push = function (location, resolve, reject) {
    //当前函数this：即为VueRouter类的实例
    //相当于push方法里面this，是windows【完犊子了】
    //利用人家push方法实现路由跳转，保证push里面this,应该vueRouter类的实例

    //面试:函数apply与call区别?
    //相同的地方:都可以篡改函数里面this
    //不同的地方:apply传递参数 数组  call传递参数 逗号分割

    if (resolve && reject) {
        //代表真:代表着两个形参接受参数【箭头函数】
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => { }, () => { });
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, resolve, reject)
    } else {
        originReplace.call(this, () => { }, () => { });
    }
}

let router = new VueRouter({
    routes,
    //设置滚动条的位置
    scrollBehavior() {
        //滚动行为这个函数,需要有返回值,返回值为一个对象。
        //经常可以设置滚动条x|y位置 [x|y数值的设置一般最小是零]
        return { y: 0 };
    }
})
export default router;
router.beforeEach(async (to, from, next) => {
    //to:去的那个路由的信息
    //from:从那个路由而来的信息
    //next:放行函数!!!!!! 
    //第一种：next(),放行函数，放行到它想去的路由！！！
    //第二种:next(path),守卫指定放行到那个路由去?
    //用户是否登录:取决于仓库里面是否有token！！！
    //每一次路由跳转之前需要用有用户信息在跳转,没有发请求获取用户信息在跳转！！！！
    // next();
    let token = store.state.user.token;
    let nickName = store.state.user.nickName;
    // token不为空的话，就说明目前处于登录状态
    if (token) {
        // 处于登录状态，跳转登录或注册页面
        if (to.path == '/login' || to.path == '/register') {
            next('/home')
            // 处于登录状态，但不跳转登录或注册页面
        } else {
            // 处于登录状态，但不跳转登录页面,这时就要判断用户信息是否存在
            if (nickName) {
                // 存在，就直接放行
                next()
                // 可若是不存在，那就要派发action再次或许用户信息
            } else {
                try {
                    // 获取用户信息成功后
                    await store.dispatch('userInfo');
                    // 再放行
                    next()
                    // token失效了，获取不到用户信息，这时候就需要清除已有的token，重新登录，跳转到登录页面
                } catch (error) {
                    // 清除成功
                    await store.dispatch('userLogOut');
                    next('/login');
                }
            }

        }
        // 未登录情况
    } else {
        //用户未登录||目前的判断都是放行.将来这里会'回手掏'增加一些判断
        //用户未登录:不能进入/trade、/pay、/paysuccess、/center、/center/myorder  /center/teamorder
        let toPath = to.path;
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1 || toPath.indexOf('/user') != -1 || toPath.indexOf('/addcartsuccess') != -1) {
            alert('请先登录')
            // this.$message('请先登录')
            next('/login?redict=' + toPath);
        } else {
            next();
        }


    }
})


