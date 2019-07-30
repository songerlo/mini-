const request = require('../utils/request');
export function orderList(data) {                                 
  return request({
    url: '/IntegralOrder/orderList',
    method: 'POST',
    data
  })
}
export function orderDetail(data) {                                
  return request({
    url: '/IntegralOrder/orderDetail',
    method: 'POST',
    data
  })
}
export function transfer(data) {                            
  return request({
    url: '/IntegralUser/transfer',
    method: 'POST',
    data
  })
}

export function integralLog(data) {
  return request({
    url: '/IntegralUser/integralLog',
    method: 'POST',
    data
  })
}
export function doFinish(data) {
  return request({
    url: '/IntegralOrder/doFinish',
    method: 'POST',
    data
  })
}


export function recharge(data) {
  return request({
    url: '/integraluser/recharge',
    method: 'POST',
    data
  })
}
