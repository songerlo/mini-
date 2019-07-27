// pages/goodsConfirm/goodsConfirm.js
const app = getApp();
const Api = app.api;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {                                      //默认地址
      a_id: '',                                       
      name: '',
      phone: '',
      address: '',
      is_default: 1,
    },
    customerMessage: '',                                   //顾客留言
    goodsData: {
      ig_id: 0,                                            //商品id
      ig_name: '',                                         //商品名称
      ig_subtitle: '',                                     //商品副标题
      ig_description: '',                                  //商品描述
      ig_features: '',                                     //商品规格
      ig_stock: '',                                        //商品库存
      ig_price: '',                                        //商品兑换积分  
      ig_images: [],                                       //商品图片数组
      ig_pk_price: [],                                     //商品比价数组
    },
    showPhoneConfirm : !1,                                 //手机号验证弹出框
    userScore: 0,                                          //用户积分
    goodsCount:0,                                          //商品数量
    phoneCheck: !1                                         //手机验证
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (Reflect.has(options, 'id') && Reflect.has(options, 'goodsCount')) this.init(options.id, options.goodsCount);
  },
  init(id, goodsCount) {
    this.goodsCount = goodsCount;
    this.loadDetails(id, goodsCount);
    this.checkState();
  },
  loadDetails(id, goodsCount) {
    Api.goodsApi.goodsExchange(id, goodsCount)
      .then(res => {
        if (res.code == 0) {
          this.setData({
            goodsData: res.data
          })
          if (!app.globalData.isSelectAddress) {
            defaultAddress: res.data.address
          }
        }
      })
  },
  checkState(){
    Api.userApi.userState()
      .then(res => {
        console.log(res)
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
    if (this.data.goodsData.u_id && this.data.goodsData.num)this.init(this.data.goodsData.u_id, this.data.goodsData.num);
    if (app.globalData.isSelectAddress) {
      this.setData({
        defaultAddress: app.globalData.address
      })
    }
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
    Api.goodsApi.goodsShare(this.data.goodsData.ig_id)
  },
  goAddressList () {
    app.navigateTo({
      url: '/pages/address/list'
    })
  },
  inputMessage (e){
    this.setData({
      customerMessage: e.detail.value
    })
  },
  exchange () {
    if (JSON.stringify(this.data.goodsData.address) == '[]') {
      wx.showToast({
        title: '请先创建收货地址',
        icon: 'none'
      })
      return;
    }
    Api.goodsApi.createOrder({
      g_id: this.data.goodsData.ig_id,
      num: this.data.goodsData.num,
      a_id: this.data.address.a_id,
      message: this.data.customerMessage
    }).then(res => {
      if (res.code == 0) {
        if (res.data.io_status == 0) {
          this.io_sn = res.data.io_sn //获取订单编号
          this.setData({
            showPhoneConfirm: !0
          })
        }
      } else {
        wx.showToast({
          title: res.message,
          icon: 'none'
        })
      }
    })
  },
  hidePhoneConfirm (e) {
    if (e.detail.checkPhone) {
      this.doPay();
    }
    this.setData({
      showPhoneConfirm: !1
    })
  },
  doPay () {
    Api.goodsApi.doPay(this.io_sn)
      .then(res => {
        if (res.code == 0) {
          this.navigateTo({
            url: '/pages/tip/tip?state=1'
          })
        } else {
          this.navigateTo({
            url: `/pages/tip/tip?state=2&msg=${res.code.message}`
          })
        }
      })
  }
})