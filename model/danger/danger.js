var api = require('../../api/index')

var danger = {}

// 获取可疑人脸
danger.dangerFace = function(token, page, limit) {
    return new Promise((resolve, reject) => {
        api.get(api.url.PoliceDangerFaces, {
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

// 获取可疑人脸抓拍记录
danger.dangerFaceLogs = function(token, page, limit, danger_id) {
    return new Promise((resolve, reject) => {
        api.get(api.url.PoliceDangerFaceLogs, {
            token: token,
            page: page,
            limit: limit,
            danger_id: danger_id
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

module.exports = danger;