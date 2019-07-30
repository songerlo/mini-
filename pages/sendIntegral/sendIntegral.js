// pages/sendIntegral/sendIntegral.js
import { transfer } from '../../api/order.js'
import { miniCode } from '../../api/verify.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: null,
    num: null,
    sendSuccess: !1,
    showPhoneConfirm: !1,
    u_phone: null,
    canSendCode: !0,
    time: 60,
    code: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      u_phone: getApp().globalData.userInfo.u_cellphone
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getCode(e) {
    if (!this.data.canSendCode) {
      return
    }
    miniCode()
      .then(res => {
        if (res.code == 0) {
          this.setData({
            canSendCode: !1,
            ifCode: !0
          })
          wx.showToast({
            title: '验证码发送成功'
          })
          setInterval(() => {
            this.setData({
              time: this.data.time - 1
            })
            if (this.data.time == 0) {
              this.setData({
                canSendCode: !0,
                time: 60
              })
            }
          }, 1000)
        } else {
          wx.showToast({
            title: res.message,
            icon: 'none'
          })
        }
        console.log(res)
      })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (ops) {
    if(ops.from === 'button'){
      console.log(ops.target)
    }
    return {
      title: '积分商城',
      path: '/pages/authorize/telephone',
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  },
  bindinput (e) {
    if (e.currentTarget.dataset.type === 'num') {
      this.setData({
        num: e.detail.value
      })
    } else if(e.currentTarget.dataset.type ==='code'){
      this.setData({
        code: e.detail.value
      })
    }
    else {
      this.setData({
        phone: e.detail.value
      })
    }
  },
  sendIntegral () {
    if (this.data.phone == null || this.data.num == null || this.data.code == null) {
      wx.showToast({
        title: '请先填写完整',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return
    }
    this.setData({
      showPhoneConfirm: !0
    })
    this.transfer()
  },
  transfer () {
    transfer({
      integral: this.data.num,
      to_phone: this.data.phone,
      code: this.data.code
    })
      .then(res => {
        if (res.code === 0) {
          wx.showToast({
            title: '转赠成功',
            icon: 'success',
            duration: 1500,
            mask: true
          })
          this.setData({
            sendSuccess: !0,
            code: null,
            phone: null,
            num: null,
            canSendCode: !0,
            time: 60
          })
        }
      })
  },
  hidePhoneConfirm (e) {
    console.log(e.detail.code)
    this.setData({
      showPhoneConfirm: !1
    })
    if (e.detail.code) {
      this.transfer()
    }
  }
})