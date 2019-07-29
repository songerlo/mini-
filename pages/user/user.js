// pages/user/user.js
const app = getApp()
const request = require('../../utils/request');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        app.globalData.userInfo.u_avatar = wx.getStorageSync('user_avatar')
        app.globalData.userInfo.nickName = wx.getStorageSync('nickName')
        this.setData({
                userInfo: app.globalData.userInfo,
            })
            // else if (this.data.canIUse) {
            //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            //   // 所以此处加入 callback 以防止这种情况
            //   app.userInfoReadyCallback = res => {
            //     this.setData({
            //       userInfo: res.userInfo,
            //       hasUserInfo: true
            //     })
            //   }
            // } else {
            //   // 在没有 open-type=getUserInfo 版本的兼容处理
            //   wx.getUserInfo({
            //     success: res => {
            //       app.globalData.userInfo = res.userInfo
            //       this.setData({
            //         userInfo: res.userInfo,
            //         hasUserInfo: true
            //       })
            //     }
            //   })
            // }
    },
    getUserInfo: function(e) {
        app.globalData.userInfo.u_avatar = e.detail.userInfo.avatarUrl
        app.globalData.userInfo.nickName = e.detail.userInfo.nickName
        wx.setStorageSync('user_avatar', e.detail.userInfo.avatarUrl)
        wx.setStorageSync('nickName', e.detail.userInfo.nickName)
        this.setData({
            userInfo: app.globalData.userInfo
        })
        this.getUserImg()
            // upload avatarUrl
    },
    getUserImg() {
        request({
            url: '/IntegralUser/saveUser',
            method: 'POST',
            data: {
                nickname: app.globalData.userInfo.nickName,
                avatar: app.globalData.userInfo.u_avatar
            }
        })
    },
    tapOrder: function(e) {
        const type = e.currentTarget.dataset.type
        app.navigateTo({
            url: '/pages/order/list?type=' + type
        })
    },
    tabAddress: function() {
        app.navigateTo({
            url: '/pages/address/list'
        })
    },
    tabRecode: function() {
        app.navigateTo({
            url: '/pages/recharge/recode'
        })
    },
    tabRecharge: function() {
        app.navigateTo({
            url: '/pages/recharge/index'
        })
    },
    tabUserActive() {
        app.navigateTo({
            url: '/pages/userActive/index'
        })
    },
    goHelp() {
        app.navigateTo({
            url: '/pages/help/help'
        })
    },
    goSend() {
        app.navigateTo({
            url: '/pages/sendIntegral/sendIntegral'
        })
    }
})