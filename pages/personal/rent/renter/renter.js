// pages/personal/rent/renter/renter.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    toUser() {
        wx.navigateTo({
            url: '../renter-info/renter-info',
        })
    },
    toInOutLogs() {
        wx.navigateTo({
            url: '../renter-inout/renter-inout',
        })
    }
})