//index.js
//获取应用实例
const app = getApp();
const utils = require("../../utils/util.js");
import {
    indexList,
    getTransfer
} from '../../api/goods.js'
import {
  userState, getBanner
} from '../../api/user.js'
import {
    veriryVip
} from '../../api/verify.js'
Page({
    data: {
        modules: [], //商品列表
        swiperSetting: { //顶部轮播图设置
            showDots: !0, //指示点
            autoplay: !0, //自动播放
            interval: 5000, //自动播放时间间隔
            duration: 1000, //自动播放时间
            indicatorColor: 'rgba(255, 255, 255, .7)', //指示点默认颜色
            indicatorActiveColor: '#ffffff' //指示点选中颜色
        },
        showMask: !1, //蒙层
        showAlertIntegral: !1, //积分赠送弹出框
        showAlertVip: !1, //vip激活弹出框
        vipCode: '' //vip激活码
    },
    onLoad() {
        this.init();
    },
    init() {
        this.checkUserState();
        this.loadList();
        this.getBanner();
    },
    async loadList() {
        const res = await indexList()
        if (res.code === 0) {
            this.setData({
                modules: res.data
            })
        }
        // .then(res => {
        //   if (res.code === 0) {
        //     this.setData({
        //       modules: res.data
        //     })
        //   }
        // })
    },
    async checkUserState() {
        const res = await userState()
        if (res.code === 0) {
            this.setData({
                userState: res.data
            })
            getApp().globalData.userInfo = res.data
            this.vip_status = res.data.vip_status //vip 状态
            this.has_transfer = res.data.has_transfer
            if (this.has_transfer !== 0) {
                this.setData({
                    showMask: !0,
                    showAlertIntegral: !0
                })
            } else {
                if (this.vip_status === 0) {
                    this.setData({
                        showMask: !0,
                        showAlertVip: !0
                    })
                }
            }
            // if (res.vip_status == 0) {
            //   this.setData({
            //     showMask: !0,
            //     showAlertVip: !0
            //   })
            // }
        }
    },
    async getBanner () {
      const res = await getBanner({})
      if (res.code === 0) {
        this.setData({
          swiperList: res.data.data
        })
      }
    },
    async konw() {
        const res = await getTransfer({
            transfer_ids: this.data.userState.transfer_ids
        })
        if (res.code === 0) {
            this.setData({
                showAlertIntegral: !1
            })
            if (this.vip_status === 0) {
                this.setData({
                    showAlertVip: !0
                })
            } else {
                this.setData({
                    showMask: !1
                })
            }
        }
    },
    vipCodeInput(e) {
        this.setData({
            vipCode: e.detail.value
        })
    },
    previewSwiperImage(e) {
        utils.previewSwiperImage(e.currentTarget.dataset.src, this.data.swiperList);
    },
    goMore(e) {
        app.navigateTo({
            url: `/pages/goodsList/goodList?id=${e.currentTarget.dataset.id}`
        })
    },
    verifyVip() {
        veriryVip(this.data.vipCode)
            .then(res => {
                console.log(res)
                if (res.code == 0) {
                    wx.showToast({
                        title: res.message,
                    })
                    this.hideAlert();
                }
            })
    }
})