/**
  * api接口的统一出口
  */
const goodsApi = require('./goods.js');
const verifyApi = require('./verify.js');
const userApi = require('./user.js');
// 导出
module.exports = {
  goodsApi,
  verifyApi,
  userApi
}