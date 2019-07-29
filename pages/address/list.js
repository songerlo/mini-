// pages/address/list.js
const app = getApp();
const Api = app.api;
import { userAddressList } from '../../api/user.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList : [],
    page: 1,
    finished: false,
    select: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.select = false
    if (Reflect.has(options, 'select')) {
      this.setData({
        select: true
      })
    }
  },
  onShow: function () {
    this.setData({
      addressList: [],
      page: 1,
      finished: false
    })
    this.init();
  },
  init () {
    this.loadAddressList();
  },
  loadAddressList () {
    if (this.data.finished) {
      return
    }
    userAddressList({
      page: this.data.page,
      pageSize: 10
    })
      .then(res => {
        if (res.code == 0) {
          if (res.data.data.length > 0) {
            this.setData({
              addressList: [...this.data.addressList, ...res.data.data],
              page: this.data.page + 1
            })
          } else {
            this.setData({
              finished: !0
            })
          }
        }
      })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
    this.init()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  addAddress (e) {
    app.navigateTo({
      url: '/pages/address/edit'
    })
  }
})