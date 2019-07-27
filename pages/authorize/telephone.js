// pages/authorize/telephone.js
import http from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},
  getPhoneNumber(e) {
    if (e.detail.errMsg === 'getPhoneNumber:ok') {
      wx.login({
        success(res) {
          console.log(res)
          http({
            url: '/MiniProgram/goLogin',
            method: 'post',
            data: {
              from: 6,
              encryptedData: e.detail.encryptedData,
              iv: e.detail.iv,
              code: res.code
            }
          }).then(function(ret) {
            console.log(ret)
            if (ret && ret.code === 0) {
              wx.setStorageSync('uid', ret.data.u_id);
              wx.reLaunch({
                url: '/pages/index/index'
              })
            }
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})