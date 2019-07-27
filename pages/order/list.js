// pages/order/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0,
    ordersList:[
      {
        title:'标题',
        status:'0'
      },
      {
        title: '标题',
        status: '0'
      },
      {
        title: '标题',
        status: '0'
      },
      {
        title: '标题',
        status: '0'
      },
      {
        title: '标题',
        status: '0'
      },
      {
        title: '标题',
        status: '0'
      },
      {
        title: '标题',
        status: '0'
      },
      {
        title: '标题',
        status: '0'
      },
      {
        title: '标题',
        status: '0'
      },
      {
        title: '标题',
        status: '0'
      }

    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      active: options.type
    })
  },
  ordersList: function (){
    
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

})