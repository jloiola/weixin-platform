/**
 *
 */
class CustomerService {
  /**
   *
   * @param {object} http
   */
  constructor(http) {
    this.http = http;
  }
  /**
   *
   * @param {string} openId
   */
  async getSession(openId) {
    const params = {openid: openId};
    return this.http.get('/customservice/kfsession/getsession', {params});
  }
};

module.exports = CustomerService;
