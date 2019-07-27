const request = require('../utils/request');
export function sendCode() {                                 //发送验证码
  return request({
    url: '/IntegralOrder/sendCode',
    method: 'POST'
  })
}
// export function verifyCode(code) {                           //验证验证码
//   return request({
//     url: '/IntegralOrder/verifyCode',
//     method: 'POST',
//     data: {
//       code
//     }
//   })
// }
export function veriryVip(vip_code) {
  return request({
    url: '/IntegralUser/toVip',
    method: 'POST',
    data: {
      vip_code
    }
  })
}

export function doPay(data) {
  return request({
    url: '/IntegralOrder/doPay',
    method: 'POST',
    data
  })
}
