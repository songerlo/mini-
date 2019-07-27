// components/address-item/address-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    addressItem: {
      type: Object,
      default: {}
    },
    select: {
      type: Boolean,
      default: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    tapEdit (e) {
      getApp().navigateTo({
        url: `/pages/address/edit?aid=${e.currentTarget.dataset.aid}`
      })
    },
    tapAddress () {
      console.log('tapAddress')
      if (this.data.select) {
        console.log(this.data)
        getApp().globalData.address = this.data.addressItem
        wx.navigateBack({
          delta: 1
        })
      }
    }
  }
})
