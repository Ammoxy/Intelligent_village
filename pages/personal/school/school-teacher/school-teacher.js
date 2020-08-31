// pages/personal/school/school-teacher/school-teacher.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    toTeacherInfo() {
        wx.navigateTo({
            url: '../school-teacher-info/school-teacher-info',
        })
    },
    toInOutLogs() {
        wx.navigateTo({
            url: '../school-teacher-inout/school-teacher-inout',
        })
    }
})