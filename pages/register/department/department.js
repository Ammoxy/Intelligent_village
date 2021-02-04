let level = require('../../../model/level/level');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        departmentLevelList: [{
                title: '一级部门',
                name: 'first',
            },
            {
                title: '二级部门',
                name: 'second'
            },
            {
                title: '三级部门',
                name: 'third'
            },
            {
                title: '四级部门',
                name: 'fourth'
            }
        ],
        level_title: '', // 选择了部门等级
        level_name: '', // 选择了部门等级
        firstDepartmentList: [], // 一级部门
        first_title: '',
        secondDepartmentList: [], // 二级部门
        second_title: '',
        thirdDepartmentList: [], // 三级部门
        third_title: '',
        fourthDepartmentList: [], // 四级部门
        fourth_title: '',

        parent_id: '',
        department: '',
    },

    // 选择部门等级
    changeDepartmentLevel(e) {
        console.log(e)
        let self = this;
        self.setData({
            level_title: self.data.departmentLevelList[e.detail.value].title,
            level_name: self.data.departmentLevelList[e.detail.value].name,
            first_title: '',
            second_title: '',
            third_title: '',
            fourth_title: '',
        })
        level.policeLevels(1, 1000, 1, 1).then(res => {
            self.setData({
                firstDepartmentList: res.data.data
            })
        })
    },

    // 选择一级部门
    changeFirstDepartment(e) {
        console.log(e)
        let self = this;
        self.setData({
            first_title: self.data.firstDepartmentList[e.detail.value].title,
            parent_id: self.data.firstDepartmentList[e.detail.value].id,
            department: self.data.firstDepartmentList[e.detail.value].title
        })
        level.policeLevels(1, 1000, 2, self.data.parent_id).then(res => {
            self.setData({
                secondDepartmentList: res.data.data
            })
        })
    },

    // 选择二级部门
    changeSecondDepartment(e) {
        console.log(e)
        let self = this;
        self.setData({
            second_title: self.data.secondDepartmentList[e.detail.value].title,
            parent_id: self.data.secondDepartmentList[e.detail.value].id,
            department: self.data.secondDepartmentList[e.detail.value].title
        })
        level.policeLevels(1, 1000, 3, self.data.parent_id).then(res => {
            self.setData({
                thirdDepartmentList: res.data.data
            })
        })
    },

    // 选择三级部门
    changeThirdDepartment(e) {
        console.log(e)
        let self = this;
        self.setData({
            third_title: self.data.thirdDepartmentList[e.detail.value].title,
            parent_id: self.data.thirdDepartmentList[e.detail.value].id,
            department: self.data.thirdDepartmentList[e.detail.value].title
        })
        level.policeLevels(1, 1000, 4, self.data.parent_id).then(res => {
            self.setData({
                fourthDepartmentList: res.data.data
            })
        })
    },

    // 选择四级部门
    changeFourthDepartment(e) {
        console.log(e)
        let self = this;
        self.setData({
            fourth_title: self.data.fourthDepartmentList[e.detail.value].title,
            parent_id: self.data.fourthDepartmentList[e.detail.value].id,
            department: self.data.fourthDepartmentList[e.detail.value].title
        })
    },

    // 确定
    confirm(e) {
        let self = this;
        let pages = getCurrentPages();
        let prevPage = pages[pages.length - 2];
        prevPage.setData({
            department_id: self.data.parent_id,
            department: self.data.department
        })
        wx.navigateBack({
            delta: 1
        })
    }
})