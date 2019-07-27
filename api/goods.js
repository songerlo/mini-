const request = require('../utils/request')
module.exports = {
  indexList () {                                 //首页商品列表
    return request({
      url: '/IntegralIndex/index'
    })
  },
  goodsDetails (g_id) {                           //商品详情
    return request({
      url: '/IntegralGoods/detail',
      data: { g_id }
    })
  },
  goodsExchange (g_id, num) {                     //商品兑换页
    return request({
      url: '/IntegralOrder/exchange',
      data:{
        g_id,
        num
      }
    })
  },
  goodsShare (g_id) {                             //商品分享
    return request({
      url: '/IntegralGoods/share',
      data: {
        g_id
      }
    })
  },
  chkStock (g_id, num) {                          //商品库存校验
    return request({
      url: '/IntegralGoods/chkStock',
      data: {
        g_id,
        num
      }
    })
  },
  createOrder (parma) {                            //生成商品订单
    return request({
      url: '/IntegralOrder/create',
      data: {...parma}
    })
  },
  moduleList (parma) {                              //商品模块
    return request({
      url: '/IntegralGoods/index',
      data: { ...parma }
    })
  },
  doPay(io_sn) {                                    //积分消耗
    return request({
      url: '/IntegralOrder/doPay',
      data: {io_sn},
      method: 'POST'
    })
  }
}