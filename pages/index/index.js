//index.js
//获取应用实例
const app = getApp();
const utils = require("../../utils/util.js");
const Api = require("../../api/index.js");

Page({
  data: {
    modules: [],                                            //商品列表
    swiperSetting: {                                        //顶部轮播图设置
      showDots: !0,                                         //指示点
      autoplay: !0,                                         //自动播放
      interval: 5000,                                       //自动播放时间间隔
      duration: 1000,                                       //自动播放时间
      indicatorColor: 'rgba(255, 255, 255, .7)',            //指示点默认颜色
      indicatorActiveColor: '#ffffff'                       //指示点选中颜色
    },
    showMask: !1,                                           //蒙层
    showAlertIntegral: !1,                                  //积分赠送弹出框
    showAlertVip: !1,                                       //vip激活弹出框
    vipCode: ''                                             //vip激活码
  },
  onLoad() {
    this.init();
  },
  init () {
    this.checkUserState();
    this.loadList();
  },
  loadList () {
    Api.goodsApi.indexList()
      .then(res => {
        if (res.code === 0) {
          this.setData({
            modules: res.data
          })
        }
      })
  },
  checkUserState () {
    Api.userApi.userState()
      .then(res => {
        this.setData({
          userState: res.data
        })
        if (res.vip_status == 0) {
          this.setData({
            showMask: !0,
            showAlertVip: !0
          })
        }
      })
  },
  hideAlert() {
    if (this.data.showAlertIntegral) {
      this.setData({
        showAlertIntegral: !1
      })
      if (this.data.has_transfer) {
        this.setData({
          has_transfer: !1
        })
      }
    } else if (this.data.showAlertVip) {
      this.setData({
        showAlertVip: !1
      })
      if (this.data.userState.has_transfer) {
        this.setData({
          showAlertIntegral: !1
        })
      }
    }
    this.setData({
      showMask: !1
    })
  },
  vipCodeInput(e) {
    this.setData({
      vipCode: e.detail.value
    })
  },
  previewSwiperImage (e) {
    utils.previewSwiperImage(e.currentTarget.dataset.src, this.data.swiperList);
  },
  goMore (e) {
    app.navigateTo({
      url: `/pages/goodsList/goodList?id=${e.currentTarget.dataset.id}`
    })
  },
  verifyVip () {
    Api.verifyApi.veriryVip(this.data.vipCode)
    .then(res => {
      console.log(res)
      if (res.code == 0) {
        wx.showToast({
          title: res.message,
        })
        this.hideAlert();
      } else {
        wx.showToast({
          title: res.message,
          icon: 'none'
        })
      }
    })
  }
})
