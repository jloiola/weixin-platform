/**
 *
 */
class Chat {
  /**
   *
   * @param {object} http
   */
  constructor(http) {
    this.http = http;
  }
  /**
   *
   * @param {*} chatId
   * @param {*} title
   * @param {*} owner
   * @param {*} members
   */
  async create(chatId, title, owner, members) {
    const data = {
      chatid: chatId,
      name: title,
      owner: owner,
      userlist: members,
    };
    return this.http.post('/cgi-bin/chat/update', data);
  }
  /**
   *
   * @param {*} chatId
   * @param {*} ownerAccountId
   * @param {*} addUserList
   * @param {*} delUserList
   */
  async update(chatId, ownerAccountId, addUserList=[], delUserList=[]) {
    const data = {
      chatid: chatId,
      op_user: ownerAccountId,
      add_user_list: addUserList,
      del_user_list: delUserList,
    };
    return this.http.post('/cgi-bin/chat/update', data);
  }
  /**
   *
   * @param {*} chatId
   */
  async get(chatId) {
    const params = {chatid: chatId};
    return this.http.get('/cgi-bin/chat/get', {params});
  }
  /**
   *
   * @param {*} chatId
   * @param {*} userId
   */
  async quit(chatId, userId) {
    const data = {
      chatid: chatId,
      op_user: userId,
    };
    return this.http.post('/cgi-bin/chat/quit', data);
  }
  /**
   *
   * @param {sender} sender
   * @param {receiver} receiver
   * @param {message} message
   */
  async send(sender, receiver, message) {
    const data = Object.assign({sender, receiver}, message);
    return this.http.post('/cgi-bin/chat/send', data);
  }
};

module.exports = Chat;
