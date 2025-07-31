/**
 * api管理
 */
import request from './../utils/request'
export default {
    login(params) {
        //本身是个promise结构，所以要return
        return request({
            url: '/users/login',
            method: 'post',
            data: params,
            mock:true
        })
    },
    noticeCount(params) {
        return request({
            url: '/leave/count',
            method: 'get',
            data: {},
            mock: true
        })
    },
    getMenuList(params) {
        return request({
            url: '/menu/list',
            method: 'get',
            data: params,
            mock: true
        })
    },
    getUserList(params) {
        return request({
            url: '/users/list',
            method: 'get',
            data: params
        })
    },
    userDel(params) {
        return request({
            url: '/users/delete',
            method: 'post',
            data: params
        })
    },
    getRoleList() {
        return request({
            url: '/roles/allList',
            method: 'get',
            data: {},
            mock: true
        })
    },
    //获取部门
    getDeptList() {
        return request({
            url: '/dept/list',
            method: 'get',
            data: {},
            mock: true
        })
    },
    //    部门创建、编辑、删除
    deptOperate(params){
        return  request({
            url:'/dept/operate',
            method: 'post',
            data: params,
            mock: true
        })
    },
    userSubmit(params) {
        return request({
            url: '/users/operate',
            method: 'post',
            data: params,
            mock: true
        })
    },
    menuSubmit(params) {
        return request({
            url: '/menu/operate',
            method: 'post',
            data: params,
            mock: true
        })
    },
    getAllUserList(){
        return request({
            url:'/user/all/list',
            methods:'get',
            data:{},
            mock: true
        })
    },


}
