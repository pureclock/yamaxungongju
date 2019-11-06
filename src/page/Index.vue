<template>
  <div class="index">
    <!-- 活动结束图 -->
    <div class="over" v-if="obj.is_bracket==0||Date.now()>obj.end_time" v-cloak>
      <a :href="end_url">
        <div
          :style="'background-image: url('+obj.closeimg+');background-size: 100% 100%;background-size: 100% 100%;height: 22rem;'"
        ></div>
      </a>
    </div>
    <!-- <div v-else v-cloak :class="{'fix': isShowDialog}"> -->
      <div v-else v-cloak>
      <img class="topimg" :src="obj.topimg" alt />
      <div class="contentimg">
        <img :src="obj.contentimg" alt />
        <div class="contentimg_text">
          <div class="STEP1">STEP 1</div>
          <div class="STEP1_content">
            <div class="STEP1_content_two">
              <div
                @click.stop="questionMark"
                class="question_mark"
                v-if="img_url1==''&&img_url2==''"
              ></div>
              <img
                @click="add"
                class="STEP1_content_first"
                src="~images/Artboard 2.png"
                alt
                v-if="img_url1==''&&img_url2==''"
              />

              <div v-if="!(img_url1==''&&img_url2=='')">
                <img v-if="img_url1!=''" @click="add" :src="img_url1" alt />
                <img @click="add" class="plusSign" v-else src="~images/jiahaotianchong.png" alt />
                <img v-if="img_url2!=''" class="imgUrl2" @click="add" :src="img_url2" alt />
                <img @click="add" class="plusSign" v-else src="~images/jiahaotianchong.png" alt />
              </div>
            </div>
            <div class="STEP1_content_two">
              <div
                @click.stop="questionMarkCamera"
                class="question_mark"
                v-if="img_url3==''&&img_url==''"
              ></div>
              <img
                @click="photograph"
                class="STEP1_content_last"
                src="~images/Artboard 2 Copy.png"
                alt
                v-if="img_url3==''&&img_url==''"
              />
              <div v-if="!(img_url3==''&&img_url=='')">
                <img @click="photograph" v-if="img_url3!=''" class="imgUrl2" :src="img_url3" alt />
                <img @click="photograph" class="plusSign" v-else src="~images/jiahaotianchong.png" alt />
                <img @click="photograph" v-if="img_url!=''" class="imgUrl2" :src="img_url" alt />
                <img @click="photograph" class="plusSign" v-else src="~images/jiahaotianchong.png" alt />
              </div>
            </div>
          </div>

          <!-- 用户填写信息 -->
          <div class="STEP2">STEP 2</div>
          <div class="STEP2_content">
            <div>
              <input
                class="mt_input"
                type="text"
                placeholder="Your Name"
                v-model="name"
                @blur="yourNameShow"
              />
              <div>
                <span v-show="yourName">Please fill in your name</span>
              </div>
              <input
                class="mt_input"
                type="text"
                placeholder="Your Facebook Email address"
                v-model="facebook"
                @blur="yourFacebookShow"
              />
              <div>
                <span v-show="yourFacebook">Please enter the correct email address</span>
              </div>
              <input
                class="mt_input"
                type="text"
                placeholder="Amazon Order No.(123-1234567-1234567)"
                v-model="amazon"
                @blur="yourAmazonShow"
              />
              <div>
                <span v-show="yourAmazon">Please enter the correct order number</span>
              </div>
            </div>
            <button
              :style="'background-color:'+obj.btn_bg_color+';color:'+obj.btn_text_color"
              @click="gather"
            >GET MY AWARD</button>
            <a :href="obj.service_url">
              <button
                class="service"
                :style="'background-color:'+obj.btn_bg_color+';color:'+obj.btn_text_color"
              >CONTACT US</button>
            </a>
            <span>*We don't share your personal info with anyone.</span>
          </div>
        </div>
      </div>
      <div class="close">
        <div>
          <!-- <div>*How do I find my order ID?</div>
        <div>Check in your Amazon Account Order History,in your email or in the</div>
          <div>receipt you received with your product.</div>-->
        </div>
        <img class="closeimg" :src="obj.footimg" alt />
      </div>
    </div>

    <!-- 五星好评页 -->
    <a :href="end_url">
      <div
        class="over"
        v-if="goodReputation"
        :style="'background-image: url('+obj.thanksimg+');background-size: 100% 100%;background-size: 100% 100%;'"
      ></div>
    </a>

    <!-- 登录授权 -->
    <!-- <div v-show="!(obj.is_bracket==0||Date.now()>obj.end_time)&&loginShow"> -->
      <div v-if="false">
      <div class="mask-layer"></div>
      <div class="login">
        <div class="login_header">
          <img src="~images/login.png" alt />
        </div>
        <div class="login_button">
          <!-- <div @click="login_facebook"> -->
          <div>
            <img class="loginImg" src="~images/Facebook.png" alt />
            Sign up with Facebook
          </div>
          <div @click="noThankShow">No THANKS</div>
        </div>
      </div>
    </div>

    <!-- facebook弹框 -->
    <!-- <div v-show="facebookShow">
      <div class="mask-layer"></div>
      <div class="login">
        <img @click="facebookShow=false" src="~images/delete.png" alt />
        <div class="facebook_header">facebook</div>
        <div class="facebook_content">
          <input type="text" placeholder="Email" v-model="facebookEmail" />
          <input type="text" placeholder="Password" v-model="facebookPassword" />
        </div>
        <div class="facebook_btn">
          <button @click="logIn">Log In</button>
        </div>
      </div>
    </!-->

    <!-- 相册遮罩层 -->
    <div class="add" v-show="addShow">
      <img class="return2" @click="addShow=false" src="~images/delete2.png" alt />
      <div class="white_box"></div>
      <div class="add_mask_layer"></div>
      <div class="add_text">
        <div>Please upload your</div>
        <div>five-star reviews of our</div>
        <div class="products_on">products on Amazon.com</div>
        <div class="add_one" v-show="add_one">
          <div class="add_one_tip">
            <div>
              <img src="~images/20190822172721.png" alt />
            </div>
            <div>
              <img src="~images/20190822172729.png" alt />
            </div>
          </div>
          <div class="RE_UP">
            <!-- <button class="btn" @click="addShow=false">RETURN</button> -->
            <button class="btn" @click="add_one_cut">UPLOAD</button>
          </div>
        </div>
        <div class="add_two" v-show="add_two">
          <div class="add_two_tip">
            <div>
              <div i="uploader">
                <div class="prelook-wrapper clearfix pb10">
                  <img @click="deleteUrl1" src="~/images/shanchu.png" alt />
                  <div class="prelook-inner" v-show="img_url1">
                    <!-- <span class="circle-box" @click="deleteUrl1">
                      <i class="circle"></i>
                    </span>-->
                    <a rel="group" class="fancybox prelook-block">
                      <img :src="img_url1" />
                    </a>
                  </div>
                  <div class="form-groups" v-show="!img_url1">
                    <img class="uploadPlus" src="~images/jiahaotianchong.png" alt />
                    <div class="col-10">
                      <div class="upload-wrapper" id="container1">
                        <!-- <div class="cont1" ></div> -->
                        <div id="pickfiles1"></div>
                        <div class="progress text-center" id="progress1"></div>
                        <i class="fa fa-plus f16"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div i="uploader">
                <div class="prelook-wrapper clearfix pb10">
                  <img @click="deleteUrl2" src="~/images/shanchu.png" alt />
                  <div class="prelook-inner" v-show="img_url2">
                    <!-- <span class="circle-box" @click="deleteUrl2">
                      <i class="circle"></i>
                    </span>-->
                    <a rel="group" class="fancybox prelook-block">
                      <img :src="img_url2" />
                    </a>
                  </div>
                  <div class="form-groups" v-show="!img_url2">
                    <img class="uploadPlus" src="~images/jiahaotianchong.png" alt />
                    <div class="col-10">
                      <div class="upload-wrapper" id="container2">
                        <div id="pickfiles2"></div>
                        <div class="progress text-center" id="progress2"></div>
                        <i class="fa fa-plus f16"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="up_fs">
            <!-- <button class="btn" @click="addShow=false">RETURN</button> -->
            <button class="btn" @click="addFinish">FINISH</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 拍照遮罩层 -->
    <div class="photo" v-show="photoShow">
      <img class="return2" @click="photoShow = false" src="~images/delete2.png" alt />
      <div class="white_box"></div>
      <div class="photo_mask_layer"></div>
      <div class="photo_text">
        <div class="fontSize">Please upload the prizes you</div>
        <div class="fontSize">won on our after-sale card</div>
        <div class="fontSize">after taking photo.(We</div>
        <div class="fontSize">recommend that you take</div>
        <div class="fontSize">photos of both sides of our</div>
        <div class="products_on fontSize">after-sales card.)</div>
        <div class="add_one" v-show="photo_one">
          <div class="products_on">
            <!-- <img @click="photo_one_cut" src="~images/shumajiadian.png" alt /> -->
          </div>
          <div class="add_one_tip">
            <div>
              <img src="~images/20190822172609.jpg" alt />
            </div>
            <div>
              <img src="~images/20190822172710.jpg" alt />
            </div>
          </div>
          <div class="RE_UP">
            <button class="btn" @click="photo_one_cut">UPLOAD</button>
          </div>
        </div>
        <div class="photo_two" v-show="photo_two">
          <div class="add_two_tip">
            <div>
              <div i="uploader">
                <div class="prelook-wrapper clearfix pb10">
                  <img @click="deleteUrl3" src="~/images/shanchu.png" alt />
                  <div class="prelook-inner" v-show="img_url3">
                    <!-- <span class="circle-box" @click="deleteUrl3">
                      <i class="circle"></i>
                    </span>-->
                    <a rel="group" class="fancybox prelook-block">
                      <img :src="img_url3" />
                    </a>
                  </div>
                  <div class="form-groups" v-show="!img_url3">
                    <img class="uploadPlus" src="~images/jiahaotianchong.png" alt />
                    <div class="col-10">
                      <div class="upload-wrapper" id="container3">
                        <div id="pickfiles3"></div>
                        <div class="progress text-center" id="progress3"></div>
                        <i class="fa fa-plus f16"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div i="uploader">
                <div class="prelook-wrapper clearfix pb10">
                  <img @click="deleteUrl" src="~/images/shanchu.png" alt />
                  <div class="prelook-inner" v-show="img_url">
                    <!-- <span class="circle-box" @click="deleteUrl3">
                      <i class="circle"></i>
                    </span>-->
                    <a rel="group" class="fancybox prelook-block">
                      <img :src="img_url" />
                    </a>
                  </div>
                  <div class="form-groups" v-show="!img_url">
                    <img class="uploadPlus" src="~images/jiahaotianchong.png" alt />
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
            </div>
          </div>
          <div class="up_fs">
            <!-- <button class="btn" @click="photoShow = false">RETURN</button> -->
            <button class="btn" @click="photoFinish">FINISH</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style rel="stylesheet/scss" lang="scss">
