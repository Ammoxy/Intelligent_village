var address = require('../../../../model/address/address')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        proList: [], // 省级列表
        cityList: [], // 市级列表
        areaList: [], // 区级列表
        communityList: [], // 社区列表

        province: '',
        city: '',
        area: '',
        community: '',

        parent_id: 0, // 用于取地区值
        is_pro: '', // 选中省级
        is_city: '', // 选中市级
        is_area: '', // 选中区级
        is_community: '', // 选中社区
    },

    onLoad(options) {
        this.getPro();
        this.getCity();
        this.getArea()
    },

  


})