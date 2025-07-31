import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css';
import request from './utils/request'
import storage from './utils/storage'
import api from './api'
import store from './store'

console.log("环境变量=>",import.meta.env)
const app = createApp(App);
//定义全局指令 第一个参数是名称， 第二个是指令相关的钩子（生命周期） el是dom的元素对象,按钮对象，
// :add是指令的参数  参数argument:'add' , 值value:'user-create'
//v-has:add='变量值'
app.directive('has',{
    beforeMount:(el,binding,)=>{
        //获取按钮权限 userAction其实就是actionList
        let userAction =storage.getItem('actionList')
        let value = binding.value
        //判断列表中，是否有对应的按钮权限标识。 如果没有user-create，就没有新增权限
            let hasPermisson = userAction.includes(value)
        //没有权限，就隐藏掉。 如果有，不管你
        if(!hasPermisson){
            el.style = "display:none"
            //beforeMount节点dom还没渲染，删除是无法删除的。添加个宏任务放到堆栈里，队列里下次会删除
            setTimeout(()=>{
                el.parentNode.removeChild(el)
            },0)

        }
    }
})

app.directive('has',{
    beforeMount:(el,binding)=>{
        //获取按钮权限列表
    let userAction = storage.getItem('actionList')
    let value = binding.value
        //盘点列表中是否有对应按钮权限标识
        let hasPermission = userAction.include(value)
        if(!hasPermission){
            el.style = "display:none";
            //隐藏掉后，再把它干掉.  domAPI有哪些，appendChild,removeChild,insert
            el.parentNode.removeChild(el)
        }
}
})

app.config.globalProperties.$request = request;
app.config.globalProperties.$api = api;
app.config.globalProperties.$storage = storage;
app.use(router).use(store).use(ElementPlus,{size:'small'}).mount('#app')
