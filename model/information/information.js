var api = require('../../api/index')

var info = {}

// 获取辖区列表
info.information = function(token, page, limit) {
    return new Promise((resolve, reject) => {
        api.get(api.url.Information, {
            token: token,
            page: page,
            limit: limit
        }, function (response) {
            if (response.msg === 'ok') {
                var res = response;
                resolve(res);
            } else {
                reject(response);
            }
        })
    })
}

module.exports = info;