// pages/personal/school/school-info/school-info.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    toTeacher() {
        wx.navigateTo({
          url: '../school-teacher/school-teacher',
        })
    },
    toStudent() {
        wx.navigateTo({
          url: '../school-student/school-student',
        })
    }
})