/**
 *
 */
class Department {
  /**
   *
   * @param {object} http
   */
  constructor(http) {
    this.http = http;
  }
  /**
   *
   * @param {number} departmentId
   */
  async list(departmentId) {
    const params = departmentId ? {id: departmentId} : {};
    return this.http.get('/cgi-bin/department/list', {params});
  }
};

module.exports = Department;
