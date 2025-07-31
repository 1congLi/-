/**
 * Vuex状态管理
 */
import { createStore } from 'vuex'
import mutations from './mutations'
import storage from './../utils/storage'
//持久存储功能
const state = {
    userInfo: {} || storage.getItem("userInfo"), // 获取用户信息。给个{}退出时不报错
    menuList:storage.getItem('menuList') || [],
    actionList:storage.getItem('actionList') || []
}
export default createStore({
    state,
    mutations
})
