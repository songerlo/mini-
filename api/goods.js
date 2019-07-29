const request = require('../utils/request')
export function indexList() { //首页商品列表
    return request({
        url: '/IntegralIndex/index'
    })
}
export function goodsDetails(params) { //商品详情
    return request({
        url: '/IntegralGoods/detail',
        data: params
    })
}
export function goodsExchange(data) { //商品兑换页
    return request({
        url: '/IntegralOrder/exchange',
        data
    })
}
export function goodsShare(igm_id) { //商品分享
    return request({
        url: '/IntegralGoods/share',
        data: {
            igm_id
        }
    })
}
export function chkStock(data) { //商品库存校验
    return request({
        url: '/IntegralGoods/chkStock',
        data
    })
}
export function createOrder(parma) { //生成商品订单
    return request({
        url: '/IntegralOrder/create',
        method: 'POST',
        data: parma,
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    })
}
export function moduleList(parma) { //商品模块
    return request({
        url: '/IntegralGoods/index',
        data: {
            ...parma
        }
    })
}
export function doPay(data) { //积分消耗
    return request({
        url: '/IntegralOrder/doPay',
        data,
        method: 'POST'
    })
}

export function getTransfer(data) {
    return request({
        url: '/IntegralUser/getTransfer',
        data,
        method: 'POST'
    })
}