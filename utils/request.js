/**
 * @t Object
 * @t.url 请求地址 必填
 * @t.method 请求类型  选填 默认值 GET
 * @t.data 请求参数 选填
 * @t.success 请求成功回调 选填
 * @t.fail 请求失败回调 选填
 */
import config from './config'
module.exports = function (t) {
  wx.showLoading({
    title: 'loading...',
    mask: true
  })
  let _t = this
  t = Object.assign({
    method: 'GET',
    header: {},
    data: {}
  }, t)
  console.log(t)
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${config.hostUrl}${t.url}`,
      data: Object.assign(t.data, {
        token: wx.getStorageSync('token') || ''
      }),
      header: t.header,
      method: t.method,
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        
        if (res.statusCode == 200) {
          // if (t.success) t.success(res.data);
          if (res.data.code === 0) {
          } else if (res.data.code === 100) {
            wx.removeStorageSync('token')
            wx.reLaunch({
              url: '/pages/authorize/telephone',
            })
          } else {
            wx.showToast({
              icon: 'none',
              title: res.data.message,
              duration: 1500
            })
          }
          return resolve(res.data);
        } else {
          console.log(`%c${JSON.stringify(res)}`, 'color:yellow');
          return reject(res);
        }
      },
      fail: function(res) {
        if (config.debug) {
          wx.showModal({
            title: '提示',
            content: `url:${t.url}***data:${JSON.stringify(t.data)}***msg:${JSON.stringify(res)}`,
            showCancel: false,
            confirmText: '我知道了',
            confirmColor: "#DC143C"
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '你的网络开小差了',
            showCancel: false,
            confirmText: '我知道了',
            confirmColor: "#DC143C"
          })
        }
        if (t.fail) t.fail(res);
        console.log(`%c${JSON.stringify(res)}`, 'color:yellow');
        return reject(res);
      },
      complete: function() {
        wx.hideLoading()
      }
    })
  })
}