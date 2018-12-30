const axios = require('axios');
const {debug} = require('ulog')('weixin-platform:enterpise-api');

const {Agent, Chat, CustomerService, Department, Media, Menu, Tag, User} = require('./api');

// TODO: look into using object proxy to reduce api getters boilerplate
// TODO: re-org
/**
 *
 */
class EnterpriseApi {
  /**
   *
   */
  constructor({baseUrl, appId, appSecret, timeout=3000}) {
    this.baseUrl = baseUrl;
    this.appId = appId;
    this.appSecret = appSecret;
    this.http = axios.create({
      baseURL: baseUrl,
      timeout,
    });

    this.http.interceptors.request.use(async (config) => {
      if (config.url !== '/cgi-bin/gettoken' && !config.params.access_token) {
        config.params.access_token = await this.token();
      }
      return config;
    }, (error) => (
      Promise.reject(error)
    ));
  }

  /**
   *
   */
  async token() {
    const params = {
      corpid: this.appId,
      corpsecret: this.appSecret,
    };
    debug('token get');
    return this.http.get('/cgi-bin/gettoken', {params})
        .then(({data}) => {
          debug(data);
          return data.access_token;
        });
  }
  /**
   *
   */
  get agent() {
    if (!this._agentApi) {
      this._agentApi = new Agent(this.http);
    }
    return this._agentApi;
  }
  /**
   *
   */
  get chat() {
    if (!this._chatApi) {
      this._chatApi = new Chat(this.http);
    }
    return this._chatApi;
  }
  /**
   *
   */
  get customerService() {
    if (!this._customerServiceApi) {
      this._customerServiceApi = new CustomerService(this.http);
    }
    return this._customerServiceApi;
  }
  /**
   *
   */
  get department() {
    if (!this._departmentApi) {
      this._departmentApi = new Department(this.http);
    }
    return this._departmentApi;
  }
  /**
   *
   */
  get media() {
    if (!this._mediaApi) {
      this._mediaApi = new Media(this.http);
    }
    return this._mediaApi;
  }
  /**
   *
   */
  get menu() {
    if (!this._menuApi) {
      this._menuApi = new Menu(this.http);
    }
    return this._menuApi;
  }
  /**
   *
   */
  get tag() {
    if (!this._tagApi) {
      this._tagApi = new Tag(this.http);
    }
    return this._tagApi;
  }
  /**
   *
   */
  get user() {
    if (!this._userApi) {
      this._userApi = new User(this.http);
    }
    return this._userApi;
  }
}

module.exports = EnterpriseApi;
