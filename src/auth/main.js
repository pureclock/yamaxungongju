import isUrl from './nologin.js';
// import store from '../store';
import {
	MessageBox
} from 'mint-ui';
// import {
// 	Promise
// } from 'core-js/library/web/timers';

const auth = {
	is_auth: null, //是否需要授权
	authType: null, //授权类型
	authUrl: null, //授权地址
	userStatusUrl: null, //用户状态获取地址
	/**
	 * 权限验证
	 */
	check(to, from, fun, is_auth, authType, authUrl, userStatusUrl) {
		this.is_auth = is_auth || false;
		this.authType = authType || 'mp';
		this.authUrl = authUrl || '/api/wechat/authorities';
		this.userStatusUrl = userStatusUrl || '/api/status';

		let that = this;
		let authorization = tools.cache.get('Authorization');

		if (authorization) {//判断token是否过时了，如果过时需要重新获取
			let expires_time = tools.cache.get('expires_time');
			let nowTime = new Date() / 1000;
			if (nowTime >= expires_time) {//当前的时间超过或等于token的时间
				tools.cache.del('Authorization');
				tools.cache.del('expires_time');
			}
		}

		if (!authorization) { //没有就获取，只取一次，永久保存		
			this.getSign(function () {
				if (!that.is_auth) { //首次不需要授权
					//获取新token进入初始化
					tools.cache.del('locationJump');
					that.goUrl(to, from, fun, {
						is_auth: 0,
						is_user: 0
					});
				} else { //需要首次授权
					//先判断用户状态
					that.getUserStatus(to, from, fun);
				}
			});
		} else { //已经有token后直接请求登陆状态			
			//如果登陆状态已经存在，判断是否刷新页面
			if (tools.cache.get('locationJump')) {
				tools.cache.del('locationJump');
				that.getUserStatus(to, from, fun);
			} else { //页面不同，直接跳转					
				that.goUrl(to, from, fun, JSON.parse(tools.cache.get('userStatus')));
			}
		}
	},

	//首次授权方式
	goAuth() {
		// 授权后返回的地址
		let callbackUrl = location.href;

		// 授权地址和所带参数
		let url = window.config.api.url + this.authUrl +
			'?callback=' + (escape(callbackUrl)) +
			'&token=' + tools.cache.get('Authorization') +
			'&type=' + this.authType;

		if (!tools.isEmpty(tools.url.params('usertest'))) {
			url += '&usertest=' + tools.url.params('usertest');
		}

		window.location.href = url;
	},

	//跳转页面方式
	goUrl(to, from, fun, userStatus) {
		tools.cache.set('userStatus', JSON.stringify(userStatus));

		//原生app跳转
		if (app.isAppVersion() == 'android' || app.isAppVersion() == 'ios') {
			this.appGo(to, from, fun, userStatus);
			return;
		}

		//以下是H5网页的跳转方式

		//如果要授权，需要判断一下
		if (this.is_auth) {
			if (userStatus.is_auth == 0) { //没有授权
				this.goAuth(userStatus);
				return;
			} else if (userStatus.is_auth > 1) { //授权有错误，跳转错误页面		
				if (to.path.indexOf('/wechat_auth_error') > -1) { //如果当前就是授权错误页面就直接查看了
					fun(userStatus);
					return;
				}

				tools.router.replace({ //这是跳转错误页面
					path: '/wechat_auth_error',
					query: {}
				});
				return;
			}
		}

		//已经登陆了，但返回还是登陆页面的话直接跳目标地址		
		if (to.path.indexOf('/login') > -1 && userStatus.is_user == 1) {
			//			var callback = tools.url.params('callback');
			var callback = window.location.search;
			callback = callback.replace('?callback=', '');
			tools.router.replace({
				path: callback,
				query: {}
			});
			return;
		}

		if (isUrl(to.path) !== -1 || userStatus.is_user == 1) { //不用登陆的页面直接跳转			
			fun(userStatus);
		} else { //需要登录的页面	

			if (from.path == '/') { //判断是不是location.href跳转的，如果是就回退两次
				tools.router.replace({
					path: '/login',
					query: {
						callback: to.fullPath
					}
				});
				return;
			}
			tools.router.push({
				path: '/login',
				query: {
					callback: to.fullPath
				}
			});
		}
	},
	//原生app签名
	appAutho: function (version, fun) {
		tools.cache.set('app_version', version);
		//获取Android传递过来参数

		if (app.isAppVersion() == 'ios') { //ios的签名回调
			window.getToken = function (token) {
				window.localStorage.setItem('Authorization', token);
				fun();
			}
			window.webkit.messageHandlers.tokenOver.postMessage('');

		} else { //安卓的签名回调
			window.localStorage.setItem('Authorization', window.android.getToken());
			fun();
		}

	},
	//原生app登陆状态
	appUserStatus: function (to, from, fun) {
		let that = this;
		//登陆成功回调
		window.updateUserOrderStatus = function (is_user, order_status) {
			if (is_user == 1) {
				tools.cache.set('userStatus', JSON.stringify({
					is_user: is_user
				}));

				that.appAutho(tools.cache.get('app_version'), function () {
					that.appGo(to, from, fun, {
						is_user: is_user
					})
				});
			} else { //如果登陆不成功回退
				tools.route.back();
			}
		}

		//触发登陆
		if (app.isAppVersion() == 'android') {
			window.android.userLoginOrOrderPay(0, '', '');
			return;
		}
		//ios触发登陆
		window.webkit.messageHandlers.userLoginOrOrderPay.postMessage({
			"is_user": '0'
		});

	},
	//原生app跳转，如果登陆了直接进入
	appGo: function (to, from, fun, userStatus) {
		if (isUrl(to.path) !== -1 || userStatus.is_user == 1) { //不用登陆的页面直接跳转
			if (to.path.indexOf('/personal/index') > -1) { //如果是个人中心就交接给原生

				if (app.isAppVersion() == 'ios') {
					window.webkit.messageHandlers.showUserCenter.postMessage('');
				} else {
					window.android.showUserCenter();
				}
			} else {
				fun(userStatus);
			}
		} else { //需要登录
			this.appUserStatus(to, from, fun);
		}
	},
	/* 获取签名 */
	getSign(fun) {
		let that = this;
		//获取地址栏传进来的平台
		let version = tools.url.params('version');
		if (version) { //是原生app传进来的参数			
			this.appAutho(version, fun);
			return;
		}

		//H5网页的签名
		tools.alert.loading();
		tools.ajax({
			url: '/api/init',
			headers: {
				'X-ISSIGN': 1
			},
			successFun: function (res) {
				tools.cache.set('Authorization', res.token);
				tools.cache.set('expires_time', res.expires_time);
				tools.cache.set('is_sign', res.is_sign);
				tools.cache.set('sk', res.sk);

				tools.alert.closeLoading();
				fun();
			},
			errorFun: function (error) {
				log.error('获取签名失败');
			},
			type: 'GET'
		});
	},

	/* 获取登录状态 */
	getUserStatus: function (to, from, fun) {
		let that = this;
		//H5网页的登陆状态
		tools.alert.loading();
		tools.ajax({
			url: that.userStatusUrl,
			successFun: function (res) {
				tools.alert.closeLoading();
				that.goUrl(to, from, fun, res.data);
			},
			errorFun: function (error) {
				log.debug('获取登录状态失败, 请查看接口');
				let error_msg = '服务器异常,尝试刷新';
				if (error && error.error_msg) {
					error_msg = error.error_msg;
				}
				MessageBox.alert(error_msg).then(action => {
					window.location.reload();
				});
			},
			type: 'GET'
		});
	}
}

export default auth