// pages/order/list.js
import {
    orderList
} from '../../api/order.js'
import {
  doPay, shouhuo
} from '../../api/goods.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        active: 0,
        allList: [],
        allListPage: 1,
        awaitUseList: [],
        awaitUsePage: 1,
        awaitSendList: [],
        awaitSendPage: 1,
        awaitReceiveList: [],
        awaitReceivePage: 1,
        cancleList: [],
        canclePage: 1,
        stocksList: [],
        stocksPage: 1,
        showPhoneConfirm: false,
        userInfo: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            userInfo: getApp().globalData.userInfo
        })
        this.setData({
            active: +options.type
        })
    },
    onShow() {
        this.initAll()
        this.loadOrdersList()
    },
    loadOrdersList: function() {
        wx.showLoading({
          title: 'loading...',
          mask: true
        })
        orderList({
                status: this.data.active,
                page: this.data.active === 0 ?
                    this.data.allListPage : this.data.active === 1 ?
                    this.data.awaitUsePage : this.data.active === 2 ?
                    this.data.awaitSendPage : this.data.active === 3 ?
                    this.data.stocksPage : this.data.active === 4 ?
                    this.data.awaitReceivePage : this.data.active === 5 ?
                    this.data.canclePage : -1,
                pageSize: 20
            })
            .then(res => {
                console.log(res)
                if (res.code === 0) {
                    if (res.data.data.length > 0) {
                        switch (this.data.active) {
                            case 0:
                                this.setData({
                                    allList: [...this.data.allList, ...res.data.data],
                                    allListPage: this.data.allListPage + 1
                                })
                                break
                            case 1:
                                this.setData({
                                    awaitUseList: [...this.data.awaitUseList, ...res.data.data],
                                    awaitUsePage: this.data.awaitUsePage + 1
                                })
                                break
                            case 2:
                                this.setData({
                                    awaitSendList: [...this.data.awaitSendList, ...res.data.data],
                                    awaitSendPage: this.data.awaitSendPage + 1
                                })
                                break
                            case 3:
                                this.setData({
                                    awaitReceiveList: [...this.data.awaitReceiveList, ...res.data.data],
                                    awaitReceivePage: this.data.awaitReceivePage + 1
                                })
                                break
                            case 4:
                                this.setData({
                                    stocksList: [...this.data.stocksList, ...res.data.data],
                                    stocksPage: this.data.stocksPage + 1
                                })
                                break
                            case 5:
                                this.setData({
                                    cancleList: [...this.data.cancleList, ...res.data.data],
                                    canclePage: this.data.canclePage + 1
                                })
                                break
                            default:
                                break
                        }
                    }
                }
            })
    },
    update(obj) {
        console.log(obj)
        let arr = []
        this.initAll()
        this.loadOrdersList()
        if (this.data.active === 0) {
            arr = this.data.allList
            arr.forEach(e => {
                if (e.orderId === obj.detail.orderId) {
                    e.orderStatus = obj.detail.orderStatus
                }
            })
            this.setData({
                allList: arr
            })
        } else if (this.data.active === 1) {
            arr = this.data.awaitUseList
            arr.forEach(e => {
                if (e.orderId === obj.detail.orderId) {
                    e.orderStatus = obj.detail.orderStatus
                    console.log(e)
                }
            })
            this.setData({
                awaitUseList: arr
            })
        } else if (this.data.active === 2) {
            arr = this.data.awaitSendList
            arr.forEach(e => {
                if (e.orderId === obj.detail.orderId) {
                    e.orderStatus = obj.detail.orderStatus
                }
            })
            this.setData({
                awaitSendList: arr
            })
        }
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },
    exchange(e) {
        this.orderSn = e.detail.orderSn
        this.setData({
            showPhoneConfirm: true
        })
    },
    confirms(e){
      console.log(2)
      shouhuo({
        order_sn:e.detail.orderSn
      }).then(res=>{
        console.log(res)
        this.update()
      })
    },
    hidePhoneConfirm(e) {
        if (e.detail.code) {
            this.doPay(+e.detail.code);
        }
        this.setData({
            showPhoneConfirm: false
        })
    },
    doPay(code) {
        doPay({
                order_sn: this.orderSn,
                code: code
            })
            .then(res => {
                this.setData({
                    time: 60,
                    canSendCode: !0
                })
                if (res.code === 0) {
                    wx.showToast({
                        title: '支付成功',
                        mask: true,
                        success: res => {
                            setTimeout(() => {
                                wx.navigateTo({
                                    url: `/pages/tip/tip?state=1&orderSn=${this.orderSn}`
                                })
                            }, 800)
                        }
                    })
                } else {
                    wx.navigateTo({
                        url: `/pages/tip/tip?state=2&msg=${res.message}`
                    })
                }
            })
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        this.loadOrdersList()
    },
    tabChange(e) {
        this.setData({
            active: e.detail.index,
        })
        this.initAll()
        this.loadOrdersList();
    },
    initAll() {
        this.setData({
            allList: [],
            allListPage: 1,
            awaitUseList: [],
            awaitUsePage: 1,
            awaitSendList: [],
            awaitSendPage: 1,
            awaitReceiveList: [],
            awaitReceivePage: 1,
            cancleList: [],
            canclePage: 1,
            stocksList: [],
            stocksPage: 1
        })
    }
})