module.exports = {
    environment: 'debug',     //debug or online
    ravenUrl: '',  // vue代码错误邮箱推送 online模式下才有效
    // perPage: [15,50,100,200],  // 分页增加条数筛选 
    // base: '/p/',  // 二级域名配置
    api: {
        url: 'http://10.8.8.25:9531', // 本地域名（线上模式换成接口）
        backend_url: 'http://10.1.1.11:8001',   // 接口（线上模式不需要）
        websocket: ''
    }
}
