import axios from 'axios'

let config = {}
config.loginHost = 'http://feedback.sogou-inc.com'
config.downloadHost = 'http://feedback.sogou-inc.com'

let recordInterConfig = []
// 请求结束后清理数组
// 添加请求拦截器
axios.interceptors.request.use((config)=>{
    // 在发送请求之前做些什么
    console.log(config, 'config')
    try {
        config.responseTime = new Date().getTime()
        config._rnd = Math.random()
        recordInterConfig.push(config)
    } catch (e) {
        //
    }
    return config
},(error)=>{
    // 对请求错误做些什么
    return Promise.reject(error);
})
// 添加 响应拦截器
axios.interceptors.response.use((response)=>{
    // 对响应数据做点什么
    // 与服务器开发 约定 ：正常返回时， status = 200 不等于200，需要提示，但还需要 正常返回
    console.log(response, 'response')
    if(response.status === 200){
        let resUrlIndex = null
        resUrlIndex = recordInterConfig.findIndex(ele => {
            return ele.url === response.config.url && ele._rnd === response.config._rnd
        })
        // 状态码code 不为200时
        if (response.data && response.data.code !== 200) {
            $.post(
                '/pingback/addData',
                {
                    url: recordInterConfig[resUrlIndex].url,
                    code: response.data.code,
                    responseTime: new Date().getTime() - recordInterConfig[resUrlIndex].responseTime,
                    msg: response.data.msg && response.data.msg.substr(0, 500)
                }
            )
        }
        try {
            recordInterConfig.splice(resUrlIndex, 1)
        } catch (e) {
            //
        }
        return response.data;
    }
    if (response.status == 302) {
        // console.log('hello')
        let targetUrl = window.location.href;
        window.location.href = 'http://venus.sogou-inc.com/public/sso/#/?returnUrl='+config.loginHost+'/public/parseUser&targetUrl=' + targetUrl;
        return
    }
    Notification.error({
        title: '网关状态提示',
        message: `返回状态码应该是200,而本次返回状态码是${response.status}`,
    });
    return response.data;
},(error)=>{
    // 对响应错误做点什么
    console.log(error, 'error')
    if(error.response && error.response.status && error.response.status=== 302){
        let targetUrl = window.location.href;
        window.location.href = 'http://venus.sogou-inc.com/public/sso/#/?returnUrl='+config.loginHost+'/public/parseUser&targetUrl=' + targetUrl;
        return
    }
    else{
        let resUrlIndex = null
        resUrlIndex = recordInterConfig.findIndex(ele => {
            return ele.url === error.response.config.url && ele._rnd === error.response.config._rnd
        })
        $.post(
            '/pingback/addData',
            {
                url: recordInterConfig[resUrlIndex].url,
                code: error.response.data.status,
                responseTime: new Date().getTime() - recordInterConfig[resUrlIndex].responseTime,
                msg: error.response.data.message && error.response.data.message.substr(0, 500)
            }
        )
        try {
            recordInterConfig.splice(resUrlIndex, 1)
        } catch (e) {
            //
        }
        return Promise.reject(error);
    }
})
export default axios
