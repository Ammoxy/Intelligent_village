var api = require('../../api/index')

var alert = {}

// 获取告警列表
alert.getAlers = function(page, limit, state) {
    return new Promise((resolve, reject) => {
        api.get(api.url.DangerAlerts, {
            page: page,
            limit: limit,
            state: state
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

// 处理告警
alert.handleAlert = function(remark, id, token) {
    return new Promise((resolve, reject) => {
        api.post(api.url.HandleAlert, {
            remark: remark,
            id: id,
            token: token
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

module.exports = alert;