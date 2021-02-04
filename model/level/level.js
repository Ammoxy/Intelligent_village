var api = require('../../api/index')

var level = {}

// 获取辖区列表
level.policeLevels = function(page, limit, level, parent_id) {
    return new Promise((resolve, reject) => {
        api.get(api.url.PoliceLevels, {
            page: page,
            limit: limit,
            level: level,
            parent_id: parent_id
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

module.exports = level;