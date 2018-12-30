/**
 *
 */
class Media {
  /**
   *
   * @param {object} http
   */
  constructor(http) {
    this.http = http;
  }
  /**
   *
   * @param {string} mediaId
   */
  async get(mediaId) {
    const params = {mediaid: mediaId};
    return this.http.get('/cgi-bin/media/get', {params, responseType: 'stream'})
        .then((res) => {
          let filename = null;
          if (res.headers['content-disposition'] && res.headers['content-disposition'].indexOf('filename=' > -1)) {
            filename = res.headers['content-disposition'].split('filename=')[1].replace(/"/g, '');
          }
          return {stream: res.data, filename, headers: res.headers};
        });
  }
};

module.exports = Media;
