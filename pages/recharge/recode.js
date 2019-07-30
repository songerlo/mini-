// pages/recharge/recode.js
import {
    getIntegra
} from '../../api/user.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
      recordList: [],
      page: 1,
      finished: !1
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

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
        this.getIntegral()
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
    getIntegral() {
        getIntegra({
            page: this.data.page,
            pageSize: 20
        }).then(res => {
            console.log(res)
            if (res.code === 0) {
              if (res.data.data.length > 0) {
                this.setData({
                  recordList: [...this.data.recordList, ...res.data.data],
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
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
      this.getIntegral()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})