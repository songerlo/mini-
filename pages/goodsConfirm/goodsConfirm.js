// pages/goodsConfirm/goodsConfirm.js
const app = getApp();
// const Api = app.api;
import {
    goodsExchange,
    createOrder,
    doPay
} from '../../api/goods.js'
import {
    userState
} from '../../api/user.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        defaultAddress: { //默认地址
            a_id: '',
            name: '',
            phone: '',
            address: '',
            is_default: 1,
        },
        customerMessage: '', //顾客留言
        goodsData: {
            ig_id: 0, //商品id
            ig_name: '', //商品名称
            ig_subtitle: '', //商品副标题
            ig_description: '', //商品描述
            ig_features: '', //商品规格
            ig_stock: '', //商品库存
            ig_price: '', //商品兑换积分  
            ig_images: [], //商品图片数组
            ig_pk_price: [], //商品比价数组
            address: []
        },
        showPhoneConfirm: !1, //手机号验证弹出框
        userScore: 0, //用户积分
        goodsCount: 0, //商品数量
        phoneCheck: !1 //手机验证
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        if (Reflect.has(options, 'id') && Reflect.has(options, 'goodsCount')) this.init(options);
        this.setData({
            userInfo: getApp().globalData.userInfo
        })
    },
    init(options) {
        this.options = options
        this.loadDetails(options);
        this.checkState();
    },
    loadDetails(options) {
        goodsExchange({
                ig_id: options.id,
                ig_sku_id: options.sid,
                num: options.goodsCount
            })
            .then(res => {
                if (res.code == 0) {
                    this.setData({
                            goodsData: res.data,
                            defaultAddress: res.data.address
                        })
                        // if (!app.globalData.isSelectAddress) {
                        //   defaultAddress: res.data.address
                        // }
                }
            })
    },
    checkState() {
        userState()
            .then(res => {
                console.log(res)
            })
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
        // if (this.data.goodsData.u_id && this.data.goodsData.num)this.init(this.data.goodsData.u_id, this.data.goodsData.num);
        // if (app.globalData.isSelectAddress) {
        //   this.setData({
        //     defaultAddress: app.globalData.address
        //   })
        // }
        if (getApp().globalData.address !== null) {
            this.setData({
                defaultAddress: app.globalData.address
            })
            getApp().globalData.address = null
        }
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
    // onShareAppMessage: function () {
    //   Api.goodsApi.goodsShare(this.data.goodsData.ig_id)
    // },
    goAddressList() {
        app.navigateTo({
            url: '/pages/address/list?select=1'
        })
    },
    inputMessage(e) {
        this.setData({
            customerMessage: e.detail.value
        })
    },
    exchange() {
        if (JSON.stringify(this.data.goodsData.address) == '[]') {
            wx.showToast({
                title: '请先创建收货地址',
                icon: 'none'
            })
            return;
        }
        createOrder({
            ig_id: this.data.goodsData.ig_id,
            ig_sku_id: this.data.goodsData.ig_sku_id,
            num: this.data.goodsData.num,
            a_id: this.data.defaultAddress.a_id,
            message: this.data.customerMessage
        }).then(res => {
            if (res.code == 0) {
                this.orderSn = res.data.orderSn //获取订单编号
                    // getApp().globalData.orderSn = res.data.orderSn
                this.setData({
                        showPhoneConfirm: !0
                    })
                    // if (res.data.io_status == 0) {
                    //   this.setData({
                    //     showPhoneConfirm: !0
                    //   })
                    // }
            } else {
                wx.showToast({
                    title: res.message,
                    icon: 'none'
                })
            }
        })
    },
    hidePhoneConfirm(e) {
        if (e.detail.code) {
            this.doPay(+e.detail.code);
        }
        this.setData({
            showPhoneConfirm: !1
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
    }
})