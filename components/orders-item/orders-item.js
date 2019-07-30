// components/orders-item/orders-item.js
const request = require('../../utils/request');
import { doFinish } from '../../api/order.js'
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        params: {
            type: Object,
            value: {}
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
        seeOrderDetail() {
            getApp().navigateTo({
                url: `/pages/order/detail?orderSn=${this.data.params.orderSn}`
            })
        },
        cancelOrder() {
            request({
                methods: "POST",
                url: '/IntegralOrder/doCancel',
                data: {
                    order_sn: this.properties.params.orderSn
                }
            }).then(res => {
                if (res.code === 0) {
                  this.triggerEvent('update', {
                    
                    orderStatus: 4
                  })
                }
            })
        },
        exchange() {
          this.triggerEvent('exchange', {
            orderSn: this.data.params.orderSn
          })
        },
        confirm() {

        }
    },

})