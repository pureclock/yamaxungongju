/* 配置错误处理 */

/*
 例子:
 {
     errcode: 'NO LOGIN',                         //错误代码
     prompt: '你还没有登录或登录超时,请登录...',      //错误提示,空字符为不提示
     url: '/login'                               //跳转地址,true为刷新当前页,空字符串为不跳转
     fun: function () {                          //操作方法,空字符串为无

     }
 }
 */

let is_init = true;
let array = [], num = 0;

export default {
    data: [{
        errcode: 'AUTHORIZATION_INVALID',
        prompt: '',
        url: '',
        fun: function(res) {
            array.push(res.option);

            if (is_init) {
                tools.cache.del('Authorization');
                tools.cache.del('expires_time');
                getToken(array);
            }

            is_init = false;

            function getToken(array) {
                tools.ajax({
                    url: '/api/init',
                    headers: {
                        'X-ISSIGN': 1
                    },
                    isLoading: true,
                    successFun: function(res) {
                        tools.cache.set('Authorization', res.token);
                        tools.cache.set('expires_time', res.expires_time);
                        tools.cache.set('is_sign', res.is_sign);
                        tools.cache.set('sk', res.sk);
                        next(array);
                    },
                    errorFun: function(error) {
                        log.error('获取签名失败');
                    },
                    type: 'GET'
                });
            };

            function next(dataArr) {
                for (let i = 0; i < dataArr.length; i++) {
                    num++;
                    tools.ajax(dataArr[i]);
                }
                if (num === dataArr.length) {
                    is_init = true;
                    array = [];
                    num = 0;
                }
            }
        }
    }, {
        errcode: 'NO LOGIN',
        prompt: '你还没有登录或登录超时,请登录...',
        url: '',
        fun: function() {
            window.updateUserOrderStatus = function(is_user, order_status) {
                window.location.reload();
            };

            //触发登陆
            if (app.isAppVersion() == 'android') {
                window.android.userLoginOrOrderPay(0, '', '');
                return;
            }

            if (app.isAppVersion() == 'ios') {
                //ios触发登陆
                window.webkit.messageHandlers.userLoginOrOrderPay.postMessage({
                    'is_user': '0'
                });
            }

            tools.router.push({
                path: '/login',
                query: {
                    callback: location.href.replace(location.origin, '')
                }
            });
        }
    }]

};
