
const {omitBy, isUndefined} = require('lodash');

/**
 *
 */
class UserApi {
  /**
   *
   * @param {object} http
   */
  constructor(http) {
    this.http = http;
  }
  /**
   *
   * @param {string} userId
   * @param {string} agentId
   */
  async convertToOpenId(userId, agentId) {
    const data = {
      userid: userId,
      agentid: agentId,
    };
    return this.http.post('/cgi-bin/user/convert_to_openid', {data: omitBy(data, isUndefined)});
  }
  /**
   *
   * @param {string} openId
   */
  async convertToUserId(openId) {
    const data = {openid: openId};
    return this.http.post('/cgi-bin/user/convert_to_userid', {data});
  }
  /**
   *
   * @param {string} userId
   * @param {string} fullName
   * @param {string} departments
   * @param {string} weChatId
   * @param {string} mobile
   * @param {string} email
   */
  async create(userId, fullName, departments, weChatId, mobile, email) {
    const data = {
      userid: userId,
      name: fullName,
      department: departments,
      weixinid: weChatId,
      mobile: mobile,
      email: email,
    };
    return this.http.post('/cgi-bin/user/create', {data: omitBy(data, isUndefined)});
  }
  // TODO make a call onn positional args vs keyword args (destructuring)
  /**
   *
   * @param {string} weChatAccountId
   * @param {string} fullName
   * @param {string} departments
   * @param {string} weChatId
   * @param {string} mobile
   * @param {string} email
   */
  async update(weChatAccountId, fullName, departments, weChatId, mobile, email) {
    const data = {
      userid: weChatAccountId,
      name: fullName,
      department: departments,
      weixinid: weChatId,
      mobile: mobile,
      email: email,
    };
    return this.http.post('/cgi-bin/user/update', {data: omitBy(data, isUndefined)});
  }
  /**
   *
   * @param {string} userId
   */
  async delete(userId) {
    const params = {userid: userId};
    return this.http.get('/cgi-bin/user/delete', {params});
  }
  /**
   *
   * @param {string} userId
   */
  async get(userId) {
    const params = {userid: userId};
    return this.http.get('/cgi-bin/user/get', {params});
  }
  /**
   *
   * @param {number} departmentId
   * @param {number} statusId
   * @param {number} withChildren
   */
  async list(departmentId=null, statusId=0, withChildren=0) {
    const params = {
      fetch_child: withChildren,
      status: statusId,
      department_id: departmentId,
    };
    return this.http.get('/cgi-bin/user/list', {params: omitBy(params, isUndefined)});
  }
  /**
   *
   * @param {number} departmentId
   * @param {number} statusId
   * @param {number} withChildren
   */
  async simpleList(departmentId=null, statusId=0, withChildren=0) {
    const params = {
      fetch_child: withChildren,
      status: statusId,
      department_id: departmentId,
    };
    return this.http.get('/cgi-bin/user/simplelist', {params: omitBy(params, isUndefined)});
  }
};

module.exports = UserApi;
