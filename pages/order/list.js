// pages/order/list.js
import {
    orderList
} from '../../api/order.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        active: 0,
        allList: [],
        allListPage: 1,
        awaitUseList: [],
        awaitUsePage: 1,
        awaitSendList: [],
        awaitSendPage: 1,
        awaitReceiveList: [],
        awaitReceivePage: 1,
        cancleList: [],
        canclePage: 1,
        stocksList: [],
        stocksPage: 1
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            active: +options.type
        })
        this.loadOrdersList()
    },
    loadOrdersList: function() {
        orderList({
                status: this.data.active,
                page: this.data.active === 0 ?
                    this.data.allListPage : this.data.active === 1 ?
                    this.data.awaitUsePage : this.data.active === 2 ?
                    this.data.awaitSendPage : this.data.active === 3 ?
                    this.data.stocksPage : this.data.active === 4 ?
                    this.data.awaitReceivePage : this.data.active === 5 ?
                    this.data.canclePage : -1,
                pageSize: 20
            })
            .then(res => {
                console.log(res)
                if (res.code === 0) {
                    if (res.data.data.length > 0) {
                        switch (this.data.active) {
                            case 0:
                                this.setData({
                                    allList: [...this.data.allList, ...res.data.data],
                                    allListPage: this.data.allListPage + 1
                                })
                                break
                            case 1:
                                this.setData({
                                    awaitUseList: [...this.data.awaitUseList, ...res.data.data],
                                    awaitUsePage: this.data.awaitUsePage + 1
                                })
                                break
                            case 2:
                                this.setData({
                                    awaitSendList: [...this.data.awaitSendList, ...res.data.data],
                                    awaitSendPage: this.data.awaitSendPage + 1
                                })
                                break
                            case 3:
                                this.setData({
                                    awaitReceiveList: [...this.data.awaitReceiveList, ...res.data.data],
                                    awaitReceivePage: this.data.awaitReceivePage + 1
                                })
                                break
                            case 4:
                                this.setData({
                                    stocksList: [...this.data.stocksList, ...res.data.data],
                                    stocksPage: this.data.stocksPage + 1
                                })
                                break
                            case 5:
                                this.setData({
                                    cancleList: [...this.data.cancleList, ...res.data.data],
                                    canclePage: this.data.canclePage + 1
                                })
                                break
                            default:
                                break
                        }
                    }
                }
            })
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        this.loadOrdersList()
    },
    tabChange(e) {
        this.setData({
            active: e.detail.index
        })
        this.loadOrdersList();
    }
})