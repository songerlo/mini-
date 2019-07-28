const request = require('../utils/request');
export function userState() {                           //用户信息状态
  return request({
    url: '/IntegralUser/user'
  })
}
export function userAddressList(data) {
  return request({
    url: '/IntegralAddress/index',
    data
  })
}

// 用户添加收货地址
export function addAddress(data) {
  return request({
    url: '/IntegralAddress/add',
    data
  })
}

// 用户收货地址详情
export function addressDetail(data) {
  return request({
    url: '/IntegralAddress/detail',
    data
  })
}

// 用户编辑收货地址
export function addressEdit(data) {
  return request({
    url: '/IntegralAddress/edit',
    data
  })
}
// 用户删除收货地址
export function addressDelete(data) {
  return request({
    url: '/IntegralAddress/delete',
    data
  })
}
