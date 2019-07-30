// pages/recharge/index.js
const app = getApp();
import { recharge } from '../../api/order.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    rechargeList: [
      { integral: 250, price: '50.00', isSelect: !1},
      { integral: 500, price: '100.00', isSelect: !1},
      { integral: 1000, price: '200.00', isSelect: !1},
      { integral: 1500, price: '300.00', isSelect: !1}
    ],
    inputAmount: 0,
    isSelect:!1,
    isFocus: !1,
    payAmount: 0
  },
  onLoad () {
    this.init();
  },
  init () {
    this.data.rechargeList.forEach((currentTarget, index) => {
      if (currentTarget.isSelect) {
        this.setData({
          payAmount: currentTarget.price
        })
        return
      }
    })
  },
  onShareAppMessage () {

  },
  tapSelect (e) {
    if (this.data.inputAmount.length > 0 || e.currentTarget.dataset.index === undefined) return;
    const rechargeList = [...this.data.rechargeList];
    if (!e.currentTarget.dataset.isselect) {
      let payAmount = 0;
      rechargeList.forEach((currentTarget, index) => {
        if (currentTarget.isSelect) currentTarget.isSelect = !1;
      })
      payAmount = rechargeList[e.currentTarget.dataset.index].price;
      rechargeList[e.currentTarget.dataset.index].isSelect = !0
      if (!this.data.isSelect) {
        this.setData({
          isSelect: !0
        })
      }
      this.setData({
        rechargeList,
        isFocus: !1,
        payAmount
      })
    } else {
      console.log(1)
      rechargeList[e.currentTarget.dataset.index].isSelect = !1;
      this.setData({
        isSelect: !1,
        rechargeList
      })
    }
  },
  focus (e) {
    this.setData({
      isFocus: !0
    })
  },
  blur (e) {
  },
  input (e) {
    if (!this.data.isSelect) {
      if ( +e.detail.value <= 50000) {
        this.setData({
          inputAmount: e.detail.value,
          payAmount: +e.detail.value / 5
        })
      } else {
        this.setData({
          inputAmount: 50000,
          payAmount: 10000
        })
      }
    }
  },
  goRecorde () {
    app.navigateTo({
      url: '/pages/recharge/recode'
    })
  },
  instantRecharge (e) {
    if (!this.data.payAmount){
      wx.showToast({
        title: '请选择充值金额',
        icon: 'none'
      })
      return;
    }
    recharge({
      money: this.data.payAmount
    })
      .then(res => {
        if (res.code === 0) {
          wx.requestPayment({
            timeStamp: res.data.timeStamp,
            nonceStr: res.data.nonceStr,
            package: res.data.package,
            signType: 'MD5',
            paySign: res.data.paySign,
            success(res) {
              getApp().navigateTo({
                url: 'pages/tip/tip?status=3'
              })
            },
            fail(res) {
              // msg参数
              getApp().navigateTo({
                url: `pages/tip/tip?status=4&msg=`
              })
            }
          })
        }
        console.log(res)
      })
  }
})