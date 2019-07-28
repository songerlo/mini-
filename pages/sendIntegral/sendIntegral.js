// pages/sendIntegral/sendIntegral.js
import { transfer } from '../../api/order.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: null,
    num: null,
    sendSuccess: !1,
    showPhoneConfirm: !1,
    u_phone: null
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
  onShareAppMessage: function () {

  },
  bindinput (e) {
    console.log(e)
    if (e.currentTarget.dataset.type === 'num') {
      this.setData({
        num: e.detail.value
      })
    } else {
      this.setData({
        phone: e.detail.value
      })
    }
  },
  sendIntegral () {
    if (this.data.phone == null || this.data.num == null) {
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
  },
  transfer () {
    transfer({
      integral: this.data.num,
      to_phone: this.data.phone
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
            sendSuccess: !0
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