// pages/order/detail.js
import {
    orderDetail
} from '../../api/order.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        orderData: {}
    },

    /**
     * 生命周期函数--监听页面加载 2019072799979997
     */
    onLoad: function(options) {
        this.options = options
        this.loadData(options)
    },
    async loadData(options) {
        const res = await orderDetail({
            order_sn: options.orderSn
        })
        if (res.code === 0) {
            res.data.receivePhone = res.data.receivePhone
            this.setData({
                orderData: res.data
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