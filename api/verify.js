const request = require('../utils/request');
module.exports = {
  sendCode () {                                 //发送验证码
    return request ({
      url: '/IntegralOrder/sendCode',
      method: 'POST'
    })
  },
  verifyCode (code) {                           //验证验证码
    return request({
      url: '/IntegralOrder/verifyCode',
      method: 'POST',
      data: {
        code
      }
    })
  },
  veriryVip(vip_code) {
    return request({
      url: '/IntegralUser/toVip',
      method: 'POST',
      data: {
        vip_code
      }
    })
  }
}