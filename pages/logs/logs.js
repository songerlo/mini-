//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    showPhoneConfirm: !0,
    list: [{
      id: 1,
      image: '/source/image/1.png',
      goodsName: '蒙牛  纯甄酸牛奶（200g*12盒）',
      goodsDesc: '纯正生牛乳 轻享慢发酵',
      goodsIntegral: 888,
      taobao: 98
    }, {
      id: 1,
      image: '/source/image/1.png',
      goodsName: '蒙牛  纯甄酸牛奶（200g*12盒）',
      goodsDesc: '纯正生牛乳 轻享慢发酵',
      goodsIntegral: 888,
      taobao: 98
    }]
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  hidePhoneConfirm() {
    this.setData({
      showPhoneConfirm: !1
    })
  }
})
