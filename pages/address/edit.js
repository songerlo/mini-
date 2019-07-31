// pages/address/edit.js
import { addAddress, addressDetail, addressEdit, addressDelete } from '../../api/user.js'
import temp from '../../utils/area.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        name: '',
        phone: '',
        address: '',
        area: '',
        region: [],
        checked: false,
        slot: true,
        // show: false,
        // areaList: areaList2,
        areaValue: '',
        // areaList1: areaList1
        provinces: temp,
        multiArray: [temp, temp[0].citys, temp[0].citys[0].areas],
        multiIndex: [0, 0, 0],
        provinceCode: 0,
        cityCode: 0,
        areaCode: 0,
        showDelete: !1
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        if (Reflect.has(options, 'aid')) {
            this.aid = options.aid
            this.setData({
                showDelete: !0
            })
            this.initData(options.aid)
        }
    },
    async initData(a_id) {
        const res = await addressDetail({
            a_id
        })
        if (res.code === 0) {
            this.name = res.data.name
            this.address = res.data.address
            this.phone = res.data.phone
            this.setData({
                name: res.data.name,
                address: res.data.address,
                phone: res.data.phone,
                checked: res.data.is_default === 1,
                provinceCode: res.data.province,
                cityCode: res.data.city,
                areaCode: res.data.area,
                area: res.data.province_name + res.data.city_name + res.data.area_name,
                areaValue: res.data.area + ''
            })
        }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },
    async addAddress() {
        if (this.data.showDelete) {
            const res = await addressEdit({
                a_id: this.aid,
                name: this.name,
                phone: this.phone,
                province: this.data.provinceCode,
                city: this.data.cityCode,
                area: this.data.areaCode,
                address: this.address,
                is_default: this.data.checked ? 1 : 0
            })
            if (res.code === 0) {
                wx.showToast({
                    title: '编辑成功'
                })
                setTimeout(() => {
                    wx.navigateBack({
                        delta: 1
                    })
                }, 500)
            }
        } else {
            const res = await addAddress({
                name: this.name,
                phone: this.phone,
                province: this.data.provinceCode,
                city: this.data.cityCode,
                area: this.data.areaCode,
                address: this.address,
                is_default: this.data.checked ? 1 : 0
            })
            if (res.code === 0) {
                wx.showToast({
                    title: '添加成功'
                })
                setTimeout(() => {
                    wx.navigateBack({
                        delta: 1
                    })
                }, 500)
            }
        }

    },
    bindRegionChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail)
        this.setData({
            multiIndex: e.detail
        })
        this.update()
    },
    switchOnChange(e) {
        console.log(e)
        this.setData({
            checked: !this.data.checked
        })
    },
    showArea() {
        this.setData({
            show: !0
        })
    },
    areaConfirm(e) {
        console.log(e.detail.values)
        this.setData({
            region: e.detail.values,
            area: `${e.detail.values[0].name}${e.detail.values[1].name}${e.detail.values[2].name}`,
            show: !1
        })
    },
    onClose() {
        this.setData({
            show: !1
        })
    },
    onChange(e) {
        console.log(e)
        if (e.currentTarget.dataset.type === 'name') {
            this.name = e.detail
        } else if (e.currentTarget.dataset.type === 'phone') {
            this.phone = e.detail
        } else if (e.currentTarget.dataset.type === 'address') {
            this.address = e.detail
        }
    },
    bindMultiPickerChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            multiIndex: e.detail.value
        })
        this.update()
    },
    //滑动
    bindMultiPickerColumnChange: function(e) {
        console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
        var data = {
            multiArray: this.data.multiArray,
            multiIndex: this.data.multiIndex
        };
        //更新滑动的第几列e.detail.column的数组下标值e.detail.value
        data.multiIndex[e.detail.column] = e.detail.value;
        //如果更新的是第一列“省”，第二列“市”和第三列“区”的数组下标置为0
        if (e.detail.column == 0) {
            data.multiIndex = [e.detail.value, 0, 0];
        } else if (e.detail.column == 1) {
            //如果更新的是第二列“市”，第一列“省”的下标不变，第三列“区”的数组下标置为0
            data.multiIndex = [data.multiIndex[0], e.detail.value, 0];
        } else if (e.detail.column == 2) {
            //如果更新的是第三列“区”，第一列“省”和第二列“市”的值均不变。
            data.multiIndex = [data.multiIndex[0], data.multiIndex[1], e.detail.value];
        }
        var temp = this.data.provinces;
        data.multiArray[0] = temp;
        if ((temp[data.multiIndex[0]].citys).length > 0) {
            //如果第二列“市”的个数大于0,通过multiIndex变更multiArray[1]的值
            data.multiArray[1] = temp[data.multiIndex[0]].citys;
            var areaArr = (temp[data.multiIndex[0]].citys[data.multiIndex[1]]).areas;
            //如果第三列“区”的个数大于0,通过multiIndex变更multiArray[2]的值；否则赋值为空数组
            data.multiArray[2] = areaArr.length > 0 ? areaArr : [];
        } else {
            //如果第二列“市”的个数不大于0，那么第二列“市”和第三列“区”都赋值为空数组
            data.multiArray[1] = [];
            data.multiArray[2] = [];
        }
        //data.multiArray = [temp, temp[data.multiIndex[0]].citys, temp[data.multiIndex[0]].citys[data.multiIndex[1]].areas];
        //setData更新数据
        this.setData(data);
        this.update()
    },
    update() {
        console.log(111)
        this.setData({
            area: this.data.multiArray[0][this.data.multiIndex[0]].name + this.data.multiArray[1][this.data.multiIndex[1]].name + this.data.multiArray[2][this.data.multiIndex[2]].name,
            provinceCode: this.data.multiArray[0][this.data.multiIndex[0]].code,
            cityCode: this.data.multiArray[1][this.data.multiIndex[1]].code,
            areaCode: this.data.multiArray[2][this.data.multiIndex[2]].code
        })
    },
    deleteAdress() {
        wx.showModal({
            title: '提示',
            content: '是否删除收货地址',
            showCancel: true,
            success: (res) => {
                if (res.confirm) {
                    addressDelete({
                            a_id: this.aid
                        })
                        .then(res => {
                            if (res.code === 0) {
                                wx.showToast({
                                    title: '删除成功',
                                    duration: 1200
                                })
                                setTimeout(() => {
                                    wx.navigateBack({
                                        delta: 1
                                    })
                                }, 700)
                            }
                        })
                }
            },
            fail: function(res) {},
            complete: function(res) {},
        })
    }
})