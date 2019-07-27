const request = require('../utils/request')
const base = require('./base')
const test = {
  jssdk() {
    return request({
      url: `http://rest-02.test.bxd365.com/html/influential/rankList?uid=1129627070&type=day&month=&page=1&pageSize=20&action=all`
    })
  }
}
module.exports = test