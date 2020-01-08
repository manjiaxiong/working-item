// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import echarts from 'echarts'



// import OSS from "ali-oss"



import store from './store/index'


Vue.use(ElementUI)
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;

//全局守卫
router.beforeEach((to, from, next) => {

  let a = window.sessionStorage.getItem("id");
  console.log(to);
  if (to.name == "login" || a) {//如果路由为login或者登录成功
     next();
  } else {
    next({//重定向
      path: "/login"
    });
  }


}
);
new Vue({
  el: '#app',
  router,
  store,
  // OSS,
  components: { App },
  template: '<App/>',
  methods: {

  }
})
