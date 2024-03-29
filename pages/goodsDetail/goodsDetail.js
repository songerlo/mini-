// pages/goodsDetail/goodsDetail.js
const utils = require("../../utils/util.js");
const app = getApp();
// const Api = app.api;
import {
    goodsDetails,
    chkStock
} from '../../api/goods.js'
import {
    userState
} from '../../api/user.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        swiperSetting: { //顶部轮播图设置
            showDots: !1, //指示点
            autoplay: !0, //自动播放
            interval: 5000, //自动播放时间间隔
            duration: 300, //自动播放时间
            indicatorColor: 'rgba(255, 255, 255, .7)', //指示点默认颜色
            indicatorActiveColor: '#ffffff', //指示点选中颜色
            current: 0, //默认录播图                                   
        },
        goodsCount: 1, //商品数量
        userInfo: { //用户信息
            integral: 0
        },
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
        },
        userScore: 0,
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        if (Reflect.has(options, 'id')) this.init(options);
    },
    init(options) {
        this.options = options
        this.loadDetail(options);
        this.checkState();
    },
    toHelp() {
        wx.navigateTo({
            url: '../help/help',
        })
    },
    loadDetail(options) {
        goodsDetails({
                ig_id: options.id,
                ig_sku_id: options.sid
            })
            .then(res => {
                if (res.code == 0) {
                    this.goodsPrice = +res.data.ig_price;
                    let arr = []
                    res.data.ig_images.forEach(e => {
                        console.log(e, e.indexOf('http'))
                        if (e.indexOf('http') === -1) {
                            e = 'http:' + e
                            console.log(e)
                        }
                        arr.push(e)
                    })
                    res.data.ig_images = arr
                  console.log(res.data.ig_description);
                  res.data.ig_description = res.data.ig_description.replace(/width\s*:\s*[0-9]+px/g, 'width:100%');
                  res.data.ig_description = res.data.ig_description.replace(/<([\/]?)(center)((:?\s*)(:?[^>]*)(:?\s*))>/g, '<$1div$3>');//替换center标签
                  res.data.ig_description = res.data.ig_description.replace(/\<img/gi, '<img class="rich-img" ');//正则给img标签增加class
                    this.setData({
                        goodsData: res.data,
                        goodsPrice: this.goodsPrice
                    })
                }
            })
    },
    toAd() {
        wx.navigateTo({
            url: `../ad/ad?ht=${this.data.goodsData.ad.ad_url}`,
        })
    },
    checkState() {
        userState()
            .then(res => {
                if (res.code == 0) {
                    // this.userScore = +res.data.u_integral
                    this.setData({
                        userScore: res.data.u_integral
                    })
                }
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
    onShow: function() {},

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
        return {
            title: this.data.goodsData.ig_name
        }
    },
    swiperChange(e) {
        this.setData({
            ['swiperSetting.current']: e.detail.current
        })
    },
    previewSwiperImage(e) {
        console.log(e.currentTarget.dataset.src, this.data.goodsData.ig_images)
        wx.previewImage({
            current: e.currentTarget.dataset.src,
            urls: this.data.goodsData.ig_images,
        })
    },
    backHome(e) {
        wx.switchTab({
            url: '/pages/index/index',
        })
    },
    tapBuy() {
        chkStock({
            ig_id: this.options.id,
            ig_sku_id: this.options.sid,
            num: this.data.goodsCount
        }).then(res => {
            if (res.code !== 0) {
                return
            }
            app.navigateTo({
                url: `/pages/goodsConfirm/goodsConfirm?id=${this.options.id}&sid=${this.options.sid}&goodsCount=${this.data.goodsCount}`
            })
        })

    },
    goodsCountChange(e) {
        this.setData({
            goodsCount: e.detail
        })
        chkStock({
                ig_id: this.options.id,
                ig_sku_id: this.options.sid,
                num: e.detail
            })
            .then(res => {
                if (res.code == 0) {
                    this.setData({
                        goodsCount: e.detail
                    })
                } else {
                    wx.showToast({
                        title: res.message,
                        icon: 'none'
                    })
                    this.setData({
                        goodsCount: e.detail - 1
                    })
                }
            })
    }
})