"use strict";
const common_ServiceBase = require("./ServiceBase.js");
require("./vendor.js");
class Service extends common_ServiceBase.ServiceBase {
  constructor() {
    super();
    this.$$prefix = "";
  }
  __initInterceptor() {
  }
  postData(params, url) {
    return this.post(url || this.$$path.data, params);
  }
  getData(params, url) {
    return this.get(url || this.$$path.data, params);
  }
  saveData(params, url) {
    return this.post(url || this.$$path.save, params);
  }
  delData(params, url) {
    return this.post(url || this.$$path.del, params);
  }
}
exports.Service = Service;
