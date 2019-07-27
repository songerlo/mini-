const request = require('../utils/request');
module.exports = {
  userState () {                           //用户信息状态
    return request({
      url: '/IntegralUser/user'
    })
  },
  userAddressList () {                     //用户地址列表
    return request({
      url: '/IntegralAddress/index'
    })
  }
}