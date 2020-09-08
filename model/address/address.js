var api = require('../../api/index')

var address = {}

// 获取辖区列表
address.stationRelations = function(token, station_id, type) {
    return new Promise((resolve, reject) => {
        api.get(api.url.StationRelations, {
            token: token,
            station_id: station_id,
            type: type
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

module.exports = address;