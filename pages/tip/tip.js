// pages/tip/tip.js
/**
 * @state  1:兑换成功 2:兑换失败 3:充值成功 4:充值失败
 * @msg  失败展示的信息
 */
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pageState: 0,
    msg: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (Reflect.has(options, 'state')) {
      console.log(Reflect.get(options, 'state'))
      this.setData({
        pageState: Reflect.get(options, 'state'),
        msg: Reflect.get(options, 'msg') || ''
      })
      wx.setNavigationBarTitle({
        title: options.state == 1 ? '兑换成功' : options.state == 2 ? '兑换失败' : options.state == 3 ? '充值成功' : options.state == 4 ? '充值失败' : '参数错误'
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

  },
  chongzhi() {},
  goBack () {
    wx.navigateBack();
  },
  goBackIndex () {
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },
  goExDetail () {
    app.navigateTo({
      url: '/pages/order/list'
    })
  }
})