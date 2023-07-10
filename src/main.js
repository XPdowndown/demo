//引入Vue
import Vue from 'vue'
//引入App
import App from './App.vue'
//引入路由器
import VueRouter from 'vue-router'
import router from './router/index'
// 引入vuex
import store from './store'
// 注册全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/pagination'
//引入mockServe文件,让咱们模拟接口跑起来
import '@/mock/mockServe'
import "swiper/css/swiper.min.css";
import * as API from '@/api'
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);
// 完整引入
import ElementUI from 'element-ui';
//引入ElementUI全部样式
import 'element-ui/lib/theme-chalk/index.css';
// import { Button, Row, Col, MessageBox, Message, Input } from 'element-ui';
// 图片懒加载
import VueLazyLoad from 'vue-lazyload';
import atm from '@/assets/1.gif';
import '@/plugins/validate'
// import * as moment from 'moment'
// Vue.prototype.$moment = moment
//关闭Vue的生产提示
Vue.config.productionTip = false
//element-ui大多数组件，注册为全局组件Vue.component|Vue.use
// Vue.use(Button);
// Vue.use(Row);
// Vue.use(Col);
// Vue.use(Input);
Vue.use(VueLazyLoad, {
	// 懒加载默认的图片
	loading: atm
});
//按需引入写法不同的:MessageBox、Message、Loading、Notification
// Vue.prototype.$msgbox = MessageBox;
//消息提示框
// Vue.prototype.$alert = MessageBox.alert;

// Vue.prototype.$message = Message;
Vue.use(ElementUI);

// 使用路由插件
Vue.use(VueRouter)

//创建vm
const vm = new Vue({
	el: '#app',
	render: h => h(App),
	router: router,
	store,
	beforeCreate() {
		//配置全局事件总线
		Vue.prototype.$bus = this;

		//通过Vue.prototype原型对象,将全部请求函数挂载到原型对象身上[VC:就可以使用请求函数]
		Vue.prototype.$api = API;

	},
})
