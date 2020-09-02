// pages/login/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        username: '',
        password: '',
        scp: 0 // 重新登录后返回的页面
    },
    onLoad(opt) {
        if (this.data.scp) {
            this.setData({
                scp: opt.scp
            })
        }
    },
    nameInput(e) {
        this.data.username = e.detail.value;
    },
    passwordInput(e) {
        this.data.password = e.detail.value
    },
    login(e) {
        var self = this;
        console.log(e)
        //跳转首页
        if (self.data.scp) {
            wx.navigateBack({
                delta: self.data.scp
            })
        } else {
            if (this.data.username && this.data.password) {
                wx.setStorageSync('name', this.data.username);
                wx.setStorageSync('number', this.data.username)
                wx.reLaunch({
                    url: "/pages/personal/index/index"
                })
            } else {
                wx.showToast({
                    title: '请填写信息',
                    icon: 'none'
                })
            }
        }
    },

    toRegister() {
        wx.navigateTo({
            url: '/pages/register/index',
        })
    }
})