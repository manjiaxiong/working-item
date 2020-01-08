import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false//上面这行代码的意思 是阻止显示生产模式的消息。
Vue.prototype.url = 'http://192.168.0.103:8080'
Vue.prototype.userId = '4624e60ce956497184080e347f68cc4d'

// Vue.prototype.url = 'http://122.114.111.181:8081'//线上

App.mpType = 'app'

console.log	("App",App)
const app = new Vue({
    ...App
})
app.$mount()
