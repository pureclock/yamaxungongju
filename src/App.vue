<template>
    <div id="app" :i="i" :style="`min-height: ${height}px`">
        <router-view></router-view>
    </div>
</template>

<script>
import './mixin';
export default {
    data() {
        return {
            i: this.iFun(),
            height: 554
        };
    },
    name: 'app',
    watch: {
        // 如果路由有变化，会再次执行该方法
        '$route': 'isLinkChange'
    },
    created() {

    },
    methods: {
        isLinkChange: function() {
            let that = this;
            // console.log('改变了导航:',this.$route);

            that.i = that.iFun();
            that.height = document.documentElement.clientHeight;

            that.isPath();
        },

        isPath() {
            //不存在自动跳转到404页面
            if (this.$route.matched.length < 1) {
                tools.router.replace('/404');
                return false;
            }
        },

        iFun() {
            let i = this.$route.path.replace(/\//g,'_');
            if (i.indexOf('_') === 0) {
                i = i.replace('_', '');
            }
            return i === '' ? 'index' : i
        },

        initWechat () {
            let that = this;

            tools.router.afterEach((to, from, next) => {
                setTimeout(() => {
                    let desc = '这是描述', 
                        title = '这是标题', 
                        img = `${location.origin}${config.base ? config.base.substr(0, config.base.lastIndexOf('\/')) : ''}` + that.$store.state.app.logo,
                        url = `${location.origin}${config.base ? config.base : '/'}`;
              
                    if(app.isWeChat() && that.$store.state.app.is_wxjs){
                        that.wxShare({
                            title: title,
                            url: url,
                            desc: desc,
                            img: img,
                            ajax_data: {
                                url: app.device().ios ? tools.cache.get('initUrl') : location.href
                            }
                        })
                    }
                },500);
            })
        }
    },
    mounted(){
        let that = this;
        // that.initWechat()
    }
}
</script>

<style>

</style>
