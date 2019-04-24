import 'vx-easyui/dist/themes/default/easyui.css';
import 'vx-easyui/dist/themes/icon.css';
import 'vx-easyui/dist/themes/vue.css';
import Vue from 'vue'
import App from './app.vue'
import EasyUI from 'vx-easyui';
import locale from 'vx-easyui/dist/locale/easyui-lang-zh_TW'
Vue.use(EasyUI, {
    locale: locale
});

const root = document.createElement('div')
document.body.appendChild(root)

//把Vue的Root插入到
new Vue({
    //接收h參數，通過h參數，將我們的App掛到Html上面
    render:(h) => h(App)
}).$mount(root)
