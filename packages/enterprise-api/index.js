const axios = require('axios');
const {debug} = require('ulog')('weixin-platform:enterpise-api');

const UserApi = require('./api/user');

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
  get user() {
    if (!this._userApi) {
      this._userApi = new UserApi(this.http);
    }
    return this._userApi;
  }
}

module.exports = EnterpriseApi;
