/**
 * @props showPhoneConfirm 显示隐藏
 * @method hidePhoneConfirm 隐藏
 */
import { sendCode } from '../../api/verify.js'
Component({
  properties: {
    showPhoneConfirm: {
      type: Boolean,
      value: !1
    },
    phoneNum: {
      type: String,
      value: ''
    }
  },
  options: {
    addGlobalClass: true,
  },
  data: {
    phoneCode: "",
    ifCode: !1,
    confirmLoading: !1,
    time : 60,
    canSendCode: !0
  },
  methods: {
    input (e) {
      this.setData({
        phoneCode: e.detail.value
      })
    },
    getCode (e) {
      if (!this.data.canSendCode) {
        return
      }
      this.setData({
        confirmLoading: !0
      })
        sendCode()
          .then(res => {
            this.setData({
              confirmLoading: !1
            })
            if (res.code == 0) {
              this.setData({
                canSendCode: !1,
                ifCode: !0
              })
              wx.showToast({
                title: '验证码发送成功'
              })
              setInterval(() => {
                this.setData({
                  time:this.data.time - 1
                })
                if (this.data.time == 0) {
                  this.setData({
                    canSendCode: !0
                  })
                }
              }, 1000)
            } else {
              wx.showToast({
                title: res.message,
                icon: 'none'
              })
            }
            console.log(res)
          })
    },
    codeConfirm (e) {
      if (!this.data.ifCode) {
        wx.showToast({
          title: '请先获取验证码',
          icon: 'none'
        })
        return;
      }
      this.triggerEvent('hidePhoneConfirm', { code: this.data.phoneCode})
      
    },
    hide(){
      this.triggerEvent('hidePhoneConfirm', {})
    }
  },
  created() {
    // this.init()
  }
});