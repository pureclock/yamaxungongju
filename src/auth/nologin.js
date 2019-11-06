const list = [//无需登录的页面
	'/login',
	'/index',
	'/',
	'/wechat_auth_error'
];

const isNoLoginUrl = function(url) {
    return list.indexOf(url);
};
export default isNoLoginUrl