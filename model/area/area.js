var api = require('../../api/index')

var area = {}

// 获取辖区列表
area.policeStations = function(page, limit) {
    return new Promise((resolve, reject) => {
        api.get(api.url.PoliceStations, {
            page: page,
            limit: limit
        }, function (response) {
            if (response.msg === 'ok') {
                var res = response.data;
                resolve(res);
            } else {
                reject(response);
            }
        })
    })
}

module.exports = area;