let alert = require('../../../model/alert/alert')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        alertList: [],
        show_mark: false, // 显示遮罩

        danger_href: '', // 人脸照片
        log_image: '', // 抓拍原图
        catch_face_img: '', // 抓拍照片
        address: '', // 出现地址

        handle_mark: false, // 操作处理遮盖
        id: '', // 处理告警获取的id
        remark: '', // 备注

        showPage: false, // 显示分页
        page: 1, // 分页
        total: 0, // 总数
        preBtn: false, // 禁用分页
        nextBtn: false, // 禁用分页
        inpPage: '', // 前往几页
    },

    onLoad: function (options) {
        if (wx.getStorageSync('token')) {
            wx.showToast({
                title: '加载中',
                icon: 'loading',
                duration: 10000
            })
            this.setData({
                showPage: true
            })
            this.getAlers();
        } else {
            wx.showToast({
                title: '请先登录',
                icon: 'none',
                duration: 2000
            })
            this.setData({
                showPage: false
            })
        }
    },

    onShow: function () {

    },
    // 刷新
    refresh() {
        this.getAlers();
    },

    // 查看详情
    showDetail(e) {
        console.log(e)
        this.setData({
            show_mark: true,
            danger_href: e.currentTarget.dataset.dangerhref ? e.currentTarget.dataset.dangerhref : '', // 人脸照片
            log_image: e.currentTarget.dataset.logimage ? e.currentTarget.dataset.logimage : '', // 抓拍原图
            catch_face_img: e.currentTarget.dataset.catchfaceimg ? e.currentTarget.dataset.catchfaceimg : '', // 抓拍照片
            address: e.currentTarget.dataset.address ? e.currentTarget.dataset.address : '' // 出现地址
        })
    },
    // 人脸库照片预览
    dangerHrefPreview(e) {
        let self = this;
       
        wx.previewImage({
            current: self.data.danger_href, // 当前显示图片的http链接
            urls: [self.data.danger_href] // 需要预览的图片http链接列表
        })
    },
    // 图片预览
    preview(e) {
        let self = this;
        wx.previewImage({
            current: self.data.log_image, // 当前显示图片的http链接
            urls: [self.data.danger_href, self.data.log_image] // 需要预览的图片http链接列表
        })
        console.log([self.data.log_image, self.data.danger_href])

    },
    // 抓拍照片预览
    catchFaceImgPreview(e) {
        let self = this;
        wx.previewImage({
            current: self.data.catch_face_img, // 当前显示图片的http链接
            urls: [self.data.catch_face_img] // 需要预览的图片http链接列表
        })
    },
    // 关闭查看详情
    close() {
        this.setData({
            show_mark: false
        })
    },

    // 打开处理告警
    handle(e) {
        this.setData({
            handle_mark: true,
            id: e.currentTarget.dataset.id
        })
    },

    // 关闭处理
    closeHandle() {
        this.setData({
            handle_mark: false
        })
    },

    // 处理告警
    handleAlert(e) {
        let self = this;
        console.log(e)
        wx.showToast({
            title: '提交中',
            icon: 'none'
        })
        alert.handleAlert(e.detail.value.remark, self.data.id, wx.getStorageSync('token')).then(res => {
            wx.showToast({
                title: '提交成功',
                icon: 'none',
                success: (res) => {
                    setTimeout(() => {
                        self.getAlers();
                        self.setData({
                            handle_mark: false
                        })
                    }, 2000)
                }
            })
        })
    },

    getAlers() {
        alert.getAlers(1, 10, 1).then(res => {
            this.setData({
                alertList: res.data.data,
                total: parseInt(res.data.total / 10 + 1),
                page: 1,
                inpPage: 1
            })
            this.banNext(this.data.total); // 判断下一页按钮使用与否
            this.banPre(); // 页数为1上一页禁用
            if (res.data.total == 0) {
                wx.hideTabBarRedDot({
                    index: 0
                })
            } else if (res.data.total >= 1 && res.data.total <= 99) {
                wx.setTabBarBadge({
                    index: 0,
                    text: res.data.total.toString()
                })
            } else {
                wx.setTabBarBadge({
                    index: 0,
                    text: '99+'
                })
            }
        })
    },

    // 对比照片
    tocContrast(e) {
        wx.navigateTo({
            url: '../contrast/contrast?contrastDangerHref=' + e.currentTarget.dataset.contrastdangerhref + "&contrastLogImage=" + e.currentTarget.dataset.contrastlogimage
        })
    },


    // 上一页
    prePage() {
        let self = this;
        self.data.page = --self.data.page;
        self.setData({
            page: self.data.page,
            nextBtn: false
        })
        wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 10000
        })
        alert.getAlers(self.data.page, 10, 1).then(res => {
            self.setData({
                alertList: res.data.data,
                total: parseInt(res.data.total / 10 + 1),
                inpPage: self.data.page
            })

        })
        if (self.data.page == 1) {
            self.setData({
                preBtn: true
            })
        }
    },
    // 下一页
    nextPage() {
        let self = this;
        self.data.page = ++self.data.page;
        self.setData({
            page: self.data.page,
            preBtn: false
        })

        wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 10000
        })
        alert.getAlers(self.data.page, 10, 1).then(res => {
            self.setData({
                alertList: res.data.data,

                total: parseInt(res.data.total / 10 + 1),
                inpPage: self.data.page
            })
            self.banNext(self.data.total); // 判断下一页按钮使用与否
        })
    },
    // 前往几页
    toPage(e) {
        console.log(e)
        let self = this;
        self.setData({
            inpPage: e.detail.value
        });
        if (self.data.inpPage >= 1 && self.data.inpPage <= self.data.total) {
            wx.showToast({
                title: '加载中',
                icon: 'loading',
                duration: 10000
            })
            if (self.data.inpPage == 1) {
                self.setData({
                    preBtn: true
                })
            } else {
                self.setData({
                    preBtn: false
                })
            }
            if (self.data.inpPage == self.data.total) {
                self.setData({
                    nextBtn: true
                })
            }
            alert.getAlers(self.data.inpPage, 10, 1).then(res => {
                self.setData({
                    alertList: res.data.data,
                    total: parseInt(res.data.total / 10 + 1),
                    page: self.data.inpPage
                })
                self.banNext(self.data.total); // 判断上下一页按钮使用与否
            })
        } else {
            wx.showToast({
                title: '请输入1到' + self.data.total + '之间的页数',
                icon: 'none',
                duration: 2000
            })
        }
    },

    // 如果page 跟 total/10+1相等，下一页按钮就禁用
    banNext(val) {
        let self = this;
        if (self.data.page == val) {
            self.setData({
                nextBtn: true
            })
        } else {
            self.setData({
                nextBtn: false
            })
        }
    },

    // 页数为1，上一页禁用
    banPre(val) {
        let self = this;
        if (self.data.page == 1) {
            self.setData({
                preBtn: true
            })
        } else {
            self.setData({
                preBtn: false
            })
        }
    },



})