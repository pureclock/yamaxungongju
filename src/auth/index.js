import LoginTest from './main.js';

export default function (to, from, next) {
	next();
	//执行流程如下：（适合场景：普通端、企业端、嵌套原生app中。可首次进入就授权，请根据配置文件来处理即可）
	//获取签名token->获取用户状态->判断是否需要授权就跳转
	//1、要授权：跳转授权->如果授权错误->错误页面（Wechat_auth_error.vue），如果授权正确->判断是否需要登陆->正常页面
	//2、不要授权：判断是否需要登陆->正常页面
	// LoginTest.check(to, from, function (ret) {
	// 	// ret 用户授权及登录状态。
	// 	// console.log(ret)
	// 	next();
	// }, true);
	// true，首次进入是否要授权，可不填，默认false。
	//'qiyemp'，授权type类型，可不填，默认'mp'。不同客户端使用
	//'/api/employee/wechat/auth' 授权地址，可不填，默认'/api/wechat/authorities'.
	//'/api/employee/status' 用户状态判断地址，可不填。默认是'/api/status'.
}