@import "~sass/index";
</style>
<script>
import photoUpload from '../common/photoUpload';
import Upload from '@hanzi-package/upload';

export default {
    data() {
        return {
            obj: {
                end_time: 0
            },
            id: '',
            end_url: '',
            addShow: false,
            add_one: true,
            add_two: false,
            name: '',
            facebook: '',
            amazon: '',
            photoShow: false,
            photo_one: true,
            photo_two: false,
            loginShow: true,
            facebookShow: false,
            yourName: false,
            yourFacebook: false,
            yourAmazon: false,
            facebookEmail: '',
            facebookPassword: '',
            goodReputation: false,
            stepCard: true,
            img_url1: '',
            img_url2: '',
            img_url3: '',
            img_url: '',
            img_id1: 0,
            img_id2: 0,
            img_id3: 0,
            img_id4: 0,
            fb_result: '',
            con1: false,
            container2: false,
            container3: false,
            container: false,
            isShowDialog: true
        };
    },
    methods: {
        homePage() {
            let that = this;
            tools.ajax({
                url: `/api/events/${that.$route.params.id}`,
                successFun: function(res) {
                    that.obj = res.data;
                    if (res.data.end_url.indexOf('http') == -1) {
                        that.end_url = 'http://' + res.data.end_url;
                    } else {
                        that.end_url = res.data.end_url;
                    }
                },
                type: 'GET'
            });
            that.id = that.$route.path;
        },
        add() {
            this.addShow = true;
            window.history.pushState(null, null, '#');
        },
        add_one_cut() {
            this.add_one = false;
            this.add_two = true;
        },
        photograph() {
            this.photoShow = true;
            window.history.pushState(null, null, '#');
        },
        photo_one_cut() {
            this.photo_one = false;
            this.photo_two = true;
        },
        gather() {
            let that = this;
            if (that.name == '') {
                tools.alert.error('Please fill in your name');
                return;
            }
            if (that.facebook == '') {
                tools.alert.error('Please enter the correct email address');
                return;
            }
            if (that.amazon == '') {
                tools.alert.error('Please enter the correct order number');
                return;
            }
            if (this.name != '' && this.facebook != '' && this.checkAmazon()) {
                const ajaxData = {
                    event_id: that.obj.id,
                    name: that.name,
                    email: that.facebook,
                    order_sn: that.amazon,
                    img3: that.img_id3,
                    img4: that.img_id4,
                    fb_result: that.fb_result
                };
                if (that.img_id1) {
                    ajaxData.img1 = that.img_id1;
                }
                if (that.img_id2) {
                    ajaxData.img2 = that.img_id2;
                }
                tools.ajax({
                    url: '/api/event/converts',
                    ajaxData: ajaxData,
                    successFun: function(res) {
                        that.goodReputation = true;
                    },
                    errorFun: function(error_data, status, headers, error_obj) {
                        // tools.alert.error(error_data.error_msg);
                        if (error_data.http_code == 400) {
                            tools.alert.error(error_data.error_msg);
                        }
                        if (error_data.http_code == 422) {
                            let errorCode = error_data.error_code.split('_')[0];
                            switch (errorCode) {
                            case 'img1':
                                tools.alert.error(
                                    'Please upload your five-star review screenshot'
                                );
                                break;
                            case 'img2':
                                tools.alert.error(
                                    'Please upload your five-star review screenshot'
                                );
                                break;
                            case 'img3':
                                tools.alert.error(
                                    'Please upload the photo on the front scratch side of our after-sales card'
                                );
                                break;
                            case 'img4':
                                tools.alert.error(
                                    'Please upload the photo on the front scratch side of our after-sales card'
                                );
                                break;
                            case 'email':
                                tools.alert.error('Please enter the correct email address');
                                break;
                            default:
                                tools.alert.error('Check the error');
                                break;
                            }
                        }
                    },
                    type: 'POST'
                });
            }
        },
        login_facebook() {
            let that = this;
            if (typeof FB == 'undefined') {
                tools.alert.error('Your IP address cannot be logged on to FACEBOOK');
                return;
            }
            FB.login(function(response) {
                if (response.status === 'connected') {
                    that.getFBUser();
                }
            }, {scope: 'public_profile,email,user_age_range,user_birthday,user_gender,'});
        },
        noThankShow() {
            this.loginShow = false;
            this.isShowDialog = false;
        },
        yourNameShow() {
            window.scrollTo(0, 0);
            if (this.name == '') {
                this.yourName = true;
            } else {
                this.yourName = false;
            }
        },
        yourFacebookShow() {
            window.scrollTo(0, 0);
            if (this.facebook == '') {
                this.yourFacebook = true;
            } else {
                this.yourFacebook = false;
            }
        },
        yourAmazonShow() {
            window.scrollTo(0, 0);
            if (this.amazon == '') {
                this.yourAmazon = true;
            } else {
                this.yourAmazon = false;
            }
        },
        logIn() {
            if (this.facebookEmail != '' && this.facebookPassword != '') {
                this.facebookShow = false;
            }
        },
        questionMark() {
            this.addShow = true;
            this.add_one = true;
            this.add_two = false;
            window.history.pushState(null, null, '#');
        },
        questionMarkCamera() {
            this.photoShow = true;
            this.photo_one = true;
            this.photo_two = false;
            window.history.pushState(null, null, '#');
        },
        clickFinish() {
            if (this.scratchCard == []) {
                this.stepCard = true;
            }
        },
        clickPhoto1() {
            let that = this;
            that.uploads1 = Upload({
                container: 'container1', //容器ID
                browse_button: 'pickfiles1', //按钮ID
                progress: 'progress1', //进度条ID
                type: 'event_img', //请求接口时的传参，upload_type:"headpic"
                setting: 'local', //local：本地，cloud：云
                chunk_size: '1500kb', //分段传输的大小
                group: ['img'], //上传格式组
                PostInit: function(uploader) {
                    if (app.isAndroid()) {
                        document
                            .querySelector('#container1 .moxie-shim')
                            .children[0].setAttribute('accept', 'image/*');
                    }
                },
                url: '/api/uploads',
                callback: function(res) {
                    that.img_url1 = res.data.url;
                    that.img_id1 = res.data.upload_id;
                },
                UploadProgress(uploader1, file1, type1) {
                    if (file1.percent < 100) {
                        document
                            .querySelector('#container1 .moxie-shim-html5')
                            .classList.remove('moxie-shim');
                    }
                    document.getElementById('progress1').innerHTML = file1.percent + '%';
                    document.getElementById('progress1').style.width =
            file1.percent + '%';
                },
                FilesAdded() {
                    document
                        .querySelector('#container1 .moxie-shim-html5')
                        .classList.remove('moxie-shim');
                },
                Error: function(res) {
                    // console.log(res);
                }
            });
        },
        clickPhoto2() {
            let that = this;
            that.uploads2 = Upload({
                container: 'container2', //容器ID
                browse_button: 'pickfiles2', //按钮ID
                progress: 'progress2', //进度条ID
                type: 'event_img', //请求接口时的传参，upload_type:"headpic"
                setting: 'local', //local：本地，cloud：云
                chunk_size: '1500kb', //分段传输的大小
                group: ['img'], //上传格式组
                custom: 'txt,zip', //自定上传义格式
                url: '/api/uploads',
                PostInit: function(uploader) {
                    if (app.isAndroid()) {
                        document
                            .querySelector('#container2 .moxie-shim')
                            .children[0].setAttribute('accept', 'image/*');
                    }
                },
                UploadProgress(uploader2, file2, type2) {
                    if (file2.percent < 100) {
                        document
                            .querySelector('#container2 .moxie-shim-html5')
                            .classList.remove('moxie-shim');
                    }
                    document.getElementById('progress2').innerHTML = file2.percent + '%';
                    document.getElementById('progress2').style.width =
            file2.percent + '%';
                },
                FilesAdded() {
                    document
                        .querySelector('#container2 .moxie-shim-html5')
                        .classList.remove('moxie-shim');
                },
                callback: function(res) {
                    that.img_url2 = res.data.url;
                    that.img_id2 = res.data.upload_id;
                    // that.$store.commit('setScratchCard', res.data.url);
                }
            });
        },
        clickPhoto3() {
            let that = this;
            that.uploads3 = Upload({
                container: 'container3', //容器ID
                browse_button: 'pickfiles3', //按钮ID
                progress: 'progress3', //进度条ID
                type: 'event_img', //请求接口时的传参，upload_type:"headpic"
                setting: 'local', //local：本地，cloud：云
                chunk_size: '1500kb', //分段传输的大小
                group: ['img'], //上传格式组
                custom: 'txt,zip', //自定上传义格式
                url: '/api/uploads',
                PostInit: function(uploader) {
                    if (app.isAndroid()) {
                        document.querySelector('#container3 .moxie-shim').children[0].setAttribute('accept', 'image/*');
                    }
                },
                UploadProgress(uploader3, file3, type3) {
                    if (file3.percent < 100) {
                        document.querySelector('#container3 .moxie-shim-html5').classList.remove('moxie-shim');
                    }
                    document.getElementById('progress3').innerHTML = file3.percent + '%';
                    document.getElementById('progress3').style.width = file3.percent + '%';
                },
                FilesAdded() {
                    document.querySelector('#container3 .moxie-shim-html5').classList.remove('moxie-shim');
                },
                callback: function(res) {
                    that.img_url3 = res.data.url;
                    that.img_id3 = res.data.upload_id;
                }
            });
        },
        clickPhoto() {
            let that = this;
            that.uploads = Upload({
                container: 'container', //容器ID
                browse_button: 'pickfiles', //按钮ID
                progress: 'progress', //进度条ID
                type: 'event_img', //请求接口时的传参，upload_type:"headpic"
                setting: 'local', //local：本地，cloud：云
                chunk_size: '1500kb', //分段传输的大小
                group: ['img'], //上传格式组
                custom: 'txt,zip', //自定上传义格式
                url: '/api/uploads',
                PostInit: function(uploader) {
                    if (app.isAndroid()) {
                        document.querySelector('#container .moxie-shim').children[0].setAttribute('accept', 'image/*');
                    }
                },
                UploadProgress(uploader, file, type) {
                    if (file.percent < 100) {
                        document.querySelector('#container .moxie-shim-html5').classList.remove('moxie-shim');
                    }
                    document.getElementById('progress').innerHTML = file.percent + '%';
                    document.getElementById('progress').style.width = file.percent + '%';
                },
                FilesAdded() {
                    document.querySelector('#container .moxie-shim-html5').classList.remove('moxie-shim');
                },
                callback: function(res) {
                    that.img_url = res.data.url;
                    that.img_id4 = res.data.upload_id;
                    // that.$store.commit('setScratchCard', res.data.url);
                }
            });
        },
        photoFinish() {
            if (this.img_url == '' || this.img_url3 == '') {
                tools.alert.error('Please upload two pictures');
            }
            if (this.img_url != '' && this.img_url3 != '') {
                this.photoShow = false;
                this.stepCard = false;
            }
        },
        addFinish() {
            this.addShow = false;
        },
        checkAmazon() {
            let that = this;
            if (that.amazon == '') {
                tools.alert.error('Please enter the correct order number');
                return false;
            }
            if (that.amazon.indexOf('-') != -1) {
                let myorder_sn = that.amazon.split('-');
                // console.log(myorder_sn);
                let order_sn = '';
                myorder_sn.forEach((item, index) => {
                    order_sn += item;
                });
                // console.log(order_sn);
                if (order_sn.length == 17) {
                    return true;
                }
            }
            if (that.amazon.length == 17) {
                return true;
            }
            tools.alert.error('Please enter the correct order number');
            return false;
        },
        deleteUrl1() {
            this.img_url1 = '';
            this.img_id1 = '';
            document.querySelector('#container1 .moxie-shim-html5').classList.add('moxie-shim');
            // this.con1 = true;
            let up1 = this.uploads1.data.uploader;
            up1.stop && up1.stop();
            if (up1.files && up1.files.length > 0) {
                up1.removeFile(up1.files[0]);
                document.getElementById('progress1').innerHTML = '';
                document.getElementById('progress1').style.width = '';
            }
        },
        deleteUrl2() {
            this.img_url2 = '';
            this.img_id2 = '';
            document.querySelector('#container2 .moxie-shim-html5').classList.add('moxie-shim');
            let up2 = this.uploads2.data.uploader;
            up2.stop && up2.stop();
            if (up2.files && up2.files.length > 0) {
                up2.removeFile(up2.files[0]);
                document.getElementById('progress2').innerHTML = '';
                document.getElementById('progress2').style.width = '';
            }
        },
        deleteUrl3() {
            this.img_url3 = '';
            this.img_id3 = '';
            document.querySelector('#container3 .moxie-shim-html5').classList.add('moxie-shim');
            let up3 = this.uploads3.data.uploader;
            up3.stop && up3.stop();
            if (up3.files && up3.files.length > 0) {
                up3.removeFile(up3.files[0]);
                document.getElementById('progress3').innerHTML = '';
                document.getElementById('progress3').style.width = '';
            }
        },
        deleteUrl() {
            this.img_url = '';
            this.img_id4 = '';
            document.querySelector('#container .moxie-shim-html5').classList.add('moxie-shim');
            let up = this.uploads.data.uploader;
            up.stop && up.stop();
            if (up.files && up.files.length > 0) {
                up.removeFile(up.files[0]);
                document.getElementById('progress').innerHTML = '';
                document.getElementById('progress').style.width = '';
            }
        },
        getFBUser() {
            const that = this;
            FB.api('/me', function(response) {
                // console.log(response);
                that.fb_result = response;
                that.loginShow = false;
                that.facebookShow = true;
                that.isShowDialog = false;
            }, {fields: 'id,name,email,age_range,birthday,gender'});
        },
        onFBloaded() {
            FB.init({
                appId: '745661622522460',
                cookie: true,
                xfbml: true,
                version: 'v4.0'
            });
            const that = this;
            FB.getLoginStatus(function(response) {
                if (response.status == 'connected') {
                    tools.alert.closeLoading();
                    that.getFBUser();
                    that.loginShow = false;
                    that.isShowDialog = false;
                }
            });
            FB.AppEvents.logPageView();
        }
    },
    watch: {},
    components: {},
    filters: {},
    created() {
        tools.alert.loading();
        // window.fbAsyncInit = this.onFBloaded;
        // (function(d, s, id) {
        //     var js,
        //         fjs = d.getElementsByTagName(s)[0];
        //     if (d.getElementById(id)) {
        //         return;
        //     }
        //     js = d.createElement(s);
        //     js.id = id;
        //     js.src = 'https://connect.facebook.net/en_US/sdk.js';
        //     fjs.parentNode.insertBefore(js, fjs);
        // })(document, 'script', 'facebook-jssdk');
    },
    mounted() {
        this.homePage();
        this.clickPhoto1();
        this.clickPhoto2();
        this.clickPhoto3();
        this.clickPhoto();
        window.addEventListener(
            'popstate',
            e => {
                if (this.addShow || this.photoShow) {
                    this.addShow = false;
                    this.photoShow = false;
                }
            },
            false
        );
        tools.alert.closeLoading();
    },
    updated() {},
    beforeDestroy() {
        window.removeEventListener(
            'popstste',
            e => {
                if (this.addShow || this.photoShow) {
                    this.addShow = false;
                    this.photoShow = false;
                }
            },
            false
        );
    }
};
</script>
