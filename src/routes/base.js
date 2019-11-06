//基本路由
export default {
    // 'demo/demo': resolve => require(['../page/demo/demo.vue'], resolve),
    // 'index': resolve => require(['../page/Index.vue'], resolve),
    'event/:id': resolve => require(['../page/Index.vue'], resolve),
    'wechat_auth_error': resolve => require(['../page/Wechat_auth_error.vue'], resolve)

    //首页
    // '/': resolve => require(['../page/Index.vue'], resolve)
};
