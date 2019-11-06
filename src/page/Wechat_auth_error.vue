<template>
	<div i='wechat_auth_error'>
		<div class="error-text" v-if="userStatus.is_wechat_auth==2">无权限进入！</div>
		<div class="error-text" v-if="userStatus.is_wechat_auth==3">您已冻结</div>
		<div class="error-text" v-if="userStatus.is_wechat_auth==4">权限错误</div>
	</div>
</template>
<style rel="stylesheet/scss" lang="scss">
	[i='wechat_auth_error'] .error-text{
		padding-top: 3rem;
		width: 100%;
		text-align: center;
		font-size: 0.5rem;
	}
</style>
<script>
	export default {
		data() {
				return {
					userStatus: {}
				}
			},
			methods: {

			},
			watch: {

			},
			components: {

			},
			filters: {

			},
			mounted() {
				this.userStatus = JSON.parse(tools.cache.get('userStatus'));
			}
	}
</script>