/**
 * Mutations业务层数据提交
 */
import storage from './../utils/storage'

export default {
    saveUserInfo(state,userInfo){
        //state是当前的状态， state.userInfo保存一下。
        // 通过storage方法存储一下，每次保存都把数据重新存储一下，页面一刷新就取到了state = {
        //    userInfo: "" || storage.getItem("userInfo") 的值了，持久存储的功能
        state.userInfo = userInfo;
        storage.setItem('userInfo',userInfo)
    },
    saveMenu(state,menuList){
        //state是当前的状态， state.userInfo保存一下。
        // 通过storage方法存储一下，每次保存都把数据重新存储一下，页面一刷新就取到了state = {
        //    userInfo: "" || storage.getItem("userInfo") 的值了，持久存储的功能
        state.menuList = menuList;
        storage.setItem('menuList',menuList)
    },
    saveAction(state,actionList){
        //state是当前的状态， state.userInfo保存一下。
        // 通过storage方法存储一下，每次保存都把数据重新存储一下，页面一刷新就取到了state = {
        //    userInfo: "" || storage.getItem("userInfo") 的值了，持久存储的功能
        state.actionList = actionList;
        storage.setItem('actionList',actionList)
    },
}
