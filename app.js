//app.js
App({
  onLaunch: function () {
    let uid = wx.getStorageSync('uid') || '';
    if (!uid) {
      this.navigateTo({
        url: '/pages/authorize/telephone'
      })
    }
    
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    isSelectAddress: !1,
    address: null
  },
  canNavigateTo: !0,
  navigateTo (t) {
    if (this.canNavigateTo){
      this.canNavigateTo = !1;
      wx.navigateTo({
        url: t.url,
        success: (res) => {
          if (Reflect.has(t, 'success'))t.success();
          setTimeout(() => {
            this.canNavigateTo = !0
          },300)
        },
        fail: (res) => {
          if (Reflect.has(t, 'fail')) t.fail();
        },
      })
    }
  },
  api: require("/api/index.js"),
  
})