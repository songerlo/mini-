// components/shop-item.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goodsItem: {
      type: Object
    },
    goodsIndex: {
      type: Number
    }
  },
  externalClasses: !0,
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    goGoodsDetails(e) {
      app.navigateTo({
        url: `/pages/goodsDetail/goodsDetail?id=${e.currentTarget.dataset.id}`
      })
    }
  },
  created() {},
})