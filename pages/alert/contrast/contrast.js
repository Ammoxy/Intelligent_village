// pages/alert/contrast/contrast.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        contrastDangerHref: '',
        contrastLogImage: '',
        scale: 1,
        scale1: 1

    },

    onLoad: function (options) {
        this.setData({
            contrastDangerHref: options.contrastDangerHref,
            contrastLogImage: options.contrastLogImage
        });
    },
})