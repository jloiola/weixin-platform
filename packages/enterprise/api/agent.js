/**
 *
 */
class Agent {
  /**
   *
   * @param {object} http
   */
  constructor(http) {
    this.http = http;
  }
  /**
   *
   * @param {*} agentId
   */
  async get(agentId) {
    const params = {agentid: agentId};
    return this.http.get('/cgi-bin/agent/get', {params});
  }
  /**
   *
   */
  async list() {
    return this.http.get('/cgi-bin/agent/list');
  }
  /**
   *
   * @param {string} agentId
   * @param {array} userIds
   * @param {object} content
   */
  async send(agentId, userIds, content) {
    const data = {
      touser: userIds.join('|'),
      agentid: agentId,
      safe: 0,
    };
    // TODO text only for now; check docs for other
    Object.assign(data, {
      msgtype: 'text',
      text: {content},
    });
    return this.http.post('/cgi-bin/chat/send', data);
  }
};

module.exports = Agent;
