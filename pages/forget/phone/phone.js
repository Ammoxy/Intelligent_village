let user = require('../../../model/user/user')
let reg = require('../../../utils/reg')

Page({

    data: {
        password: '',
        confirm_password: '',
        phone: '', // 手机号
        area: '+86', // 区号
        code: '', // 验证码
        codeTxt: '发送验证码',
        count: 60, // 倒计时60s
        disBtn: false
    },

    // 请求验证码
    getCode(e) {
        let self = this;
        if (reg.phone(e.detail.value.phone) == true) {
            user.code(e.detail.value.phone).then(res => {
                console.log(res)
                wx.showToast({
                    icon: "none",
                    title: '发送成功',
                    success: function (res) {
                        var timer = setInterval(function () {
                            if (self.data.count > 0) {
                                self.setData({
                                    count: self.data.count - 1,
                                    codeTxt: '剩余' + (self.data.count - 1) + '秒',
                                    disBtn: true
                                });
                            } else {
                                clearInterval(timer);
                                self.setData({
                                    count: 60,
                                    codeTxt: '获取验证码',
                                    disBtn: false
                                });
                            };
                        }, 1000)
                    }
                });
            })
        } else {
            wx.showToast({
                title: '请输入正确的手机号',
                icon: 'none',
                duration: 2000
            });
            return false
        }


    },

    // 重置密码
    resetPwd(e) {
        console.log(e)
        var self = this;
        if (e.detail.value.password != e.detail.value.confirm_password) {
            wx.showToast({
                title: '两次密码不一致',
                icon: 'none'
            });
            return false;
        }
        self.setData({
            phone: e.detail.value.phone,
            code: e.detail.value.code,
            password: e.detail.value.password,
            confirm_password: e.detail.value.confirm_password
        })
        wx.showToast({
            title: '请求中',
            icon: 'loading'
        })
        if (self.data.phone && self.data.code && self.data.password && self.data.confirm_password) {
            user.resetPassword(e.detail.value.phone, e.detail.value.code, e.detail.value.password, e.detail.value.confirm_password).then(res => {
                wx.showToast({
                    title: '修改成功',
                    success: (res) => {
                        setTimeout(() => {
                            wx.reLaunch({
                                url: '/pages/login/index',
                            })
                        }, 2000)
                    }
                })

            })
        } else {
            wx.showToast({
                title: '请补充完整信息',
                icon: 'none'
            })
        }
    },


    // 重置密码
    resetPassword(e) {
        let self = this;
        console.log(e)
        user.code(e.detail.value.code, e.detail.value.password, e.detail.value.phone).then(res => {
            console.log(res)
        })
    }
})