// pages/integral/integral.js
import {
    integralLog
} from '../../api/order.js'
const app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        allList: [],
        allListPage: 1,
        incomeList: [],
        incomepPage: 1,
        outList: [],
        outPage: 1,
        active: 0,
        integral: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.loadOrdersList()
        this.setData({
            integral: getApp().globalData.userInfo.u_integral
        })
    },
    tabChange(e) {
        this.setData({
            active: e.detail.index
        })
        this.loadOrdersList();
    },
    loadOrdersList() {
        integralLog({
                type: this.data.active,
                page: this.data.active === 0 ? this.data.allListPage : this.data.active === 1 ? this.data.incomepPage : this.data.active === 2 ? this.data.outPage : -1,
                pageSize: 10
            })
            .then(res => {
                console.log(res)
                if (res.code === 0) {
                    if (res.data.data.length > 0) {
                        console.log(this.data.active)
                        switch (this.data.active) {
                            case 0:
                                this.setData({
                                    allList: [...this.data.allList, ...res.data.data],
                                    allListPage: this.data.allListPage + 1
                                })
                                break
                            case 1:
                                this.setData({
                                    incomeList: [...this.data.incomeList, ...res.data.data],
                                    incomepPage: this.data.incomepPage + 1
                                })
                                break
                            case 2:
                                this.setData({
                                    outList: [...this.data.outList, ...res.data.data],
                                    outPage: this.data.outPage + 1
                                })
                                break
                            default:
                                break;
                        }
                    }
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
        this.loadOrdersList()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },
    goRule() {
        app.navigateTo({
            url: '/pages/integral/rule'
        })
    }
})