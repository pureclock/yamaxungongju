<template>
  <div i="uploader">
    <div class="prelook-wrapper clearfix pb10">
      <img @click="img_url=''" src="~/images/shanchu.png" alt />
      <div class="prelook-inner" v-show="img_url">
        <span class="circle-box" @click="img_url = ''">
          <i class="circle"></i>
        </span>
        <a rel="group" class="fancybox prelook-block">
          <img :src="img_url" />
        </a>
      </div>
      <div class="form-groups" v-show="!img_url">
        <div class="col-10">
          <div class="upload-wrapper" id="container">
            <div id="pickfiles"></div>
            <div class="progress text-center" id="progress"></div>
            <i class="fa fa-plus f16"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Upload from '@hanzi-package/upload';

export default {
    data() {
        return {
            img_url: ''
        };
    },
    methods: {
        clickPhoto() {
            let that = this;
            var uploads = Upload({
                container: 'container', //容器ID
                browse_button: 'pickfiles', //按钮ID
                progress: 'progress', //进度条ID
                type: 'event_img', //请求接口时的传参，upload_type:"headpic"
                setting: 'local', //local：本地，cloud：云
                chunk_size: '200kb', //分段传输的大小
                group: ['img'], //上传格式组
                custom: 'txt,zip', //自定上传义格式
                url: '/api/uploads',
                callback: function(res) {
                    that.img_url = res.data.url;
                    // that.$store.commit('setScratchCard', res.data.url);
                },
                PostInit: function(uploader) {
                    if (app.isAndroid()) {
                        document
                            .querySelector('.moxie-shim')
                            .children[0].setAttribute('accept', 'image/*');
                    }
                }
            });
        }
    },
    mounted() {
        this.clickPhoto();
    }
};
</script>
<style rel="stylesheet/scss" lang="scss">
@import "~sass/common/tool";
.prelook-wrapper > img {
  width: r(36px);
  position: absolute;
  top: r(18px);
  left: r(180px);
  transform: translate(50%, -50%);
  z-index: 9999;
}

[i="uploader"] {
  .prelook-wrapper {
    padding-top: r(16px);
    padding-right: r(10px);
    //border-bottom: 1px dotted #ddd;
    position: relative;

    .moxie-shim {
      width: 100% !important;
      height: 100% !important;
    }
  }
  .prelook-wrapper .upload-wrapper {
    float: left;
    position: relative;
    width: r(216px);
    height: r(312px);
    text-align: center;
    line-height: 120px;
    border: 1px solid #ddd;
    // margin-bottom: 20px;
    cursor: pointer;
    overflow: hidden;
  }
  .prelook-wrapper .upload-wrapper i {
    line-height: 120px;
  }
  .prelook-wrapper .prelook-inner .circle-box {
    position: absolute;
    right: -10px;
    top: -10px;
    cursor: pointer;
    z-index: 1;
  }
  .prelook-wrapper .prelook-inner .circle {
    @include round_close(22px);
  }
  .prelook-wrapper .upload-wrapper .file-button {
    font-size: 200px;
    opacity: 0;
    position: absolute;
    left: 0;
    top: 0;
    width: 120px;
    height: 120px;
    cursor: pointer;
    z-index: 9;
  }
  .prelook-inner {
    float: left;
    width: 120px;
    height: 160px;
    margin-right: 20px;
    margin-bottom: 10px;
    position: relative;
  }
  .prelook-inner i.fa-times-circle {
    font-size: 20px;
    position: absolute;
    top: -10px;
    right: -10px;
    z-index: 999;
    cursor: pointer;
  }
  .prelook-block {
    display: block;
    width: r(216px);
    height: r(312px);
    overflow: hidden;
    position: relative;
  }
  .prelook-block img {
    width: 100%;
  }
  .prelook-inner .prelook-radio {
    display: block;
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding-left: 10px;
  }
  .prelook-inner .prelook-radio .radio {
    @include radio_core(#5fb878, 16px); //#5FB878,#1e9fff
  }
  .moxie-shim {
    // display: none;
  }
  .progress {
    position: absolute;
    top: 0;
    background-color: #5cb85c;
    color: #000;
    font-size: 12px;
    line-height: 20px;

    background-image: -webkit-linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.15) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.15) 50%,
      rgba(255, 255, 255, 0.15) 75%,
      transparent 75%,
      transparent
    );
    background-image: -o-linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.15) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.15) 50%,
      rgba(255, 255, 255, 0.15) 75%,
      transparent 75%,
      transparent
    );
    background-image: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.15) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.15) 50%,
      rgba(255, 255, 255, 0.15) 75%,
      transparent 75%,
      transparent
    );
    -webkit-background-size: 40px 40px;
    background-size: 40px 40px;

    -webkit-animation: progress-bar-stripes 2s linear infinite;
    -o-animation: progress-bar-stripes 2s linear infinite;
    animation: progress-bar-stripes 2s linear infinite;
  }
}
</style>
