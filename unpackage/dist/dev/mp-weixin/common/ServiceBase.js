"use strict";
const common_vendor = require("./vendor.js");
const siteinfo = require("../siteinfo.js");
const common_Session = require("./Session.js");
class ServiceBase {
  constructor() {
    Object.assign(this, {
      $$basePath: siteinfo.__config.basePath
    });
    this.__init();
  }
  __init() {
    this.__initDefaults();
    this.__initMethods();
  }
  __initInterceptor() {
  }
  __initDefaults() {
    this.suffix = "";
    this.instanceSource = {
      method: [
        "OPTIONS",
        "GET",
        "HEAD",
        "POST",
        "PUT",
        "DELETE",
        "TRACE",
        "CONNECT"
      ]
    };
  }
  __initMethods() {
    for (let key in this.instanceSource) {
      this.instanceSource[key].forEach((method, index) => {
        this[method.toLowerCase() + this.suffix] = (...args) => this.__defaultRequest(method, ...args);
      });
    }
  }
  __defaultRequest(method = "", url = "", params = {}, header = {}, dataType = "json") {
    const $$header = Object.assign({}, this.setHeaders(), header);
    const $$url = this.setUrl(url, params);
    if (params.url) {
      params.url = this.setUrl(params.url, params);
    }
    const chainInterceptors = (promise2, interceptors) => {
      for (let i = 0, ii = interceptors.length; i < ii; ) {
        let thenFn = interceptors[i++];
        let rejectFn = interceptors[i++];
        promise2 = promise2.then(thenFn, rejectFn);
      }
      return promise2;
    };
    const $$config = {
      url: $$url,
      data: params,
      header: $$header,
      method,
      dataType
    };
    let requestInterceptors = [];
    let responseInterceptors = [];
    let reversedInterceptors = this.setInterceptors();
    let promise = this.__resolve($$config);
    reversedInterceptors.forEach((n, i) => {
      if (n.request || n.requestError) {
        requestInterceptors.push(n.request, n.requestError);
      }
      if (n.response || n.responseError) {
        responseInterceptors.unshift(n.response, n.responseError);
      }
    });
    promise = chainInterceptors(promise, requestInterceptors);
    promise = promise.then(this.__http);
    promise = chainInterceptors(promise, responseInterceptors);
    promise = promise.then((res) => res.data, (err) => err);
    return promise;
  }
  __http(obj) {
    return new Promise((resolve, reject) => {
      obj.success = (res) => resolve(res);
      obj.fail = (res) => reject(res);
      common_vendor.index.request(obj);
    });
  }
  __resolve(res) {
    return new Promise((resolve, reject) => {
      resolve(res);
    });
  }
  __reject(res) {
    return new Promise((resolve, reject) => {
      reject(res);
    });
  }
  getPathValue(obj, desc) {
    var arr = desc.split(".");
    while (arr.length) {
      obj = obj[arr.shift()];
    }
    return obj;
  }
  getRestUrl(url, data) {
    if (!data) {
      return url;
    } else if (data !== null && typeof data === "object") {
      url = url.replace(/\{\{(.+?)\}\}/g, (_, key) => {
        let name = key.trim();
        return this.getPathValue(data, name);
      });
      url = url.replace(/\{(.+?)\}/g, (_, key) => {
        let name = key.trim();
        return this.getPathValue(data, name);
      });
      return url;
    }
    return url;
  }
  setUrl(url, param) {
    let ishttp = /^http(s)?:\/\/.*/i.test(url);
    url = this.getRestUrl(url, param);
    if (ishttp) {
      return url;
    }
    if (url.startsWith("/") || this.$$basePath.endsWith("/")) {
      return `${this.$$basePath}${this.$$prefix}${url}`;
    } else {
      return `${this.$$basePath}/${this.$$prefix}${url}`;
    }
  }
  setHeaders() {
    return {
      "Content-type": "application/x-www-form-urlencoded"
    };
  }
  setInterceptors() {
    this.interceptors = [{
      request: (request) => {
        request.header = request.header || {};
        request.requestTimestamp = new Date().getTime();
        if (common_Session.Session.getToken()) {
          request.header.Authorization = common_Session.Session.getToken();
        }
        common_vendor.index.showNavigationBarLoading();
        if (request.data["redirecturl"]) {
          common_Session.Session.setRedirecturl(request.data["redirecturl"]);
          delete request.data["redirecturl"];
        }
        delete request.data["loadmsg"];
        return request;
      },
      requestError: (requestError) => {
        common_vendor.index.hideToast();
        return requestError;
      },
      response: (response) => {
        response.responseTimestamp = new Date().getTime();
        common_vendor.index.hideNavigationBarLoading();
        if (response.data.code == 401 || response.data.status == 401) {
          common_Session.Session.clearUser();
          common_vendor.index.reLaunch({
            url: getApp().globalData.homePage
          });
        }
        return response;
      },
      responseError: (responseError) => {
        common_vendor.index.hideLoading();
        return responseError;
      }
    }];
    this.__initInterceptor();
    return this.interceptors;
  }
}
exports.ServiceBase = ServiceBase;
