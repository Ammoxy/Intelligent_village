// pages/personal/school/school-student/school-student.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    toStudentInfo() {
        wx.navigateTo({
            url: '../school-student-info/school-student-info',
        })
    },
    toInOutLogs() {
        wx.navigateTo({
            url: '../school-student-inout/school-student-inout',
        })
    }
})