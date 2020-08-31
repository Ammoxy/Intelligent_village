// pages/personal/school/school/school.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    toSchool() {
        wx.navigateTo({
          url: '../school-info/school-info',
        })
    }
})