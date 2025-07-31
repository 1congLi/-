/**
 * 环境配置封装
 */
const env = import.meta.env.MODE || 'prod';
const EnvConfig = {
    dev:{
        baseApi:'/api',
        mockApi:'https://mock.mengxuegu.com/mock/67d42d0657433c0850b11800/api'
    },
    test:{
        baseApi:'//test.futurefe.com/api',
        mockApi:'https://mock.mengxuegu.com/mock/67d42d0657433c0850b11800/api'
    },
    prod:{
        baseApi:'//futurefe.com/api',
        mockApi:''
    }
}
export default {
    env,
    mock:true,
    namespace:'manager',
    ...EnvConfig[env]
}
