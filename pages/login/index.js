// pages/login/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        username: 'admin',
        password: '123456',
        scp: 0 // 重新登录后返回的页面
    },
    onLoad(opt) {
        if(this.data.scp) {
            this.setData({
                scp: opt.scp
            })
        }
    },
    login(e) {
        var self = this;
        console.log(e)
        //跳转首页
        if (self.data.scp) {
            debugger;
            wx.navigateBack({
              delta: self.data.scp
            })
          } else {
            wx.reLaunch({
              url: "/pages/personal/index/index"
            })
          }
    }
})