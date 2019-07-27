// pages/goodsList/goodList.js
const Api = getApp().api;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultSetting: {
      highVolume: !0,
      highintegral: !1
    },
    isTap: 0,
    goodslist: [],
    showEnd: !1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (Reflect.has(options, 'id')) this.init(options.id);
  },
  init (id) {
    this.page = 1;
    this.gm_id = id;
    this.loadList();
  },
  loadList () {
    wx.showLoading({
      title: '加载中...',
    })
    let isTap = this.data.isTap, defaultSetting = this.data.defaultSetting;
    Api.goodsApi.moduleList({
      gm_id: this.gm_id,
      sort: isTap == 0 ? 0 : isTap == 1 && defaultSetting.highVolume ? 1 : isTap == 1 && !defaultSetting.highVolume ? 2 : isTap == 2 && !defaultSetting.highintegral ? 3 : 4,
      page: this.page,
      pageSize: 20
    })
      .then(res => {
        console.log(res)
        if (res.code == 0){
          this.page ++;
          if (res.data.goods.data.length > 0) {
            this.setData({
              goodslist: [...res.data.goods.data, ...this.data.goodslist]
            })
          } 
          if (res.data.goods.data.length < 20) {
            this.setData({
              showEnd: !0
            })
          }
          wx.hideLoading();
        }
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
    this.loadList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  tapSelect (e) {
    if (Reflect.has(e.currentTarget.dataset, 'type')){
      if (e.currentTarget.dataset.type === 'new') {
        this.setData({
          isTap: 0
        })
      } else if (e.currentTarget.dataset.type === 'salesVolume') {
        this.setData({
          ['defaultSetting.highVolume']: !this.data.defaultSetting.highVolume,
          isTap:1
        })
      } else if (e.currentTarget.dataset.type === 'integral') {
        this.setData({
          ['defaultSetting.highintegral']: !this.data.defaultSetting.highintegral,
          isTap: 2
        })
      }
    }
   this.reload();
  },
  reload () {
    this.setData({
      goodslist: []
    })
    this.page = 1;
    this.loadList();
  }
})