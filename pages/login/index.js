let user = require('../../model/user/user')
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

    login(e) {
        var self = this;
        this.setData({
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
    }
})