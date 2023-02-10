"use strict";
class Validate {
  constructor(rules = {}) {
    Object.assign(this, {
      rules
    });
    this.__init();
  }
  __init() {
    this.__initMethods();
    this.__initDefaults();
    this.__initData();
  }
  __initDefaults() {
    this.defaults = {
      messages: {
        required: "\u8FD9\u662F\u5FC5\u586B\u5B57\u6BB5\u3002",
        email: "\u8BF7\u8F93\u5165\u6709\u6548\u7684\u7535\u5B50\u90AE\u4EF6\u5730\u5740\u3002",
        tel: "\u8BF7\u8F93\u516511\u4F4D\u7684\u624B\u673A\u53F7\u7801\u3002",
        url: "\u8BF7\u8F93\u5165\u6709\u6548\u7684\u7F51\u5740\u3002",
        date: "\u8BF7\u8F93\u5165\u6709\u6548\u7684\u65E5\u671F\u3002",
        dateISO: "\u8BF7\u8F93\u5165\u6709\u6548\u7684\u65E5\u671F\uFF08ISO\uFF09\uFF0C\u4F8B\u5982\uFF1A2009-06-23\uFF0C1998/01/22\u3002",
        number: "\u8BF7\u8F93\u5165\u6709\u6548\u7684\u6570\u5B57\u3002",
        regexp: "\u8BF7\u8F93\u5165\u6709\u6548\u7684\u6B63\u5219\u5339\u914D\u503C\u3002",
        digits: "\u53EA\u80FD\u8F93\u5165\u6570\u5B57\u3002",
        idcard: "\u8BF7\u8F93\u516518\u4F4D\u7684\u6709\u6548\u8EAB\u4EFD\u8BC1\u3002",
        equalTo: "\u8F93\u5165\u503C\u5FC5\u987B\u548C%s\u76F8\u540C\u3002",
        contains: "\u8F93\u5165\u503C\u5FC5\u987B\u5305\u542B%s\u3002",
        minlength: "\u6700\u5C11\u8981\u8F93\u5165%s\u4E2A\u5B57\u7B26\u3002",
        maxlength: "\u6700\u591A\u53EF\u4EE5\u8F93\u5165%s\u4E2A\u5B57\u7B26\u3002",
        rangelength: "\u8BF7\u8F93\u5165\u957F\u5EA6\u5728%s\u5230%s\u4E4B\u95F4\u7684\u5B57\u7B26\u3002",
        min: "\u8BF7\u8F93\u5165\u4E0D\u5C0F\u4E8E%s\u7684\u6570\u503C\u3002",
        max: "\u8BF7\u8F93\u5165\u4E0D\u5927\u4E8E%s\u7684\u6570\u503C\u3002",
        range: "\u8BF7\u8F93\u5165\u8303\u56F4\u5728%s\u5230 {1} \u4E4B\u95F4\u7684\u6570\u503C\u3002"
      }
    };
  }
  __initData() {
    this.form = {};
    this.errorList = [];
  }
  __initMethods() {
    const that = this;
    that.methods = {
      required: {
        valid(value, param) {
          if (!that.depend(param)) {
            return "dependency-mismatch";
          } else if (typeof value === "number") {
            value = value.toString();
          } else if (typeof value === "boolean") {
            return true;
          }
          return value.length > 0;
        },
        message(param) {
          return param.message || "\u8FD9\u662F\u5FC5\u586B\u5B57\u6BB5\u3002";
        }
      },
      email: {
        valid(value, param) {
          return that.optional(value) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value);
        },
        message(param) {
          return param.message || "\u8BF7\u8F93\u5165\u6709\u6548\u7684\u7535\u5B50\u90AE\u4EF6\u5730\u5740\u3002";
        }
      },
      tel: {
        valid(value, param) {
          return that.optional(value) || /^1[34578]\d{9}$/.test(value);
        },
        message(param) {
          return param.message || "\u8BF7\u8F93\u516511\u4F4D\u7684\u624B\u673A\u53F7\u7801\u3002";
        }
      },
      url: {
        valid(value, param) {
          return that.optional(value) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
        },
        message(param) {
          return param.message || "\u8BF7\u8F93\u5165\u6709\u6548\u7684\u7F51\u5740\u3002";
        }
      },
      date: {
        valid(value, param) {
          return that.optional(value) || !/Invalid|NaN/.test(new Date(value).toString());
        },
        message(param) {
          return param.message || "\u8BF7\u8F93\u5165\u6709\u6548\u7684\u65E5\u671F\u3002";
        }
      },
      dateISO: {
        valid(value, param) {
          return that.optional(value) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
        },
        message(param) {
          return param.message || "\u8BF7\u8F93\u5165\u6709\u6548\u7684\u65E5\u671F\uFF08ISO\uFF09\uFF0C\u4F8B\u5982\uFF1A2009-06-23\uFF0C1998/01/22\u3002";
        }
      },
      number: {
        valid(value, param) {
          return that.optional(value) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
        },
        message(param) {
          return param.message || "\u8BF7\u8F93\u5165\u6709\u6548\u7684\u6570\u5B57\u3002";
        }
      },
      digits: {
        valid(value, param) {
          return that.optional(value) || /^\d+$/.test(value);
        },
        message(param) {
          return param.message || "\u53EA\u80FD\u8F93\u5165\u6574\u6570\u3002";
        }
      },
      idcard: {
        valid(value, param) {
          return that.optional(value) || /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value);
        },
        message(param) {
          return param.message || "\u8BF7\u8F93\u516518\u4F4D\u7684\u6709\u6548\u8EAB\u4EFD\u8BC1\u3002";
        }
      },
      regexp: {
        valid(value, param) {
          var regexp = "string" === typeof param.regexp ? new RegExp(param.regexp) : param.regexp;
          return that.optional(value) || regexp.test(value);
        },
        message(param) {
          return param.message || "\u8BF7\u8F93\u5165\u6709\u6548\u7684\u6B63\u5219\u5339\u914D\u503C";
        }
      },
      equalTo: {
        valid(value, param) {
          return that.optional(value) || value === that.scope.detail.value[param.field];
        },
        message(param) {
          return that.formatMessage(param.message || "\u8F93\u5165\u503C\u5FC5\u987B\u548C%s\u76F8\u540C\u3002", [that.scope.detail.value[param.field]]);
        }
      },
      contains: {
        valid(value, param) {
          return that.optional(value) || value.indexOf(param.value) >= 0;
        },
        message(param) {
          return that.formatMessage(param.message || "\u8F93\u5165\u503C\u5FC5\u987B\u5305\u542B%s\u3002", [param.value]);
        }
      },
      minlength: {
        valid(value, param) {
          return that.optional(value) || value.length >= param.value;
        },
        message(param) {
          return that.formatMessage(param.message || "\u6700\u5C11\u8981\u8F93\u5165%s\u4E2A\u5B57\u7B26\u3002", [param.value]);
        }
      },
      maxlength: {
        valid(value, param) {
          return that.optional(value) || value.length <= param.value;
        },
        message(param) {
          return that.formatMessage(param.message || "\u6700\u591A\u53EF\u4EE5\u8F93\u5165%s\u4E2A\u5B57\u7B26\u3002", [param.value]);
        }
      },
      rangelength: {
        valid(value, param) {
          return that.optional(value) || value.length >= param.min && value.length <= param.max;
        },
        message(param) {
          return that.formatMessage(param.message || "\u8BF7\u8F93\u5165\u957F\u5EA6\u5728%s\u5230%s\u4E4B\u95F4\u7684\u5B57\u7B26\u3002", [param.min, param.max]);
        }
      },
      min: {
        valid(value, param) {
          return that.optional(value) || value >= param.value;
        },
        message(param) {
          return that.formatMessage(param.message || "\u8BF7\u8F93\u5165\u4E0D\u5C0F\u4E8E%s\u7684\u6570\u503C\u3002", [param.value]);
        }
      },
      max: {
        valid(value, param) {
          return that.optional(value) || value <= param.value;
        },
        message(param) {
          return that.formatMessage(param.message || "\u8BF7\u8F93\u5165\u4E0D\u5927\u4E8E%s\u7684\u6570\u503C\u3002", [param.value]);
        }
      },
      range: {
        valid(value, param) {
          return that.optional(value) || value >= param.min && value <= param.max;
        },
        message(param) {
          return that.formatMessage(param.message || "\u8BF7\u8F93\u5165\u8303\u56F4\u5728%s\u5230%s\u4E4B\u95F4\u7684\u6570\u503C\u3002", [param.min, param.max]);
        }
      }
    };
  }
  addMethod(name, method, message) {
    this.methods[name] = method;
    this.defaults.messages[name] = message !== void 0 ? message : this.defaults.messages[name];
  }
  isValidMethod(value) {
    return this.methods.hasOwnProperty(value);
  }
  formatMessage(message, parameters) {
    if (!Array.isArray(parameters)) {
      parameters = [parameters];
    }
    for (var i in parameters) {
      message = message.replace("%s", parameters[i]);
    }
    return message;
  }
  formatTpl(source, params) {
    const that = this;
    if (arguments.length === 1) {
      return function() {
        let args = Array.from(arguments);
        args.unshift(source);
        return that.formatTpl.apply(this, args);
      };
    }
    if (params === void 0) {
      return source;
    }
    if (arguments.length > 2 && params.constructor !== Array) {
      params = Array.from(arguments).slice(1);
    }
    if (params.constructor !== Array) {
      params = [params];
    }
    params.forEach(function(n, i) {
      source = source.replace(new RegExp("\\{" + i + "\\}", "g"), function() {
        return n;
      });
    });
    return source;
  }
  depend(param) {
    switch (typeof param) {
      case "boolean":
        param = param;
        break;
      case "string":
        param = !!param.length;
        break;
      case "function":
        param = param();
      default:
        param = true;
    }
    return param;
  }
  optional(value) {
    return !this.methods.required.valid(value) && "dependency-mismatch";
  }
  customMessage(param, rule) {
    if (!rule.parameters.message) {
      rule.parameters.message = this.defaults.messages[rule.method];
    }
    if (rule.parameters.message.indexOf("%s") >= 0) {
      return this.methods[rule.method].message;
    } else {
      return rule.parameters.message;
    }
  }
  defaultMessage(param, rule) {
    let message = this.customMessage(param, rule) || this.defaults.messages[rule.method];
    let type = typeof message;
    if (type === "undefined") {
      message = `Warning: No message defined for ${rule.method}.`;
    } else if (type === "function") {
      message = message.call(this, rule.parameters);
    }
    return message;
  }
  formatTplAndAdd(param, rule, value) {
    let msg = this.defaultMessage(param, rule);
    this.errorList.push({
      param,
      msg,
      value
    });
  }
  checkParam(param, rules, event) {
    this.scope = event;
    const data = event.detail.value;
    const value = data[param] || "";
    for (let method in rules) {
      if (this.isValidMethod(method)) {
        const rule = {
          method,
          parameters: rules[method]
        };
        const result = this.methods[method].valid(value, rule.parameters);
        if (result === "dependency-mismatch") {
          continue;
        }
        this.setValue(param, method, result, value);
        if (!result) {
          this.formatTplAndAdd(param, rule, value);
          break;
        }
      }
    }
  }
  setView(param) {
    this.form[param] = {
      $name: param,
      $valid: true,
      $invalid: false,
      $error: {},
      $success: {},
      $viewValue: ``
    };
  }
  setValue(param, method, result, value) {
    const params = this.form[param];
    params.$valid = result;
    params.$invalid = !result;
    params.$error[method] = !result;
    params.$success[method] = result;
    params.$viewValue = value;
  }
  checkForm(event) {
    this.__initData();
    for (let param in this.rules) {
      this.setView(param);
      this.checkParam(param, this.rules[param], event);
    }
    return this.valid();
  }
  valid() {
    return this.size() === 0;
  }
  size() {
    return this.errorList.length;
  }
  validationErrors() {
    return this.errorList;
  }
}
exports.Validate = Validate;
