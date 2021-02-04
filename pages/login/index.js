let user = require('../../model/user/user')
let reg = require('../../utils/reg')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        username: '',
        password: '',
        scp: 0, // 重新登录后返回的页面
        curLogin: 1, // 切换tab
        phone: '', // 手机号
        area: '+86', // 区号
        code: '', // 验证码
        codeTxt: '发送验证码',
        count: 60, // 倒计时60s
        disBtn: false
    },
    onLoad(opt) {
        if (this.data.scp) {
            this.setData({
                scp: opt.scp
            })
        }
    },

    login(e) {
        console.log(e)
        var self = this;
        self.setData({
            username: e.detail.value.username,
            password: e.detail.value.password
        })
        wx.showToast({
            title: '请求中',
            icon: 'loading'
        })
        if (self.data.username) {
            user.login(self.data.username, self.data.password).then(res => {
                // 存储token
                wx.setStorageSync('token', res.data);
                //跳转首页
                if (self.data.scp) {
                    wx.navigateBack({
                        delta: self.data.scp
                    })
                } else {
                    wx.reLaunch({
                        url: "/pages/personal/index/index"
                    })
                }
            })
        } else {
            wx.showToast({
                title: '请填写信息',
                icon: 'none'
            })
        }
    },

    toRegister() {
        wx.navigateTo({
            url: '/pages/register/index',
        })
    },

    // 切换登录方式
    loginType(e) {
        let self = this;
        if (self.data.curLogin === e.target.dataset.curlogin) {
            return false;
        } else {
            self.setData({
                curLogin: e.currentTarget.dataset.curlogin
            })
        }
    },

    // 请求验证码
    bindCode(e) {
        let self = this;
        if (reg.phone(e.detail.value.phone) == true) {
            this.data.phone = this.data.phone + e.detail.value.phone;
            this.setData({
                phone: this.data.phone
            })
        } else {
            wx.showToast({
                title: '请输入正确的手机号',
                icon: 'none',
                duration: 2000
            });
            return false
        }

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
    },

    // 验证码登录
    codeLogin(e) {
        console.log(e)
        var self = this;
        self.setData({
            phone: e.detail.value.phone,
            code: e.detail.value.code
        })
        wx.showToast({
            title: '请求中',
            icon: 'loading'
        })
        if (self.data.phone && self.data.code) {
           
        } else {
            wx.showToast({
                title: '请补充完整信息',
                icon: 'none'
            })
        }
    },

    // 跳转忘记密码
    toForget() {
        wx.navigateTo({
          url: '../forget/phone/phone',
        })
    }
})