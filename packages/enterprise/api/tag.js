/**
 *
 */
class Tag {
  /**
   *
   * @param {object} http
   */
  constructor(http) {
    this.http = http;
  }
  /**
   *
   */
  async list() {
    return this.http.get('/cgi-bin/tag/list');
  }
  /**
   *
   * @param {*} tagId
   */
  async getUsers(tagId) {
    const params = {tagid: tagId};
    return this.http.get('/cgi-bin/tag/get', {params});
  }
  /**
   *
   * @param {*} tagName
   * @param {*} tagId
   */
  async create(tagName, tagId=null) {
    // TODO: check how it likes null when sending
    const data = {
      tagname: tagName,
      tagid: tagId,
    };
    return this.http.post('/cgi-bin/tag/create', data);
  }
  /**
   *
   * @param {*} tagId
   * @param {*} users
   * @param {*} departments
   */
  async addUsers(tagId, users=[], departments=[]) {
    const data = {
      tagid: tagId,
      userlist: users,
      partylist: departments,

    };
    return this.http.post('/cgi-bin/tag/addtagusers', data);
  }
};

module.exports = Tag;
