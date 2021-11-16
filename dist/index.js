var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[Object.keys(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  __markAsModule(target);
  for (var name4 in all)
    __defProp(target, name4, { get: all[name4], enumerable: true });
};
var __reExport = (target, module5, desc) => {
  if (module5 && typeof module5 === "object" || typeof module5 === "function") {
    for (let key of __getOwnPropNames(module5))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module5[key], enumerable: !(desc = __getOwnPropDesc(module5, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module5) => {
  return __reExport(__markAsModule(__defProp(module5 != null ? __create(__getProtoOf(module5)) : {}, "default", module5 && module5.__esModule && "default" in module5 ? { get: () => module5.default, enumerable: true } : { value: module5, enumerable: true })), module5);
};

// node_modules/@actions/core/lib/utils.js
var require_utils = __commonJS({
  "node_modules/@actions/core/lib/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.toCommandProperties = exports.toCommandValue = void 0;
    function toCommandValue(input) {
      if (input === null || input === void 0) {
        return "";
      } else if (typeof input === "string" || input instanceof String) {
        return input;
      }
      return JSON.stringify(input);
    }
    exports.toCommandValue = toCommandValue;
    function toCommandProperties(annotationProperties) {
      if (!Object.keys(annotationProperties).length) {
        return {};
      }
      return {
        title: annotationProperties.title,
        file: annotationProperties.file,
        line: annotationProperties.startLine,
        endLine: annotationProperties.endLine,
        col: annotationProperties.startColumn,
        endColumn: annotationProperties.endColumn
      };
    }
    exports.toCommandProperties = toCommandProperties;
  }
});

// node_modules/@actions/core/lib/command.js
var require_command = __commonJS({
  "node_modules/@actions/core/lib/command.js"(exports) {
    "use strict";
    var __createBinding2 = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar2 = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.hasOwnProperty.call(mod, k))
            __createBinding2(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.issue = exports.issueCommand = void 0;
    var os = __importStar2(require("os"));
    var utils_1 = require_utils();
    function issueCommand(command, properties, message) {
      const cmd = new Command2(command, properties, message);
      process.stdout.write(cmd.toString() + os.EOL);
    }
    exports.issueCommand = issueCommand;
    function issue(name4, message = "") {
      issueCommand(name4, {}, message);
    }
    exports.issue = issue;
    var CMD_STRING = "::";
    var Command2 = class {
      constructor(command, properties, message) {
        if (!command) {
          command = "missing.command";
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
      }
      toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
          cmdStr += " ";
          let first = true;
          for (const key in this.properties) {
            if (this.properties.hasOwnProperty(key)) {
              const val = this.properties[key];
              if (val) {
                if (first) {
                  first = false;
                } else {
                  cmdStr += ",";
                }
                cmdStr += `${key}=${escapeProperty(val)}`;
              }
            }
          }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
      }
    };
    function escapeData(s) {
      return utils_1.toCommandValue(s).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
    }
    function escapeProperty(s) {
      return utils_1.toCommandValue(s).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A").replace(/:/g, "%3A").replace(/,/g, "%2C");
    }
  }
});

// node_modules/@actions/core/lib/file-command.js
var require_file_command = __commonJS({
  "node_modules/@actions/core/lib/file-command.js"(exports) {
    "use strict";
    var __createBinding2 = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar2 = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.hasOwnProperty.call(mod, k))
            __createBinding2(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.issueCommand = void 0;
    var fs2 = __importStar2(require("fs"));
    var os = __importStar2(require("os"));
    var utils_1 = require_utils();
    function issueCommand(command, message) {
      const filePath = process.env[`GITHUB_${command}`];
      if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command}`);
      }
      if (!fs2.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`);
      }
      fs2.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os.EOL}`, {
        encoding: "utf8"
      });
    }
    exports.issueCommand = issueCommand;
  }
});

// node_modules/@actions/http-client/proxy.js
var require_proxy = __commonJS({
  "node_modules/@actions/http-client/proxy.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function getProxyUrl(reqUrl) {
      let usingSsl = reqUrl.protocol === "https:";
      let proxyUrl;
      if (checkBypass(reqUrl)) {
        return proxyUrl;
      }
      let proxyVar;
      if (usingSsl) {
        proxyVar = process.env["https_proxy"] || process.env["HTTPS_PROXY"];
      } else {
        proxyVar = process.env["http_proxy"] || process.env["HTTP_PROXY"];
      }
      if (proxyVar) {
        proxyUrl = new URL(proxyVar);
      }
      return proxyUrl;
    }
    exports.getProxyUrl = getProxyUrl;
    function checkBypass(reqUrl) {
      if (!reqUrl.hostname) {
        return false;
      }
      let noProxy = process.env["no_proxy"] || process.env["NO_PROXY"] || "";
      if (!noProxy) {
        return false;
      }
      let reqPort;
      if (reqUrl.port) {
        reqPort = Number(reqUrl.port);
      } else if (reqUrl.protocol === "http:") {
        reqPort = 80;
      } else if (reqUrl.protocol === "https:") {
        reqPort = 443;
      }
      let upperReqHosts = [reqUrl.hostname.toUpperCase()];
      if (typeof reqPort === "number") {
        upperReqHosts.push(`${upperReqHosts[0]}:${reqPort}`);
      }
      for (let upperNoProxyItem of noProxy.split(",").map((x) => x.trim().toUpperCase()).filter((x) => x)) {
        if (upperReqHosts.some((x) => x === upperNoProxyItem)) {
          return true;
        }
      }
      return false;
    }
    exports.checkBypass = checkBypass;
  }
});

// node_modules/tunnel/lib/tunnel.js
var require_tunnel = __commonJS({
  "node_modules/tunnel/lib/tunnel.js"(exports) {
    "use strict";
    var net = require("net");
    var tls = require("tls");
    var http = require("http");
    var https = require("https");
    var events = require("events");
    var assert = require("assert");
    var util = require("util");
    exports.httpOverHttp = httpOverHttp;
    exports.httpsOverHttp = httpsOverHttp;
    exports.httpOverHttps = httpOverHttps;
    exports.httpsOverHttps = httpsOverHttps;
    function httpOverHttp(options) {
      var agent = new TunnelingAgent(options);
      agent.request = http.request;
      return agent;
    }
    function httpsOverHttp(options) {
      var agent = new TunnelingAgent(options);
      agent.request = http.request;
      agent.createSocket = createSecureSocket;
      agent.defaultPort = 443;
      return agent;
    }
    function httpOverHttps(options) {
      var agent = new TunnelingAgent(options);
      agent.request = https.request;
      return agent;
    }
    function httpsOverHttps(options) {
      var agent = new TunnelingAgent(options);
      agent.request = https.request;
      agent.createSocket = createSecureSocket;
      agent.defaultPort = 443;
      return agent;
    }
    function TunnelingAgent(options) {
      var self2 = this;
      self2.options = options || {};
      self2.proxyOptions = self2.options.proxy || {};
      self2.maxSockets = self2.options.maxSockets || http.Agent.defaultMaxSockets;
      self2.requests = [];
      self2.sockets = [];
      self2.on("free", function onFree(socket, host, port, localAddress) {
        var options2 = toOptions(host, port, localAddress);
        for (var i = 0, len = self2.requests.length; i < len; ++i) {
          var pending = self2.requests[i];
          if (pending.host === options2.host && pending.port === options2.port) {
            self2.requests.splice(i, 1);
            pending.request.onSocket(socket);
            return;
          }
        }
        socket.destroy();
        self2.removeSocket(socket);
      });
    }
    util.inherits(TunnelingAgent, events.EventEmitter);
    TunnelingAgent.prototype.addRequest = function addRequest(req, host, port, localAddress) {
      var self2 = this;
      var options = mergeOptions({ request: req }, self2.options, toOptions(host, port, localAddress));
      if (self2.sockets.length >= this.maxSockets) {
        self2.requests.push(options);
        return;
      }
      self2.createSocket(options, function(socket) {
        socket.on("free", onFree);
        socket.on("close", onCloseOrRemove);
        socket.on("agentRemove", onCloseOrRemove);
        req.onSocket(socket);
        function onFree() {
          self2.emit("free", socket, options);
        }
        function onCloseOrRemove(err) {
          self2.removeSocket(socket);
          socket.removeListener("free", onFree);
          socket.removeListener("close", onCloseOrRemove);
          socket.removeListener("agentRemove", onCloseOrRemove);
        }
      });
    };
    TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
      var self2 = this;
      var placeholder = {};
      self2.sockets.push(placeholder);
      var connectOptions = mergeOptions({}, self2.proxyOptions, {
        method: "CONNECT",
        path: options.host + ":" + options.port,
        agent: false,
        headers: {
          host: options.host + ":" + options.port
        }
      });
      if (options.localAddress) {
        connectOptions.localAddress = options.localAddress;
      }
      if (connectOptions.proxyAuth) {
        connectOptions.headers = connectOptions.headers || {};
        connectOptions.headers["Proxy-Authorization"] = "Basic " + new Buffer(connectOptions.proxyAuth).toString("base64");
      }
      debug("making CONNECT request");
      var connectReq = self2.request(connectOptions);
      connectReq.useChunkedEncodingByDefault = false;
      connectReq.once("response", onResponse);
      connectReq.once("upgrade", onUpgrade);
      connectReq.once("connect", onConnect);
      connectReq.once("error", onError);
      connectReq.end();
      function onResponse(res) {
        res.upgrade = true;
      }
      function onUpgrade(res, socket, head) {
        process.nextTick(function() {
          onConnect(res, socket, head);
        });
      }
      function onConnect(res, socket, head) {
        connectReq.removeAllListeners();
        socket.removeAllListeners();
        if (res.statusCode !== 200) {
          debug("tunneling socket could not be established, statusCode=%d", res.statusCode);
          socket.destroy();
          var error = new Error("tunneling socket could not be established, statusCode=" + res.statusCode);
          error.code = "ECONNRESET";
          options.request.emit("error", error);
          self2.removeSocket(placeholder);
          return;
        }
        if (head.length > 0) {
          debug("got illegal response body from proxy");
          socket.destroy();
          var error = new Error("got illegal response body from proxy");
          error.code = "ECONNRESET";
          options.request.emit("error", error);
          self2.removeSocket(placeholder);
          return;
        }
        debug("tunneling connection has established");
        self2.sockets[self2.sockets.indexOf(placeholder)] = socket;
        return cb(socket);
      }
      function onError(cause) {
        connectReq.removeAllListeners();
        debug("tunneling socket could not be established, cause=%s\n", cause.message, cause.stack);
        var error = new Error("tunneling socket could not be established, cause=" + cause.message);
        error.code = "ECONNRESET";
        options.request.emit("error", error);
        self2.removeSocket(placeholder);
      }
    };
    TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
      var pos = this.sockets.indexOf(socket);
      if (pos === -1) {
        return;
      }
      this.sockets.splice(pos, 1);
      var pending = this.requests.shift();
      if (pending) {
        this.createSocket(pending, function(socket2) {
          pending.request.onSocket(socket2);
        });
      }
    };
    function createSecureSocket(options, cb) {
      var self2 = this;
      TunnelingAgent.prototype.createSocket.call(self2, options, function(socket) {
        var hostHeader = options.request.getHeader("host");
        var tlsOptions = mergeOptions({}, self2.options, {
          socket,
          servername: hostHeader ? hostHeader.replace(/:.*$/, "") : options.host
        });
        var secureSocket = tls.connect(0, tlsOptions);
        self2.sockets[self2.sockets.indexOf(socket)] = secureSocket;
        cb(secureSocket);
      });
    }
    function toOptions(host, port, localAddress) {
      if (typeof host === "string") {
        return {
          host,
          port,
          localAddress
        };
      }
      return host;
    }
    function mergeOptions(target) {
      for (var i = 1, len = arguments.length; i < len; ++i) {
        var overrides = arguments[i];
        if (typeof overrides === "object") {
          var keys = Object.keys(overrides);
          for (var j = 0, keyLen = keys.length; j < keyLen; ++j) {
            var k = keys[j];
            if (overrides[k] !== void 0) {
              target[k] = overrides[k];
            }
          }
        }
      }
      return target;
    }
    var debug;
    if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
      debug = function() {
        var args = Array.prototype.slice.call(arguments);
        if (typeof args[0] === "string") {
          args[0] = "TUNNEL: " + args[0];
        } else {
          args.unshift("TUNNEL:");
        }
        console.error.apply(console, args);
      };
    } else {
      debug = function() {
      };
    }
    exports.debug = debug;
  }
});

// node_modules/tunnel/index.js
var require_tunnel2 = __commonJS({
  "node_modules/tunnel/index.js"(exports, module5) {
    module5.exports = require_tunnel();
  }
});

// node_modules/@actions/http-client/index.js
var require_http_client = __commonJS({
  "node_modules/@actions/http-client/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var http = require("http");
    var https = require("https");
    var pm = require_proxy();
    var tunnel;
    var HttpCodes;
    (function(HttpCodes2) {
      HttpCodes2[HttpCodes2["OK"] = 200] = "OK";
      HttpCodes2[HttpCodes2["MultipleChoices"] = 300] = "MultipleChoices";
      HttpCodes2[HttpCodes2["MovedPermanently"] = 301] = "MovedPermanently";
      HttpCodes2[HttpCodes2["ResourceMoved"] = 302] = "ResourceMoved";
      HttpCodes2[HttpCodes2["SeeOther"] = 303] = "SeeOther";
      HttpCodes2[HttpCodes2["NotModified"] = 304] = "NotModified";
      HttpCodes2[HttpCodes2["UseProxy"] = 305] = "UseProxy";
      HttpCodes2[HttpCodes2["SwitchProxy"] = 306] = "SwitchProxy";
      HttpCodes2[HttpCodes2["TemporaryRedirect"] = 307] = "TemporaryRedirect";
      HttpCodes2[HttpCodes2["PermanentRedirect"] = 308] = "PermanentRedirect";
      HttpCodes2[HttpCodes2["BadRequest"] = 400] = "BadRequest";
      HttpCodes2[HttpCodes2["Unauthorized"] = 401] = "Unauthorized";
      HttpCodes2[HttpCodes2["PaymentRequired"] = 402] = "PaymentRequired";
      HttpCodes2[HttpCodes2["Forbidden"] = 403] = "Forbidden";
      HttpCodes2[HttpCodes2["NotFound"] = 404] = "NotFound";
      HttpCodes2[HttpCodes2["MethodNotAllowed"] = 405] = "MethodNotAllowed";
      HttpCodes2[HttpCodes2["NotAcceptable"] = 406] = "NotAcceptable";
      HttpCodes2[HttpCodes2["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
      HttpCodes2[HttpCodes2["RequestTimeout"] = 408] = "RequestTimeout";
      HttpCodes2[HttpCodes2["Conflict"] = 409] = "Conflict";
      HttpCodes2[HttpCodes2["Gone"] = 410] = "Gone";
      HttpCodes2[HttpCodes2["TooManyRequests"] = 429] = "TooManyRequests";
      HttpCodes2[HttpCodes2["InternalServerError"] = 500] = "InternalServerError";
      HttpCodes2[HttpCodes2["NotImplemented"] = 501] = "NotImplemented";
      HttpCodes2[HttpCodes2["BadGateway"] = 502] = "BadGateway";
      HttpCodes2[HttpCodes2["ServiceUnavailable"] = 503] = "ServiceUnavailable";
      HttpCodes2[HttpCodes2["GatewayTimeout"] = 504] = "GatewayTimeout";
    })(HttpCodes = exports.HttpCodes || (exports.HttpCodes = {}));
    var Headers;
    (function(Headers2) {
      Headers2["Accept"] = "accept";
      Headers2["ContentType"] = "content-type";
    })(Headers = exports.Headers || (exports.Headers = {}));
    var MediaTypes;
    (function(MediaTypes2) {
      MediaTypes2["ApplicationJson"] = "application/json";
    })(MediaTypes = exports.MediaTypes || (exports.MediaTypes = {}));
    function getProxyUrl(serverUrl) {
      let proxyUrl = pm.getProxyUrl(new URL(serverUrl));
      return proxyUrl ? proxyUrl.href : "";
    }
    exports.getProxyUrl = getProxyUrl;
    var HttpRedirectCodes = [
      HttpCodes.MovedPermanently,
      HttpCodes.ResourceMoved,
      HttpCodes.SeeOther,
      HttpCodes.TemporaryRedirect,
      HttpCodes.PermanentRedirect
    ];
    var HttpResponseRetryCodes = [
      HttpCodes.BadGateway,
      HttpCodes.ServiceUnavailable,
      HttpCodes.GatewayTimeout
    ];
    var RetryableHttpVerbs = ["OPTIONS", "GET", "DELETE", "HEAD"];
    var ExponentialBackoffCeiling = 10;
    var ExponentialBackoffTimeSlice = 5;
    var HttpClientError = class extends Error {
      constructor(message, statusCode) {
        super(message);
        this.name = "HttpClientError";
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, HttpClientError.prototype);
      }
    };
    exports.HttpClientError = HttpClientError;
    var HttpClientResponse = class {
      constructor(message) {
        this.message = message;
      }
      readBody() {
        return new Promise(async (resolve, reject) => {
          let output = Buffer.alloc(0);
          this.message.on("data", (chunk) => {
            output = Buffer.concat([output, chunk]);
          });
          this.message.on("end", () => {
            resolve(output.toString());
          });
        });
      }
    };
    exports.HttpClientResponse = HttpClientResponse;
    function isHttps(requestUrl) {
      let parsedUrl = new URL(requestUrl);
      return parsedUrl.protocol === "https:";
    }
    exports.isHttps = isHttps;
    var HttpClient = class {
      constructor(userAgent, handlers, requestOptions) {
        this._ignoreSslError = false;
        this._allowRedirects = true;
        this._allowRedirectDowngrade = false;
        this._maxRedirects = 50;
        this._allowRetries = false;
        this._maxRetries = 1;
        this._keepAlive = false;
        this._disposed = false;
        this.userAgent = userAgent;
        this.handlers = handlers || [];
        this.requestOptions = requestOptions;
        if (requestOptions) {
          if (requestOptions.ignoreSslError != null) {
            this._ignoreSslError = requestOptions.ignoreSslError;
          }
          this._socketTimeout = requestOptions.socketTimeout;
          if (requestOptions.allowRedirects != null) {
            this._allowRedirects = requestOptions.allowRedirects;
          }
          if (requestOptions.allowRedirectDowngrade != null) {
            this._allowRedirectDowngrade = requestOptions.allowRedirectDowngrade;
          }
          if (requestOptions.maxRedirects != null) {
            this._maxRedirects = Math.max(requestOptions.maxRedirects, 0);
          }
          if (requestOptions.keepAlive != null) {
            this._keepAlive = requestOptions.keepAlive;
          }
          if (requestOptions.allowRetries != null) {
            this._allowRetries = requestOptions.allowRetries;
          }
          if (requestOptions.maxRetries != null) {
            this._maxRetries = requestOptions.maxRetries;
          }
        }
      }
      options(requestUrl, additionalHeaders) {
        return this.request("OPTIONS", requestUrl, null, additionalHeaders || {});
      }
      get(requestUrl, additionalHeaders) {
        return this.request("GET", requestUrl, null, additionalHeaders || {});
      }
      del(requestUrl, additionalHeaders) {
        return this.request("DELETE", requestUrl, null, additionalHeaders || {});
      }
      post(requestUrl, data, additionalHeaders) {
        return this.request("POST", requestUrl, data, additionalHeaders || {});
      }
      patch(requestUrl, data, additionalHeaders) {
        return this.request("PATCH", requestUrl, data, additionalHeaders || {});
      }
      put(requestUrl, data, additionalHeaders) {
        return this.request("PUT", requestUrl, data, additionalHeaders || {});
      }
      head(requestUrl, additionalHeaders) {
        return this.request("HEAD", requestUrl, null, additionalHeaders || {});
      }
      sendStream(verb, requestUrl, stream, additionalHeaders) {
        return this.request(verb, requestUrl, stream, additionalHeaders);
      }
      async getJson(requestUrl, additionalHeaders = {}) {
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        let res = await this.get(requestUrl, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
      }
      async postJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        let res = await this.post(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
      }
      async putJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        let res = await this.put(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
      }
      async patchJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        let res = await this.patch(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
      }
      async request(verb, requestUrl, data, headers) {
        if (this._disposed) {
          throw new Error("Client has already been disposed.");
        }
        let parsedUrl = new URL(requestUrl);
        let info = this._prepareRequest(verb, parsedUrl, headers);
        let maxTries = this._allowRetries && RetryableHttpVerbs.indexOf(verb) != -1 ? this._maxRetries + 1 : 1;
        let numTries = 0;
        let response;
        while (numTries < maxTries) {
          response = await this.requestRaw(info, data);
          if (response && response.message && response.message.statusCode === HttpCodes.Unauthorized) {
            let authenticationHandler;
            for (let i = 0; i < this.handlers.length; i++) {
              if (this.handlers[i].canHandleAuthentication(response)) {
                authenticationHandler = this.handlers[i];
                break;
              }
            }
            if (authenticationHandler) {
              return authenticationHandler.handleAuthentication(this, info, data);
            } else {
              return response;
            }
          }
          let redirectsRemaining = this._maxRedirects;
          while (HttpRedirectCodes.indexOf(response.message.statusCode) != -1 && this._allowRedirects && redirectsRemaining > 0) {
            const redirectUrl = response.message.headers["location"];
            if (!redirectUrl) {
              break;
            }
            let parsedRedirectUrl = new URL(redirectUrl);
            if (parsedUrl.protocol == "https:" && parsedUrl.protocol != parsedRedirectUrl.protocol && !this._allowRedirectDowngrade) {
              throw new Error("Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.");
            }
            await response.readBody();
            if (parsedRedirectUrl.hostname !== parsedUrl.hostname) {
              for (let header in headers) {
                if (header.toLowerCase() === "authorization") {
                  delete headers[header];
                }
              }
            }
            info = this._prepareRequest(verb, parsedRedirectUrl, headers);
            response = await this.requestRaw(info, data);
            redirectsRemaining--;
          }
          if (HttpResponseRetryCodes.indexOf(response.message.statusCode) == -1) {
            return response;
          }
          numTries += 1;
          if (numTries < maxTries) {
            await response.readBody();
            await this._performExponentialBackoff(numTries);
          }
        }
        return response;
      }
      dispose() {
        if (this._agent) {
          this._agent.destroy();
        }
        this._disposed = true;
      }
      requestRaw(info, data) {
        return new Promise((resolve, reject) => {
          let callbackForResult = function(err, res) {
            if (err) {
              reject(err);
            }
            resolve(res);
          };
          this.requestRawWithCallback(info, data, callbackForResult);
        });
      }
      requestRawWithCallback(info, data, onResult) {
        let socket;
        if (typeof data === "string") {
          info.options.headers["Content-Length"] = Buffer.byteLength(data, "utf8");
        }
        let callbackCalled = false;
        let handleResult = (err, res) => {
          if (!callbackCalled) {
            callbackCalled = true;
            onResult(err, res);
          }
        };
        let req = info.httpModule.request(info.options, (msg) => {
          let res = new HttpClientResponse(msg);
          handleResult(null, res);
        });
        req.on("socket", (sock) => {
          socket = sock;
        });
        req.setTimeout(this._socketTimeout || 3 * 6e4, () => {
          if (socket) {
            socket.end();
          }
          handleResult(new Error("Request timeout: " + info.options.path), null);
        });
        req.on("error", function(err) {
          handleResult(err, null);
        });
        if (data && typeof data === "string") {
          req.write(data, "utf8");
        }
        if (data && typeof data !== "string") {
          data.on("close", function() {
            req.end();
          });
          data.pipe(req);
        } else {
          req.end();
        }
      }
      getAgent(serverUrl) {
        let parsedUrl = new URL(serverUrl);
        return this._getAgent(parsedUrl);
      }
      _prepareRequest(method, requestUrl, headers) {
        const info = {};
        info.parsedUrl = requestUrl;
        const usingSsl = info.parsedUrl.protocol === "https:";
        info.httpModule = usingSsl ? https : http;
        const defaultPort = usingSsl ? 443 : 80;
        info.options = {};
        info.options.host = info.parsedUrl.hostname;
        info.options.port = info.parsedUrl.port ? parseInt(info.parsedUrl.port) : defaultPort;
        info.options.path = (info.parsedUrl.pathname || "") + (info.parsedUrl.search || "");
        info.options.method = method;
        info.options.headers = this._mergeHeaders(headers);
        if (this.userAgent != null) {
          info.options.headers["user-agent"] = this.userAgent;
        }
        info.options.agent = this._getAgent(info.parsedUrl);
        if (this.handlers) {
          this.handlers.forEach((handler) => {
            handler.prepareRequest(info.options);
          });
        }
        return info;
      }
      _mergeHeaders(headers) {
        const lowercaseKeys = (obj) => Object.keys(obj).reduce((c, k) => (c[k.toLowerCase()] = obj[k], c), {});
        if (this.requestOptions && this.requestOptions.headers) {
          return Object.assign({}, lowercaseKeys(this.requestOptions.headers), lowercaseKeys(headers));
        }
        return lowercaseKeys(headers || {});
      }
      _getExistingOrDefaultHeader(additionalHeaders, header, _default) {
        const lowercaseKeys = (obj) => Object.keys(obj).reduce((c, k) => (c[k.toLowerCase()] = obj[k], c), {});
        let clientHeader;
        if (this.requestOptions && this.requestOptions.headers) {
          clientHeader = lowercaseKeys(this.requestOptions.headers)[header];
        }
        return additionalHeaders[header] || clientHeader || _default;
      }
      _getAgent(parsedUrl) {
        let agent;
        let proxyUrl = pm.getProxyUrl(parsedUrl);
        let useProxy = proxyUrl && proxyUrl.hostname;
        if (this._keepAlive && useProxy) {
          agent = this._proxyAgent;
        }
        if (this._keepAlive && !useProxy) {
          agent = this._agent;
        }
        if (!!agent) {
          return agent;
        }
        const usingSsl = parsedUrl.protocol === "https:";
        let maxSockets = 100;
        if (!!this.requestOptions) {
          maxSockets = this.requestOptions.maxSockets || http.globalAgent.maxSockets;
        }
        if (useProxy) {
          if (!tunnel) {
            tunnel = require_tunnel2();
          }
          const agentOptions = {
            maxSockets,
            keepAlive: this._keepAlive,
            proxy: __spreadProps(__spreadValues({}, (proxyUrl.username || proxyUrl.password) && {
              proxyAuth: `${proxyUrl.username}:${proxyUrl.password}`
            }), {
              host: proxyUrl.hostname,
              port: proxyUrl.port
            })
          };
          let tunnelAgent;
          const overHttps = proxyUrl.protocol === "https:";
          if (usingSsl) {
            tunnelAgent = overHttps ? tunnel.httpsOverHttps : tunnel.httpsOverHttp;
          } else {
            tunnelAgent = overHttps ? tunnel.httpOverHttps : tunnel.httpOverHttp;
          }
          agent = tunnelAgent(agentOptions);
          this._proxyAgent = agent;
        }
        if (this._keepAlive && !agent) {
          const options = { keepAlive: this._keepAlive, maxSockets };
          agent = usingSsl ? new https.Agent(options) : new http.Agent(options);
          this._agent = agent;
        }
        if (!agent) {
          agent = usingSsl ? https.globalAgent : http.globalAgent;
        }
        if (usingSsl && this._ignoreSslError) {
          agent.options = Object.assign(agent.options || {}, {
            rejectUnauthorized: false
          });
        }
        return agent;
      }
      _performExponentialBackoff(retryNumber) {
        retryNumber = Math.min(ExponentialBackoffCeiling, retryNumber);
        const ms = ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
        return new Promise((resolve) => setTimeout(() => resolve(), ms));
      }
      static dateTimeDeserializer(key, value) {
        if (typeof value === "string") {
          let a = new Date(value);
          if (!isNaN(a.valueOf())) {
            return a;
          }
        }
        return value;
      }
      async _processResponse(res, options) {
        return new Promise(async (resolve, reject) => {
          const statusCode = res.message.statusCode;
          const response = {
            statusCode,
            result: null,
            headers: {}
          };
          if (statusCode == HttpCodes.NotFound) {
            resolve(response);
          }
          let obj;
          let contents;
          try {
            contents = await res.readBody();
            if (contents && contents.length > 0) {
              if (options && options.deserializeDates) {
                obj = JSON.parse(contents, HttpClient.dateTimeDeserializer);
              } else {
                obj = JSON.parse(contents);
              }
              response.result = obj;
            }
            response.headers = res.message.headers;
          } catch (err) {
          }
          if (statusCode > 299) {
            let msg;
            if (obj && obj.message) {
              msg = obj.message;
            } else if (contents && contents.length > 0) {
              msg = contents;
            } else {
              msg = "Failed request: (" + statusCode + ")";
            }
            let err = new HttpClientError(msg, statusCode);
            err.result = response.result;
            reject(err);
          } else {
            resolve(response);
          }
        });
      }
    };
    exports.HttpClient = HttpClient;
  }
});

// node_modules/@actions/http-client/auth.js
var require_auth = __commonJS({
  "node_modules/@actions/http-client/auth.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BasicCredentialHandler = class {
      constructor(username, password) {
        this.username = username;
        this.password = password;
      }
      prepareRequest(options) {
        options.headers["Authorization"] = "Basic " + Buffer.from(this.username + ":" + this.password).toString("base64");
      }
      canHandleAuthentication(response) {
        return false;
      }
      handleAuthentication(httpClient, requestInfo, objs) {
        return null;
      }
    };
    exports.BasicCredentialHandler = BasicCredentialHandler;
    var BearerCredentialHandler = class {
      constructor(token) {
        this.token = token;
      }
      prepareRequest(options) {
        options.headers["Authorization"] = "Bearer " + this.token;
      }
      canHandleAuthentication(response) {
        return false;
      }
      handleAuthentication(httpClient, requestInfo, objs) {
        return null;
      }
    };
    exports.BearerCredentialHandler = BearerCredentialHandler;
    var PersonalAccessTokenCredentialHandler = class {
      constructor(token) {
        this.token = token;
      }
      prepareRequest(options) {
        options.headers["Authorization"] = "Basic " + Buffer.from("PAT:" + this.token).toString("base64");
      }
      canHandleAuthentication(response) {
        return false;
      }
      handleAuthentication(httpClient, requestInfo, objs) {
        return null;
      }
    };
    exports.PersonalAccessTokenCredentialHandler = PersonalAccessTokenCredentialHandler;
  }
});

// node_modules/@actions/core/lib/oidc-utils.js
var require_oidc_utils = __commonJS({
  "node_modules/@actions/core/lib/oidc-utils.js"(exports) {
    "use strict";
    var __awaiter2 = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OidcClient = void 0;
    var http_client_1 = require_http_client();
    var auth_1 = require_auth();
    var core_1 = require_core();
    var OidcClient = class {
      static createHttpClient(allowRetry = true, maxRetry = 10) {
        const requestOptions = {
          allowRetries: allowRetry,
          maxRetries: maxRetry
        };
        return new http_client_1.HttpClient("actions/oidc-client", [new auth_1.BearerCredentialHandler(OidcClient.getRequestToken())], requestOptions);
      }
      static getRequestToken() {
        const token = process.env["ACTIONS_ID_TOKEN_REQUEST_TOKEN"];
        if (!token) {
          throw new Error("Unable to get ACTIONS_ID_TOKEN_REQUEST_TOKEN env variable");
        }
        return token;
      }
      static getIDTokenUrl() {
        const runtimeUrl = process.env["ACTIONS_ID_TOKEN_REQUEST_URL"];
        if (!runtimeUrl) {
          throw new Error("Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable");
        }
        return runtimeUrl;
      }
      static getCall(id_token_url) {
        var _a;
        return __awaiter2(this, void 0, void 0, function* () {
          const httpclient = OidcClient.createHttpClient();
          const res = yield httpclient.getJson(id_token_url).catch((error) => {
            throw new Error(`Failed to get ID Token. 
 
        Error Code : ${error.statusCode}
 
        Error Message: ${error.result.message}`);
          });
          const id_token = (_a = res.result) === null || _a === void 0 ? void 0 : _a.value;
          if (!id_token) {
            throw new Error("Response json body do not have ID Token field");
          }
          return id_token;
        });
      }
      static getIDToken(audience) {
        return __awaiter2(this, void 0, void 0, function* () {
          try {
            let id_token_url = OidcClient.getIDTokenUrl();
            if (audience) {
              const encodedAudience = encodeURIComponent(audience);
              id_token_url = `${id_token_url}&audience=${encodedAudience}`;
            }
            core_1.debug(`ID token url is ${id_token_url}`);
            const id_token = yield OidcClient.getCall(id_token_url);
            core_1.setSecret(id_token);
            return id_token;
          } catch (error) {
            throw new Error(`Error message: ${error.message}`);
          }
        });
      }
    };
    exports.OidcClient = OidcClient;
  }
});

// node_modules/@actions/core/lib/core.js
var require_core = __commonJS({
  "node_modules/@actions/core/lib/core.js"(exports) {
    "use strict";
    var __createBinding2 = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar2 = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.hasOwnProperty.call(mod, k))
            __createBinding2(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __awaiter2 = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getIDToken = exports.getState = exports.saveState = exports.group = exports.endGroup = exports.startGroup = exports.info = exports.notice = exports.warning = exports.error = exports.debug = exports.isDebug = exports.setFailed = exports.setCommandEcho = exports.setOutput = exports.getBooleanInput = exports.getMultilineInput = exports.getInput = exports.addPath = exports.setSecret = exports.exportVariable = exports.ExitCode = void 0;
    var command_1 = require_command();
    var file_command_1 = require_file_command();
    var utils_1 = require_utils();
    var os = __importStar2(require("os"));
    var path3 = __importStar2(require("path"));
    var oidc_utils_1 = require_oidc_utils();
    var ExitCode;
    (function(ExitCode2) {
      ExitCode2[ExitCode2["Success"] = 0] = "Success";
      ExitCode2[ExitCode2["Failure"] = 1] = "Failure";
    })(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
    function exportVariable(name4, val) {
      const convertedVal = utils_1.toCommandValue(val);
      process.env[name4] = convertedVal;
      const filePath = process.env["GITHUB_ENV"] || "";
      if (filePath) {
        const delimiter = "_GitHubActionsFileCommandDelimeter_";
        const commandValue = `${name4}<<${delimiter}${os.EOL}${convertedVal}${os.EOL}${delimiter}`;
        file_command_1.issueCommand("ENV", commandValue);
      } else {
        command_1.issueCommand("set-env", { name: name4 }, convertedVal);
      }
    }
    exports.exportVariable = exportVariable;
    function setSecret(secret) {
      command_1.issueCommand("add-mask", {}, secret);
    }
    exports.setSecret = setSecret;
    function addPath(inputPath) {
      const filePath = process.env["GITHUB_PATH"] || "";
      if (filePath) {
        file_command_1.issueCommand("PATH", inputPath);
      } else {
        command_1.issueCommand("add-path", {}, inputPath);
      }
      process.env["PATH"] = `${inputPath}${path3.delimiter}${process.env["PATH"]}`;
    }
    exports.addPath = addPath;
    function getInput(name4, options) {
      const val = process.env[`INPUT_${name4.replace(/ /g, "_").toUpperCase()}`] || "";
      if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name4}`);
      }
      if (options && options.trimWhitespace === false) {
        return val;
      }
      return val.trim();
    }
    exports.getInput = getInput;
    function getMultilineInput(name4, options) {
      const inputs = getInput(name4, options).split("\n").filter((x) => x !== "");
      return inputs;
    }
    exports.getMultilineInput = getMultilineInput;
    function getBooleanInput(name4, options) {
      const trueValue = ["true", "True", "TRUE"];
      const falseValue = ["false", "False", "FALSE"];
      const val = getInput(name4, options);
      if (trueValue.includes(val))
        return true;
      if (falseValue.includes(val))
        return false;
      throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${name4}
Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
    }
    exports.getBooleanInput = getBooleanInput;
    function setOutput(name4, value) {
      process.stdout.write(os.EOL);
      command_1.issueCommand("set-output", { name: name4 }, value);
    }
    exports.setOutput = setOutput;
    function setCommandEcho(enabled) {
      command_1.issue("echo", enabled ? "on" : "off");
    }
    exports.setCommandEcho = setCommandEcho;
    function setFailed(message) {
      process.exitCode = ExitCode.Failure;
      error(message);
    }
    exports.setFailed = setFailed;
    function isDebug() {
      return process.env["RUNNER_DEBUG"] === "1";
    }
    exports.isDebug = isDebug;
    function debug(message) {
      command_1.issueCommand("debug", {}, message);
    }
    exports.debug = debug;
    function error(message, properties = {}) {
      command_1.issueCommand("error", utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
    }
    exports.error = error;
    function warning(message, properties = {}) {
      command_1.issueCommand("warning", utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
    }
    exports.warning = warning;
    function notice(message, properties = {}) {
      command_1.issueCommand("notice", utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
    }
    exports.notice = notice;
    function info(message) {
      process.stdout.write(message + os.EOL);
    }
    exports.info = info;
    function startGroup(name4) {
      command_1.issue("group", name4);
    }
    exports.startGroup = startGroup;
    function endGroup() {
      command_1.issue("endgroup");
    }
    exports.endGroup = endGroup;
    function group(name4, fn) {
      return __awaiter2(this, void 0, void 0, function* () {
        startGroup(name4);
        let result;
        try {
          result = yield fn();
        } finally {
          endGroup();
        }
        return result;
      });
    }
    exports.group = group;
    function saveState(name4, value) {
      command_1.issueCommand("save-state", { name: name4 }, value);
    }
    exports.saveState = saveState;
    function getState(name4) {
      return process.env[`STATE_${name4}`] || "";
    }
    exports.getState = getState;
    function getIDToken(aud) {
      return __awaiter2(this, void 0, void 0, function* () {
        return yield oidc_utils_1.OidcClient.getIDToken(aud);
      });
    }
    exports.getIDToken = getIDToken;
  }
});

// node_modules/tslib/tslib.js
var require_tslib = __commonJS({
  "node_modules/tslib/tslib.js"(exports, module5) {
    var __extends2;
    var __assign2;
    var __rest2;
    var __decorate2;
    var __param2;
    var __metadata2;
    var __awaiter2;
    var __generator2;
    var __exportStar2;
    var __values3;
    var __read2;
    var __spread2;
    var __spreadArrays2;
    var __spreadArray2;
    var __await2;
    var __asyncGenerator2;
    var __asyncDelegator2;
    var __asyncValues2;
    var __makeTemplateObject2;
    var __importStar2;
    var __importDefault2;
    var __classPrivateFieldGet2;
    var __classPrivateFieldSet2;
    var __createBinding2;
    (function(factory) {
      var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
      if (typeof define === "function" && define.amd) {
        define("tslib", ["exports"], function(exports2) {
          factory(createExporter(root, createExporter(exports2)));
        });
      } else if (typeof module5 === "object" && typeof module5.exports === "object") {
        factory(createExporter(root, createExporter(module5.exports)));
      } else {
        factory(createExporter(root));
      }
      function createExporter(exports2, previous) {
        if (exports2 !== root) {
          if (typeof Object.create === "function") {
            Object.defineProperty(exports2, "__esModule", { value: true });
          } else {
            exports2.__esModule = true;
          }
        }
        return function(id, v) {
          return exports2[id] = previous ? previous(id, v) : v;
        };
      }
    })(function(exporter) {
      var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
        d.__proto__ = b;
      } || function(d, b) {
        for (var p in b)
          if (Object.prototype.hasOwnProperty.call(b, p))
            d[p] = b[p];
      };
      __extends2 = function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
      __assign2 = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      __rest2 = function(s, e) {
        var t = {};
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
          for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
              t[p[i]] = s[p[i]];
          }
        return t;
      };
      __decorate2 = function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      __param2 = function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      __metadata2 = function(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(metadataKey, metadataValue);
      };
      __awaiter2 = function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      __generator2 = function(thisArg, body) {
        var _ = { label: 0, sent: function() {
          if (t[0] & 1)
            throw t[1];
          return t[1];
        }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
          return this;
        }), g;
        function verb(n) {
          return function(v) {
            return step([n, v]);
          };
        }
        function step(op) {
          if (f)
            throw new TypeError("Generator is already executing.");
          while (_)
            try {
              if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                return t;
              if (y = 0, t)
                op = [op[0] & 2, t.value];
              switch (op[0]) {
                case 0:
                case 1:
                  t = op;
                  break;
                case 4:
                  _.label++;
                  return { value: op[1], done: false };
                case 5:
                  _.label++;
                  y = op[1];
                  op = [0];
                  continue;
                case 7:
                  op = _.ops.pop();
                  _.trys.pop();
                  continue;
                default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                    _ = 0;
                    continue;
                  }
                  if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                    _.label = op[1];
                    break;
                  }
                  if (op[0] === 6 && _.label < t[1]) {
                    _.label = t[1];
                    t = op;
                    break;
                  }
                  if (t && _.label < t[2]) {
                    _.label = t[2];
                    _.ops.push(op);
                    break;
                  }
                  if (t[2])
                    _.ops.pop();
                  _.trys.pop();
                  continue;
              }
              op = body.call(thisArg, _);
            } catch (e) {
              op = [6, e];
              y = 0;
            } finally {
              f = t = 0;
            }
          if (op[0] & 5)
            throw op[1];
          return { value: op[0] ? op[1] : void 0, done: true };
        }
      };
      __exportStar2 = function(m, o) {
        for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
            __createBinding2(o, m, p);
      };
      __createBinding2 = Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() {
          return m[k];
        } });
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      };
      __values3 = function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
          return m.call(o);
        if (o && typeof o.length === "number")
          return {
            next: function() {
              if (o && i >= o.length)
                o = void 0;
              return { value: o && o[i++], done: !o };
            }
          };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
      };
      __read2 = function(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
          return o;
        var i = m.call(o), r, ar = [], e;
        try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
            ar.push(r.value);
        } catch (error) {
          e = { error };
        } finally {
          try {
            if (r && !r.done && (m = i["return"]))
              m.call(i);
          } finally {
            if (e)
              throw e.error;
          }
        }
        return ar;
      };
      __spread2 = function() {
        for (var ar = [], i = 0; i < arguments.length; i++)
          ar = ar.concat(__read2(arguments[i]));
        return ar;
      };
      __spreadArrays2 = function() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
          s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
          for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
        return r;
      };
      __spreadArray2 = function(to, from, pack) {
        if (pack || arguments.length === 2)
          for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
              if (!ar)
                ar = Array.prototype.slice.call(from, 0, i);
              ar[i] = from[i];
            }
          }
        return to.concat(ar || Array.prototype.slice.call(from));
      };
      __await2 = function(v) {
        return this instanceof __await2 ? (this.v = v, this) : new __await2(v);
      };
      __asyncGenerator2 = function(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
          return this;
        }, i;
        function verb(n) {
          if (g[n])
            i[n] = function(v) {
              return new Promise(function(a, b) {
                q.push([n, v, a, b]) > 1 || resume(n, v);
              });
            };
        }
        function resume(n, v) {
          try {
            step(g[n](v));
          } catch (e) {
            settle(q[0][3], e);
          }
        }
        function step(r) {
          r.value instanceof __await2 ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
        }
        function fulfill(value) {
          resume("next", value);
        }
        function reject(value) {
          resume("throw", value);
        }
        function settle(f, v) {
          if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]);
        }
      };
      __asyncDelegator2 = function(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function(e) {
          throw e;
        }), verb("return"), i[Symbol.iterator] = function() {
          return this;
        }, i;
        function verb(n, f) {
          i[n] = o[n] ? function(v) {
            return (p = !p) ? { value: __await2(o[n](v)), done: n === "return" } : f ? f(v) : v;
          } : f;
        }
      };
      __asyncValues2 = function(o) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values3 === "function" ? __values3(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
          return this;
        }, i);
        function verb(n) {
          i[n] = o[n] && function(v) {
            return new Promise(function(resolve, reject) {
              v = o[n](v), settle(resolve, reject, v.done, v.value);
            });
          };
        }
        function settle(resolve, reject, d, v) {
          Promise.resolve(v).then(function(v2) {
            resolve({ value: v2, done: d });
          }, reject);
        }
      };
      __makeTemplateObject2 = function(cooked, raw) {
        if (Object.defineProperty) {
          Object.defineProperty(cooked, "raw", { value: raw });
        } else {
          cooked.raw = raw;
        }
        return cooked;
      };
      var __setModuleDefault = Object.create ? function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      } : function(o, v) {
        o["default"] = v;
      };
      __importStar2 = function(mod) {
        if (mod && mod.__esModule)
          return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding2(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      __importDefault2 = function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      __classPrivateFieldGet2 = function(receiver, state, kind, f) {
        if (kind === "a" && !f)
          throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
          throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
      };
      __classPrivateFieldSet2 = function(receiver, state, value, kind, f) {
        if (kind === "m")
          throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
          throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
          throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
      };
      exporter("__extends", __extends2);
      exporter("__assign", __assign2);
      exporter("__rest", __rest2);
      exporter("__decorate", __decorate2);
      exporter("__param", __param2);
      exporter("__metadata", __metadata2);
      exporter("__awaiter", __awaiter2);
      exporter("__generator", __generator2);
      exporter("__exportStar", __exportStar2);
      exporter("__createBinding", __createBinding2);
      exporter("__values", __values3);
      exporter("__read", __read2);
      exporter("__spread", __spread2);
      exporter("__spreadArrays", __spreadArrays2);
      exporter("__spreadArray", __spreadArray2);
      exporter("__await", __await2);
      exporter("__asyncGenerator", __asyncGenerator2);
      exporter("__asyncDelegator", __asyncDelegator2);
      exporter("__asyncValues", __asyncValues2);
      exporter("__makeTemplateObject", __makeTemplateObject2);
      exporter("__importStar", __importStar2);
      exporter("__importDefault", __importDefault2);
      exporter("__classPrivateFieldGet", __classPrivateFieldGet2);
      exporter("__classPrivateFieldSet", __classPrivateFieldSet2);
    });
  }
});

// node_modules/entities/lib/maps/entities.json
var require_entities = __commonJS({
  "node_modules/entities/lib/maps/entities.json"(exports, module5) {
    module5.exports = { Aacute: "\xC1", aacute: "\xE1", Abreve: "\u0102", abreve: "\u0103", ac: "\u223E", acd: "\u223F", acE: "\u223E\u0333", Acirc: "\xC2", acirc: "\xE2", acute: "\xB4", Acy: "\u0410", acy: "\u0430", AElig: "\xC6", aelig: "\xE6", af: "\u2061", Afr: "\u{1D504}", afr: "\u{1D51E}", Agrave: "\xC0", agrave: "\xE0", alefsym: "\u2135", aleph: "\u2135", Alpha: "\u0391", alpha: "\u03B1", Amacr: "\u0100", amacr: "\u0101", amalg: "\u2A3F", amp: "&", AMP: "&", andand: "\u2A55", And: "\u2A53", and: "\u2227", andd: "\u2A5C", andslope: "\u2A58", andv: "\u2A5A", ang: "\u2220", ange: "\u29A4", angle: "\u2220", angmsdaa: "\u29A8", angmsdab: "\u29A9", angmsdac: "\u29AA", angmsdad: "\u29AB", angmsdae: "\u29AC", angmsdaf: "\u29AD", angmsdag: "\u29AE", angmsdah: "\u29AF", angmsd: "\u2221", angrt: "\u221F", angrtvb: "\u22BE", angrtvbd: "\u299D", angsph: "\u2222", angst: "\xC5", angzarr: "\u237C", Aogon: "\u0104", aogon: "\u0105", Aopf: "\u{1D538}", aopf: "\u{1D552}", apacir: "\u2A6F", ap: "\u2248", apE: "\u2A70", ape: "\u224A", apid: "\u224B", apos: "'", ApplyFunction: "\u2061", approx: "\u2248", approxeq: "\u224A", Aring: "\xC5", aring: "\xE5", Ascr: "\u{1D49C}", ascr: "\u{1D4B6}", Assign: "\u2254", ast: "*", asymp: "\u2248", asympeq: "\u224D", Atilde: "\xC3", atilde: "\xE3", Auml: "\xC4", auml: "\xE4", awconint: "\u2233", awint: "\u2A11", backcong: "\u224C", backepsilon: "\u03F6", backprime: "\u2035", backsim: "\u223D", backsimeq: "\u22CD", Backslash: "\u2216", Barv: "\u2AE7", barvee: "\u22BD", barwed: "\u2305", Barwed: "\u2306", barwedge: "\u2305", bbrk: "\u23B5", bbrktbrk: "\u23B6", bcong: "\u224C", Bcy: "\u0411", bcy: "\u0431", bdquo: "\u201E", becaus: "\u2235", because: "\u2235", Because: "\u2235", bemptyv: "\u29B0", bepsi: "\u03F6", bernou: "\u212C", Bernoullis: "\u212C", Beta: "\u0392", beta: "\u03B2", beth: "\u2136", between: "\u226C", Bfr: "\u{1D505}", bfr: "\u{1D51F}", bigcap: "\u22C2", bigcirc: "\u25EF", bigcup: "\u22C3", bigodot: "\u2A00", bigoplus: "\u2A01", bigotimes: "\u2A02", bigsqcup: "\u2A06", bigstar: "\u2605", bigtriangledown: "\u25BD", bigtriangleup: "\u25B3", biguplus: "\u2A04", bigvee: "\u22C1", bigwedge: "\u22C0", bkarow: "\u290D", blacklozenge: "\u29EB", blacksquare: "\u25AA", blacktriangle: "\u25B4", blacktriangledown: "\u25BE", blacktriangleleft: "\u25C2", blacktriangleright: "\u25B8", blank: "\u2423", blk12: "\u2592", blk14: "\u2591", blk34: "\u2593", block: "\u2588", bne: "=\u20E5", bnequiv: "\u2261\u20E5", bNot: "\u2AED", bnot: "\u2310", Bopf: "\u{1D539}", bopf: "\u{1D553}", bot: "\u22A5", bottom: "\u22A5", bowtie: "\u22C8", boxbox: "\u29C9", boxdl: "\u2510", boxdL: "\u2555", boxDl: "\u2556", boxDL: "\u2557", boxdr: "\u250C", boxdR: "\u2552", boxDr: "\u2553", boxDR: "\u2554", boxh: "\u2500", boxH: "\u2550", boxhd: "\u252C", boxHd: "\u2564", boxhD: "\u2565", boxHD: "\u2566", boxhu: "\u2534", boxHu: "\u2567", boxhU: "\u2568", boxHU: "\u2569", boxminus: "\u229F", boxplus: "\u229E", boxtimes: "\u22A0", boxul: "\u2518", boxuL: "\u255B", boxUl: "\u255C", boxUL: "\u255D", boxur: "\u2514", boxuR: "\u2558", boxUr: "\u2559", boxUR: "\u255A", boxv: "\u2502", boxV: "\u2551", boxvh: "\u253C", boxvH: "\u256A", boxVh: "\u256B", boxVH: "\u256C", boxvl: "\u2524", boxvL: "\u2561", boxVl: "\u2562", boxVL: "\u2563", boxvr: "\u251C", boxvR: "\u255E", boxVr: "\u255F", boxVR: "\u2560", bprime: "\u2035", breve: "\u02D8", Breve: "\u02D8", brvbar: "\xA6", bscr: "\u{1D4B7}", Bscr: "\u212C", bsemi: "\u204F", bsim: "\u223D", bsime: "\u22CD", bsolb: "\u29C5", bsol: "\\", bsolhsub: "\u27C8", bull: "\u2022", bullet: "\u2022", bump: "\u224E", bumpE: "\u2AAE", bumpe: "\u224F", Bumpeq: "\u224E", bumpeq: "\u224F", Cacute: "\u0106", cacute: "\u0107", capand: "\u2A44", capbrcup: "\u2A49", capcap: "\u2A4B", cap: "\u2229", Cap: "\u22D2", capcup: "\u2A47", capdot: "\u2A40", CapitalDifferentialD: "\u2145", caps: "\u2229\uFE00", caret: "\u2041", caron: "\u02C7", Cayleys: "\u212D", ccaps: "\u2A4D", Ccaron: "\u010C", ccaron: "\u010D", Ccedil: "\xC7", ccedil: "\xE7", Ccirc: "\u0108", ccirc: "\u0109", Cconint: "\u2230", ccups: "\u2A4C", ccupssm: "\u2A50", Cdot: "\u010A", cdot: "\u010B", cedil: "\xB8", Cedilla: "\xB8", cemptyv: "\u29B2", cent: "\xA2", centerdot: "\xB7", CenterDot: "\xB7", cfr: "\u{1D520}", Cfr: "\u212D", CHcy: "\u0427", chcy: "\u0447", check: "\u2713", checkmark: "\u2713", Chi: "\u03A7", chi: "\u03C7", circ: "\u02C6", circeq: "\u2257", circlearrowleft: "\u21BA", circlearrowright: "\u21BB", circledast: "\u229B", circledcirc: "\u229A", circleddash: "\u229D", CircleDot: "\u2299", circledR: "\xAE", circledS: "\u24C8", CircleMinus: "\u2296", CirclePlus: "\u2295", CircleTimes: "\u2297", cir: "\u25CB", cirE: "\u29C3", cire: "\u2257", cirfnint: "\u2A10", cirmid: "\u2AEF", cirscir: "\u29C2", ClockwiseContourIntegral: "\u2232", CloseCurlyDoubleQuote: "\u201D", CloseCurlyQuote: "\u2019", clubs: "\u2663", clubsuit: "\u2663", colon: ":", Colon: "\u2237", Colone: "\u2A74", colone: "\u2254", coloneq: "\u2254", comma: ",", commat: "@", comp: "\u2201", compfn: "\u2218", complement: "\u2201", complexes: "\u2102", cong: "\u2245", congdot: "\u2A6D", Congruent: "\u2261", conint: "\u222E", Conint: "\u222F", ContourIntegral: "\u222E", copf: "\u{1D554}", Copf: "\u2102", coprod: "\u2210", Coproduct: "\u2210", copy: "\xA9", COPY: "\xA9", copysr: "\u2117", CounterClockwiseContourIntegral: "\u2233", crarr: "\u21B5", cross: "\u2717", Cross: "\u2A2F", Cscr: "\u{1D49E}", cscr: "\u{1D4B8}", csub: "\u2ACF", csube: "\u2AD1", csup: "\u2AD0", csupe: "\u2AD2", ctdot: "\u22EF", cudarrl: "\u2938", cudarrr: "\u2935", cuepr: "\u22DE", cuesc: "\u22DF", cularr: "\u21B6", cularrp: "\u293D", cupbrcap: "\u2A48", cupcap: "\u2A46", CupCap: "\u224D", cup: "\u222A", Cup: "\u22D3", cupcup: "\u2A4A", cupdot: "\u228D", cupor: "\u2A45", cups: "\u222A\uFE00", curarr: "\u21B7", curarrm: "\u293C", curlyeqprec: "\u22DE", curlyeqsucc: "\u22DF", curlyvee: "\u22CE", curlywedge: "\u22CF", curren: "\xA4", curvearrowleft: "\u21B6", curvearrowright: "\u21B7", cuvee: "\u22CE", cuwed: "\u22CF", cwconint: "\u2232", cwint: "\u2231", cylcty: "\u232D", dagger: "\u2020", Dagger: "\u2021", daleth: "\u2138", darr: "\u2193", Darr: "\u21A1", dArr: "\u21D3", dash: "\u2010", Dashv: "\u2AE4", dashv: "\u22A3", dbkarow: "\u290F", dblac: "\u02DD", Dcaron: "\u010E", dcaron: "\u010F", Dcy: "\u0414", dcy: "\u0434", ddagger: "\u2021", ddarr: "\u21CA", DD: "\u2145", dd: "\u2146", DDotrahd: "\u2911", ddotseq: "\u2A77", deg: "\xB0", Del: "\u2207", Delta: "\u0394", delta: "\u03B4", demptyv: "\u29B1", dfisht: "\u297F", Dfr: "\u{1D507}", dfr: "\u{1D521}", dHar: "\u2965", dharl: "\u21C3", dharr: "\u21C2", DiacriticalAcute: "\xB4", DiacriticalDot: "\u02D9", DiacriticalDoubleAcute: "\u02DD", DiacriticalGrave: "`", DiacriticalTilde: "\u02DC", diam: "\u22C4", diamond: "\u22C4", Diamond: "\u22C4", diamondsuit: "\u2666", diams: "\u2666", die: "\xA8", DifferentialD: "\u2146", digamma: "\u03DD", disin: "\u22F2", div: "\xF7", divide: "\xF7", divideontimes: "\u22C7", divonx: "\u22C7", DJcy: "\u0402", djcy: "\u0452", dlcorn: "\u231E", dlcrop: "\u230D", dollar: "$", Dopf: "\u{1D53B}", dopf: "\u{1D555}", Dot: "\xA8", dot: "\u02D9", DotDot: "\u20DC", doteq: "\u2250", doteqdot: "\u2251", DotEqual: "\u2250", dotminus: "\u2238", dotplus: "\u2214", dotsquare: "\u22A1", doublebarwedge: "\u2306", DoubleContourIntegral: "\u222F", DoubleDot: "\xA8", DoubleDownArrow: "\u21D3", DoubleLeftArrow: "\u21D0", DoubleLeftRightArrow: "\u21D4", DoubleLeftTee: "\u2AE4", DoubleLongLeftArrow: "\u27F8", DoubleLongLeftRightArrow: "\u27FA", DoubleLongRightArrow: "\u27F9", DoubleRightArrow: "\u21D2", DoubleRightTee: "\u22A8", DoubleUpArrow: "\u21D1", DoubleUpDownArrow: "\u21D5", DoubleVerticalBar: "\u2225", DownArrowBar: "\u2913", downarrow: "\u2193", DownArrow: "\u2193", Downarrow: "\u21D3", DownArrowUpArrow: "\u21F5", DownBreve: "\u0311", downdownarrows: "\u21CA", downharpoonleft: "\u21C3", downharpoonright: "\u21C2", DownLeftRightVector: "\u2950", DownLeftTeeVector: "\u295E", DownLeftVectorBar: "\u2956", DownLeftVector: "\u21BD", DownRightTeeVector: "\u295F", DownRightVectorBar: "\u2957", DownRightVector: "\u21C1", DownTeeArrow: "\u21A7", DownTee: "\u22A4", drbkarow: "\u2910", drcorn: "\u231F", drcrop: "\u230C", Dscr: "\u{1D49F}", dscr: "\u{1D4B9}", DScy: "\u0405", dscy: "\u0455", dsol: "\u29F6", Dstrok: "\u0110", dstrok: "\u0111", dtdot: "\u22F1", dtri: "\u25BF", dtrif: "\u25BE", duarr: "\u21F5", duhar: "\u296F", dwangle: "\u29A6", DZcy: "\u040F", dzcy: "\u045F", dzigrarr: "\u27FF", Eacute: "\xC9", eacute: "\xE9", easter: "\u2A6E", Ecaron: "\u011A", ecaron: "\u011B", Ecirc: "\xCA", ecirc: "\xEA", ecir: "\u2256", ecolon: "\u2255", Ecy: "\u042D", ecy: "\u044D", eDDot: "\u2A77", Edot: "\u0116", edot: "\u0117", eDot: "\u2251", ee: "\u2147", efDot: "\u2252", Efr: "\u{1D508}", efr: "\u{1D522}", eg: "\u2A9A", Egrave: "\xC8", egrave: "\xE8", egs: "\u2A96", egsdot: "\u2A98", el: "\u2A99", Element: "\u2208", elinters: "\u23E7", ell: "\u2113", els: "\u2A95", elsdot: "\u2A97", Emacr: "\u0112", emacr: "\u0113", empty: "\u2205", emptyset: "\u2205", EmptySmallSquare: "\u25FB", emptyv: "\u2205", EmptyVerySmallSquare: "\u25AB", emsp13: "\u2004", emsp14: "\u2005", emsp: "\u2003", ENG: "\u014A", eng: "\u014B", ensp: "\u2002", Eogon: "\u0118", eogon: "\u0119", Eopf: "\u{1D53C}", eopf: "\u{1D556}", epar: "\u22D5", eparsl: "\u29E3", eplus: "\u2A71", epsi: "\u03B5", Epsilon: "\u0395", epsilon: "\u03B5", epsiv: "\u03F5", eqcirc: "\u2256", eqcolon: "\u2255", eqsim: "\u2242", eqslantgtr: "\u2A96", eqslantless: "\u2A95", Equal: "\u2A75", equals: "=", EqualTilde: "\u2242", equest: "\u225F", Equilibrium: "\u21CC", equiv: "\u2261", equivDD: "\u2A78", eqvparsl: "\u29E5", erarr: "\u2971", erDot: "\u2253", escr: "\u212F", Escr: "\u2130", esdot: "\u2250", Esim: "\u2A73", esim: "\u2242", Eta: "\u0397", eta: "\u03B7", ETH: "\xD0", eth: "\xF0", Euml: "\xCB", euml: "\xEB", euro: "\u20AC", excl: "!", exist: "\u2203", Exists: "\u2203", expectation: "\u2130", exponentiale: "\u2147", ExponentialE: "\u2147", fallingdotseq: "\u2252", Fcy: "\u0424", fcy: "\u0444", female: "\u2640", ffilig: "\uFB03", fflig: "\uFB00", ffllig: "\uFB04", Ffr: "\u{1D509}", ffr: "\u{1D523}", filig: "\uFB01", FilledSmallSquare: "\u25FC", FilledVerySmallSquare: "\u25AA", fjlig: "fj", flat: "\u266D", fllig: "\uFB02", fltns: "\u25B1", fnof: "\u0192", Fopf: "\u{1D53D}", fopf: "\u{1D557}", forall: "\u2200", ForAll: "\u2200", fork: "\u22D4", forkv: "\u2AD9", Fouriertrf: "\u2131", fpartint: "\u2A0D", frac12: "\xBD", frac13: "\u2153", frac14: "\xBC", frac15: "\u2155", frac16: "\u2159", frac18: "\u215B", frac23: "\u2154", frac25: "\u2156", frac34: "\xBE", frac35: "\u2157", frac38: "\u215C", frac45: "\u2158", frac56: "\u215A", frac58: "\u215D", frac78: "\u215E", frasl: "\u2044", frown: "\u2322", fscr: "\u{1D4BB}", Fscr: "\u2131", gacute: "\u01F5", Gamma: "\u0393", gamma: "\u03B3", Gammad: "\u03DC", gammad: "\u03DD", gap: "\u2A86", Gbreve: "\u011E", gbreve: "\u011F", Gcedil: "\u0122", Gcirc: "\u011C", gcirc: "\u011D", Gcy: "\u0413", gcy: "\u0433", Gdot: "\u0120", gdot: "\u0121", ge: "\u2265", gE: "\u2267", gEl: "\u2A8C", gel: "\u22DB", geq: "\u2265", geqq: "\u2267", geqslant: "\u2A7E", gescc: "\u2AA9", ges: "\u2A7E", gesdot: "\u2A80", gesdoto: "\u2A82", gesdotol: "\u2A84", gesl: "\u22DB\uFE00", gesles: "\u2A94", Gfr: "\u{1D50A}", gfr: "\u{1D524}", gg: "\u226B", Gg: "\u22D9", ggg: "\u22D9", gimel: "\u2137", GJcy: "\u0403", gjcy: "\u0453", gla: "\u2AA5", gl: "\u2277", glE: "\u2A92", glj: "\u2AA4", gnap: "\u2A8A", gnapprox: "\u2A8A", gne: "\u2A88", gnE: "\u2269", gneq: "\u2A88", gneqq: "\u2269", gnsim: "\u22E7", Gopf: "\u{1D53E}", gopf: "\u{1D558}", grave: "`", GreaterEqual: "\u2265", GreaterEqualLess: "\u22DB", GreaterFullEqual: "\u2267", GreaterGreater: "\u2AA2", GreaterLess: "\u2277", GreaterSlantEqual: "\u2A7E", GreaterTilde: "\u2273", Gscr: "\u{1D4A2}", gscr: "\u210A", gsim: "\u2273", gsime: "\u2A8E", gsiml: "\u2A90", gtcc: "\u2AA7", gtcir: "\u2A7A", gt: ">", GT: ">", Gt: "\u226B", gtdot: "\u22D7", gtlPar: "\u2995", gtquest: "\u2A7C", gtrapprox: "\u2A86", gtrarr: "\u2978", gtrdot: "\u22D7", gtreqless: "\u22DB", gtreqqless: "\u2A8C", gtrless: "\u2277", gtrsim: "\u2273", gvertneqq: "\u2269\uFE00", gvnE: "\u2269\uFE00", Hacek: "\u02C7", hairsp: "\u200A", half: "\xBD", hamilt: "\u210B", HARDcy: "\u042A", hardcy: "\u044A", harrcir: "\u2948", harr: "\u2194", hArr: "\u21D4", harrw: "\u21AD", Hat: "^", hbar: "\u210F", Hcirc: "\u0124", hcirc: "\u0125", hearts: "\u2665", heartsuit: "\u2665", hellip: "\u2026", hercon: "\u22B9", hfr: "\u{1D525}", Hfr: "\u210C", HilbertSpace: "\u210B", hksearow: "\u2925", hkswarow: "\u2926", hoarr: "\u21FF", homtht: "\u223B", hookleftarrow: "\u21A9", hookrightarrow: "\u21AA", hopf: "\u{1D559}", Hopf: "\u210D", horbar: "\u2015", HorizontalLine: "\u2500", hscr: "\u{1D4BD}", Hscr: "\u210B", hslash: "\u210F", Hstrok: "\u0126", hstrok: "\u0127", HumpDownHump: "\u224E", HumpEqual: "\u224F", hybull: "\u2043", hyphen: "\u2010", Iacute: "\xCD", iacute: "\xED", ic: "\u2063", Icirc: "\xCE", icirc: "\xEE", Icy: "\u0418", icy: "\u0438", Idot: "\u0130", IEcy: "\u0415", iecy: "\u0435", iexcl: "\xA1", iff: "\u21D4", ifr: "\u{1D526}", Ifr: "\u2111", Igrave: "\xCC", igrave: "\xEC", ii: "\u2148", iiiint: "\u2A0C", iiint: "\u222D", iinfin: "\u29DC", iiota: "\u2129", IJlig: "\u0132", ijlig: "\u0133", Imacr: "\u012A", imacr: "\u012B", image: "\u2111", ImaginaryI: "\u2148", imagline: "\u2110", imagpart: "\u2111", imath: "\u0131", Im: "\u2111", imof: "\u22B7", imped: "\u01B5", Implies: "\u21D2", incare: "\u2105", in: "\u2208", infin: "\u221E", infintie: "\u29DD", inodot: "\u0131", intcal: "\u22BA", int: "\u222B", Int: "\u222C", integers: "\u2124", Integral: "\u222B", intercal: "\u22BA", Intersection: "\u22C2", intlarhk: "\u2A17", intprod: "\u2A3C", InvisibleComma: "\u2063", InvisibleTimes: "\u2062", IOcy: "\u0401", iocy: "\u0451", Iogon: "\u012E", iogon: "\u012F", Iopf: "\u{1D540}", iopf: "\u{1D55A}", Iota: "\u0399", iota: "\u03B9", iprod: "\u2A3C", iquest: "\xBF", iscr: "\u{1D4BE}", Iscr: "\u2110", isin: "\u2208", isindot: "\u22F5", isinE: "\u22F9", isins: "\u22F4", isinsv: "\u22F3", isinv: "\u2208", it: "\u2062", Itilde: "\u0128", itilde: "\u0129", Iukcy: "\u0406", iukcy: "\u0456", Iuml: "\xCF", iuml: "\xEF", Jcirc: "\u0134", jcirc: "\u0135", Jcy: "\u0419", jcy: "\u0439", Jfr: "\u{1D50D}", jfr: "\u{1D527}", jmath: "\u0237", Jopf: "\u{1D541}", jopf: "\u{1D55B}", Jscr: "\u{1D4A5}", jscr: "\u{1D4BF}", Jsercy: "\u0408", jsercy: "\u0458", Jukcy: "\u0404", jukcy: "\u0454", Kappa: "\u039A", kappa: "\u03BA", kappav: "\u03F0", Kcedil: "\u0136", kcedil: "\u0137", Kcy: "\u041A", kcy: "\u043A", Kfr: "\u{1D50E}", kfr: "\u{1D528}", kgreen: "\u0138", KHcy: "\u0425", khcy: "\u0445", KJcy: "\u040C", kjcy: "\u045C", Kopf: "\u{1D542}", kopf: "\u{1D55C}", Kscr: "\u{1D4A6}", kscr: "\u{1D4C0}", lAarr: "\u21DA", Lacute: "\u0139", lacute: "\u013A", laemptyv: "\u29B4", lagran: "\u2112", Lambda: "\u039B", lambda: "\u03BB", lang: "\u27E8", Lang: "\u27EA", langd: "\u2991", langle: "\u27E8", lap: "\u2A85", Laplacetrf: "\u2112", laquo: "\xAB", larrb: "\u21E4", larrbfs: "\u291F", larr: "\u2190", Larr: "\u219E", lArr: "\u21D0", larrfs: "\u291D", larrhk: "\u21A9", larrlp: "\u21AB", larrpl: "\u2939", larrsim: "\u2973", larrtl: "\u21A2", latail: "\u2919", lAtail: "\u291B", lat: "\u2AAB", late: "\u2AAD", lates: "\u2AAD\uFE00", lbarr: "\u290C", lBarr: "\u290E", lbbrk: "\u2772", lbrace: "{", lbrack: "[", lbrke: "\u298B", lbrksld: "\u298F", lbrkslu: "\u298D", Lcaron: "\u013D", lcaron: "\u013E", Lcedil: "\u013B", lcedil: "\u013C", lceil: "\u2308", lcub: "{", Lcy: "\u041B", lcy: "\u043B", ldca: "\u2936", ldquo: "\u201C", ldquor: "\u201E", ldrdhar: "\u2967", ldrushar: "\u294B", ldsh: "\u21B2", le: "\u2264", lE: "\u2266", LeftAngleBracket: "\u27E8", LeftArrowBar: "\u21E4", leftarrow: "\u2190", LeftArrow: "\u2190", Leftarrow: "\u21D0", LeftArrowRightArrow: "\u21C6", leftarrowtail: "\u21A2", LeftCeiling: "\u2308", LeftDoubleBracket: "\u27E6", LeftDownTeeVector: "\u2961", LeftDownVectorBar: "\u2959", LeftDownVector: "\u21C3", LeftFloor: "\u230A", leftharpoondown: "\u21BD", leftharpoonup: "\u21BC", leftleftarrows: "\u21C7", leftrightarrow: "\u2194", LeftRightArrow: "\u2194", Leftrightarrow: "\u21D4", leftrightarrows: "\u21C6", leftrightharpoons: "\u21CB", leftrightsquigarrow: "\u21AD", LeftRightVector: "\u294E", LeftTeeArrow: "\u21A4", LeftTee: "\u22A3", LeftTeeVector: "\u295A", leftthreetimes: "\u22CB", LeftTriangleBar: "\u29CF", LeftTriangle: "\u22B2", LeftTriangleEqual: "\u22B4", LeftUpDownVector: "\u2951", LeftUpTeeVector: "\u2960", LeftUpVectorBar: "\u2958", LeftUpVector: "\u21BF", LeftVectorBar: "\u2952", LeftVector: "\u21BC", lEg: "\u2A8B", leg: "\u22DA", leq: "\u2264", leqq: "\u2266", leqslant: "\u2A7D", lescc: "\u2AA8", les: "\u2A7D", lesdot: "\u2A7F", lesdoto: "\u2A81", lesdotor: "\u2A83", lesg: "\u22DA\uFE00", lesges: "\u2A93", lessapprox: "\u2A85", lessdot: "\u22D6", lesseqgtr: "\u22DA", lesseqqgtr: "\u2A8B", LessEqualGreater: "\u22DA", LessFullEqual: "\u2266", LessGreater: "\u2276", lessgtr: "\u2276", LessLess: "\u2AA1", lesssim: "\u2272", LessSlantEqual: "\u2A7D", LessTilde: "\u2272", lfisht: "\u297C", lfloor: "\u230A", Lfr: "\u{1D50F}", lfr: "\u{1D529}", lg: "\u2276", lgE: "\u2A91", lHar: "\u2962", lhard: "\u21BD", lharu: "\u21BC", lharul: "\u296A", lhblk: "\u2584", LJcy: "\u0409", ljcy: "\u0459", llarr: "\u21C7", ll: "\u226A", Ll: "\u22D8", llcorner: "\u231E", Lleftarrow: "\u21DA", llhard: "\u296B", lltri: "\u25FA", Lmidot: "\u013F", lmidot: "\u0140", lmoustache: "\u23B0", lmoust: "\u23B0", lnap: "\u2A89", lnapprox: "\u2A89", lne: "\u2A87", lnE: "\u2268", lneq: "\u2A87", lneqq: "\u2268", lnsim: "\u22E6", loang: "\u27EC", loarr: "\u21FD", lobrk: "\u27E6", longleftarrow: "\u27F5", LongLeftArrow: "\u27F5", Longleftarrow: "\u27F8", longleftrightarrow: "\u27F7", LongLeftRightArrow: "\u27F7", Longleftrightarrow: "\u27FA", longmapsto: "\u27FC", longrightarrow: "\u27F6", LongRightArrow: "\u27F6", Longrightarrow: "\u27F9", looparrowleft: "\u21AB", looparrowright: "\u21AC", lopar: "\u2985", Lopf: "\u{1D543}", lopf: "\u{1D55D}", loplus: "\u2A2D", lotimes: "\u2A34", lowast: "\u2217", lowbar: "_", LowerLeftArrow: "\u2199", LowerRightArrow: "\u2198", loz: "\u25CA", lozenge: "\u25CA", lozf: "\u29EB", lpar: "(", lparlt: "\u2993", lrarr: "\u21C6", lrcorner: "\u231F", lrhar: "\u21CB", lrhard: "\u296D", lrm: "\u200E", lrtri: "\u22BF", lsaquo: "\u2039", lscr: "\u{1D4C1}", Lscr: "\u2112", lsh: "\u21B0", Lsh: "\u21B0", lsim: "\u2272", lsime: "\u2A8D", lsimg: "\u2A8F", lsqb: "[", lsquo: "\u2018", lsquor: "\u201A", Lstrok: "\u0141", lstrok: "\u0142", ltcc: "\u2AA6", ltcir: "\u2A79", lt: "<", LT: "<", Lt: "\u226A", ltdot: "\u22D6", lthree: "\u22CB", ltimes: "\u22C9", ltlarr: "\u2976", ltquest: "\u2A7B", ltri: "\u25C3", ltrie: "\u22B4", ltrif: "\u25C2", ltrPar: "\u2996", lurdshar: "\u294A", luruhar: "\u2966", lvertneqq: "\u2268\uFE00", lvnE: "\u2268\uFE00", macr: "\xAF", male: "\u2642", malt: "\u2720", maltese: "\u2720", Map: "\u2905", map: "\u21A6", mapsto: "\u21A6", mapstodown: "\u21A7", mapstoleft: "\u21A4", mapstoup: "\u21A5", marker: "\u25AE", mcomma: "\u2A29", Mcy: "\u041C", mcy: "\u043C", mdash: "\u2014", mDDot: "\u223A", measuredangle: "\u2221", MediumSpace: "\u205F", Mellintrf: "\u2133", Mfr: "\u{1D510}", mfr: "\u{1D52A}", mho: "\u2127", micro: "\xB5", midast: "*", midcir: "\u2AF0", mid: "\u2223", middot: "\xB7", minusb: "\u229F", minus: "\u2212", minusd: "\u2238", minusdu: "\u2A2A", MinusPlus: "\u2213", mlcp: "\u2ADB", mldr: "\u2026", mnplus: "\u2213", models: "\u22A7", Mopf: "\u{1D544}", mopf: "\u{1D55E}", mp: "\u2213", mscr: "\u{1D4C2}", Mscr: "\u2133", mstpos: "\u223E", Mu: "\u039C", mu: "\u03BC", multimap: "\u22B8", mumap: "\u22B8", nabla: "\u2207", Nacute: "\u0143", nacute: "\u0144", nang: "\u2220\u20D2", nap: "\u2249", napE: "\u2A70\u0338", napid: "\u224B\u0338", napos: "\u0149", napprox: "\u2249", natural: "\u266E", naturals: "\u2115", natur: "\u266E", nbsp: "\xA0", nbump: "\u224E\u0338", nbumpe: "\u224F\u0338", ncap: "\u2A43", Ncaron: "\u0147", ncaron: "\u0148", Ncedil: "\u0145", ncedil: "\u0146", ncong: "\u2247", ncongdot: "\u2A6D\u0338", ncup: "\u2A42", Ncy: "\u041D", ncy: "\u043D", ndash: "\u2013", nearhk: "\u2924", nearr: "\u2197", neArr: "\u21D7", nearrow: "\u2197", ne: "\u2260", nedot: "\u2250\u0338", NegativeMediumSpace: "\u200B", NegativeThickSpace: "\u200B", NegativeThinSpace: "\u200B", NegativeVeryThinSpace: "\u200B", nequiv: "\u2262", nesear: "\u2928", nesim: "\u2242\u0338", NestedGreaterGreater: "\u226B", NestedLessLess: "\u226A", NewLine: "\n", nexist: "\u2204", nexists: "\u2204", Nfr: "\u{1D511}", nfr: "\u{1D52B}", ngE: "\u2267\u0338", nge: "\u2271", ngeq: "\u2271", ngeqq: "\u2267\u0338", ngeqslant: "\u2A7E\u0338", nges: "\u2A7E\u0338", nGg: "\u22D9\u0338", ngsim: "\u2275", nGt: "\u226B\u20D2", ngt: "\u226F", ngtr: "\u226F", nGtv: "\u226B\u0338", nharr: "\u21AE", nhArr: "\u21CE", nhpar: "\u2AF2", ni: "\u220B", nis: "\u22FC", nisd: "\u22FA", niv: "\u220B", NJcy: "\u040A", njcy: "\u045A", nlarr: "\u219A", nlArr: "\u21CD", nldr: "\u2025", nlE: "\u2266\u0338", nle: "\u2270", nleftarrow: "\u219A", nLeftarrow: "\u21CD", nleftrightarrow: "\u21AE", nLeftrightarrow: "\u21CE", nleq: "\u2270", nleqq: "\u2266\u0338", nleqslant: "\u2A7D\u0338", nles: "\u2A7D\u0338", nless: "\u226E", nLl: "\u22D8\u0338", nlsim: "\u2274", nLt: "\u226A\u20D2", nlt: "\u226E", nltri: "\u22EA", nltrie: "\u22EC", nLtv: "\u226A\u0338", nmid: "\u2224", NoBreak: "\u2060", NonBreakingSpace: "\xA0", nopf: "\u{1D55F}", Nopf: "\u2115", Not: "\u2AEC", not: "\xAC", NotCongruent: "\u2262", NotCupCap: "\u226D", NotDoubleVerticalBar: "\u2226", NotElement: "\u2209", NotEqual: "\u2260", NotEqualTilde: "\u2242\u0338", NotExists: "\u2204", NotGreater: "\u226F", NotGreaterEqual: "\u2271", NotGreaterFullEqual: "\u2267\u0338", NotGreaterGreater: "\u226B\u0338", NotGreaterLess: "\u2279", NotGreaterSlantEqual: "\u2A7E\u0338", NotGreaterTilde: "\u2275", NotHumpDownHump: "\u224E\u0338", NotHumpEqual: "\u224F\u0338", notin: "\u2209", notindot: "\u22F5\u0338", notinE: "\u22F9\u0338", notinva: "\u2209", notinvb: "\u22F7", notinvc: "\u22F6", NotLeftTriangleBar: "\u29CF\u0338", NotLeftTriangle: "\u22EA", NotLeftTriangleEqual: "\u22EC", NotLess: "\u226E", NotLessEqual: "\u2270", NotLessGreater: "\u2278", NotLessLess: "\u226A\u0338", NotLessSlantEqual: "\u2A7D\u0338", NotLessTilde: "\u2274", NotNestedGreaterGreater: "\u2AA2\u0338", NotNestedLessLess: "\u2AA1\u0338", notni: "\u220C", notniva: "\u220C", notnivb: "\u22FE", notnivc: "\u22FD", NotPrecedes: "\u2280", NotPrecedesEqual: "\u2AAF\u0338", NotPrecedesSlantEqual: "\u22E0", NotReverseElement: "\u220C", NotRightTriangleBar: "\u29D0\u0338", NotRightTriangle: "\u22EB", NotRightTriangleEqual: "\u22ED", NotSquareSubset: "\u228F\u0338", NotSquareSubsetEqual: "\u22E2", NotSquareSuperset: "\u2290\u0338", NotSquareSupersetEqual: "\u22E3", NotSubset: "\u2282\u20D2", NotSubsetEqual: "\u2288", NotSucceeds: "\u2281", NotSucceedsEqual: "\u2AB0\u0338", NotSucceedsSlantEqual: "\u22E1", NotSucceedsTilde: "\u227F\u0338", NotSuperset: "\u2283\u20D2", NotSupersetEqual: "\u2289", NotTilde: "\u2241", NotTildeEqual: "\u2244", NotTildeFullEqual: "\u2247", NotTildeTilde: "\u2249", NotVerticalBar: "\u2224", nparallel: "\u2226", npar: "\u2226", nparsl: "\u2AFD\u20E5", npart: "\u2202\u0338", npolint: "\u2A14", npr: "\u2280", nprcue: "\u22E0", nprec: "\u2280", npreceq: "\u2AAF\u0338", npre: "\u2AAF\u0338", nrarrc: "\u2933\u0338", nrarr: "\u219B", nrArr: "\u21CF", nrarrw: "\u219D\u0338", nrightarrow: "\u219B", nRightarrow: "\u21CF", nrtri: "\u22EB", nrtrie: "\u22ED", nsc: "\u2281", nsccue: "\u22E1", nsce: "\u2AB0\u0338", Nscr: "\u{1D4A9}", nscr: "\u{1D4C3}", nshortmid: "\u2224", nshortparallel: "\u2226", nsim: "\u2241", nsime: "\u2244", nsimeq: "\u2244", nsmid: "\u2224", nspar: "\u2226", nsqsube: "\u22E2", nsqsupe: "\u22E3", nsub: "\u2284", nsubE: "\u2AC5\u0338", nsube: "\u2288", nsubset: "\u2282\u20D2", nsubseteq: "\u2288", nsubseteqq: "\u2AC5\u0338", nsucc: "\u2281", nsucceq: "\u2AB0\u0338", nsup: "\u2285", nsupE: "\u2AC6\u0338", nsupe: "\u2289", nsupset: "\u2283\u20D2", nsupseteq: "\u2289", nsupseteqq: "\u2AC6\u0338", ntgl: "\u2279", Ntilde: "\xD1", ntilde: "\xF1", ntlg: "\u2278", ntriangleleft: "\u22EA", ntrianglelefteq: "\u22EC", ntriangleright: "\u22EB", ntrianglerighteq: "\u22ED", Nu: "\u039D", nu: "\u03BD", num: "#", numero: "\u2116", numsp: "\u2007", nvap: "\u224D\u20D2", nvdash: "\u22AC", nvDash: "\u22AD", nVdash: "\u22AE", nVDash: "\u22AF", nvge: "\u2265\u20D2", nvgt: ">\u20D2", nvHarr: "\u2904", nvinfin: "\u29DE", nvlArr: "\u2902", nvle: "\u2264\u20D2", nvlt: "<\u20D2", nvltrie: "\u22B4\u20D2", nvrArr: "\u2903", nvrtrie: "\u22B5\u20D2", nvsim: "\u223C\u20D2", nwarhk: "\u2923", nwarr: "\u2196", nwArr: "\u21D6", nwarrow: "\u2196", nwnear: "\u2927", Oacute: "\xD3", oacute: "\xF3", oast: "\u229B", Ocirc: "\xD4", ocirc: "\xF4", ocir: "\u229A", Ocy: "\u041E", ocy: "\u043E", odash: "\u229D", Odblac: "\u0150", odblac: "\u0151", odiv: "\u2A38", odot: "\u2299", odsold: "\u29BC", OElig: "\u0152", oelig: "\u0153", ofcir: "\u29BF", Ofr: "\u{1D512}", ofr: "\u{1D52C}", ogon: "\u02DB", Ograve: "\xD2", ograve: "\xF2", ogt: "\u29C1", ohbar: "\u29B5", ohm: "\u03A9", oint: "\u222E", olarr: "\u21BA", olcir: "\u29BE", olcross: "\u29BB", oline: "\u203E", olt: "\u29C0", Omacr: "\u014C", omacr: "\u014D", Omega: "\u03A9", omega: "\u03C9", Omicron: "\u039F", omicron: "\u03BF", omid: "\u29B6", ominus: "\u2296", Oopf: "\u{1D546}", oopf: "\u{1D560}", opar: "\u29B7", OpenCurlyDoubleQuote: "\u201C", OpenCurlyQuote: "\u2018", operp: "\u29B9", oplus: "\u2295", orarr: "\u21BB", Or: "\u2A54", or: "\u2228", ord: "\u2A5D", order: "\u2134", orderof: "\u2134", ordf: "\xAA", ordm: "\xBA", origof: "\u22B6", oror: "\u2A56", orslope: "\u2A57", orv: "\u2A5B", oS: "\u24C8", Oscr: "\u{1D4AA}", oscr: "\u2134", Oslash: "\xD8", oslash: "\xF8", osol: "\u2298", Otilde: "\xD5", otilde: "\xF5", otimesas: "\u2A36", Otimes: "\u2A37", otimes: "\u2297", Ouml: "\xD6", ouml: "\xF6", ovbar: "\u233D", OverBar: "\u203E", OverBrace: "\u23DE", OverBracket: "\u23B4", OverParenthesis: "\u23DC", para: "\xB6", parallel: "\u2225", par: "\u2225", parsim: "\u2AF3", parsl: "\u2AFD", part: "\u2202", PartialD: "\u2202", Pcy: "\u041F", pcy: "\u043F", percnt: "%", period: ".", permil: "\u2030", perp: "\u22A5", pertenk: "\u2031", Pfr: "\u{1D513}", pfr: "\u{1D52D}", Phi: "\u03A6", phi: "\u03C6", phiv: "\u03D5", phmmat: "\u2133", phone: "\u260E", Pi: "\u03A0", pi: "\u03C0", pitchfork: "\u22D4", piv: "\u03D6", planck: "\u210F", planckh: "\u210E", plankv: "\u210F", plusacir: "\u2A23", plusb: "\u229E", pluscir: "\u2A22", plus: "+", plusdo: "\u2214", plusdu: "\u2A25", pluse: "\u2A72", PlusMinus: "\xB1", plusmn: "\xB1", plussim: "\u2A26", plustwo: "\u2A27", pm: "\xB1", Poincareplane: "\u210C", pointint: "\u2A15", popf: "\u{1D561}", Popf: "\u2119", pound: "\xA3", prap: "\u2AB7", Pr: "\u2ABB", pr: "\u227A", prcue: "\u227C", precapprox: "\u2AB7", prec: "\u227A", preccurlyeq: "\u227C", Precedes: "\u227A", PrecedesEqual: "\u2AAF", PrecedesSlantEqual: "\u227C", PrecedesTilde: "\u227E", preceq: "\u2AAF", precnapprox: "\u2AB9", precneqq: "\u2AB5", precnsim: "\u22E8", pre: "\u2AAF", prE: "\u2AB3", precsim: "\u227E", prime: "\u2032", Prime: "\u2033", primes: "\u2119", prnap: "\u2AB9", prnE: "\u2AB5", prnsim: "\u22E8", prod: "\u220F", Product: "\u220F", profalar: "\u232E", profline: "\u2312", profsurf: "\u2313", prop: "\u221D", Proportional: "\u221D", Proportion: "\u2237", propto: "\u221D", prsim: "\u227E", prurel: "\u22B0", Pscr: "\u{1D4AB}", pscr: "\u{1D4C5}", Psi: "\u03A8", psi: "\u03C8", puncsp: "\u2008", Qfr: "\u{1D514}", qfr: "\u{1D52E}", qint: "\u2A0C", qopf: "\u{1D562}", Qopf: "\u211A", qprime: "\u2057", Qscr: "\u{1D4AC}", qscr: "\u{1D4C6}", quaternions: "\u210D", quatint: "\u2A16", quest: "?", questeq: "\u225F", quot: '"', QUOT: '"', rAarr: "\u21DB", race: "\u223D\u0331", Racute: "\u0154", racute: "\u0155", radic: "\u221A", raemptyv: "\u29B3", rang: "\u27E9", Rang: "\u27EB", rangd: "\u2992", range: "\u29A5", rangle: "\u27E9", raquo: "\xBB", rarrap: "\u2975", rarrb: "\u21E5", rarrbfs: "\u2920", rarrc: "\u2933", rarr: "\u2192", Rarr: "\u21A0", rArr: "\u21D2", rarrfs: "\u291E", rarrhk: "\u21AA", rarrlp: "\u21AC", rarrpl: "\u2945", rarrsim: "\u2974", Rarrtl: "\u2916", rarrtl: "\u21A3", rarrw: "\u219D", ratail: "\u291A", rAtail: "\u291C", ratio: "\u2236", rationals: "\u211A", rbarr: "\u290D", rBarr: "\u290F", RBarr: "\u2910", rbbrk: "\u2773", rbrace: "}", rbrack: "]", rbrke: "\u298C", rbrksld: "\u298E", rbrkslu: "\u2990", Rcaron: "\u0158", rcaron: "\u0159", Rcedil: "\u0156", rcedil: "\u0157", rceil: "\u2309", rcub: "}", Rcy: "\u0420", rcy: "\u0440", rdca: "\u2937", rdldhar: "\u2969", rdquo: "\u201D", rdquor: "\u201D", rdsh: "\u21B3", real: "\u211C", realine: "\u211B", realpart: "\u211C", reals: "\u211D", Re: "\u211C", rect: "\u25AD", reg: "\xAE", REG: "\xAE", ReverseElement: "\u220B", ReverseEquilibrium: "\u21CB", ReverseUpEquilibrium: "\u296F", rfisht: "\u297D", rfloor: "\u230B", rfr: "\u{1D52F}", Rfr: "\u211C", rHar: "\u2964", rhard: "\u21C1", rharu: "\u21C0", rharul: "\u296C", Rho: "\u03A1", rho: "\u03C1", rhov: "\u03F1", RightAngleBracket: "\u27E9", RightArrowBar: "\u21E5", rightarrow: "\u2192", RightArrow: "\u2192", Rightarrow: "\u21D2", RightArrowLeftArrow: "\u21C4", rightarrowtail: "\u21A3", RightCeiling: "\u2309", RightDoubleBracket: "\u27E7", RightDownTeeVector: "\u295D", RightDownVectorBar: "\u2955", RightDownVector: "\u21C2", RightFloor: "\u230B", rightharpoondown: "\u21C1", rightharpoonup: "\u21C0", rightleftarrows: "\u21C4", rightleftharpoons: "\u21CC", rightrightarrows: "\u21C9", rightsquigarrow: "\u219D", RightTeeArrow: "\u21A6", RightTee: "\u22A2", RightTeeVector: "\u295B", rightthreetimes: "\u22CC", RightTriangleBar: "\u29D0", RightTriangle: "\u22B3", RightTriangleEqual: "\u22B5", RightUpDownVector: "\u294F", RightUpTeeVector: "\u295C", RightUpVectorBar: "\u2954", RightUpVector: "\u21BE", RightVectorBar: "\u2953", RightVector: "\u21C0", ring: "\u02DA", risingdotseq: "\u2253", rlarr: "\u21C4", rlhar: "\u21CC", rlm: "\u200F", rmoustache: "\u23B1", rmoust: "\u23B1", rnmid: "\u2AEE", roang: "\u27ED", roarr: "\u21FE", robrk: "\u27E7", ropar: "\u2986", ropf: "\u{1D563}", Ropf: "\u211D", roplus: "\u2A2E", rotimes: "\u2A35", RoundImplies: "\u2970", rpar: ")", rpargt: "\u2994", rppolint: "\u2A12", rrarr: "\u21C9", Rrightarrow: "\u21DB", rsaquo: "\u203A", rscr: "\u{1D4C7}", Rscr: "\u211B", rsh: "\u21B1", Rsh: "\u21B1", rsqb: "]", rsquo: "\u2019", rsquor: "\u2019", rthree: "\u22CC", rtimes: "\u22CA", rtri: "\u25B9", rtrie: "\u22B5", rtrif: "\u25B8", rtriltri: "\u29CE", RuleDelayed: "\u29F4", ruluhar: "\u2968", rx: "\u211E", Sacute: "\u015A", sacute: "\u015B", sbquo: "\u201A", scap: "\u2AB8", Scaron: "\u0160", scaron: "\u0161", Sc: "\u2ABC", sc: "\u227B", sccue: "\u227D", sce: "\u2AB0", scE: "\u2AB4", Scedil: "\u015E", scedil: "\u015F", Scirc: "\u015C", scirc: "\u015D", scnap: "\u2ABA", scnE: "\u2AB6", scnsim: "\u22E9", scpolint: "\u2A13", scsim: "\u227F", Scy: "\u0421", scy: "\u0441", sdotb: "\u22A1", sdot: "\u22C5", sdote: "\u2A66", searhk: "\u2925", searr: "\u2198", seArr: "\u21D8", searrow: "\u2198", sect: "\xA7", semi: ";", seswar: "\u2929", setminus: "\u2216", setmn: "\u2216", sext: "\u2736", Sfr: "\u{1D516}", sfr: "\u{1D530}", sfrown: "\u2322", sharp: "\u266F", SHCHcy: "\u0429", shchcy: "\u0449", SHcy: "\u0428", shcy: "\u0448", ShortDownArrow: "\u2193", ShortLeftArrow: "\u2190", shortmid: "\u2223", shortparallel: "\u2225", ShortRightArrow: "\u2192", ShortUpArrow: "\u2191", shy: "\xAD", Sigma: "\u03A3", sigma: "\u03C3", sigmaf: "\u03C2", sigmav: "\u03C2", sim: "\u223C", simdot: "\u2A6A", sime: "\u2243", simeq: "\u2243", simg: "\u2A9E", simgE: "\u2AA0", siml: "\u2A9D", simlE: "\u2A9F", simne: "\u2246", simplus: "\u2A24", simrarr: "\u2972", slarr: "\u2190", SmallCircle: "\u2218", smallsetminus: "\u2216", smashp: "\u2A33", smeparsl: "\u29E4", smid: "\u2223", smile: "\u2323", smt: "\u2AAA", smte: "\u2AAC", smtes: "\u2AAC\uFE00", SOFTcy: "\u042C", softcy: "\u044C", solbar: "\u233F", solb: "\u29C4", sol: "/", Sopf: "\u{1D54A}", sopf: "\u{1D564}", spades: "\u2660", spadesuit: "\u2660", spar: "\u2225", sqcap: "\u2293", sqcaps: "\u2293\uFE00", sqcup: "\u2294", sqcups: "\u2294\uFE00", Sqrt: "\u221A", sqsub: "\u228F", sqsube: "\u2291", sqsubset: "\u228F", sqsubseteq: "\u2291", sqsup: "\u2290", sqsupe: "\u2292", sqsupset: "\u2290", sqsupseteq: "\u2292", square: "\u25A1", Square: "\u25A1", SquareIntersection: "\u2293", SquareSubset: "\u228F", SquareSubsetEqual: "\u2291", SquareSuperset: "\u2290", SquareSupersetEqual: "\u2292", SquareUnion: "\u2294", squarf: "\u25AA", squ: "\u25A1", squf: "\u25AA", srarr: "\u2192", Sscr: "\u{1D4AE}", sscr: "\u{1D4C8}", ssetmn: "\u2216", ssmile: "\u2323", sstarf: "\u22C6", Star: "\u22C6", star: "\u2606", starf: "\u2605", straightepsilon: "\u03F5", straightphi: "\u03D5", strns: "\xAF", sub: "\u2282", Sub: "\u22D0", subdot: "\u2ABD", subE: "\u2AC5", sube: "\u2286", subedot: "\u2AC3", submult: "\u2AC1", subnE: "\u2ACB", subne: "\u228A", subplus: "\u2ABF", subrarr: "\u2979", subset: "\u2282", Subset: "\u22D0", subseteq: "\u2286", subseteqq: "\u2AC5", SubsetEqual: "\u2286", subsetneq: "\u228A", subsetneqq: "\u2ACB", subsim: "\u2AC7", subsub: "\u2AD5", subsup: "\u2AD3", succapprox: "\u2AB8", succ: "\u227B", succcurlyeq: "\u227D", Succeeds: "\u227B", SucceedsEqual: "\u2AB0", SucceedsSlantEqual: "\u227D", SucceedsTilde: "\u227F", succeq: "\u2AB0", succnapprox: "\u2ABA", succneqq: "\u2AB6", succnsim: "\u22E9", succsim: "\u227F", SuchThat: "\u220B", sum: "\u2211", Sum: "\u2211", sung: "\u266A", sup1: "\xB9", sup2: "\xB2", sup3: "\xB3", sup: "\u2283", Sup: "\u22D1", supdot: "\u2ABE", supdsub: "\u2AD8", supE: "\u2AC6", supe: "\u2287", supedot: "\u2AC4", Superset: "\u2283", SupersetEqual: "\u2287", suphsol: "\u27C9", suphsub: "\u2AD7", suplarr: "\u297B", supmult: "\u2AC2", supnE: "\u2ACC", supne: "\u228B", supplus: "\u2AC0", supset: "\u2283", Supset: "\u22D1", supseteq: "\u2287", supseteqq: "\u2AC6", supsetneq: "\u228B", supsetneqq: "\u2ACC", supsim: "\u2AC8", supsub: "\u2AD4", supsup: "\u2AD6", swarhk: "\u2926", swarr: "\u2199", swArr: "\u21D9", swarrow: "\u2199", swnwar: "\u292A", szlig: "\xDF", Tab: "	", target: "\u2316", Tau: "\u03A4", tau: "\u03C4", tbrk: "\u23B4", Tcaron: "\u0164", tcaron: "\u0165", Tcedil: "\u0162", tcedil: "\u0163", Tcy: "\u0422", tcy: "\u0442", tdot: "\u20DB", telrec: "\u2315", Tfr: "\u{1D517}", tfr: "\u{1D531}", there4: "\u2234", therefore: "\u2234", Therefore: "\u2234", Theta: "\u0398", theta: "\u03B8", thetasym: "\u03D1", thetav: "\u03D1", thickapprox: "\u2248", thicksim: "\u223C", ThickSpace: "\u205F\u200A", ThinSpace: "\u2009", thinsp: "\u2009", thkap: "\u2248", thksim: "\u223C", THORN: "\xDE", thorn: "\xFE", tilde: "\u02DC", Tilde: "\u223C", TildeEqual: "\u2243", TildeFullEqual: "\u2245", TildeTilde: "\u2248", timesbar: "\u2A31", timesb: "\u22A0", times: "\xD7", timesd: "\u2A30", tint: "\u222D", toea: "\u2928", topbot: "\u2336", topcir: "\u2AF1", top: "\u22A4", Topf: "\u{1D54B}", topf: "\u{1D565}", topfork: "\u2ADA", tosa: "\u2929", tprime: "\u2034", trade: "\u2122", TRADE: "\u2122", triangle: "\u25B5", triangledown: "\u25BF", triangleleft: "\u25C3", trianglelefteq: "\u22B4", triangleq: "\u225C", triangleright: "\u25B9", trianglerighteq: "\u22B5", tridot: "\u25EC", trie: "\u225C", triminus: "\u2A3A", TripleDot: "\u20DB", triplus: "\u2A39", trisb: "\u29CD", tritime: "\u2A3B", trpezium: "\u23E2", Tscr: "\u{1D4AF}", tscr: "\u{1D4C9}", TScy: "\u0426", tscy: "\u0446", TSHcy: "\u040B", tshcy: "\u045B", Tstrok: "\u0166", tstrok: "\u0167", twixt: "\u226C", twoheadleftarrow: "\u219E", twoheadrightarrow: "\u21A0", Uacute: "\xDA", uacute: "\xFA", uarr: "\u2191", Uarr: "\u219F", uArr: "\u21D1", Uarrocir: "\u2949", Ubrcy: "\u040E", ubrcy: "\u045E", Ubreve: "\u016C", ubreve: "\u016D", Ucirc: "\xDB", ucirc: "\xFB", Ucy: "\u0423", ucy: "\u0443", udarr: "\u21C5", Udblac: "\u0170", udblac: "\u0171", udhar: "\u296E", ufisht: "\u297E", Ufr: "\u{1D518}", ufr: "\u{1D532}", Ugrave: "\xD9", ugrave: "\xF9", uHar: "\u2963", uharl: "\u21BF", uharr: "\u21BE", uhblk: "\u2580", ulcorn: "\u231C", ulcorner: "\u231C", ulcrop: "\u230F", ultri: "\u25F8", Umacr: "\u016A", umacr: "\u016B", uml: "\xA8", UnderBar: "_", UnderBrace: "\u23DF", UnderBracket: "\u23B5", UnderParenthesis: "\u23DD", Union: "\u22C3", UnionPlus: "\u228E", Uogon: "\u0172", uogon: "\u0173", Uopf: "\u{1D54C}", uopf: "\u{1D566}", UpArrowBar: "\u2912", uparrow: "\u2191", UpArrow: "\u2191", Uparrow: "\u21D1", UpArrowDownArrow: "\u21C5", updownarrow: "\u2195", UpDownArrow: "\u2195", Updownarrow: "\u21D5", UpEquilibrium: "\u296E", upharpoonleft: "\u21BF", upharpoonright: "\u21BE", uplus: "\u228E", UpperLeftArrow: "\u2196", UpperRightArrow: "\u2197", upsi: "\u03C5", Upsi: "\u03D2", upsih: "\u03D2", Upsilon: "\u03A5", upsilon: "\u03C5", UpTeeArrow: "\u21A5", UpTee: "\u22A5", upuparrows: "\u21C8", urcorn: "\u231D", urcorner: "\u231D", urcrop: "\u230E", Uring: "\u016E", uring: "\u016F", urtri: "\u25F9", Uscr: "\u{1D4B0}", uscr: "\u{1D4CA}", utdot: "\u22F0", Utilde: "\u0168", utilde: "\u0169", utri: "\u25B5", utrif: "\u25B4", uuarr: "\u21C8", Uuml: "\xDC", uuml: "\xFC", uwangle: "\u29A7", vangrt: "\u299C", varepsilon: "\u03F5", varkappa: "\u03F0", varnothing: "\u2205", varphi: "\u03D5", varpi: "\u03D6", varpropto: "\u221D", varr: "\u2195", vArr: "\u21D5", varrho: "\u03F1", varsigma: "\u03C2", varsubsetneq: "\u228A\uFE00", varsubsetneqq: "\u2ACB\uFE00", varsupsetneq: "\u228B\uFE00", varsupsetneqq: "\u2ACC\uFE00", vartheta: "\u03D1", vartriangleleft: "\u22B2", vartriangleright: "\u22B3", vBar: "\u2AE8", Vbar: "\u2AEB", vBarv: "\u2AE9", Vcy: "\u0412", vcy: "\u0432", vdash: "\u22A2", vDash: "\u22A8", Vdash: "\u22A9", VDash: "\u22AB", Vdashl: "\u2AE6", veebar: "\u22BB", vee: "\u2228", Vee: "\u22C1", veeeq: "\u225A", vellip: "\u22EE", verbar: "|", Verbar: "\u2016", vert: "|", Vert: "\u2016", VerticalBar: "\u2223", VerticalLine: "|", VerticalSeparator: "\u2758", VerticalTilde: "\u2240", VeryThinSpace: "\u200A", Vfr: "\u{1D519}", vfr: "\u{1D533}", vltri: "\u22B2", vnsub: "\u2282\u20D2", vnsup: "\u2283\u20D2", Vopf: "\u{1D54D}", vopf: "\u{1D567}", vprop: "\u221D", vrtri: "\u22B3", Vscr: "\u{1D4B1}", vscr: "\u{1D4CB}", vsubnE: "\u2ACB\uFE00", vsubne: "\u228A\uFE00", vsupnE: "\u2ACC\uFE00", vsupne: "\u228B\uFE00", Vvdash: "\u22AA", vzigzag: "\u299A", Wcirc: "\u0174", wcirc: "\u0175", wedbar: "\u2A5F", wedge: "\u2227", Wedge: "\u22C0", wedgeq: "\u2259", weierp: "\u2118", Wfr: "\u{1D51A}", wfr: "\u{1D534}", Wopf: "\u{1D54E}", wopf: "\u{1D568}", wp: "\u2118", wr: "\u2240", wreath: "\u2240", Wscr: "\u{1D4B2}", wscr: "\u{1D4CC}", xcap: "\u22C2", xcirc: "\u25EF", xcup: "\u22C3", xdtri: "\u25BD", Xfr: "\u{1D51B}", xfr: "\u{1D535}", xharr: "\u27F7", xhArr: "\u27FA", Xi: "\u039E", xi: "\u03BE", xlarr: "\u27F5", xlArr: "\u27F8", xmap: "\u27FC", xnis: "\u22FB", xodot: "\u2A00", Xopf: "\u{1D54F}", xopf: "\u{1D569}", xoplus: "\u2A01", xotime: "\u2A02", xrarr: "\u27F6", xrArr: "\u27F9", Xscr: "\u{1D4B3}", xscr: "\u{1D4CD}", xsqcup: "\u2A06", xuplus: "\u2A04", xutri: "\u25B3", xvee: "\u22C1", xwedge: "\u22C0", Yacute: "\xDD", yacute: "\xFD", YAcy: "\u042F", yacy: "\u044F", Ycirc: "\u0176", ycirc: "\u0177", Ycy: "\u042B", ycy: "\u044B", yen: "\xA5", Yfr: "\u{1D51C}", yfr: "\u{1D536}", YIcy: "\u0407", yicy: "\u0457", Yopf: "\u{1D550}", yopf: "\u{1D56A}", Yscr: "\u{1D4B4}", yscr: "\u{1D4CE}", YUcy: "\u042E", yucy: "\u044E", yuml: "\xFF", Yuml: "\u0178", Zacute: "\u0179", zacute: "\u017A", Zcaron: "\u017D", zcaron: "\u017E", Zcy: "\u0417", zcy: "\u0437", Zdot: "\u017B", zdot: "\u017C", zeetrf: "\u2128", ZeroWidthSpace: "\u200B", Zeta: "\u0396", zeta: "\u03B6", zfr: "\u{1D537}", Zfr: "\u2128", ZHcy: "\u0416", zhcy: "\u0436", zigrarr: "\u21DD", zopf: "\u{1D56B}", Zopf: "\u2124", Zscr: "\u{1D4B5}", zscr: "\u{1D4CF}", zwj: "\u200D", zwnj: "\u200C" };
  }
});

// node_modules/entities/lib/maps/legacy.json
var require_legacy = __commonJS({
  "node_modules/entities/lib/maps/legacy.json"(exports, module5) {
    module5.exports = { Aacute: "\xC1", aacute: "\xE1", Acirc: "\xC2", acirc: "\xE2", acute: "\xB4", AElig: "\xC6", aelig: "\xE6", Agrave: "\xC0", agrave: "\xE0", amp: "&", AMP: "&", Aring: "\xC5", aring: "\xE5", Atilde: "\xC3", atilde: "\xE3", Auml: "\xC4", auml: "\xE4", brvbar: "\xA6", Ccedil: "\xC7", ccedil: "\xE7", cedil: "\xB8", cent: "\xA2", copy: "\xA9", COPY: "\xA9", curren: "\xA4", deg: "\xB0", divide: "\xF7", Eacute: "\xC9", eacute: "\xE9", Ecirc: "\xCA", ecirc: "\xEA", Egrave: "\xC8", egrave: "\xE8", ETH: "\xD0", eth: "\xF0", Euml: "\xCB", euml: "\xEB", frac12: "\xBD", frac14: "\xBC", frac34: "\xBE", gt: ">", GT: ">", Iacute: "\xCD", iacute: "\xED", Icirc: "\xCE", icirc: "\xEE", iexcl: "\xA1", Igrave: "\xCC", igrave: "\xEC", iquest: "\xBF", Iuml: "\xCF", iuml: "\xEF", laquo: "\xAB", lt: "<", LT: "<", macr: "\xAF", micro: "\xB5", middot: "\xB7", nbsp: "\xA0", not: "\xAC", Ntilde: "\xD1", ntilde: "\xF1", Oacute: "\xD3", oacute: "\xF3", Ocirc: "\xD4", ocirc: "\xF4", Ograve: "\xD2", ograve: "\xF2", ordf: "\xAA", ordm: "\xBA", Oslash: "\xD8", oslash: "\xF8", Otilde: "\xD5", otilde: "\xF5", Ouml: "\xD6", ouml: "\xF6", para: "\xB6", plusmn: "\xB1", pound: "\xA3", quot: '"', QUOT: '"', raquo: "\xBB", reg: "\xAE", REG: "\xAE", sect: "\xA7", shy: "\xAD", sup1: "\xB9", sup2: "\xB2", sup3: "\xB3", szlig: "\xDF", THORN: "\xDE", thorn: "\xFE", times: "\xD7", Uacute: "\xDA", uacute: "\xFA", Ucirc: "\xDB", ucirc: "\xFB", Ugrave: "\xD9", ugrave: "\xF9", uml: "\xA8", Uuml: "\xDC", uuml: "\xFC", Yacute: "\xDD", yacute: "\xFD", yen: "\xA5", yuml: "\xFF" };
  }
});

// node_modules/entities/lib/maps/xml.json
var require_xml = __commonJS({
  "node_modules/entities/lib/maps/xml.json"(exports, module5) {
    module5.exports = { amp: "&", apos: "'", gt: ">", lt: "<", quot: '"' };
  }
});

// node_modules/entities/lib/maps/decode.json
var require_decode = __commonJS({
  "node_modules/entities/lib/maps/decode.json"(exports, module5) {
    module5.exports = { "0": 65533, "128": 8364, "130": 8218, "131": 402, "132": 8222, "133": 8230, "134": 8224, "135": 8225, "136": 710, "137": 8240, "138": 352, "139": 8249, "140": 338, "142": 381, "145": 8216, "146": 8217, "147": 8220, "148": 8221, "149": 8226, "150": 8211, "151": 8212, "152": 732, "153": 8482, "154": 353, "155": 8250, "156": 339, "158": 382, "159": 376 };
  }
});

// node_modules/entities/lib/decode_codepoint.js
var require_decode_codepoint = __commonJS({
  "node_modules/entities/lib/decode_codepoint.js"(exports) {
    "use strict";
    var __importDefault2 = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var decode_json_1 = __importDefault2(require_decode());
    var fromCodePoint = String.fromCodePoint || function(codePoint) {
      var output = "";
      if (codePoint > 65535) {
        codePoint -= 65536;
        output += String.fromCharCode(codePoint >>> 10 & 1023 | 55296);
        codePoint = 56320 | codePoint & 1023;
      }
      output += String.fromCharCode(codePoint);
      return output;
    };
    function decodeCodePoint(codePoint) {
      if (codePoint >= 55296 && codePoint <= 57343 || codePoint > 1114111) {
        return "\uFFFD";
      }
      if (codePoint in decode_json_1.default) {
        codePoint = decode_json_1.default[codePoint];
      }
      return fromCodePoint(codePoint);
    }
    exports.default = decodeCodePoint;
  }
});

// node_modules/entities/lib/decode.js
var require_decode2 = __commonJS({
  "node_modules/entities/lib/decode.js"(exports) {
    "use strict";
    var __importDefault2 = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.decodeHTML = exports.decodeHTMLStrict = exports.decodeXML = void 0;
    var entities_json_1 = __importDefault2(require_entities());
    var legacy_json_1 = __importDefault2(require_legacy());
    var xml_json_1 = __importDefault2(require_xml());
    var decode_codepoint_1 = __importDefault2(require_decode_codepoint());
    var strictEntityRe = /&(?:[a-zA-Z0-9]+|#[xX][\da-fA-F]+|#\d+);/g;
    exports.decodeXML = getStrictDecoder(xml_json_1.default);
    exports.decodeHTMLStrict = getStrictDecoder(entities_json_1.default);
    function getStrictDecoder(map) {
      var replace = getReplacer(map);
      return function(str) {
        return String(str).replace(strictEntityRe, replace);
      };
    }
    var sorter = function(a, b) {
      return a < b ? 1 : -1;
    };
    exports.decodeHTML = function() {
      var legacy = Object.keys(legacy_json_1.default).sort(sorter);
      var keys = Object.keys(entities_json_1.default).sort(sorter);
      for (var i = 0, j = 0; i < keys.length; i++) {
        if (legacy[j] === keys[i]) {
          keys[i] += ";?";
          j++;
        } else {
          keys[i] += ";";
        }
      }
      var re = new RegExp("&(?:" + keys.join("|") + "|#[xX][\\da-fA-F]+;?|#\\d+;?)", "g");
      var replace = getReplacer(entities_json_1.default);
      function replacer(str) {
        if (str.substr(-1) !== ";")
          str += ";";
        return replace(str);
      }
      return function(str) {
        return String(str).replace(re, replacer);
      };
    }();
    function getReplacer(map) {
      return function replace(str) {
        if (str.charAt(1) === "#") {
          var secondChar = str.charAt(2);
          if (secondChar === "X" || secondChar === "x") {
            return decode_codepoint_1.default(parseInt(str.substr(3), 16));
          }
          return decode_codepoint_1.default(parseInt(str.substr(2), 10));
        }
        return map[str.slice(1, -1)] || str;
      };
    }
  }
});

// node_modules/entities/lib/encode.js
var require_encode = __commonJS({
  "node_modules/entities/lib/encode.js"(exports) {
    "use strict";
    var __importDefault2 = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.escapeUTF8 = exports.escape = exports.encodeNonAsciiHTML = exports.encodeHTML = exports.encodeXML = void 0;
    var xml_json_1 = __importDefault2(require_xml());
    var inverseXML = getInverseObj(xml_json_1.default);
    var xmlReplacer = getInverseReplacer(inverseXML);
    exports.encodeXML = getASCIIEncoder(inverseXML);
    var entities_json_1 = __importDefault2(require_entities());
    var inverseHTML = getInverseObj(entities_json_1.default);
    var htmlReplacer = getInverseReplacer(inverseHTML);
    exports.encodeHTML = getInverse(inverseHTML, htmlReplacer);
    exports.encodeNonAsciiHTML = getASCIIEncoder(inverseHTML);
    function getInverseObj(obj) {
      return Object.keys(obj).sort().reduce(function(inverse, name4) {
        inverse[obj[name4]] = "&" + name4 + ";";
        return inverse;
      }, {});
    }
    function getInverseReplacer(inverse) {
      var single = [];
      var multiple = [];
      for (var _i = 0, _a = Object.keys(inverse); _i < _a.length; _i++) {
        var k = _a[_i];
        if (k.length === 1) {
          single.push("\\" + k);
        } else {
          multiple.push(k);
        }
      }
      single.sort();
      for (var start = 0; start < single.length - 1; start++) {
        var end = start;
        while (end < single.length - 1 && single[end].charCodeAt(1) + 1 === single[end + 1].charCodeAt(1)) {
          end += 1;
        }
        var count = 1 + end - start;
        if (count < 3)
          continue;
        single.splice(start, count, single[start] + "-" + single[end]);
      }
      multiple.unshift("[" + single.join("") + "]");
      return new RegExp(multiple.join("|"), "g");
    }
    var reNonASCII = /(?:[\x80-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g;
    var getCodePoint = String.prototype.codePointAt != null ? function(str) {
      return str.codePointAt(0);
    } : function(c) {
      return (c.charCodeAt(0) - 55296) * 1024 + c.charCodeAt(1) - 56320 + 65536;
    };
    function singleCharReplacer(c) {
      return "&#x" + (c.length > 1 ? getCodePoint(c) : c.charCodeAt(0)).toString(16).toUpperCase() + ";";
    }
    function getInverse(inverse, re) {
      return function(data) {
        return data.replace(re, function(name4) {
          return inverse[name4];
        }).replace(reNonASCII, singleCharReplacer);
      };
    }
    var reEscapeChars = new RegExp(xmlReplacer.source + "|" + reNonASCII.source, "g");
    function escape(data) {
      return data.replace(reEscapeChars, singleCharReplacer);
    }
    exports.escape = escape;
    function escapeUTF8(data) {
      return data.replace(xmlReplacer, singleCharReplacer);
    }
    exports.escapeUTF8 = escapeUTF8;
    function getASCIIEncoder(obj) {
      return function(data) {
        return data.replace(reEscapeChars, function(c) {
          return obj[c] || singleCharReplacer(c);
        });
      };
    }
  }
});

// node_modules/entities/lib/index.js
var require_lib = __commonJS({
  "node_modules/entities/lib/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.decodeXMLStrict = exports.decodeHTML5Strict = exports.decodeHTML4Strict = exports.decodeHTML5 = exports.decodeHTML4 = exports.decodeHTMLStrict = exports.decodeHTML = exports.decodeXML = exports.encodeHTML5 = exports.encodeHTML4 = exports.escapeUTF8 = exports.escape = exports.encodeNonAsciiHTML = exports.encodeHTML = exports.encodeXML = exports.encode = exports.decodeStrict = exports.decode = void 0;
    var decode_1 = require_decode2();
    var encode_1 = require_encode();
    function decode(data, level) {
      return (!level || level <= 0 ? decode_1.decodeXML : decode_1.decodeHTML)(data);
    }
    exports.decode = decode;
    function decodeStrict(data, level) {
      return (!level || level <= 0 ? decode_1.decodeXML : decode_1.decodeHTMLStrict)(data);
    }
    exports.decodeStrict = decodeStrict;
    function encode(data, level) {
      return (!level || level <= 0 ? encode_1.encodeXML : encode_1.encodeHTML)(data);
    }
    exports.encode = encode;
    var encode_2 = require_encode();
    Object.defineProperty(exports, "encodeXML", { enumerable: true, get: function() {
      return encode_2.encodeXML;
    } });
    Object.defineProperty(exports, "encodeHTML", { enumerable: true, get: function() {
      return encode_2.encodeHTML;
    } });
    Object.defineProperty(exports, "encodeNonAsciiHTML", { enumerable: true, get: function() {
      return encode_2.encodeNonAsciiHTML;
    } });
    Object.defineProperty(exports, "escape", { enumerable: true, get: function() {
      return encode_2.escape;
    } });
    Object.defineProperty(exports, "escapeUTF8", { enumerable: true, get: function() {
      return encode_2.escapeUTF8;
    } });
    Object.defineProperty(exports, "encodeHTML4", { enumerable: true, get: function() {
      return encode_2.encodeHTML;
    } });
    Object.defineProperty(exports, "encodeHTML5", { enumerable: true, get: function() {
      return encode_2.encodeHTML;
    } });
    var decode_2 = require_decode2();
    Object.defineProperty(exports, "decodeXML", { enumerable: true, get: function() {
      return decode_2.decodeXML;
    } });
    Object.defineProperty(exports, "decodeHTML", { enumerable: true, get: function() {
      return decode_2.decodeHTML;
    } });
    Object.defineProperty(exports, "decodeHTMLStrict", { enumerable: true, get: function() {
      return decode_2.decodeHTMLStrict;
    } });
    Object.defineProperty(exports, "decodeHTML4", { enumerable: true, get: function() {
      return decode_2.decodeHTML;
    } });
    Object.defineProperty(exports, "decodeHTML5", { enumerable: true, get: function() {
      return decode_2.decodeHTML;
    } });
    Object.defineProperty(exports, "decodeHTML4Strict", { enumerable: true, get: function() {
      return decode_2.decodeHTMLStrict;
    } });
    Object.defineProperty(exports, "decodeHTML5Strict", { enumerable: true, get: function() {
      return decode_2.decodeHTMLStrict;
    } });
    Object.defineProperty(exports, "decodeXMLStrict", { enumerable: true, get: function() {
      return decode_2.decodeXML;
    } });
  }
});

// node_modules/fast-xml-parser/src/util.js
var require_util = __commonJS({
  "node_modules/fast-xml-parser/src/util.js"(exports) {
    "use strict";
    var nameStartChar = ":A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD";
    var nameChar = nameStartChar + "\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040";
    var nameRegexp = "[" + nameStartChar + "][" + nameChar + "]*";
    var regexName = new RegExp("^" + nameRegexp + "$");
    var getAllMatches = function(string, regex) {
      const matches = [];
      let match = regex.exec(string);
      while (match) {
        const allmatches = [];
        const len = match.length;
        for (let index = 0; index < len; index++) {
          allmatches.push(match[index]);
        }
        matches.push(allmatches);
        match = regex.exec(string);
      }
      return matches;
    };
    var isName = function(string) {
      const match = regexName.exec(string);
      return !(match === null || typeof match === "undefined");
    };
    exports.isExist = function(v) {
      return typeof v !== "undefined";
    };
    exports.isEmptyObject = function(obj) {
      return Object.keys(obj).length === 0;
    };
    exports.merge = function(target, a, arrayMode) {
      if (a) {
        const keys = Object.keys(a);
        const len = keys.length;
        for (let i = 0; i < len; i++) {
          if (arrayMode === "strict") {
            target[keys[i]] = [a[keys[i]]];
          } else {
            target[keys[i]] = a[keys[i]];
          }
        }
      }
    };
    exports.getValue = function(v) {
      if (exports.isExist(v)) {
        return v;
      } else {
        return "";
      }
    };
    exports.buildOptions = function(options, defaultOptions, props) {
      var newOptions = {};
      if (!options) {
        return defaultOptions;
      }
      for (let i = 0; i < props.length; i++) {
        if (options[props[i]] !== void 0) {
          newOptions[props[i]] = options[props[i]];
        } else {
          newOptions[props[i]] = defaultOptions[props[i]];
        }
      }
      return newOptions;
    };
    exports.isTagNameInArrayMode = function(tagName, arrayMode, parentTagName) {
      if (arrayMode === false) {
        return false;
      } else if (arrayMode instanceof RegExp) {
        return arrayMode.test(tagName);
      } else if (typeof arrayMode === "function") {
        return !!arrayMode(tagName, parentTagName);
      }
      return arrayMode === "strict";
    };
    exports.isName = isName;
    exports.getAllMatches = getAllMatches;
    exports.nameRegexp = nameRegexp;
  }
});

// node_modules/fast-xml-parser/src/node2json.js
var require_node2json = __commonJS({
  "node_modules/fast-xml-parser/src/node2json.js"(exports) {
    "use strict";
    var util = require_util();
    var convertToJson = function(node, options, parentTagName) {
      const jObj = {};
      if ((!node.child || util.isEmptyObject(node.child)) && (!node.attrsMap || util.isEmptyObject(node.attrsMap))) {
        return util.isExist(node.val) ? node.val : "";
      }
      if (util.isExist(node.val) && !(typeof node.val === "string" && (node.val === "" || node.val === options.cdataPositionChar))) {
        const asArray = util.isTagNameInArrayMode(node.tagname, options.arrayMode, parentTagName);
        jObj[options.textNodeName] = asArray ? [node.val] : node.val;
      }
      util.merge(jObj, node.attrsMap, options.arrayMode);
      const keys = Object.keys(node.child);
      for (let index = 0; index < keys.length; index++) {
        const tagName = keys[index];
        if (node.child[tagName] && node.child[tagName].length > 1) {
          jObj[tagName] = [];
          for (let tag in node.child[tagName]) {
            if (node.child[tagName].hasOwnProperty(tag)) {
              jObj[tagName].push(convertToJson(node.child[tagName][tag], options, tagName));
            }
          }
        } else {
          const result = convertToJson(node.child[tagName][0], options, tagName);
          const asArray = options.arrayMode === true && typeof result === "object" || util.isTagNameInArrayMode(tagName, options.arrayMode, parentTagName);
          jObj[tagName] = asArray ? [result] : result;
        }
      }
      return jObj;
    };
    exports.convertToJson = convertToJson;
  }
});

// node_modules/fast-xml-parser/src/xmlNode.js
var require_xmlNode = __commonJS({
  "node_modules/fast-xml-parser/src/xmlNode.js"(exports, module5) {
    "use strict";
    module5.exports = function(tagname, parent, val) {
      this.tagname = tagname;
      this.parent = parent;
      this.child = {};
      this.attrsMap = {};
      this.val = val;
      this.addChild = function(child) {
        if (Array.isArray(this.child[child.tagname])) {
          this.child[child.tagname].push(child);
        } else {
          this.child[child.tagname] = [child];
        }
      };
    };
  }
});

// node_modules/fast-xml-parser/src/xmlstr2xmlnode.js
var require_xmlstr2xmlnode = __commonJS({
  "node_modules/fast-xml-parser/src/xmlstr2xmlnode.js"(exports) {
    "use strict";
    var util = require_util();
    var buildOptions = require_util().buildOptions;
    var xmlNode = require_xmlNode();
    var regx = "<((!\\[CDATA\\[([\\s\\S]*?)(]]>))|((NAME:)?(NAME))([^>]*)>|((\\/)(NAME)\\s*>))([^<]*)".replace(/NAME/g, util.nameRegexp);
    if (!Number.parseInt && window.parseInt) {
      Number.parseInt = window.parseInt;
    }
    if (!Number.parseFloat && window.parseFloat) {
      Number.parseFloat = window.parseFloat;
    }
    var defaultOptions = {
      attributeNamePrefix: "@_",
      attrNodeName: false,
      textNodeName: "#text",
      ignoreAttributes: true,
      ignoreNameSpace: false,
      allowBooleanAttributes: false,
      parseNodeValue: true,
      parseAttributeValue: false,
      arrayMode: false,
      trimValues: true,
      cdataTagName: false,
      cdataPositionChar: "\\c",
      tagValueProcessor: function(a, tagName) {
        return a;
      },
      attrValueProcessor: function(a, attrName) {
        return a;
      },
      stopNodes: []
    };
    exports.defaultOptions = defaultOptions;
    var props = [
      "attributeNamePrefix",
      "attrNodeName",
      "textNodeName",
      "ignoreAttributes",
      "ignoreNameSpace",
      "allowBooleanAttributes",
      "parseNodeValue",
      "parseAttributeValue",
      "arrayMode",
      "trimValues",
      "cdataTagName",
      "cdataPositionChar",
      "tagValueProcessor",
      "attrValueProcessor",
      "parseTrueNumberOnly",
      "stopNodes"
    ];
    exports.props = props;
    function processTagValue(tagName, val, options) {
      if (val) {
        if (options.trimValues) {
          val = val.trim();
        }
        val = options.tagValueProcessor(val, tagName);
        val = parseValue(val, options.parseNodeValue, options.parseTrueNumberOnly);
      }
      return val;
    }
    function resolveNameSpace(tagname, options) {
      if (options.ignoreNameSpace) {
        const tags = tagname.split(":");
        const prefix = tagname.charAt(0) === "/" ? "/" : "";
        if (tags[0] === "xmlns") {
          return "";
        }
        if (tags.length === 2) {
          tagname = prefix + tags[1];
        }
      }
      return tagname;
    }
    function parseValue(val, shouldParse, parseTrueNumberOnly) {
      if (shouldParse && typeof val === "string") {
        let parsed;
        if (val.trim() === "" || isNaN(val)) {
          parsed = val === "true" ? true : val === "false" ? false : val;
        } else {
          if (val.indexOf("0x") !== -1) {
            parsed = Number.parseInt(val, 16);
          } else if (val.indexOf(".") !== -1) {
            parsed = Number.parseFloat(val);
            val = val.replace(/\.?0+$/, "");
          } else {
            parsed = Number.parseInt(val, 10);
          }
          if (parseTrueNumberOnly) {
            parsed = String(parsed) === val ? parsed : val;
          }
        }
        return parsed;
      } else {
        if (util.isExist(val)) {
          return val;
        } else {
          return "";
        }
      }
    }
    var attrsRegx = new RegExp(`([^\\s=]+)\\s*(=\\s*(['"])(.*?)\\3)?`, "g");
    function buildAttributesMap(attrStr, options) {
      if (!options.ignoreAttributes && typeof attrStr === "string") {
        attrStr = attrStr.replace(/\r?\n/g, " ");
        const matches = util.getAllMatches(attrStr, attrsRegx);
        const len = matches.length;
        const attrs = {};
        for (let i = 0; i < len; i++) {
          const attrName = resolveNameSpace(matches[i][1], options);
          if (attrName.length) {
            if (matches[i][4] !== void 0) {
              if (options.trimValues) {
                matches[i][4] = matches[i][4].trim();
              }
              matches[i][4] = options.attrValueProcessor(matches[i][4], attrName);
              attrs[options.attributeNamePrefix + attrName] = parseValue(matches[i][4], options.parseAttributeValue, options.parseTrueNumberOnly);
            } else if (options.allowBooleanAttributes) {
              attrs[options.attributeNamePrefix + attrName] = true;
            }
          }
        }
        if (!Object.keys(attrs).length) {
          return;
        }
        if (options.attrNodeName) {
          const attrCollection = {};
          attrCollection[options.attrNodeName] = attrs;
          return attrCollection;
        }
        return attrs;
      }
    }
    var getTraversalObj = function(xmlData, options) {
      xmlData = xmlData.replace(/\r\n?/g, "\n");
      options = buildOptions(options, defaultOptions, props);
      const xmlObj = new xmlNode("!xml");
      let currentNode = xmlObj;
      let textData = "";
      for (let i = 0; i < xmlData.length; i++) {
        const ch = xmlData[i];
        if (ch === "<") {
          if (xmlData[i + 1] === "/") {
            const closeIndex = findClosingIndex(xmlData, ">", i, "Closing Tag is not closed.");
            let tagName = xmlData.substring(i + 2, closeIndex).trim();
            if (options.ignoreNameSpace) {
              const colonIndex = tagName.indexOf(":");
              if (colonIndex !== -1) {
                tagName = tagName.substr(colonIndex + 1);
              }
            }
            if (currentNode) {
              if (currentNode.val) {
                currentNode.val = util.getValue(currentNode.val) + "" + processTagValue(tagName, textData, options);
              } else {
                currentNode.val = processTagValue(tagName, textData, options);
              }
            }
            if (options.stopNodes.length && options.stopNodes.includes(currentNode.tagname)) {
              currentNode.child = [];
              if (currentNode.attrsMap == void 0) {
                currentNode.attrsMap = {};
              }
              currentNode.val = xmlData.substr(currentNode.startIndex + 1, i - currentNode.startIndex - 1);
            }
            currentNode = currentNode.parent;
            textData = "";
            i = closeIndex;
          } else if (xmlData[i + 1] === "?") {
            i = findClosingIndex(xmlData, "?>", i, "Pi Tag is not closed.");
          } else if (xmlData.substr(i + 1, 3) === "!--") {
            i = findClosingIndex(xmlData, "-->", i, "Comment is not closed.");
          } else if (xmlData.substr(i + 1, 2) === "!D") {
            const closeIndex = findClosingIndex(xmlData, ">", i, "DOCTYPE is not closed.");
            const tagExp = xmlData.substring(i, closeIndex);
            if (tagExp.indexOf("[") >= 0) {
              i = xmlData.indexOf("]>", i) + 1;
            } else {
              i = closeIndex;
            }
          } else if (xmlData.substr(i + 1, 2) === "![") {
            const closeIndex = findClosingIndex(xmlData, "]]>", i, "CDATA is not closed.") - 2;
            const tagExp = xmlData.substring(i + 9, closeIndex);
            if (textData) {
              currentNode.val = util.getValue(currentNode.val) + "" + processTagValue(currentNode.tagname, textData, options);
              textData = "";
            }
            if (options.cdataTagName) {
              const childNode = new xmlNode(options.cdataTagName, currentNode, tagExp);
              currentNode.addChild(childNode);
              currentNode.val = util.getValue(currentNode.val) + options.cdataPositionChar;
              if (tagExp) {
                childNode.val = tagExp;
              }
            } else {
              currentNode.val = (currentNode.val || "") + (tagExp || "");
            }
            i = closeIndex + 2;
          } else {
            const result = closingIndexForOpeningTag(xmlData, i + 1);
            let tagExp = result.data;
            const closeIndex = result.index;
            const separatorIndex = tagExp.indexOf(" ");
            let tagName = tagExp;
            let shouldBuildAttributesMap = true;
            if (separatorIndex !== -1) {
              tagName = tagExp.substr(0, separatorIndex).replace(/\s\s*$/, "");
              tagExp = tagExp.substr(separatorIndex + 1);
            }
            if (options.ignoreNameSpace) {
              const colonIndex = tagName.indexOf(":");
              if (colonIndex !== -1) {
                tagName = tagName.substr(colonIndex + 1);
                shouldBuildAttributesMap = tagName !== result.data.substr(colonIndex + 1);
              }
            }
            if (currentNode && textData) {
              if (currentNode.tagname !== "!xml") {
                currentNode.val = util.getValue(currentNode.val) + "" + processTagValue(currentNode.tagname, textData, options);
              }
            }
            if (tagExp.length > 0 && tagExp.lastIndexOf("/") === tagExp.length - 1) {
              if (tagName[tagName.length - 1] === "/") {
                tagName = tagName.substr(0, tagName.length - 1);
                tagExp = tagName;
              } else {
                tagExp = tagExp.substr(0, tagExp.length - 1);
              }
              const childNode = new xmlNode(tagName, currentNode, "");
              if (tagName !== tagExp) {
                childNode.attrsMap = buildAttributesMap(tagExp, options);
              }
              currentNode.addChild(childNode);
            } else {
              const childNode = new xmlNode(tagName, currentNode);
              if (options.stopNodes.length && options.stopNodes.includes(childNode.tagname)) {
                childNode.startIndex = closeIndex;
              }
              if (tagName !== tagExp && shouldBuildAttributesMap) {
                childNode.attrsMap = buildAttributesMap(tagExp, options);
              }
              currentNode.addChild(childNode);
              currentNode = childNode;
            }
            textData = "";
            i = closeIndex;
          }
        } else {
          textData += xmlData[i];
        }
      }
      return xmlObj;
    };
    function closingIndexForOpeningTag(data, i) {
      let attrBoundary;
      let tagExp = "";
      for (let index = i; index < data.length; index++) {
        let ch = data[index];
        if (attrBoundary) {
          if (ch === attrBoundary)
            attrBoundary = "";
        } else if (ch === '"' || ch === "'") {
          attrBoundary = ch;
        } else if (ch === ">") {
          return {
            data: tagExp,
            index
          };
        } else if (ch === "	") {
          ch = " ";
        }
        tagExp += ch;
      }
    }
    function findClosingIndex(xmlData, str, i, errMsg) {
      const closingIndex = xmlData.indexOf(str, i);
      if (closingIndex === -1) {
        throw new Error(errMsg);
      } else {
        return closingIndex + str.length - 1;
      }
    }
    exports.getTraversalObj = getTraversalObj;
  }
});

// node_modules/fast-xml-parser/src/validator.js
var require_validator = __commonJS({
  "node_modules/fast-xml-parser/src/validator.js"(exports) {
    "use strict";
    var util = require_util();
    var defaultOptions = {
      allowBooleanAttributes: false
    };
    var props = ["allowBooleanAttributes"];
    exports.validate = function(xmlData, options) {
      options = util.buildOptions(options, defaultOptions, props);
      const tags = [];
      let tagFound = false;
      let reachedRoot = false;
      if (xmlData[0] === "\uFEFF") {
        xmlData = xmlData.substr(1);
      }
      for (let i = 0; i < xmlData.length; i++) {
        if (xmlData[i] === "<" && xmlData[i + 1] === "?") {
          i += 2;
          i = readPI(xmlData, i);
          if (i.err)
            return i;
        } else if (xmlData[i] === "<") {
          i++;
          if (xmlData[i] === "!") {
            i = readCommentAndCDATA(xmlData, i);
            continue;
          } else {
            let closingTag = false;
            if (xmlData[i] === "/") {
              closingTag = true;
              i++;
            }
            let tagName = "";
            for (; i < xmlData.length && xmlData[i] !== ">" && xmlData[i] !== " " && xmlData[i] !== "	" && xmlData[i] !== "\n" && xmlData[i] !== "\r"; i++) {
              tagName += xmlData[i];
            }
            tagName = tagName.trim();
            if (tagName[tagName.length - 1] === "/") {
              tagName = tagName.substring(0, tagName.length - 1);
              i--;
            }
            if (!validateTagName(tagName)) {
              let msg;
              if (tagName.trim().length === 0) {
                msg = "There is an unnecessary space between tag name and backward slash '</ ..'.";
              } else {
                msg = "Tag '" + tagName + "' is an invalid name.";
              }
              return getErrorObject("InvalidTag", msg, getLineNumberForPosition(xmlData, i));
            }
            const result = readAttributeStr(xmlData, i);
            if (result === false) {
              return getErrorObject("InvalidAttr", "Attributes for '" + tagName + "' have open quote.", getLineNumberForPosition(xmlData, i));
            }
            let attrStr = result.value;
            i = result.index;
            if (attrStr[attrStr.length - 1] === "/") {
              attrStr = attrStr.substring(0, attrStr.length - 1);
              const isValid = validateAttributeString(attrStr, options);
              if (isValid === true) {
                tagFound = true;
              } else {
                return getErrorObject(isValid.err.code, isValid.err.msg, getLineNumberForPosition(xmlData, i - attrStr.length + isValid.err.line));
              }
            } else if (closingTag) {
              if (!result.tagClosed) {
                return getErrorObject("InvalidTag", "Closing tag '" + tagName + "' doesn't have proper closing.", getLineNumberForPosition(xmlData, i));
              } else if (attrStr.trim().length > 0) {
                return getErrorObject("InvalidTag", "Closing tag '" + tagName + "' can't have attributes or invalid starting.", getLineNumberForPosition(xmlData, i));
              } else {
                const otg = tags.pop();
                if (tagName !== otg) {
                  return getErrorObject("InvalidTag", "Closing tag '" + otg + "' is expected inplace of '" + tagName + "'.", getLineNumberForPosition(xmlData, i));
                }
                if (tags.length == 0) {
                  reachedRoot = true;
                }
              }
            } else {
              const isValid = validateAttributeString(attrStr, options);
              if (isValid !== true) {
                return getErrorObject(isValid.err.code, isValid.err.msg, getLineNumberForPosition(xmlData, i - attrStr.length + isValid.err.line));
              }
              if (reachedRoot === true) {
                return getErrorObject("InvalidXml", "Multiple possible root nodes found.", getLineNumberForPosition(xmlData, i));
              } else {
                tags.push(tagName);
              }
              tagFound = true;
            }
            for (i++; i < xmlData.length; i++) {
              if (xmlData[i] === "<") {
                if (xmlData[i + 1] === "!") {
                  i++;
                  i = readCommentAndCDATA(xmlData, i);
                  continue;
                } else if (xmlData[i + 1] === "?") {
                  i = readPI(xmlData, ++i);
                  if (i.err)
                    return i;
                } else {
                  break;
                }
              } else if (xmlData[i] === "&") {
                const afterAmp = validateAmpersand(xmlData, i);
                if (afterAmp == -1)
                  return getErrorObject("InvalidChar", "char '&' is not expected.", getLineNumberForPosition(xmlData, i));
                i = afterAmp;
              }
            }
            if (xmlData[i] === "<") {
              i--;
            }
          }
        } else {
          if (xmlData[i] === " " || xmlData[i] === "	" || xmlData[i] === "\n" || xmlData[i] === "\r") {
            continue;
          }
          return getErrorObject("InvalidChar", "char '" + xmlData[i] + "' is not expected.", getLineNumberForPosition(xmlData, i));
        }
      }
      if (!tagFound) {
        return getErrorObject("InvalidXml", "Start tag expected.", 1);
      } else if (tags.length > 0) {
        return getErrorObject("InvalidXml", "Invalid '" + JSON.stringify(tags, null, 4).replace(/\r?\n/g, "") + "' found.", 1);
      }
      return true;
    };
    function readPI(xmlData, i) {
      var start = i;
      for (; i < xmlData.length; i++) {
        if (xmlData[i] == "?" || xmlData[i] == " ") {
          var tagname = xmlData.substr(start, i - start);
          if (i > 5 && tagname === "xml") {
            return getErrorObject("InvalidXml", "XML declaration allowed only at the start of the document.", getLineNumberForPosition(xmlData, i));
          } else if (xmlData[i] == "?" && xmlData[i + 1] == ">") {
            i++;
            break;
          } else {
            continue;
          }
        }
      }
      return i;
    }
    function readCommentAndCDATA(xmlData, i) {
      if (xmlData.length > i + 5 && xmlData[i + 1] === "-" && xmlData[i + 2] === "-") {
        for (i += 3; i < xmlData.length; i++) {
          if (xmlData[i] === "-" && xmlData[i + 1] === "-" && xmlData[i + 2] === ">") {
            i += 2;
            break;
          }
        }
      } else if (xmlData.length > i + 8 && xmlData[i + 1] === "D" && xmlData[i + 2] === "O" && xmlData[i + 3] === "C" && xmlData[i + 4] === "T" && xmlData[i + 5] === "Y" && xmlData[i + 6] === "P" && xmlData[i + 7] === "E") {
        let angleBracketsCount = 1;
        for (i += 8; i < xmlData.length; i++) {
          if (xmlData[i] === "<") {
            angleBracketsCount++;
          } else if (xmlData[i] === ">") {
            angleBracketsCount--;
            if (angleBracketsCount === 0) {
              break;
            }
          }
        }
      } else if (xmlData.length > i + 9 && xmlData[i + 1] === "[" && xmlData[i + 2] === "C" && xmlData[i + 3] === "D" && xmlData[i + 4] === "A" && xmlData[i + 5] === "T" && xmlData[i + 6] === "A" && xmlData[i + 7] === "[") {
        for (i += 8; i < xmlData.length; i++) {
          if (xmlData[i] === "]" && xmlData[i + 1] === "]" && xmlData[i + 2] === ">") {
            i += 2;
            break;
          }
        }
      }
      return i;
    }
    var doubleQuote = '"';
    var singleQuote = "'";
    function readAttributeStr(xmlData, i) {
      let attrStr = "";
      let startChar = "";
      let tagClosed = false;
      for (; i < xmlData.length; i++) {
        if (xmlData[i] === doubleQuote || xmlData[i] === singleQuote) {
          if (startChar === "") {
            startChar = xmlData[i];
          } else if (startChar !== xmlData[i]) {
            continue;
          } else {
            startChar = "";
          }
        } else if (xmlData[i] === ">") {
          if (startChar === "") {
            tagClosed = true;
            break;
          }
        }
        attrStr += xmlData[i];
      }
      if (startChar !== "") {
        return false;
      }
      return {
        value: attrStr,
        index: i,
        tagClosed
      };
    }
    var validAttrStrRegxp = new RegExp(`(\\s*)([^\\s=]+)(\\s*=)?(\\s*(['"])(([\\s\\S])*?)\\5)?`, "g");
    function validateAttributeString(attrStr, options) {
      const matches = util.getAllMatches(attrStr, validAttrStrRegxp);
      const attrNames = {};
      for (let i = 0; i < matches.length; i++) {
        if (matches[i][1].length === 0) {
          return getErrorObject("InvalidAttr", "Attribute '" + matches[i][2] + "' has no space in starting.", getPositionFromMatch(attrStr, matches[i][0]));
        } else if (matches[i][3] === void 0 && !options.allowBooleanAttributes) {
          return getErrorObject("InvalidAttr", "boolean attribute '" + matches[i][2] + "' is not allowed.", getPositionFromMatch(attrStr, matches[i][0]));
        }
        const attrName = matches[i][2];
        if (!validateAttrName(attrName)) {
          return getErrorObject("InvalidAttr", "Attribute '" + attrName + "' is an invalid name.", getPositionFromMatch(attrStr, matches[i][0]));
        }
        if (!attrNames.hasOwnProperty(attrName)) {
          attrNames[attrName] = 1;
        } else {
          return getErrorObject("InvalidAttr", "Attribute '" + attrName + "' is repeated.", getPositionFromMatch(attrStr, matches[i][0]));
        }
      }
      return true;
    }
    function validateNumberAmpersand(xmlData, i) {
      let re = /\d/;
      if (xmlData[i] === "x") {
        i++;
        re = /[\da-fA-F]/;
      }
      for (; i < xmlData.length; i++) {
        if (xmlData[i] === ";")
          return i;
        if (!xmlData[i].match(re))
          break;
      }
      return -1;
    }
    function validateAmpersand(xmlData, i) {
      i++;
      if (xmlData[i] === ";")
        return -1;
      if (xmlData[i] === "#") {
        i++;
        return validateNumberAmpersand(xmlData, i);
      }
      let count = 0;
      for (; i < xmlData.length; i++, count++) {
        if (xmlData[i].match(/\w/) && count < 20)
          continue;
        if (xmlData[i] === ";")
          break;
        return -1;
      }
      return i;
    }
    function getErrorObject(code, message, lineNumber) {
      return {
        err: {
          code,
          msg: message,
          line: lineNumber
        }
      };
    }
    function validateAttrName(attrName) {
      return util.isName(attrName);
    }
    function validateTagName(tagname) {
      return util.isName(tagname);
    }
    function getLineNumberForPosition(xmlData, index) {
      var lines = xmlData.substring(0, index).split(/\r?\n/);
      return lines.length;
    }
    function getPositionFromMatch(attrStr, match) {
      return attrStr.indexOf(match) + match.length;
    }
  }
});

// node_modules/fast-xml-parser/src/nimndata.js
var require_nimndata = __commonJS({
  "node_modules/fast-xml-parser/src/nimndata.js"(exports) {
    "use strict";
    var char = function(a) {
      return String.fromCharCode(a);
    };
    var chars = {
      nilChar: char(176),
      missingChar: char(201),
      nilPremitive: char(175),
      missingPremitive: char(200),
      emptyChar: char(178),
      emptyValue: char(177),
      boundryChar: char(179),
      objStart: char(198),
      arrStart: char(204),
      arrayEnd: char(185)
    };
    var charsArr = [
      chars.nilChar,
      chars.nilPremitive,
      chars.missingChar,
      chars.missingPremitive,
      chars.boundryChar,
      chars.emptyChar,
      chars.emptyValue,
      chars.arrayEnd,
      chars.objStart,
      chars.arrStart
    ];
    var _e = function(node, e_schema, options) {
      if (typeof e_schema === "string") {
        if (node && node[0] && node[0].val !== void 0) {
          return getValue(node[0].val, e_schema);
        } else {
          return getValue(node, e_schema);
        }
      } else {
        const hasValidData = hasData(node);
        if (hasValidData === true) {
          let str = "";
          if (Array.isArray(e_schema)) {
            str += chars.arrStart;
            const itemSchema = e_schema[0];
            const arr_len = node.length;
            if (typeof itemSchema === "string") {
              for (let arr_i = 0; arr_i < arr_len; arr_i++) {
                const r = getValue(node[arr_i].val, itemSchema);
                str = processValue(str, r);
              }
            } else {
              for (let arr_i = 0; arr_i < arr_len; arr_i++) {
                const r = _e(node[arr_i], itemSchema, options);
                str = processValue(str, r);
              }
            }
            str += chars.arrayEnd;
          } else {
            str += chars.objStart;
            const keys = Object.keys(e_schema);
            if (Array.isArray(node)) {
              node = node[0];
            }
            for (let i in keys) {
              const key = keys[i];
              let r;
              if (!options.ignoreAttributes && node.attrsMap && node.attrsMap[key]) {
                r = _e(node.attrsMap[key], e_schema[key], options);
              } else if (key === options.textNodeName) {
                r = _e(node.val, e_schema[key], options);
              } else {
                r = _e(node.child[key], e_schema[key], options);
              }
              str = processValue(str, r);
            }
          }
          return str;
        } else {
          return hasValidData;
        }
      }
    };
    var getValue = function(a) {
      switch (a) {
        case void 0:
          return chars.missingPremitive;
        case null:
          return chars.nilPremitive;
        case "":
          return chars.emptyValue;
        default:
          return a;
      }
    };
    var processValue = function(str, r) {
      if (!isAppChar(r[0]) && !isAppChar(str[str.length - 1])) {
        str += chars.boundryChar;
      }
      return str + r;
    };
    var isAppChar = function(ch) {
      return charsArr.indexOf(ch) !== -1;
    };
    function hasData(jObj) {
      if (jObj === void 0) {
        return chars.missingChar;
      } else if (jObj === null) {
        return chars.nilChar;
      } else if (jObj.child && Object.keys(jObj.child).length === 0 && (!jObj.attrsMap || Object.keys(jObj.attrsMap).length === 0)) {
        return chars.emptyChar;
      } else {
        return true;
      }
    }
    var x2j = require_xmlstr2xmlnode();
    var buildOptions = require_util().buildOptions;
    var convert2nimn = function(node, e_schema, options) {
      options = buildOptions(options, x2j.defaultOptions, x2j.props);
      return _e(node, e_schema, options);
    };
    exports.convert2nimn = convert2nimn;
  }
});

// node_modules/fast-xml-parser/src/node2json_str.js
var require_node2json_str = __commonJS({
  "node_modules/fast-xml-parser/src/node2json_str.js"(exports) {
    "use strict";
    var util = require_util();
    var buildOptions = require_util().buildOptions;
    var x2j = require_xmlstr2xmlnode();
    var convertToJsonString = function(node, options) {
      options = buildOptions(options, x2j.defaultOptions, x2j.props);
      options.indentBy = options.indentBy || "";
      return _cToJsonStr(node, options, 0);
    };
    var _cToJsonStr = function(node, options, level) {
      let jObj = "{";
      const keys = Object.keys(node.child);
      for (let index = 0; index < keys.length; index++) {
        var tagname = keys[index];
        if (node.child[tagname] && node.child[tagname].length > 1) {
          jObj += '"' + tagname + '" : [ ';
          for (var tag in node.child[tagname]) {
            jObj += _cToJsonStr(node.child[tagname][tag], options) + " , ";
          }
          jObj = jObj.substr(0, jObj.length - 1) + " ] ";
        } else {
          jObj += '"' + tagname + '" : ' + _cToJsonStr(node.child[tagname][0], options) + " ,";
        }
      }
      util.merge(jObj, node.attrsMap);
      if (util.isEmptyObject(jObj)) {
        return util.isExist(node.val) ? node.val : "";
      } else {
        if (util.isExist(node.val)) {
          if (!(typeof node.val === "string" && (node.val === "" || node.val === options.cdataPositionChar))) {
            jObj += '"' + options.textNodeName + '" : ' + stringval(node.val);
          }
        }
      }
      if (jObj[jObj.length - 1] === ",") {
        jObj = jObj.substr(0, jObj.length - 2);
      }
      return jObj + "}";
    };
    function stringval(v) {
      if (v === true || v === false || !isNaN(v)) {
        return v;
      } else {
        return '"' + v + '"';
      }
    }
    exports.convertToJsonString = convertToJsonString;
  }
});

// node_modules/fast-xml-parser/src/json2xml.js
var require_json2xml = __commonJS({
  "node_modules/fast-xml-parser/src/json2xml.js"(exports, module5) {
    "use strict";
    var buildOptions = require_util().buildOptions;
    var defaultOptions = {
      attributeNamePrefix: "@_",
      attrNodeName: false,
      textNodeName: "#text",
      ignoreAttributes: true,
      cdataTagName: false,
      cdataPositionChar: "\\c",
      format: false,
      indentBy: "  ",
      supressEmptyNode: false,
      tagValueProcessor: function(a) {
        return a;
      },
      attrValueProcessor: function(a) {
        return a;
      }
    };
    var props = [
      "attributeNamePrefix",
      "attrNodeName",
      "textNodeName",
      "ignoreAttributes",
      "cdataTagName",
      "cdataPositionChar",
      "format",
      "indentBy",
      "supressEmptyNode",
      "tagValueProcessor",
      "attrValueProcessor"
    ];
    function Parser(options) {
      this.options = buildOptions(options, defaultOptions, props);
      if (this.options.ignoreAttributes || this.options.attrNodeName) {
        this.isAttribute = function() {
          return false;
        };
      } else {
        this.attrPrefixLen = this.options.attributeNamePrefix.length;
        this.isAttribute = isAttribute;
      }
      if (this.options.cdataTagName) {
        this.isCDATA = isCDATA;
      } else {
        this.isCDATA = function() {
          return false;
        };
      }
      this.replaceCDATAstr = replaceCDATAstr;
      this.replaceCDATAarr = replaceCDATAarr;
      if (this.options.format) {
        this.indentate = indentate;
        this.tagEndChar = ">\n";
        this.newLine = "\n";
      } else {
        this.indentate = function() {
          return "";
        };
        this.tagEndChar = ">";
        this.newLine = "";
      }
      if (this.options.supressEmptyNode) {
        this.buildTextNode = buildEmptyTextNode;
        this.buildObjNode = buildEmptyObjNode;
      } else {
        this.buildTextNode = buildTextValNode;
        this.buildObjNode = buildObjectNode;
      }
      this.buildTextValNode = buildTextValNode;
      this.buildObjectNode = buildObjectNode;
    }
    Parser.prototype.parse = function(jObj) {
      return this.j2x(jObj, 0).val;
    };
    Parser.prototype.j2x = function(jObj, level) {
      let attrStr = "";
      let val = "";
      const keys = Object.keys(jObj);
      const len = keys.length;
      for (let i = 0; i < len; i++) {
        const key = keys[i];
        if (typeof jObj[key] === "undefined") {
        } else if (jObj[key] === null) {
          val += this.indentate(level) + "<" + key + "/" + this.tagEndChar;
        } else if (jObj[key] instanceof Date) {
          val += this.buildTextNode(jObj[key], key, "", level);
        } else if (typeof jObj[key] !== "object") {
          const attr = this.isAttribute(key);
          if (attr) {
            attrStr += " " + attr + '="' + this.options.attrValueProcessor("" + jObj[key]) + '"';
          } else if (this.isCDATA(key)) {
            if (jObj[this.options.textNodeName]) {
              val += this.replaceCDATAstr(jObj[this.options.textNodeName], jObj[key]);
            } else {
              val += this.replaceCDATAstr("", jObj[key]);
            }
          } else {
            if (key === this.options.textNodeName) {
              if (jObj[this.options.cdataTagName]) {
              } else {
                val += this.options.tagValueProcessor("" + jObj[key]);
              }
            } else {
              val += this.buildTextNode(jObj[key], key, "", level);
            }
          }
        } else if (Array.isArray(jObj[key])) {
          if (this.isCDATA(key)) {
            val += this.indentate(level);
            if (jObj[this.options.textNodeName]) {
              val += this.replaceCDATAarr(jObj[this.options.textNodeName], jObj[key]);
            } else {
              val += this.replaceCDATAarr("", jObj[key]);
            }
          } else {
            const arrLen = jObj[key].length;
            for (let j = 0; j < arrLen; j++) {
              const item = jObj[key][j];
              if (typeof item === "undefined") {
              } else if (item === null) {
                val += this.indentate(level) + "<" + key + "/" + this.tagEndChar;
              } else if (typeof item === "object") {
                const result = this.j2x(item, level + 1);
                val += this.buildObjNode(result.val, key, result.attrStr, level);
              } else {
                val += this.buildTextNode(item, key, "", level);
              }
            }
          }
        } else {
          if (this.options.attrNodeName && key === this.options.attrNodeName) {
            const Ks = Object.keys(jObj[key]);
            const L = Ks.length;
            for (let j = 0; j < L; j++) {
              attrStr += " " + Ks[j] + '="' + this.options.attrValueProcessor("" + jObj[key][Ks[j]]) + '"';
            }
          } else {
            const result = this.j2x(jObj[key], level + 1);
            val += this.buildObjNode(result.val, key, result.attrStr, level);
          }
        }
      }
      return { attrStr, val };
    };
    function replaceCDATAstr(str, cdata) {
      str = this.options.tagValueProcessor("" + str);
      if (this.options.cdataPositionChar === "" || str === "") {
        return str + "<![CDATA[" + cdata + "]]" + this.tagEndChar;
      } else {
        return str.replace(this.options.cdataPositionChar, "<![CDATA[" + cdata + "]]" + this.tagEndChar);
      }
    }
    function replaceCDATAarr(str, cdata) {
      str = this.options.tagValueProcessor("" + str);
      if (this.options.cdataPositionChar === "" || str === "") {
        return str + "<![CDATA[" + cdata.join("]]><![CDATA[") + "]]" + this.tagEndChar;
      } else {
        for (let v in cdata) {
          str = str.replace(this.options.cdataPositionChar, "<![CDATA[" + cdata[v] + "]]>");
        }
        return str + this.newLine;
      }
    }
    function buildObjectNode(val, key, attrStr, level) {
      if (attrStr && !val.includes("<")) {
        return this.indentate(level) + "<" + key + attrStr + ">" + val + "</" + key + this.tagEndChar;
      } else {
        return this.indentate(level) + "<" + key + attrStr + this.tagEndChar + val + this.indentate(level) + "</" + key + this.tagEndChar;
      }
    }
    function buildEmptyObjNode(val, key, attrStr, level) {
      if (val !== "") {
        return this.buildObjectNode(val, key, attrStr, level);
      } else {
        return this.indentate(level) + "<" + key + attrStr + "/" + this.tagEndChar;
      }
    }
    function buildTextValNode(val, key, attrStr, level) {
      return this.indentate(level) + "<" + key + attrStr + ">" + this.options.tagValueProcessor(val) + "</" + key + this.tagEndChar;
    }
    function buildEmptyTextNode(val, key, attrStr, level) {
      if (val !== "") {
        return this.buildTextValNode(val, key, attrStr, level);
      } else {
        return this.indentate(level) + "<" + key + attrStr + "/" + this.tagEndChar;
      }
    }
    function indentate(level) {
      return this.options.indentBy.repeat(level);
    }
    function isAttribute(name4) {
      if (name4.startsWith(this.options.attributeNamePrefix)) {
        return name4.substr(this.attrPrefixLen);
      } else {
        return false;
      }
    }
    function isCDATA(name4) {
      return name4 === this.options.cdataTagName;
    }
    module5.exports = Parser;
  }
});

// node_modules/fast-xml-parser/src/parser.js
var require_parser = __commonJS({
  "node_modules/fast-xml-parser/src/parser.js"(exports) {
    "use strict";
    var nodeToJson = require_node2json();
    var xmlToNodeobj = require_xmlstr2xmlnode();
    var x2xmlnode = require_xmlstr2xmlnode();
    var buildOptions = require_util().buildOptions;
    var validator = require_validator();
    exports.parse = function(xmlData, options, validationOption) {
      if (validationOption) {
        if (validationOption === true)
          validationOption = {};
        const result = validator.validate(xmlData, validationOption);
        if (result !== true) {
          throw Error(result.err.msg);
        }
      }
      options = buildOptions(options, x2xmlnode.defaultOptions, x2xmlnode.props);
      const traversableObj = xmlToNodeobj.getTraversalObj(xmlData, options);
      return nodeToJson.convertToJson(traversableObj, options);
    };
    exports.convertTonimn = require_nimndata().convert2nimn;
    exports.getTraversalObj = xmlToNodeobj.getTraversalObj;
    exports.convertToJson = nodeToJson.convertToJson;
    exports.convertToJsonString = require_node2json_str().convertToJsonString;
    exports.validate = validator.validate;
    exports.j2xParser = require_json2xml();
    exports.parseToNimn = function(xmlData, schema, options) {
      return exports.convertTonimn(exports.getTraversalObj(xmlData, options), schema, options);
    };
  }
});

// node_modules/uuid/dist/rng.js
var require_rng = __commonJS({
  "node_modules/uuid/dist/rng.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = rng;
    var _crypto = _interopRequireDefault(require("crypto"));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var rnds8Pool = new Uint8Array(256);
    var poolPtr = rnds8Pool.length;
    function rng() {
      if (poolPtr > rnds8Pool.length - 16) {
        _crypto.default.randomFillSync(rnds8Pool);
        poolPtr = 0;
      }
      return rnds8Pool.slice(poolPtr, poolPtr += 16);
    }
  }
});

// node_modules/uuid/dist/regex.js
var require_regex = __commonJS({
  "node_modules/uuid/dist/regex.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/validate.js
var require_validate = __commonJS({
  "node_modules/uuid/dist/validate.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _regex = _interopRequireDefault(require_regex());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function validate3(uuid2) {
      return typeof uuid2 === "string" && _regex.default.test(uuid2);
    }
    var _default = validate3;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/stringify.js
var require_stringify = __commonJS({
  "node_modules/uuid/dist/stringify.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _validate = _interopRequireDefault(require_validate());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var byteToHex = [];
    for (let i = 0; i < 256; ++i) {
      byteToHex.push((i + 256).toString(16).substr(1));
    }
    function stringify2(arr, offset = 0) {
      const uuid2 = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
      if (!(0, _validate.default)(uuid2)) {
        throw TypeError("Stringified UUID is invalid");
      }
      return uuid2;
    }
    var _default = stringify2;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/v1.js
var require_v1 = __commonJS({
  "node_modules/uuid/dist/v1.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _rng = _interopRequireDefault(require_rng());
    var _stringify = _interopRequireDefault(require_stringify());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var _nodeId;
    var _clockseq;
    var _lastMSecs = 0;
    var _lastNSecs = 0;
    function v12(options, buf, offset) {
      let i = buf && offset || 0;
      const b = buf || new Array(16);
      options = options || {};
      let node = options.node || _nodeId;
      let clockseq = options.clockseq !== void 0 ? options.clockseq : _clockseq;
      if (node == null || clockseq == null) {
        const seedBytes = options.random || (options.rng || _rng.default)();
        if (node == null) {
          node = _nodeId = [seedBytes[0] | 1, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
        }
        if (clockseq == null) {
          clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 16383;
        }
      }
      let msecs = options.msecs !== void 0 ? options.msecs : Date.now();
      let nsecs = options.nsecs !== void 0 ? options.nsecs : _lastNSecs + 1;
      const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 1e4;
      if (dt < 0 && options.clockseq === void 0) {
        clockseq = clockseq + 1 & 16383;
      }
      if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === void 0) {
        nsecs = 0;
      }
      if (nsecs >= 1e4) {
        throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
      }
      _lastMSecs = msecs;
      _lastNSecs = nsecs;
      _clockseq = clockseq;
      msecs += 122192928e5;
      const tl = ((msecs & 268435455) * 1e4 + nsecs) % 4294967296;
      b[i++] = tl >>> 24 & 255;
      b[i++] = tl >>> 16 & 255;
      b[i++] = tl >>> 8 & 255;
      b[i++] = tl & 255;
      const tmh = msecs / 4294967296 * 1e4 & 268435455;
      b[i++] = tmh >>> 8 & 255;
      b[i++] = tmh & 255;
      b[i++] = tmh >>> 24 & 15 | 16;
      b[i++] = tmh >>> 16 & 255;
      b[i++] = clockseq >>> 8 | 128;
      b[i++] = clockseq & 255;
      for (let n = 0; n < 6; ++n) {
        b[i + n] = node[n];
      }
      return buf || (0, _stringify.default)(b);
    }
    var _default = v12;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/parse.js
var require_parse = __commonJS({
  "node_modules/uuid/dist/parse.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _validate = _interopRequireDefault(require_validate());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function parse4(uuid2) {
      if (!(0, _validate.default)(uuid2)) {
        throw TypeError("Invalid UUID");
      }
      let v;
      const arr = new Uint8Array(16);
      arr[0] = (v = parseInt(uuid2.slice(0, 8), 16)) >>> 24;
      arr[1] = v >>> 16 & 255;
      arr[2] = v >>> 8 & 255;
      arr[3] = v & 255;
      arr[4] = (v = parseInt(uuid2.slice(9, 13), 16)) >>> 8;
      arr[5] = v & 255;
      arr[6] = (v = parseInt(uuid2.slice(14, 18), 16)) >>> 8;
      arr[7] = v & 255;
      arr[8] = (v = parseInt(uuid2.slice(19, 23), 16)) >>> 8;
      arr[9] = v & 255;
      arr[10] = (v = parseInt(uuid2.slice(24, 36), 16)) / 1099511627776 & 255;
      arr[11] = v / 4294967296 & 255;
      arr[12] = v >>> 24 & 255;
      arr[13] = v >>> 16 & 255;
      arr[14] = v >>> 8 & 255;
      arr[15] = v & 255;
      return arr;
    }
    var _default = parse4;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/v35.js
var require_v35 = __commonJS({
  "node_modules/uuid/dist/v35.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = _default;
    exports.URL = exports.DNS = void 0;
    var _stringify = _interopRequireDefault(require_stringify());
    var _parse = _interopRequireDefault(require_parse());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function stringToBytes(str) {
      str = unescape(encodeURIComponent(str));
      const bytes = [];
      for (let i = 0; i < str.length; ++i) {
        bytes.push(str.charCodeAt(i));
      }
      return bytes;
    }
    var DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
    exports.DNS = DNS;
    var URL2 = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
    exports.URL = URL2;
    function _default(name4, version5, hashfunc) {
      function generateUUID(value, namespace, buf, offset) {
        if (typeof value === "string") {
          value = stringToBytes(value);
        }
        if (typeof namespace === "string") {
          namespace = (0, _parse.default)(namespace);
        }
        if (namespace.length !== 16) {
          throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
        }
        let bytes = new Uint8Array(16 + value.length);
        bytes.set(namespace);
        bytes.set(value, namespace.length);
        bytes = hashfunc(bytes);
        bytes[6] = bytes[6] & 15 | version5;
        bytes[8] = bytes[8] & 63 | 128;
        if (buf) {
          offset = offset || 0;
          for (let i = 0; i < 16; ++i) {
            buf[offset + i] = bytes[i];
          }
          return buf;
        }
        return (0, _stringify.default)(bytes);
      }
      try {
        generateUUID.name = name4;
      } catch (err) {
      }
      generateUUID.DNS = DNS;
      generateUUID.URL = URL2;
      return generateUUID;
    }
  }
});

// node_modules/uuid/dist/md5.js
var require_md5 = __commonJS({
  "node_modules/uuid/dist/md5.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _crypto = _interopRequireDefault(require("crypto"));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function md5(bytes) {
      if (Array.isArray(bytes)) {
        bytes = Buffer.from(bytes);
      } else if (typeof bytes === "string") {
        bytes = Buffer.from(bytes, "utf8");
      }
      return _crypto.default.createHash("md5").update(bytes).digest();
    }
    var _default = md5;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/v3.js
var require_v3 = __commonJS({
  "node_modules/uuid/dist/v3.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _v = _interopRequireDefault(require_v35());
    var _md = _interopRequireDefault(require_md5());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var v32 = (0, _v.default)("v3", 48, _md.default);
    var _default = v32;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/v4.js
var require_v4 = __commonJS({
  "node_modules/uuid/dist/v4.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _rng = _interopRequireDefault(require_rng());
    var _stringify = _interopRequireDefault(require_stringify());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function v42(options, buf, offset) {
      options = options || {};
      const rnds = options.random || (options.rng || _rng.default)();
      rnds[6] = rnds[6] & 15 | 64;
      rnds[8] = rnds[8] & 63 | 128;
      if (buf) {
        offset = offset || 0;
        for (let i = 0; i < 16; ++i) {
          buf[offset + i] = rnds[i];
        }
        return buf;
      }
      return (0, _stringify.default)(rnds);
    }
    var _default = v42;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/sha1.js
var require_sha1 = __commonJS({
  "node_modules/uuid/dist/sha1.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _crypto = _interopRequireDefault(require("crypto"));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function sha1(bytes) {
      if (Array.isArray(bytes)) {
        bytes = Buffer.from(bytes);
      } else if (typeof bytes === "string") {
        bytes = Buffer.from(bytes, "utf8");
      }
      return _crypto.default.createHash("sha1").update(bytes).digest();
    }
    var _default = sha1;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/v5.js
var require_v5 = __commonJS({
  "node_modules/uuid/dist/v5.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _v = _interopRequireDefault(require_v35());
    var _sha = _interopRequireDefault(require_sha1());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var v52 = (0, _v.default)("v5", 80, _sha.default);
    var _default = v52;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/nil.js
var require_nil = __commonJS({
  "node_modules/uuid/dist/nil.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _default = "00000000-0000-0000-0000-000000000000";
    exports.default = _default;
  }
});

// node_modules/uuid/dist/version.js
var require_version = __commonJS({
  "node_modules/uuid/dist/version.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _validate = _interopRequireDefault(require_validate());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function version5(uuid2) {
      if (!(0, _validate.default)(uuid2)) {
        throw TypeError("Invalid UUID");
      }
      return parseInt(uuid2.substr(14, 1), 16);
    }
    var _default = version5;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/index.js
var require_dist = __commonJS({
  "node_modules/uuid/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "v1", {
      enumerable: true,
      get: function() {
        return _v.default;
      }
    });
    Object.defineProperty(exports, "v3", {
      enumerable: true,
      get: function() {
        return _v2.default;
      }
    });
    Object.defineProperty(exports, "v4", {
      enumerable: true,
      get: function() {
        return _v3.default;
      }
    });
    Object.defineProperty(exports, "v5", {
      enumerable: true,
      get: function() {
        return _v4.default;
      }
    });
    Object.defineProperty(exports, "NIL", {
      enumerable: true,
      get: function() {
        return _nil.default;
      }
    });
    Object.defineProperty(exports, "version", {
      enumerable: true,
      get: function() {
        return _version.default;
      }
    });
    Object.defineProperty(exports, "validate", {
      enumerable: true,
      get: function() {
        return _validate.default;
      }
    });
    Object.defineProperty(exports, "stringify", {
      enumerable: true,
      get: function() {
        return _stringify.default;
      }
    });
    Object.defineProperty(exports, "parse", {
      enumerable: true,
      get: function() {
        return _parse.default;
      }
    });
    var _v = _interopRequireDefault(require_v1());
    var _v2 = _interopRequireDefault(require_v3());
    var _v3 = _interopRequireDefault(require_v4());
    var _v4 = _interopRequireDefault(require_v5());
    var _nil = _interopRequireDefault(require_nil());
    var _version = _interopRequireDefault(require_version());
    var _validate = _interopRequireDefault(require_validate());
    var _stringify = _interopRequireDefault(require_stringify());
    var _parse = _interopRequireDefault(require_parse());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
  }
});

// node_modules/@aws-crypto/crc32/node_modules/tslib/tslib.js
var require_tslib2 = __commonJS({
  "node_modules/@aws-crypto/crc32/node_modules/tslib/tslib.js"(exports, module5) {
    var __extends2;
    var __assign2;
    var __rest2;
    var __decorate2;
    var __param2;
    var __metadata2;
    var __awaiter2;
    var __generator2;
    var __exportStar2;
    var __values3;
    var __read2;
    var __spread2;
    var __spreadArrays2;
    var __await2;
    var __asyncGenerator2;
    var __asyncDelegator2;
    var __asyncValues2;
    var __makeTemplateObject2;
    var __importStar2;
    var __importDefault2;
    var __classPrivateFieldGet2;
    var __classPrivateFieldSet2;
    var __createBinding2;
    (function(factory) {
      var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
      if (typeof define === "function" && define.amd) {
        define("tslib", ["exports"], function(exports2) {
          factory(createExporter(root, createExporter(exports2)));
        });
      } else if (typeof module5 === "object" && typeof module5.exports === "object") {
        factory(createExporter(root, createExporter(module5.exports)));
      } else {
        factory(createExporter(root));
      }
      function createExporter(exports2, previous) {
        if (exports2 !== root) {
          if (typeof Object.create === "function") {
            Object.defineProperty(exports2, "__esModule", { value: true });
          } else {
            exports2.__esModule = true;
          }
        }
        return function(id, v) {
          return exports2[id] = previous ? previous(id, v) : v;
        };
      }
    })(function(exporter) {
      var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
        d.__proto__ = b;
      } || function(d, b) {
        for (var p in b)
          if (b.hasOwnProperty(p))
            d[p] = b[p];
      };
      __extends2 = function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
      __assign2 = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      __rest2 = function(s, e) {
        var t = {};
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
          for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
              t[p[i]] = s[p[i]];
          }
        return t;
      };
      __decorate2 = function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      __param2 = function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      __metadata2 = function(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(metadataKey, metadataValue);
      };
      __awaiter2 = function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      __generator2 = function(thisArg, body) {
        var _ = { label: 0, sent: function() {
          if (t[0] & 1)
            throw t[1];
          return t[1];
        }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
          return this;
        }), g;
        function verb(n) {
          return function(v) {
            return step([n, v]);
          };
        }
        function step(op) {
          if (f)
            throw new TypeError("Generator is already executing.");
          while (_)
            try {
              if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                return t;
              if (y = 0, t)
                op = [op[0] & 2, t.value];
              switch (op[0]) {
                case 0:
                case 1:
                  t = op;
                  break;
                case 4:
                  _.label++;
                  return { value: op[1], done: false };
                case 5:
                  _.label++;
                  y = op[1];
                  op = [0];
                  continue;
                case 7:
                  op = _.ops.pop();
                  _.trys.pop();
                  continue;
                default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                    _ = 0;
                    continue;
                  }
                  if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                    _.label = op[1];
                    break;
                  }
                  if (op[0] === 6 && _.label < t[1]) {
                    _.label = t[1];
                    t = op;
                    break;
                  }
                  if (t && _.label < t[2]) {
                    _.label = t[2];
                    _.ops.push(op);
                    break;
                  }
                  if (t[2])
                    _.ops.pop();
                  _.trys.pop();
                  continue;
              }
              op = body.call(thisArg, _);
            } catch (e) {
              op = [6, e];
              y = 0;
            } finally {
              f = t = 0;
            }
          if (op[0] & 5)
            throw op[1];
          return { value: op[0] ? op[1] : void 0, done: true };
        }
      };
      __createBinding2 = function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      };
      __exportStar2 = function(m, exports2) {
        for (var p in m)
          if (p !== "default" && !exports2.hasOwnProperty(p))
            exports2[p] = m[p];
      };
      __values3 = function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
          return m.call(o);
        if (o && typeof o.length === "number")
          return {
            next: function() {
              if (o && i >= o.length)
                o = void 0;
              return { value: o && o[i++], done: !o };
            }
          };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
      };
      __read2 = function(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
          return o;
        var i = m.call(o), r, ar = [], e;
        try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
            ar.push(r.value);
        } catch (error) {
          e = { error };
        } finally {
          try {
            if (r && !r.done && (m = i["return"]))
              m.call(i);
          } finally {
            if (e)
              throw e.error;
          }
        }
        return ar;
      };
      __spread2 = function() {
        for (var ar = [], i = 0; i < arguments.length; i++)
          ar = ar.concat(__read2(arguments[i]));
        return ar;
      };
      __spreadArrays2 = function() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
          s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
          for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
        return r;
      };
      __await2 = function(v) {
        return this instanceof __await2 ? (this.v = v, this) : new __await2(v);
      };
      __asyncGenerator2 = function(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
          return this;
        }, i;
        function verb(n) {
          if (g[n])
            i[n] = function(v) {
              return new Promise(function(a, b) {
                q.push([n, v, a, b]) > 1 || resume(n, v);
              });
            };
        }
        function resume(n, v) {
          try {
            step(g[n](v));
          } catch (e) {
            settle(q[0][3], e);
          }
        }
        function step(r) {
          r.value instanceof __await2 ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
        }
        function fulfill(value) {
          resume("next", value);
        }
        function reject(value) {
          resume("throw", value);
        }
        function settle(f, v) {
          if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]);
        }
      };
      __asyncDelegator2 = function(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function(e) {
          throw e;
        }), verb("return"), i[Symbol.iterator] = function() {
          return this;
        }, i;
        function verb(n, f) {
          i[n] = o[n] ? function(v) {
            return (p = !p) ? { value: __await2(o[n](v)), done: n === "return" } : f ? f(v) : v;
          } : f;
        }
      };
      __asyncValues2 = function(o) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values3 === "function" ? __values3(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
          return this;
        }, i);
        function verb(n) {
          i[n] = o[n] && function(v) {
            return new Promise(function(resolve, reject) {
              v = o[n](v), settle(resolve, reject, v.done, v.value);
            });
          };
        }
        function settle(resolve, reject, d, v) {
          Promise.resolve(v).then(function(v2) {
            resolve({ value: v2, done: d });
          }, reject);
        }
      };
      __makeTemplateObject2 = function(cooked, raw) {
        if (Object.defineProperty) {
          Object.defineProperty(cooked, "raw", { value: raw });
        } else {
          cooked.raw = raw;
        }
        return cooked;
      };
      __importStar2 = function(mod) {
        if (mod && mod.__esModule)
          return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (Object.hasOwnProperty.call(mod, k))
              result[k] = mod[k];
        }
        result["default"] = mod;
        return result;
      };
      __importDefault2 = function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      __classPrivateFieldGet2 = function(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
          throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
      };
      __classPrivateFieldSet2 = function(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
          throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
      };
      exporter("__extends", __extends2);
      exporter("__assign", __assign2);
      exporter("__rest", __rest2);
      exporter("__decorate", __decorate2);
      exporter("__param", __param2);
      exporter("__metadata", __metadata2);
      exporter("__awaiter", __awaiter2);
      exporter("__generator", __generator2);
      exporter("__exportStar", __exportStar2);
      exporter("__createBinding", __createBinding2);
      exporter("__values", __values3);
      exporter("__read", __read2);
      exporter("__spread", __spread2);
      exporter("__spreadArrays", __spreadArrays2);
      exporter("__await", __await2);
      exporter("__asyncGenerator", __asyncGenerator2);
      exporter("__asyncDelegator", __asyncDelegator2);
      exporter("__asyncValues", __asyncValues2);
      exporter("__makeTemplateObject", __makeTemplateObject2);
      exporter("__importStar", __importStar2);
      exporter("__importDefault", __importDefault2);
      exporter("__classPrivateFieldGet", __classPrivateFieldGet2);
      exporter("__classPrivateFieldSet", __classPrivateFieldSet2);
    });
  }
});

// node_modules/@aws-sdk/util-utf8-browser/dist-es/pureJs.js
var fromUtf82, toUtf82;
var init_pureJs = __esm({
  "node_modules/@aws-sdk/util-utf8-browser/dist-es/pureJs.js"() {
    fromUtf82 = function(input) {
      var bytes = [];
      for (var i = 0, len = input.length; i < len; i++) {
        var value = input.charCodeAt(i);
        if (value < 128) {
          bytes.push(value);
        } else if (value < 2048) {
          bytes.push(value >> 6 | 192, value & 63 | 128);
        } else if (i + 1 < input.length && (value & 64512) === 55296 && (input.charCodeAt(i + 1) & 64512) === 56320) {
          var surrogatePair = 65536 + ((value & 1023) << 10) + (input.charCodeAt(++i) & 1023);
          bytes.push(surrogatePair >> 18 | 240, surrogatePair >> 12 & 63 | 128, surrogatePair >> 6 & 63 | 128, surrogatePair & 63 | 128);
        } else {
          bytes.push(value >> 12 | 224, value >> 6 & 63 | 128, value & 63 | 128);
        }
      }
      return Uint8Array.from(bytes);
    };
    toUtf82 = function(input) {
      var decoded = "";
      for (var i = 0, len = input.length; i < len; i++) {
        var byte = input[i];
        if (byte < 128) {
          decoded += String.fromCharCode(byte);
        } else if (192 <= byte && byte < 224) {
          var nextByte = input[++i];
          decoded += String.fromCharCode((byte & 31) << 6 | nextByte & 63);
        } else if (240 <= byte && byte < 365) {
          var surrogatePair = [byte, input[++i], input[++i], input[++i]];
          var encoded = "%" + surrogatePair.map(function(byteValue) {
            return byteValue.toString(16);
          }).join("%");
          decoded += decodeURIComponent(encoded);
        } else {
          decoded += String.fromCharCode((byte & 15) << 12 | (input[++i] & 63) << 6 | input[++i] & 63);
        }
      }
      return decoded;
    };
  }
});

// node_modules/@aws-sdk/util-utf8-browser/dist-es/whatwgEncodingApi.js
function fromUtf83(input) {
  return new TextEncoder().encode(input);
}
function toUtf83(input) {
  return new TextDecoder("utf-8").decode(input);
}
var init_whatwgEncodingApi = __esm({
  "node_modules/@aws-sdk/util-utf8-browser/dist-es/whatwgEncodingApi.js"() {
  }
});

// node_modules/@aws-sdk/util-utf8-browser/dist-es/index.js
var dist_es_exports = {};
__export(dist_es_exports, {
  fromUtf8: () => fromUtf84,
  toUtf8: () => toUtf84
});
var fromUtf84, toUtf84;
var init_dist_es = __esm({
  "node_modules/@aws-sdk/util-utf8-browser/dist-es/index.js"() {
    init_pureJs();
    init_whatwgEncodingApi();
    fromUtf84 = function(input) {
      return typeof TextEncoder === "function" ? fromUtf83(input) : fromUtf82(input);
    };
    toUtf84 = function(input) {
      return typeof TextDecoder === "function" ? toUtf83(input) : toUtf82(input);
    };
  }
});

// node_modules/@aws-crypto/util/build/convertToBuffer.js
var require_convertToBuffer = __commonJS({
  "node_modules/@aws-crypto/util/build/convertToBuffer.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.convertToBuffer = void 0;
    var util_utf8_browser_1 = (init_dist_es(), dist_es_exports);
    var fromUtf85 = typeof Buffer !== "undefined" && Buffer.from ? function(input) {
      return Buffer.from(input, "utf8");
    } : util_utf8_browser_1.fromUtf8;
    function convertToBuffer(data) {
      if (data instanceof Uint8Array)
        return data;
      if (typeof data === "string") {
        return fromUtf85(data);
      }
      if (ArrayBuffer.isView(data)) {
        return new Uint8Array(data.buffer, data.byteOffset, data.byteLength / Uint8Array.BYTES_PER_ELEMENT);
      }
      return new Uint8Array(data);
    }
    exports.convertToBuffer = convertToBuffer;
  }
});

// node_modules/@aws-crypto/util/build/isEmptyData.js
var require_isEmptyData = __commonJS({
  "node_modules/@aws-crypto/util/build/isEmptyData.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isEmptyData = void 0;
    function isEmptyData(data) {
      if (typeof data === "string") {
        return data.length === 0;
      }
      return data.byteLength === 0;
    }
    exports.isEmptyData = isEmptyData;
  }
});

// node_modules/@aws-crypto/util/build/numToUint8.js
var require_numToUint8 = __commonJS({
  "node_modules/@aws-crypto/util/build/numToUint8.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.numToUint8 = void 0;
    function numToUint8(num) {
      return new Uint8Array([
        (num & 4278190080) >> 24,
        (num & 16711680) >> 16,
        (num & 65280) >> 8,
        num & 255
      ]);
    }
    exports.numToUint8 = numToUint8;
  }
});

// node_modules/@aws-crypto/util/build/uint32ArrayFrom.js
var require_uint32ArrayFrom = __commonJS({
  "node_modules/@aws-crypto/util/build/uint32ArrayFrom.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.uint32ArrayFrom = void 0;
    function uint32ArrayFrom(a_lookUpTable) {
      if (!Array.from) {
        var return_array = new Uint32Array(a_lookUpTable.length);
        var a_index = 0;
        while (a_index < a_lookUpTable.length) {
          return_array[a_index] = a_lookUpTable[a_index];
        }
        return return_array;
      }
      return Uint32Array.from(a_lookUpTable);
    }
    exports.uint32ArrayFrom = uint32ArrayFrom;
  }
});

// node_modules/@aws-crypto/util/build/index.js
var require_build = __commonJS({
  "node_modules/@aws-crypto/util/build/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.uint32ArrayFrom = exports.numToUint8 = exports.isEmptyData = exports.convertToBuffer = void 0;
    var convertToBuffer_1 = require_convertToBuffer();
    Object.defineProperty(exports, "convertToBuffer", { enumerable: true, get: function() {
      return convertToBuffer_1.convertToBuffer;
    } });
    var isEmptyData_1 = require_isEmptyData();
    Object.defineProperty(exports, "isEmptyData", { enumerable: true, get: function() {
      return isEmptyData_1.isEmptyData;
    } });
    var numToUint8_1 = require_numToUint8();
    Object.defineProperty(exports, "numToUint8", { enumerable: true, get: function() {
      return numToUint8_1.numToUint8;
    } });
    var uint32ArrayFrom_1 = require_uint32ArrayFrom();
    Object.defineProperty(exports, "uint32ArrayFrom", { enumerable: true, get: function() {
      return uint32ArrayFrom_1.uint32ArrayFrom;
    } });
  }
});

// node_modules/@aws-crypto/crc32/build/aws_crc32.js
var require_aws_crc32 = __commonJS({
  "node_modules/@aws-crypto/crc32/build/aws_crc32.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AwsCrc32 = void 0;
    var tslib_1 = require_tslib2();
    var util_1 = require_build();
    var index_1 = require_build2();
    var AwsCrc32 = function() {
      function AwsCrc322() {
        this.crc32 = new index_1.Crc32();
      }
      AwsCrc322.prototype.update = function(toHash) {
        if ((0, util_1.isEmptyData)(toHash))
          return;
        this.crc32.update((0, util_1.convertToBuffer)(toHash));
      };
      AwsCrc322.prototype.digest = function() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function() {
          return (0, tslib_1.__generator)(this, function(_a) {
            return [2, (0, util_1.numToUint8)(this.crc32.digest())];
          });
        });
      };
      return AwsCrc322;
    }();
    exports.AwsCrc32 = AwsCrc32;
  }
});

// node_modules/@aws-crypto/crc32/build/index.js
var require_build2 = __commonJS({
  "node_modules/@aws-crypto/crc32/build/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AwsCrc32 = exports.Crc32 = exports.crc32 = void 0;
    var tslib_1 = require_tslib2();
    var util_1 = require_build();
    function crc32(data) {
      return new Crc323().update(data).digest();
    }
    exports.crc32 = crc32;
    var Crc323 = function() {
      function Crc324() {
        this.checksum = 4294967295;
      }
      Crc324.prototype.update = function(data) {
        var e_1, _a;
        try {
          for (var data_1 = (0, tslib_1.__values)(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
            var byte = data_1_1.value;
            this.checksum = this.checksum >>> 8 ^ lookupTable[(this.checksum ^ byte) & 255];
          }
        } catch (e_1_1) {
          e_1 = { error: e_1_1 };
        } finally {
          try {
            if (data_1_1 && !data_1_1.done && (_a = data_1.return))
              _a.call(data_1);
          } finally {
            if (e_1)
              throw e_1.error;
          }
        }
        return this;
      };
      Crc324.prototype.digest = function() {
        return (this.checksum ^ 4294967295) >>> 0;
      };
      return Crc324;
    }();
    exports.Crc32 = Crc323;
    var a_lookUpTable = [
      0,
      1996959894,
      3993919788,
      2567524794,
      124634137,
      1886057615,
      3915621685,
      2657392035,
      249268274,
      2044508324,
      3772115230,
      2547177864,
      162941995,
      2125561021,
      3887607047,
      2428444049,
      498536548,
      1789927666,
      4089016648,
      2227061214,
      450548861,
      1843258603,
      4107580753,
      2211677639,
      325883990,
      1684777152,
      4251122042,
      2321926636,
      335633487,
      1661365465,
      4195302755,
      2366115317,
      997073096,
      1281953886,
      3579855332,
      2724688242,
      1006888145,
      1258607687,
      3524101629,
      2768942443,
      901097722,
      1119000684,
      3686517206,
      2898065728,
      853044451,
      1172266101,
      3705015759,
      2882616665,
      651767980,
      1373503546,
      3369554304,
      3218104598,
      565507253,
      1454621731,
      3485111705,
      3099436303,
      671266974,
      1594198024,
      3322730930,
      2970347812,
      795835527,
      1483230225,
      3244367275,
      3060149565,
      1994146192,
      31158534,
      2563907772,
      4023717930,
      1907459465,
      112637215,
      2680153253,
      3904427059,
      2013776290,
      251722036,
      2517215374,
      3775830040,
      2137656763,
      141376813,
      2439277719,
      3865271297,
      1802195444,
      476864866,
      2238001368,
      4066508878,
      1812370925,
      453092731,
      2181625025,
      4111451223,
      1706088902,
      314042704,
      2344532202,
      4240017532,
      1658658271,
      366619977,
      2362670323,
      4224994405,
      1303535960,
      984961486,
      2747007092,
      3569037538,
      1256170817,
      1037604311,
      2765210733,
      3554079995,
      1131014506,
      879679996,
      2909243462,
      3663771856,
      1141124467,
      855842277,
      2852801631,
      3708648649,
      1342533948,
      654459306,
      3188396048,
      3373015174,
      1466479909,
      544179635,
      3110523913,
      3462522015,
      1591671054,
      702138776,
      2966460450,
      3352799412,
      1504918807,
      783551873,
      3082640443,
      3233442989,
      3988292384,
      2596254646,
      62317068,
      1957810842,
      3939845945,
      2647816111,
      81470997,
      1943803523,
      3814918930,
      2489596804,
      225274430,
      2053790376,
      3826175755,
      2466906013,
      167816743,
      2097651377,
      4027552580,
      2265490386,
      503444072,
      1762050814,
      4150417245,
      2154129355,
      426522225,
      1852507879,
      4275313526,
      2312317920,
      282753626,
      1742555852,
      4189708143,
      2394877945,
      397917763,
      1622183637,
      3604390888,
      2714866558,
      953729732,
      1340076626,
      3518719985,
      2797360999,
      1068828381,
      1219638859,
      3624741850,
      2936675148,
      906185462,
      1090812512,
      3747672003,
      2825379669,
      829329135,
      1181335161,
      3412177804,
      3160834842,
      628085408,
      1382605366,
      3423369109,
      3138078467,
      570562233,
      1426400815,
      3317316542,
      2998733608,
      733239954,
      1555261956,
      3268935591,
      3050360625,
      752459403,
      1541320221,
      2607071920,
      3965973030,
      1969922972,
      40735498,
      2617837225,
      3943577151,
      1913087877,
      83908371,
      2512341634,
      3803740692,
      2075208622,
      213261112,
      2463272603,
      3855990285,
      2094854071,
      198958881,
      2262029012,
      4057260610,
      1759359992,
      534414190,
      2176718541,
      4139329115,
      1873836001,
      414664567,
      2282248934,
      4279200368,
      1711684554,
      285281116,
      2405801727,
      4167216745,
      1634467795,
      376229701,
      2685067896,
      3608007406,
      1308918612,
      956543938,
      2808555105,
      3495958263,
      1231636301,
      1047427035,
      2932959818,
      3654703836,
      1088359270,
      936918e3,
      2847714899,
      3736837829,
      1202900863,
      817233897,
      3183342108,
      3401237130,
      1404277552,
      615818150,
      3134207493,
      3453421203,
      1423857449,
      601450431,
      3009837614,
      3294710456,
      1567103746,
      711928724,
      3020668471,
      3272380065,
      1510334235,
      755167117
    ];
    var lookupTable = (0, util_1.uint32ArrayFrom)(a_lookUpTable);
    var aws_crc32_1 = require_aws_crc32();
    Object.defineProperty(exports, "AwsCrc32", { enumerable: true, get: function() {
      return aws_crc32_1.AwsCrc32;
    } });
  }
});

// node_modules/@actions/glob/lib/internal-glob-options-helper.js
var require_internal_glob_options_helper = __commonJS({
  "node_modules/@actions/glob/lib/internal-glob-options-helper.js"(exports) {
    "use strict";
    var __createBinding2 = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar2 = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.hasOwnProperty.call(mod, k))
            __createBinding2(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getOptions = void 0;
    var core2 = __importStar2(require_core());
    function getOptions(copy) {
      const result = {
        followSymbolicLinks: true,
        implicitDescendants: true,
        matchDirectories: true,
        omitBrokenSymbolicLinks: true
      };
      if (copy) {
        if (typeof copy.followSymbolicLinks === "boolean") {
          result.followSymbolicLinks = copy.followSymbolicLinks;
          core2.debug(`followSymbolicLinks '${result.followSymbolicLinks}'`);
        }
        if (typeof copy.implicitDescendants === "boolean") {
          result.implicitDescendants = copy.implicitDescendants;
          core2.debug(`implicitDescendants '${result.implicitDescendants}'`);
        }
        if (typeof copy.matchDirectories === "boolean") {
          result.matchDirectories = copy.matchDirectories;
          core2.debug(`matchDirectories '${result.matchDirectories}'`);
        }
        if (typeof copy.omitBrokenSymbolicLinks === "boolean") {
          result.omitBrokenSymbolicLinks = copy.omitBrokenSymbolicLinks;
          core2.debug(`omitBrokenSymbolicLinks '${result.omitBrokenSymbolicLinks}'`);
        }
      }
      return result;
    }
    exports.getOptions = getOptions;
  }
});

// node_modules/@actions/glob/lib/internal-path-helper.js
var require_internal_path_helper = __commonJS({
  "node_modules/@actions/glob/lib/internal-path-helper.js"(exports) {
    "use strict";
    var __createBinding2 = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar2 = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.hasOwnProperty.call(mod, k))
            __createBinding2(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __importDefault2 = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.safeTrimTrailingSeparator = exports.normalizeSeparators = exports.hasRoot = exports.hasAbsoluteRoot = exports.ensureAbsoluteRoot = exports.dirname = void 0;
    var path3 = __importStar2(require("path"));
    var assert_1 = __importDefault2(require("assert"));
    var IS_WINDOWS = process.platform === "win32";
    function dirname(p) {
      p = safeTrimTrailingSeparator(p);
      if (IS_WINDOWS && /^\\\\[^\\]+(\\[^\\]+)?$/.test(p)) {
        return p;
      }
      let result = path3.dirname(p);
      if (IS_WINDOWS && /^\\\\[^\\]+\\[^\\]+\\$/.test(result)) {
        result = safeTrimTrailingSeparator(result);
      }
      return result;
    }
    exports.dirname = dirname;
    function ensureAbsoluteRoot(root, itemPath) {
      assert_1.default(root, `ensureAbsoluteRoot parameter 'root' must not be empty`);
      assert_1.default(itemPath, `ensureAbsoluteRoot parameter 'itemPath' must not be empty`);
      if (hasAbsoluteRoot(itemPath)) {
        return itemPath;
      }
      if (IS_WINDOWS) {
        if (itemPath.match(/^[A-Z]:[^\\/]|^[A-Z]:$/i)) {
          let cwd = process.cwd();
          assert_1.default(cwd.match(/^[A-Z]:\\/i), `Expected current directory to start with an absolute drive root. Actual '${cwd}'`);
          if (itemPath[0].toUpperCase() === cwd[0].toUpperCase()) {
            if (itemPath.length === 2) {
              return `${itemPath[0]}:\\${cwd.substr(3)}`;
            } else {
              if (!cwd.endsWith("\\")) {
                cwd += "\\";
              }
              return `${itemPath[0]}:\\${cwd.substr(3)}${itemPath.substr(2)}`;
            }
          } else {
            return `${itemPath[0]}:\\${itemPath.substr(2)}`;
          }
        } else if (normalizeSeparators(itemPath).match(/^\\$|^\\[^\\]/)) {
          const cwd = process.cwd();
          assert_1.default(cwd.match(/^[A-Z]:\\/i), `Expected current directory to start with an absolute drive root. Actual '${cwd}'`);
          return `${cwd[0]}:\\${itemPath.substr(1)}`;
        }
      }
      assert_1.default(hasAbsoluteRoot(root), `ensureAbsoluteRoot parameter 'root' must have an absolute root`);
      if (root.endsWith("/") || IS_WINDOWS && root.endsWith("\\")) {
      } else {
        root += path3.sep;
      }
      return root + itemPath;
    }
    exports.ensureAbsoluteRoot = ensureAbsoluteRoot;
    function hasAbsoluteRoot(itemPath) {
      assert_1.default(itemPath, `hasAbsoluteRoot parameter 'itemPath' must not be empty`);
      itemPath = normalizeSeparators(itemPath);
      if (IS_WINDOWS) {
        return itemPath.startsWith("\\\\") || /^[A-Z]:\\/i.test(itemPath);
      }
      return itemPath.startsWith("/");
    }
    exports.hasAbsoluteRoot = hasAbsoluteRoot;
    function hasRoot(itemPath) {
      assert_1.default(itemPath, `isRooted parameter 'itemPath' must not be empty`);
      itemPath = normalizeSeparators(itemPath);
      if (IS_WINDOWS) {
        return itemPath.startsWith("\\") || /^[A-Z]:/i.test(itemPath);
      }
      return itemPath.startsWith("/");
    }
    exports.hasRoot = hasRoot;
    function normalizeSeparators(p) {
      p = p || "";
      if (IS_WINDOWS) {
        p = p.replace(/\//g, "\\");
        const isUnc = /^\\\\+[^\\]/.test(p);
        return (isUnc ? "\\" : "") + p.replace(/\\\\+/g, "\\");
      }
      return p.replace(/\/\/+/g, "/");
    }
    exports.normalizeSeparators = normalizeSeparators;
    function safeTrimTrailingSeparator(p) {
      if (!p) {
        return "";
      }
      p = normalizeSeparators(p);
      if (!p.endsWith(path3.sep)) {
        return p;
      }
      if (p === path3.sep) {
        return p;
      }
      if (IS_WINDOWS && /^[A-Z]:\\$/i.test(p)) {
        return p;
      }
      return p.substr(0, p.length - 1);
    }
    exports.safeTrimTrailingSeparator = safeTrimTrailingSeparator;
  }
});

// node_modules/@actions/glob/lib/internal-match-kind.js
var require_internal_match_kind = __commonJS({
  "node_modules/@actions/glob/lib/internal-match-kind.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MatchKind = void 0;
    var MatchKind;
    (function(MatchKind2) {
      MatchKind2[MatchKind2["None"] = 0] = "None";
      MatchKind2[MatchKind2["Directory"] = 1] = "Directory";
      MatchKind2[MatchKind2["File"] = 2] = "File";
      MatchKind2[MatchKind2["All"] = 3] = "All";
    })(MatchKind = exports.MatchKind || (exports.MatchKind = {}));
  }
});

// node_modules/@actions/glob/lib/internal-pattern-helper.js
var require_internal_pattern_helper = __commonJS({
  "node_modules/@actions/glob/lib/internal-pattern-helper.js"(exports) {
    "use strict";
    var __createBinding2 = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar2 = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.hasOwnProperty.call(mod, k))
            __createBinding2(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.partialMatch = exports.match = exports.getSearchPaths = void 0;
    var pathHelper = __importStar2(require_internal_path_helper());
    var internal_match_kind_1 = require_internal_match_kind();
    var IS_WINDOWS = process.platform === "win32";
    function getSearchPaths(patterns) {
      patterns = patterns.filter((x) => !x.negate);
      const searchPathMap = {};
      for (const pattern of patterns) {
        const key = IS_WINDOWS ? pattern.searchPath.toUpperCase() : pattern.searchPath;
        searchPathMap[key] = "candidate";
      }
      const result = [];
      for (const pattern of patterns) {
        const key = IS_WINDOWS ? pattern.searchPath.toUpperCase() : pattern.searchPath;
        if (searchPathMap[key] === "included") {
          continue;
        }
        let foundAncestor = false;
        let tempKey = key;
        let parent = pathHelper.dirname(tempKey);
        while (parent !== tempKey) {
          if (searchPathMap[parent]) {
            foundAncestor = true;
            break;
          }
          tempKey = parent;
          parent = pathHelper.dirname(tempKey);
        }
        if (!foundAncestor) {
          result.push(pattern.searchPath);
          searchPathMap[key] = "included";
        }
      }
      return result;
    }
    exports.getSearchPaths = getSearchPaths;
    function match(patterns, itemPath) {
      let result = internal_match_kind_1.MatchKind.None;
      for (const pattern of patterns) {
        if (pattern.negate) {
          result &= ~pattern.match(itemPath);
        } else {
          result |= pattern.match(itemPath);
        }
      }
      return result;
    }
    exports.match = match;
    function partialMatch(patterns, itemPath) {
      return patterns.some((x) => !x.negate && x.partialMatch(itemPath));
    }
    exports.partialMatch = partialMatch;
  }
});

// node_modules/concat-map/index.js
var require_concat_map = __commonJS({
  "node_modules/concat-map/index.js"(exports, module5) {
    module5.exports = function(xs, fn) {
      var res = [];
      for (var i = 0; i < xs.length; i++) {
        var x = fn(xs[i], i);
        if (isArray(x))
          res.push.apply(res, x);
        else
          res.push(x);
      }
      return res;
    };
    var isArray = Array.isArray || function(xs) {
      return Object.prototype.toString.call(xs) === "[object Array]";
    };
  }
});

// node_modules/balanced-match/index.js
var require_balanced_match = __commonJS({
  "node_modules/balanced-match/index.js"(exports, module5) {
    "use strict";
    module5.exports = balanced;
    function balanced(a, b, str) {
      if (a instanceof RegExp)
        a = maybeMatch(a, str);
      if (b instanceof RegExp)
        b = maybeMatch(b, str);
      var r = range(a, b, str);
      return r && {
        start: r[0],
        end: r[1],
        pre: str.slice(0, r[0]),
        body: str.slice(r[0] + a.length, r[1]),
        post: str.slice(r[1] + b.length)
      };
    }
    function maybeMatch(reg, str) {
      var m = str.match(reg);
      return m ? m[0] : null;
    }
    balanced.range = range;
    function range(a, b, str) {
      var begs, beg, left, right, result;
      var ai = str.indexOf(a);
      var bi = str.indexOf(b, ai + 1);
      var i = ai;
      if (ai >= 0 && bi > 0) {
        if (a === b) {
          return [ai, bi];
        }
        begs = [];
        left = str.length;
        while (i >= 0 && !result) {
          if (i == ai) {
            begs.push(i);
            ai = str.indexOf(a, i + 1);
          } else if (begs.length == 1) {
            result = [begs.pop(), bi];
          } else {
            beg = begs.pop();
            if (beg < left) {
              left = beg;
              right = bi;
            }
            bi = str.indexOf(b, i + 1);
          }
          i = ai < bi && ai >= 0 ? ai : bi;
        }
        if (begs.length) {
          result = [left, right];
        }
      }
      return result;
    }
  }
});

// node_modules/brace-expansion/index.js
var require_brace_expansion = __commonJS({
  "node_modules/brace-expansion/index.js"(exports, module5) {
    var concatMap = require_concat_map();
    var balanced = require_balanced_match();
    module5.exports = expandTop;
    var escSlash = "\0SLASH" + Math.random() + "\0";
    var escOpen = "\0OPEN" + Math.random() + "\0";
    var escClose = "\0CLOSE" + Math.random() + "\0";
    var escComma = "\0COMMA" + Math.random() + "\0";
    var escPeriod = "\0PERIOD" + Math.random() + "\0";
    function numeric(str) {
      return parseInt(str, 10) == str ? parseInt(str, 10) : str.charCodeAt(0);
    }
    function escapeBraces(str) {
      return str.split("\\\\").join(escSlash).split("\\{").join(escOpen).split("\\}").join(escClose).split("\\,").join(escComma).split("\\.").join(escPeriod);
    }
    function unescapeBraces(str) {
      return str.split(escSlash).join("\\").split(escOpen).join("{").split(escClose).join("}").split(escComma).join(",").split(escPeriod).join(".");
    }
    function parseCommaParts(str) {
      if (!str)
        return [""];
      var parts = [];
      var m = balanced("{", "}", str);
      if (!m)
        return str.split(",");
      var pre = m.pre;
      var body = m.body;
      var post = m.post;
      var p = pre.split(",");
      p[p.length - 1] += "{" + body + "}";
      var postParts = parseCommaParts(post);
      if (post.length) {
        p[p.length - 1] += postParts.shift();
        p.push.apply(p, postParts);
      }
      parts.push.apply(parts, p);
      return parts;
    }
    function expandTop(str) {
      if (!str)
        return [];
      if (str.substr(0, 2) === "{}") {
        str = "\\{\\}" + str.substr(2);
      }
      return expand(escapeBraces(str), true).map(unescapeBraces);
    }
    function embrace(str) {
      return "{" + str + "}";
    }
    function isPadded(el) {
      return /^-?0\d/.test(el);
    }
    function lte(i, y) {
      return i <= y;
    }
    function gte(i, y) {
      return i >= y;
    }
    function expand(str, isTop) {
      var expansions = [];
      var m = balanced("{", "}", str);
      if (!m || /\$$/.test(m.pre))
        return [str];
      var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
      var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
      var isSequence = isNumericSequence || isAlphaSequence;
      var isOptions = m.body.indexOf(",") >= 0;
      if (!isSequence && !isOptions) {
        if (m.post.match(/,.*\}/)) {
          str = m.pre + "{" + m.body + escClose + m.post;
          return expand(str);
        }
        return [str];
      }
      var n;
      if (isSequence) {
        n = m.body.split(/\.\./);
      } else {
        n = parseCommaParts(m.body);
        if (n.length === 1) {
          n = expand(n[0], false).map(embrace);
          if (n.length === 1) {
            var post = m.post.length ? expand(m.post, false) : [""];
            return post.map(function(p) {
              return m.pre + n[0] + p;
            });
          }
        }
      }
      var pre = m.pre;
      var post = m.post.length ? expand(m.post, false) : [""];
      var N;
      if (isSequence) {
        var x = numeric(n[0]);
        var y = numeric(n[1]);
        var width = Math.max(n[0].length, n[1].length);
        var incr = n.length == 3 ? Math.abs(numeric(n[2])) : 1;
        var test = lte;
        var reverse = y < x;
        if (reverse) {
          incr *= -1;
          test = gte;
        }
        var pad = n.some(isPadded);
        N = [];
        for (var i = x; test(i, y); i += incr) {
          var c;
          if (isAlphaSequence) {
            c = String.fromCharCode(i);
            if (c === "\\")
              c = "";
          } else {
            c = String(i);
            if (pad) {
              var need = width - c.length;
              if (need > 0) {
                var z = new Array(need + 1).join("0");
                if (i < 0)
                  c = "-" + z + c.slice(1);
                else
                  c = z + c;
              }
            }
          }
          N.push(c);
        }
      } else {
        N = concatMap(n, function(el) {
          return expand(el, false);
        });
      }
      for (var j = 0; j < N.length; j++) {
        for (var k = 0; k < post.length; k++) {
          var expansion = pre + N[j] + post[k];
          if (!isTop || isSequence || expansion)
            expansions.push(expansion);
        }
      }
      return expansions;
    }
  }
});

// node_modules/minimatch/minimatch.js
var require_minimatch = __commonJS({
  "node_modules/minimatch/minimatch.js"(exports, module5) {
    module5.exports = minimatch;
    minimatch.Minimatch = Minimatch;
    var path3 = { sep: "/" };
    try {
      path3 = require("path");
    } catch (er) {
    }
    var GLOBSTAR = minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {};
    var expand = require_brace_expansion();
    var plTypes = {
      "!": { open: "(?:(?!(?:", close: "))[^/]*?)" },
      "?": { open: "(?:", close: ")?" },
      "+": { open: "(?:", close: ")+" },
      "*": { open: "(?:", close: ")*" },
      "@": { open: "(?:", close: ")" }
    };
    var qmark = "[^/]";
    var star = qmark + "*?";
    var twoStarDot = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?";
    var twoStarNoDot = "(?:(?!(?:\\/|^)\\.).)*?";
    var reSpecials = charSet("().*{}+?[]^$\\!");
    function charSet(s) {
      return s.split("").reduce(function(set, c) {
        set[c] = true;
        return set;
      }, {});
    }
    var slashSplit = /\/+/;
    minimatch.filter = filter;
    function filter(pattern, options) {
      options = options || {};
      return function(p, i, list) {
        return minimatch(p, pattern, options);
      };
    }
    function ext(a, b) {
      a = a || {};
      b = b || {};
      var t = {};
      Object.keys(b).forEach(function(k) {
        t[k] = b[k];
      });
      Object.keys(a).forEach(function(k) {
        t[k] = a[k];
      });
      return t;
    }
    minimatch.defaults = function(def) {
      if (!def || !Object.keys(def).length)
        return minimatch;
      var orig = minimatch;
      var m = function minimatch2(p, pattern, options) {
        return orig.minimatch(p, pattern, ext(def, options));
      };
      m.Minimatch = function Minimatch2(pattern, options) {
        return new orig.Minimatch(pattern, ext(def, options));
      };
      return m;
    };
    Minimatch.defaults = function(def) {
      if (!def || !Object.keys(def).length)
        return Minimatch;
      return minimatch.defaults(def).Minimatch;
    };
    function minimatch(p, pattern, options) {
      if (typeof pattern !== "string") {
        throw new TypeError("glob pattern string required");
      }
      if (!options)
        options = {};
      if (!options.nocomment && pattern.charAt(0) === "#") {
        return false;
      }
      if (pattern.trim() === "")
        return p === "";
      return new Minimatch(pattern, options).match(p);
    }
    function Minimatch(pattern, options) {
      if (!(this instanceof Minimatch)) {
        return new Minimatch(pattern, options);
      }
      if (typeof pattern !== "string") {
        throw new TypeError("glob pattern string required");
      }
      if (!options)
        options = {};
      pattern = pattern.trim();
      if (path3.sep !== "/") {
        pattern = pattern.split(path3.sep).join("/");
      }
      this.options = options;
      this.set = [];
      this.pattern = pattern;
      this.regexp = null;
      this.negate = false;
      this.comment = false;
      this.empty = false;
      this.make();
    }
    Minimatch.prototype.debug = function() {
    };
    Minimatch.prototype.make = make;
    function make() {
      if (this._made)
        return;
      var pattern = this.pattern;
      var options = this.options;
      if (!options.nocomment && pattern.charAt(0) === "#") {
        this.comment = true;
        return;
      }
      if (!pattern) {
        this.empty = true;
        return;
      }
      this.parseNegate();
      var set = this.globSet = this.braceExpand();
      if (options.debug)
        this.debug = console.error;
      this.debug(this.pattern, set);
      set = this.globParts = set.map(function(s) {
        return s.split(slashSplit);
      });
      this.debug(this.pattern, set);
      set = set.map(function(s, si, set2) {
        return s.map(this.parse, this);
      }, this);
      this.debug(this.pattern, set);
      set = set.filter(function(s) {
        return s.indexOf(false) === -1;
      });
      this.debug(this.pattern, set);
      this.set = set;
    }
    Minimatch.prototype.parseNegate = parseNegate;
    function parseNegate() {
      var pattern = this.pattern;
      var negate2 = false;
      var options = this.options;
      var negateOffset = 0;
      if (options.nonegate)
        return;
      for (var i = 0, l = pattern.length; i < l && pattern.charAt(i) === "!"; i++) {
        negate2 = !negate2;
        negateOffset++;
      }
      if (negateOffset)
        this.pattern = pattern.substr(negateOffset);
      this.negate = negate2;
    }
    minimatch.braceExpand = function(pattern, options) {
      return braceExpand(pattern, options);
    };
    Minimatch.prototype.braceExpand = braceExpand;
    function braceExpand(pattern, options) {
      if (!options) {
        if (this instanceof Minimatch) {
          options = this.options;
        } else {
          options = {};
        }
      }
      pattern = typeof pattern === "undefined" ? this.pattern : pattern;
      if (typeof pattern === "undefined") {
        throw new TypeError("undefined pattern");
      }
      if (options.nobrace || !pattern.match(/\{.*\}/)) {
        return [pattern];
      }
      return expand(pattern);
    }
    Minimatch.prototype.parse = parse4;
    var SUBPARSE = {};
    function parse4(pattern, isSub) {
      if (pattern.length > 1024 * 64) {
        throw new TypeError("pattern is too long");
      }
      var options = this.options;
      if (!options.noglobstar && pattern === "**")
        return GLOBSTAR;
      if (pattern === "")
        return "";
      var re = "";
      var hasMagic = !!options.nocase;
      var escaping = false;
      var patternListStack = [];
      var negativeLists = [];
      var stateChar;
      var inClass = false;
      var reClassStart = -1;
      var classStart = -1;
      var patternStart = pattern.charAt(0) === "." ? "" : options.dot ? "(?!(?:^|\\/)\\.{1,2}(?:$|\\/))" : "(?!\\.)";
      var self2 = this;
      function clearStateChar() {
        if (stateChar) {
          switch (stateChar) {
            case "*":
              re += star;
              hasMagic = true;
              break;
            case "?":
              re += qmark;
              hasMagic = true;
              break;
            default:
              re += "\\" + stateChar;
              break;
          }
          self2.debug("clearStateChar %j %j", stateChar, re);
          stateChar = false;
        }
      }
      for (var i = 0, len = pattern.length, c; i < len && (c = pattern.charAt(i)); i++) {
        this.debug("%s	%s %s %j", pattern, i, re, c);
        if (escaping && reSpecials[c]) {
          re += "\\" + c;
          escaping = false;
          continue;
        }
        switch (c) {
          case "/":
            return false;
          case "\\":
            clearStateChar();
            escaping = true;
            continue;
          case "?":
          case "*":
          case "+":
          case "@":
          case "!":
            this.debug("%s	%s %s %j <-- stateChar", pattern, i, re, c);
            if (inClass) {
              this.debug("  in class");
              if (c === "!" && i === classStart + 1)
                c = "^";
              re += c;
              continue;
            }
            self2.debug("call clearStateChar %j", stateChar);
            clearStateChar();
            stateChar = c;
            if (options.noext)
              clearStateChar();
            continue;
          case "(":
            if (inClass) {
              re += "(";
              continue;
            }
            if (!stateChar) {
              re += "\\(";
              continue;
            }
            patternListStack.push({
              type: stateChar,
              start: i - 1,
              reStart: re.length,
              open: plTypes[stateChar].open,
              close: plTypes[stateChar].close
            });
            re += stateChar === "!" ? "(?:(?!(?:" : "(?:";
            this.debug("plType %j %j", stateChar, re);
            stateChar = false;
            continue;
          case ")":
            if (inClass || !patternListStack.length) {
              re += "\\)";
              continue;
            }
            clearStateChar();
            hasMagic = true;
            var pl = patternListStack.pop();
            re += pl.close;
            if (pl.type === "!") {
              negativeLists.push(pl);
            }
            pl.reEnd = re.length;
            continue;
          case "|":
            if (inClass || !patternListStack.length || escaping) {
              re += "\\|";
              escaping = false;
              continue;
            }
            clearStateChar();
            re += "|";
            continue;
          case "[":
            clearStateChar();
            if (inClass) {
              re += "\\" + c;
              continue;
            }
            inClass = true;
            classStart = i;
            reClassStart = re.length;
            re += c;
            continue;
          case "]":
            if (i === classStart + 1 || !inClass) {
              re += "\\" + c;
              escaping = false;
              continue;
            }
            if (inClass) {
              var cs = pattern.substring(classStart + 1, i);
              try {
                RegExp("[" + cs + "]");
              } catch (er) {
                var sp = this.parse(cs, SUBPARSE);
                re = re.substr(0, reClassStart) + "\\[" + sp[0] + "\\]";
                hasMagic = hasMagic || sp[1];
                inClass = false;
                continue;
              }
            }
            hasMagic = true;
            inClass = false;
            re += c;
            continue;
          default:
            clearStateChar();
            if (escaping) {
              escaping = false;
            } else if (reSpecials[c] && !(c === "^" && inClass)) {
              re += "\\";
            }
            re += c;
        }
      }
      if (inClass) {
        cs = pattern.substr(classStart + 1);
        sp = this.parse(cs, SUBPARSE);
        re = re.substr(0, reClassStart) + "\\[" + sp[0];
        hasMagic = hasMagic || sp[1];
      }
      for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
        var tail = re.slice(pl.reStart + pl.open.length);
        this.debug("setting tail", re, pl);
        tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, function(_, $1, $2) {
          if (!$2) {
            $2 = "\\";
          }
          return $1 + $1 + $2 + "|";
        });
        this.debug("tail=%j\n   %s", tail, tail, pl, re);
        var t = pl.type === "*" ? star : pl.type === "?" ? qmark : "\\" + pl.type;
        hasMagic = true;
        re = re.slice(0, pl.reStart) + t + "\\(" + tail;
      }
      clearStateChar();
      if (escaping) {
        re += "\\\\";
      }
      var addPatternStart = false;
      switch (re.charAt(0)) {
        case ".":
        case "[":
        case "(":
          addPatternStart = true;
      }
      for (var n = negativeLists.length - 1; n > -1; n--) {
        var nl = negativeLists[n];
        var nlBefore = re.slice(0, nl.reStart);
        var nlFirst = re.slice(nl.reStart, nl.reEnd - 8);
        var nlLast = re.slice(nl.reEnd - 8, nl.reEnd);
        var nlAfter = re.slice(nl.reEnd);
        nlLast += nlAfter;
        var openParensBefore = nlBefore.split("(").length - 1;
        var cleanAfter = nlAfter;
        for (i = 0; i < openParensBefore; i++) {
          cleanAfter = cleanAfter.replace(/\)[+*?]?/, "");
        }
        nlAfter = cleanAfter;
        var dollar = "";
        if (nlAfter === "" && isSub !== SUBPARSE) {
          dollar = "$";
        }
        var newRe = nlBefore + nlFirst + nlAfter + dollar + nlLast;
        re = newRe;
      }
      if (re !== "" && hasMagic) {
        re = "(?=.)" + re;
      }
      if (addPatternStart) {
        re = patternStart + re;
      }
      if (isSub === SUBPARSE) {
        return [re, hasMagic];
      }
      if (!hasMagic) {
        return globUnescape(pattern);
      }
      var flags = options.nocase ? "i" : "";
      try {
        var regExp = new RegExp("^" + re + "$", flags);
      } catch (er) {
        return new RegExp("$.");
      }
      regExp._glob = pattern;
      regExp._src = re;
      return regExp;
    }
    minimatch.makeRe = function(pattern, options) {
      return new Minimatch(pattern, options || {}).makeRe();
    };
    Minimatch.prototype.makeRe = makeRe;
    function makeRe() {
      if (this.regexp || this.regexp === false)
        return this.regexp;
      var set = this.set;
      if (!set.length) {
        this.regexp = false;
        return this.regexp;
      }
      var options = this.options;
      var twoStar = options.noglobstar ? star : options.dot ? twoStarDot : twoStarNoDot;
      var flags = options.nocase ? "i" : "";
      var re = set.map(function(pattern) {
        return pattern.map(function(p) {
          return p === GLOBSTAR ? twoStar : typeof p === "string" ? regExpEscape(p) : p._src;
        }).join("\\/");
      }).join("|");
      re = "^(?:" + re + ")$";
      if (this.negate)
        re = "^(?!" + re + ").*$";
      try {
        this.regexp = new RegExp(re, flags);
      } catch (ex) {
        this.regexp = false;
      }
      return this.regexp;
    }
    minimatch.match = function(list, pattern, options) {
      options = options || {};
      var mm = new Minimatch(pattern, options);
      list = list.filter(function(f) {
        return mm.match(f);
      });
      if (mm.options.nonull && !list.length) {
        list.push(pattern);
      }
      return list;
    };
    Minimatch.prototype.match = match;
    function match(f, partial) {
      this.debug("match", f, this.pattern);
      if (this.comment)
        return false;
      if (this.empty)
        return f === "";
      if (f === "/" && partial)
        return true;
      var options = this.options;
      if (path3.sep !== "/") {
        f = f.split(path3.sep).join("/");
      }
      f = f.split(slashSplit);
      this.debug(this.pattern, "split", f);
      var set = this.set;
      this.debug(this.pattern, "set", set);
      var filename;
      var i;
      for (i = f.length - 1; i >= 0; i--) {
        filename = f[i];
        if (filename)
          break;
      }
      for (i = 0; i < set.length; i++) {
        var pattern = set[i];
        var file = f;
        if (options.matchBase && pattern.length === 1) {
          file = [filename];
        }
        var hit = this.matchOne(file, pattern, partial);
        if (hit) {
          if (options.flipNegate)
            return true;
          return !this.negate;
        }
      }
      if (options.flipNegate)
        return false;
      return this.negate;
    }
    Minimatch.prototype.matchOne = function(file, pattern, partial) {
      var options = this.options;
      this.debug("matchOne", { "this": this, file, pattern });
      this.debug("matchOne", file.length, pattern.length);
      for (var fi = 0, pi = 0, fl = file.length, pl = pattern.length; fi < fl && pi < pl; fi++, pi++) {
        this.debug("matchOne loop");
        var p = pattern[pi];
        var f = file[fi];
        this.debug(pattern, p, f);
        if (p === false)
          return false;
        if (p === GLOBSTAR) {
          this.debug("GLOBSTAR", [pattern, p, f]);
          var fr = fi;
          var pr = pi + 1;
          if (pr === pl) {
            this.debug("** at the end");
            for (; fi < fl; fi++) {
              if (file[fi] === "." || file[fi] === ".." || !options.dot && file[fi].charAt(0) === ".")
                return false;
            }
            return true;
          }
          while (fr < fl) {
            var swallowee = file[fr];
            this.debug("\nglobstar while", file, fr, pattern, pr, swallowee);
            if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
              this.debug("globstar found match!", fr, fl, swallowee);
              return true;
            } else {
              if (swallowee === "." || swallowee === ".." || !options.dot && swallowee.charAt(0) === ".") {
                this.debug("dot detected!", file, fr, pattern, pr);
                break;
              }
              this.debug("globstar swallow a segment, and continue");
              fr++;
            }
          }
          if (partial) {
            this.debug("\n>>> no match, partial?", file, fr, pattern, pr);
            if (fr === fl)
              return true;
          }
          return false;
        }
        var hit;
        if (typeof p === "string") {
          if (options.nocase) {
            hit = f.toLowerCase() === p.toLowerCase();
          } else {
            hit = f === p;
          }
          this.debug("string match", p, f, hit);
        } else {
          hit = f.match(p);
          this.debug("pattern match", p, f, hit);
        }
        if (!hit)
          return false;
      }
      if (fi === fl && pi === pl) {
        return true;
      } else if (fi === fl) {
        return partial;
      } else if (pi === pl) {
        var emptyFileEnd = fi === fl - 1 && file[fi] === "";
        return emptyFileEnd;
      }
      throw new Error("wtf?");
    };
    function globUnescape(s) {
      return s.replace(/\\(.)/g, "$1");
    }
    function regExpEscape(s) {
      return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    }
  }
});

// node_modules/@actions/glob/lib/internal-path.js
var require_internal_path = __commonJS({
  "node_modules/@actions/glob/lib/internal-path.js"(exports) {
    "use strict";
    var __createBinding2 = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar2 = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.hasOwnProperty.call(mod, k))
            __createBinding2(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __importDefault2 = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Path = void 0;
    var path3 = __importStar2(require("path"));
    var pathHelper = __importStar2(require_internal_path_helper());
    var assert_1 = __importDefault2(require("assert"));
    var IS_WINDOWS = process.platform === "win32";
    var Path = class {
      constructor(itemPath) {
        this.segments = [];
        if (typeof itemPath === "string") {
          assert_1.default(itemPath, `Parameter 'itemPath' must not be empty`);
          itemPath = pathHelper.safeTrimTrailingSeparator(itemPath);
          if (!pathHelper.hasRoot(itemPath)) {
            this.segments = itemPath.split(path3.sep);
          } else {
            let remaining = itemPath;
            let dir = pathHelper.dirname(remaining);
            while (dir !== remaining) {
              const basename = path3.basename(remaining);
              this.segments.unshift(basename);
              remaining = dir;
              dir = pathHelper.dirname(remaining);
            }
            this.segments.unshift(remaining);
          }
        } else {
          assert_1.default(itemPath.length > 0, `Parameter 'itemPath' must not be an empty array`);
          for (let i = 0; i < itemPath.length; i++) {
            let segment = itemPath[i];
            assert_1.default(segment, `Parameter 'itemPath' must not contain any empty segments`);
            segment = pathHelper.normalizeSeparators(itemPath[i]);
            if (i === 0 && pathHelper.hasRoot(segment)) {
              segment = pathHelper.safeTrimTrailingSeparator(segment);
              assert_1.default(segment === pathHelper.dirname(segment), `Parameter 'itemPath' root segment contains information for multiple segments`);
              this.segments.push(segment);
            } else {
              assert_1.default(!segment.includes(path3.sep), `Parameter 'itemPath' contains unexpected path separators`);
              this.segments.push(segment);
            }
          }
        }
      }
      toString() {
        let result = this.segments[0];
        let skipSlash = result.endsWith(path3.sep) || IS_WINDOWS && /^[A-Z]:$/i.test(result);
        for (let i = 1; i < this.segments.length; i++) {
          if (skipSlash) {
            skipSlash = false;
          } else {
            result += path3.sep;
          }
          result += this.segments[i];
        }
        return result;
      }
    };
    exports.Path = Path;
  }
});

// node_modules/@actions/glob/lib/internal-pattern.js
var require_internal_pattern = __commonJS({
  "node_modules/@actions/glob/lib/internal-pattern.js"(exports) {
    "use strict";
    var __createBinding2 = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar2 = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.hasOwnProperty.call(mod, k))
            __createBinding2(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __importDefault2 = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Pattern = void 0;
    var os = __importStar2(require("os"));
    var path3 = __importStar2(require("path"));
    var pathHelper = __importStar2(require_internal_path_helper());
    var assert_1 = __importDefault2(require("assert"));
    var minimatch_1 = require_minimatch();
    var internal_match_kind_1 = require_internal_match_kind();
    var internal_path_1 = require_internal_path();
    var IS_WINDOWS = process.platform === "win32";
    var Pattern = class {
      constructor(patternOrNegate, isImplicitPattern = false, segments, homedir2) {
        this.negate = false;
        let pattern;
        if (typeof patternOrNegate === "string") {
          pattern = patternOrNegate.trim();
        } else {
          segments = segments || [];
          assert_1.default(segments.length, `Parameter 'segments' must not empty`);
          const root = Pattern.getLiteral(segments[0]);
          assert_1.default(root && pathHelper.hasAbsoluteRoot(root), `Parameter 'segments' first element must be a root path`);
          pattern = new internal_path_1.Path(segments).toString().trim();
          if (patternOrNegate) {
            pattern = `!${pattern}`;
          }
        }
        while (pattern.startsWith("!")) {
          this.negate = !this.negate;
          pattern = pattern.substr(1).trim();
        }
        pattern = Pattern.fixupPattern(pattern, homedir2);
        this.segments = new internal_path_1.Path(pattern).segments;
        this.trailingSeparator = pathHelper.normalizeSeparators(pattern).endsWith(path3.sep);
        pattern = pathHelper.safeTrimTrailingSeparator(pattern);
        let foundGlob = false;
        const searchSegments = this.segments.map((x) => Pattern.getLiteral(x)).filter((x) => !foundGlob && !(foundGlob = x === ""));
        this.searchPath = new internal_path_1.Path(searchSegments).toString();
        this.rootRegExp = new RegExp(Pattern.regExpEscape(searchSegments[0]), IS_WINDOWS ? "i" : "");
        this.isImplicitPattern = isImplicitPattern;
        const minimatchOptions = {
          dot: true,
          nobrace: true,
          nocase: IS_WINDOWS,
          nocomment: true,
          noext: true,
          nonegate: true
        };
        pattern = IS_WINDOWS ? pattern.replace(/\\/g, "/") : pattern;
        this.minimatch = new minimatch_1.Minimatch(pattern, minimatchOptions);
      }
      match(itemPath) {
        if (this.segments[this.segments.length - 1] === "**") {
          itemPath = pathHelper.normalizeSeparators(itemPath);
          if (!itemPath.endsWith(path3.sep) && this.isImplicitPattern === false) {
            itemPath = `${itemPath}${path3.sep}`;
          }
        } else {
          itemPath = pathHelper.safeTrimTrailingSeparator(itemPath);
        }
        if (this.minimatch.match(itemPath)) {
          return this.trailingSeparator ? internal_match_kind_1.MatchKind.Directory : internal_match_kind_1.MatchKind.All;
        }
        return internal_match_kind_1.MatchKind.None;
      }
      partialMatch(itemPath) {
        itemPath = pathHelper.safeTrimTrailingSeparator(itemPath);
        if (pathHelper.dirname(itemPath) === itemPath) {
          return this.rootRegExp.test(itemPath);
        }
        return this.minimatch.matchOne(itemPath.split(IS_WINDOWS ? /\\+/ : /\/+/), this.minimatch.set[0], true);
      }
      static globEscape(s) {
        return (IS_WINDOWS ? s : s.replace(/\\/g, "\\\\")).replace(/(\[)(?=[^/]+\])/g, "[[]").replace(/\?/g, "[?]").replace(/\*/g, "[*]");
      }
      static fixupPattern(pattern, homedir2) {
        assert_1.default(pattern, "pattern cannot be empty");
        const literalSegments = new internal_path_1.Path(pattern).segments.map((x) => Pattern.getLiteral(x));
        assert_1.default(literalSegments.every((x, i) => (x !== "." || i === 0) && x !== ".."), `Invalid pattern '${pattern}'. Relative pathing '.' and '..' is not allowed.`);
        assert_1.default(!pathHelper.hasRoot(pattern) || literalSegments[0], `Invalid pattern '${pattern}'. Root segment must not contain globs.`);
        pattern = pathHelper.normalizeSeparators(pattern);
        if (pattern === "." || pattern.startsWith(`.${path3.sep}`)) {
          pattern = Pattern.globEscape(process.cwd()) + pattern.substr(1);
        } else if (pattern === "~" || pattern.startsWith(`~${path3.sep}`)) {
          homedir2 = homedir2 || os.homedir();
          assert_1.default(homedir2, "Unable to determine HOME directory");
          assert_1.default(pathHelper.hasAbsoluteRoot(homedir2), `Expected HOME directory to be a rooted path. Actual '${homedir2}'`);
          pattern = Pattern.globEscape(homedir2) + pattern.substr(1);
        } else if (IS_WINDOWS && (pattern.match(/^[A-Z]:$/i) || pattern.match(/^[A-Z]:[^\\]/i))) {
          let root = pathHelper.ensureAbsoluteRoot("C:\\dummy-root", pattern.substr(0, 2));
          if (pattern.length > 2 && !root.endsWith("\\")) {
            root += "\\";
          }
          pattern = Pattern.globEscape(root) + pattern.substr(2);
        } else if (IS_WINDOWS && (pattern === "\\" || pattern.match(/^\\[^\\]/))) {
          let root = pathHelper.ensureAbsoluteRoot("C:\\dummy-root", "\\");
          if (!root.endsWith("\\")) {
            root += "\\";
          }
          pattern = Pattern.globEscape(root) + pattern.substr(1);
        } else {
          pattern = pathHelper.ensureAbsoluteRoot(Pattern.globEscape(process.cwd()), pattern);
        }
        return pathHelper.normalizeSeparators(pattern);
      }
      static getLiteral(segment) {
        let literal = "";
        for (let i = 0; i < segment.length; i++) {
          const c = segment[i];
          if (c === "\\" && !IS_WINDOWS && i + 1 < segment.length) {
            literal += segment[++i];
            continue;
          } else if (c === "*" || c === "?") {
            return "";
          } else if (c === "[" && i + 1 < segment.length) {
            let set = "";
            let closed = -1;
            for (let i2 = i + 1; i2 < segment.length; i2++) {
              const c2 = segment[i2];
              if (c2 === "\\" && !IS_WINDOWS && i2 + 1 < segment.length) {
                set += segment[++i2];
                continue;
              } else if (c2 === "]") {
                closed = i2;
                break;
              } else {
                set += c2;
              }
            }
            if (closed >= 0) {
              if (set.length > 1) {
                return "";
              }
              if (set) {
                literal += set;
                i = closed;
                continue;
              }
            }
          }
          literal += c;
        }
        return literal;
      }
      static regExpEscape(s) {
        return s.replace(/[[\\^$.|?*+()]/g, "\\$&");
      }
    };
    exports.Pattern = Pattern;
  }
});

// node_modules/@actions/glob/lib/internal-search-state.js
var require_internal_search_state = __commonJS({
  "node_modules/@actions/glob/lib/internal-search-state.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SearchState = void 0;
    var SearchState = class {
      constructor(path3, level) {
        this.path = path3;
        this.level = level;
      }
    };
    exports.SearchState = SearchState;
  }
});

// node_modules/@actions/glob/lib/internal-globber.js
var require_internal_globber = __commonJS({
  "node_modules/@actions/glob/lib/internal-globber.js"(exports) {
    "use strict";
    var __createBinding2 = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar2 = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.hasOwnProperty.call(mod, k))
            __createBinding2(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __awaiter2 = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __asyncValues2 = exports && exports.__asyncValues || function(o) {
      if (!Symbol.asyncIterator)
        throw new TypeError("Symbol.asyncIterator is not defined.");
      var m = o[Symbol.asyncIterator], i;
      return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
      }, i);
      function verb(n) {
        i[n] = o[n] && function(v) {
          return new Promise(function(resolve, reject) {
            v = o[n](v), settle(resolve, reject, v.done, v.value);
          });
        };
      }
      function settle(resolve, reject, d, v) {
        Promise.resolve(v).then(function(v2) {
          resolve({ value: v2, done: d });
        }, reject);
      }
    };
    var __await2 = exports && exports.__await || function(v) {
      return this instanceof __await2 ? (this.v = v, this) : new __await2(v);
    };
    var __asyncGenerator2 = exports && exports.__asyncGenerator || function(thisArg, _arguments, generator) {
      if (!Symbol.asyncIterator)
        throw new TypeError("Symbol.asyncIterator is not defined.");
      var g = generator.apply(thisArg, _arguments || []), i, q = [];
      return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
      }, i;
      function verb(n) {
        if (g[n])
          i[n] = function(v) {
            return new Promise(function(a, b) {
              q.push([n, v, a, b]) > 1 || resume(n, v);
            });
          };
      }
      function resume(n, v) {
        try {
          step(g[n](v));
        } catch (e) {
          settle(q[0][3], e);
        }
      }
      function step(r) {
        r.value instanceof __await2 ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
      }
      function fulfill(value) {
        resume("next", value);
      }
      function reject(value) {
        resume("throw", value);
      }
      function settle(f, v) {
        if (f(v), q.shift(), q.length)
          resume(q[0][0], q[0][1]);
      }
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DefaultGlobber = void 0;
    var core2 = __importStar2(require_core());
    var fs2 = __importStar2(require("fs"));
    var globOptionsHelper = __importStar2(require_internal_glob_options_helper());
    var path3 = __importStar2(require("path"));
    var patternHelper = __importStar2(require_internal_pattern_helper());
    var internal_match_kind_1 = require_internal_match_kind();
    var internal_pattern_1 = require_internal_pattern();
    var internal_search_state_1 = require_internal_search_state();
    var IS_WINDOWS = process.platform === "win32";
    var DefaultGlobber = class {
      constructor(options) {
        this.patterns = [];
        this.searchPaths = [];
        this.options = globOptionsHelper.getOptions(options);
      }
      getSearchPaths() {
        return this.searchPaths.slice();
      }
      glob() {
        var e_1, _a;
        return __awaiter2(this, void 0, void 0, function* () {
          const result = [];
          try {
            for (var _b = __asyncValues2(this.globGenerator()), _c; _c = yield _b.next(), !_c.done; ) {
              const itemPath = _c.value;
              result.push(itemPath);
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (_c && !_c.done && (_a = _b.return))
                yield _a.call(_b);
            } finally {
              if (e_1)
                throw e_1.error;
            }
          }
          return result;
        });
      }
      globGenerator() {
        return __asyncGenerator2(this, arguments, function* globGenerator_1() {
          const options = globOptionsHelper.getOptions(this.options);
          const patterns = [];
          for (const pattern of this.patterns) {
            patterns.push(pattern);
            if (options.implicitDescendants && (pattern.trailingSeparator || pattern.segments[pattern.segments.length - 1] !== "**")) {
              patterns.push(new internal_pattern_1.Pattern(pattern.negate, true, pattern.segments.concat("**")));
            }
          }
          const stack = [];
          for (const searchPath of patternHelper.getSearchPaths(patterns)) {
            core2.debug(`Search path '${searchPath}'`);
            try {
              yield __await2(fs2.promises.lstat(searchPath));
            } catch (err) {
              if (err.code === "ENOENT") {
                continue;
              }
              throw err;
            }
            stack.unshift(new internal_search_state_1.SearchState(searchPath, 1));
          }
          const traversalChain = [];
          while (stack.length) {
            const item = stack.pop();
            const match = patternHelper.match(patterns, item.path);
            const partialMatch = !!match || patternHelper.partialMatch(patterns, item.path);
            if (!match && !partialMatch) {
              continue;
            }
            const stats = yield __await2(DefaultGlobber.stat(item, options, traversalChain));
            if (!stats) {
              continue;
            }
            if (stats.isDirectory()) {
              if (match & internal_match_kind_1.MatchKind.Directory && options.matchDirectories) {
                yield yield __await2(item.path);
              } else if (!partialMatch) {
                continue;
              }
              const childLevel = item.level + 1;
              const childItems = (yield __await2(fs2.promises.readdir(item.path))).map((x) => new internal_search_state_1.SearchState(path3.join(item.path, x), childLevel));
              stack.push(...childItems.reverse());
            } else if (match & internal_match_kind_1.MatchKind.File) {
              yield yield __await2(item.path);
            }
          }
        });
      }
      static create(patterns, options) {
        return __awaiter2(this, void 0, void 0, function* () {
          const result = new DefaultGlobber(options);
          if (IS_WINDOWS) {
            patterns = patterns.replace(/\r\n/g, "\n");
            patterns = patterns.replace(/\r/g, "\n");
          }
          const lines = patterns.split("\n").map((x) => x.trim());
          for (const line of lines) {
            if (!line || line.startsWith("#")) {
              continue;
            } else {
              result.patterns.push(new internal_pattern_1.Pattern(line));
            }
          }
          result.searchPaths.push(...patternHelper.getSearchPaths(result.patterns));
          return result;
        });
      }
      static stat(item, options, traversalChain) {
        return __awaiter2(this, void 0, void 0, function* () {
          let stats;
          if (options.followSymbolicLinks) {
            try {
              stats = yield fs2.promises.stat(item.path);
            } catch (err) {
              if (err.code === "ENOENT") {
                if (options.omitBrokenSymbolicLinks) {
                  core2.debug(`Broken symlink '${item.path}'`);
                  return void 0;
                }
                throw new Error(`No information found for the path '${item.path}'. This may indicate a broken symbolic link.`);
              }
              throw err;
            }
          } else {
            stats = yield fs2.promises.lstat(item.path);
          }
          if (stats.isDirectory() && options.followSymbolicLinks) {
            const realPath = yield fs2.promises.realpath(item.path);
            while (traversalChain.length >= item.level) {
              traversalChain.pop();
            }
            if (traversalChain.some((x) => x === realPath)) {
              core2.debug(`Symlink cycle detected for path '${item.path}' and realpath '${realPath}'`);
              return void 0;
            }
            traversalChain.push(realPath);
          }
          return stats;
        });
      }
    };
    exports.DefaultGlobber = DefaultGlobber;
  }
});

// node_modules/@actions/glob/lib/internal-hash-files.js
var require_internal_hash_files = __commonJS({
  "node_modules/@actions/glob/lib/internal-hash-files.js"(exports) {
    "use strict";
    var __createBinding2 = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar2 = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.hasOwnProperty.call(mod, k))
            __createBinding2(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __awaiter2 = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __asyncValues2 = exports && exports.__asyncValues || function(o) {
      if (!Symbol.asyncIterator)
        throw new TypeError("Symbol.asyncIterator is not defined.");
      var m = o[Symbol.asyncIterator], i;
      return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
      }, i);
      function verb(n) {
        i[n] = o[n] && function(v) {
          return new Promise(function(resolve, reject) {
            v = o[n](v), settle(resolve, reject, v.done, v.value);
          });
        };
      }
      function settle(resolve, reject, d, v) {
        Promise.resolve(v).then(function(v2) {
          resolve({ value: v2, done: d });
        }, reject);
      }
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.hashFiles = void 0;
    var crypto = __importStar2(require("crypto"));
    var core2 = __importStar2(require_core());
    var fs2 = __importStar2(require("fs"));
    var stream = __importStar2(require("stream"));
    var util = __importStar2(require("util"));
    var path3 = __importStar2(require("path"));
    function hashFiles(globber) {
      var e_1, _a;
      var _b;
      return __awaiter2(this, void 0, void 0, function* () {
        let hasMatch = false;
        const githubWorkspace = (_b = process.env["GITHUB_WORKSPACE"]) !== null && _b !== void 0 ? _b : process.cwd();
        const result = crypto.createHash("sha256");
        let count = 0;
        try {
          for (var _c = __asyncValues2(globber.globGenerator()), _d; _d = yield _c.next(), !_d.done; ) {
            const file = _d.value;
            core2.debug(file);
            if (!file.startsWith(`${githubWorkspace}${path3.sep}`)) {
              core2.debug(`Ignore '${file}' since it is not under GITHUB_WORKSPACE.`);
              continue;
            }
            if (fs2.statSync(file).isDirectory()) {
              core2.debug(`Skip directory '${file}'.`);
              continue;
            }
            const hash = crypto.createHash("sha256");
            const pipeline = util.promisify(stream.pipeline);
            yield pipeline(fs2.createReadStream(file), hash);
            result.write(hash.digest());
            count++;
            if (!hasMatch) {
              hasMatch = true;
            }
          }
        } catch (e_1_1) {
          e_1 = { error: e_1_1 };
        } finally {
          try {
            if (_d && !_d.done && (_a = _c.return))
              yield _a.call(_c);
          } finally {
            if (e_1)
              throw e_1.error;
          }
        }
        result.end();
        if (hasMatch) {
          core2.debug(`Found ${count} files to hash.`);
          return result.digest("hex");
        } else {
          core2.debug(`No matches found for glob`);
          return "";
        }
      });
    }
    exports.hashFiles = hashFiles;
  }
});

// node_modules/@actions/glob/lib/glob.js
var require_glob = __commonJS({
  "node_modules/@actions/glob/lib/glob.js"(exports) {
    "use strict";
    var __awaiter2 = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.hashFiles = exports.create = void 0;
    var internal_globber_1 = require_internal_globber();
    var internal_hash_files_1 = require_internal_hash_files();
    function create(patterns, options) {
      return __awaiter2(this, void 0, void 0, function* () {
        return yield internal_globber_1.DefaultGlobber.create(patterns, options);
      });
    }
    exports.create = create;
    function hashFiles(patterns, options) {
      return __awaiter2(this, void 0, void 0, function* () {
        let followSymbolicLinks = true;
        if (options && typeof options.followSymbolicLinks === "boolean") {
          followSymbolicLinks = options.followSymbolicLinks;
        }
        const globber = yield create(patterns, { followSymbolicLinks });
        return internal_hash_files_1.hashFiles(globber);
      });
    }
    exports.hashFiles = hashFiles;
  }
});

// node_modules/mime-db/db.json
var require_db = __commonJS({
  "node_modules/mime-db/db.json"(exports, module5) {
    module5.exports = {
      "application/1d-interleaved-parityfec": {
        source: "iana"
      },
      "application/3gpdash-qoe-report+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/3gpp-ims+xml": {
        source: "iana",
        compressible: true
      },
      "application/3gpphal+json": {
        source: "iana",
        compressible: true
      },
      "application/3gpphalforms+json": {
        source: "iana",
        compressible: true
      },
      "application/a2l": {
        source: "iana"
      },
      "application/ace+cbor": {
        source: "iana"
      },
      "application/activemessage": {
        source: "iana"
      },
      "application/activity+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-costmap+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-costmapfilter+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-directory+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-endpointcost+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-endpointcostparams+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-endpointprop+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-endpointpropparams+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-error+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-networkmap+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-networkmapfilter+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-updatestreamcontrol+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-updatestreamparams+json": {
        source: "iana",
        compressible: true
      },
      "application/aml": {
        source: "iana"
      },
      "application/andrew-inset": {
        source: "iana",
        extensions: ["ez"]
      },
      "application/applefile": {
        source: "iana"
      },
      "application/applixware": {
        source: "apache",
        extensions: ["aw"]
      },
      "application/at+jwt": {
        source: "iana"
      },
      "application/atf": {
        source: "iana"
      },
      "application/atfx": {
        source: "iana"
      },
      "application/atom+xml": {
        source: "iana",
        compressible: true,
        extensions: ["atom"]
      },
      "application/atomcat+xml": {
        source: "iana",
        compressible: true,
        extensions: ["atomcat"]
      },
      "application/atomdeleted+xml": {
        source: "iana",
        compressible: true,
        extensions: ["atomdeleted"]
      },
      "application/atomicmail": {
        source: "iana"
      },
      "application/atomsvc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["atomsvc"]
      },
      "application/atsc-dwd+xml": {
        source: "iana",
        compressible: true,
        extensions: ["dwd"]
      },
      "application/atsc-dynamic-event-message": {
        source: "iana"
      },
      "application/atsc-held+xml": {
        source: "iana",
        compressible: true,
        extensions: ["held"]
      },
      "application/atsc-rdt+json": {
        source: "iana",
        compressible: true
      },
      "application/atsc-rsat+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rsat"]
      },
      "application/atxml": {
        source: "iana"
      },
      "application/auth-policy+xml": {
        source: "iana",
        compressible: true
      },
      "application/bacnet-xdd+zip": {
        source: "iana",
        compressible: false
      },
      "application/batch-smtp": {
        source: "iana"
      },
      "application/bdoc": {
        compressible: false,
        extensions: ["bdoc"]
      },
      "application/beep+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/calendar+json": {
        source: "iana",
        compressible: true
      },
      "application/calendar+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xcs"]
      },
      "application/call-completion": {
        source: "iana"
      },
      "application/cals-1840": {
        source: "iana"
      },
      "application/captive+json": {
        source: "iana",
        compressible: true
      },
      "application/cbor": {
        source: "iana"
      },
      "application/cbor-seq": {
        source: "iana"
      },
      "application/cccex": {
        source: "iana"
      },
      "application/ccmp+xml": {
        source: "iana",
        compressible: true
      },
      "application/ccxml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ccxml"]
      },
      "application/cdfx+xml": {
        source: "iana",
        compressible: true,
        extensions: ["cdfx"]
      },
      "application/cdmi-capability": {
        source: "iana",
        extensions: ["cdmia"]
      },
      "application/cdmi-container": {
        source: "iana",
        extensions: ["cdmic"]
      },
      "application/cdmi-domain": {
        source: "iana",
        extensions: ["cdmid"]
      },
      "application/cdmi-object": {
        source: "iana",
        extensions: ["cdmio"]
      },
      "application/cdmi-queue": {
        source: "iana",
        extensions: ["cdmiq"]
      },
      "application/cdni": {
        source: "iana"
      },
      "application/cea": {
        source: "iana"
      },
      "application/cea-2018+xml": {
        source: "iana",
        compressible: true
      },
      "application/cellml+xml": {
        source: "iana",
        compressible: true
      },
      "application/cfw": {
        source: "iana"
      },
      "application/clr": {
        source: "iana"
      },
      "application/clue+xml": {
        source: "iana",
        compressible: true
      },
      "application/clue_info+xml": {
        source: "iana",
        compressible: true
      },
      "application/cms": {
        source: "iana"
      },
      "application/cnrp+xml": {
        source: "iana",
        compressible: true
      },
      "application/coap-group+json": {
        source: "iana",
        compressible: true
      },
      "application/coap-payload": {
        source: "iana"
      },
      "application/commonground": {
        source: "iana"
      },
      "application/conference-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/cose": {
        source: "iana"
      },
      "application/cose-key": {
        source: "iana"
      },
      "application/cose-key-set": {
        source: "iana"
      },
      "application/cpl+xml": {
        source: "iana",
        compressible: true
      },
      "application/csrattrs": {
        source: "iana"
      },
      "application/csta+xml": {
        source: "iana",
        compressible: true
      },
      "application/cstadata+xml": {
        source: "iana",
        compressible: true
      },
      "application/csvm+json": {
        source: "iana",
        compressible: true
      },
      "application/cu-seeme": {
        source: "apache",
        extensions: ["cu"]
      },
      "application/cwt": {
        source: "iana"
      },
      "application/cybercash": {
        source: "iana"
      },
      "application/dart": {
        compressible: true
      },
      "application/dash+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mpd"]
      },
      "application/dashdelta": {
        source: "iana"
      },
      "application/davmount+xml": {
        source: "iana",
        compressible: true,
        extensions: ["davmount"]
      },
      "application/dca-rft": {
        source: "iana"
      },
      "application/dcd": {
        source: "iana"
      },
      "application/dec-dx": {
        source: "iana"
      },
      "application/dialog-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/dicom": {
        source: "iana"
      },
      "application/dicom+json": {
        source: "iana",
        compressible: true
      },
      "application/dicom+xml": {
        source: "iana",
        compressible: true
      },
      "application/dii": {
        source: "iana"
      },
      "application/dit": {
        source: "iana"
      },
      "application/dns": {
        source: "iana"
      },
      "application/dns+json": {
        source: "iana",
        compressible: true
      },
      "application/dns-message": {
        source: "iana"
      },
      "application/docbook+xml": {
        source: "apache",
        compressible: true,
        extensions: ["dbk"]
      },
      "application/dots+cbor": {
        source: "iana"
      },
      "application/dskpp+xml": {
        source: "iana",
        compressible: true
      },
      "application/dssc+der": {
        source: "iana",
        extensions: ["dssc"]
      },
      "application/dssc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xdssc"]
      },
      "application/dvcs": {
        source: "iana"
      },
      "application/ecmascript": {
        source: "iana",
        compressible: true,
        extensions: ["es", "ecma"]
      },
      "application/edi-consent": {
        source: "iana"
      },
      "application/edi-x12": {
        source: "iana",
        compressible: false
      },
      "application/edifact": {
        source: "iana",
        compressible: false
      },
      "application/efi": {
        source: "iana"
      },
      "application/elm+json": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/elm+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.cap+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/emergencycalldata.comment+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.control+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.deviceinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.ecall.msd": {
        source: "iana"
      },
      "application/emergencycalldata.providerinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.serviceinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.subscriberinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.veds+xml": {
        source: "iana",
        compressible: true
      },
      "application/emma+xml": {
        source: "iana",
        compressible: true,
        extensions: ["emma"]
      },
      "application/emotionml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["emotionml"]
      },
      "application/encaprtp": {
        source: "iana"
      },
      "application/epp+xml": {
        source: "iana",
        compressible: true
      },
      "application/epub+zip": {
        source: "iana",
        compressible: false,
        extensions: ["epub"]
      },
      "application/eshop": {
        source: "iana"
      },
      "application/exi": {
        source: "iana",
        extensions: ["exi"]
      },
      "application/expect-ct-report+json": {
        source: "iana",
        compressible: true
      },
      "application/express": {
        source: "iana",
        extensions: ["exp"]
      },
      "application/fastinfoset": {
        source: "iana"
      },
      "application/fastsoap": {
        source: "iana"
      },
      "application/fdt+xml": {
        source: "iana",
        compressible: true,
        extensions: ["fdt"]
      },
      "application/fhir+json": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/fhir+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/fido.trusted-apps+json": {
        compressible: true
      },
      "application/fits": {
        source: "iana"
      },
      "application/flexfec": {
        source: "iana"
      },
      "application/font-sfnt": {
        source: "iana"
      },
      "application/font-tdpfr": {
        source: "iana",
        extensions: ["pfr"]
      },
      "application/font-woff": {
        source: "iana",
        compressible: false
      },
      "application/framework-attributes+xml": {
        source: "iana",
        compressible: true
      },
      "application/geo+json": {
        source: "iana",
        compressible: true,
        extensions: ["geojson"]
      },
      "application/geo+json-seq": {
        source: "iana"
      },
      "application/geopackage+sqlite3": {
        source: "iana"
      },
      "application/geoxacml+xml": {
        source: "iana",
        compressible: true
      },
      "application/gltf-buffer": {
        source: "iana"
      },
      "application/gml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["gml"]
      },
      "application/gpx+xml": {
        source: "apache",
        compressible: true,
        extensions: ["gpx"]
      },
      "application/gxf": {
        source: "apache",
        extensions: ["gxf"]
      },
      "application/gzip": {
        source: "iana",
        compressible: false,
        extensions: ["gz"]
      },
      "application/h224": {
        source: "iana"
      },
      "application/held+xml": {
        source: "iana",
        compressible: true
      },
      "application/hjson": {
        extensions: ["hjson"]
      },
      "application/http": {
        source: "iana"
      },
      "application/hyperstudio": {
        source: "iana",
        extensions: ["stk"]
      },
      "application/ibe-key-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/ibe-pkg-reply+xml": {
        source: "iana",
        compressible: true
      },
      "application/ibe-pp-data": {
        source: "iana"
      },
      "application/iges": {
        source: "iana"
      },
      "application/im-iscomposing+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/index": {
        source: "iana"
      },
      "application/index.cmd": {
        source: "iana"
      },
      "application/index.obj": {
        source: "iana"
      },
      "application/index.response": {
        source: "iana"
      },
      "application/index.vnd": {
        source: "iana"
      },
      "application/inkml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ink", "inkml"]
      },
      "application/iotp": {
        source: "iana"
      },
      "application/ipfix": {
        source: "iana",
        extensions: ["ipfix"]
      },
      "application/ipp": {
        source: "iana"
      },
      "application/isup": {
        source: "iana"
      },
      "application/its+xml": {
        source: "iana",
        compressible: true,
        extensions: ["its"]
      },
      "application/java-archive": {
        source: "apache",
        compressible: false,
        extensions: ["jar", "war", "ear"]
      },
      "application/java-serialized-object": {
        source: "apache",
        compressible: false,
        extensions: ["ser"]
      },
      "application/java-vm": {
        source: "apache",
        compressible: false,
        extensions: ["class"]
      },
      "application/javascript": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["js", "mjs"]
      },
      "application/jf2feed+json": {
        source: "iana",
        compressible: true
      },
      "application/jose": {
        source: "iana"
      },
      "application/jose+json": {
        source: "iana",
        compressible: true
      },
      "application/jrd+json": {
        source: "iana",
        compressible: true
      },
      "application/jscalendar+json": {
        source: "iana",
        compressible: true
      },
      "application/json": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["json", "map"]
      },
      "application/json-patch+json": {
        source: "iana",
        compressible: true
      },
      "application/json-seq": {
        source: "iana"
      },
      "application/json5": {
        extensions: ["json5"]
      },
      "application/jsonml+json": {
        source: "apache",
        compressible: true,
        extensions: ["jsonml"]
      },
      "application/jwk+json": {
        source: "iana",
        compressible: true
      },
      "application/jwk-set+json": {
        source: "iana",
        compressible: true
      },
      "application/jwt": {
        source: "iana"
      },
      "application/kpml-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/kpml-response+xml": {
        source: "iana",
        compressible: true
      },
      "application/ld+json": {
        source: "iana",
        compressible: true,
        extensions: ["jsonld"]
      },
      "application/lgr+xml": {
        source: "iana",
        compressible: true,
        extensions: ["lgr"]
      },
      "application/link-format": {
        source: "iana"
      },
      "application/load-control+xml": {
        source: "iana",
        compressible: true
      },
      "application/lost+xml": {
        source: "iana",
        compressible: true,
        extensions: ["lostxml"]
      },
      "application/lostsync+xml": {
        source: "iana",
        compressible: true
      },
      "application/lpf+zip": {
        source: "iana",
        compressible: false
      },
      "application/lxf": {
        source: "iana"
      },
      "application/mac-binhex40": {
        source: "iana",
        extensions: ["hqx"]
      },
      "application/mac-compactpro": {
        source: "apache",
        extensions: ["cpt"]
      },
      "application/macwriteii": {
        source: "iana"
      },
      "application/mads+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mads"]
      },
      "application/manifest+json": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["webmanifest"]
      },
      "application/marc": {
        source: "iana",
        extensions: ["mrc"]
      },
      "application/marcxml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mrcx"]
      },
      "application/mathematica": {
        source: "iana",
        extensions: ["ma", "nb", "mb"]
      },
      "application/mathml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mathml"]
      },
      "application/mathml-content+xml": {
        source: "iana",
        compressible: true
      },
      "application/mathml-presentation+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-associated-procedure-description+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-deregister+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-envelope+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-msk+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-msk-response+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-protection-description+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-reception-report+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-register+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-register-response+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-schedule+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-user-service-description+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbox": {
        source: "iana",
        extensions: ["mbox"]
      },
      "application/media-policy-dataset+xml": {
        source: "iana",
        compressible: true
      },
      "application/media_control+xml": {
        source: "iana",
        compressible: true
      },
      "application/mediaservercontrol+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mscml"]
      },
      "application/merge-patch+json": {
        source: "iana",
        compressible: true
      },
      "application/metalink+xml": {
        source: "apache",
        compressible: true,
        extensions: ["metalink"]
      },
      "application/metalink4+xml": {
        source: "iana",
        compressible: true,
        extensions: ["meta4"]
      },
      "application/mets+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mets"]
      },
      "application/mf4": {
        source: "iana"
      },
      "application/mikey": {
        source: "iana"
      },
      "application/mipc": {
        source: "iana"
      },
      "application/missing-blocks+cbor-seq": {
        source: "iana"
      },
      "application/mmt-aei+xml": {
        source: "iana",
        compressible: true,
        extensions: ["maei"]
      },
      "application/mmt-usd+xml": {
        source: "iana",
        compressible: true,
        extensions: ["musd"]
      },
      "application/mods+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mods"]
      },
      "application/moss-keys": {
        source: "iana"
      },
      "application/moss-signature": {
        source: "iana"
      },
      "application/mosskey-data": {
        source: "iana"
      },
      "application/mosskey-request": {
        source: "iana"
      },
      "application/mp21": {
        source: "iana",
        extensions: ["m21", "mp21"]
      },
      "application/mp4": {
        source: "iana",
        extensions: ["mp4s", "m4p"]
      },
      "application/mpeg4-generic": {
        source: "iana"
      },
      "application/mpeg4-iod": {
        source: "iana"
      },
      "application/mpeg4-iod-xmt": {
        source: "iana"
      },
      "application/mrb-consumer+xml": {
        source: "iana",
        compressible: true
      },
      "application/mrb-publish+xml": {
        source: "iana",
        compressible: true
      },
      "application/msc-ivr+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/msc-mixer+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/msword": {
        source: "iana",
        compressible: false,
        extensions: ["doc", "dot"]
      },
      "application/mud+json": {
        source: "iana",
        compressible: true
      },
      "application/multipart-core": {
        source: "iana"
      },
      "application/mxf": {
        source: "iana",
        extensions: ["mxf"]
      },
      "application/n-quads": {
        source: "iana",
        extensions: ["nq"]
      },
      "application/n-triples": {
        source: "iana",
        extensions: ["nt"]
      },
      "application/nasdata": {
        source: "iana"
      },
      "application/news-checkgroups": {
        source: "iana",
        charset: "US-ASCII"
      },
      "application/news-groupinfo": {
        source: "iana",
        charset: "US-ASCII"
      },
      "application/news-transmission": {
        source: "iana"
      },
      "application/nlsml+xml": {
        source: "iana",
        compressible: true
      },
      "application/node": {
        source: "iana",
        extensions: ["cjs"]
      },
      "application/nss": {
        source: "iana"
      },
      "application/oauth-authz-req+jwt": {
        source: "iana"
      },
      "application/ocsp-request": {
        source: "iana"
      },
      "application/ocsp-response": {
        source: "iana"
      },
      "application/octet-stream": {
        source: "iana",
        compressible: false,
        extensions: ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"]
      },
      "application/oda": {
        source: "iana",
        extensions: ["oda"]
      },
      "application/odm+xml": {
        source: "iana",
        compressible: true
      },
      "application/odx": {
        source: "iana"
      },
      "application/oebps-package+xml": {
        source: "iana",
        compressible: true,
        extensions: ["opf"]
      },
      "application/ogg": {
        source: "iana",
        compressible: false,
        extensions: ["ogx"]
      },
      "application/omdoc+xml": {
        source: "apache",
        compressible: true,
        extensions: ["omdoc"]
      },
      "application/onenote": {
        source: "apache",
        extensions: ["onetoc", "onetoc2", "onetmp", "onepkg"]
      },
      "application/opc-nodeset+xml": {
        source: "iana",
        compressible: true
      },
      "application/oscore": {
        source: "iana"
      },
      "application/oxps": {
        source: "iana",
        extensions: ["oxps"]
      },
      "application/p21": {
        source: "iana"
      },
      "application/p21+zip": {
        source: "iana",
        compressible: false
      },
      "application/p2p-overlay+xml": {
        source: "iana",
        compressible: true,
        extensions: ["relo"]
      },
      "application/parityfec": {
        source: "iana"
      },
      "application/passport": {
        source: "iana"
      },
      "application/patch-ops-error+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xer"]
      },
      "application/pdf": {
        source: "iana",
        compressible: false,
        extensions: ["pdf"]
      },
      "application/pdx": {
        source: "iana"
      },
      "application/pem-certificate-chain": {
        source: "iana"
      },
      "application/pgp-encrypted": {
        source: "iana",
        compressible: false,
        extensions: ["pgp"]
      },
      "application/pgp-keys": {
        source: "iana"
      },
      "application/pgp-signature": {
        source: "iana",
        extensions: ["asc", "sig"]
      },
      "application/pics-rules": {
        source: "apache",
        extensions: ["prf"]
      },
      "application/pidf+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/pidf-diff+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/pkcs10": {
        source: "iana",
        extensions: ["p10"]
      },
      "application/pkcs12": {
        source: "iana"
      },
      "application/pkcs7-mime": {
        source: "iana",
        extensions: ["p7m", "p7c"]
      },
      "application/pkcs7-signature": {
        source: "iana",
        extensions: ["p7s"]
      },
      "application/pkcs8": {
        source: "iana",
        extensions: ["p8"]
      },
      "application/pkcs8-encrypted": {
        source: "iana"
      },
      "application/pkix-attr-cert": {
        source: "iana",
        extensions: ["ac"]
      },
      "application/pkix-cert": {
        source: "iana",
        extensions: ["cer"]
      },
      "application/pkix-crl": {
        source: "iana",
        extensions: ["crl"]
      },
      "application/pkix-pkipath": {
        source: "iana",
        extensions: ["pkipath"]
      },
      "application/pkixcmp": {
        source: "iana",
        extensions: ["pki"]
      },
      "application/pls+xml": {
        source: "iana",
        compressible: true,
        extensions: ["pls"]
      },
      "application/poc-settings+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/postscript": {
        source: "iana",
        compressible: true,
        extensions: ["ai", "eps", "ps"]
      },
      "application/ppsp-tracker+json": {
        source: "iana",
        compressible: true
      },
      "application/problem+json": {
        source: "iana",
        compressible: true
      },
      "application/problem+xml": {
        source: "iana",
        compressible: true
      },
      "application/provenance+xml": {
        source: "iana",
        compressible: true,
        extensions: ["provx"]
      },
      "application/prs.alvestrand.titrax-sheet": {
        source: "iana"
      },
      "application/prs.cww": {
        source: "iana",
        extensions: ["cww"]
      },
      "application/prs.cyn": {
        source: "iana",
        charset: "7-BIT"
      },
      "application/prs.hpub+zip": {
        source: "iana",
        compressible: false
      },
      "application/prs.nprend": {
        source: "iana"
      },
      "application/prs.plucker": {
        source: "iana"
      },
      "application/prs.rdf-xml-crypt": {
        source: "iana"
      },
      "application/prs.xsf+xml": {
        source: "iana",
        compressible: true
      },
      "application/pskc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["pskcxml"]
      },
      "application/pvd+json": {
        source: "iana",
        compressible: true
      },
      "application/qsig": {
        source: "iana"
      },
      "application/raml+yaml": {
        compressible: true,
        extensions: ["raml"]
      },
      "application/raptorfec": {
        source: "iana"
      },
      "application/rdap+json": {
        source: "iana",
        compressible: true
      },
      "application/rdf+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rdf", "owl"]
      },
      "application/reginfo+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rif"]
      },
      "application/relax-ng-compact-syntax": {
        source: "iana",
        extensions: ["rnc"]
      },
      "application/remote-printing": {
        source: "iana"
      },
      "application/reputon+json": {
        source: "iana",
        compressible: true
      },
      "application/resource-lists+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rl"]
      },
      "application/resource-lists-diff+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rld"]
      },
      "application/rfc+xml": {
        source: "iana",
        compressible: true
      },
      "application/riscos": {
        source: "iana"
      },
      "application/rlmi+xml": {
        source: "iana",
        compressible: true
      },
      "application/rls-services+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rs"]
      },
      "application/route-apd+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rapd"]
      },
      "application/route-s-tsid+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sls"]
      },
      "application/route-usd+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rusd"]
      },
      "application/rpki-ghostbusters": {
        source: "iana",
        extensions: ["gbr"]
      },
      "application/rpki-manifest": {
        source: "iana",
        extensions: ["mft"]
      },
      "application/rpki-publication": {
        source: "iana"
      },
      "application/rpki-roa": {
        source: "iana",
        extensions: ["roa"]
      },
      "application/rpki-updown": {
        source: "iana"
      },
      "application/rsd+xml": {
        source: "apache",
        compressible: true,
        extensions: ["rsd"]
      },
      "application/rss+xml": {
        source: "apache",
        compressible: true,
        extensions: ["rss"]
      },
      "application/rtf": {
        source: "iana",
        compressible: true,
        extensions: ["rtf"]
      },
      "application/rtploopback": {
        source: "iana"
      },
      "application/rtx": {
        source: "iana"
      },
      "application/samlassertion+xml": {
        source: "iana",
        compressible: true
      },
      "application/samlmetadata+xml": {
        source: "iana",
        compressible: true
      },
      "application/sarif+json": {
        source: "iana",
        compressible: true
      },
      "application/sarif-external-properties+json": {
        source: "iana",
        compressible: true
      },
      "application/sbe": {
        source: "iana"
      },
      "application/sbml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sbml"]
      },
      "application/scaip+xml": {
        source: "iana",
        compressible: true
      },
      "application/scim+json": {
        source: "iana",
        compressible: true
      },
      "application/scvp-cv-request": {
        source: "iana",
        extensions: ["scq"]
      },
      "application/scvp-cv-response": {
        source: "iana",
        extensions: ["scs"]
      },
      "application/scvp-vp-request": {
        source: "iana",
        extensions: ["spq"]
      },
      "application/scvp-vp-response": {
        source: "iana",
        extensions: ["spp"]
      },
      "application/sdp": {
        source: "iana",
        extensions: ["sdp"]
      },
      "application/secevent+jwt": {
        source: "iana"
      },
      "application/senml+cbor": {
        source: "iana"
      },
      "application/senml+json": {
        source: "iana",
        compressible: true
      },
      "application/senml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["senmlx"]
      },
      "application/senml-etch+cbor": {
        source: "iana"
      },
      "application/senml-etch+json": {
        source: "iana",
        compressible: true
      },
      "application/senml-exi": {
        source: "iana"
      },
      "application/sensml+cbor": {
        source: "iana"
      },
      "application/sensml+json": {
        source: "iana",
        compressible: true
      },
      "application/sensml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sensmlx"]
      },
      "application/sensml-exi": {
        source: "iana"
      },
      "application/sep+xml": {
        source: "iana",
        compressible: true
      },
      "application/sep-exi": {
        source: "iana"
      },
      "application/session-info": {
        source: "iana"
      },
      "application/set-payment": {
        source: "iana"
      },
      "application/set-payment-initiation": {
        source: "iana",
        extensions: ["setpay"]
      },
      "application/set-registration": {
        source: "iana"
      },
      "application/set-registration-initiation": {
        source: "iana",
        extensions: ["setreg"]
      },
      "application/sgml": {
        source: "iana"
      },
      "application/sgml-open-catalog": {
        source: "iana"
      },
      "application/shf+xml": {
        source: "iana",
        compressible: true,
        extensions: ["shf"]
      },
      "application/sieve": {
        source: "iana",
        extensions: ["siv", "sieve"]
      },
      "application/simple-filter+xml": {
        source: "iana",
        compressible: true
      },
      "application/simple-message-summary": {
        source: "iana"
      },
      "application/simplesymbolcontainer": {
        source: "iana"
      },
      "application/sipc": {
        source: "iana"
      },
      "application/slate": {
        source: "iana"
      },
      "application/smil": {
        source: "iana"
      },
      "application/smil+xml": {
        source: "iana",
        compressible: true,
        extensions: ["smi", "smil"]
      },
      "application/smpte336m": {
        source: "iana"
      },
      "application/soap+fastinfoset": {
        source: "iana"
      },
      "application/soap+xml": {
        source: "iana",
        compressible: true
      },
      "application/sparql-query": {
        source: "iana",
        extensions: ["rq"]
      },
      "application/sparql-results+xml": {
        source: "iana",
        compressible: true,
        extensions: ["srx"]
      },
      "application/spdx+json": {
        source: "iana",
        compressible: true
      },
      "application/spirits-event+xml": {
        source: "iana",
        compressible: true
      },
      "application/sql": {
        source: "iana"
      },
      "application/srgs": {
        source: "iana",
        extensions: ["gram"]
      },
      "application/srgs+xml": {
        source: "iana",
        compressible: true,
        extensions: ["grxml"]
      },
      "application/sru+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sru"]
      },
      "application/ssdl+xml": {
        source: "apache",
        compressible: true,
        extensions: ["ssdl"]
      },
      "application/ssml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ssml"]
      },
      "application/stix+json": {
        source: "iana",
        compressible: true
      },
      "application/swid+xml": {
        source: "iana",
        compressible: true,
        extensions: ["swidtag"]
      },
      "application/tamp-apex-update": {
        source: "iana"
      },
      "application/tamp-apex-update-confirm": {
        source: "iana"
      },
      "application/tamp-community-update": {
        source: "iana"
      },
      "application/tamp-community-update-confirm": {
        source: "iana"
      },
      "application/tamp-error": {
        source: "iana"
      },
      "application/tamp-sequence-adjust": {
        source: "iana"
      },
      "application/tamp-sequence-adjust-confirm": {
        source: "iana"
      },
      "application/tamp-status-query": {
        source: "iana"
      },
      "application/tamp-status-response": {
        source: "iana"
      },
      "application/tamp-update": {
        source: "iana"
      },
      "application/tamp-update-confirm": {
        source: "iana"
      },
      "application/tar": {
        compressible: true
      },
      "application/taxii+json": {
        source: "iana",
        compressible: true
      },
      "application/td+json": {
        source: "iana",
        compressible: true
      },
      "application/tei+xml": {
        source: "iana",
        compressible: true,
        extensions: ["tei", "teicorpus"]
      },
      "application/tetra_isi": {
        source: "iana"
      },
      "application/thraud+xml": {
        source: "iana",
        compressible: true,
        extensions: ["tfi"]
      },
      "application/timestamp-query": {
        source: "iana"
      },
      "application/timestamp-reply": {
        source: "iana"
      },
      "application/timestamped-data": {
        source: "iana",
        extensions: ["tsd"]
      },
      "application/tlsrpt+gzip": {
        source: "iana"
      },
      "application/tlsrpt+json": {
        source: "iana",
        compressible: true
      },
      "application/tnauthlist": {
        source: "iana"
      },
      "application/token-introspection+jwt": {
        source: "iana"
      },
      "application/toml": {
        compressible: true,
        extensions: ["toml"]
      },
      "application/trickle-ice-sdpfrag": {
        source: "iana"
      },
      "application/trig": {
        source: "iana",
        extensions: ["trig"]
      },
      "application/ttml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ttml"]
      },
      "application/tve-trigger": {
        source: "iana"
      },
      "application/tzif": {
        source: "iana"
      },
      "application/tzif-leap": {
        source: "iana"
      },
      "application/ubjson": {
        compressible: false,
        extensions: ["ubj"]
      },
      "application/ulpfec": {
        source: "iana"
      },
      "application/urc-grpsheet+xml": {
        source: "iana",
        compressible: true
      },
      "application/urc-ressheet+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rsheet"]
      },
      "application/urc-targetdesc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["td"]
      },
      "application/urc-uisocketdesc+xml": {
        source: "iana",
        compressible: true
      },
      "application/vcard+json": {
        source: "iana",
        compressible: true
      },
      "application/vcard+xml": {
        source: "iana",
        compressible: true
      },
      "application/vemmi": {
        source: "iana"
      },
      "application/vividence.scriptfile": {
        source: "apache"
      },
      "application/vnd.1000minds.decision-model+xml": {
        source: "iana",
        compressible: true,
        extensions: ["1km"]
      },
      "application/vnd.3gpp-prose+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp-prose-pc3ch+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp-v2x-local-service-information": {
        source: "iana"
      },
      "application/vnd.3gpp.5gnas": {
        source: "iana"
      },
      "application/vnd.3gpp.access-transfer-events+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.bsf+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.gmop+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.gtpc": {
        source: "iana"
      },
      "application/vnd.3gpp.interworking-data": {
        source: "iana"
      },
      "application/vnd.3gpp.lpp": {
        source: "iana"
      },
      "application/vnd.3gpp.mc-signalling-ear": {
        source: "iana"
      },
      "application/vnd.3gpp.mcdata-affiliation-command+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcdata-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcdata-payload": {
        source: "iana"
      },
      "application/vnd.3gpp.mcdata-service-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcdata-signalling": {
        source: "iana"
      },
      "application/vnd.3gpp.mcdata-ue-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcdata-user-profile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-affiliation-command+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-floor-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-location-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-mbms-usage-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-service-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-signed+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-ue-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-ue-init-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-user-profile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-affiliation-command+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-affiliation-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-location-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-mbms-usage-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-service-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-transmission-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-ue-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-user-profile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mid-call+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.ngap": {
        source: "iana"
      },
      "application/vnd.3gpp.pfcp": {
        source: "iana"
      },
      "application/vnd.3gpp.pic-bw-large": {
        source: "iana",
        extensions: ["plb"]
      },
      "application/vnd.3gpp.pic-bw-small": {
        source: "iana",
        extensions: ["psb"]
      },
      "application/vnd.3gpp.pic-bw-var": {
        source: "iana",
        extensions: ["pvb"]
      },
      "application/vnd.3gpp.s1ap": {
        source: "iana"
      },
      "application/vnd.3gpp.sms": {
        source: "iana"
      },
      "application/vnd.3gpp.sms+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.srvcc-ext+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.srvcc-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.state-and-event-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.ussd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp2.bcmcsinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp2.sms": {
        source: "iana"
      },
      "application/vnd.3gpp2.tcap": {
        source: "iana",
        extensions: ["tcap"]
      },
      "application/vnd.3lightssoftware.imagescal": {
        source: "iana"
      },
      "application/vnd.3m.post-it-notes": {
        source: "iana",
        extensions: ["pwn"]
      },
      "application/vnd.accpac.simply.aso": {
        source: "iana",
        extensions: ["aso"]
      },
      "application/vnd.accpac.simply.imp": {
        source: "iana",
        extensions: ["imp"]
      },
      "application/vnd.acucobol": {
        source: "iana",
        extensions: ["acu"]
      },
      "application/vnd.acucorp": {
        source: "iana",
        extensions: ["atc", "acutc"]
      },
      "application/vnd.adobe.air-application-installer-package+zip": {
        source: "apache",
        compressible: false,
        extensions: ["air"]
      },
      "application/vnd.adobe.flash.movie": {
        source: "iana"
      },
      "application/vnd.adobe.formscentral.fcdt": {
        source: "iana",
        extensions: ["fcdt"]
      },
      "application/vnd.adobe.fxp": {
        source: "iana",
        extensions: ["fxp", "fxpl"]
      },
      "application/vnd.adobe.partial-upload": {
        source: "iana"
      },
      "application/vnd.adobe.xdp+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xdp"]
      },
      "application/vnd.adobe.xfdf": {
        source: "iana",
        extensions: ["xfdf"]
      },
      "application/vnd.aether.imp": {
        source: "iana"
      },
      "application/vnd.afpc.afplinedata": {
        source: "iana"
      },
      "application/vnd.afpc.afplinedata-pagedef": {
        source: "iana"
      },
      "application/vnd.afpc.cmoca-cmresource": {
        source: "iana"
      },
      "application/vnd.afpc.foca-charset": {
        source: "iana"
      },
      "application/vnd.afpc.foca-codedfont": {
        source: "iana"
      },
      "application/vnd.afpc.foca-codepage": {
        source: "iana"
      },
      "application/vnd.afpc.modca": {
        source: "iana"
      },
      "application/vnd.afpc.modca-cmtable": {
        source: "iana"
      },
      "application/vnd.afpc.modca-formdef": {
        source: "iana"
      },
      "application/vnd.afpc.modca-mediummap": {
        source: "iana"
      },
      "application/vnd.afpc.modca-objectcontainer": {
        source: "iana"
      },
      "application/vnd.afpc.modca-overlay": {
        source: "iana"
      },
      "application/vnd.afpc.modca-pagesegment": {
        source: "iana"
      },
      "application/vnd.age": {
        source: "iana",
        extensions: ["age"]
      },
      "application/vnd.ah-barcode": {
        source: "iana"
      },
      "application/vnd.ahead.space": {
        source: "iana",
        extensions: ["ahead"]
      },
      "application/vnd.airzip.filesecure.azf": {
        source: "iana",
        extensions: ["azf"]
      },
      "application/vnd.airzip.filesecure.azs": {
        source: "iana",
        extensions: ["azs"]
      },
      "application/vnd.amadeus+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.amazon.ebook": {
        source: "apache",
        extensions: ["azw"]
      },
      "application/vnd.amazon.mobi8-ebook": {
        source: "iana"
      },
      "application/vnd.americandynamics.acc": {
        source: "iana",
        extensions: ["acc"]
      },
      "application/vnd.amiga.ami": {
        source: "iana",
        extensions: ["ami"]
      },
      "application/vnd.amundsen.maze+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.android.ota": {
        source: "iana"
      },
      "application/vnd.android.package-archive": {
        source: "apache",
        compressible: false,
        extensions: ["apk"]
      },
      "application/vnd.anki": {
        source: "iana"
      },
      "application/vnd.anser-web-certificate-issue-initiation": {
        source: "iana",
        extensions: ["cii"]
      },
      "application/vnd.anser-web-funds-transfer-initiation": {
        source: "apache",
        extensions: ["fti"]
      },
      "application/vnd.antix.game-component": {
        source: "iana",
        extensions: ["atx"]
      },
      "application/vnd.apache.arrow.file": {
        source: "iana"
      },
      "application/vnd.apache.arrow.stream": {
        source: "iana"
      },
      "application/vnd.apache.thrift.binary": {
        source: "iana"
      },
      "application/vnd.apache.thrift.compact": {
        source: "iana"
      },
      "application/vnd.apache.thrift.json": {
        source: "iana"
      },
      "application/vnd.api+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.aplextor.warrp+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.apothekende.reservation+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.apple.installer+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mpkg"]
      },
      "application/vnd.apple.keynote": {
        source: "iana",
        extensions: ["key"]
      },
      "application/vnd.apple.mpegurl": {
        source: "iana",
        extensions: ["m3u8"]
      },
      "application/vnd.apple.numbers": {
        source: "iana",
        extensions: ["numbers"]
      },
      "application/vnd.apple.pages": {
        source: "iana",
        extensions: ["pages"]
      },
      "application/vnd.apple.pkpass": {
        compressible: false,
        extensions: ["pkpass"]
      },
      "application/vnd.arastra.swi": {
        source: "iana"
      },
      "application/vnd.aristanetworks.swi": {
        source: "iana",
        extensions: ["swi"]
      },
      "application/vnd.artisan+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.artsquare": {
        source: "iana"
      },
      "application/vnd.astraea-software.iota": {
        source: "iana",
        extensions: ["iota"]
      },
      "application/vnd.audiograph": {
        source: "iana",
        extensions: ["aep"]
      },
      "application/vnd.autopackage": {
        source: "iana"
      },
      "application/vnd.avalon+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.avistar+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.balsamiq.bmml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["bmml"]
      },
      "application/vnd.balsamiq.bmpr": {
        source: "iana"
      },
      "application/vnd.banana-accounting": {
        source: "iana"
      },
      "application/vnd.bbf.usp.error": {
        source: "iana"
      },
      "application/vnd.bbf.usp.msg": {
        source: "iana"
      },
      "application/vnd.bbf.usp.msg+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.bekitzur-stech+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.bint.med-content": {
        source: "iana"
      },
      "application/vnd.biopax.rdf+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.blink-idb-value-wrapper": {
        source: "iana"
      },
      "application/vnd.blueice.multipass": {
        source: "iana",
        extensions: ["mpm"]
      },
      "application/vnd.bluetooth.ep.oob": {
        source: "iana"
      },
      "application/vnd.bluetooth.le.oob": {
        source: "iana"
      },
      "application/vnd.bmi": {
        source: "iana",
        extensions: ["bmi"]
      },
      "application/vnd.bpf": {
        source: "iana"
      },
      "application/vnd.bpf3": {
        source: "iana"
      },
      "application/vnd.businessobjects": {
        source: "iana",
        extensions: ["rep"]
      },
      "application/vnd.byu.uapi+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cab-jscript": {
        source: "iana"
      },
      "application/vnd.canon-cpdl": {
        source: "iana"
      },
      "application/vnd.canon-lips": {
        source: "iana"
      },
      "application/vnd.capasystems-pg+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cendio.thinlinc.clientconf": {
        source: "iana"
      },
      "application/vnd.century-systems.tcp_stream": {
        source: "iana"
      },
      "application/vnd.chemdraw+xml": {
        source: "iana",
        compressible: true,
        extensions: ["cdxml"]
      },
      "application/vnd.chess-pgn": {
        source: "iana"
      },
      "application/vnd.chipnuts.karaoke-mmd": {
        source: "iana",
        extensions: ["mmd"]
      },
      "application/vnd.ciedi": {
        source: "iana"
      },
      "application/vnd.cinderella": {
        source: "iana",
        extensions: ["cdy"]
      },
      "application/vnd.cirpack.isdn-ext": {
        source: "iana"
      },
      "application/vnd.citationstyles.style+xml": {
        source: "iana",
        compressible: true,
        extensions: ["csl"]
      },
      "application/vnd.claymore": {
        source: "iana",
        extensions: ["cla"]
      },
      "application/vnd.cloanto.rp9": {
        source: "iana",
        extensions: ["rp9"]
      },
      "application/vnd.clonk.c4group": {
        source: "iana",
        extensions: ["c4g", "c4d", "c4f", "c4p", "c4u"]
      },
      "application/vnd.cluetrust.cartomobile-config": {
        source: "iana",
        extensions: ["c11amc"]
      },
      "application/vnd.cluetrust.cartomobile-config-pkg": {
        source: "iana",
        extensions: ["c11amz"]
      },
      "application/vnd.coffeescript": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.document": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.document-template": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.presentation": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.presentation-template": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.spreadsheet": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.spreadsheet-template": {
        source: "iana"
      },
      "application/vnd.collection+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.collection.doc+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.collection.next+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.comicbook+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.comicbook-rar": {
        source: "iana"
      },
      "application/vnd.commerce-battelle": {
        source: "iana"
      },
      "application/vnd.commonspace": {
        source: "iana",
        extensions: ["csp"]
      },
      "application/vnd.contact.cmsg": {
        source: "iana",
        extensions: ["cdbcmsg"]
      },
      "application/vnd.coreos.ignition+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cosmocaller": {
        source: "iana",
        extensions: ["cmc"]
      },
      "application/vnd.crick.clicker": {
        source: "iana",
        extensions: ["clkx"]
      },
      "application/vnd.crick.clicker.keyboard": {
        source: "iana",
        extensions: ["clkk"]
      },
      "application/vnd.crick.clicker.palette": {
        source: "iana",
        extensions: ["clkp"]
      },
      "application/vnd.crick.clicker.template": {
        source: "iana",
        extensions: ["clkt"]
      },
      "application/vnd.crick.clicker.wordbank": {
        source: "iana",
        extensions: ["clkw"]
      },
      "application/vnd.criticaltools.wbs+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wbs"]
      },
      "application/vnd.cryptii.pipe+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.crypto-shade-file": {
        source: "iana"
      },
      "application/vnd.cryptomator.encrypted": {
        source: "iana"
      },
      "application/vnd.cryptomator.vault": {
        source: "iana"
      },
      "application/vnd.ctc-posml": {
        source: "iana",
        extensions: ["pml"]
      },
      "application/vnd.ctct.ws+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cups-pdf": {
        source: "iana"
      },
      "application/vnd.cups-postscript": {
        source: "iana"
      },
      "application/vnd.cups-ppd": {
        source: "iana",
        extensions: ["ppd"]
      },
      "application/vnd.cups-raster": {
        source: "iana"
      },
      "application/vnd.cups-raw": {
        source: "iana"
      },
      "application/vnd.curl": {
        source: "iana"
      },
      "application/vnd.curl.car": {
        source: "apache",
        extensions: ["car"]
      },
      "application/vnd.curl.pcurl": {
        source: "apache",
        extensions: ["pcurl"]
      },
      "application/vnd.cyan.dean.root+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cybank": {
        source: "iana"
      },
      "application/vnd.cyclonedx+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cyclonedx+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.d2l.coursepackage1p0+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.d3m-dataset": {
        source: "iana"
      },
      "application/vnd.d3m-problem": {
        source: "iana"
      },
      "application/vnd.dart": {
        source: "iana",
        compressible: true,
        extensions: ["dart"]
      },
      "application/vnd.data-vision.rdz": {
        source: "iana",
        extensions: ["rdz"]
      },
      "application/vnd.datapackage+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dataresource+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dbf": {
        source: "iana",
        extensions: ["dbf"]
      },
      "application/vnd.debian.binary-package": {
        source: "iana"
      },
      "application/vnd.dece.data": {
        source: "iana",
        extensions: ["uvf", "uvvf", "uvd", "uvvd"]
      },
      "application/vnd.dece.ttml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["uvt", "uvvt"]
      },
      "application/vnd.dece.unspecified": {
        source: "iana",
        extensions: ["uvx", "uvvx"]
      },
      "application/vnd.dece.zip": {
        source: "iana",
        extensions: ["uvz", "uvvz"]
      },
      "application/vnd.denovo.fcselayout-link": {
        source: "iana",
        extensions: ["fe_launch"]
      },
      "application/vnd.desmume.movie": {
        source: "iana"
      },
      "application/vnd.dir-bi.plate-dl-nosuffix": {
        source: "iana"
      },
      "application/vnd.dm.delegation+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dna": {
        source: "iana",
        extensions: ["dna"]
      },
      "application/vnd.document+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dolby.mlp": {
        source: "apache",
        extensions: ["mlp"]
      },
      "application/vnd.dolby.mobile.1": {
        source: "iana"
      },
      "application/vnd.dolby.mobile.2": {
        source: "iana"
      },
      "application/vnd.doremir.scorecloud-binary-document": {
        source: "iana"
      },
      "application/vnd.dpgraph": {
        source: "iana",
        extensions: ["dpg"]
      },
      "application/vnd.dreamfactory": {
        source: "iana",
        extensions: ["dfac"]
      },
      "application/vnd.drive+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ds-keypoint": {
        source: "apache",
        extensions: ["kpxx"]
      },
      "application/vnd.dtg.local": {
        source: "iana"
      },
      "application/vnd.dtg.local.flash": {
        source: "iana"
      },
      "application/vnd.dtg.local.html": {
        source: "iana"
      },
      "application/vnd.dvb.ait": {
        source: "iana",
        extensions: ["ait"]
      },
      "application/vnd.dvb.dvbisl+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.dvbj": {
        source: "iana"
      },
      "application/vnd.dvb.esgcontainer": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcdftnotifaccess": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcesgaccess": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcesgaccess2": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcesgpdd": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcroaming": {
        source: "iana"
      },
      "application/vnd.dvb.iptv.alfec-base": {
        source: "iana"
      },
      "application/vnd.dvb.iptv.alfec-enhancement": {
        source: "iana"
      },
      "application/vnd.dvb.notif-aggregate-root+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-container+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-generic+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-ia-msglist+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-ia-registration-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-ia-registration-response+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-init+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.pfr": {
        source: "iana"
      },
      "application/vnd.dvb.service": {
        source: "iana",
        extensions: ["svc"]
      },
      "application/vnd.dxr": {
        source: "iana"
      },
      "application/vnd.dynageo": {
        source: "iana",
        extensions: ["geo"]
      },
      "application/vnd.dzr": {
        source: "iana"
      },
      "application/vnd.easykaraoke.cdgdownload": {
        source: "iana"
      },
      "application/vnd.ecdis-update": {
        source: "iana"
      },
      "application/vnd.ecip.rlp": {
        source: "iana"
      },
      "application/vnd.ecowin.chart": {
        source: "iana",
        extensions: ["mag"]
      },
      "application/vnd.ecowin.filerequest": {
        source: "iana"
      },
      "application/vnd.ecowin.fileupdate": {
        source: "iana"
      },
      "application/vnd.ecowin.series": {
        source: "iana"
      },
      "application/vnd.ecowin.seriesrequest": {
        source: "iana"
      },
      "application/vnd.ecowin.seriesupdate": {
        source: "iana"
      },
      "application/vnd.efi.img": {
        source: "iana"
      },
      "application/vnd.efi.iso": {
        source: "iana"
      },
      "application/vnd.emclient.accessrequest+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.enliven": {
        source: "iana",
        extensions: ["nml"]
      },
      "application/vnd.enphase.envoy": {
        source: "iana"
      },
      "application/vnd.eprints.data+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.epson.esf": {
        source: "iana",
        extensions: ["esf"]
      },
      "application/vnd.epson.msf": {
        source: "iana",
        extensions: ["msf"]
      },
      "application/vnd.epson.quickanime": {
        source: "iana",
        extensions: ["qam"]
      },
      "application/vnd.epson.salt": {
        source: "iana",
        extensions: ["slt"]
      },
      "application/vnd.epson.ssf": {
        source: "iana",
        extensions: ["ssf"]
      },
      "application/vnd.ericsson.quickcall": {
        source: "iana"
      },
      "application/vnd.espass-espass+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.eszigno3+xml": {
        source: "iana",
        compressible: true,
        extensions: ["es3", "et3"]
      },
      "application/vnd.etsi.aoc+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.asic-e+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.etsi.asic-s+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.etsi.cug+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvcommand+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvdiscovery+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvprofile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvsad-bc+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvsad-cod+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvsad-npvr+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvservice+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvsync+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvueprofile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.mcid+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.mheg5": {
        source: "iana"
      },
      "application/vnd.etsi.overload-control-policy-dataset+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.pstn+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.sci+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.simservs+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.timestamp-token": {
        source: "iana"
      },
      "application/vnd.etsi.tsl+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.tsl.der": {
        source: "iana"
      },
      "application/vnd.eudora.data": {
        source: "iana"
      },
      "application/vnd.evolv.ecig.profile": {
        source: "iana"
      },
      "application/vnd.evolv.ecig.settings": {
        source: "iana"
      },
      "application/vnd.evolv.ecig.theme": {
        source: "iana"
      },
      "application/vnd.exstream-empower+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.exstream-package": {
        source: "iana"
      },
      "application/vnd.ezpix-album": {
        source: "iana",
        extensions: ["ez2"]
      },
      "application/vnd.ezpix-package": {
        source: "iana",
        extensions: ["ez3"]
      },
      "application/vnd.f-secure.mobile": {
        source: "iana"
      },
      "application/vnd.fastcopy-disk-image": {
        source: "iana"
      },
      "application/vnd.fdf": {
        source: "iana",
        extensions: ["fdf"]
      },
      "application/vnd.fdsn.mseed": {
        source: "iana",
        extensions: ["mseed"]
      },
      "application/vnd.fdsn.seed": {
        source: "iana",
        extensions: ["seed", "dataless"]
      },
      "application/vnd.ffsns": {
        source: "iana"
      },
      "application/vnd.ficlab.flb+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.filmit.zfc": {
        source: "iana"
      },
      "application/vnd.fints": {
        source: "iana"
      },
      "application/vnd.firemonkeys.cloudcell": {
        source: "iana"
      },
      "application/vnd.flographit": {
        source: "iana",
        extensions: ["gph"]
      },
      "application/vnd.fluxtime.clip": {
        source: "iana",
        extensions: ["ftc"]
      },
      "application/vnd.font-fontforge-sfd": {
        source: "iana"
      },
      "application/vnd.framemaker": {
        source: "iana",
        extensions: ["fm", "frame", "maker", "book"]
      },
      "application/vnd.frogans.fnc": {
        source: "iana",
        extensions: ["fnc"]
      },
      "application/vnd.frogans.ltf": {
        source: "iana",
        extensions: ["ltf"]
      },
      "application/vnd.fsc.weblaunch": {
        source: "iana",
        extensions: ["fsc"]
      },
      "application/vnd.fujifilm.fb.docuworks": {
        source: "iana"
      },
      "application/vnd.fujifilm.fb.docuworks.binder": {
        source: "iana"
      },
      "application/vnd.fujifilm.fb.docuworks.container": {
        source: "iana"
      },
      "application/vnd.fujifilm.fb.jfi+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.fujitsu.oasys": {
        source: "iana",
        extensions: ["oas"]
      },
      "application/vnd.fujitsu.oasys2": {
        source: "iana",
        extensions: ["oa2"]
      },
      "application/vnd.fujitsu.oasys3": {
        source: "iana",
        extensions: ["oa3"]
      },
      "application/vnd.fujitsu.oasysgp": {
        source: "iana",
        extensions: ["fg5"]
      },
      "application/vnd.fujitsu.oasysprs": {
        source: "iana",
        extensions: ["bh2"]
      },
      "application/vnd.fujixerox.art-ex": {
        source: "iana"
      },
      "application/vnd.fujixerox.art4": {
        source: "iana"
      },
      "application/vnd.fujixerox.ddd": {
        source: "iana",
        extensions: ["ddd"]
      },
      "application/vnd.fujixerox.docuworks": {
        source: "iana",
        extensions: ["xdw"]
      },
      "application/vnd.fujixerox.docuworks.binder": {
        source: "iana",
        extensions: ["xbd"]
      },
      "application/vnd.fujixerox.docuworks.container": {
        source: "iana"
      },
      "application/vnd.fujixerox.hbpl": {
        source: "iana"
      },
      "application/vnd.fut-misnet": {
        source: "iana"
      },
      "application/vnd.futoin+cbor": {
        source: "iana"
      },
      "application/vnd.futoin+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.fuzzysheet": {
        source: "iana",
        extensions: ["fzs"]
      },
      "application/vnd.genomatix.tuxedo": {
        source: "iana",
        extensions: ["txd"]
      },
      "application/vnd.gentics.grd+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.geo+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.geocube+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.geogebra.file": {
        source: "iana",
        extensions: ["ggb"]
      },
      "application/vnd.geogebra.slides": {
        source: "iana"
      },
      "application/vnd.geogebra.tool": {
        source: "iana",
        extensions: ["ggt"]
      },
      "application/vnd.geometry-explorer": {
        source: "iana",
        extensions: ["gex", "gre"]
      },
      "application/vnd.geonext": {
        source: "iana",
        extensions: ["gxt"]
      },
      "application/vnd.geoplan": {
        source: "iana",
        extensions: ["g2w"]
      },
      "application/vnd.geospace": {
        source: "iana",
        extensions: ["g3w"]
      },
      "application/vnd.gerber": {
        source: "iana"
      },
      "application/vnd.globalplatform.card-content-mgt": {
        source: "iana"
      },
      "application/vnd.globalplatform.card-content-mgt-response": {
        source: "iana"
      },
      "application/vnd.gmx": {
        source: "iana",
        extensions: ["gmx"]
      },
      "application/vnd.google-apps.document": {
        compressible: false,
        extensions: ["gdoc"]
      },
      "application/vnd.google-apps.presentation": {
        compressible: false,
        extensions: ["gslides"]
      },
      "application/vnd.google-apps.spreadsheet": {
        compressible: false,
        extensions: ["gsheet"]
      },
      "application/vnd.google-earth.kml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["kml"]
      },
      "application/vnd.google-earth.kmz": {
        source: "iana",
        compressible: false,
        extensions: ["kmz"]
      },
      "application/vnd.gov.sk.e-form+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.gov.sk.e-form+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.gov.sk.xmldatacontainer+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.grafeq": {
        source: "iana",
        extensions: ["gqf", "gqs"]
      },
      "application/vnd.gridmp": {
        source: "iana"
      },
      "application/vnd.groove-account": {
        source: "iana",
        extensions: ["gac"]
      },
      "application/vnd.groove-help": {
        source: "iana",
        extensions: ["ghf"]
      },
      "application/vnd.groove-identity-message": {
        source: "iana",
        extensions: ["gim"]
      },
      "application/vnd.groove-injector": {
        source: "iana",
        extensions: ["grv"]
      },
      "application/vnd.groove-tool-message": {
        source: "iana",
        extensions: ["gtm"]
      },
      "application/vnd.groove-tool-template": {
        source: "iana",
        extensions: ["tpl"]
      },
      "application/vnd.groove-vcard": {
        source: "iana",
        extensions: ["vcg"]
      },
      "application/vnd.hal+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hal+xml": {
        source: "iana",
        compressible: true,
        extensions: ["hal"]
      },
      "application/vnd.handheld-entertainment+xml": {
        source: "iana",
        compressible: true,
        extensions: ["zmm"]
      },
      "application/vnd.hbci": {
        source: "iana",
        extensions: ["hbci"]
      },
      "application/vnd.hc+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hcl-bireports": {
        source: "iana"
      },
      "application/vnd.hdt": {
        source: "iana"
      },
      "application/vnd.heroku+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hhe.lesson-player": {
        source: "iana",
        extensions: ["les"]
      },
      "application/vnd.hp-hpgl": {
        source: "iana",
        extensions: ["hpgl"]
      },
      "application/vnd.hp-hpid": {
        source: "iana",
        extensions: ["hpid"]
      },
      "application/vnd.hp-hps": {
        source: "iana",
        extensions: ["hps"]
      },
      "application/vnd.hp-jlyt": {
        source: "iana",
        extensions: ["jlt"]
      },
      "application/vnd.hp-pcl": {
        source: "iana",
        extensions: ["pcl"]
      },
      "application/vnd.hp-pclxl": {
        source: "iana",
        extensions: ["pclxl"]
      },
      "application/vnd.httphone": {
        source: "iana"
      },
      "application/vnd.hydrostatix.sof-data": {
        source: "iana",
        extensions: ["sfd-hdstx"]
      },
      "application/vnd.hyper+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hyper-item+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hyperdrive+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hzn-3d-crossword": {
        source: "iana"
      },
      "application/vnd.ibm.afplinedata": {
        source: "iana"
      },
      "application/vnd.ibm.electronic-media": {
        source: "iana"
      },
      "application/vnd.ibm.minipay": {
        source: "iana",
        extensions: ["mpy"]
      },
      "application/vnd.ibm.modcap": {
        source: "iana",
        extensions: ["afp", "listafp", "list3820"]
      },
      "application/vnd.ibm.rights-management": {
        source: "iana",
        extensions: ["irm"]
      },
      "application/vnd.ibm.secure-container": {
        source: "iana",
        extensions: ["sc"]
      },
      "application/vnd.iccprofile": {
        source: "iana",
        extensions: ["icc", "icm"]
      },
      "application/vnd.ieee.1905": {
        source: "iana"
      },
      "application/vnd.igloader": {
        source: "iana",
        extensions: ["igl"]
      },
      "application/vnd.imagemeter.folder+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.imagemeter.image+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.immervision-ivp": {
        source: "iana",
        extensions: ["ivp"]
      },
      "application/vnd.immervision-ivu": {
        source: "iana",
        extensions: ["ivu"]
      },
      "application/vnd.ims.imsccv1p1": {
        source: "iana"
      },
      "application/vnd.ims.imsccv1p2": {
        source: "iana"
      },
      "application/vnd.ims.imsccv1p3": {
        source: "iana"
      },
      "application/vnd.ims.lis.v2.result+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolconsumerprofile+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolproxy+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolproxy.id+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolsettings+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolsettings.simple+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.informedcontrol.rms+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.informix-visionary": {
        source: "iana"
      },
      "application/vnd.infotech.project": {
        source: "iana"
      },
      "application/vnd.infotech.project+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.innopath.wamp.notification": {
        source: "iana"
      },
      "application/vnd.insors.igm": {
        source: "iana",
        extensions: ["igm"]
      },
      "application/vnd.intercon.formnet": {
        source: "iana",
        extensions: ["xpw", "xpx"]
      },
      "application/vnd.intergeo": {
        source: "iana",
        extensions: ["i2g"]
      },
      "application/vnd.intertrust.digibox": {
        source: "iana"
      },
      "application/vnd.intertrust.nncp": {
        source: "iana"
      },
      "application/vnd.intu.qbo": {
        source: "iana",
        extensions: ["qbo"]
      },
      "application/vnd.intu.qfx": {
        source: "iana",
        extensions: ["qfx"]
      },
      "application/vnd.iptc.g2.catalogitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.conceptitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.knowledgeitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.newsitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.newsmessage+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.packageitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.planningitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ipunplugged.rcprofile": {
        source: "iana",
        extensions: ["rcprofile"]
      },
      "application/vnd.irepository.package+xml": {
        source: "iana",
        compressible: true,
        extensions: ["irp"]
      },
      "application/vnd.is-xpr": {
        source: "iana",
        extensions: ["xpr"]
      },
      "application/vnd.isac.fcs": {
        source: "iana",
        extensions: ["fcs"]
      },
      "application/vnd.iso11783-10+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.jam": {
        source: "iana",
        extensions: ["jam"]
      },
      "application/vnd.japannet-directory-service": {
        source: "iana"
      },
      "application/vnd.japannet-jpnstore-wakeup": {
        source: "iana"
      },
      "application/vnd.japannet-payment-wakeup": {
        source: "iana"
      },
      "application/vnd.japannet-registration": {
        source: "iana"
      },
      "application/vnd.japannet-registration-wakeup": {
        source: "iana"
      },
      "application/vnd.japannet-setstore-wakeup": {
        source: "iana"
      },
      "application/vnd.japannet-verification": {
        source: "iana"
      },
      "application/vnd.japannet-verification-wakeup": {
        source: "iana"
      },
      "application/vnd.jcp.javame.midlet-rms": {
        source: "iana",
        extensions: ["rms"]
      },
      "application/vnd.jisp": {
        source: "iana",
        extensions: ["jisp"]
      },
      "application/vnd.joost.joda-archive": {
        source: "iana",
        extensions: ["joda"]
      },
      "application/vnd.jsk.isdn-ngn": {
        source: "iana"
      },
      "application/vnd.kahootz": {
        source: "iana",
        extensions: ["ktz", "ktr"]
      },
      "application/vnd.kde.karbon": {
        source: "iana",
        extensions: ["karbon"]
      },
      "application/vnd.kde.kchart": {
        source: "iana",
        extensions: ["chrt"]
      },
      "application/vnd.kde.kformula": {
        source: "iana",
        extensions: ["kfo"]
      },
      "application/vnd.kde.kivio": {
        source: "iana",
        extensions: ["flw"]
      },
      "application/vnd.kde.kontour": {
        source: "iana",
        extensions: ["kon"]
      },
      "application/vnd.kde.kpresenter": {
        source: "iana",
        extensions: ["kpr", "kpt"]
      },
      "application/vnd.kde.kspread": {
        source: "iana",
        extensions: ["ksp"]
      },
      "application/vnd.kde.kword": {
        source: "iana",
        extensions: ["kwd", "kwt"]
      },
      "application/vnd.kenameaapp": {
        source: "iana",
        extensions: ["htke"]
      },
      "application/vnd.kidspiration": {
        source: "iana",
        extensions: ["kia"]
      },
      "application/vnd.kinar": {
        source: "iana",
        extensions: ["kne", "knp"]
      },
      "application/vnd.koan": {
        source: "iana",
        extensions: ["skp", "skd", "skt", "skm"]
      },
      "application/vnd.kodak-descriptor": {
        source: "iana",
        extensions: ["sse"]
      },
      "application/vnd.las": {
        source: "iana"
      },
      "application/vnd.las.las+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.las.las+xml": {
        source: "iana",
        compressible: true,
        extensions: ["lasxml"]
      },
      "application/vnd.laszip": {
        source: "iana"
      },
      "application/vnd.leap+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.liberty-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.llamagraphics.life-balance.desktop": {
        source: "iana",
        extensions: ["lbd"]
      },
      "application/vnd.llamagraphics.life-balance.exchange+xml": {
        source: "iana",
        compressible: true,
        extensions: ["lbe"]
      },
      "application/vnd.logipipe.circuit+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.loom": {
        source: "iana"
      },
      "application/vnd.lotus-1-2-3": {
        source: "iana",
        extensions: ["123"]
      },
      "application/vnd.lotus-approach": {
        source: "iana",
        extensions: ["apr"]
      },
      "application/vnd.lotus-freelance": {
        source: "iana",
        extensions: ["pre"]
      },
      "application/vnd.lotus-notes": {
        source: "iana",
        extensions: ["nsf"]
      },
      "application/vnd.lotus-organizer": {
        source: "iana",
        extensions: ["org"]
      },
      "application/vnd.lotus-screencam": {
        source: "iana",
        extensions: ["scm"]
      },
      "application/vnd.lotus-wordpro": {
        source: "iana",
        extensions: ["lwp"]
      },
      "application/vnd.macports.portpkg": {
        source: "iana",
        extensions: ["portpkg"]
      },
      "application/vnd.mapbox-vector-tile": {
        source: "iana",
        extensions: ["mvt"]
      },
      "application/vnd.marlin.drm.actiontoken+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.marlin.drm.conftoken+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.marlin.drm.license+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.marlin.drm.mdcf": {
        source: "iana"
      },
      "application/vnd.mason+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.maxmind.maxmind-db": {
        source: "iana"
      },
      "application/vnd.mcd": {
        source: "iana",
        extensions: ["mcd"]
      },
      "application/vnd.medcalcdata": {
        source: "iana",
        extensions: ["mc1"]
      },
      "application/vnd.mediastation.cdkey": {
        source: "iana",
        extensions: ["cdkey"]
      },
      "application/vnd.meridian-slingshot": {
        source: "iana"
      },
      "application/vnd.mfer": {
        source: "iana",
        extensions: ["mwf"]
      },
      "application/vnd.mfmp": {
        source: "iana",
        extensions: ["mfm"]
      },
      "application/vnd.micro+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.micrografx.flo": {
        source: "iana",
        extensions: ["flo"]
      },
      "application/vnd.micrografx.igx": {
        source: "iana",
        extensions: ["igx"]
      },
      "application/vnd.microsoft.portable-executable": {
        source: "iana"
      },
      "application/vnd.microsoft.windows.thumbnail-cache": {
        source: "iana"
      },
      "application/vnd.miele+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.mif": {
        source: "iana",
        extensions: ["mif"]
      },
      "application/vnd.minisoft-hp3000-save": {
        source: "iana"
      },
      "application/vnd.mitsubishi.misty-guard.trustweb": {
        source: "iana"
      },
      "application/vnd.mobius.daf": {
        source: "iana",
        extensions: ["daf"]
      },
      "application/vnd.mobius.dis": {
        source: "iana",
        extensions: ["dis"]
      },
      "application/vnd.mobius.mbk": {
        source: "iana",
        extensions: ["mbk"]
      },
      "application/vnd.mobius.mqy": {
        source: "iana",
        extensions: ["mqy"]
      },
      "application/vnd.mobius.msl": {
        source: "iana",
        extensions: ["msl"]
      },
      "application/vnd.mobius.plc": {
        source: "iana",
        extensions: ["plc"]
      },
      "application/vnd.mobius.txf": {
        source: "iana",
        extensions: ["txf"]
      },
      "application/vnd.mophun.application": {
        source: "iana",
        extensions: ["mpn"]
      },
      "application/vnd.mophun.certificate": {
        source: "iana",
        extensions: ["mpc"]
      },
      "application/vnd.motorola.flexsuite": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.adsi": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.fis": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.gotap": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.kmr": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.ttc": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.wem": {
        source: "iana"
      },
      "application/vnd.motorola.iprm": {
        source: "iana"
      },
      "application/vnd.mozilla.xul+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xul"]
      },
      "application/vnd.ms-3mfdocument": {
        source: "iana"
      },
      "application/vnd.ms-artgalry": {
        source: "iana",
        extensions: ["cil"]
      },
      "application/vnd.ms-asf": {
        source: "iana"
      },
      "application/vnd.ms-cab-compressed": {
        source: "iana",
        extensions: ["cab"]
      },
      "application/vnd.ms-color.iccprofile": {
        source: "apache"
      },
      "application/vnd.ms-excel": {
        source: "iana",
        compressible: false,
        extensions: ["xls", "xlm", "xla", "xlc", "xlt", "xlw"]
      },
      "application/vnd.ms-excel.addin.macroenabled.12": {
        source: "iana",
        extensions: ["xlam"]
      },
      "application/vnd.ms-excel.sheet.binary.macroenabled.12": {
        source: "iana",
        extensions: ["xlsb"]
      },
      "application/vnd.ms-excel.sheet.macroenabled.12": {
        source: "iana",
        extensions: ["xlsm"]
      },
      "application/vnd.ms-excel.template.macroenabled.12": {
        source: "iana",
        extensions: ["xltm"]
      },
      "application/vnd.ms-fontobject": {
        source: "iana",
        compressible: true,
        extensions: ["eot"]
      },
      "application/vnd.ms-htmlhelp": {
        source: "iana",
        extensions: ["chm"]
      },
      "application/vnd.ms-ims": {
        source: "iana",
        extensions: ["ims"]
      },
      "application/vnd.ms-lrm": {
        source: "iana",
        extensions: ["lrm"]
      },
      "application/vnd.ms-office.activex+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ms-officetheme": {
        source: "iana",
        extensions: ["thmx"]
      },
      "application/vnd.ms-opentype": {
        source: "apache",
        compressible: true
      },
      "application/vnd.ms-outlook": {
        compressible: false,
        extensions: ["msg"]
      },
      "application/vnd.ms-package.obfuscated-opentype": {
        source: "apache"
      },
      "application/vnd.ms-pki.seccat": {
        source: "apache",
        extensions: ["cat"]
      },
      "application/vnd.ms-pki.stl": {
        source: "apache",
        extensions: ["stl"]
      },
      "application/vnd.ms-playready.initiator+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ms-powerpoint": {
        source: "iana",
        compressible: false,
        extensions: ["ppt", "pps", "pot"]
      },
      "application/vnd.ms-powerpoint.addin.macroenabled.12": {
        source: "iana",
        extensions: ["ppam"]
      },
      "application/vnd.ms-powerpoint.presentation.macroenabled.12": {
        source: "iana",
        extensions: ["pptm"]
      },
      "application/vnd.ms-powerpoint.slide.macroenabled.12": {
        source: "iana",
        extensions: ["sldm"]
      },
      "application/vnd.ms-powerpoint.slideshow.macroenabled.12": {
        source: "iana",
        extensions: ["ppsm"]
      },
      "application/vnd.ms-powerpoint.template.macroenabled.12": {
        source: "iana",
        extensions: ["potm"]
      },
      "application/vnd.ms-printdevicecapabilities+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ms-printing.printticket+xml": {
        source: "apache",
        compressible: true
      },
      "application/vnd.ms-printschematicket+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ms-project": {
        source: "iana",
        extensions: ["mpp", "mpt"]
      },
      "application/vnd.ms-tnef": {
        source: "iana"
      },
      "application/vnd.ms-windows.devicepairing": {
        source: "iana"
      },
      "application/vnd.ms-windows.nwprinting.oob": {
        source: "iana"
      },
      "application/vnd.ms-windows.printerpairing": {
        source: "iana"
      },
      "application/vnd.ms-windows.wsd.oob": {
        source: "iana"
      },
      "application/vnd.ms-wmdrm.lic-chlg-req": {
        source: "iana"
      },
      "application/vnd.ms-wmdrm.lic-resp": {
        source: "iana"
      },
      "application/vnd.ms-wmdrm.meter-chlg-req": {
        source: "iana"
      },
      "application/vnd.ms-wmdrm.meter-resp": {
        source: "iana"
      },
      "application/vnd.ms-word.document.macroenabled.12": {
        source: "iana",
        extensions: ["docm"]
      },
      "application/vnd.ms-word.template.macroenabled.12": {
        source: "iana",
        extensions: ["dotm"]
      },
      "application/vnd.ms-works": {
        source: "iana",
        extensions: ["wps", "wks", "wcm", "wdb"]
      },
      "application/vnd.ms-wpl": {
        source: "iana",
        extensions: ["wpl"]
      },
      "application/vnd.ms-xpsdocument": {
        source: "iana",
        compressible: false,
        extensions: ["xps"]
      },
      "application/vnd.msa-disk-image": {
        source: "iana"
      },
      "application/vnd.mseq": {
        source: "iana",
        extensions: ["mseq"]
      },
      "application/vnd.msign": {
        source: "iana"
      },
      "application/vnd.multiad.creator": {
        source: "iana"
      },
      "application/vnd.multiad.creator.cif": {
        source: "iana"
      },
      "application/vnd.music-niff": {
        source: "iana"
      },
      "application/vnd.musician": {
        source: "iana",
        extensions: ["mus"]
      },
      "application/vnd.muvee.style": {
        source: "iana",
        extensions: ["msty"]
      },
      "application/vnd.mynfc": {
        source: "iana",
        extensions: ["taglet"]
      },
      "application/vnd.nacamar.ybrid+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ncd.control": {
        source: "iana"
      },
      "application/vnd.ncd.reference": {
        source: "iana"
      },
      "application/vnd.nearst.inv+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nebumind.line": {
        source: "iana"
      },
      "application/vnd.nervana": {
        source: "iana"
      },
      "application/vnd.netfpx": {
        source: "iana"
      },
      "application/vnd.neurolanguage.nlu": {
        source: "iana",
        extensions: ["nlu"]
      },
      "application/vnd.nimn": {
        source: "iana"
      },
      "application/vnd.nintendo.nitro.rom": {
        source: "iana"
      },
      "application/vnd.nintendo.snes.rom": {
        source: "iana"
      },
      "application/vnd.nitf": {
        source: "iana",
        extensions: ["ntf", "nitf"]
      },
      "application/vnd.noblenet-directory": {
        source: "iana",
        extensions: ["nnd"]
      },
      "application/vnd.noblenet-sealer": {
        source: "iana",
        extensions: ["nns"]
      },
      "application/vnd.noblenet-web": {
        source: "iana",
        extensions: ["nnw"]
      },
      "application/vnd.nokia.catalogs": {
        source: "iana"
      },
      "application/vnd.nokia.conml+wbxml": {
        source: "iana"
      },
      "application/vnd.nokia.conml+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.iptv.config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.isds-radio-presets": {
        source: "iana"
      },
      "application/vnd.nokia.landmark+wbxml": {
        source: "iana"
      },
      "application/vnd.nokia.landmark+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.landmarkcollection+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.n-gage.ac+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ac"]
      },
      "application/vnd.nokia.n-gage.data": {
        source: "iana",
        extensions: ["ngdat"]
      },
      "application/vnd.nokia.n-gage.symbian.install": {
        source: "iana",
        extensions: ["n-gage"]
      },
      "application/vnd.nokia.ncd": {
        source: "iana"
      },
      "application/vnd.nokia.pcd+wbxml": {
        source: "iana"
      },
      "application/vnd.nokia.pcd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.radio-preset": {
        source: "iana",
        extensions: ["rpst"]
      },
      "application/vnd.nokia.radio-presets": {
        source: "iana",
        extensions: ["rpss"]
      },
      "application/vnd.novadigm.edm": {
        source: "iana",
        extensions: ["edm"]
      },
      "application/vnd.novadigm.edx": {
        source: "iana",
        extensions: ["edx"]
      },
      "application/vnd.novadigm.ext": {
        source: "iana",
        extensions: ["ext"]
      },
      "application/vnd.ntt-local.content-share": {
        source: "iana"
      },
      "application/vnd.ntt-local.file-transfer": {
        source: "iana"
      },
      "application/vnd.ntt-local.ogw_remote-access": {
        source: "iana"
      },
      "application/vnd.ntt-local.sip-ta_remote": {
        source: "iana"
      },
      "application/vnd.ntt-local.sip-ta_tcp_stream": {
        source: "iana"
      },
      "application/vnd.oasis.opendocument.chart": {
        source: "iana",
        extensions: ["odc"]
      },
      "application/vnd.oasis.opendocument.chart-template": {
        source: "iana",
        extensions: ["otc"]
      },
      "application/vnd.oasis.opendocument.database": {
        source: "iana",
        extensions: ["odb"]
      },
      "application/vnd.oasis.opendocument.formula": {
        source: "iana",
        extensions: ["odf"]
      },
      "application/vnd.oasis.opendocument.formula-template": {
        source: "iana",
        extensions: ["odft"]
      },
      "application/vnd.oasis.opendocument.graphics": {
        source: "iana",
        compressible: false,
        extensions: ["odg"]
      },
      "application/vnd.oasis.opendocument.graphics-template": {
        source: "iana",
        extensions: ["otg"]
      },
      "application/vnd.oasis.opendocument.image": {
        source: "iana",
        extensions: ["odi"]
      },
      "application/vnd.oasis.opendocument.image-template": {
        source: "iana",
        extensions: ["oti"]
      },
      "application/vnd.oasis.opendocument.presentation": {
        source: "iana",
        compressible: false,
        extensions: ["odp"]
      },
      "application/vnd.oasis.opendocument.presentation-template": {
        source: "iana",
        extensions: ["otp"]
      },
      "application/vnd.oasis.opendocument.spreadsheet": {
        source: "iana",
        compressible: false,
        extensions: ["ods"]
      },
      "application/vnd.oasis.opendocument.spreadsheet-template": {
        source: "iana",
        extensions: ["ots"]
      },
      "application/vnd.oasis.opendocument.text": {
        source: "iana",
        compressible: false,
        extensions: ["odt"]
      },
      "application/vnd.oasis.opendocument.text-master": {
        source: "iana",
        extensions: ["odm"]
      },
      "application/vnd.oasis.opendocument.text-template": {
        source: "iana",
        extensions: ["ott"]
      },
      "application/vnd.oasis.opendocument.text-web": {
        source: "iana",
        extensions: ["oth"]
      },
      "application/vnd.obn": {
        source: "iana"
      },
      "application/vnd.ocf+cbor": {
        source: "iana"
      },
      "application/vnd.oci.image.manifest.v1+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oftn.l10n+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.contentaccessdownload+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.contentaccessstreaming+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.cspg-hexbinary": {
        source: "iana"
      },
      "application/vnd.oipf.dae.svg+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.dae.xhtml+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.mippvcontrolmessage+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.pae.gem": {
        source: "iana"
      },
      "application/vnd.oipf.spdiscovery+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.spdlist+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.ueprofile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.userprofile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.olpc-sugar": {
        source: "iana",
        extensions: ["xo"]
      },
      "application/vnd.oma-scws-config": {
        source: "iana"
      },
      "application/vnd.oma-scws-http-request": {
        source: "iana"
      },
      "application/vnd.oma-scws-http-response": {
        source: "iana"
      },
      "application/vnd.oma.bcast.associated-procedure-parameter+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.drm-trigger+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.imd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.ltkm": {
        source: "iana"
      },
      "application/vnd.oma.bcast.notification+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.provisioningtrigger": {
        source: "iana"
      },
      "application/vnd.oma.bcast.sgboot": {
        source: "iana"
      },
      "application/vnd.oma.bcast.sgdd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.sgdu": {
        source: "iana"
      },
      "application/vnd.oma.bcast.simple-symbol-container": {
        source: "iana"
      },
      "application/vnd.oma.bcast.smartcard-trigger+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.sprov+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.stkm": {
        source: "iana"
      },
      "application/vnd.oma.cab-address-book+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.cab-feature-handler+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.cab-pcc+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.cab-subs-invite+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.cab-user-prefs+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.dcd": {
        source: "iana"
      },
      "application/vnd.oma.dcdc": {
        source: "iana"
      },
      "application/vnd.oma.dd2+xml": {
        source: "iana",
        compressible: true,
        extensions: ["dd2"]
      },
      "application/vnd.oma.drm.risd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.group-usage-list+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.lwm2m+cbor": {
        source: "iana"
      },
      "application/vnd.oma.lwm2m+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.lwm2m+tlv": {
        source: "iana"
      },
      "application/vnd.oma.pal+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.detailed-progress-report+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.final-report+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.groups+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.invocation-descriptor+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.optimized-progress-report+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.push": {
        source: "iana"
      },
      "application/vnd.oma.scidm.messages+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.xcap-directory+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.omads-email+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.omads-file+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.omads-folder+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.omaloc-supl-init": {
        source: "iana"
      },
      "application/vnd.onepager": {
        source: "iana"
      },
      "application/vnd.onepagertamp": {
        source: "iana"
      },
      "application/vnd.onepagertamx": {
        source: "iana"
      },
      "application/vnd.onepagertat": {
        source: "iana"
      },
      "application/vnd.onepagertatp": {
        source: "iana"
      },
      "application/vnd.onepagertatx": {
        source: "iana"
      },
      "application/vnd.openblox.game+xml": {
        source: "iana",
        compressible: true,
        extensions: ["obgx"]
      },
      "application/vnd.openblox.game-binary": {
        source: "iana"
      },
      "application/vnd.openeye.oeb": {
        source: "iana"
      },
      "application/vnd.openofficeorg.extension": {
        source: "apache",
        extensions: ["oxt"]
      },
      "application/vnd.openstreetmap.data+xml": {
        source: "iana",
        compressible: true,
        extensions: ["osm"]
      },
      "application/vnd.opentimestamps.ots": {
        source: "iana"
      },
      "application/vnd.openxmlformats-officedocument.custom-properties+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.customxmlproperties+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawing+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.chart+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.extended-properties+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.comments+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
        source: "iana",
        compressible: false,
        extensions: ["pptx"]
      },
      "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.presprops+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slide": {
        source: "iana",
        extensions: ["sldx"]
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slide+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slideshow": {
        source: "iana",
        extensions: ["ppsx"]
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.tags+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.template": {
        source: "iana",
        extensions: ["potx"]
      },
      "application/vnd.openxmlformats-officedocument.presentationml.template.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
        source: "iana",
        compressible: false,
        extensions: ["xlsx"]
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.template": {
        source: "iana",
        extensions: ["xltx"]
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.theme+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.themeoverride+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.vmldrawing": {
        source: "iana"
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
        source: "iana",
        compressible: false,
        extensions: ["docx"]
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.template": {
        source: "iana",
        extensions: ["dotx"]
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-package.core-properties+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-package.relationships+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oracle.resource+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.orange.indata": {
        source: "iana"
      },
      "application/vnd.osa.netdeploy": {
        source: "iana"
      },
      "application/vnd.osgeo.mapguide.package": {
        source: "iana",
        extensions: ["mgp"]
      },
      "application/vnd.osgi.bundle": {
        source: "iana"
      },
      "application/vnd.osgi.dp": {
        source: "iana",
        extensions: ["dp"]
      },
      "application/vnd.osgi.subsystem": {
        source: "iana",
        extensions: ["esa"]
      },
      "application/vnd.otps.ct-kip+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oxli.countgraph": {
        source: "iana"
      },
      "application/vnd.pagerduty+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.palm": {
        source: "iana",
        extensions: ["pdb", "pqa", "oprc"]
      },
      "application/vnd.panoply": {
        source: "iana"
      },
      "application/vnd.paos.xml": {
        source: "iana"
      },
      "application/vnd.patentdive": {
        source: "iana"
      },
      "application/vnd.patientecommsdoc": {
        source: "iana"
      },
      "application/vnd.pawaafile": {
        source: "iana",
        extensions: ["paw"]
      },
      "application/vnd.pcos": {
        source: "iana"
      },
      "application/vnd.pg.format": {
        source: "iana",
        extensions: ["str"]
      },
      "application/vnd.pg.osasli": {
        source: "iana",
        extensions: ["ei6"]
      },
      "application/vnd.piaccess.application-licence": {
        source: "iana"
      },
      "application/vnd.picsel": {
        source: "iana",
        extensions: ["efif"]
      },
      "application/vnd.pmi.widget": {
        source: "iana",
        extensions: ["wg"]
      },
      "application/vnd.poc.group-advertisement+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.pocketlearn": {
        source: "iana",
        extensions: ["plf"]
      },
      "application/vnd.powerbuilder6": {
        source: "iana",
        extensions: ["pbd"]
      },
      "application/vnd.powerbuilder6-s": {
        source: "iana"
      },
      "application/vnd.powerbuilder7": {
        source: "iana"
      },
      "application/vnd.powerbuilder7-s": {
        source: "iana"
      },
      "application/vnd.powerbuilder75": {
        source: "iana"
      },
      "application/vnd.powerbuilder75-s": {
        source: "iana"
      },
      "application/vnd.preminet": {
        source: "iana"
      },
      "application/vnd.previewsystems.box": {
        source: "iana",
        extensions: ["box"]
      },
      "application/vnd.proteus.magazine": {
        source: "iana",
        extensions: ["mgz"]
      },
      "application/vnd.psfs": {
        source: "iana"
      },
      "application/vnd.publishare-delta-tree": {
        source: "iana",
        extensions: ["qps"]
      },
      "application/vnd.pvi.ptid1": {
        source: "iana",
        extensions: ["ptid"]
      },
      "application/vnd.pwg-multiplexed": {
        source: "iana"
      },
      "application/vnd.pwg-xhtml-print+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.qualcomm.brew-app-res": {
        source: "iana"
      },
      "application/vnd.quarantainenet": {
        source: "iana"
      },
      "application/vnd.quark.quarkxpress": {
        source: "iana",
        extensions: ["qxd", "qxt", "qwd", "qwt", "qxl", "qxb"]
      },
      "application/vnd.quobject-quoxdocument": {
        source: "iana"
      },
      "application/vnd.radisys.moml+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit-conf+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit-conn+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit-dialog+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit-stream+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-conf+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-base+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-fax-detect+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-fax-sendrecv+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-group+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-speech+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-transform+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.rainstor.data": {
        source: "iana"
      },
      "application/vnd.rapid": {
        source: "iana"
      },
      "application/vnd.rar": {
        source: "iana",
        extensions: ["rar"]
      },
      "application/vnd.realvnc.bed": {
        source: "iana",
        extensions: ["bed"]
      },
      "application/vnd.recordare.musicxml": {
        source: "iana",
        extensions: ["mxl"]
      },
      "application/vnd.recordare.musicxml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["musicxml"]
      },
      "application/vnd.renlearn.rlprint": {
        source: "iana"
      },
      "application/vnd.resilient.logic": {
        source: "iana"
      },
      "application/vnd.restful+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.rig.cryptonote": {
        source: "iana",
        extensions: ["cryptonote"]
      },
      "application/vnd.rim.cod": {
        source: "apache",
        extensions: ["cod"]
      },
      "application/vnd.rn-realmedia": {
        source: "apache",
        extensions: ["rm"]
      },
      "application/vnd.rn-realmedia-vbr": {
        source: "apache",
        extensions: ["rmvb"]
      },
      "application/vnd.route66.link66+xml": {
        source: "iana",
        compressible: true,
        extensions: ["link66"]
      },
      "application/vnd.rs-274x": {
        source: "iana"
      },
      "application/vnd.ruckus.download": {
        source: "iana"
      },
      "application/vnd.s3sms": {
        source: "iana"
      },
      "application/vnd.sailingtracker.track": {
        source: "iana",
        extensions: ["st"]
      },
      "application/vnd.sar": {
        source: "iana"
      },
      "application/vnd.sbm.cid": {
        source: "iana"
      },
      "application/vnd.sbm.mid2": {
        source: "iana"
      },
      "application/vnd.scribus": {
        source: "iana"
      },
      "application/vnd.sealed.3df": {
        source: "iana"
      },
      "application/vnd.sealed.csf": {
        source: "iana"
      },
      "application/vnd.sealed.doc": {
        source: "iana"
      },
      "application/vnd.sealed.eml": {
        source: "iana"
      },
      "application/vnd.sealed.mht": {
        source: "iana"
      },
      "application/vnd.sealed.net": {
        source: "iana"
      },
      "application/vnd.sealed.ppt": {
        source: "iana"
      },
      "application/vnd.sealed.tiff": {
        source: "iana"
      },
      "application/vnd.sealed.xls": {
        source: "iana"
      },
      "application/vnd.sealedmedia.softseal.html": {
        source: "iana"
      },
      "application/vnd.sealedmedia.softseal.pdf": {
        source: "iana"
      },
      "application/vnd.seemail": {
        source: "iana",
        extensions: ["see"]
      },
      "application/vnd.seis+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.sema": {
        source: "iana",
        extensions: ["sema"]
      },
      "application/vnd.semd": {
        source: "iana",
        extensions: ["semd"]
      },
      "application/vnd.semf": {
        source: "iana",
        extensions: ["semf"]
      },
      "application/vnd.shade-save-file": {
        source: "iana"
      },
      "application/vnd.shana.informed.formdata": {
        source: "iana",
        extensions: ["ifm"]
      },
      "application/vnd.shana.informed.formtemplate": {
        source: "iana",
        extensions: ["itp"]
      },
      "application/vnd.shana.informed.interchange": {
        source: "iana",
        extensions: ["iif"]
      },
      "application/vnd.shana.informed.package": {
        source: "iana",
        extensions: ["ipk"]
      },
      "application/vnd.shootproof+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.shopkick+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.shp": {
        source: "iana"
      },
      "application/vnd.shx": {
        source: "iana"
      },
      "application/vnd.sigrok.session": {
        source: "iana"
      },
      "application/vnd.simtech-mindmapper": {
        source: "iana",
        extensions: ["twd", "twds"]
      },
      "application/vnd.siren+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.smaf": {
        source: "iana",
        extensions: ["mmf"]
      },
      "application/vnd.smart.notebook": {
        source: "iana"
      },
      "application/vnd.smart.teacher": {
        source: "iana",
        extensions: ["teacher"]
      },
      "application/vnd.snesdev-page-table": {
        source: "iana"
      },
      "application/vnd.software602.filler.form+xml": {
        source: "iana",
        compressible: true,
        extensions: ["fo"]
      },
      "application/vnd.software602.filler.form-xml-zip": {
        source: "iana"
      },
      "application/vnd.solent.sdkm+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sdkm", "sdkd"]
      },
      "application/vnd.spotfire.dxp": {
        source: "iana",
        extensions: ["dxp"]
      },
      "application/vnd.spotfire.sfs": {
        source: "iana",
        extensions: ["sfs"]
      },
      "application/vnd.sqlite3": {
        source: "iana"
      },
      "application/vnd.sss-cod": {
        source: "iana"
      },
      "application/vnd.sss-dtf": {
        source: "iana"
      },
      "application/vnd.sss-ntf": {
        source: "iana"
      },
      "application/vnd.stardivision.calc": {
        source: "apache",
        extensions: ["sdc"]
      },
      "application/vnd.stardivision.draw": {
        source: "apache",
        extensions: ["sda"]
      },
      "application/vnd.stardivision.impress": {
        source: "apache",
        extensions: ["sdd"]
      },
      "application/vnd.stardivision.math": {
        source: "apache",
        extensions: ["smf"]
      },
      "application/vnd.stardivision.writer": {
        source: "apache",
        extensions: ["sdw", "vor"]
      },
      "application/vnd.stardivision.writer-global": {
        source: "apache",
        extensions: ["sgl"]
      },
      "application/vnd.stepmania.package": {
        source: "iana",
        extensions: ["smzip"]
      },
      "application/vnd.stepmania.stepchart": {
        source: "iana",
        extensions: ["sm"]
      },
      "application/vnd.street-stream": {
        source: "iana"
      },
      "application/vnd.sun.wadl+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wadl"]
      },
      "application/vnd.sun.xml.calc": {
        source: "apache",
        extensions: ["sxc"]
      },
      "application/vnd.sun.xml.calc.template": {
        source: "apache",
        extensions: ["stc"]
      },
      "application/vnd.sun.xml.draw": {
        source: "apache",
        extensions: ["sxd"]
      },
      "application/vnd.sun.xml.draw.template": {
        source: "apache",
        extensions: ["std"]
      },
      "application/vnd.sun.xml.impress": {
        source: "apache",
        extensions: ["sxi"]
      },
      "application/vnd.sun.xml.impress.template": {
        source: "apache",
        extensions: ["sti"]
      },
      "application/vnd.sun.xml.math": {
        source: "apache",
        extensions: ["sxm"]
      },
      "application/vnd.sun.xml.writer": {
        source: "apache",
        extensions: ["sxw"]
      },
      "application/vnd.sun.xml.writer.global": {
        source: "apache",
        extensions: ["sxg"]
      },
      "application/vnd.sun.xml.writer.template": {
        source: "apache",
        extensions: ["stw"]
      },
      "application/vnd.sus-calendar": {
        source: "iana",
        extensions: ["sus", "susp"]
      },
      "application/vnd.svd": {
        source: "iana",
        extensions: ["svd"]
      },
      "application/vnd.swiftview-ics": {
        source: "iana"
      },
      "application/vnd.sycle+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.symbian.install": {
        source: "apache",
        extensions: ["sis", "sisx"]
      },
      "application/vnd.syncml+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["xsm"]
      },
      "application/vnd.syncml.dm+wbxml": {
        source: "iana",
        charset: "UTF-8",
        extensions: ["bdm"]
      },
      "application/vnd.syncml.dm+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["xdm"]
      },
      "application/vnd.syncml.dm.notification": {
        source: "iana"
      },
      "application/vnd.syncml.dmddf+wbxml": {
        source: "iana"
      },
      "application/vnd.syncml.dmddf+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["ddf"]
      },
      "application/vnd.syncml.dmtnds+wbxml": {
        source: "iana"
      },
      "application/vnd.syncml.dmtnds+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.syncml.ds.notification": {
        source: "iana"
      },
      "application/vnd.tableschema+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.tao.intent-module-archive": {
        source: "iana",
        extensions: ["tao"]
      },
      "application/vnd.tcpdump.pcap": {
        source: "iana",
        extensions: ["pcap", "cap", "dmp"]
      },
      "application/vnd.think-cell.ppttc+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.tmd.mediaflex.api+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.tml": {
        source: "iana"
      },
      "application/vnd.tmobile-livetv": {
        source: "iana",
        extensions: ["tmo"]
      },
      "application/vnd.tri.onesource": {
        source: "iana"
      },
      "application/vnd.trid.tpt": {
        source: "iana",
        extensions: ["tpt"]
      },
      "application/vnd.triscape.mxs": {
        source: "iana",
        extensions: ["mxs"]
      },
      "application/vnd.trueapp": {
        source: "iana",
        extensions: ["tra"]
      },
      "application/vnd.truedoc": {
        source: "iana"
      },
      "application/vnd.ubisoft.webplayer": {
        source: "iana"
      },
      "application/vnd.ufdl": {
        source: "iana",
        extensions: ["ufd", "ufdl"]
      },
      "application/vnd.uiq.theme": {
        source: "iana",
        extensions: ["utz"]
      },
      "application/vnd.umajin": {
        source: "iana",
        extensions: ["umj"]
      },
      "application/vnd.unity": {
        source: "iana",
        extensions: ["unityweb"]
      },
      "application/vnd.uoml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["uoml"]
      },
      "application/vnd.uplanet.alert": {
        source: "iana"
      },
      "application/vnd.uplanet.alert-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.bearer-choice": {
        source: "iana"
      },
      "application/vnd.uplanet.bearer-choice-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.cacheop": {
        source: "iana"
      },
      "application/vnd.uplanet.cacheop-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.channel": {
        source: "iana"
      },
      "application/vnd.uplanet.channel-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.list": {
        source: "iana"
      },
      "application/vnd.uplanet.list-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.listcmd": {
        source: "iana"
      },
      "application/vnd.uplanet.listcmd-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.signal": {
        source: "iana"
      },
      "application/vnd.uri-map": {
        source: "iana"
      },
      "application/vnd.valve.source.material": {
        source: "iana"
      },
      "application/vnd.vcx": {
        source: "iana",
        extensions: ["vcx"]
      },
      "application/vnd.vd-study": {
        source: "iana"
      },
      "application/vnd.vectorworks": {
        source: "iana"
      },
      "application/vnd.vel+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.verimatrix.vcas": {
        source: "iana"
      },
      "application/vnd.veritone.aion+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.veryant.thin": {
        source: "iana"
      },
      "application/vnd.ves.encrypted": {
        source: "iana"
      },
      "application/vnd.vidsoft.vidconference": {
        source: "iana"
      },
      "application/vnd.visio": {
        source: "iana",
        extensions: ["vsd", "vst", "vss", "vsw"]
      },
      "application/vnd.visionary": {
        source: "iana",
        extensions: ["vis"]
      },
      "application/vnd.vividence.scriptfile": {
        source: "iana"
      },
      "application/vnd.vsf": {
        source: "iana",
        extensions: ["vsf"]
      },
      "application/vnd.wap.sic": {
        source: "iana"
      },
      "application/vnd.wap.slc": {
        source: "iana"
      },
      "application/vnd.wap.wbxml": {
        source: "iana",
        charset: "UTF-8",
        extensions: ["wbxml"]
      },
      "application/vnd.wap.wmlc": {
        source: "iana",
        extensions: ["wmlc"]
      },
      "application/vnd.wap.wmlscriptc": {
        source: "iana",
        extensions: ["wmlsc"]
      },
      "application/vnd.webturbo": {
        source: "iana",
        extensions: ["wtb"]
      },
      "application/vnd.wfa.dpp": {
        source: "iana"
      },
      "application/vnd.wfa.p2p": {
        source: "iana"
      },
      "application/vnd.wfa.wsc": {
        source: "iana"
      },
      "application/vnd.windows.devicepairing": {
        source: "iana"
      },
      "application/vnd.wmc": {
        source: "iana"
      },
      "application/vnd.wmf.bootstrap": {
        source: "iana"
      },
      "application/vnd.wolfram.mathematica": {
        source: "iana"
      },
      "application/vnd.wolfram.mathematica.package": {
        source: "iana"
      },
      "application/vnd.wolfram.player": {
        source: "iana",
        extensions: ["nbp"]
      },
      "application/vnd.wordperfect": {
        source: "iana",
        extensions: ["wpd"]
      },
      "application/vnd.wqd": {
        source: "iana",
        extensions: ["wqd"]
      },
      "application/vnd.wrq-hp3000-labelled": {
        source: "iana"
      },
      "application/vnd.wt.stf": {
        source: "iana",
        extensions: ["stf"]
      },
      "application/vnd.wv.csp+wbxml": {
        source: "iana"
      },
      "application/vnd.wv.csp+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.wv.ssp+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.xacml+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.xara": {
        source: "iana",
        extensions: ["xar"]
      },
      "application/vnd.xfdl": {
        source: "iana",
        extensions: ["xfdl"]
      },
      "application/vnd.xfdl.webform": {
        source: "iana"
      },
      "application/vnd.xmi+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.xmpie.cpkg": {
        source: "iana"
      },
      "application/vnd.xmpie.dpkg": {
        source: "iana"
      },
      "application/vnd.xmpie.plan": {
        source: "iana"
      },
      "application/vnd.xmpie.ppkg": {
        source: "iana"
      },
      "application/vnd.xmpie.xlim": {
        source: "iana"
      },
      "application/vnd.yamaha.hv-dic": {
        source: "iana",
        extensions: ["hvd"]
      },
      "application/vnd.yamaha.hv-script": {
        source: "iana",
        extensions: ["hvs"]
      },
      "application/vnd.yamaha.hv-voice": {
        source: "iana",
        extensions: ["hvp"]
      },
      "application/vnd.yamaha.openscoreformat": {
        source: "iana",
        extensions: ["osf"]
      },
      "application/vnd.yamaha.openscoreformat.osfpvg+xml": {
        source: "iana",
        compressible: true,
        extensions: ["osfpvg"]
      },
      "application/vnd.yamaha.remote-setup": {
        source: "iana"
      },
      "application/vnd.yamaha.smaf-audio": {
        source: "iana",
        extensions: ["saf"]
      },
      "application/vnd.yamaha.smaf-phrase": {
        source: "iana",
        extensions: ["spf"]
      },
      "application/vnd.yamaha.through-ngn": {
        source: "iana"
      },
      "application/vnd.yamaha.tunnel-udpencap": {
        source: "iana"
      },
      "application/vnd.yaoweme": {
        source: "iana"
      },
      "application/vnd.yellowriver-custom-menu": {
        source: "iana",
        extensions: ["cmp"]
      },
      "application/vnd.youtube.yt": {
        source: "iana"
      },
      "application/vnd.zul": {
        source: "iana",
        extensions: ["zir", "zirz"]
      },
      "application/vnd.zzazz.deck+xml": {
        source: "iana",
        compressible: true,
        extensions: ["zaz"]
      },
      "application/voicexml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["vxml"]
      },
      "application/voucher-cms+json": {
        source: "iana",
        compressible: true
      },
      "application/vq-rtcpxr": {
        source: "iana"
      },
      "application/wasm": {
        source: "iana",
        compressible: true,
        extensions: ["wasm"]
      },
      "application/watcherinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/webpush-options+json": {
        source: "iana",
        compressible: true
      },
      "application/whoispp-query": {
        source: "iana"
      },
      "application/whoispp-response": {
        source: "iana"
      },
      "application/widget": {
        source: "iana",
        extensions: ["wgt"]
      },
      "application/winhlp": {
        source: "apache",
        extensions: ["hlp"]
      },
      "application/wita": {
        source: "iana"
      },
      "application/wordperfect5.1": {
        source: "iana"
      },
      "application/wsdl+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wsdl"]
      },
      "application/wspolicy+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wspolicy"]
      },
      "application/x-7z-compressed": {
        source: "apache",
        compressible: false,
        extensions: ["7z"]
      },
      "application/x-abiword": {
        source: "apache",
        extensions: ["abw"]
      },
      "application/x-ace-compressed": {
        source: "apache",
        extensions: ["ace"]
      },
      "application/x-amf": {
        source: "apache"
      },
      "application/x-apple-diskimage": {
        source: "apache",
        extensions: ["dmg"]
      },
      "application/x-arj": {
        compressible: false,
        extensions: ["arj"]
      },
      "application/x-authorware-bin": {
        source: "apache",
        extensions: ["aab", "x32", "u32", "vox"]
      },
      "application/x-authorware-map": {
        source: "apache",
        extensions: ["aam"]
      },
      "application/x-authorware-seg": {
        source: "apache",
        extensions: ["aas"]
      },
      "application/x-bcpio": {
        source: "apache",
        extensions: ["bcpio"]
      },
      "application/x-bdoc": {
        compressible: false,
        extensions: ["bdoc"]
      },
      "application/x-bittorrent": {
        source: "apache",
        extensions: ["torrent"]
      },
      "application/x-blorb": {
        source: "apache",
        extensions: ["blb", "blorb"]
      },
      "application/x-bzip": {
        source: "apache",
        compressible: false,
        extensions: ["bz"]
      },
      "application/x-bzip2": {
        source: "apache",
        compressible: false,
        extensions: ["bz2", "boz"]
      },
      "application/x-cbr": {
        source: "apache",
        extensions: ["cbr", "cba", "cbt", "cbz", "cb7"]
      },
      "application/x-cdlink": {
        source: "apache",
        extensions: ["vcd"]
      },
      "application/x-cfs-compressed": {
        source: "apache",
        extensions: ["cfs"]
      },
      "application/x-chat": {
        source: "apache",
        extensions: ["chat"]
      },
      "application/x-chess-pgn": {
        source: "apache",
        extensions: ["pgn"]
      },
      "application/x-chrome-extension": {
        extensions: ["crx"]
      },
      "application/x-cocoa": {
        source: "nginx",
        extensions: ["cco"]
      },
      "application/x-compress": {
        source: "apache"
      },
      "application/x-conference": {
        source: "apache",
        extensions: ["nsc"]
      },
      "application/x-cpio": {
        source: "apache",
        extensions: ["cpio"]
      },
      "application/x-csh": {
        source: "apache",
        extensions: ["csh"]
      },
      "application/x-deb": {
        compressible: false
      },
      "application/x-debian-package": {
        source: "apache",
        extensions: ["deb", "udeb"]
      },
      "application/x-dgc-compressed": {
        source: "apache",
        extensions: ["dgc"]
      },
      "application/x-director": {
        source: "apache",
        extensions: ["dir", "dcr", "dxr", "cst", "cct", "cxt", "w3d", "fgd", "swa"]
      },
      "application/x-doom": {
        source: "apache",
        extensions: ["wad"]
      },
      "application/x-dtbncx+xml": {
        source: "apache",
        compressible: true,
        extensions: ["ncx"]
      },
      "application/x-dtbook+xml": {
        source: "apache",
        compressible: true,
        extensions: ["dtb"]
      },
      "application/x-dtbresource+xml": {
        source: "apache",
        compressible: true,
        extensions: ["res"]
      },
      "application/x-dvi": {
        source: "apache",
        compressible: false,
        extensions: ["dvi"]
      },
      "application/x-envoy": {
        source: "apache",
        extensions: ["evy"]
      },
      "application/x-eva": {
        source: "apache",
        extensions: ["eva"]
      },
      "application/x-font-bdf": {
        source: "apache",
        extensions: ["bdf"]
      },
      "application/x-font-dos": {
        source: "apache"
      },
      "application/x-font-framemaker": {
        source: "apache"
      },
      "application/x-font-ghostscript": {
        source: "apache",
        extensions: ["gsf"]
      },
      "application/x-font-libgrx": {
        source: "apache"
      },
      "application/x-font-linux-psf": {
        source: "apache",
        extensions: ["psf"]
      },
      "application/x-font-pcf": {
        source: "apache",
        extensions: ["pcf"]
      },
      "application/x-font-snf": {
        source: "apache",
        extensions: ["snf"]
      },
      "application/x-font-speedo": {
        source: "apache"
      },
      "application/x-font-sunos-news": {
        source: "apache"
      },
      "application/x-font-type1": {
        source: "apache",
        extensions: ["pfa", "pfb", "pfm", "afm"]
      },
      "application/x-font-vfont": {
        source: "apache"
      },
      "application/x-freearc": {
        source: "apache",
        extensions: ["arc"]
      },
      "application/x-futuresplash": {
        source: "apache",
        extensions: ["spl"]
      },
      "application/x-gca-compressed": {
        source: "apache",
        extensions: ["gca"]
      },
      "application/x-glulx": {
        source: "apache",
        extensions: ["ulx"]
      },
      "application/x-gnumeric": {
        source: "apache",
        extensions: ["gnumeric"]
      },
      "application/x-gramps-xml": {
        source: "apache",
        extensions: ["gramps"]
      },
      "application/x-gtar": {
        source: "apache",
        extensions: ["gtar"]
      },
      "application/x-gzip": {
        source: "apache"
      },
      "application/x-hdf": {
        source: "apache",
        extensions: ["hdf"]
      },
      "application/x-httpd-php": {
        compressible: true,
        extensions: ["php"]
      },
      "application/x-install-instructions": {
        source: "apache",
        extensions: ["install"]
      },
      "application/x-iso9660-image": {
        source: "apache",
        extensions: ["iso"]
      },
      "application/x-iwork-keynote-sffkey": {
        extensions: ["key"]
      },
      "application/x-iwork-numbers-sffnumbers": {
        extensions: ["numbers"]
      },
      "application/x-iwork-pages-sffpages": {
        extensions: ["pages"]
      },
      "application/x-java-archive-diff": {
        source: "nginx",
        extensions: ["jardiff"]
      },
      "application/x-java-jnlp-file": {
        source: "apache",
        compressible: false,
        extensions: ["jnlp"]
      },
      "application/x-javascript": {
        compressible: true
      },
      "application/x-keepass2": {
        extensions: ["kdbx"]
      },
      "application/x-latex": {
        source: "apache",
        compressible: false,
        extensions: ["latex"]
      },
      "application/x-lua-bytecode": {
        extensions: ["luac"]
      },
      "application/x-lzh-compressed": {
        source: "apache",
        extensions: ["lzh", "lha"]
      },
      "application/x-makeself": {
        source: "nginx",
        extensions: ["run"]
      },
      "application/x-mie": {
        source: "apache",
        extensions: ["mie"]
      },
      "application/x-mobipocket-ebook": {
        source: "apache",
        extensions: ["prc", "mobi"]
      },
      "application/x-mpegurl": {
        compressible: false
      },
      "application/x-ms-application": {
        source: "apache",
        extensions: ["application"]
      },
      "application/x-ms-shortcut": {
        source: "apache",
        extensions: ["lnk"]
      },
      "application/x-ms-wmd": {
        source: "apache",
        extensions: ["wmd"]
      },
      "application/x-ms-wmz": {
        source: "apache",
        extensions: ["wmz"]
      },
      "application/x-ms-xbap": {
        source: "apache",
        extensions: ["xbap"]
      },
      "application/x-msaccess": {
        source: "apache",
        extensions: ["mdb"]
      },
      "application/x-msbinder": {
        source: "apache",
        extensions: ["obd"]
      },
      "application/x-mscardfile": {
        source: "apache",
        extensions: ["crd"]
      },
      "application/x-msclip": {
        source: "apache",
        extensions: ["clp"]
      },
      "application/x-msdos-program": {
        extensions: ["exe"]
      },
      "application/x-msdownload": {
        source: "apache",
        extensions: ["exe", "dll", "com", "bat", "msi"]
      },
      "application/x-msmediaview": {
        source: "apache",
        extensions: ["mvb", "m13", "m14"]
      },
      "application/x-msmetafile": {
        source: "apache",
        extensions: ["wmf", "wmz", "emf", "emz"]
      },
      "application/x-msmoney": {
        source: "apache",
        extensions: ["mny"]
      },
      "application/x-mspublisher": {
        source: "apache",
        extensions: ["pub"]
      },
      "application/x-msschedule": {
        source: "apache",
        extensions: ["scd"]
      },
      "application/x-msterminal": {
        source: "apache",
        extensions: ["trm"]
      },
      "application/x-mswrite": {
        source: "apache",
        extensions: ["wri"]
      },
      "application/x-netcdf": {
        source: "apache",
        extensions: ["nc", "cdf"]
      },
      "application/x-ns-proxy-autoconfig": {
        compressible: true,
        extensions: ["pac"]
      },
      "application/x-nzb": {
        source: "apache",
        extensions: ["nzb"]
      },
      "application/x-perl": {
        source: "nginx",
        extensions: ["pl", "pm"]
      },
      "application/x-pilot": {
        source: "nginx",
        extensions: ["prc", "pdb"]
      },
      "application/x-pkcs12": {
        source: "apache",
        compressible: false,
        extensions: ["p12", "pfx"]
      },
      "application/x-pkcs7-certificates": {
        source: "apache",
        extensions: ["p7b", "spc"]
      },
      "application/x-pkcs7-certreqresp": {
        source: "apache",
        extensions: ["p7r"]
      },
      "application/x-pki-message": {
        source: "iana"
      },
      "application/x-rar-compressed": {
        source: "apache",
        compressible: false,
        extensions: ["rar"]
      },
      "application/x-redhat-package-manager": {
        source: "nginx",
        extensions: ["rpm"]
      },
      "application/x-research-info-systems": {
        source: "apache",
        extensions: ["ris"]
      },
      "application/x-sea": {
        source: "nginx",
        extensions: ["sea"]
      },
      "application/x-sh": {
        source: "apache",
        compressible: true,
        extensions: ["sh"]
      },
      "application/x-shar": {
        source: "apache",
        extensions: ["shar"]
      },
      "application/x-shockwave-flash": {
        source: "apache",
        compressible: false,
        extensions: ["swf"]
      },
      "application/x-silverlight-app": {
        source: "apache",
        extensions: ["xap"]
      },
      "application/x-sql": {
        source: "apache",
        extensions: ["sql"]
      },
      "application/x-stuffit": {
        source: "apache",
        compressible: false,
        extensions: ["sit"]
      },
      "application/x-stuffitx": {
        source: "apache",
        extensions: ["sitx"]
      },
      "application/x-subrip": {
        source: "apache",
        extensions: ["srt"]
      },
      "application/x-sv4cpio": {
        source: "apache",
        extensions: ["sv4cpio"]
      },
      "application/x-sv4crc": {
        source: "apache",
        extensions: ["sv4crc"]
      },
      "application/x-t3vm-image": {
        source: "apache",
        extensions: ["t3"]
      },
      "application/x-tads": {
        source: "apache",
        extensions: ["gam"]
      },
      "application/x-tar": {
        source: "apache",
        compressible: true,
        extensions: ["tar"]
      },
      "application/x-tcl": {
        source: "apache",
        extensions: ["tcl", "tk"]
      },
      "application/x-tex": {
        source: "apache",
        extensions: ["tex"]
      },
      "application/x-tex-tfm": {
        source: "apache",
        extensions: ["tfm"]
      },
      "application/x-texinfo": {
        source: "apache",
        extensions: ["texinfo", "texi"]
      },
      "application/x-tgif": {
        source: "apache",
        extensions: ["obj"]
      },
      "application/x-ustar": {
        source: "apache",
        extensions: ["ustar"]
      },
      "application/x-virtualbox-hdd": {
        compressible: true,
        extensions: ["hdd"]
      },
      "application/x-virtualbox-ova": {
        compressible: true,
        extensions: ["ova"]
      },
      "application/x-virtualbox-ovf": {
        compressible: true,
        extensions: ["ovf"]
      },
      "application/x-virtualbox-vbox": {
        compressible: true,
        extensions: ["vbox"]
      },
      "application/x-virtualbox-vbox-extpack": {
        compressible: false,
        extensions: ["vbox-extpack"]
      },
      "application/x-virtualbox-vdi": {
        compressible: true,
        extensions: ["vdi"]
      },
      "application/x-virtualbox-vhd": {
        compressible: true,
        extensions: ["vhd"]
      },
      "application/x-virtualbox-vmdk": {
        compressible: true,
        extensions: ["vmdk"]
      },
      "application/x-wais-source": {
        source: "apache",
        extensions: ["src"]
      },
      "application/x-web-app-manifest+json": {
        compressible: true,
        extensions: ["webapp"]
      },
      "application/x-www-form-urlencoded": {
        source: "iana",
        compressible: true
      },
      "application/x-x509-ca-cert": {
        source: "iana",
        extensions: ["der", "crt", "pem"]
      },
      "application/x-x509-ca-ra-cert": {
        source: "iana"
      },
      "application/x-x509-next-ca-cert": {
        source: "iana"
      },
      "application/x-xfig": {
        source: "apache",
        extensions: ["fig"]
      },
      "application/x-xliff+xml": {
        source: "apache",
        compressible: true,
        extensions: ["xlf"]
      },
      "application/x-xpinstall": {
        source: "apache",
        compressible: false,
        extensions: ["xpi"]
      },
      "application/x-xz": {
        source: "apache",
        extensions: ["xz"]
      },
      "application/x-zmachine": {
        source: "apache",
        extensions: ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"]
      },
      "application/x400-bp": {
        source: "iana"
      },
      "application/xacml+xml": {
        source: "iana",
        compressible: true
      },
      "application/xaml+xml": {
        source: "apache",
        compressible: true,
        extensions: ["xaml"]
      },
      "application/xcap-att+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xav"]
      },
      "application/xcap-caps+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xca"]
      },
      "application/xcap-diff+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xdf"]
      },
      "application/xcap-el+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xel"]
      },
      "application/xcap-error+xml": {
        source: "iana",
        compressible: true
      },
      "application/xcap-ns+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xns"]
      },
      "application/xcon-conference-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/xcon-conference-info-diff+xml": {
        source: "iana",
        compressible: true
      },
      "application/xenc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xenc"]
      },
      "application/xhtml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xhtml", "xht"]
      },
      "application/xhtml-voice+xml": {
        source: "apache",
        compressible: true
      },
      "application/xliff+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xlf"]
      },
      "application/xml": {
        source: "iana",
        compressible: true,
        extensions: ["xml", "xsl", "xsd", "rng"]
      },
      "application/xml-dtd": {
        source: "iana",
        compressible: true,
        extensions: ["dtd"]
      },
      "application/xml-external-parsed-entity": {
        source: "iana"
      },
      "application/xml-patch+xml": {
        source: "iana",
        compressible: true
      },
      "application/xmpp+xml": {
        source: "iana",
        compressible: true
      },
      "application/xop+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xop"]
      },
      "application/xproc+xml": {
        source: "apache",
        compressible: true,
        extensions: ["xpl"]
      },
      "application/xslt+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xsl", "xslt"]
      },
      "application/xspf+xml": {
        source: "apache",
        compressible: true,
        extensions: ["xspf"]
      },
      "application/xv+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mxml", "xhvml", "xvml", "xvm"]
      },
      "application/yang": {
        source: "iana",
        extensions: ["yang"]
      },
      "application/yang-data+json": {
        source: "iana",
        compressible: true
      },
      "application/yang-data+xml": {
        source: "iana",
        compressible: true
      },
      "application/yang-patch+json": {
        source: "iana",
        compressible: true
      },
      "application/yang-patch+xml": {
        source: "iana",
        compressible: true
      },
      "application/yin+xml": {
        source: "iana",
        compressible: true,
        extensions: ["yin"]
      },
      "application/zip": {
        source: "iana",
        compressible: false,
        extensions: ["zip"]
      },
      "application/zlib": {
        source: "iana"
      },
      "application/zstd": {
        source: "iana"
      },
      "audio/1d-interleaved-parityfec": {
        source: "iana"
      },
      "audio/32kadpcm": {
        source: "iana"
      },
      "audio/3gpp": {
        source: "iana",
        compressible: false,
        extensions: ["3gpp"]
      },
      "audio/3gpp2": {
        source: "iana"
      },
      "audio/aac": {
        source: "iana"
      },
      "audio/ac3": {
        source: "iana"
      },
      "audio/adpcm": {
        source: "apache",
        extensions: ["adp"]
      },
      "audio/amr": {
        source: "iana",
        extensions: ["amr"]
      },
      "audio/amr-wb": {
        source: "iana"
      },
      "audio/amr-wb+": {
        source: "iana"
      },
      "audio/aptx": {
        source: "iana"
      },
      "audio/asc": {
        source: "iana"
      },
      "audio/atrac-advanced-lossless": {
        source: "iana"
      },
      "audio/atrac-x": {
        source: "iana"
      },
      "audio/atrac3": {
        source: "iana"
      },
      "audio/basic": {
        source: "iana",
        compressible: false,
        extensions: ["au", "snd"]
      },
      "audio/bv16": {
        source: "iana"
      },
      "audio/bv32": {
        source: "iana"
      },
      "audio/clearmode": {
        source: "iana"
      },
      "audio/cn": {
        source: "iana"
      },
      "audio/dat12": {
        source: "iana"
      },
      "audio/dls": {
        source: "iana"
      },
      "audio/dsr-es201108": {
        source: "iana"
      },
      "audio/dsr-es202050": {
        source: "iana"
      },
      "audio/dsr-es202211": {
        source: "iana"
      },
      "audio/dsr-es202212": {
        source: "iana"
      },
      "audio/dv": {
        source: "iana"
      },
      "audio/dvi4": {
        source: "iana"
      },
      "audio/eac3": {
        source: "iana"
      },
      "audio/encaprtp": {
        source: "iana"
      },
      "audio/evrc": {
        source: "iana"
      },
      "audio/evrc-qcp": {
        source: "iana"
      },
      "audio/evrc0": {
        source: "iana"
      },
      "audio/evrc1": {
        source: "iana"
      },
      "audio/evrcb": {
        source: "iana"
      },
      "audio/evrcb0": {
        source: "iana"
      },
      "audio/evrcb1": {
        source: "iana"
      },
      "audio/evrcnw": {
        source: "iana"
      },
      "audio/evrcnw0": {
        source: "iana"
      },
      "audio/evrcnw1": {
        source: "iana"
      },
      "audio/evrcwb": {
        source: "iana"
      },
      "audio/evrcwb0": {
        source: "iana"
      },
      "audio/evrcwb1": {
        source: "iana"
      },
      "audio/evs": {
        source: "iana"
      },
      "audio/flexfec": {
        source: "iana"
      },
      "audio/fwdred": {
        source: "iana"
      },
      "audio/g711-0": {
        source: "iana"
      },
      "audio/g719": {
        source: "iana"
      },
      "audio/g722": {
        source: "iana"
      },
      "audio/g7221": {
        source: "iana"
      },
      "audio/g723": {
        source: "iana"
      },
      "audio/g726-16": {
        source: "iana"
      },
      "audio/g726-24": {
        source: "iana"
      },
      "audio/g726-32": {
        source: "iana"
      },
      "audio/g726-40": {
        source: "iana"
      },
      "audio/g728": {
        source: "iana"
      },
      "audio/g729": {
        source: "iana"
      },
      "audio/g7291": {
        source: "iana"
      },
      "audio/g729d": {
        source: "iana"
      },
      "audio/g729e": {
        source: "iana"
      },
      "audio/gsm": {
        source: "iana"
      },
      "audio/gsm-efr": {
        source: "iana"
      },
      "audio/gsm-hr-08": {
        source: "iana"
      },
      "audio/ilbc": {
        source: "iana"
      },
      "audio/ip-mr_v2.5": {
        source: "iana"
      },
      "audio/isac": {
        source: "apache"
      },
      "audio/l16": {
        source: "iana"
      },
      "audio/l20": {
        source: "iana"
      },
      "audio/l24": {
        source: "iana",
        compressible: false
      },
      "audio/l8": {
        source: "iana"
      },
      "audio/lpc": {
        source: "iana"
      },
      "audio/melp": {
        source: "iana"
      },
      "audio/melp1200": {
        source: "iana"
      },
      "audio/melp2400": {
        source: "iana"
      },
      "audio/melp600": {
        source: "iana"
      },
      "audio/mhas": {
        source: "iana"
      },
      "audio/midi": {
        source: "apache",
        extensions: ["mid", "midi", "kar", "rmi"]
      },
      "audio/mobile-xmf": {
        source: "iana",
        extensions: ["mxmf"]
      },
      "audio/mp3": {
        compressible: false,
        extensions: ["mp3"]
      },
      "audio/mp4": {
        source: "iana",
        compressible: false,
        extensions: ["m4a", "mp4a"]
      },
      "audio/mp4a-latm": {
        source: "iana"
      },
      "audio/mpa": {
        source: "iana"
      },
      "audio/mpa-robust": {
        source: "iana"
      },
      "audio/mpeg": {
        source: "iana",
        compressible: false,
        extensions: ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"]
      },
      "audio/mpeg4-generic": {
        source: "iana"
      },
      "audio/musepack": {
        source: "apache"
      },
      "audio/ogg": {
        source: "iana",
        compressible: false,
        extensions: ["oga", "ogg", "spx", "opus"]
      },
      "audio/opus": {
        source: "iana"
      },
      "audio/parityfec": {
        source: "iana"
      },
      "audio/pcma": {
        source: "iana"
      },
      "audio/pcma-wb": {
        source: "iana"
      },
      "audio/pcmu": {
        source: "iana"
      },
      "audio/pcmu-wb": {
        source: "iana"
      },
      "audio/prs.sid": {
        source: "iana"
      },
      "audio/qcelp": {
        source: "iana"
      },
      "audio/raptorfec": {
        source: "iana"
      },
      "audio/red": {
        source: "iana"
      },
      "audio/rtp-enc-aescm128": {
        source: "iana"
      },
      "audio/rtp-midi": {
        source: "iana"
      },
      "audio/rtploopback": {
        source: "iana"
      },
      "audio/rtx": {
        source: "iana"
      },
      "audio/s3m": {
        source: "apache",
        extensions: ["s3m"]
      },
      "audio/scip": {
        source: "iana"
      },
      "audio/silk": {
        source: "apache",
        extensions: ["sil"]
      },
      "audio/smv": {
        source: "iana"
      },
      "audio/smv-qcp": {
        source: "iana"
      },
      "audio/smv0": {
        source: "iana"
      },
      "audio/sofa": {
        source: "iana"
      },
      "audio/sp-midi": {
        source: "iana"
      },
      "audio/speex": {
        source: "iana"
      },
      "audio/t140c": {
        source: "iana"
      },
      "audio/t38": {
        source: "iana"
      },
      "audio/telephone-event": {
        source: "iana"
      },
      "audio/tetra_acelp": {
        source: "iana"
      },
      "audio/tetra_acelp_bb": {
        source: "iana"
      },
      "audio/tone": {
        source: "iana"
      },
      "audio/tsvcis": {
        source: "iana"
      },
      "audio/uemclip": {
        source: "iana"
      },
      "audio/ulpfec": {
        source: "iana"
      },
      "audio/usac": {
        source: "iana"
      },
      "audio/vdvi": {
        source: "iana"
      },
      "audio/vmr-wb": {
        source: "iana"
      },
      "audio/vnd.3gpp.iufp": {
        source: "iana"
      },
      "audio/vnd.4sb": {
        source: "iana"
      },
      "audio/vnd.audiokoz": {
        source: "iana"
      },
      "audio/vnd.celp": {
        source: "iana"
      },
      "audio/vnd.cisco.nse": {
        source: "iana"
      },
      "audio/vnd.cmles.radio-events": {
        source: "iana"
      },
      "audio/vnd.cns.anp1": {
        source: "iana"
      },
      "audio/vnd.cns.inf1": {
        source: "iana"
      },
      "audio/vnd.dece.audio": {
        source: "iana",
        extensions: ["uva", "uvva"]
      },
      "audio/vnd.digital-winds": {
        source: "iana",
        extensions: ["eol"]
      },
      "audio/vnd.dlna.adts": {
        source: "iana"
      },
      "audio/vnd.dolby.heaac.1": {
        source: "iana"
      },
      "audio/vnd.dolby.heaac.2": {
        source: "iana"
      },
      "audio/vnd.dolby.mlp": {
        source: "iana"
      },
      "audio/vnd.dolby.mps": {
        source: "iana"
      },
      "audio/vnd.dolby.pl2": {
        source: "iana"
      },
      "audio/vnd.dolby.pl2x": {
        source: "iana"
      },
      "audio/vnd.dolby.pl2z": {
        source: "iana"
      },
      "audio/vnd.dolby.pulse.1": {
        source: "iana"
      },
      "audio/vnd.dra": {
        source: "iana",
        extensions: ["dra"]
      },
      "audio/vnd.dts": {
        source: "iana",
        extensions: ["dts"]
      },
      "audio/vnd.dts.hd": {
        source: "iana",
        extensions: ["dtshd"]
      },
      "audio/vnd.dts.uhd": {
        source: "iana"
      },
      "audio/vnd.dvb.file": {
        source: "iana"
      },
      "audio/vnd.everad.plj": {
        source: "iana"
      },
      "audio/vnd.hns.audio": {
        source: "iana"
      },
      "audio/vnd.lucent.voice": {
        source: "iana",
        extensions: ["lvp"]
      },
      "audio/vnd.ms-playready.media.pya": {
        source: "iana",
        extensions: ["pya"]
      },
      "audio/vnd.nokia.mobile-xmf": {
        source: "iana"
      },
      "audio/vnd.nortel.vbk": {
        source: "iana"
      },
      "audio/vnd.nuera.ecelp4800": {
        source: "iana",
        extensions: ["ecelp4800"]
      },
      "audio/vnd.nuera.ecelp7470": {
        source: "iana",
        extensions: ["ecelp7470"]
      },
      "audio/vnd.nuera.ecelp9600": {
        source: "iana",
        extensions: ["ecelp9600"]
      },
      "audio/vnd.octel.sbc": {
        source: "iana"
      },
      "audio/vnd.presonus.multitrack": {
        source: "iana"
      },
      "audio/vnd.qcelp": {
        source: "iana"
      },
      "audio/vnd.rhetorex.32kadpcm": {
        source: "iana"
      },
      "audio/vnd.rip": {
        source: "iana",
        extensions: ["rip"]
      },
      "audio/vnd.rn-realaudio": {
        compressible: false
      },
      "audio/vnd.sealedmedia.softseal.mpeg": {
        source: "iana"
      },
      "audio/vnd.vmx.cvsd": {
        source: "iana"
      },
      "audio/vnd.wave": {
        compressible: false
      },
      "audio/vorbis": {
        source: "iana",
        compressible: false
      },
      "audio/vorbis-config": {
        source: "iana"
      },
      "audio/wav": {
        compressible: false,
        extensions: ["wav"]
      },
      "audio/wave": {
        compressible: false,
        extensions: ["wav"]
      },
      "audio/webm": {
        source: "apache",
        compressible: false,
        extensions: ["weba"]
      },
      "audio/x-aac": {
        source: "apache",
        compressible: false,
        extensions: ["aac"]
      },
      "audio/x-aiff": {
        source: "apache",
        extensions: ["aif", "aiff", "aifc"]
      },
      "audio/x-caf": {
        source: "apache",
        compressible: false,
        extensions: ["caf"]
      },
      "audio/x-flac": {
        source: "apache",
        extensions: ["flac"]
      },
      "audio/x-m4a": {
        source: "nginx",
        extensions: ["m4a"]
      },
      "audio/x-matroska": {
        source: "apache",
        extensions: ["mka"]
      },
      "audio/x-mpegurl": {
        source: "apache",
        extensions: ["m3u"]
      },
      "audio/x-ms-wax": {
        source: "apache",
        extensions: ["wax"]
      },
      "audio/x-ms-wma": {
        source: "apache",
        extensions: ["wma"]
      },
      "audio/x-pn-realaudio": {
        source: "apache",
        extensions: ["ram", "ra"]
      },
      "audio/x-pn-realaudio-plugin": {
        source: "apache",
        extensions: ["rmp"]
      },
      "audio/x-realaudio": {
        source: "nginx",
        extensions: ["ra"]
      },
      "audio/x-tta": {
        source: "apache"
      },
      "audio/x-wav": {
        source: "apache",
        extensions: ["wav"]
      },
      "audio/xm": {
        source: "apache",
        extensions: ["xm"]
      },
      "chemical/x-cdx": {
        source: "apache",
        extensions: ["cdx"]
      },
      "chemical/x-cif": {
        source: "apache",
        extensions: ["cif"]
      },
      "chemical/x-cmdf": {
        source: "apache",
        extensions: ["cmdf"]
      },
      "chemical/x-cml": {
        source: "apache",
        extensions: ["cml"]
      },
      "chemical/x-csml": {
        source: "apache",
        extensions: ["csml"]
      },
      "chemical/x-pdb": {
        source: "apache"
      },
      "chemical/x-xyz": {
        source: "apache",
        extensions: ["xyz"]
      },
      "font/collection": {
        source: "iana",
        extensions: ["ttc"]
      },
      "font/otf": {
        source: "iana",
        compressible: true,
        extensions: ["otf"]
      },
      "font/sfnt": {
        source: "iana"
      },
      "font/ttf": {
        source: "iana",
        compressible: true,
        extensions: ["ttf"]
      },
      "font/woff": {
        source: "iana",
        extensions: ["woff"]
      },
      "font/woff2": {
        source: "iana",
        extensions: ["woff2"]
      },
      "image/aces": {
        source: "iana",
        extensions: ["exr"]
      },
      "image/apng": {
        compressible: false,
        extensions: ["apng"]
      },
      "image/avci": {
        source: "iana"
      },
      "image/avcs": {
        source: "iana"
      },
      "image/avif": {
        source: "iana",
        compressible: false,
        extensions: ["avif"]
      },
      "image/bmp": {
        source: "iana",
        compressible: true,
        extensions: ["bmp"]
      },
      "image/cgm": {
        source: "iana",
        extensions: ["cgm"]
      },
      "image/dicom-rle": {
        source: "iana",
        extensions: ["drle"]
      },
      "image/emf": {
        source: "iana",
        extensions: ["emf"]
      },
      "image/fits": {
        source: "iana",
        extensions: ["fits"]
      },
      "image/g3fax": {
        source: "iana",
        extensions: ["g3"]
      },
      "image/gif": {
        source: "iana",
        compressible: false,
        extensions: ["gif"]
      },
      "image/heic": {
        source: "iana",
        extensions: ["heic"]
      },
      "image/heic-sequence": {
        source: "iana",
        extensions: ["heics"]
      },
      "image/heif": {
        source: "iana",
        extensions: ["heif"]
      },
      "image/heif-sequence": {
        source: "iana",
        extensions: ["heifs"]
      },
      "image/hej2k": {
        source: "iana",
        extensions: ["hej2"]
      },
      "image/hsj2": {
        source: "iana",
        extensions: ["hsj2"]
      },
      "image/ief": {
        source: "iana",
        extensions: ["ief"]
      },
      "image/jls": {
        source: "iana",
        extensions: ["jls"]
      },
      "image/jp2": {
        source: "iana",
        compressible: false,
        extensions: ["jp2", "jpg2"]
      },
      "image/jpeg": {
        source: "iana",
        compressible: false,
        extensions: ["jpeg", "jpg", "jpe"]
      },
      "image/jph": {
        source: "iana",
        extensions: ["jph"]
      },
      "image/jphc": {
        source: "iana",
        extensions: ["jhc"]
      },
      "image/jpm": {
        source: "iana",
        compressible: false,
        extensions: ["jpm"]
      },
      "image/jpx": {
        source: "iana",
        compressible: false,
        extensions: ["jpx", "jpf"]
      },
      "image/jxr": {
        source: "iana",
        extensions: ["jxr"]
      },
      "image/jxra": {
        source: "iana",
        extensions: ["jxra"]
      },
      "image/jxrs": {
        source: "iana",
        extensions: ["jxrs"]
      },
      "image/jxs": {
        source: "iana",
        extensions: ["jxs"]
      },
      "image/jxsc": {
        source: "iana",
        extensions: ["jxsc"]
      },
      "image/jxsi": {
        source: "iana",
        extensions: ["jxsi"]
      },
      "image/jxss": {
        source: "iana",
        extensions: ["jxss"]
      },
      "image/ktx": {
        source: "iana",
        extensions: ["ktx"]
      },
      "image/ktx2": {
        source: "iana",
        extensions: ["ktx2"]
      },
      "image/naplps": {
        source: "iana"
      },
      "image/pjpeg": {
        compressible: false
      },
      "image/png": {
        source: "iana",
        compressible: false,
        extensions: ["png"]
      },
      "image/prs.btif": {
        source: "iana",
        extensions: ["btif"]
      },
      "image/prs.pti": {
        source: "iana",
        extensions: ["pti"]
      },
      "image/pwg-raster": {
        source: "iana"
      },
      "image/sgi": {
        source: "apache",
        extensions: ["sgi"]
      },
      "image/svg+xml": {
        source: "iana",
        compressible: true,
        extensions: ["svg", "svgz"]
      },
      "image/t38": {
        source: "iana",
        extensions: ["t38"]
      },
      "image/tiff": {
        source: "iana",
        compressible: false,
        extensions: ["tif", "tiff"]
      },
      "image/tiff-fx": {
        source: "iana",
        extensions: ["tfx"]
      },
      "image/vnd.adobe.photoshop": {
        source: "iana",
        compressible: true,
        extensions: ["psd"]
      },
      "image/vnd.airzip.accelerator.azv": {
        source: "iana",
        extensions: ["azv"]
      },
      "image/vnd.cns.inf2": {
        source: "iana"
      },
      "image/vnd.dece.graphic": {
        source: "iana",
        extensions: ["uvi", "uvvi", "uvg", "uvvg"]
      },
      "image/vnd.djvu": {
        source: "iana",
        extensions: ["djvu", "djv"]
      },
      "image/vnd.dvb.subtitle": {
        source: "iana",
        extensions: ["sub"]
      },
      "image/vnd.dwg": {
        source: "iana",
        extensions: ["dwg"]
      },
      "image/vnd.dxf": {
        source: "iana",
        extensions: ["dxf"]
      },
      "image/vnd.fastbidsheet": {
        source: "iana",
        extensions: ["fbs"]
      },
      "image/vnd.fpx": {
        source: "iana",
        extensions: ["fpx"]
      },
      "image/vnd.fst": {
        source: "iana",
        extensions: ["fst"]
      },
      "image/vnd.fujixerox.edmics-mmr": {
        source: "iana",
        extensions: ["mmr"]
      },
      "image/vnd.fujixerox.edmics-rlc": {
        source: "iana",
        extensions: ["rlc"]
      },
      "image/vnd.globalgraphics.pgb": {
        source: "iana"
      },
      "image/vnd.microsoft.icon": {
        source: "iana",
        compressible: true,
        extensions: ["ico"]
      },
      "image/vnd.mix": {
        source: "iana"
      },
      "image/vnd.mozilla.apng": {
        source: "iana"
      },
      "image/vnd.ms-dds": {
        compressible: true,
        extensions: ["dds"]
      },
      "image/vnd.ms-modi": {
        source: "iana",
        extensions: ["mdi"]
      },
      "image/vnd.ms-photo": {
        source: "apache",
        extensions: ["wdp"]
      },
      "image/vnd.net-fpx": {
        source: "iana",
        extensions: ["npx"]
      },
      "image/vnd.pco.b16": {
        source: "iana",
        extensions: ["b16"]
      },
      "image/vnd.radiance": {
        source: "iana"
      },
      "image/vnd.sealed.png": {
        source: "iana"
      },
      "image/vnd.sealedmedia.softseal.gif": {
        source: "iana"
      },
      "image/vnd.sealedmedia.softseal.jpg": {
        source: "iana"
      },
      "image/vnd.svf": {
        source: "iana"
      },
      "image/vnd.tencent.tap": {
        source: "iana",
        extensions: ["tap"]
      },
      "image/vnd.valve.source.texture": {
        source: "iana",
        extensions: ["vtf"]
      },
      "image/vnd.wap.wbmp": {
        source: "iana",
        extensions: ["wbmp"]
      },
      "image/vnd.xiff": {
        source: "iana",
        extensions: ["xif"]
      },
      "image/vnd.zbrush.pcx": {
        source: "iana",
        extensions: ["pcx"]
      },
      "image/webp": {
        source: "apache",
        extensions: ["webp"]
      },
      "image/wmf": {
        source: "iana",
        extensions: ["wmf"]
      },
      "image/x-3ds": {
        source: "apache",
        extensions: ["3ds"]
      },
      "image/x-cmu-raster": {
        source: "apache",
        extensions: ["ras"]
      },
      "image/x-cmx": {
        source: "apache",
        extensions: ["cmx"]
      },
      "image/x-freehand": {
        source: "apache",
        extensions: ["fh", "fhc", "fh4", "fh5", "fh7"]
      },
      "image/x-icon": {
        source: "apache",
        compressible: true,
        extensions: ["ico"]
      },
      "image/x-jng": {
        source: "nginx",
        extensions: ["jng"]
      },
      "image/x-mrsid-image": {
        source: "apache",
        extensions: ["sid"]
      },
      "image/x-ms-bmp": {
        source: "nginx",
        compressible: true,
        extensions: ["bmp"]
      },
      "image/x-pcx": {
        source: "apache",
        extensions: ["pcx"]
      },
      "image/x-pict": {
        source: "apache",
        extensions: ["pic", "pct"]
      },
      "image/x-portable-anymap": {
        source: "apache",
        extensions: ["pnm"]
      },
      "image/x-portable-bitmap": {
        source: "apache",
        extensions: ["pbm"]
      },
      "image/x-portable-graymap": {
        source: "apache",
        extensions: ["pgm"]
      },
      "image/x-portable-pixmap": {
        source: "apache",
        extensions: ["ppm"]
      },
      "image/x-rgb": {
        source: "apache",
        extensions: ["rgb"]
      },
      "image/x-tga": {
        source: "apache",
        extensions: ["tga"]
      },
      "image/x-xbitmap": {
        source: "apache",
        extensions: ["xbm"]
      },
      "image/x-xcf": {
        compressible: false
      },
      "image/x-xpixmap": {
        source: "apache",
        extensions: ["xpm"]
      },
      "image/x-xwindowdump": {
        source: "apache",
        extensions: ["xwd"]
      },
      "message/cpim": {
        source: "iana"
      },
      "message/delivery-status": {
        source: "iana"
      },
      "message/disposition-notification": {
        source: "iana",
        extensions: [
          "disposition-notification"
        ]
      },
      "message/external-body": {
        source: "iana"
      },
      "message/feedback-report": {
        source: "iana"
      },
      "message/global": {
        source: "iana",
        extensions: ["u8msg"]
      },
      "message/global-delivery-status": {
        source: "iana",
        extensions: ["u8dsn"]
      },
      "message/global-disposition-notification": {
        source: "iana",
        extensions: ["u8mdn"]
      },
      "message/global-headers": {
        source: "iana",
        extensions: ["u8hdr"]
      },
      "message/http": {
        source: "iana",
        compressible: false
      },
      "message/imdn+xml": {
        source: "iana",
        compressible: true
      },
      "message/news": {
        source: "iana"
      },
      "message/partial": {
        source: "iana",
        compressible: false
      },
      "message/rfc822": {
        source: "iana",
        compressible: true,
        extensions: ["eml", "mime"]
      },
      "message/s-http": {
        source: "iana"
      },
      "message/sip": {
        source: "iana"
      },
      "message/sipfrag": {
        source: "iana"
      },
      "message/tracking-status": {
        source: "iana"
      },
      "message/vnd.si.simp": {
        source: "iana"
      },
      "message/vnd.wfa.wsc": {
        source: "iana",
        extensions: ["wsc"]
      },
      "model/3mf": {
        source: "iana",
        extensions: ["3mf"]
      },
      "model/e57": {
        source: "iana"
      },
      "model/gltf+json": {
        source: "iana",
        compressible: true,
        extensions: ["gltf"]
      },
      "model/gltf-binary": {
        source: "iana",
        compressible: true,
        extensions: ["glb"]
      },
      "model/iges": {
        source: "iana",
        compressible: false,
        extensions: ["igs", "iges"]
      },
      "model/mesh": {
        source: "iana",
        compressible: false,
        extensions: ["msh", "mesh", "silo"]
      },
      "model/mtl": {
        source: "iana",
        extensions: ["mtl"]
      },
      "model/obj": {
        source: "iana",
        extensions: ["obj"]
      },
      "model/step": {
        source: "iana"
      },
      "model/step+xml": {
        source: "iana",
        compressible: true,
        extensions: ["stpx"]
      },
      "model/step+zip": {
        source: "iana",
        compressible: false,
        extensions: ["stpz"]
      },
      "model/step-xml+zip": {
        source: "iana",
        compressible: false,
        extensions: ["stpxz"]
      },
      "model/stl": {
        source: "iana",
        extensions: ["stl"]
      },
      "model/vnd.collada+xml": {
        source: "iana",
        compressible: true,
        extensions: ["dae"]
      },
      "model/vnd.dwf": {
        source: "iana",
        extensions: ["dwf"]
      },
      "model/vnd.flatland.3dml": {
        source: "iana"
      },
      "model/vnd.gdl": {
        source: "iana",
        extensions: ["gdl"]
      },
      "model/vnd.gs-gdl": {
        source: "apache"
      },
      "model/vnd.gs.gdl": {
        source: "iana"
      },
      "model/vnd.gtw": {
        source: "iana",
        extensions: ["gtw"]
      },
      "model/vnd.moml+xml": {
        source: "iana",
        compressible: true
      },
      "model/vnd.mts": {
        source: "iana",
        extensions: ["mts"]
      },
      "model/vnd.opengex": {
        source: "iana",
        extensions: ["ogex"]
      },
      "model/vnd.parasolid.transmit.binary": {
        source: "iana",
        extensions: ["x_b"]
      },
      "model/vnd.parasolid.transmit.text": {
        source: "iana",
        extensions: ["x_t"]
      },
      "model/vnd.pytha.pyox": {
        source: "iana"
      },
      "model/vnd.rosette.annotated-data-model": {
        source: "iana"
      },
      "model/vnd.sap.vds": {
        source: "iana",
        extensions: ["vds"]
      },
      "model/vnd.usdz+zip": {
        source: "iana",
        compressible: false,
        extensions: ["usdz"]
      },
      "model/vnd.valve.source.compiled-map": {
        source: "iana",
        extensions: ["bsp"]
      },
      "model/vnd.vtu": {
        source: "iana",
        extensions: ["vtu"]
      },
      "model/vrml": {
        source: "iana",
        compressible: false,
        extensions: ["wrl", "vrml"]
      },
      "model/x3d+binary": {
        source: "apache",
        compressible: false,
        extensions: ["x3db", "x3dbz"]
      },
      "model/x3d+fastinfoset": {
        source: "iana",
        extensions: ["x3db"]
      },
      "model/x3d+vrml": {
        source: "apache",
        compressible: false,
        extensions: ["x3dv", "x3dvz"]
      },
      "model/x3d+xml": {
        source: "iana",
        compressible: true,
        extensions: ["x3d", "x3dz"]
      },
      "model/x3d-vrml": {
        source: "iana",
        extensions: ["x3dv"]
      },
      "multipart/alternative": {
        source: "iana",
        compressible: false
      },
      "multipart/appledouble": {
        source: "iana"
      },
      "multipart/byteranges": {
        source: "iana"
      },
      "multipart/digest": {
        source: "iana"
      },
      "multipart/encrypted": {
        source: "iana",
        compressible: false
      },
      "multipart/form-data": {
        source: "iana",
        compressible: false
      },
      "multipart/header-set": {
        source: "iana"
      },
      "multipart/mixed": {
        source: "iana"
      },
      "multipart/multilingual": {
        source: "iana"
      },
      "multipart/parallel": {
        source: "iana"
      },
      "multipart/related": {
        source: "iana",
        compressible: false
      },
      "multipart/report": {
        source: "iana"
      },
      "multipart/signed": {
        source: "iana",
        compressible: false
      },
      "multipart/vnd.bint.med-plus": {
        source: "iana"
      },
      "multipart/voice-message": {
        source: "iana"
      },
      "multipart/x-mixed-replace": {
        source: "iana"
      },
      "text/1d-interleaved-parityfec": {
        source: "iana"
      },
      "text/cache-manifest": {
        source: "iana",
        compressible: true,
        extensions: ["appcache", "manifest"]
      },
      "text/calendar": {
        source: "iana",
        extensions: ["ics", "ifb"]
      },
      "text/calender": {
        compressible: true
      },
      "text/cmd": {
        compressible: true
      },
      "text/coffeescript": {
        extensions: ["coffee", "litcoffee"]
      },
      "text/cql": {
        source: "iana"
      },
      "text/cql-expression": {
        source: "iana"
      },
      "text/cql-identifier": {
        source: "iana"
      },
      "text/css": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["css"]
      },
      "text/csv": {
        source: "iana",
        compressible: true,
        extensions: ["csv"]
      },
      "text/csv-schema": {
        source: "iana"
      },
      "text/directory": {
        source: "iana"
      },
      "text/dns": {
        source: "iana"
      },
      "text/ecmascript": {
        source: "iana"
      },
      "text/encaprtp": {
        source: "iana"
      },
      "text/enriched": {
        source: "iana"
      },
      "text/fhirpath": {
        source: "iana"
      },
      "text/flexfec": {
        source: "iana"
      },
      "text/fwdred": {
        source: "iana"
      },
      "text/gff3": {
        source: "iana"
      },
      "text/grammar-ref-list": {
        source: "iana"
      },
      "text/html": {
        source: "iana",
        compressible: true,
        extensions: ["html", "htm", "shtml"]
      },
      "text/jade": {
        extensions: ["jade"]
      },
      "text/javascript": {
        source: "iana",
        compressible: true
      },
      "text/jcr-cnd": {
        source: "iana"
      },
      "text/jsx": {
        compressible: true,
        extensions: ["jsx"]
      },
      "text/less": {
        compressible: true,
        extensions: ["less"]
      },
      "text/markdown": {
        source: "iana",
        compressible: true,
        extensions: ["markdown", "md"]
      },
      "text/mathml": {
        source: "nginx",
        extensions: ["mml"]
      },
      "text/mdx": {
        compressible: true,
        extensions: ["mdx"]
      },
      "text/mizar": {
        source: "iana"
      },
      "text/n3": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["n3"]
      },
      "text/parameters": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/parityfec": {
        source: "iana"
      },
      "text/plain": {
        source: "iana",
        compressible: true,
        extensions: ["txt", "text", "conf", "def", "list", "log", "in", "ini"]
      },
      "text/provenance-notation": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/prs.fallenstein.rst": {
        source: "iana"
      },
      "text/prs.lines.tag": {
        source: "iana",
        extensions: ["dsc"]
      },
      "text/prs.prop.logic": {
        source: "iana"
      },
      "text/raptorfec": {
        source: "iana"
      },
      "text/red": {
        source: "iana"
      },
      "text/rfc822-headers": {
        source: "iana"
      },
      "text/richtext": {
        source: "iana",
        compressible: true,
        extensions: ["rtx"]
      },
      "text/rtf": {
        source: "iana",
        compressible: true,
        extensions: ["rtf"]
      },
      "text/rtp-enc-aescm128": {
        source: "iana"
      },
      "text/rtploopback": {
        source: "iana"
      },
      "text/rtx": {
        source: "iana"
      },
      "text/sgml": {
        source: "iana",
        extensions: ["sgml", "sgm"]
      },
      "text/shaclc": {
        source: "iana"
      },
      "text/shex": {
        source: "iana",
        extensions: ["shex"]
      },
      "text/slim": {
        extensions: ["slim", "slm"]
      },
      "text/spdx": {
        source: "iana",
        extensions: ["spdx"]
      },
      "text/strings": {
        source: "iana"
      },
      "text/stylus": {
        extensions: ["stylus", "styl"]
      },
      "text/t140": {
        source: "iana"
      },
      "text/tab-separated-values": {
        source: "iana",
        compressible: true,
        extensions: ["tsv"]
      },
      "text/troff": {
        source: "iana",
        extensions: ["t", "tr", "roff", "man", "me", "ms"]
      },
      "text/turtle": {
        source: "iana",
        charset: "UTF-8",
        extensions: ["ttl"]
      },
      "text/ulpfec": {
        source: "iana"
      },
      "text/uri-list": {
        source: "iana",
        compressible: true,
        extensions: ["uri", "uris", "urls"]
      },
      "text/vcard": {
        source: "iana",
        compressible: true,
        extensions: ["vcard"]
      },
      "text/vnd.a": {
        source: "iana"
      },
      "text/vnd.abc": {
        source: "iana"
      },
      "text/vnd.ascii-art": {
        source: "iana"
      },
      "text/vnd.curl": {
        source: "iana",
        extensions: ["curl"]
      },
      "text/vnd.curl.dcurl": {
        source: "apache",
        extensions: ["dcurl"]
      },
      "text/vnd.curl.mcurl": {
        source: "apache",
        extensions: ["mcurl"]
      },
      "text/vnd.curl.scurl": {
        source: "apache",
        extensions: ["scurl"]
      },
      "text/vnd.debian.copyright": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/vnd.dmclientscript": {
        source: "iana"
      },
      "text/vnd.dvb.subtitle": {
        source: "iana",
        extensions: ["sub"]
      },
      "text/vnd.esmertec.theme-descriptor": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/vnd.familysearch.gedcom": {
        source: "iana",
        extensions: ["ged"]
      },
      "text/vnd.ficlab.flt": {
        source: "iana"
      },
      "text/vnd.fly": {
        source: "iana",
        extensions: ["fly"]
      },
      "text/vnd.fmi.flexstor": {
        source: "iana",
        extensions: ["flx"]
      },
      "text/vnd.gml": {
        source: "iana"
      },
      "text/vnd.graphviz": {
        source: "iana",
        extensions: ["gv"]
      },
      "text/vnd.hans": {
        source: "iana"
      },
      "text/vnd.hgl": {
        source: "iana"
      },
      "text/vnd.in3d.3dml": {
        source: "iana",
        extensions: ["3dml"]
      },
      "text/vnd.in3d.spot": {
        source: "iana",
        extensions: ["spot"]
      },
      "text/vnd.iptc.newsml": {
        source: "iana"
      },
      "text/vnd.iptc.nitf": {
        source: "iana"
      },
      "text/vnd.latex-z": {
        source: "iana"
      },
      "text/vnd.motorola.reflex": {
        source: "iana"
      },
      "text/vnd.ms-mediapackage": {
        source: "iana"
      },
      "text/vnd.net2phone.commcenter.command": {
        source: "iana"
      },
      "text/vnd.radisys.msml-basic-layout": {
        source: "iana"
      },
      "text/vnd.senx.warpscript": {
        source: "iana"
      },
      "text/vnd.si.uricatalogue": {
        source: "iana"
      },
      "text/vnd.sosi": {
        source: "iana"
      },
      "text/vnd.sun.j2me.app-descriptor": {
        source: "iana",
        charset: "UTF-8",
        extensions: ["jad"]
      },
      "text/vnd.trolltech.linguist": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/vnd.wap.si": {
        source: "iana"
      },
      "text/vnd.wap.sl": {
        source: "iana"
      },
      "text/vnd.wap.wml": {
        source: "iana",
        extensions: ["wml"]
      },
      "text/vnd.wap.wmlscript": {
        source: "iana",
        extensions: ["wmls"]
      },
      "text/vtt": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["vtt"]
      },
      "text/x-asm": {
        source: "apache",
        extensions: ["s", "asm"]
      },
      "text/x-c": {
        source: "apache",
        extensions: ["c", "cc", "cxx", "cpp", "h", "hh", "dic"]
      },
      "text/x-component": {
        source: "nginx",
        extensions: ["htc"]
      },
      "text/x-fortran": {
        source: "apache",
        extensions: ["f", "for", "f77", "f90"]
      },
      "text/x-gwt-rpc": {
        compressible: true
      },
      "text/x-handlebars-template": {
        extensions: ["hbs"]
      },
      "text/x-java-source": {
        source: "apache",
        extensions: ["java"]
      },
      "text/x-jquery-tmpl": {
        compressible: true
      },
      "text/x-lua": {
        extensions: ["lua"]
      },
      "text/x-markdown": {
        compressible: true,
        extensions: ["mkd"]
      },
      "text/x-nfo": {
        source: "apache",
        extensions: ["nfo"]
      },
      "text/x-opml": {
        source: "apache",
        extensions: ["opml"]
      },
      "text/x-org": {
        compressible: true,
        extensions: ["org"]
      },
      "text/x-pascal": {
        source: "apache",
        extensions: ["p", "pas"]
      },
      "text/x-processing": {
        compressible: true,
        extensions: ["pde"]
      },
      "text/x-sass": {
        extensions: ["sass"]
      },
      "text/x-scss": {
        extensions: ["scss"]
      },
      "text/x-setext": {
        source: "apache",
        extensions: ["etx"]
      },
      "text/x-sfv": {
        source: "apache",
        extensions: ["sfv"]
      },
      "text/x-suse-ymp": {
        compressible: true,
        extensions: ["ymp"]
      },
      "text/x-uuencode": {
        source: "apache",
        extensions: ["uu"]
      },
      "text/x-vcalendar": {
        source: "apache",
        extensions: ["vcs"]
      },
      "text/x-vcard": {
        source: "apache",
        extensions: ["vcf"]
      },
      "text/xml": {
        source: "iana",
        compressible: true,
        extensions: ["xml"]
      },
      "text/xml-external-parsed-entity": {
        source: "iana"
      },
      "text/yaml": {
        compressible: true,
        extensions: ["yaml", "yml"]
      },
      "video/1d-interleaved-parityfec": {
        source: "iana"
      },
      "video/3gpp": {
        source: "iana",
        extensions: ["3gp", "3gpp"]
      },
      "video/3gpp-tt": {
        source: "iana"
      },
      "video/3gpp2": {
        source: "iana",
        extensions: ["3g2"]
      },
      "video/av1": {
        source: "iana"
      },
      "video/bmpeg": {
        source: "iana"
      },
      "video/bt656": {
        source: "iana"
      },
      "video/celb": {
        source: "iana"
      },
      "video/dv": {
        source: "iana"
      },
      "video/encaprtp": {
        source: "iana"
      },
      "video/ffv1": {
        source: "iana"
      },
      "video/flexfec": {
        source: "iana"
      },
      "video/h261": {
        source: "iana",
        extensions: ["h261"]
      },
      "video/h263": {
        source: "iana",
        extensions: ["h263"]
      },
      "video/h263-1998": {
        source: "iana"
      },
      "video/h263-2000": {
        source: "iana"
      },
      "video/h264": {
        source: "iana",
        extensions: ["h264"]
      },
      "video/h264-rcdo": {
        source: "iana"
      },
      "video/h264-svc": {
        source: "iana"
      },
      "video/h265": {
        source: "iana"
      },
      "video/iso.segment": {
        source: "iana",
        extensions: ["m4s"]
      },
      "video/jpeg": {
        source: "iana",
        extensions: ["jpgv"]
      },
      "video/jpeg2000": {
        source: "iana"
      },
      "video/jpm": {
        source: "apache",
        extensions: ["jpm", "jpgm"]
      },
      "video/jxsv": {
        source: "iana"
      },
      "video/mj2": {
        source: "iana",
        extensions: ["mj2", "mjp2"]
      },
      "video/mp1s": {
        source: "iana"
      },
      "video/mp2p": {
        source: "iana"
      },
      "video/mp2t": {
        source: "iana",
        extensions: ["ts"]
      },
      "video/mp4": {
        source: "iana",
        compressible: false,
        extensions: ["mp4", "mp4v", "mpg4"]
      },
      "video/mp4v-es": {
        source: "iana"
      },
      "video/mpeg": {
        source: "iana",
        compressible: false,
        extensions: ["mpeg", "mpg", "mpe", "m1v", "m2v"]
      },
      "video/mpeg4-generic": {
        source: "iana"
      },
      "video/mpv": {
        source: "iana"
      },
      "video/nv": {
        source: "iana"
      },
      "video/ogg": {
        source: "iana",
        compressible: false,
        extensions: ["ogv"]
      },
      "video/parityfec": {
        source: "iana"
      },
      "video/pointer": {
        source: "iana"
      },
      "video/quicktime": {
        source: "iana",
        compressible: false,
        extensions: ["qt", "mov"]
      },
      "video/raptorfec": {
        source: "iana"
      },
      "video/raw": {
        source: "iana"
      },
      "video/rtp-enc-aescm128": {
        source: "iana"
      },
      "video/rtploopback": {
        source: "iana"
      },
      "video/rtx": {
        source: "iana"
      },
      "video/scip": {
        source: "iana"
      },
      "video/smpte291": {
        source: "iana"
      },
      "video/smpte292m": {
        source: "iana"
      },
      "video/ulpfec": {
        source: "iana"
      },
      "video/vc1": {
        source: "iana"
      },
      "video/vc2": {
        source: "iana"
      },
      "video/vnd.cctv": {
        source: "iana"
      },
      "video/vnd.dece.hd": {
        source: "iana",
        extensions: ["uvh", "uvvh"]
      },
      "video/vnd.dece.mobile": {
        source: "iana",
        extensions: ["uvm", "uvvm"]
      },
      "video/vnd.dece.mp4": {
        source: "iana"
      },
      "video/vnd.dece.pd": {
        source: "iana",
        extensions: ["uvp", "uvvp"]
      },
      "video/vnd.dece.sd": {
        source: "iana",
        extensions: ["uvs", "uvvs"]
      },
      "video/vnd.dece.video": {
        source: "iana",
        extensions: ["uvv", "uvvv"]
      },
      "video/vnd.directv.mpeg": {
        source: "iana"
      },
      "video/vnd.directv.mpeg-tts": {
        source: "iana"
      },
      "video/vnd.dlna.mpeg-tts": {
        source: "iana"
      },
      "video/vnd.dvb.file": {
        source: "iana",
        extensions: ["dvb"]
      },
      "video/vnd.fvt": {
        source: "iana",
        extensions: ["fvt"]
      },
      "video/vnd.hns.video": {
        source: "iana"
      },
      "video/vnd.iptvforum.1dparityfec-1010": {
        source: "iana"
      },
      "video/vnd.iptvforum.1dparityfec-2005": {
        source: "iana"
      },
      "video/vnd.iptvforum.2dparityfec-1010": {
        source: "iana"
      },
      "video/vnd.iptvforum.2dparityfec-2005": {
        source: "iana"
      },
      "video/vnd.iptvforum.ttsavc": {
        source: "iana"
      },
      "video/vnd.iptvforum.ttsmpeg2": {
        source: "iana"
      },
      "video/vnd.motorola.video": {
        source: "iana"
      },
      "video/vnd.motorola.videop": {
        source: "iana"
      },
      "video/vnd.mpegurl": {
        source: "iana",
        extensions: ["mxu", "m4u"]
      },
      "video/vnd.ms-playready.media.pyv": {
        source: "iana",
        extensions: ["pyv"]
      },
      "video/vnd.nokia.interleaved-multimedia": {
        source: "iana"
      },
      "video/vnd.nokia.mp4vr": {
        source: "iana"
      },
      "video/vnd.nokia.videovoip": {
        source: "iana"
      },
      "video/vnd.objectvideo": {
        source: "iana"
      },
      "video/vnd.radgamettools.bink": {
        source: "iana"
      },
      "video/vnd.radgamettools.smacker": {
        source: "iana"
      },
      "video/vnd.sealed.mpeg1": {
        source: "iana"
      },
      "video/vnd.sealed.mpeg4": {
        source: "iana"
      },
      "video/vnd.sealed.swf": {
        source: "iana"
      },
      "video/vnd.sealedmedia.softseal.mov": {
        source: "iana"
      },
      "video/vnd.uvvu.mp4": {
        source: "iana",
        extensions: ["uvu", "uvvu"]
      },
      "video/vnd.vivo": {
        source: "iana",
        extensions: ["viv"]
      },
      "video/vnd.youtube.yt": {
        source: "iana"
      },
      "video/vp8": {
        source: "iana"
      },
      "video/vp9": {
        source: "iana"
      },
      "video/webm": {
        source: "apache",
        compressible: false,
        extensions: ["webm"]
      },
      "video/x-f4v": {
        source: "apache",
        extensions: ["f4v"]
      },
      "video/x-fli": {
        source: "apache",
        extensions: ["fli"]
      },
      "video/x-flv": {
        source: "apache",
        compressible: false,
        extensions: ["flv"]
      },
      "video/x-m4v": {
        source: "apache",
        extensions: ["m4v"]
      },
      "video/x-matroska": {
        source: "apache",
        compressible: false,
        extensions: ["mkv", "mk3d", "mks"]
      },
      "video/x-mng": {
        source: "apache",
        extensions: ["mng"]
      },
      "video/x-ms-asf": {
        source: "apache",
        extensions: ["asf", "asx"]
      },
      "video/x-ms-vob": {
        source: "apache",
        extensions: ["vob"]
      },
      "video/x-ms-wm": {
        source: "apache",
        extensions: ["wm"]
      },
      "video/x-ms-wmv": {
        source: "apache",
        compressible: false,
        extensions: ["wmv"]
      },
      "video/x-ms-wmx": {
        source: "apache",
        extensions: ["wmx"]
      },
      "video/x-ms-wvx": {
        source: "apache",
        extensions: ["wvx"]
      },
      "video/x-msvideo": {
        source: "apache",
        extensions: ["avi"]
      },
      "video/x-sgi-movie": {
        source: "apache",
        extensions: ["movie"]
      },
      "video/x-smv": {
        source: "apache",
        extensions: ["smv"]
      },
      "x-conference/x-cooltalk": {
        source: "apache",
        extensions: ["ice"]
      },
      "x-shader/x-fragment": {
        compressible: true
      },
      "x-shader/x-vertex": {
        compressible: true
      }
    };
  }
});

// node_modules/mime-db/index.js
var require_mime_db = __commonJS({
  "node_modules/mime-db/index.js"(exports, module5) {
    module5.exports = require_db();
  }
});

// node_modules/mime-types/index.js
var require_mime_types = __commonJS({
  "node_modules/mime-types/index.js"(exports) {
    "use strict";
    var db = require_mime_db();
    var extname = require("path").extname;
    var EXTRACT_TYPE_REGEXP = /^\s*([^;\s]*)(?:;|\s|$)/;
    var TEXT_TYPE_REGEXP = /^text\//i;
    exports.charset = charset;
    exports.charsets = { lookup: charset };
    exports.contentType = contentType;
    exports.extension = extension;
    exports.extensions = Object.create(null);
    exports.lookup = lookup2;
    exports.types = Object.create(null);
    populateMaps(exports.extensions, exports.types);
    function charset(type) {
      if (!type || typeof type !== "string") {
        return false;
      }
      var match = EXTRACT_TYPE_REGEXP.exec(type);
      var mime = match && db[match[1].toLowerCase()];
      if (mime && mime.charset) {
        return mime.charset;
      }
      if (match && TEXT_TYPE_REGEXP.test(match[1])) {
        return "UTF-8";
      }
      return false;
    }
    function contentType(str) {
      if (!str || typeof str !== "string") {
        return false;
      }
      var mime = str.indexOf("/") === -1 ? exports.lookup(str) : str;
      if (!mime) {
        return false;
      }
      if (mime.indexOf("charset") === -1) {
        var charset2 = exports.charset(mime);
        if (charset2)
          mime += "; charset=" + charset2.toLowerCase();
      }
      return mime;
    }
    function extension(type) {
      if (!type || typeof type !== "string") {
        return false;
      }
      var match = EXTRACT_TYPE_REGEXP.exec(type);
      var exts = match && exports.extensions[match[1].toLowerCase()];
      if (!exts || !exts.length) {
        return false;
      }
      return exts[0];
    }
    function lookup2(path3) {
      if (!path3 || typeof path3 !== "string") {
        return false;
      }
      var extension2 = extname("x." + path3).toLowerCase().substr(1);
      if (!extension2) {
        return false;
      }
      return exports.types[extension2] || false;
    }
    function populateMaps(extensions, types4) {
      var preference = ["nginx", "apache", void 0, "iana"];
      Object.keys(db).forEach(function forEachMimeType(type) {
        var mime = db[type];
        var exts = mime.extensions;
        if (!exts || !exts.length) {
          return;
        }
        extensions[type] = exts;
        for (var i = 0; i < exts.length; i++) {
          var extension2 = exts[i];
          if (types4[extension2]) {
            var from = preference.indexOf(db[types4[extension2]].source);
            var to = preference.indexOf(mime.source);
            if (types4[extension2] !== "application/octet-stream" && (from > to || from === to && types4[extension2].substr(0, 12) === "application/")) {
              continue;
            }
          }
          types4[extension2] = type;
        }
      });
    }
  }
});

// src/index.ts
__markAsModule(exports);
var import_core = __toModule(require_core());

// node_modules/tslib/modules/index.js
var import_tslib = __toModule(require_tslib());
var {
  __extends,
  __assign,
  __rest,
  __decorate,
  __param,
  __metadata,
  __awaiter,
  __generator,
  __exportStar,
  __createBinding,
  __values: __values2,
  __read,
  __spread,
  __spreadArrays,
  __spreadArray,
  __await,
  __asyncGenerator,
  __asyncDelegator,
  __asyncValues,
  __makeTemplateObject,
  __importStar,
  __importDefault,
  __classPrivateFieldGet,
  __classPrivateFieldSet
} = import_tslib.default;

// node_modules/@aws-sdk/util-config-provider/dist-es/booleanSelector.js
var SelectorType;
(function(SelectorType2) {
  SelectorType2["ENV"] = "env";
  SelectorType2["CONFIG"] = "shared config entry";
})(SelectorType || (SelectorType = {}));
var booleanSelector = function(obj, key, type) {
  if (!(key in obj))
    return void 0;
  if (obj[key] === "true")
    return true;
  if (obj[key] === "false")
    return false;
  throw new Error("Cannot load " + type + ' "' + key + '". Expected "true" or "false", got ' + obj[key] + ".");
};

// node_modules/@aws-sdk/middleware-bucket-endpoint/dist-es/NodeUseArnRegionConfigOptions.js
var NODE_USE_ARN_REGION_ENV_NAME = "AWS_S3_USE_ARN_REGION";
var NODE_USE_ARN_REGION_INI_NAME = "s3_use_arn_region";
var NODE_USE_ARN_REGION_CONFIG_OPTIONS = {
  environmentVariableSelector: function(env2) {
    return booleanSelector(env2, NODE_USE_ARN_REGION_ENV_NAME, SelectorType.ENV);
  },
  configFileSelector: function(profile) {
    return booleanSelector(profile, NODE_USE_ARN_REGION_INI_NAME, SelectorType.CONFIG);
  },
  default: false
};

// node_modules/@aws-sdk/protocol-http/dist-es/httpRequest.js
var HttpRequest = function() {
  function HttpRequest2(options) {
    this.method = options.method || "GET";
    this.hostname = options.hostname || "localhost";
    this.port = options.port;
    this.query = options.query || {};
    this.headers = options.headers || {};
    this.body = options.body;
    this.protocol = options.protocol ? options.protocol.substr(-1) !== ":" ? options.protocol + ":" : options.protocol : "https:";
    this.path = options.path ? options.path.charAt(0) !== "/" ? "/" + options.path : options.path : "/";
  }
  HttpRequest2.isInstance = function(request2) {
    if (!request2)
      return false;
    var req = request2;
    return "method" in req && "protocol" in req && "hostname" in req && "path" in req && typeof req["query"] === "object" && typeof req["headers"] === "object";
  };
  HttpRequest2.prototype.clone = function() {
    var cloned = new HttpRequest2(__assign(__assign({}, this), { headers: __assign({}, this.headers) }));
    if (cloned.query)
      cloned.query = cloneQuery(cloned.query);
    return cloned;
  };
  return HttpRequest2;
}();
function cloneQuery(query) {
  return Object.keys(query).reduce(function(carry, paramName) {
    var _a;
    var param = query[paramName];
    return __assign(__assign({}, carry), (_a = {}, _a[paramName] = Array.isArray(param) ? __spreadArray([], __read(param)) : param, _a));
  }, {});
}

// node_modules/@aws-sdk/protocol-http/dist-es/httpResponse.js
var HttpResponse = function() {
  function HttpResponse2(options) {
    this.statusCode = options.statusCode;
    this.headers = options.headers || {};
    this.body = options.body;
  }
  HttpResponse2.isInstance = function(response) {
    if (!response)
      return false;
    var resp = response;
    return typeof resp.statusCode === "number" && typeof resp.headers === "object";
  };
  return HttpResponse2;
}();

// node_modules/@aws-sdk/util-arn-parser/dist-es/index.js
var validate = function(str) {
  return typeof str === "string" && str.indexOf("arn:") === 0 && str.split(":").length >= 6;
};
var parse = function(arn) {
  var segments = arn.split(":");
  if (segments.length < 6 || segments[0] !== "arn")
    throw new Error("Malformed ARN");
  var _a = __read(segments), partition = _a[1], service = _a[2], region = _a[3], accountId = _a[4], resource = _a.slice(5);
  return {
    partition,
    service,
    region,
    accountId,
    resource: resource.join(":")
  };
};

// node_modules/@aws-sdk/middleware-bucket-endpoint/dist-es/bucketHostnameUtils.js
var DOMAIN_PATTERN = /^[a-z0-9][a-z0-9\.\-]{1,61}[a-z0-9]$/;
var IP_ADDRESS_PATTERN = /(\d+\.){3}\d+/;
var DOTS_PATTERN = /\.\./;
var DOT_PATTERN = /\./;
var S3_HOSTNAME_PATTERN = /^(.+\.)?s3(-fips)?(\.dualstack)?[.-]([a-z0-9-]+)\./;
var S3_US_EAST_1_ALTNAME_PATTERN = /^s3(-external-1)?\.amazonaws\.com$/;
var AWS_PARTITION_SUFFIX = "amazonaws.com";
var isBucketNameOptions = function(options) {
  return typeof options.bucketName === "string";
};
var isDnsCompatibleBucketName = function(bucketName) {
  return DOMAIN_PATTERN.test(bucketName) && !IP_ADDRESS_PATTERN.test(bucketName) && !DOTS_PATTERN.test(bucketName);
};
var getRegionalSuffix = function(hostname) {
  var parts = hostname.match(S3_HOSTNAME_PATTERN);
  return [parts[4], hostname.replace(new RegExp("^" + parts[0]), "")];
};
var getSuffix = function(hostname) {
  return S3_US_EAST_1_ALTNAME_PATTERN.test(hostname) ? ["us-east-1", AWS_PARTITION_SUFFIX] : getRegionalSuffix(hostname);
};
var getSuffixForArnEndpoint = function(hostname) {
  return S3_US_EAST_1_ALTNAME_PATTERN.test(hostname) ? [hostname.replace("." + AWS_PARTITION_SUFFIX, ""), AWS_PARTITION_SUFFIX] : getRegionalSuffix(hostname);
};
var validateArnEndpointOptions = function(options) {
  if (options.pathStyleEndpoint) {
    throw new Error("Path-style S3 endpoint is not supported when bucket is an ARN");
  }
  if (options.accelerateEndpoint) {
    throw new Error("Accelerate endpoint is not supported when bucket is an ARN");
  }
  if (!options.tlsCompatible) {
    throw new Error("HTTPS is required when bucket is an ARN");
  }
};
var validateService = function(service) {
  if (service !== "s3" && service !== "s3-outposts" && service !== "s3-object-lambda") {
    throw new Error("Expect 's3' or 's3-outposts' or 's3-object-lambda' in ARN service component");
  }
};
var validateS3Service = function(service) {
  if (service !== "s3") {
    throw new Error("Expect 's3' in Accesspoint ARN service component");
  }
};
var validateOutpostService = function(service) {
  if (service !== "s3-outposts") {
    throw new Error("Expect 's3-posts' in Outpost ARN service component");
  }
};
var validatePartition = function(partition, options) {
  if (partition !== options.clientPartition) {
    throw new Error('Partition in ARN is incompatible, got "' + partition + '" but expected "' + options.clientPartition + '"');
  }
};
var validateRegion = function(region, options) {
  if (region === "") {
    throw new Error("ARN region is empty");
  }
  if (options.useFipsEndpoint) {
    if (!options.allowFipsRegion) {
      throw new Error("FIPS region is not supported");
    } else if (!isEqualRegions(region, options.clientRegion)) {
      throw new Error("Client FIPS region " + options.clientRegion + " doesn't match region " + region + " in ARN");
    }
  }
  if (!options.useArnRegion && !isEqualRegions(region, options.clientRegion || "") && !isEqualRegions(region, options.clientSigningRegion || "")) {
    throw new Error("Region in ARN is incompatible, got " + region + " but expected " + options.clientRegion);
  }
};
var validateRegionalClient = function(region) {
  if (["s3-external-1", "aws-global"].includes(region)) {
    throw new Error("Client region " + region + " is not regional");
  }
};
var isEqualRegions = function(regionA, regionB) {
  return regionA === regionB;
};
var validateAccountId = function(accountId) {
  if (!/[0-9]{12}/.exec(accountId)) {
    throw new Error("Access point ARN accountID does not match regex '[0-9]{12}'");
  }
};
var validateDNSHostLabel = function(label, options) {
  if (options === void 0) {
    options = { tlsCompatible: true };
  }
  if (label.length >= 64 || !/^[a-z0-9][a-z0-9.-]*[a-z0-9]$/.test(label) || /(\d+\.){3}\d+/.test(label) || /[.-]{2}/.test(label) || (options === null || options === void 0 ? void 0 : options.tlsCompatible) && DOT_PATTERN.test(label)) {
    throw new Error("Invalid DNS label " + label);
  }
};
var validateCustomEndpoint = function(options) {
  if (options.isCustomEndpoint) {
    if (options.dualstackEndpoint)
      throw new Error("Dualstack endpoint is not supported with custom endpoint");
    if (options.accelerateEndpoint)
      throw new Error("Accelerate endpoint is not supported with custom endpoint");
  }
};
var getArnResources = function(resource) {
  var delimiter = resource.includes(":") ? ":" : "/";
  var _a = __read(resource.split(delimiter)), resourceType = _a[0], rest = _a.slice(1);
  if (resourceType === "accesspoint") {
    if (rest.length !== 1 || rest[0] === "") {
      throw new Error("Access Point ARN should have one resource accesspoint" + delimiter + "{accesspointname}");
    }
    return { accesspointName: rest[0] };
  } else if (resourceType === "outpost") {
    if (!rest[0] || rest[1] !== "accesspoint" || !rest[2] || rest.length !== 3) {
      throw new Error("Outpost ARN should have resource outpost" + delimiter + "{outpostId}" + delimiter + "accesspoint" + delimiter + "{accesspointName}");
    }
    var _b = __read(rest, 3), outpostId = _b[0], _1 = _b[1], accesspointName = _b[2];
    return { outpostId, accesspointName };
  } else {
    throw new Error("ARN resource should begin with 'accesspoint" + delimiter + "' or 'outpost" + delimiter + "'");
  }
};
var validateNoDualstack = function(dualstackEndpoint) {
  if (dualstackEndpoint)
    throw new Error("Dualstack endpoint is not supported with Outpost or Multi-region Access Point ARN.");
};
var validateNoFIPS = function(useFipsEndpoint) {
  if (useFipsEndpoint)
    throw new Error("FIPS region is not supported with Outpost.");
};
var validateMrapAlias = function(name4) {
  try {
    name4.split(".").forEach(function(label) {
      validateDNSHostLabel(label);
    });
  } catch (e) {
    throw new Error('"' + name4 + '" is not a DNS compatible name.');
  }
};

// node_modules/@aws-sdk/middleware-bucket-endpoint/dist-es/bucketHostname.js
var bucketHostname = function(options) {
  validateCustomEndpoint(options);
  return isBucketNameOptions(options) ? getEndpointFromBucketName(options) : getEndpointFromArn(options);
};
var getEndpointFromBucketName = function(_a) {
  var _b = _a.accelerateEndpoint, accelerateEndpoint = _b === void 0 ? false : _b, region = _a.clientRegion, baseHostname = _a.baseHostname, bucketName = _a.bucketName, _c = _a.dualstackEndpoint, dualstackEndpoint = _c === void 0 ? false : _c, _d = _a.fipsEndpoint, fipsEndpoint = _d === void 0 ? false : _d, _e = _a.pathStyleEndpoint, pathStyleEndpoint = _e === void 0 ? false : _e, _f = _a.tlsCompatible, tlsCompatible = _f === void 0 ? true : _f, _g = _a.isCustomEndpoint, isCustomEndpoint = _g === void 0 ? false : _g;
  var _h = __read(isCustomEndpoint ? [region, baseHostname] : getSuffix(baseHostname), 2), clientRegion = _h[0], hostnameSuffix = _h[1];
  if (pathStyleEndpoint || !isDnsCompatibleBucketName(bucketName) || tlsCompatible && DOT_PATTERN.test(bucketName)) {
    return {
      bucketEndpoint: false,
      hostname: dualstackEndpoint ? "s3.dualstack." + clientRegion + "." + hostnameSuffix : baseHostname
    };
  }
  if (accelerateEndpoint) {
    baseHostname = "s3-accelerate" + (dualstackEndpoint ? ".dualstack" : "") + "." + hostnameSuffix;
  } else if (dualstackEndpoint) {
    baseHostname = "s3.dualstack." + clientRegion + "." + hostnameSuffix;
  }
  return {
    bucketEndpoint: true,
    hostname: bucketName + "." + baseHostname
  };
};
var getEndpointFromArn = function(options) {
  var isCustomEndpoint = options.isCustomEndpoint, baseHostname = options.baseHostname, clientRegion = options.clientRegion;
  var hostnameSuffix = isCustomEndpoint ? baseHostname : getSuffixForArnEndpoint(baseHostname)[1];
  var pathStyleEndpoint = options.pathStyleEndpoint, _a = options.accelerateEndpoint, accelerateEndpoint = _a === void 0 ? false : _a, _b = options.fipsEndpoint, fipsEndpoint = _b === void 0 ? false : _b, _c = options.tlsCompatible, tlsCompatible = _c === void 0 ? true : _c, bucketName = options.bucketName, _d = options.clientPartition, clientPartition = _d === void 0 ? "aws" : _d;
  validateArnEndpointOptions({ pathStyleEndpoint, accelerateEndpoint, tlsCompatible });
  var service = bucketName.service, partition = bucketName.partition, accountId = bucketName.accountId, region = bucketName.region, resource = bucketName.resource;
  validateService(service);
  validatePartition(partition, { clientPartition });
  validateAccountId(accountId);
  var _e = getArnResources(resource), accesspointName = _e.accesspointName, outpostId = _e.outpostId;
  if (service === "s3-object-lambda") {
    return getEndpointFromObjectLambdaArn(__assign(__assign({}, options), { tlsCompatible, bucketName, accesspointName, hostnameSuffix }));
  }
  if (region === "") {
    return getEndpointFromMRAPArn(__assign(__assign({}, options), { clientRegion, mrapAlias: accesspointName, hostnameSuffix }));
  }
  if (outpostId) {
    return getEndpointFromOutpostArn(__assign(__assign({}, options), { clientRegion, outpostId, accesspointName, hostnameSuffix }));
  }
  return getEndpointFromAccessPointArn(__assign(__assign({}, options), { clientRegion, accesspointName, hostnameSuffix }));
};
var getEndpointFromObjectLambdaArn = function(_a) {
  var _b = _a.dualstackEndpoint, dualstackEndpoint = _b === void 0 ? false : _b, _c = _a.fipsEndpoint, fipsEndpoint = _c === void 0 ? false : _c, _d = _a.tlsCompatible, tlsCompatible = _d === void 0 ? true : _d, useArnRegion = _a.useArnRegion, clientRegion = _a.clientRegion, _e = _a.clientSigningRegion, clientSigningRegion = _e === void 0 ? clientRegion : _e, accesspointName = _a.accesspointName, bucketName = _a.bucketName, hostnameSuffix = _a.hostnameSuffix;
  var accountId = bucketName.accountId, region = bucketName.region, service = bucketName.service;
  validateRegionalClient(clientRegion);
  validateRegion(region, {
    useArnRegion,
    clientRegion,
    clientSigningRegion,
    allowFipsRegion: true,
    useFipsEndpoint: fipsEndpoint
  });
  validateNoDualstack(dualstackEndpoint);
  var DNSHostLabel = accesspointName + "-" + accountId;
  validateDNSHostLabel(DNSHostLabel, { tlsCompatible });
  var endpointRegion = useArnRegion ? region : clientRegion;
  var signingRegion = useArnRegion ? region : clientSigningRegion;
  return {
    bucketEndpoint: true,
    hostname: DNSHostLabel + "." + service + (fipsEndpoint ? "-fips" : "") + "." + endpointRegion + "." + hostnameSuffix,
    signingRegion,
    signingService: service
  };
};
var getEndpointFromMRAPArn = function(_a) {
  var disableMultiregionAccessPoints = _a.disableMultiregionAccessPoints, _b = _a.dualstackEndpoint, dualstackEndpoint = _b === void 0 ? false : _b, isCustomEndpoint = _a.isCustomEndpoint, mrapAlias = _a.mrapAlias, hostnameSuffix = _a.hostnameSuffix;
  if (disableMultiregionAccessPoints === true) {
    throw new Error("SDK is attempting to use a MRAP ARN. Please enable to feature.");
  }
  validateMrapAlias(mrapAlias);
  validateNoDualstack(dualstackEndpoint);
  return {
    bucketEndpoint: true,
    hostname: "" + mrapAlias + (isCustomEndpoint ? "" : ".accesspoint.s3-global") + "." + hostnameSuffix,
    signingRegion: "*"
  };
};
var getEndpointFromOutpostArn = function(_a) {
  var useArnRegion = _a.useArnRegion, clientRegion = _a.clientRegion, _b = _a.clientSigningRegion, clientSigningRegion = _b === void 0 ? clientRegion : _b, bucketName = _a.bucketName, outpostId = _a.outpostId, _c = _a.dualstackEndpoint, dualstackEndpoint = _c === void 0 ? false : _c, _d = _a.fipsEndpoint, fipsEndpoint = _d === void 0 ? false : _d, _e = _a.tlsCompatible, tlsCompatible = _e === void 0 ? true : _e, accesspointName = _a.accesspointName, isCustomEndpoint = _a.isCustomEndpoint, hostnameSuffix = _a.hostnameSuffix;
  validateRegionalClient(clientRegion);
  validateRegion(bucketName.region, { useArnRegion, clientRegion, clientSigningRegion, useFipsEndpoint: fipsEndpoint });
  var DNSHostLabel = accesspointName + "-" + bucketName.accountId;
  validateDNSHostLabel(DNSHostLabel, { tlsCompatible });
  var endpointRegion = useArnRegion ? bucketName.region : clientRegion;
  var signingRegion = useArnRegion ? bucketName.region : clientSigningRegion;
  validateOutpostService(bucketName.service);
  validateDNSHostLabel(outpostId, { tlsCompatible });
  validateNoDualstack(dualstackEndpoint);
  validateNoFIPS(fipsEndpoint);
  var hostnamePrefix = DNSHostLabel + "." + outpostId;
  return {
    bucketEndpoint: true,
    hostname: "" + hostnamePrefix + (isCustomEndpoint ? "" : ".s3-outposts." + endpointRegion) + "." + hostnameSuffix,
    signingRegion,
    signingService: "s3-outposts"
  };
};
var getEndpointFromAccessPointArn = function(_a) {
  var useArnRegion = _a.useArnRegion, clientRegion = _a.clientRegion, _b = _a.clientSigningRegion, clientSigningRegion = _b === void 0 ? clientRegion : _b, bucketName = _a.bucketName, _c = _a.dualstackEndpoint, dualstackEndpoint = _c === void 0 ? false : _c, _d = _a.fipsEndpoint, fipsEndpoint = _d === void 0 ? false : _d, _e = _a.tlsCompatible, tlsCompatible = _e === void 0 ? true : _e, accesspointName = _a.accesspointName, isCustomEndpoint = _a.isCustomEndpoint, hostnameSuffix = _a.hostnameSuffix;
  validateRegionalClient(clientRegion);
  validateRegion(bucketName.region, {
    useArnRegion,
    clientRegion,
    clientSigningRegion,
    allowFipsRegion: true,
    useFipsEndpoint: fipsEndpoint
  });
  var hostnamePrefix = accesspointName + "-" + bucketName.accountId;
  validateDNSHostLabel(hostnamePrefix, { tlsCompatible });
  var endpointRegion = useArnRegion ? bucketName.region : clientRegion;
  var signingRegion = useArnRegion ? bucketName.region : clientSigningRegion;
  validateS3Service(bucketName.service);
  return {
    bucketEndpoint: true,
    hostname: "" + hostnamePrefix + (isCustomEndpoint ? "" : ".s3-accesspoint" + (fipsEndpoint ? "-fips" : "") + (dualstackEndpoint ? ".dualstack" : "") + "." + endpointRegion) + "." + hostnameSuffix,
    signingRegion
  };
};

// node_modules/@aws-sdk/middleware-bucket-endpoint/dist-es/bucketEndpointMiddleware.js
var bucketEndpointMiddleware = function(options) {
  return function(next, context) {
    return function(args) {
      return __awaiter(void 0, void 0, void 0, function() {
        var bucketName, replaceBucketInPath, request2, bucketArn, clientRegion, useDualstackEndpoint, useFipsEndpoint, _a, partition, _b, signingRegion, useArnRegion, _c, hostname, bucketEndpoint, modifiedSigningRegion, signingService, _d, clientRegion, dualstackEndpoint, fipsEndpoint, _e, hostname, bucketEndpoint;
        var _f;
        return __generator(this, function(_g) {
          switch (_g.label) {
            case 0:
              bucketName = args.input.Bucket;
              replaceBucketInPath = options.bucketEndpoint;
              request2 = args.request;
              if (!HttpRequest.isInstance(request2))
                return [3, 13];
              if (!options.bucketEndpoint)
                return [3, 1];
              request2.hostname = bucketName;
              return [3, 12];
            case 1:
              if (!validate(bucketName))
                return [3, 8];
              bucketArn = parse(bucketName);
              return [4, options.region()];
            case 2:
              clientRegion = _g.sent();
              return [4, options.useDualstackEndpoint()];
            case 3:
              useDualstackEndpoint = _g.sent();
              return [4, options.useFipsEndpoint()];
            case 4:
              useFipsEndpoint = _g.sent();
              return [4, options.regionInfoProvider(clientRegion, { useDualstackEndpoint, useFipsEndpoint })];
            case 5:
              _a = _g.sent() || {}, partition = _a.partition, _b = _a.signingRegion, signingRegion = _b === void 0 ? clientRegion : _b;
              return [4, options.useArnRegion()];
            case 6:
              useArnRegion = _g.sent();
              _d = bucketHostname;
              _f = {
                bucketName: bucketArn,
                baseHostname: request2.hostname,
                accelerateEndpoint: options.useAccelerateEndpoint,
                dualstackEndpoint: useDualstackEndpoint,
                fipsEndpoint: useFipsEndpoint,
                pathStyleEndpoint: options.forcePathStyle,
                tlsCompatible: request2.protocol === "https:",
                useArnRegion,
                clientPartition: partition,
                clientSigningRegion: signingRegion,
                clientRegion,
                isCustomEndpoint: options.isCustomEndpoint
              };
              return [4, options.disableMultiregionAccessPoints()];
            case 7:
              _c = _d.apply(void 0, [(_f.disableMultiregionAccessPoints = _g.sent(), _f)]), hostname = _c.hostname, bucketEndpoint = _c.bucketEndpoint, modifiedSigningRegion = _c.signingRegion, signingService = _c.signingService;
              if (modifiedSigningRegion && modifiedSigningRegion !== signingRegion) {
                context["signing_region"] = modifiedSigningRegion;
              }
              if (signingService && signingService !== "s3") {
                context["signing_service"] = signingService;
              }
              request2.hostname = hostname;
              replaceBucketInPath = bucketEndpoint;
              return [3, 12];
            case 8:
              return [4, options.region()];
            case 9:
              clientRegion = _g.sent();
              return [4, options.useDualstackEndpoint()];
            case 10:
              dualstackEndpoint = _g.sent();
              return [4, options.useFipsEndpoint()];
            case 11:
              fipsEndpoint = _g.sent();
              _e = bucketHostname({
                bucketName,
                clientRegion,
                baseHostname: request2.hostname,
                accelerateEndpoint: options.useAccelerateEndpoint,
                dualstackEndpoint,
                fipsEndpoint,
                pathStyleEndpoint: options.forcePathStyle,
                tlsCompatible: request2.protocol === "https:",
                isCustomEndpoint: options.isCustomEndpoint
              }), hostname = _e.hostname, bucketEndpoint = _e.bucketEndpoint;
              request2.hostname = hostname;
              replaceBucketInPath = bucketEndpoint;
              _g.label = 12;
            case 12:
              if (replaceBucketInPath) {
                request2.path = request2.path.replace(/^(\/)?[^\/]+/, "");
                if (request2.path === "") {
                  request2.path = "/";
                }
              }
              _g.label = 13;
            case 13:
              return [2, next(__assign(__assign({}, args), { request: request2 }))];
          }
        });
      });
    };
  };
};
var bucketEndpointMiddlewareOptions = {
  tags: ["BUCKET_ENDPOINT"],
  name: "bucketEndpointMiddleware",
  relation: "before",
  toMiddleware: "hostHeaderMiddleware",
  override: true
};
var getBucketEndpointPlugin = function(options) {
  return {
    applyToStack: function(clientStack) {
      clientStack.addRelativeTo(bucketEndpointMiddleware(options), bucketEndpointMiddlewareOptions);
    }
  };
};

// node_modules/@aws-sdk/middleware-bucket-endpoint/dist-es/configurations.js
function resolveBucketEndpointConfig(input) {
  var _a = input.bucketEndpoint, bucketEndpoint = _a === void 0 ? false : _a, _b = input.forcePathStyle, forcePathStyle = _b === void 0 ? false : _b, _c = input.useAccelerateEndpoint, useAccelerateEndpoint = _c === void 0 ? false : _c, _d = input.useArnRegion, useArnRegion = _d === void 0 ? false : _d, _e = input.disableMultiregionAccessPoints, disableMultiregionAccessPoints = _e === void 0 ? false : _e;
  return __assign(__assign({}, input), { bucketEndpoint, forcePathStyle, useAccelerateEndpoint, useArnRegion: typeof useArnRegion === "function" ? useArnRegion : function() {
    return Promise.resolve(useArnRegion);
  }, disableMultiregionAccessPoints: typeof disableMultiregionAccessPoints === "function" ? disableMultiregionAccessPoints : function() {
    return Promise.resolve(disableMultiregionAccessPoints);
  } });
}

// node_modules/@aws-sdk/middleware-serde/dist-es/deserializerMiddleware.js
var deserializerMiddleware = function(options, deserializer) {
  return function(next, context) {
    return function(args) {
      return __awaiter(void 0, void 0, void 0, function() {
        var response, parsed;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              return [4, next(args)];
            case 1:
              response = _a.sent().response;
              return [4, deserializer(response, options)];
            case 2:
              parsed = _a.sent();
              return [2, {
                response,
                output: parsed
              }];
          }
        });
      });
    };
  };
};

// node_modules/@aws-sdk/middleware-serde/dist-es/serializerMiddleware.js
var serializerMiddleware = function(options, serializer) {
  return function(next, context) {
    return function(args) {
      return __awaiter(void 0, void 0, void 0, function() {
        var request2;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              return [4, serializer(args.input, options)];
            case 1:
              request2 = _a.sent();
              return [2, next(__assign(__assign({}, args), { request: request2 }))];
          }
        });
      });
    };
  };
};

// node_modules/@aws-sdk/middleware-serde/dist-es/serdePlugin.js
var deserializerMiddlewareOption = {
  name: "deserializerMiddleware",
  step: "deserialize",
  tags: ["DESERIALIZER"],
  override: true
};
var serializerMiddlewareOption = {
  name: "serializerMiddleware",
  step: "serialize",
  tags: ["SERIALIZER"],
  override: true
};
function getSerdePlugin(config, serializer, deserializer) {
  return {
    applyToStack: function(commandStack) {
      commandStack.add(deserializerMiddleware(config, deserializer), deserializerMiddlewareOption);
      commandStack.add(serializerMiddleware(config, serializer), serializerMiddlewareOption);
    }
  };
}

// node_modules/@aws-sdk/middleware-stack/dist-es/MiddlewareStack.js
var constructStack = function() {
  var absoluteEntries = [];
  var relativeEntries = [];
  var entriesNameSet = new Set();
  var sort = function(entries) {
    return entries.sort(function(a, b) {
      return stepWeights[b.step] - stepWeights[a.step] || priorityWeights[b.priority || "normal"] - priorityWeights[a.priority || "normal"];
    });
  };
  var removeByName = function(toRemove) {
    var isRemoved = false;
    var filterCb = function(entry) {
      if (entry.name && entry.name === toRemove) {
        isRemoved = true;
        entriesNameSet.delete(toRemove);
        return false;
      }
      return true;
    };
    absoluteEntries = absoluteEntries.filter(filterCb);
    relativeEntries = relativeEntries.filter(filterCb);
    return isRemoved;
  };
  var removeByReference = function(toRemove) {
    var isRemoved = false;
    var filterCb = function(entry) {
      if (entry.middleware === toRemove) {
        isRemoved = true;
        if (entry.name)
          entriesNameSet.delete(entry.name);
        return false;
      }
      return true;
    };
    absoluteEntries = absoluteEntries.filter(filterCb);
    relativeEntries = relativeEntries.filter(filterCb);
    return isRemoved;
  };
  var cloneTo = function(toStack) {
    absoluteEntries.forEach(function(entry) {
      toStack.add(entry.middleware, __assign({}, entry));
    });
    relativeEntries.forEach(function(entry) {
      toStack.addRelativeTo(entry.middleware, __assign({}, entry));
    });
    return toStack;
  };
  var expandRelativeMiddlewareList = function(from) {
    var expandedMiddlewareList = [];
    from.before.forEach(function(entry) {
      if (entry.before.length === 0 && entry.after.length === 0) {
        expandedMiddlewareList.push(entry);
      } else {
        expandedMiddlewareList.push.apply(expandedMiddlewareList, __spreadArray([], __read(expandRelativeMiddlewareList(entry))));
      }
    });
    expandedMiddlewareList.push(from);
    from.after.reverse().forEach(function(entry) {
      if (entry.before.length === 0 && entry.after.length === 0) {
        expandedMiddlewareList.push(entry);
      } else {
        expandedMiddlewareList.push.apply(expandedMiddlewareList, __spreadArray([], __read(expandRelativeMiddlewareList(entry))));
      }
    });
    return expandedMiddlewareList;
  };
  var getMiddlewareList = function() {
    var normalizedAbsoluteEntries = [];
    var normalizedRelativeEntries = [];
    var normalizedEntriesNameMap = {};
    absoluteEntries.forEach(function(entry) {
      var normalizedEntry = __assign(__assign({}, entry), { before: [], after: [] });
      if (normalizedEntry.name)
        normalizedEntriesNameMap[normalizedEntry.name] = normalizedEntry;
      normalizedAbsoluteEntries.push(normalizedEntry);
    });
    relativeEntries.forEach(function(entry) {
      var normalizedEntry = __assign(__assign({}, entry), { before: [], after: [] });
      if (normalizedEntry.name)
        normalizedEntriesNameMap[normalizedEntry.name] = normalizedEntry;
      normalizedRelativeEntries.push(normalizedEntry);
    });
    normalizedRelativeEntries.forEach(function(entry) {
      if (entry.toMiddleware) {
        var toMiddleware = normalizedEntriesNameMap[entry.toMiddleware];
        if (toMiddleware === void 0) {
          throw new Error(entry.toMiddleware + " is not found when adding " + (entry.name || "anonymous") + " middleware " + entry.relation + " " + entry.toMiddleware);
        }
        if (entry.relation === "after") {
          toMiddleware.after.push(entry);
        }
        if (entry.relation === "before") {
          toMiddleware.before.push(entry);
        }
      }
    });
    var mainChain = sort(normalizedAbsoluteEntries).map(expandRelativeMiddlewareList).reduce(function(wholeList, expendedMiddlewareList) {
      wholeList.push.apply(wholeList, __spreadArray([], __read(expendedMiddlewareList)));
      return wholeList;
    }, []);
    return mainChain.map(function(entry) {
      return entry.middleware;
    });
  };
  var stack = {
    add: function(middleware, options) {
      if (options === void 0) {
        options = {};
      }
      var name4 = options.name, override = options.override;
      var entry = __assign({ step: "initialize", priority: "normal", middleware }, options);
      if (name4) {
        if (entriesNameSet.has(name4)) {
          if (!override)
            throw new Error("Duplicate middleware name '" + name4 + "'");
          var toOverrideIndex = absoluteEntries.findIndex(function(entry2) {
            return entry2.name === name4;
          });
          var toOverride = absoluteEntries[toOverrideIndex];
          if (toOverride.step !== entry.step || toOverride.priority !== entry.priority) {
            throw new Error('"' + name4 + '" middleware with ' + toOverride.priority + " priority in " + toOverride.step + " step cannot be " + ("overridden by same-name middleware with " + entry.priority + " priority in " + entry.step + " step."));
          }
          absoluteEntries.splice(toOverrideIndex, 1);
        }
        entriesNameSet.add(name4);
      }
      absoluteEntries.push(entry);
    },
    addRelativeTo: function(middleware, options) {
      var name4 = options.name, override = options.override;
      var entry = __assign({ middleware }, options);
      if (name4) {
        if (entriesNameSet.has(name4)) {
          if (!override)
            throw new Error("Duplicate middleware name '" + name4 + "'");
          var toOverrideIndex = relativeEntries.findIndex(function(entry2) {
            return entry2.name === name4;
          });
          var toOverride = relativeEntries[toOverrideIndex];
          if (toOverride.toMiddleware !== entry.toMiddleware || toOverride.relation !== entry.relation) {
            throw new Error('"' + name4 + '" middleware ' + toOverride.relation + ' "' + toOverride.toMiddleware + '" middleware cannot be overridden ' + ("by same-name middleware " + entry.relation + ' "' + entry.toMiddleware + '" middleware.'));
          }
          relativeEntries.splice(toOverrideIndex, 1);
        }
        entriesNameSet.add(name4);
      }
      relativeEntries.push(entry);
    },
    clone: function() {
      return cloneTo(constructStack());
    },
    use: function(plugin) {
      plugin.applyToStack(stack);
    },
    remove: function(toRemove) {
      if (typeof toRemove === "string")
        return removeByName(toRemove);
      else
        return removeByReference(toRemove);
    },
    removeByTag: function(toRemove) {
      var isRemoved = false;
      var filterCb = function(entry) {
        var tags = entry.tags, name4 = entry.name;
        if (tags && tags.includes(toRemove)) {
          if (name4)
            entriesNameSet.delete(name4);
          isRemoved = true;
          return false;
        }
        return true;
      };
      absoluteEntries = absoluteEntries.filter(filterCb);
      relativeEntries = relativeEntries.filter(filterCb);
      return isRemoved;
    },
    concat: function(from) {
      var cloned = cloneTo(constructStack());
      cloned.use(from);
      return cloned;
    },
    applyToStack: cloneTo,
    resolve: function(handler, context) {
      var e_1, _a;
      try {
        for (var _b = __values2(getMiddlewareList().reverse()), _c = _b.next(); !_c.done; _c = _b.next()) {
          var middleware = _c.value;
          handler = middleware(handler, context);
        }
      } catch (e_1_1) {
        e_1 = { error: e_1_1 };
      } finally {
        try {
          if (_c && !_c.done && (_a = _b.return))
            _a.call(_b);
        } finally {
          if (e_1)
            throw e_1.error;
        }
      }
      return handler;
    }
  };
  return stack;
};
var stepWeights = {
  initialize: 5,
  serialize: 4,
  build: 3,
  finalizeRequest: 2,
  deserialize: 1
};
var priorityWeights = {
  high: 3,
  normal: 2,
  low: 1
};

// node_modules/@aws-sdk/smithy-client/dist-es/client.js
var Client = function() {
  function Client2(config) {
    this.middlewareStack = constructStack();
    this.config = config;
  }
  Client2.prototype.send = function(command, optionsOrCb, cb) {
    var options = typeof optionsOrCb !== "function" ? optionsOrCb : void 0;
    var callback = typeof optionsOrCb === "function" ? optionsOrCb : cb;
    var handler = command.resolveMiddleware(this.middlewareStack, this.config, options);
    if (callback) {
      handler(command).then(function(result) {
        return callback(null, result.output);
      }, function(err) {
        return callback(err);
      }).catch(function() {
      });
    } else {
      return handler(command).then(function(result) {
        return result.output;
      });
    }
  };
  Client2.prototype.destroy = function() {
    if (this.config.requestHandler.destroy)
      this.config.requestHandler.destroy();
  };
  return Client2;
}();

// node_modules/@aws-sdk/smithy-client/dist-es/command.js
var Command = function() {
  function Command2() {
    this.middlewareStack = constructStack();
  }
  return Command2;
}();

// node_modules/@aws-sdk/smithy-client/dist-es/constants.js
var SENSITIVE_STRING = "***SensitiveInformation***";

// node_modules/@aws-sdk/smithy-client/dist-es/parse-utils.js
var parseBoolean = function(value) {
  switch (value) {
    case "true":
      return true;
    case "false":
      return false;
    default:
      throw new Error('Unable to parse boolean value "' + value + '"');
  }
};
var expectNumber = function(value) {
  if (value === null || value === void 0) {
    return void 0;
  }
  if (typeof value === "number") {
    return value;
  }
  throw new TypeError("Expected number, got " + typeof value);
};
var MAX_FLOAT = Math.ceil(Math.pow(2, 127) * (2 - Math.pow(2, -23)));
var expectFloat32 = function(value) {
  var expected = expectNumber(value);
  if (expected !== void 0 && !Number.isNaN(expected) && expected !== Infinity && expected !== -Infinity) {
    if (Math.abs(expected) > MAX_FLOAT) {
      throw new TypeError("Expected 32-bit float, got " + value);
    }
  }
  return expected;
};
var expectLong = function(value) {
  if (value === null || value === void 0) {
    return void 0;
  }
  if (Number.isInteger(value) && !Number.isNaN(value)) {
    return value;
  }
  throw new TypeError("Expected integer, got " + typeof value);
};
var expectInt32 = function(value) {
  return expectSizedInt(value, 32);
};
var expectShort = function(value) {
  return expectSizedInt(value, 16);
};
var expectByte = function(value) {
  return expectSizedInt(value, 8);
};
var expectSizedInt = function(value, size) {
  var expected = expectLong(value);
  if (expected !== void 0 && castInt(expected, size) !== expected) {
    throw new TypeError("Expected " + size + "-bit integer, got " + value);
  }
  return expected;
};
var castInt = function(value, size) {
  switch (size) {
    case 32:
      return Int32Array.of(value)[0];
    case 16:
      return Int16Array.of(value)[0];
    case 8:
      return Int8Array.of(value)[0];
  }
};
var expectNonNull = function(value, location) {
  if (value === null || value === void 0) {
    if (location) {
      throw new TypeError("Expected a non-null value for " + location);
    }
    throw new TypeError("Expected a non-null value");
  }
  return value;
};
var expectObject = function(value) {
  if (value === null || value === void 0) {
    return void 0;
  }
  if (typeof value === "object" && !Array.isArray(value)) {
    return value;
  }
  throw new TypeError("Expected object, got " + typeof value);
};
var expectString = function(value) {
  if (value === null || value === void 0) {
    return void 0;
  }
  if (typeof value === "string") {
    return value;
  }
  throw new TypeError("Expected string, got " + typeof value);
};
var strictParseFloat32 = function(value) {
  if (typeof value == "string") {
    return expectFloat32(parseNumber(value));
  }
  return expectFloat32(value);
};
var NUMBER_REGEX = /(-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?)|(-?Infinity)|(NaN)/g;
var parseNumber = function(value) {
  var matches = value.match(NUMBER_REGEX);
  if (matches === null || matches[0].length !== value.length) {
    throw new TypeError("Expected real number, got implicit NaN");
  }
  return parseFloat(value);
};
var strictParseLong = function(value) {
  if (typeof value === "string") {
    return expectLong(parseNumber(value));
  }
  return expectLong(value);
};
var strictParseInt32 = function(value) {
  if (typeof value === "string") {
    return expectInt32(parseNumber(value));
  }
  return expectInt32(value);
};
var strictParseShort = function(value) {
  if (typeof value === "string") {
    return expectShort(parseNumber(value));
  }
  return expectShort(value);
};
var strictParseByte = function(value) {
  if (typeof value === "string") {
    return expectByte(parseNumber(value));
  }
  return expectByte(value);
};

// node_modules/@aws-sdk/smithy-client/dist-es/date-utils.js
var DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function dateToUtcString(date) {
  var year = date.getUTCFullYear();
  var month = date.getUTCMonth();
  var dayOfWeek = date.getUTCDay();
  var dayOfMonthInt = date.getUTCDate();
  var hoursInt = date.getUTCHours();
  var minutesInt = date.getUTCMinutes();
  var secondsInt = date.getUTCSeconds();
  var dayOfMonthString = dayOfMonthInt < 10 ? "0" + dayOfMonthInt : "" + dayOfMonthInt;
  var hoursString = hoursInt < 10 ? "0" + hoursInt : "" + hoursInt;
  var minutesString = minutesInt < 10 ? "0" + minutesInt : "" + minutesInt;
  var secondsString = secondsInt < 10 ? "0" + secondsInt : "" + secondsInt;
  return DAYS[dayOfWeek] + ", " + dayOfMonthString + " " + MONTHS[month] + " " + year + " " + hoursString + ":" + minutesString + ":" + secondsString + " GMT";
}
var RFC3339 = new RegExp(/^(\d{4})-(\d{2})-(\d{2})[tT](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?[zZ]$/);
var parseRfc3339DateTime = function(value) {
  if (value === null || value === void 0) {
    return void 0;
  }
  if (typeof value !== "string") {
    throw new TypeError("RFC-3339 date-times must be expressed as strings");
  }
  var match = RFC3339.exec(value);
  if (!match) {
    throw new TypeError("Invalid RFC-3339 date-time value");
  }
  var _a = __read(match, 8), _ = _a[0], yearStr = _a[1], monthStr = _a[2], dayStr = _a[3], hours = _a[4], minutes = _a[5], seconds = _a[6], fractionalMilliseconds = _a[7];
  var year = strictParseShort(stripLeadingZeroes(yearStr));
  var month = parseDateValue(monthStr, "month", 1, 12);
  var day = parseDateValue(dayStr, "day", 1, 31);
  return buildDate(year, month, day, { hours, minutes, seconds, fractionalMilliseconds });
};
var IMF_FIXDATE = new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d{2}) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d{2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/);
var RFC_850_DATE = new RegExp(/^(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d{2})-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d{2}) (\d{2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/);
var ASC_TIME = new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( [1-9]|\d{2}) (\d{2}):(\d{2}):(\d{2})(?:\.(\d+))? (\d{4})$/);
var parseRfc7231DateTime = function(value) {
  if (value === null || value === void 0) {
    return void 0;
  }
  if (typeof value !== "string") {
    throw new TypeError("RFC-7231 date-times must be expressed as strings");
  }
  var match = IMF_FIXDATE.exec(value);
  if (match) {
    var _a = __read(match, 8), _1 = _a[0], dayStr = _a[1], monthStr = _a[2], yearStr = _a[3], hours = _a[4], minutes = _a[5], seconds = _a[6], fractionalMilliseconds = _a[7];
    return buildDate(strictParseShort(stripLeadingZeroes(yearStr)), parseMonthByShortName(monthStr), parseDateValue(dayStr, "day", 1, 31), { hours, minutes, seconds, fractionalMilliseconds });
  }
  match = RFC_850_DATE.exec(value);
  if (match) {
    var _b = __read(match, 8), _2 = _b[0], dayStr = _b[1], monthStr = _b[2], yearStr = _b[3], hours = _b[4], minutes = _b[5], seconds = _b[6], fractionalMilliseconds = _b[7];
    return adjustRfc850Year(buildDate(parseTwoDigitYear(yearStr), parseMonthByShortName(monthStr), parseDateValue(dayStr, "day", 1, 31), {
      hours,
      minutes,
      seconds,
      fractionalMilliseconds
    }));
  }
  match = ASC_TIME.exec(value);
  if (match) {
    var _c = __read(match, 8), _3 = _c[0], monthStr = _c[1], dayStr = _c[2], hours = _c[3], minutes = _c[4], seconds = _c[5], fractionalMilliseconds = _c[6], yearStr = _c[7];
    return buildDate(strictParseShort(stripLeadingZeroes(yearStr)), parseMonthByShortName(monthStr), parseDateValue(dayStr.trimLeft(), "day", 1, 31), { hours, minutes, seconds, fractionalMilliseconds });
  }
  throw new TypeError("Invalid RFC-7231 date-time value");
};
var buildDate = function(year, month, day, time) {
  var adjustedMonth = month - 1;
  validateDayOfMonth(year, adjustedMonth, day);
  return new Date(Date.UTC(year, adjustedMonth, day, parseDateValue(time.hours, "hour", 0, 23), parseDateValue(time.minutes, "minute", 0, 59), parseDateValue(time.seconds, "seconds", 0, 60), parseMilliseconds(time.fractionalMilliseconds)));
};
var parseTwoDigitYear = function(value) {
  var thisYear = new Date().getUTCFullYear();
  var valueInThisCentury = Math.floor(thisYear / 100) * 100 + strictParseShort(stripLeadingZeroes(value));
  if (valueInThisCentury < thisYear) {
    return valueInThisCentury + 100;
  }
  return valueInThisCentury;
};
var FIFTY_YEARS_IN_MILLIS = 50 * 365 * 24 * 60 * 60 * 1e3;
var adjustRfc850Year = function(input) {
  if (input.getTime() - new Date().getTime() > FIFTY_YEARS_IN_MILLIS) {
    return new Date(Date.UTC(input.getUTCFullYear() - 100, input.getUTCMonth(), input.getUTCDate(), input.getUTCHours(), input.getUTCMinutes(), input.getUTCSeconds(), input.getUTCMilliseconds()));
  }
  return input;
};
var parseMonthByShortName = function(value) {
  var monthIdx = MONTHS.indexOf(value);
  if (monthIdx < 0) {
    throw new TypeError("Invalid month: " + value);
  }
  return monthIdx + 1;
};
var DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var validateDayOfMonth = function(year, month, day) {
  var maxDays = DAYS_IN_MONTH[month];
  if (month === 1 && isLeapYear(year)) {
    maxDays = 29;
  }
  if (day > maxDays) {
    throw new TypeError("Invalid day for " + MONTHS[month] + " in " + year + ": " + day);
  }
};
var isLeapYear = function(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
};
var parseDateValue = function(value, type, lower, upper) {
  var dateVal = strictParseByte(stripLeadingZeroes(value));
  if (dateVal < lower || dateVal > upper) {
    throw new TypeError(type + " must be between " + lower + " and " + upper + ", inclusive");
  }
  return dateVal;
};
var parseMilliseconds = function(value) {
  if (value === null || value === void 0) {
    return 0;
  }
  return strictParseFloat32("0." + value) * 1e3;
};
var stripLeadingZeroes = function(value) {
  var idx = 0;
  while (idx < value.length - 1 && value.charAt(idx) === "0") {
    idx++;
  }
  if (idx === 0) {
    return value;
  }
  return value.slice(idx);
};

// node_modules/@aws-sdk/smithy-client/dist-es/emitWarningIfUnsupportedVersion.js
var warningEmitted = false;
var emitWarningIfUnsupportedVersion = function(version5) {
  if (version5 && !warningEmitted && parseInt(version5.substring(1, version5.indexOf("."))) < 12) {
    warningEmitted = true;
    process.emitWarning("The AWS SDK for JavaScript (v3) will\n" + ("no longer support Node.js " + version5 + " as of January 1, 2022.\n") + "To continue receiving updates to AWS services, bug fixes, and security\nupdates please upgrade to Node.js 12.x or later.\n\nMore information can be found at: https://a.co/1l6FLnu", "NodeDeprecationWarning");
  }
};

// node_modules/@aws-sdk/smithy-client/dist-es/extended-encode-uri-component.js
function extendedEncodeURIComponent(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
    return "%" + c.charCodeAt(0).toString(16).toUpperCase();
  });
}

// node_modules/@aws-sdk/smithy-client/dist-es/get-array-if-single-item.js
var getArrayIfSingleItem = function(mayBeArray) {
  return Array.isArray(mayBeArray) ? mayBeArray : [mayBeArray];
};

// node_modules/@aws-sdk/smithy-client/dist-es/get-value-from-text-node.js
var getValueFromTextNode = function(obj) {
  var textNodeName = "#text";
  for (var key in obj) {
    if (obj.hasOwnProperty(key) && obj[key][textNodeName] !== void 0) {
      obj[key] = obj[key][textNodeName];
    } else if (typeof obj[key] === "object" && obj[key] !== null) {
      obj[key] = getValueFromTextNode(obj[key]);
    }
  }
  return obj;
};

// node_modules/@aws-sdk/smithy-client/dist-es/lazy-json.js
var StringWrapper = function() {
  var Class = Object.getPrototypeOf(this).constructor;
  var Constructor = Function.bind.apply(String, __spreadArray([null], __read(arguments)));
  var instance = new Constructor();
  Object.setPrototypeOf(instance, Class.prototype);
  return instance;
};
StringWrapper.prototype = Object.create(String.prototype, {
  constructor: {
    value: StringWrapper,
    enumerable: false,
    writable: true,
    configurable: true
  }
});
Object.setPrototypeOf(StringWrapper, String);
var LazyJsonString = function(_super) {
  __extends(LazyJsonString2, _super);
  function LazyJsonString2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  LazyJsonString2.prototype.deserializeJSON = function() {
    return JSON.parse(_super.prototype.toString.call(this));
  };
  LazyJsonString2.prototype.toJSON = function() {
    return _super.prototype.toString.call(this);
  };
  LazyJsonString2.fromObject = function(object) {
    if (object instanceof LazyJsonString2) {
      return object;
    } else if (object instanceof String || typeof object === "string") {
      return new LazyJsonString2(object);
    }
    return new LazyJsonString2(JSON.stringify(object));
  };
  return LazyJsonString2;
}(StringWrapper);

// node_modules/@aws-sdk/client-s3/dist-es/models/models_0.js
var AbortIncompleteMultipartUpload;
(function(AbortIncompleteMultipartUpload2) {
  AbortIncompleteMultipartUpload2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(AbortIncompleteMultipartUpload || (AbortIncompleteMultipartUpload = {}));
var AbortMultipartUploadOutput;
(function(AbortMultipartUploadOutput2) {
  AbortMultipartUploadOutput2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(AbortMultipartUploadOutput || (AbortMultipartUploadOutput = {}));
var AbortMultipartUploadRequest;
(function(AbortMultipartUploadRequest2) {
  AbortMultipartUploadRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(AbortMultipartUploadRequest || (AbortMultipartUploadRequest = {}));
var NoSuchUpload;
(function(NoSuchUpload2) {
  NoSuchUpload2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(NoSuchUpload || (NoSuchUpload = {}));
var AccelerateConfiguration;
(function(AccelerateConfiguration2) {
  AccelerateConfiguration2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(AccelerateConfiguration || (AccelerateConfiguration = {}));
var Grantee;
(function(Grantee2) {
  Grantee2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(Grantee || (Grantee = {}));
var Grant;
(function(Grant2) {
  Grant2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(Grant || (Grant = {}));
var Owner;
(function(Owner2) {
  Owner2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(Owner || (Owner = {}));
var AccessControlPolicy;
(function(AccessControlPolicy2) {
  AccessControlPolicy2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(AccessControlPolicy || (AccessControlPolicy = {}));
var AccessControlTranslation;
(function(AccessControlTranslation2) {
  AccessControlTranslation2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(AccessControlTranslation || (AccessControlTranslation = {}));
var CompleteMultipartUploadOutput;
(function(CompleteMultipartUploadOutput2) {
  CompleteMultipartUploadOutput2.filterSensitiveLog = function(obj) {
    return __assign(__assign({}, obj), obj.SSEKMSKeyId && { SSEKMSKeyId: SENSITIVE_STRING });
  };
})(CompleteMultipartUploadOutput || (CompleteMultipartUploadOutput = {}));
var CompletedPart;
(function(CompletedPart2) {
  CompletedPart2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(CompletedPart || (CompletedPart = {}));
var CompletedMultipartUpload;
(function(CompletedMultipartUpload2) {
  CompletedMultipartUpload2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(CompletedMultipartUpload || (CompletedMultipartUpload = {}));
var CompleteMultipartUploadRequest;
(function(CompleteMultipartUploadRequest2) {
  CompleteMultipartUploadRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(CompleteMultipartUploadRequest || (CompleteMultipartUploadRequest = {}));
var CopyObjectResult;
(function(CopyObjectResult2) {
  CopyObjectResult2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(CopyObjectResult || (CopyObjectResult = {}));
var CopyObjectOutput;
(function(CopyObjectOutput2) {
  CopyObjectOutput2.filterSensitiveLog = function(obj) {
    return __assign(__assign(__assign({}, obj), obj.SSEKMSKeyId && { SSEKMSKeyId: SENSITIVE_STRING }), obj.SSEKMSEncryptionContext && { SSEKMSEncryptionContext: SENSITIVE_STRING });
  };
})(CopyObjectOutput || (CopyObjectOutput = {}));
var CopyObjectRequest;
(function(CopyObjectRequest2) {
  CopyObjectRequest2.filterSensitiveLog = function(obj) {
    return __assign(__assign(__assign(__assign(__assign({}, obj), obj.SSECustomerKey && { SSECustomerKey: SENSITIVE_STRING }), obj.SSEKMSKeyId && { SSEKMSKeyId: SENSITIVE_STRING }), obj.SSEKMSEncryptionContext && { SSEKMSEncryptionContext: SENSITIVE_STRING }), obj.CopySourceSSECustomerKey && { CopySourceSSECustomerKey: SENSITIVE_STRING });
  };
})(CopyObjectRequest || (CopyObjectRequest = {}));
var ObjectNotInActiveTierError;
(function(ObjectNotInActiveTierError2) {
  ObjectNotInActiveTierError2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(ObjectNotInActiveTierError || (ObjectNotInActiveTierError = {}));
var BucketAlreadyExists;
(function(BucketAlreadyExists2) {
  BucketAlreadyExists2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(BucketAlreadyExists || (BucketAlreadyExists = {}));
var BucketAlreadyOwnedByYou;
(function(BucketAlreadyOwnedByYou2) {
  BucketAlreadyOwnedByYou2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(BucketAlreadyOwnedByYou || (BucketAlreadyOwnedByYou = {}));
var CreateBucketOutput;
(function(CreateBucketOutput2) {
  CreateBucketOutput2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(CreateBucketOutput || (CreateBucketOutput = {}));
var CreateBucketConfiguration;
(function(CreateBucketConfiguration2) {
  CreateBucketConfiguration2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(CreateBucketConfiguration || (CreateBucketConfiguration = {}));
var CreateBucketRequest;
(function(CreateBucketRequest2) {
  CreateBucketRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(CreateBucketRequest || (CreateBucketRequest = {}));
var CreateMultipartUploadOutput;
(function(CreateMultipartUploadOutput2) {
  CreateMultipartUploadOutput2.filterSensitiveLog = function(obj) {
    return __assign(__assign(__assign({}, obj), obj.SSEKMSKeyId && { SSEKMSKeyId: SENSITIVE_STRING }), obj.SSEKMSEncryptionContext && { SSEKMSEncryptionContext: SENSITIVE_STRING });
  };
})(CreateMultipartUploadOutput || (CreateMultipartUploadOutput = {}));
var CreateMultipartUploadRequest;
(function(CreateMultipartUploadRequest2) {
  CreateMultipartUploadRequest2.filterSensitiveLog = function(obj) {
    return __assign(__assign(__assign(__assign({}, obj), obj.SSECustomerKey && { SSECustomerKey: SENSITIVE_STRING }), obj.SSEKMSKeyId && { SSEKMSKeyId: SENSITIVE_STRING }), obj.SSEKMSEncryptionContext && { SSEKMSEncryptionContext: SENSITIVE_STRING });
  };
})(CreateMultipartUploadRequest || (CreateMultipartUploadRequest = {}));
var DeleteBucketRequest;
(function(DeleteBucketRequest2) {
  DeleteBucketRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(DeleteBucketRequest || (DeleteBucketRequest = {}));
var DeleteBucketAnalyticsConfigurationRequest;
(function(DeleteBucketAnalyticsConfigurationRequest2) {
  DeleteBucketAnalyticsConfigurationRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(DeleteBucketAnalyticsConfigurationRequest || (DeleteBucketAnalyticsConfigurationRequest = {}));
var DeleteBucketCorsRequest;
(function(DeleteBucketCorsRequest2) {
  DeleteBucketCorsRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(DeleteBucketCorsRequest || (DeleteBucketCorsRequest = {}));
var DeleteBucketEncryptionRequest;
(function(DeleteBucketEncryptionRequest2) {
  DeleteBucketEncryptionRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(DeleteBucketEncryptionRequest || (DeleteBucketEncryptionRequest = {}));
var DeleteBucketIntelligentTieringConfigurationRequest;
(function(DeleteBucketIntelligentTieringConfigurationRequest2) {
  DeleteBucketIntelligentTieringConfigurationRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(DeleteBucketIntelligentTieringConfigurationRequest || (DeleteBucketIntelligentTieringConfigurationRequest = {}));
var DeleteBucketInventoryConfigurationRequest;
(function(DeleteBucketInventoryConfigurationRequest2) {
  DeleteBucketInventoryConfigurationRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(DeleteBucketInventoryConfigurationRequest || (DeleteBucketInventoryConfigurationRequest = {}));
var DeleteBucketLifecycleRequest;
(function(DeleteBucketLifecycleRequest2) {
  DeleteBucketLifecycleRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(DeleteBucketLifecycleRequest || (DeleteBucketLifecycleRequest = {}));
var DeleteBucketMetricsConfigurationRequest;
(function(DeleteBucketMetricsConfigurationRequest2) {
  DeleteBucketMetricsConfigurationRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(DeleteBucketMetricsConfigurationRequest || (DeleteBucketMetricsConfigurationRequest = {}));
var DeleteBucketOwnershipControlsRequest;
(function(DeleteBucketOwnershipControlsRequest2) {
  DeleteBucketOwnershipControlsRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(DeleteBucketOwnershipControlsRequest || (DeleteBucketOwnershipControlsRequest = {}));
var DeleteBucketPolicyRequest;
(function(DeleteBucketPolicyRequest2) {
  DeleteBucketPolicyRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(DeleteBucketPolicyRequest || (DeleteBucketPolicyRequest = {}));
var DeleteBucketReplicationRequest;
(function(DeleteBucketReplicationRequest2) {
  DeleteBucketReplicationRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(DeleteBucketReplicationRequest || (DeleteBucketReplicationRequest = {}));
var DeleteBucketTaggingRequest;
(function(DeleteBucketTaggingRequest2) {
  DeleteBucketTaggingRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(DeleteBucketTaggingRequest || (DeleteBucketTaggingRequest = {}));
var DeleteBucketWebsiteRequest;
(function(DeleteBucketWebsiteRequest2) {
  DeleteBucketWebsiteRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(DeleteBucketWebsiteRequest || (DeleteBucketWebsiteRequest = {}));
var DeleteObjectOutput;
(function(DeleteObjectOutput2) {
  DeleteObjectOutput2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(DeleteObjectOutput || (DeleteObjectOutput = {}));
var DeleteObjectRequest;
(function(DeleteObjectRequest2) {
  DeleteObjectRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(DeleteObjectRequest || (DeleteObjectRequest = {}));
var DeletedObject;
(function(DeletedObject2) {
  DeletedObject2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(DeletedObject || (DeletedObject = {}));
var _Error;
(function(_Error2) {
  _Error2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(_Error || (_Error = {}));
var DeleteObjectsOutput;
(function(DeleteObjectsOutput2) {
  DeleteObjectsOutput2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(DeleteObjectsOutput || (DeleteObjectsOutput = {}));
var ObjectIdentifier;
(function(ObjectIdentifier2) {
  ObjectIdentifier2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(ObjectIdentifier || (ObjectIdentifier = {}));
var Delete;
(function(Delete2) {
  Delete2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(Delete || (Delete = {}));
var DeleteObjectsRequest;
(function(DeleteObjectsRequest2) {
  DeleteObjectsRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(DeleteObjectsRequest || (DeleteObjectsRequest = {}));
var DeleteObjectTaggingOutput;
(function(DeleteObjectTaggingOutput2) {
  DeleteObjectTaggingOutput2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(DeleteObjectTaggingOutput || (DeleteObjectTaggingOutput = {}));
var DeleteObjectTaggingRequest;
(function(DeleteObjectTaggingRequest2) {
  DeleteObjectTaggingRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(DeleteObjectTaggingRequest || (DeleteObjectTaggingRequest = {}));
var DeletePublicAccessBlockRequest;
(function(DeletePublicAccessBlockRequest2) {
  DeletePublicAccessBlockRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(DeletePublicAccessBlockRequest || (DeletePublicAccessBlockRequest = {}));
var GetBucketAccelerateConfigurationOutput;
(function(GetBucketAccelerateConfigurationOutput2) {
  GetBucketAccelerateConfigurationOutput2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(GetBucketAccelerateConfigurationOutput || (GetBucketAccelerateConfigurationOutput = {}));
var GetBucketAccelerateConfigurationRequest;
(function(GetBucketAccelerateConfigurationRequest2) {
  GetBucketAccelerateConfigurationRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(GetBucketAccelerateConfigurationRequest || (GetBucketAccelerateConfigurationRequest = {}));
var GetBucketAclOutput;
(function(GetBucketAclOutput2) {
  GetBucketAclOutput2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(GetBucketAclOutput || (GetBucketAclOutput = {}));
var GetBucketAclRequest;
(function(GetBucketAclRequest2) {
  GetBucketAclRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(GetBucketAclRequest || (GetBucketAclRequest = {}));
var Tag;
(function(Tag3) {
  Tag3.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(Tag || (Tag = {}));
var AnalyticsAndOperator;
(function(AnalyticsAndOperator2) {
  AnalyticsAndOperator2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(AnalyticsAndOperator || (AnalyticsAndOperator = {}));
var AnalyticsFilter;
(function(AnalyticsFilter2) {
  AnalyticsFilter2.visit = function(value, visitor) {
    if (value.Prefix !== void 0)
      return visitor.Prefix(value.Prefix);
    if (value.Tag !== void 0)
      return visitor.Tag(value.Tag);
    if (value.And !== void 0)
      return visitor.And(value.And);
    return visitor._(value.$unknown[0], value.$unknown[1]);
  };
  AnalyticsFilter2.filterSensitiveLog = function(obj) {
    var _a;
    if (obj.Prefix !== void 0)
      return { Prefix: obj.Prefix };
    if (obj.Tag !== void 0)
      return { Tag: Tag.filterSensitiveLog(obj.Tag) };
    if (obj.And !== void 0)
      return { And: AnalyticsAndOperator.filterSensitiveLog(obj.And) };
    if (obj.$unknown !== void 0)
      return _a = {}, _a[obj.$unknown[0]] = "UNKNOWN", _a;
  };
})(AnalyticsFilter || (AnalyticsFilter = {}));
var AnalyticsS3BucketDestination;
(function(AnalyticsS3BucketDestination2) {
  AnalyticsS3BucketDestination2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(AnalyticsS3BucketDestination || (AnalyticsS3BucketDestination = {}));
var AnalyticsExportDestination;
(function(AnalyticsExportDestination2) {
  AnalyticsExportDestination2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(AnalyticsExportDestination || (AnalyticsExportDestination = {}));
var StorageClassAnalysisDataExport;
(function(StorageClassAnalysisDataExport2) {
  StorageClassAnalysisDataExport2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(StorageClassAnalysisDataExport || (StorageClassAnalysisDataExport = {}));
var StorageClassAnalysis;
(function(StorageClassAnalysis2) {
  StorageClassAnalysis2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(StorageClassAnalysis || (StorageClassAnalysis = {}));
var AnalyticsConfiguration;
(function(AnalyticsConfiguration2) {
  AnalyticsConfiguration2.filterSensitiveLog = function(obj) {
    return __assign(__assign({}, obj), obj.Filter && { Filter: AnalyticsFilter.filterSensitiveLog(obj.Filter) });
  };
})(AnalyticsConfiguration || (AnalyticsConfiguration = {}));
var GetBucketAnalyticsConfigurationOutput;
(function(GetBucketAnalyticsConfigurationOutput2) {
  GetBucketAnalyticsConfigurationOutput2.filterSensitiveLog = function(obj) {
    return __assign(__assign({}, obj), obj.AnalyticsConfiguration && {
      AnalyticsConfiguration: AnalyticsConfiguration.filterSensitiveLog(obj.AnalyticsConfiguration)
    });
  };
})(GetBucketAnalyticsConfigurationOutput || (GetBucketAnalyticsConfigurationOutput = {}));
var GetBucketAnalyticsConfigurationRequest;
(function(GetBucketAnalyticsConfigurationRequest2) {
  GetBucketAnalyticsConfigurationRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(GetBucketAnalyticsConfigurationRequest || (GetBucketAnalyticsConfigurationRequest = {}));
var CORSRule;
(function(CORSRule2) {
  CORSRule2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(CORSRule || (CORSRule = {}));
var GetBucketCorsOutput;
(function(GetBucketCorsOutput2) {
  GetBucketCorsOutput2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(GetBucketCorsOutput || (GetBucketCorsOutput = {}));
var GetBucketCorsRequest;
(function(GetBucketCorsRequest2) {
  GetBucketCorsRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(GetBucketCorsRequest || (GetBucketCorsRequest = {}));
var ServerSideEncryptionByDefault;
(function(ServerSideEncryptionByDefault2) {
  ServerSideEncryptionByDefault2.filterSensitiveLog = function(obj) {
    return __assign(__assign({}, obj), obj.KMSMasterKeyID && { KMSMasterKeyID: SENSITIVE_STRING });
  };
})(ServerSideEncryptionByDefault || (ServerSideEncryptionByDefault = {}));
var ServerSideEncryptionRule;
(function(ServerSideEncryptionRule2) {
  ServerSideEncryptionRule2.filterSensitiveLog = function(obj) {
    return __assign(__assign({}, obj), obj.ApplyServerSideEncryptionByDefault && {
      ApplyServerSideEncryptionByDefault: ServerSideEncryptionByDefault.filterSensitiveLog(obj.ApplyServerSideEncryptionByDefault)
    });
  };
})(ServerSideEncryptionRule || (ServerSideEncryptionRule = {}));
var ServerSideEncryptionConfiguration;
(function(ServerSideEncryptionConfiguration2) {
  ServerSideEncryptionConfiguration2.filterSensitiveLog = function(obj) {
    return __assign(__assign({}, obj), obj.Rules && { Rules: obj.Rules.map(function(item) {
      return ServerSideEncryptionRule.filterSensitiveLog(item);
    }) });
  };
})(ServerSideEncryptionConfiguration || (ServerSideEncryptionConfiguration = {}));
var GetBucketEncryptionOutput;
(function(GetBucketEncryptionOutput2) {
  GetBucketEncryptionOutput2.filterSensitiveLog = function(obj) {
    return __assign(__assign({}, obj), obj.ServerSideEncryptionConfiguration && {
      ServerSideEncryptionConfiguration: ServerSideEncryptionConfiguration.filterSensitiveLog(obj.ServerSideEncryptionConfiguration)
    });
  };
})(GetBucketEncryptionOutput || (GetBucketEncryptionOutput = {}));
var GetBucketEncryptionRequest;
(function(GetBucketEncryptionRequest2) {
  GetBucketEncryptionRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(GetBucketEncryptionRequest || (GetBucketEncryptionRequest = {}));
var IntelligentTieringAndOperator;
(function(IntelligentTieringAndOperator2) {
  IntelligentTieringAndOperator2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(IntelligentTieringAndOperator || (IntelligentTieringAndOperator = {}));
var IntelligentTieringFilter;
(function(IntelligentTieringFilter2) {
  IntelligentTieringFilter2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(IntelligentTieringFilter || (IntelligentTieringFilter = {}));
var Tiering;
(function(Tiering2) {
  Tiering2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(Tiering || (Tiering = {}));
var IntelligentTieringConfiguration;
(function(IntelligentTieringConfiguration2) {
  IntelligentTieringConfiguration2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(IntelligentTieringConfiguration || (IntelligentTieringConfiguration = {}));
var GetBucketIntelligentTieringConfigurationOutput;
(function(GetBucketIntelligentTieringConfigurationOutput2) {
  GetBucketIntelligentTieringConfigurationOutput2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(GetBucketIntelligentTieringConfigurationOutput || (GetBucketIntelligentTieringConfigurationOutput = {}));
var GetBucketIntelligentTieringConfigurationRequest;
(function(GetBucketIntelligentTieringConfigurationRequest2) {
  GetBucketIntelligentTieringConfigurationRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(GetBucketIntelligentTieringConfigurationRequest || (GetBucketIntelligentTieringConfigurationRequest = {}));
var SSEKMS;
(function(SSEKMS2) {
  SSEKMS2.filterSensitiveLog = function(obj) {
    return __assign(__assign({}, obj), obj.KeyId && { KeyId: SENSITIVE_STRING });
  };
})(SSEKMS || (SSEKMS = {}));
var SSES3;
(function(SSES32) {
  SSES32.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(SSES3 || (SSES3 = {}));
var InventoryEncryption;
(function(InventoryEncryption2) {
  InventoryEncryption2.filterSensitiveLog = function(obj) {
    return __assign(__assign({}, obj), obj.SSEKMS && { SSEKMS: SSEKMS.filterSensitiveLog(obj.SSEKMS) });
  };
})(InventoryEncryption || (InventoryEncryption = {}));
var InventoryS3BucketDestination;
(function(InventoryS3BucketDestination2) {
  InventoryS3BucketDestination2.filterSensitiveLog = function(obj) {
    return __assign(__assign({}, obj), obj.Encryption && { Encryption: InventoryEncryption.filterSensitiveLog(obj.Encryption) });
  };
})(InventoryS3BucketDestination || (InventoryS3BucketDestination = {}));
var InventoryDestination;
(function(InventoryDestination2) {
  InventoryDestination2.filterSensitiveLog = function(obj) {
    return __assign(__assign({}, obj), obj.S3BucketDestination && {
      S3BucketDestination: InventoryS3BucketDestination.filterSensitiveLog(obj.S3BucketDestination)
    });
  };
})(InventoryDestination || (InventoryDestination = {}));
var InventoryFilter;
(function(InventoryFilter2) {
  InventoryFilter2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(InventoryFilter || (InventoryFilter = {}));
var InventorySchedule;
(function(InventorySchedule2) {
  InventorySchedule2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(InventorySchedule || (InventorySchedule = {}));
var InventoryConfiguration;
(function(InventoryConfiguration2) {
  InventoryConfiguration2.filterSensitiveLog = function(obj) {
    return __assign(__assign({}, obj), obj.Destination && { Destination: InventoryDestination.filterSensitiveLog(obj.Destination) });
  };
})(InventoryConfiguration || (InventoryConfiguration = {}));
var GetBucketInventoryConfigurationOutput;
(function(GetBucketInventoryConfigurationOutput2) {
  GetBucketInventoryConfigurationOutput2.filterSensitiveLog = function(obj) {
    return __assign(__assign({}, obj), obj.InventoryConfiguration && {
      InventoryConfiguration: InventoryConfiguration.filterSensitiveLog(obj.InventoryConfiguration)
    });
  };
})(GetBucketInventoryConfigurationOutput || (GetBucketInventoryConfigurationOutput = {}));
var GetBucketInventoryConfigurationRequest;
(function(GetBucketInventoryConfigurationRequest2) {
  GetBucketInventoryConfigurationRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(GetBucketInventoryConfigurationRequest || (GetBucketInventoryConfigurationRequest = {}));
var LifecycleExpiration;
(function(LifecycleExpiration2) {
  LifecycleExpiration2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(LifecycleExpiration || (LifecycleExpiration = {}));
var LifecycleRuleAndOperator;
(function(LifecycleRuleAndOperator2) {
  LifecycleRuleAndOperator2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(LifecycleRuleAndOperator || (LifecycleRuleAndOperator = {}));
var LifecycleRuleFilter;
(function(LifecycleRuleFilter2) {
  LifecycleRuleFilter2.visit = function(value, visitor) {
    if (value.Prefix !== void 0)
      return visitor.Prefix(value.Prefix);
    if (value.Tag !== void 0)
      return visitor.Tag(value.Tag);
    if (value.And !== void 0)
      return visitor.And(value.And);
    return visitor._(value.$unknown[0], value.$unknown[1]);
  };
  LifecycleRuleFilter2.filterSensitiveLog = function(obj) {
    var _a;
    if (obj.Prefix !== void 0)
      return { Prefix: obj.Prefix };
    if (obj.Tag !== void 0)
      return { Tag: Tag.filterSensitiveLog(obj.Tag) };
    if (obj.And !== void 0)
      return { And: LifecycleRuleAndOperator.filterSensitiveLog(obj.And) };
    if (obj.$unknown !== void 0)
      return _a = {}, _a[obj.$unknown[0]] = "UNKNOWN", _a;
  };
})(LifecycleRuleFilter || (LifecycleRuleFilter = {}));
var NoncurrentVersionExpiration;
(function(NoncurrentVersionExpiration2) {
  NoncurrentVersionExpiration2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(NoncurrentVersionExpiration || (NoncurrentVersionExpiration = {}));
var NoncurrentVersionTransition;
(function(NoncurrentVersionTransition2) {
  NoncurrentVersionTransition2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(NoncurrentVersionTransition || (NoncurrentVersionTransition = {}));
var Transition;
(function(Transition2) {
  Transition2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(Transition || (Transition = {}));
var LifecycleRule;
(function(LifecycleRule2) {
  LifecycleRule2.filterSensitiveLog = function(obj) {
    return __assign(__assign({}, obj), obj.Filter && { Filter: LifecycleRuleFilter.filterSensitiveLog(obj.Filter) });
  };
})(LifecycleRule || (LifecycleRule = {}));
var GetBucketLifecycleConfigurationOutput;
(function(GetBucketLifecycleConfigurationOutput2) {
  GetBucketLifecycleConfigurationOutput2.filterSensitiveLog = function(obj) {
    return __assign(__assign({}, obj), obj.Rules && { Rules: obj.Rules.map(function(item) {
      return LifecycleRule.filterSensitiveLog(item);
    }) });
  };
})(GetBucketLifecycleConfigurationOutput || (GetBucketLifecycleConfigurationOutput = {}));
var GetBucketLifecycleConfigurationRequest;
(function(GetBucketLifecycleConfigurationRequest2) {
  GetBucketLifecycleConfigurationRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(GetBucketLifecycleConfigurationRequest || (GetBucketLifecycleConfigurationRequest = {}));
var GetBucketLocationOutput;
(function(GetBucketLocationOutput2) {
  GetBucketLocationOutput2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(GetBucketLocationOutput || (GetBucketLocationOutput = {}));
var GetBucketLocationRequest;
(function(GetBucketLocationRequest2) {
  GetBucketLocationRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(GetBucketLocationRequest || (GetBucketLocationRequest = {}));
var TargetGrant;
(function(TargetGrant2) {
  TargetGrant2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(TargetGrant || (TargetGrant = {}));
var LoggingEnabled;
(function(LoggingEnabled2) {
  LoggingEnabled2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(LoggingEnabled || (LoggingEnabled = {}));
var GetBucketLoggingOutput;
(function(GetBucketLoggingOutput2) {
  GetBucketLoggingOutput2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(GetBucketLoggingOutput || (GetBucketLoggingOutput = {}));
var GetBucketLoggingRequest;
(function(GetBucketLoggingRequest2) {
  GetBucketLoggingRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(GetBucketLoggingRequest || (GetBucketLoggingRequest = {}));
var MetricsAndOperator;
(function(MetricsAndOperator2) {
  MetricsAndOperator2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(MetricsAndOperator || (MetricsAndOperator = {}));
var MetricsFilter;
(function(MetricsFilter2) {
  MetricsFilter2.visit = function(value, visitor) {
    if (value.Prefix !== void 0)
      return visitor.Prefix(value.Prefix);
    if (value.Tag !== void 0)
      return visitor.Tag(value.Tag);
    if (value.AccessPointArn !== void 0)
      return visitor.AccessPointArn(value.AccessPointArn);
    if (value.And !== void 0)
      return visitor.And(value.And);
    return visitor._(value.$unknown[0], value.$unknown[1]);
  };
  MetricsFilter2.filterSensitiveLog = function(obj) {
    var _a;
    if (obj.Prefix !== void 0)
      return { Prefix: obj.Prefix };
    if (obj.Tag !== void 0)
      return { Tag: Tag.filterSensitiveLog(obj.Tag) };
    if (obj.AccessPointArn !== void 0)
      return { AccessPointArn: obj.AccessPointArn };
    if (obj.And !== void 0)
      return { And: MetricsAndOperator.filterSensitiveLog(obj.And) };
    if (obj.$unknown !== void 0)
      return _a = {}, _a[obj.$unknown[0]] = "UNKNOWN", _a;
  };
})(MetricsFilter || (MetricsFilter = {}));
var MetricsConfiguration;
(function(MetricsConfiguration2) {
  MetricsConfiguration2.filterSensitiveLog = function(obj) {
    return __assign(__assign({}, obj), obj.Filter && { Filter: MetricsFilter.filterSensitiveLog(obj.Filter) });
  };
})(MetricsConfiguration || (MetricsConfiguration = {}));
var GetBucketMetricsConfigurationOutput;
(function(GetBucketMetricsConfigurationOutput2) {
  GetBucketMetricsConfigurationOutput2.filterSensitiveLog = function(obj) {
    return __assign(__assign({}, obj), obj.MetricsConfiguration && {
      MetricsConfiguration: MetricsConfiguration.filterSensitiveLog(obj.MetricsConfiguration)
    });
  };
})(GetBucketMetricsConfigurationOutput || (GetBucketMetricsConfigurationOutput = {}));
var GetBucketMetricsConfigurationRequest;
(function(GetBucketMetricsConfigurationRequest2) {
  GetBucketMetricsConfigurationRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(GetBucketMetricsConfigurationRequest || (GetBucketMetricsConfigurationRequest = {}));
var GetBucketNotificationConfigurationRequest;
(function(GetBucketNotificationConfigurationRequest2) {
  GetBucketNotificationConfigurationRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(GetBucketNotificationConfigurationRequest || (GetBucketNotificationConfigurationRequest = {}));
var FilterRule;
(function(FilterRule2) {
  FilterRule2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(FilterRule || (FilterRule = {}));
var S3KeyFilter;
(function(S3KeyFilter2) {
  S3KeyFilter2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(S3KeyFilter || (S3KeyFilter = {}));
var NotificationConfigurationFilter;
(function(NotificationConfigurationFilter2) {
  NotificationConfigurationFilter2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(NotificationConfigurationFilter || (NotificationConfigurationFilter = {}));
var LambdaFunctionConfiguration;
(function(LambdaFunctionConfiguration2) {
  LambdaFunctionConfiguration2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(LambdaFunctionConfiguration || (LambdaFunctionConfiguration = {}));
var QueueConfiguration;
(function(QueueConfiguration2) {
  QueueConfiguration2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(QueueConfiguration || (QueueConfiguration = {}));
var TopicConfiguration;
(function(TopicConfiguration2) {
  TopicConfiguration2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(TopicConfiguration || (TopicConfiguration = {}));
var NotificationConfiguration;
(function(NotificationConfiguration2) {
  NotificationConfiguration2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(NotificationConfiguration || (NotificationConfiguration = {}));
var OwnershipControlsRule;
(function(OwnershipControlsRule2) {
  OwnershipControlsRule2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(OwnershipControlsRule || (OwnershipControlsRule = {}));
var OwnershipControls;
(function(OwnershipControls2) {
  OwnershipControls2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(OwnershipControls || (OwnershipControls = {}));
var GetBucketOwnershipControlsOutput;
(function(GetBucketOwnershipControlsOutput2) {
  GetBucketOwnershipControlsOutput2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(GetBucketOwnershipControlsOutput || (GetBucketOwnershipControlsOutput = {}));
var GetBucketOwnershipControlsRequest;
(function(GetBucketOwnershipControlsRequest2) {
  GetBucketOwnershipControlsRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(GetBucketOwnershipControlsRequest || (GetBucketOwnershipControlsRequest = {}));
var GetBucketPolicyOutput;
(function(GetBucketPolicyOutput2) {
  GetBucketPolicyOutput2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(GetBucketPolicyOutput || (GetBucketPolicyOutput = {}));
var GetBucketPolicyRequest;
(function(GetBucketPolicyRequest2) {
  GetBucketPolicyRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(GetBucketPolicyRequest || (GetBucketPolicyRequest = {}));
var PolicyStatus;
(function(PolicyStatus2) {
  PolicyStatus2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(PolicyStatus || (PolicyStatus = {}));
var GetBucketPolicyStatusOutput;
(function(GetBucketPolicyStatusOutput2) {
  GetBucketPolicyStatusOutput2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(GetBucketPolicyStatusOutput || (GetBucketPolicyStatusOutput = {}));
var GetBucketPolicyStatusRequest;
(function(GetBucketPolicyStatusRequest2) {
  GetBucketPolicyStatusRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(GetBucketPolicyStatusRequest || (GetBucketPolicyStatusRequest = {}));
var DeleteMarkerReplication;
(function(DeleteMarkerReplication2) {
  DeleteMarkerReplication2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(DeleteMarkerReplication || (DeleteMarkerReplication = {}));
var EncryptionConfiguration;
(function(EncryptionConfiguration2) {
  EncryptionConfiguration2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(EncryptionConfiguration || (EncryptionConfiguration = {}));
var ReplicationTimeValue;
(function(ReplicationTimeValue2) {
  ReplicationTimeValue2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(ReplicationTimeValue || (ReplicationTimeValue = {}));
var Metrics;
(function(Metrics2) {
  Metrics2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(Metrics || (Metrics = {}));
var ReplicationTime;
(function(ReplicationTime2) {
  ReplicationTime2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(ReplicationTime || (ReplicationTime = {}));
var Destination;
(function(Destination2) {
  Destination2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(Destination || (Destination = {}));
var ExistingObjectReplication;
(function(ExistingObjectReplication2) {
  ExistingObjectReplication2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(ExistingObjectReplication || (ExistingObjectReplication = {}));
var ReplicationRuleAndOperator;
(function(ReplicationRuleAndOperator2) {
  ReplicationRuleAndOperator2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(ReplicationRuleAndOperator || (ReplicationRuleAndOperator = {}));
var ReplicationRuleFilter;
(function(ReplicationRuleFilter2) {
  ReplicationRuleFilter2.visit = function(value, visitor) {
    if (value.Prefix !== void 0)
      return visitor.Prefix(value.Prefix);
    if (value.Tag !== void 0)
      return visitor.Tag(value.Tag);
    if (value.And !== void 0)
      return visitor.And(value.And);
    return visitor._(value.$unknown[0], value.$unknown[1]);
  };
  ReplicationRuleFilter2.filterSensitiveLog = function(obj) {
    var _a;
    if (obj.Prefix !== void 0)
      return { Prefix: obj.Prefix };
    if (obj.Tag !== void 0)
      return { Tag: Tag.filterSensitiveLog(obj.Tag) };
    if (obj.And !== void 0)
      return { And: ReplicationRuleAndOperator.filterSensitiveLog(obj.And) };
    if (obj.$unknown !== void 0)
      return _a = {}, _a[obj.$unknown[0]] = "UNKNOWN", _a;
  };
})(ReplicationRuleFilter || (ReplicationRuleFilter = {}));
var ReplicaModifications;
(function(ReplicaModifications2) {
  ReplicaModifications2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(ReplicaModifications || (ReplicaModifications = {}));
var SseKmsEncryptedObjects;
(function(SseKmsEncryptedObjects2) {
  SseKmsEncryptedObjects2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(SseKmsEncryptedObjects || (SseKmsEncryptedObjects = {}));
var SourceSelectionCriteria;
(function(SourceSelectionCriteria2) {
  SourceSelectionCriteria2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(SourceSelectionCriteria || (SourceSelectionCriteria = {}));
var ReplicationRule;
(function(ReplicationRule2) {
  ReplicationRule2.filterSensitiveLog = function(obj) {
    return __assign(__assign({}, obj), obj.Filter && { Filter: ReplicationRuleFilter.filterSensitiveLog(obj.Filter) });
  };
})(ReplicationRule || (ReplicationRule = {}));
var ReplicationConfiguration;
(function(ReplicationConfiguration2) {
  ReplicationConfiguration2.filterSensitiveLog = function(obj) {
    return __assign(__assign({}, obj), obj.Rules && { Rules: obj.Rules.map(function(item) {
      return ReplicationRule.filterSensitiveLog(item);
    }) });
  };
})(ReplicationConfiguration || (ReplicationConfiguration = {}));
var GetBucketReplicationOutput;
(function(GetBucketReplicationOutput2) {
  GetBucketReplicationOutput2.filterSensitiveLog = function(obj) {
    return __assign(__assign({}, obj), obj.ReplicationConfiguration && {
      ReplicationConfiguration: ReplicationConfiguration.filterSensitiveLog(obj.ReplicationConfiguration)
    });
  };
})(GetBucketReplicationOutput || (GetBucketReplicationOutput = {}));
var GetBucketReplicationRequest;
(function(GetBucketReplicationRequest2) {
  GetBucketReplicationRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(GetBucketReplicationRequest || (GetBucketReplicationRequest = {}));
var GetBucketRequestPaymentOutput;
(function(GetBucketRequestPaymentOutput2) {
  GetBucketRequestPaymentOutput2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(GetBucketRequestPaymentOutput || (GetBucketRequestPaymentOutput = {}));
var GetBucketRequestPaymentRequest;
(function(GetBucketRequestPaymentRequest2) {
  GetBucketRequestPaymentRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(GetBucketRequestPaymentRequest || (GetBucketRequestPaymentRequest = {}));
var GetBucketTaggingOutput;
(function(GetBucketTaggingOutput2) {
  GetBucketTaggingOutput2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(GetBucketTaggingOutput || (GetBucketTaggingOutput = {}));
var GetBucketTaggingRequest;
(function(GetBucketTaggingRequest2) {
  GetBucketTaggingRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(GetBucketTaggingRequest || (GetBucketTaggingRequest = {}));
var GetBucketVersioningOutput;
(function(GetBucketVersioningOutput2) {
  GetBucketVersioningOutput2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(GetBucketVersioningOutput || (GetBucketVersioningOutput = {}));
var GetBucketVersioningRequest;
(function(GetBucketVersioningRequest2) {
  GetBucketVersioningRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(GetBucketVersioningRequest || (GetBucketVersioningRequest = {}));
var ErrorDocument;
(function(ErrorDocument2) {
  ErrorDocument2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(ErrorDocument || (ErrorDocument = {}));
var IndexDocument;
(function(IndexDocument2) {
  IndexDocument2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(IndexDocument || (IndexDocument = {}));
var RedirectAllRequestsTo;
(function(RedirectAllRequestsTo2) {
  RedirectAllRequestsTo2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(RedirectAllRequestsTo || (RedirectAllRequestsTo = {}));
var Condition;
(function(Condition2) {
  Condition2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(Condition || (Condition = {}));
var Redirect;
(function(Redirect2) {
  Redirect2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(Redirect || (Redirect = {}));
var RoutingRule;
(function(RoutingRule2) {
  RoutingRule2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(RoutingRule || (RoutingRule = {}));
var GetBucketWebsiteOutput;
(function(GetBucketWebsiteOutput2) {
  GetBucketWebsiteOutput2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(GetBucketWebsiteOutput || (GetBucketWebsiteOutput = {}));
var GetBucketWebsiteRequest;
(function(GetBucketWebsiteRequest2) {
  GetBucketWebsiteRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(GetBucketWebsiteRequest || (GetBucketWebsiteRequest = {}));
var GetObjectOutput;
(function(GetObjectOutput2) {
  GetObjectOutput2.filterSensitiveLog = function(obj) {
    return __assign(__assign({}, obj), obj.SSEKMSKeyId && { SSEKMSKeyId: SENSITIVE_STRING });
  };
})(GetObjectOutput || (GetObjectOutput = {}));
var GetObjectRequest;
(function(GetObjectRequest2) {
  GetObjectRequest2.filterSensitiveLog = function(obj) {
    return __assign(__assign({}, obj), obj.SSECustomerKey && { SSECustomerKey: SENSITIVE_STRING });
  };
})(GetObjectRequest || (GetObjectRequest = {}));
var InvalidObjectState;
(function(InvalidObjectState2) {
  InvalidObjectState2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(InvalidObjectState || (InvalidObjectState = {}));
var NoSuchKey;
(function(NoSuchKey2) {
  NoSuchKey2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(NoSuchKey || (NoSuchKey = {}));
var GetObjectAclOutput;
(function(GetObjectAclOutput2) {
  GetObjectAclOutput2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(GetObjectAclOutput || (GetObjectAclOutput = {}));
var GetObjectAclRequest;
(function(GetObjectAclRequest2) {
  GetObjectAclRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(GetObjectAclRequest || (GetObjectAclRequest = {}));
var ObjectLockLegalHold;
(function(ObjectLockLegalHold2) {
  ObjectLockLegalHold2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(ObjectLockLegalHold || (ObjectLockLegalHold = {}));
var GetObjectLegalHoldOutput;
(function(GetObjectLegalHoldOutput2) {
  GetObjectLegalHoldOutput2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(GetObjectLegalHoldOutput || (GetObjectLegalHoldOutput = {}));
var GetObjectLegalHoldRequest;
(function(GetObjectLegalHoldRequest2) {
  GetObjectLegalHoldRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(GetObjectLegalHoldRequest || (GetObjectLegalHoldRequest = {}));
var DefaultRetention;
(function(DefaultRetention2) {
  DefaultRetention2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(DefaultRetention || (DefaultRetention = {}));
var ObjectLockRule;
(function(ObjectLockRule2) {
  ObjectLockRule2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(ObjectLockRule || (ObjectLockRule = {}));
var ObjectLockConfiguration;
(function(ObjectLockConfiguration2) {
  ObjectLockConfiguration2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(ObjectLockConfiguration || (ObjectLockConfiguration = {}));
var GetObjectLockConfigurationOutput;
(function(GetObjectLockConfigurationOutput2) {
  GetObjectLockConfigurationOutput2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(GetObjectLockConfigurationOutput || (GetObjectLockConfigurationOutput = {}));
var GetObjectLockConfigurationRequest;
(function(GetObjectLockConfigurationRequest2) {
  GetObjectLockConfigurationRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(GetObjectLockConfigurationRequest || (GetObjectLockConfigurationRequest = {}));
var ObjectLockRetention;
(function(ObjectLockRetention2) {
  ObjectLockRetention2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(ObjectLockRetention || (ObjectLockRetention = {}));
var GetObjectRetentionOutput;
(function(GetObjectRetentionOutput2) {
  GetObjectRetentionOutput2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(GetObjectRetentionOutput || (GetObjectRetentionOutput = {}));
var GetObjectRetentionRequest;
(function(GetObjectRetentionRequest2) {
  GetObjectRetentionRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(GetObjectRetentionRequest || (GetObjectRetentionRequest = {}));
var GetObjectTaggingOutput;
(function(GetObjectTaggingOutput2) {
  GetObjectTaggingOutput2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(GetObjectTaggingOutput || (GetObjectTaggingOutput = {}));
var GetObjectTaggingRequest;
(function(GetObjectTaggingRequest2) {
  GetObjectTaggingRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(GetObjectTaggingRequest || (GetObjectTaggingRequest = {}));
var GetObjectTorrentOutput;
(function(GetObjectTorrentOutput2) {
  GetObjectTorrentOutput2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(GetObjectTorrentOutput || (GetObjectTorrentOutput = {}));
var GetObjectTorrentRequest;
(function(GetObjectTorrentRequest2) {
  GetObjectTorrentRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(GetObjectTorrentRequest || (GetObjectTorrentRequest = {}));
var PublicAccessBlockConfiguration;
(function(PublicAccessBlockConfiguration2) {
  PublicAccessBlockConfiguration2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(PublicAccessBlockConfiguration || (PublicAccessBlockConfiguration = {}));
var GetPublicAccessBlockOutput;
(function(GetPublicAccessBlockOutput2) {
  GetPublicAccessBlockOutput2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(GetPublicAccessBlockOutput || (GetPublicAccessBlockOutput = {}));
var GetPublicAccessBlockRequest;
(function(GetPublicAccessBlockRequest2) {
  GetPublicAccessBlockRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(GetPublicAccessBlockRequest || (GetPublicAccessBlockRequest = {}));
var HeadBucketRequest;
(function(HeadBucketRequest2) {
  HeadBucketRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(HeadBucketRequest || (HeadBucketRequest = {}));
var NotFound;
(function(NotFound2) {
  NotFound2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(NotFound || (NotFound = {}));
var HeadObjectOutput;
(function(HeadObjectOutput2) {
  HeadObjectOutput2.filterSensitiveLog = function(obj) {
    return __assign(__assign({}, obj), obj.SSEKMSKeyId && { SSEKMSKeyId: SENSITIVE_STRING });
  };
})(HeadObjectOutput || (HeadObjectOutput = {}));
var HeadObjectRequest;
(function(HeadObjectRequest2) {
  HeadObjectRequest2.filterSensitiveLog = function(obj) {
    return __assign(__assign({}, obj), obj.SSECustomerKey && { SSECustomerKey: SENSITIVE_STRING });
  };
})(HeadObjectRequest || (HeadObjectRequest = {}));
var ListBucketAnalyticsConfigurationsOutput;
(function(ListBucketAnalyticsConfigurationsOutput2) {
  ListBucketAnalyticsConfigurationsOutput2.filterSensitiveLog = function(obj) {
    return __assign(__assign({}, obj), obj.AnalyticsConfigurationList && {
      AnalyticsConfigurationList: obj.AnalyticsConfigurationList.map(function(item) {
        return AnalyticsConfiguration.filterSensitiveLog(item);
      })
    });
  };
})(ListBucketAnalyticsConfigurationsOutput || (ListBucketAnalyticsConfigurationsOutput = {}));
var ListBucketAnalyticsConfigurationsRequest;
(function(ListBucketAnalyticsConfigurationsRequest2) {
  ListBucketAnalyticsConfigurationsRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(ListBucketAnalyticsConfigurationsRequest || (ListBucketAnalyticsConfigurationsRequest = {}));
var ListBucketIntelligentTieringConfigurationsOutput;
(function(ListBucketIntelligentTieringConfigurationsOutput2) {
  ListBucketIntelligentTieringConfigurationsOutput2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(ListBucketIntelligentTieringConfigurationsOutput || (ListBucketIntelligentTieringConfigurationsOutput = {}));
var ListBucketIntelligentTieringConfigurationsRequest;
(function(ListBucketIntelligentTieringConfigurationsRequest2) {
  ListBucketIntelligentTieringConfigurationsRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(ListBucketIntelligentTieringConfigurationsRequest || (ListBucketIntelligentTieringConfigurationsRequest = {}));
var ListBucketInventoryConfigurationsOutput;
(function(ListBucketInventoryConfigurationsOutput2) {
  ListBucketInventoryConfigurationsOutput2.filterSensitiveLog = function(obj) {
    return __assign(__assign({}, obj), obj.InventoryConfigurationList && {
      InventoryConfigurationList: obj.InventoryConfigurationList.map(function(item) {
        return InventoryConfiguration.filterSensitiveLog(item);
      })
    });
  };
})(ListBucketInventoryConfigurationsOutput || (ListBucketInventoryConfigurationsOutput = {}));
var ListBucketInventoryConfigurationsRequest;
(function(ListBucketInventoryConfigurationsRequest2) {
  ListBucketInventoryConfigurationsRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(ListBucketInventoryConfigurationsRequest || (ListBucketInventoryConfigurationsRequest = {}));
var ListBucketMetricsConfigurationsOutput;
(function(ListBucketMetricsConfigurationsOutput2) {
  ListBucketMetricsConfigurationsOutput2.filterSensitiveLog = function(obj) {
    return __assign(__assign({}, obj), obj.MetricsConfigurationList && {
      MetricsConfigurationList: obj.MetricsConfigurationList.map(function(item) {
        return MetricsConfiguration.filterSensitiveLog(item);
      })
    });
  };
})(ListBucketMetricsConfigurationsOutput || (ListBucketMetricsConfigurationsOutput = {}));
var ListBucketMetricsConfigurationsRequest;
(function(ListBucketMetricsConfigurationsRequest2) {
  ListBucketMetricsConfigurationsRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(ListBucketMetricsConfigurationsRequest || (ListBucketMetricsConfigurationsRequest = {}));
var Bucket;
(function(Bucket2) {
  Bucket2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(Bucket || (Bucket = {}));
var ListBucketsOutput;
(function(ListBucketsOutput2) {
  ListBucketsOutput2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(ListBucketsOutput || (ListBucketsOutput = {}));
var CommonPrefix;
(function(CommonPrefix2) {
  CommonPrefix2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(CommonPrefix || (CommonPrefix = {}));
var Initiator;
(function(Initiator2) {
  Initiator2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(Initiator || (Initiator = {}));
var MultipartUpload;
(function(MultipartUpload2) {
  MultipartUpload2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(MultipartUpload || (MultipartUpload = {}));
var ListMultipartUploadsOutput;
(function(ListMultipartUploadsOutput2) {
  ListMultipartUploadsOutput2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(ListMultipartUploadsOutput || (ListMultipartUploadsOutput = {}));
var ListMultipartUploadsRequest;
(function(ListMultipartUploadsRequest2) {
  ListMultipartUploadsRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(ListMultipartUploadsRequest || (ListMultipartUploadsRequest = {}));
var _Object;
(function(_Object2) {
  _Object2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(_Object || (_Object = {}));
var ListObjectsOutput;
(function(ListObjectsOutput2) {
  ListObjectsOutput2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(ListObjectsOutput || (ListObjectsOutput = {}));
var ListObjectsRequest;
(function(ListObjectsRequest2) {
  ListObjectsRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(ListObjectsRequest || (ListObjectsRequest = {}));
var NoSuchBucket;
(function(NoSuchBucket2) {
  NoSuchBucket2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(NoSuchBucket || (NoSuchBucket = {}));
var ListObjectsV2Output;
(function(ListObjectsV2Output2) {
  ListObjectsV2Output2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(ListObjectsV2Output || (ListObjectsV2Output = {}));
var ListObjectsV2Request;
(function(ListObjectsV2Request2) {
  ListObjectsV2Request2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(ListObjectsV2Request || (ListObjectsV2Request = {}));
var DeleteMarkerEntry;
(function(DeleteMarkerEntry2) {
  DeleteMarkerEntry2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(DeleteMarkerEntry || (DeleteMarkerEntry = {}));
var ObjectVersion;
(function(ObjectVersion2) {
  ObjectVersion2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(ObjectVersion || (ObjectVersion = {}));
var ListObjectVersionsOutput;
(function(ListObjectVersionsOutput2) {
  ListObjectVersionsOutput2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(ListObjectVersionsOutput || (ListObjectVersionsOutput = {}));
var ListObjectVersionsRequest;
(function(ListObjectVersionsRequest2) {
  ListObjectVersionsRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(ListObjectVersionsRequest || (ListObjectVersionsRequest = {}));
var Part;
(function(Part2) {
  Part2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(Part || (Part = {}));
var ListPartsOutput;
(function(ListPartsOutput2) {
  ListPartsOutput2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(ListPartsOutput || (ListPartsOutput = {}));
var ListPartsRequest;
(function(ListPartsRequest2) {
  ListPartsRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(ListPartsRequest || (ListPartsRequest = {}));
var PutBucketAccelerateConfigurationRequest;
(function(PutBucketAccelerateConfigurationRequest2) {
  PutBucketAccelerateConfigurationRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(PutBucketAccelerateConfigurationRequest || (PutBucketAccelerateConfigurationRequest = {}));
var PutBucketAclRequest;
(function(PutBucketAclRequest2) {
  PutBucketAclRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(PutBucketAclRequest || (PutBucketAclRequest = {}));
var PutBucketAnalyticsConfigurationRequest;
(function(PutBucketAnalyticsConfigurationRequest2) {
  PutBucketAnalyticsConfigurationRequest2.filterSensitiveLog = function(obj) {
    return __assign(__assign({}, obj), obj.AnalyticsConfiguration && {
      AnalyticsConfiguration: AnalyticsConfiguration.filterSensitiveLog(obj.AnalyticsConfiguration)
    });
  };
})(PutBucketAnalyticsConfigurationRequest || (PutBucketAnalyticsConfigurationRequest = {}));
var CORSConfiguration;
(function(CORSConfiguration2) {
  CORSConfiguration2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(CORSConfiguration || (CORSConfiguration = {}));
var PutBucketCorsRequest;
(function(PutBucketCorsRequest2) {
  PutBucketCorsRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(PutBucketCorsRequest || (PutBucketCorsRequest = {}));
var PutBucketEncryptionRequest;
(function(PutBucketEncryptionRequest2) {
  PutBucketEncryptionRequest2.filterSensitiveLog = function(obj) {
    return __assign(__assign({}, obj), obj.ServerSideEncryptionConfiguration && {
      ServerSideEncryptionConfiguration: ServerSideEncryptionConfiguration.filterSensitiveLog(obj.ServerSideEncryptionConfiguration)
    });
  };
})(PutBucketEncryptionRequest || (PutBucketEncryptionRequest = {}));
var PutBucketIntelligentTieringConfigurationRequest;
(function(PutBucketIntelligentTieringConfigurationRequest2) {
  PutBucketIntelligentTieringConfigurationRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(PutBucketIntelligentTieringConfigurationRequest || (PutBucketIntelligentTieringConfigurationRequest = {}));
var PutBucketInventoryConfigurationRequest;
(function(PutBucketInventoryConfigurationRequest2) {
  PutBucketInventoryConfigurationRequest2.filterSensitiveLog = function(obj) {
    return __assign(__assign({}, obj), obj.InventoryConfiguration && {
      InventoryConfiguration: InventoryConfiguration.filterSensitiveLog(obj.InventoryConfiguration)
    });
  };
})(PutBucketInventoryConfigurationRequest || (PutBucketInventoryConfigurationRequest = {}));
var BucketLifecycleConfiguration;
(function(BucketLifecycleConfiguration2) {
  BucketLifecycleConfiguration2.filterSensitiveLog = function(obj) {
    return __assign(__assign({}, obj), obj.Rules && { Rules: obj.Rules.map(function(item) {
      return LifecycleRule.filterSensitiveLog(item);
    }) });
  };
})(BucketLifecycleConfiguration || (BucketLifecycleConfiguration = {}));
var PutBucketLifecycleConfigurationRequest;
(function(PutBucketLifecycleConfigurationRequest2) {
  PutBucketLifecycleConfigurationRequest2.filterSensitiveLog = function(obj) {
    return __assign(__assign({}, obj), obj.LifecycleConfiguration && {
      LifecycleConfiguration: BucketLifecycleConfiguration.filterSensitiveLog(obj.LifecycleConfiguration)
    });
  };
})(PutBucketLifecycleConfigurationRequest || (PutBucketLifecycleConfigurationRequest = {}));
var BucketLoggingStatus;
(function(BucketLoggingStatus2) {
  BucketLoggingStatus2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(BucketLoggingStatus || (BucketLoggingStatus = {}));
var PutBucketLoggingRequest;
(function(PutBucketLoggingRequest2) {
  PutBucketLoggingRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(PutBucketLoggingRequest || (PutBucketLoggingRequest = {}));
var PutBucketMetricsConfigurationRequest;
(function(PutBucketMetricsConfigurationRequest2) {
  PutBucketMetricsConfigurationRequest2.filterSensitiveLog = function(obj) {
    return __assign(__assign({}, obj), obj.MetricsConfiguration && {
      MetricsConfiguration: MetricsConfiguration.filterSensitiveLog(obj.MetricsConfiguration)
    });
  };
})(PutBucketMetricsConfigurationRequest || (PutBucketMetricsConfigurationRequest = {}));
var PutBucketNotificationConfigurationRequest;
(function(PutBucketNotificationConfigurationRequest2) {
  PutBucketNotificationConfigurationRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(PutBucketNotificationConfigurationRequest || (PutBucketNotificationConfigurationRequest = {}));
var PutBucketOwnershipControlsRequest;
(function(PutBucketOwnershipControlsRequest2) {
  PutBucketOwnershipControlsRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(PutBucketOwnershipControlsRequest || (PutBucketOwnershipControlsRequest = {}));
var PutBucketPolicyRequest;
(function(PutBucketPolicyRequest2) {
  PutBucketPolicyRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(PutBucketPolicyRequest || (PutBucketPolicyRequest = {}));
var PutBucketReplicationRequest;
(function(PutBucketReplicationRequest2) {
  PutBucketReplicationRequest2.filterSensitiveLog = function(obj) {
    return __assign(__assign({}, obj), obj.ReplicationConfiguration && {
      ReplicationConfiguration: ReplicationConfiguration.filterSensitiveLog(obj.ReplicationConfiguration)
    });
  };
})(PutBucketReplicationRequest || (PutBucketReplicationRequest = {}));
var RequestPaymentConfiguration;
(function(RequestPaymentConfiguration2) {
  RequestPaymentConfiguration2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(RequestPaymentConfiguration || (RequestPaymentConfiguration = {}));
var PutBucketRequestPaymentRequest;
(function(PutBucketRequestPaymentRequest2) {
  PutBucketRequestPaymentRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(PutBucketRequestPaymentRequest || (PutBucketRequestPaymentRequest = {}));
var Tagging;
(function(Tagging2) {
  Tagging2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(Tagging || (Tagging = {}));
var PutBucketTaggingRequest;
(function(PutBucketTaggingRequest2) {
  PutBucketTaggingRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(PutBucketTaggingRequest || (PutBucketTaggingRequest = {}));
var VersioningConfiguration;
(function(VersioningConfiguration2) {
  VersioningConfiguration2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(VersioningConfiguration || (VersioningConfiguration = {}));
var PutBucketVersioningRequest;
(function(PutBucketVersioningRequest2) {
  PutBucketVersioningRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(PutBucketVersioningRequest || (PutBucketVersioningRequest = {}));
var WebsiteConfiguration;
(function(WebsiteConfiguration2) {
  WebsiteConfiguration2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(WebsiteConfiguration || (WebsiteConfiguration = {}));
var PutBucketWebsiteRequest;
(function(PutBucketWebsiteRequest2) {
  PutBucketWebsiteRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(PutBucketWebsiteRequest || (PutBucketWebsiteRequest = {}));
var PutObjectOutput;
(function(PutObjectOutput2) {
  PutObjectOutput2.filterSensitiveLog = function(obj) {
    return __assign(__assign(__assign({}, obj), obj.SSEKMSKeyId && { SSEKMSKeyId: SENSITIVE_STRING }), obj.SSEKMSEncryptionContext && { SSEKMSEncryptionContext: SENSITIVE_STRING });
  };
})(PutObjectOutput || (PutObjectOutput = {}));
var PutObjectRequest;
(function(PutObjectRequest2) {
  PutObjectRequest2.filterSensitiveLog = function(obj) {
    return __assign(__assign(__assign(__assign({}, obj), obj.SSECustomerKey && { SSECustomerKey: SENSITIVE_STRING }), obj.SSEKMSKeyId && { SSEKMSKeyId: SENSITIVE_STRING }), obj.SSEKMSEncryptionContext && { SSEKMSEncryptionContext: SENSITIVE_STRING });
  };
})(PutObjectRequest || (PutObjectRequest = {}));
var PutObjectAclOutput;
(function(PutObjectAclOutput2) {
  PutObjectAclOutput2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(PutObjectAclOutput || (PutObjectAclOutput = {}));
var PutObjectAclRequest;
(function(PutObjectAclRequest2) {
  PutObjectAclRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(PutObjectAclRequest || (PutObjectAclRequest = {}));
var PutObjectLegalHoldOutput;
(function(PutObjectLegalHoldOutput2) {
  PutObjectLegalHoldOutput2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(PutObjectLegalHoldOutput || (PutObjectLegalHoldOutput = {}));
var PutObjectLegalHoldRequest;
(function(PutObjectLegalHoldRequest2) {
  PutObjectLegalHoldRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(PutObjectLegalHoldRequest || (PutObjectLegalHoldRequest = {}));
var PutObjectLockConfigurationOutput;
(function(PutObjectLockConfigurationOutput2) {
  PutObjectLockConfigurationOutput2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(PutObjectLockConfigurationOutput || (PutObjectLockConfigurationOutput = {}));
var PutObjectLockConfigurationRequest;
(function(PutObjectLockConfigurationRequest2) {
  PutObjectLockConfigurationRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(PutObjectLockConfigurationRequest || (PutObjectLockConfigurationRequest = {}));
var PutObjectRetentionOutput;
(function(PutObjectRetentionOutput2) {
  PutObjectRetentionOutput2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(PutObjectRetentionOutput || (PutObjectRetentionOutput = {}));
var PutObjectRetentionRequest;
(function(PutObjectRetentionRequest2) {
  PutObjectRetentionRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(PutObjectRetentionRequest || (PutObjectRetentionRequest = {}));
var PutObjectTaggingOutput;
(function(PutObjectTaggingOutput2) {
  PutObjectTaggingOutput2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(PutObjectTaggingOutput || (PutObjectTaggingOutput = {}));
var PutObjectTaggingRequest;
(function(PutObjectTaggingRequest2) {
  PutObjectTaggingRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(PutObjectTaggingRequest || (PutObjectTaggingRequest = {}));
var PutPublicAccessBlockRequest;
(function(PutPublicAccessBlockRequest2) {
  PutPublicAccessBlockRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(PutPublicAccessBlockRequest || (PutPublicAccessBlockRequest = {}));
var ObjectAlreadyInActiveTierError;
(function(ObjectAlreadyInActiveTierError2) {
  ObjectAlreadyInActiveTierError2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(ObjectAlreadyInActiveTierError || (ObjectAlreadyInActiveTierError = {}));
var RestoreObjectOutput;
(function(RestoreObjectOutput2) {
  RestoreObjectOutput2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(RestoreObjectOutput || (RestoreObjectOutput = {}));
var GlacierJobParameters;
(function(GlacierJobParameters2) {
  GlacierJobParameters2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(GlacierJobParameters || (GlacierJobParameters = {}));

// node_modules/@aws-sdk/xml-builder/dist-es/escape-attribute.js
function escapeAttribute(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// node_modules/@aws-sdk/xml-builder/dist-es/XmlNode.js
var XmlNode = function() {
  function XmlNode2(name4, children) {
    if (children === void 0) {
      children = [];
    }
    this.name = name4;
    this.children = children;
    this.attributes = {};
  }
  XmlNode2.prototype.withName = function(name4) {
    this.name = name4;
    return this;
  };
  XmlNode2.prototype.addAttribute = function(name4, value) {
    this.attributes[name4] = value;
    return this;
  };
  XmlNode2.prototype.addChildNode = function(child) {
    this.children.push(child);
    return this;
  };
  XmlNode2.prototype.removeAttribute = function(name4) {
    delete this.attributes[name4];
    return this;
  };
  XmlNode2.prototype.toString = function() {
    var e_1, _a;
    var hasChildren = Boolean(this.children.length);
    var xmlText = "<" + this.name;
    var attributes = this.attributes;
    try {
      for (var _b = __values2(Object.keys(attributes)), _c = _b.next(); !_c.done; _c = _b.next()) {
        var attributeName = _c.value;
        var attribute = attributes[attributeName];
        if (typeof attribute !== "undefined" && attribute !== null) {
          xmlText += " " + attributeName + '="' + escapeAttribute("" + attribute) + '"';
        }
      }
    } catch (e_1_1) {
      e_1 = { error: e_1_1 };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b.return))
          _a.call(_b);
      } finally {
        if (e_1)
          throw e_1.error;
      }
    }
    return xmlText += !hasChildren ? "/>" : ">" + this.children.map(function(c) {
      return c.toString();
    }).join("") + "</" + this.name + ">";
  };
  return XmlNode2;
}();

// node_modules/@aws-sdk/xml-builder/dist-es/escape-element.js
function escapeElement(value) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\r/g, "&#x0D;").replace(/\n/g, "&#x0A;").replace(/\u0085/g, "&#x85;").replace(/\u2028/, "&#x2028;");
}

// node_modules/@aws-sdk/xml-builder/dist-es/XmlText.js
var XmlText = function() {
  function XmlText2(value) {
    this.value = value;
  }
  XmlText2.prototype.toString = function() {
    return escapeElement("" + this.value);
  };
  return XmlText2;
}();

// node_modules/@aws-sdk/client-s3/dist-es/protocols/Aws_restXml.js
var import_entities = __toModule(require_lib());
var import_fast_xml_parser = __toModule(require_parser());
var serializeAws_restXmlDeleteObjectsCommand = function(input, context) {
  return __awaiter(void 0, void 0, void 0, function() {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, labelValue, query, body, contents;
    return __generator(this, function(_c) {
      switch (_c.label) {
        case 0:
          return [4, context.endpoint()];
        case 1:
          _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
          headers = __assign(__assign(__assign(__assign({ "content-type": "application/xml" }, isSerializableHeaderValue(input.MFA) && { "x-amz-mfa": input.MFA }), isSerializableHeaderValue(input.RequestPayer) && { "x-amz-request-payer": input.RequestPayer }), isSerializableHeaderValue(input.BypassGovernanceRetention) && {
            "x-amz-bypass-governance-retention": input.BypassGovernanceRetention.toString()
          }), isSerializableHeaderValue(input.ExpectedBucketOwner) && {
            "x-amz-expected-bucket-owner": input.ExpectedBucketOwner
          });
          resolvedPath = "" + ((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith("/")) ? basePath.slice(0, -1) : basePath || "") + "/{Bucket}";
          if (input.Bucket !== void 0) {
            labelValue = input.Bucket;
            if (labelValue.length <= 0) {
              throw new Error("Empty value provided for input HTTP label: Bucket.");
            }
            resolvedPath = resolvedPath.replace("{Bucket}", extendedEncodeURIComponent(labelValue));
          } else {
            throw new Error("No value provided for input HTTP label: Bucket.");
          }
          query = {
            delete: "",
            "x-id": "DeleteObjects"
          };
          if (input.Delete !== void 0) {
            body = serializeAws_restXmlDelete(input.Delete, context);
          }
          if (input.Delete !== void 0) {
            contents = serializeAws_restXmlDelete(input.Delete, context);
            body = '<?xml version="1.0" encoding="UTF-8"?>';
            contents.addAttribute("xmlns", "http://s3.amazonaws.com/doc/2006-03-01/");
            body += contents.toString();
          }
          return [2, new HttpRequest({
            protocol,
            hostname,
            port,
            method: "POST",
            headers,
            path: resolvedPath,
            query,
            body
          })];
      }
    });
  });
};
var serializeAws_restXmlGetObjectCommand = function(input, context) {
  return __awaiter(void 0, void 0, void 0, function() {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, labelValue, labelValue, query, body;
    return __generator(this, function(_c) {
      switch (_c.label) {
        case 0:
          return [4, context.endpoint()];
        case 1:
          _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
          headers = __assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign({}, isSerializableHeaderValue(input.IfMatch) && { "if-match": input.IfMatch }), isSerializableHeaderValue(input.IfModifiedSince) && {
            "if-modified-since": dateToUtcString(input.IfModifiedSince).toString()
          }), isSerializableHeaderValue(input.IfNoneMatch) && { "if-none-match": input.IfNoneMatch }), isSerializableHeaderValue(input.IfUnmodifiedSince) && {
            "if-unmodified-since": dateToUtcString(input.IfUnmodifiedSince).toString()
          }), isSerializableHeaderValue(input.Range) && { range: input.Range }), isSerializableHeaderValue(input.SSECustomerAlgorithm) && {
            "x-amz-server-side-encryption-customer-algorithm": input.SSECustomerAlgorithm
          }), isSerializableHeaderValue(input.SSECustomerKey) && {
            "x-amz-server-side-encryption-customer-key": input.SSECustomerKey
          }), isSerializableHeaderValue(input.SSECustomerKeyMD5) && {
            "x-amz-server-side-encryption-customer-key-md5": input.SSECustomerKeyMD5
          }), isSerializableHeaderValue(input.RequestPayer) && { "x-amz-request-payer": input.RequestPayer }), isSerializableHeaderValue(input.ExpectedBucketOwner) && {
            "x-amz-expected-bucket-owner": input.ExpectedBucketOwner
          });
          resolvedPath = "" + ((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith("/")) ? basePath.slice(0, -1) : basePath || "") + "/{Bucket}/{Key+}";
          if (input.Bucket !== void 0) {
            labelValue = input.Bucket;
            if (labelValue.length <= 0) {
              throw new Error("Empty value provided for input HTTP label: Bucket.");
            }
            resolvedPath = resolvedPath.replace("{Bucket}", extendedEncodeURIComponent(labelValue));
          } else {
            throw new Error("No value provided for input HTTP label: Bucket.");
          }
          if (input.Key !== void 0) {
            labelValue = input.Key;
            if (labelValue.length <= 0) {
              throw new Error("Empty value provided for input HTTP label: Key.");
            }
            resolvedPath = resolvedPath.replace("{Key+}", labelValue.split("/").map(function(segment) {
              return extendedEncodeURIComponent(segment);
            }).join("/"));
          } else {
            throw new Error("No value provided for input HTTP label: Key.");
          }
          query = __assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign({ "x-id": "GetObject" }, input.ResponseCacheControl !== void 0 && { "response-cache-control": input.ResponseCacheControl }), input.ResponseContentDisposition !== void 0 && {
            "response-content-disposition": input.ResponseContentDisposition
          }), input.ResponseContentEncoding !== void 0 && { "response-content-encoding": input.ResponseContentEncoding }), input.ResponseContentLanguage !== void 0 && { "response-content-language": input.ResponseContentLanguage }), input.ResponseContentType !== void 0 && { "response-content-type": input.ResponseContentType }), input.ResponseExpires !== void 0 && {
            "response-expires": dateToUtcString(input.ResponseExpires).toString()
          }), input.VersionId !== void 0 && { versionId: input.VersionId }), input.PartNumber !== void 0 && { partNumber: input.PartNumber.toString() });
          return [2, new HttpRequest({
            protocol,
            hostname,
            port,
            method: "GET",
            headers,
            path: resolvedPath,
            query,
            body
          })];
      }
    });
  });
};
var serializeAws_restXmlPutObjectCommand = function(input, context) {
  return __awaiter(void 0, void 0, void 0, function() {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, labelValue, labelValue, query, body, contents;
    return __generator(this, function(_c) {
      switch (_c.label) {
        case 0:
          return [4, context.endpoint()];
        case 1:
          _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
          headers = __assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign({ "content-type": "application/octet-stream" }, isSerializableHeaderValue(input.ACL) && { "x-amz-acl": input.ACL }), isSerializableHeaderValue(input.CacheControl) && { "cache-control": input.CacheControl }), isSerializableHeaderValue(input.ContentDisposition) && { "content-disposition": input.ContentDisposition }), isSerializableHeaderValue(input.ContentEncoding) && { "content-encoding": input.ContentEncoding }), isSerializableHeaderValue(input.ContentLanguage) && { "content-language": input.ContentLanguage }), isSerializableHeaderValue(input.ContentLength) && { "content-length": input.ContentLength.toString() }), isSerializableHeaderValue(input.ContentMD5) && { "content-md5": input.ContentMD5 }), isSerializableHeaderValue(input.ContentType) && { "content-type": input.ContentType }), isSerializableHeaderValue(input.Expires) && { expires: dateToUtcString(input.Expires).toString() }), isSerializableHeaderValue(input.GrantFullControl) && { "x-amz-grant-full-control": input.GrantFullControl }), isSerializableHeaderValue(input.GrantRead) && { "x-amz-grant-read": input.GrantRead }), isSerializableHeaderValue(input.GrantReadACP) && { "x-amz-grant-read-acp": input.GrantReadACP }), isSerializableHeaderValue(input.GrantWriteACP) && { "x-amz-grant-write-acp": input.GrantWriteACP }), isSerializableHeaderValue(input.ServerSideEncryption) && {
            "x-amz-server-side-encryption": input.ServerSideEncryption
          }), isSerializableHeaderValue(input.StorageClass) && { "x-amz-storage-class": input.StorageClass }), isSerializableHeaderValue(input.WebsiteRedirectLocation) && {
            "x-amz-website-redirect-location": input.WebsiteRedirectLocation
          }), isSerializableHeaderValue(input.SSECustomerAlgorithm) && {
            "x-amz-server-side-encryption-customer-algorithm": input.SSECustomerAlgorithm
          }), isSerializableHeaderValue(input.SSECustomerKey) && {
            "x-amz-server-side-encryption-customer-key": input.SSECustomerKey
          }), isSerializableHeaderValue(input.SSECustomerKeyMD5) && {
            "x-amz-server-side-encryption-customer-key-md5": input.SSECustomerKeyMD5
          }), isSerializableHeaderValue(input.SSEKMSKeyId) && {
            "x-amz-server-side-encryption-aws-kms-key-id": input.SSEKMSKeyId
          }), isSerializableHeaderValue(input.SSEKMSEncryptionContext) && {
            "x-amz-server-side-encryption-context": input.SSEKMSEncryptionContext
          }), isSerializableHeaderValue(input.BucketKeyEnabled) && {
            "x-amz-server-side-encryption-bucket-key-enabled": input.BucketKeyEnabled.toString()
          }), isSerializableHeaderValue(input.RequestPayer) && { "x-amz-request-payer": input.RequestPayer }), isSerializableHeaderValue(input.Tagging) && { "x-amz-tagging": input.Tagging }), isSerializableHeaderValue(input.ObjectLockMode) && { "x-amz-object-lock-mode": input.ObjectLockMode }), isSerializableHeaderValue(input.ObjectLockRetainUntilDate) && {
            "x-amz-object-lock-retain-until-date": (input.ObjectLockRetainUntilDate.toISOString().split(".")[0] + "Z").toString()
          }), isSerializableHeaderValue(input.ObjectLockLegalHoldStatus) && {
            "x-amz-object-lock-legal-hold": input.ObjectLockLegalHoldStatus
          }), isSerializableHeaderValue(input.ExpectedBucketOwner) && {
            "x-amz-expected-bucket-owner": input.ExpectedBucketOwner
          }), input.Metadata !== void 0 && Object.keys(input.Metadata).reduce(function(acc, suffix) {
            var _a2;
            return __assign(__assign({}, acc), (_a2 = {}, _a2["x-amz-meta-" + suffix.toLowerCase()] = input.Metadata[suffix], _a2));
          }, {}));
          resolvedPath = "" + ((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith("/")) ? basePath.slice(0, -1) : basePath || "") + "/{Bucket}/{Key+}";
          if (input.Bucket !== void 0) {
            labelValue = input.Bucket;
            if (labelValue.length <= 0) {
              throw new Error("Empty value provided for input HTTP label: Bucket.");
            }
            resolvedPath = resolvedPath.replace("{Bucket}", extendedEncodeURIComponent(labelValue));
          } else {
            throw new Error("No value provided for input HTTP label: Bucket.");
          }
          if (input.Key !== void 0) {
            labelValue = input.Key;
            if (labelValue.length <= 0) {
              throw new Error("Empty value provided for input HTTP label: Key.");
            }
            resolvedPath = resolvedPath.replace("{Key+}", labelValue.split("/").map(function(segment) {
              return extendedEncodeURIComponent(segment);
            }).join("/"));
          } else {
            throw new Error("No value provided for input HTTP label: Key.");
          }
          query = {
            "x-id": "PutObject"
          };
          if (input.Body !== void 0) {
            body = input.Body;
          }
          if (input.Body !== void 0) {
            contents = input.Body;
            body = contents;
          }
          return [2, new HttpRequest({
            protocol,
            hostname,
            port,
            method: "PUT",
            headers,
            path: resolvedPath,
            query,
            body
          })];
      }
    });
  });
};
var deserializeAws_restXmlDeleteObjectsCommand = function(output, context) {
  return __awaiter(void 0, void 0, void 0, function() {
    var contents, data, _a, _b;
    return __generator(this, function(_c) {
      switch (_c.label) {
        case 0:
          if (output.statusCode !== 200 && output.statusCode >= 300) {
            return [2, deserializeAws_restXmlDeleteObjectsCommandError(output, context)];
          }
          contents = {
            $metadata: deserializeMetadata(output),
            Deleted: void 0,
            Errors: void 0,
            RequestCharged: void 0
          };
          if (output.headers["x-amz-request-charged"] !== void 0) {
            contents.RequestCharged = output.headers["x-amz-request-charged"];
          }
          _a = expectNonNull;
          _b = expectObject;
          return [4, parseBody(output.body, context)];
        case 1:
          data = _a.apply(void 0, [_b.apply(void 0, [_c.sent()]), "body"]);
          if (data.Deleted === "") {
            contents.Deleted = [];
          }
          if (data["Deleted"] !== void 0) {
            contents.Deleted = deserializeAws_restXmlDeletedObjects(getArrayIfSingleItem(data["Deleted"]), context);
          }
          if (data.Error === "") {
            contents.Errors = [];
          }
          if (data["Error"] !== void 0) {
            contents.Errors = deserializeAws_restXmlErrors(getArrayIfSingleItem(data["Error"]), context);
          }
          return [2, Promise.resolve(contents)];
      }
    });
  });
};
var deserializeAws_restXmlDeleteObjectsCommandError = function(output, context) {
  return __awaiter(void 0, void 0, void 0, function() {
    var parsedOutput, _a, response, errorCode, parsedBody, message;
    var _b;
    return __generator(this, function(_c) {
      switch (_c.label) {
        case 0:
          _a = [__assign({}, output)];
          _b = {};
          return [4, parseBody(output.body, context)];
        case 1:
          parsedOutput = __assign.apply(void 0, _a.concat([(_b.body = _c.sent(), _b)]));
          errorCode = "UnknownError";
          errorCode = loadRestXmlErrorCode(output, parsedOutput.body);
          switch (errorCode) {
            default:
              parsedBody = parsedOutput.body;
              errorCode = parsedBody.code || parsedBody.Code || errorCode;
              response = __assign(__assign({}, parsedBody), { name: "" + errorCode, message: parsedBody.message || parsedBody.Message || errorCode, $fault: "client", $metadata: deserializeMetadata(output) });
          }
          message = response.message || response.Message || errorCode;
          response.message = message;
          delete response.Message;
          return [2, Promise.reject(Object.assign(new Error(message), response))];
      }
    });
  });
};
var deserializeAws_restXmlGetObjectCommand = function(output, context) {
  return __awaiter(void 0, void 0, void 0, function() {
    var contents, data;
    return __generator(this, function(_a) {
      if (output.statusCode !== 200 && output.statusCode >= 300) {
        return [2, deserializeAws_restXmlGetObjectCommandError(output, context)];
      }
      contents = {
        $metadata: deserializeMetadata(output),
        AcceptRanges: void 0,
        Body: void 0,
        BucketKeyEnabled: void 0,
        CacheControl: void 0,
        ContentDisposition: void 0,
        ContentEncoding: void 0,
        ContentLanguage: void 0,
        ContentLength: void 0,
        ContentRange: void 0,
        ContentType: void 0,
        DeleteMarker: void 0,
        ETag: void 0,
        Expiration: void 0,
        Expires: void 0,
        LastModified: void 0,
        Metadata: void 0,
        MissingMeta: void 0,
        ObjectLockLegalHoldStatus: void 0,
        ObjectLockMode: void 0,
        ObjectLockRetainUntilDate: void 0,
        PartsCount: void 0,
        ReplicationStatus: void 0,
        RequestCharged: void 0,
        Restore: void 0,
        SSECustomerAlgorithm: void 0,
        SSECustomerKeyMD5: void 0,
        SSEKMSKeyId: void 0,
        ServerSideEncryption: void 0,
        StorageClass: void 0,
        TagCount: void 0,
        VersionId: void 0,
        WebsiteRedirectLocation: void 0
      };
      if (output.headers["x-amz-delete-marker"] !== void 0) {
        contents.DeleteMarker = parseBoolean(output.headers["x-amz-delete-marker"]);
      }
      if (output.headers["accept-ranges"] !== void 0) {
        contents.AcceptRanges = output.headers["accept-ranges"];
      }
      if (output.headers["x-amz-expiration"] !== void 0) {
        contents.Expiration = output.headers["x-amz-expiration"];
      }
      if (output.headers["x-amz-restore"] !== void 0) {
        contents.Restore = output.headers["x-amz-restore"];
      }
      if (output.headers["last-modified"] !== void 0) {
        contents.LastModified = expectNonNull(parseRfc7231DateTime(output.headers["last-modified"]));
      }
      if (output.headers["content-length"] !== void 0) {
        contents.ContentLength = strictParseLong(output.headers["content-length"]);
      }
      if (output.headers["etag"] !== void 0) {
        contents.ETag = output.headers["etag"];
      }
      if (output.headers["x-amz-missing-meta"] !== void 0) {
        contents.MissingMeta = strictParseInt32(output.headers["x-amz-missing-meta"]);
      }
      if (output.headers["x-amz-version-id"] !== void 0) {
        contents.VersionId = output.headers["x-amz-version-id"];
      }
      if (output.headers["cache-control"] !== void 0) {
        contents.CacheControl = output.headers["cache-control"];
      }
      if (output.headers["content-disposition"] !== void 0) {
        contents.ContentDisposition = output.headers["content-disposition"];
      }
      if (output.headers["content-encoding"] !== void 0) {
        contents.ContentEncoding = output.headers["content-encoding"];
      }
      if (output.headers["content-language"] !== void 0) {
        contents.ContentLanguage = output.headers["content-language"];
      }
      if (output.headers["content-range"] !== void 0) {
        contents.ContentRange = output.headers["content-range"];
      }
      if (output.headers["content-type"] !== void 0) {
        contents.ContentType = output.headers["content-type"];
      }
      if (output.headers["expires"] !== void 0) {
        contents.Expires = expectNonNull(parseRfc7231DateTime(output.headers["expires"]));
      }
      if (output.headers["x-amz-website-redirect-location"] !== void 0) {
        contents.WebsiteRedirectLocation = output.headers["x-amz-website-redirect-location"];
      }
      if (output.headers["x-amz-server-side-encryption"] !== void 0) {
        contents.ServerSideEncryption = output.headers["x-amz-server-side-encryption"];
      }
      if (output.headers["x-amz-server-side-encryption-customer-algorithm"] !== void 0) {
        contents.SSECustomerAlgorithm = output.headers["x-amz-server-side-encryption-customer-algorithm"];
      }
      if (output.headers["x-amz-server-side-encryption-customer-key-md5"] !== void 0) {
        contents.SSECustomerKeyMD5 = output.headers["x-amz-server-side-encryption-customer-key-md5"];
      }
      if (output.headers["x-amz-server-side-encryption-aws-kms-key-id"] !== void 0) {
        contents.SSEKMSKeyId = output.headers["x-amz-server-side-encryption-aws-kms-key-id"];
      }
      if (output.headers["x-amz-server-side-encryption-bucket-key-enabled"] !== void 0) {
        contents.BucketKeyEnabled = parseBoolean(output.headers["x-amz-server-side-encryption-bucket-key-enabled"]);
      }
      if (output.headers["x-amz-storage-class"] !== void 0) {
        contents.StorageClass = output.headers["x-amz-storage-class"];
      }
      if (output.headers["x-amz-request-charged"] !== void 0) {
        contents.RequestCharged = output.headers["x-amz-request-charged"];
      }
      if (output.headers["x-amz-replication-status"] !== void 0) {
        contents.ReplicationStatus = output.headers["x-amz-replication-status"];
      }
      if (output.headers["x-amz-mp-parts-count"] !== void 0) {
        contents.PartsCount = strictParseInt32(output.headers["x-amz-mp-parts-count"]);
      }
      if (output.headers["x-amz-tagging-count"] !== void 0) {
        contents.TagCount = strictParseInt32(output.headers["x-amz-tagging-count"]);
      }
      if (output.headers["x-amz-object-lock-mode"] !== void 0) {
        contents.ObjectLockMode = output.headers["x-amz-object-lock-mode"];
      }
      if (output.headers["x-amz-object-lock-retain-until-date"] !== void 0) {
        contents.ObjectLockRetainUntilDate = expectNonNull(parseRfc3339DateTime(output.headers["x-amz-object-lock-retain-until-date"]));
      }
      if (output.headers["x-amz-object-lock-legal-hold"] !== void 0) {
        contents.ObjectLockLegalHoldStatus = output.headers["x-amz-object-lock-legal-hold"];
      }
      Object.keys(output.headers).forEach(function(header) {
        if (contents.Metadata === void 0) {
          contents.Metadata = {};
        }
        if (header.startsWith("x-amz-meta-")) {
          contents.Metadata[header.substring(11)] = output.headers[header];
        }
      });
      data = output.body;
      contents.Body = data;
      return [2, Promise.resolve(contents)];
    });
  });
};
var deserializeAws_restXmlGetObjectCommandError = function(output, context) {
  return __awaiter(void 0, void 0, void 0, function() {
    var parsedOutput, _a, response, errorCode, _b, _c, _d, parsedBody, message;
    var _e;
    return __generator(this, function(_f) {
      switch (_f.label) {
        case 0:
          _a = [__assign({}, output)];
          _e = {};
          return [4, parseBody(output.body, context)];
        case 1:
          parsedOutput = __assign.apply(void 0, _a.concat([(_e.body = _f.sent(), _e)]));
          errorCode = "UnknownError";
          errorCode = loadRestXmlErrorCode(output, parsedOutput.body);
          _b = errorCode;
          switch (_b) {
            case "InvalidObjectState":
              return [3, 2];
            case "com.amazonaws.s3#InvalidObjectState":
              return [3, 2];
            case "NoSuchKey":
              return [3, 4];
            case "com.amazonaws.s3#NoSuchKey":
              return [3, 4];
          }
          return [3, 6];
        case 2:
          _c = [{}];
          return [4, deserializeAws_restXmlInvalidObjectStateResponse(parsedOutput, context)];
        case 3:
          response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([_f.sent()])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
          return [3, 7];
        case 4:
          _d = [{}];
          return [4, deserializeAws_restXmlNoSuchKeyResponse(parsedOutput, context)];
        case 5:
          response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([_f.sent()])), { name: errorCode, $metadata: deserializeMetadata(output) }]);
          return [3, 7];
        case 6:
          parsedBody = parsedOutput.body;
          errorCode = parsedBody.code || parsedBody.Code || errorCode;
          response = __assign(__assign({}, parsedBody), { name: "" + errorCode, message: parsedBody.message || parsedBody.Message || errorCode, $fault: "client", $metadata: deserializeMetadata(output) });
          _f.label = 7;
        case 7:
          message = response.message || response.Message || errorCode;
          response.message = message;
          delete response.Message;
          return [2, Promise.reject(Object.assign(new Error(message), response))];
      }
    });
  });
};
var deserializeAws_restXmlPutObjectCommand = function(output, context) {
  return __awaiter(void 0, void 0, void 0, function() {
    var contents;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          if (output.statusCode !== 200 && output.statusCode >= 300) {
            return [2, deserializeAws_restXmlPutObjectCommandError(output, context)];
          }
          contents = {
            $metadata: deserializeMetadata(output),
            BucketKeyEnabled: void 0,
            ETag: void 0,
            Expiration: void 0,
            RequestCharged: void 0,
            SSECustomerAlgorithm: void 0,
            SSECustomerKeyMD5: void 0,
            SSEKMSEncryptionContext: void 0,
            SSEKMSKeyId: void 0,
            ServerSideEncryption: void 0,
            VersionId: void 0
          };
          if (output.headers["x-amz-expiration"] !== void 0) {
            contents.Expiration = output.headers["x-amz-expiration"];
          }
          if (output.headers["etag"] !== void 0) {
            contents.ETag = output.headers["etag"];
          }
          if (output.headers["x-amz-server-side-encryption"] !== void 0) {
            contents.ServerSideEncryption = output.headers["x-amz-server-side-encryption"];
          }
          if (output.headers["x-amz-version-id"] !== void 0) {
            contents.VersionId = output.headers["x-amz-version-id"];
          }
          if (output.headers["x-amz-server-side-encryption-customer-algorithm"] !== void 0) {
            contents.SSECustomerAlgorithm = output.headers["x-amz-server-side-encryption-customer-algorithm"];
          }
          if (output.headers["x-amz-server-side-encryption-customer-key-md5"] !== void 0) {
            contents.SSECustomerKeyMD5 = output.headers["x-amz-server-side-encryption-customer-key-md5"];
          }
          if (output.headers["x-amz-server-side-encryption-aws-kms-key-id"] !== void 0) {
            contents.SSEKMSKeyId = output.headers["x-amz-server-side-encryption-aws-kms-key-id"];
          }
          if (output.headers["x-amz-server-side-encryption-context"] !== void 0) {
            contents.SSEKMSEncryptionContext = output.headers["x-amz-server-side-encryption-context"];
          }
          if (output.headers["x-amz-server-side-encryption-bucket-key-enabled"] !== void 0) {
            contents.BucketKeyEnabled = parseBoolean(output.headers["x-amz-server-side-encryption-bucket-key-enabled"]);
          }
          if (output.headers["x-amz-request-charged"] !== void 0) {
            contents.RequestCharged = output.headers["x-amz-request-charged"];
          }
          return [4, collectBody(output.body, context)];
        case 1:
          _a.sent();
          return [2, Promise.resolve(contents)];
      }
    });
  });
};
var deserializeAws_restXmlPutObjectCommandError = function(output, context) {
  return __awaiter(void 0, void 0, void 0, function() {
    var parsedOutput, _a, response, errorCode, parsedBody, message;
    var _b;
    return __generator(this, function(_c) {
      switch (_c.label) {
        case 0:
          _a = [__assign({}, output)];
          _b = {};
          return [4, parseBody(output.body, context)];
        case 1:
          parsedOutput = __assign.apply(void 0, _a.concat([(_b.body = _c.sent(), _b)]));
          errorCode = "UnknownError";
          errorCode = loadRestXmlErrorCode(output, parsedOutput.body);
          switch (errorCode) {
            default:
              parsedBody = parsedOutput.body;
              errorCode = parsedBody.code || parsedBody.Code || errorCode;
              response = __assign(__assign({}, parsedBody), { name: "" + errorCode, message: parsedBody.message || parsedBody.Message || errorCode, $fault: "client", $metadata: deserializeMetadata(output) });
          }
          message = response.message || response.Message || errorCode;
          response.message = message;
          delete response.Message;
          return [2, Promise.reject(Object.assign(new Error(message), response))];
      }
    });
  });
};
var deserializeAws_restXmlInvalidObjectStateResponse = function(parsedOutput, context) {
  return __awaiter(void 0, void 0, void 0, function() {
    var contents, data;
    return __generator(this, function(_a) {
      contents = {
        name: "InvalidObjectState",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput),
        AccessTier: void 0,
        StorageClass: void 0
      };
      data = parsedOutput.body;
      if (data["AccessTier"] !== void 0) {
        contents.AccessTier = expectString(data["AccessTier"]);
      }
      if (data["StorageClass"] !== void 0) {
        contents.StorageClass = expectString(data["StorageClass"]);
      }
      return [2, contents];
    });
  });
};
var deserializeAws_restXmlNoSuchKeyResponse = function(parsedOutput, context) {
  return __awaiter(void 0, void 0, void 0, function() {
    var contents, data;
    return __generator(this, function(_a) {
      contents = {
        name: "NoSuchKey",
        $fault: "client",
        $metadata: deserializeMetadata(parsedOutput)
      };
      data = parsedOutput.body;
      return [2, contents];
    });
  });
};
var serializeAws_restXmlDelete = function(input, context) {
  var bodyNode = new XmlNode("Delete");
  if (input.Objects !== void 0 && input.Objects !== null) {
    var nodes = serializeAws_restXmlObjectIdentifierList(input.Objects, context);
    nodes.map(function(node2) {
      node2 = node2.withName("Object");
      bodyNode.addChildNode(node2);
    });
  }
  if (input.Quiet !== void 0 && input.Quiet !== null) {
    var node = new XmlNode("Quiet").addChildNode(new XmlText(String(input.Quiet))).withName("Quiet");
    bodyNode.addChildNode(node);
  }
  return bodyNode;
};
var serializeAws_restXmlObjectIdentifier = function(input, context) {
  var bodyNode = new XmlNode("ObjectIdentifier");
  if (input.Key !== void 0 && input.Key !== null) {
    var node = new XmlNode("ObjectKey").addChildNode(new XmlText(input.Key)).withName("Key");
    bodyNode.addChildNode(node);
  }
  if (input.VersionId !== void 0 && input.VersionId !== null) {
    var node = new XmlNode("ObjectVersionId").addChildNode(new XmlText(input.VersionId)).withName("VersionId");
    bodyNode.addChildNode(node);
  }
  return bodyNode;
};
var serializeAws_restXmlObjectIdentifierList = function(input, context) {
  return input.filter(function(e) {
    return e != null;
  }).map(function(entry) {
    if (entry === null) {
      return null;
    }
    var node = serializeAws_restXmlObjectIdentifier(entry, context);
    return node.withName("member");
  });
};
var deserializeAws_restXmlDeletedObject = function(output, context) {
  var contents = {
    Key: void 0,
    VersionId: void 0,
    DeleteMarker: void 0,
    DeleteMarkerVersionId: void 0
  };
  if (output["Key"] !== void 0) {
    contents.Key = expectString(output["Key"]);
  }
  if (output["VersionId"] !== void 0) {
    contents.VersionId = expectString(output["VersionId"]);
  }
  if (output["DeleteMarker"] !== void 0) {
    contents.DeleteMarker = parseBoolean(output["DeleteMarker"]);
  }
  if (output["DeleteMarkerVersionId"] !== void 0) {
    contents.DeleteMarkerVersionId = expectString(output["DeleteMarkerVersionId"]);
  }
  return contents;
};
var deserializeAws_restXmlDeletedObjects = function(output, context) {
  return (output || []).filter(function(e) {
    return e != null;
  }).map(function(entry) {
    if (entry === null) {
      return null;
    }
    return deserializeAws_restXmlDeletedObject(entry, context);
  });
};
var deserializeAws_restXml_Error = function(output, context) {
  var contents = {
    Key: void 0,
    VersionId: void 0,
    Code: void 0,
    Message: void 0
  };
  if (output["Key"] !== void 0) {
    contents.Key = expectString(output["Key"]);
  }
  if (output["VersionId"] !== void 0) {
    contents.VersionId = expectString(output["VersionId"]);
  }
  if (output["Code"] !== void 0) {
    contents.Code = expectString(output["Code"]);
  }
  if (output["Message"] !== void 0) {
    contents.Message = expectString(output["Message"]);
  }
  return contents;
};
var deserializeAws_restXmlErrors = function(output, context) {
  return (output || []).filter(function(e) {
    return e != null;
  }).map(function(entry) {
    if (entry === null) {
      return null;
    }
    return deserializeAws_restXml_Error(entry, context);
  });
};
var deserializeMetadata = function(output) {
  var _a;
  return {
    httpStatusCode: output.statusCode,
    requestId: (_a = output.headers["x-amzn-requestid"]) !== null && _a !== void 0 ? _a : output.headers["x-amzn-request-id"],
    extendedRequestId: output.headers["x-amz-id-2"],
    cfId: output.headers["x-amz-cf-id"]
  };
};
var collectBody = function(streamBody, context) {
  if (streamBody === void 0) {
    streamBody = new Uint8Array();
  }
  if (streamBody instanceof Uint8Array) {
    return Promise.resolve(streamBody);
  }
  return context.streamCollector(streamBody) || Promise.resolve(new Uint8Array());
};
var collectBodyString = function(streamBody, context) {
  return collectBody(streamBody, context).then(function(body) {
    return context.utf8Encoder(body);
  });
};
var isSerializableHeaderValue = function(value) {
  return value !== void 0 && value !== null && value !== "" && (!Object.getOwnPropertyNames(value).includes("length") || value.length != 0) && (!Object.getOwnPropertyNames(value).includes("size") || value.size != 0);
};
var parseBody = function(streamBody, context) {
  return collectBodyString(streamBody, context).then(function(encoded) {
    if (encoded.length) {
      var parsedObj = (0, import_fast_xml_parser.parse)(encoded, {
        attributeNamePrefix: "",
        ignoreAttributes: false,
        parseNodeValue: false,
        trimValues: false,
        tagValueProcessor: function(val) {
          return val.trim() === "" && val.includes("\n") ? "" : (0, import_entities.decodeHTML)(val);
        }
      });
      var textNodeName = "#text";
      var key = Object.keys(parsedObj)[0];
      var parsedObjToReturn = parsedObj[key];
      if (parsedObjToReturn[textNodeName]) {
        parsedObjToReturn[key] = parsedObjToReturn[textNodeName];
        delete parsedObjToReturn[textNodeName];
      }
      return getValueFromTextNode(parsedObjToReturn);
    }
    return {};
  });
};
var loadRestXmlErrorCode = function(output, data) {
  if (data.Code !== void 0) {
    return data.Code;
  }
  if (output.statusCode == 404) {
    return "NotFound";
  }
  return "";
};

// node_modules/@aws-sdk/util-hex-encoding/dist-es/index.js
var SHORT_TO_HEX = {};
var HEX_TO_SHORT = {};
for (i = 0; i < 256; i++) {
  encodedByte = i.toString(16).toLowerCase();
  if (encodedByte.length === 1) {
    encodedByte = "0" + encodedByte;
  }
  SHORT_TO_HEX[i] = encodedByte;
  HEX_TO_SHORT[encodedByte] = i;
}
var encodedByte;
var i;
function fromHex(encoded) {
  if (encoded.length % 2 !== 0) {
    throw new Error("Hex encoded strings must have an even number length");
  }
  var out = new Uint8Array(encoded.length / 2);
  for (var i = 0; i < encoded.length; i += 2) {
    var encodedByte = encoded.substr(i, 2).toLowerCase();
    if (encodedByte in HEX_TO_SHORT) {
      out[i / 2] = HEX_TO_SHORT[encodedByte];
    } else {
      throw new Error("Cannot decode unrecognized sequence " + encodedByte + " as hexadecimal");
    }
  }
  return out;
}
function toHex(bytes) {
  var out = "";
  for (var i = 0; i < bytes.byteLength; i++) {
    out += SHORT_TO_HEX[bytes[i]];
  }
  return out;
}

// node_modules/@aws-sdk/signature-v4/dist-es/constants.js
var ALGORITHM_QUERY_PARAM = "X-Amz-Algorithm";
var CREDENTIAL_QUERY_PARAM = "X-Amz-Credential";
var AMZ_DATE_QUERY_PARAM = "X-Amz-Date";
var SIGNED_HEADERS_QUERY_PARAM = "X-Amz-SignedHeaders";
var EXPIRES_QUERY_PARAM = "X-Amz-Expires";
var SIGNATURE_QUERY_PARAM = "X-Amz-Signature";
var TOKEN_QUERY_PARAM = "X-Amz-Security-Token";
var AUTH_HEADER = "authorization";
var AMZ_DATE_HEADER = AMZ_DATE_QUERY_PARAM.toLowerCase();
var DATE_HEADER = "date";
var GENERATED_HEADERS = [AUTH_HEADER, AMZ_DATE_HEADER, DATE_HEADER];
var SIGNATURE_HEADER = SIGNATURE_QUERY_PARAM.toLowerCase();
var SHA256_HEADER = "x-amz-content-sha256";
var TOKEN_HEADER = TOKEN_QUERY_PARAM.toLowerCase();
var ALWAYS_UNSIGNABLE_HEADERS = {
  authorization: true,
  "cache-control": true,
  connection: true,
  expect: true,
  from: true,
  "keep-alive": true,
  "max-forwards": true,
  pragma: true,
  referer: true,
  te: true,
  trailer: true,
  "transfer-encoding": true,
  upgrade: true,
  "user-agent": true,
  "x-amzn-trace-id": true
};
var PROXY_HEADER_PATTERN = /^proxy-/;
var SEC_HEADER_PATTERN = /^sec-/;
var ALGORITHM_IDENTIFIER = "AWS4-HMAC-SHA256";
var EVENT_ALGORITHM_IDENTIFIER = "AWS4-HMAC-SHA256-PAYLOAD";
var UNSIGNED_PAYLOAD = "UNSIGNED-PAYLOAD";
var MAX_CACHE_SIZE = 50;
var KEY_TYPE_IDENTIFIER = "aws4_request";
var MAX_PRESIGNED_TTL = 60 * 60 * 24 * 7;

// node_modules/@aws-sdk/signature-v4/dist-es/credentialDerivation.js
var signingKeyCache = {};
var cacheQueue = [];
var createScope = function(shortDate, region, service) {
  return shortDate + "/" + region + "/" + service + "/" + KEY_TYPE_IDENTIFIER;
};
var getSigningKey = function(sha256Constructor, credentials, shortDate, region, service) {
  return __awaiter(void 0, void 0, void 0, function() {
    var credsHash, cacheKey, key, _a, _b, signable, e_1_1;
    var e_1, _c;
    return __generator(this, function(_d) {
      switch (_d.label) {
        case 0:
          return [4, hmac(sha256Constructor, credentials.secretAccessKey, credentials.accessKeyId)];
        case 1:
          credsHash = _d.sent();
          cacheKey = shortDate + ":" + region + ":" + service + ":" + toHex(credsHash) + ":" + credentials.sessionToken;
          if (cacheKey in signingKeyCache) {
            return [2, signingKeyCache[cacheKey]];
          }
          cacheQueue.push(cacheKey);
          while (cacheQueue.length > MAX_CACHE_SIZE) {
            delete signingKeyCache[cacheQueue.shift()];
          }
          key = "AWS4" + credentials.secretAccessKey;
          _d.label = 2;
        case 2:
          _d.trys.push([2, 7, 8, 9]);
          _a = __values2([shortDate, region, service, KEY_TYPE_IDENTIFIER]), _b = _a.next();
          _d.label = 3;
        case 3:
          if (!!_b.done)
            return [3, 6];
          signable = _b.value;
          return [4, hmac(sha256Constructor, key, signable)];
        case 4:
          key = _d.sent();
          _d.label = 5;
        case 5:
          _b = _a.next();
          return [3, 3];
        case 6:
          return [3, 9];
        case 7:
          e_1_1 = _d.sent();
          e_1 = { error: e_1_1 };
          return [3, 9];
        case 8:
          try {
            if (_b && !_b.done && (_c = _a.return))
              _c.call(_a);
          } finally {
            if (e_1)
              throw e_1.error;
          }
          return [7];
        case 9:
          return [2, signingKeyCache[cacheKey] = key];
      }
    });
  });
};
var hmac = function(ctor, secret, data) {
  var hash = new ctor(secret);
  hash.update(data);
  return hash.digest();
};

// node_modules/@aws-sdk/signature-v4/dist-es/getCanonicalHeaders.js
var getCanonicalHeaders = function(_a, unsignableHeaders, signableHeaders) {
  var e_1, _b;
  var headers = _a.headers;
  var canonical = {};
  try {
    for (var _c = __values2(Object.keys(headers).sort()), _d = _c.next(); !_d.done; _d = _c.next()) {
      var headerName = _d.value;
      var canonicalHeaderName = headerName.toLowerCase();
      if (canonicalHeaderName in ALWAYS_UNSIGNABLE_HEADERS || (unsignableHeaders === null || unsignableHeaders === void 0 ? void 0 : unsignableHeaders.has(canonicalHeaderName)) || PROXY_HEADER_PATTERN.test(canonicalHeaderName) || SEC_HEADER_PATTERN.test(canonicalHeaderName)) {
        if (!signableHeaders || signableHeaders && !signableHeaders.has(canonicalHeaderName)) {
          continue;
        }
      }
      canonical[canonicalHeaderName] = headers[headerName].trim().replace(/\s+/g, " ");
    }
  } catch (e_1_1) {
    e_1 = { error: e_1_1 };
  } finally {
    try {
      if (_d && !_d.done && (_b = _c.return))
        _b.call(_c);
    } finally {
      if (e_1)
        throw e_1.error;
    }
  }
  return canonical;
};

// node_modules/@aws-sdk/util-uri-escape/dist-es/escape-uri.js
var escapeUri = function(uri) {
  return encodeURIComponent(uri).replace(/[!'()*]/g, hexEncode);
};
var hexEncode = function(c) {
  return "%" + c.charCodeAt(0).toString(16).toUpperCase();
};

// node_modules/@aws-sdk/signature-v4/dist-es/getCanonicalQuery.js
var getCanonicalQuery = function(_a) {
  var e_1, _b;
  var _c = _a.query, query = _c === void 0 ? {} : _c;
  var keys = [];
  var serialized = {};
  var _loop_1 = function(key2) {
    if (key2.toLowerCase() === SIGNATURE_HEADER) {
      return "continue";
    }
    keys.push(key2);
    var value = query[key2];
    if (typeof value === "string") {
      serialized[key2] = escapeUri(key2) + "=" + escapeUri(value);
    } else if (Array.isArray(value)) {
      serialized[key2] = value.slice(0).sort().reduce(function(encoded, value2) {
        return encoded.concat([escapeUri(key2) + "=" + escapeUri(value2)]);
      }, []).join("&");
    }
  };
  try {
    for (var _d = __values2(Object.keys(query).sort()), _e = _d.next(); !_e.done; _e = _d.next()) {
      var key = _e.value;
      _loop_1(key);
    }
  } catch (e_1_1) {
    e_1 = { error: e_1_1 };
  } finally {
    try {
      if (_e && !_e.done && (_b = _d.return))
        _b.call(_d);
    } finally {
      if (e_1)
        throw e_1.error;
    }
  }
  return keys.map(function(key2) {
    return serialized[key2];
  }).filter(function(serialized2) {
    return serialized2;
  }).join("&");
};

// node_modules/@aws-sdk/is-array-buffer/dist-es/index.js
var isArrayBuffer = function(arg) {
  return typeof ArrayBuffer === "function" && arg instanceof ArrayBuffer || Object.prototype.toString.call(arg) === "[object ArrayBuffer]";
};

// node_modules/@aws-sdk/signature-v4/dist-es/getPayloadHash.js
var getPayloadHash = function(_a, hashConstructor) {
  var headers = _a.headers, body = _a.body;
  return __awaiter(void 0, void 0, void 0, function() {
    var _b, _c, headerName, hashCtor, _d;
    var e_1, _e;
    return __generator(this, function(_f) {
      switch (_f.label) {
        case 0:
          try {
            for (_b = __values2(Object.keys(headers)), _c = _b.next(); !_c.done; _c = _b.next()) {
              headerName = _c.value;
              if (headerName.toLowerCase() === SHA256_HEADER) {
                return [2, headers[headerName]];
              }
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (_c && !_c.done && (_e = _b.return))
                _e.call(_b);
            } finally {
              if (e_1)
                throw e_1.error;
            }
          }
          if (!(body == void 0))
            return [3, 1];
          return [2, "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"];
        case 1:
          if (!(typeof body === "string" || ArrayBuffer.isView(body) || isArrayBuffer(body)))
            return [3, 3];
          hashCtor = new hashConstructor();
          hashCtor.update(body);
          _d = toHex;
          return [4, hashCtor.digest()];
        case 2:
          return [2, _d.apply(void 0, [_f.sent()])];
        case 3:
          return [2, UNSIGNED_PAYLOAD];
      }
    });
  });
};

// node_modules/@aws-sdk/signature-v4/dist-es/headerUtil.js
var hasHeader = function(soughtHeader, headers) {
  var e_1, _a;
  soughtHeader = soughtHeader.toLowerCase();
  try {
    for (var _b = __values2(Object.keys(headers)), _c = _b.next(); !_c.done; _c = _b.next()) {
      var headerName = _c.value;
      if (soughtHeader === headerName.toLowerCase()) {
        return true;
      }
    }
  } catch (e_1_1) {
    e_1 = { error: e_1_1 };
  } finally {
    try {
      if (_c && !_c.done && (_a = _b.return))
        _a.call(_b);
    } finally {
      if (e_1)
        throw e_1.error;
    }
  }
  return false;
};

// node_modules/@aws-sdk/signature-v4/dist-es/cloneRequest.js
var cloneRequest = function(_a) {
  var headers = _a.headers, query = _a.query, rest = __rest(_a, ["headers", "query"]);
  return __assign(__assign({}, rest), { headers: __assign({}, headers), query: query ? cloneQuery2(query) : void 0 });
};
var cloneQuery2 = function(query) {
  return Object.keys(query).reduce(function(carry, paramName) {
    var _a;
    var param = query[paramName];
    return __assign(__assign({}, carry), (_a = {}, _a[paramName] = Array.isArray(param) ? __spreadArray([], __read(param)) : param, _a));
  }, {});
};

// node_modules/@aws-sdk/signature-v4/dist-es/moveHeadersToQuery.js
var moveHeadersToQuery = function(request2, options) {
  var e_1, _a;
  var _b;
  if (options === void 0) {
    options = {};
  }
  var _c = typeof request2.clone === "function" ? request2.clone() : cloneRequest(request2), headers = _c.headers, _d = _c.query, query = _d === void 0 ? {} : _d;
  try {
    for (var _e = __values2(Object.keys(headers)), _f = _e.next(); !_f.done; _f = _e.next()) {
      var name4 = _f.value;
      var lname = name4.toLowerCase();
      if (lname.substr(0, 6) === "x-amz-" && !((_b = options.unhoistableHeaders) === null || _b === void 0 ? void 0 : _b.has(lname))) {
        query[name4] = headers[name4];
        delete headers[name4];
      }
    }
  } catch (e_1_1) {
    e_1 = { error: e_1_1 };
  } finally {
    try {
      if (_f && !_f.done && (_a = _e.return))
        _a.call(_e);
    } finally {
      if (e_1)
        throw e_1.error;
    }
  }
  return __assign(__assign({}, request2), { headers, query });
};

// node_modules/@aws-sdk/signature-v4/dist-es/normalizeProvider.js
var normalizeRegionProvider = function(region) {
  if (typeof region === "string") {
    var promisified_1 = Promise.resolve(region);
    return function() {
      return promisified_1;
    };
  } else {
    return region;
  }
};
var normalizeCredentialsProvider = function(credentials) {
  if (typeof credentials === "object") {
    var promisified_2 = Promise.resolve(credentials);
    return function() {
      return promisified_2;
    };
  } else {
    return credentials;
  }
};

// node_modules/@aws-sdk/signature-v4/dist-es/prepareRequest.js
var prepareRequest = function(request2) {
  var e_1, _a;
  request2 = typeof request2.clone === "function" ? request2.clone() : cloneRequest(request2);
  try {
    for (var _b = __values2(Object.keys(request2.headers)), _c = _b.next(); !_c.done; _c = _b.next()) {
      var headerName = _c.value;
      if (GENERATED_HEADERS.indexOf(headerName.toLowerCase()) > -1) {
        delete request2.headers[headerName];
      }
    }
  } catch (e_1_1) {
    e_1 = { error: e_1_1 };
  } finally {
    try {
      if (_c && !_c.done && (_a = _b.return))
        _a.call(_b);
    } finally {
      if (e_1)
        throw e_1.error;
    }
  }
  return request2;
};

// node_modules/@aws-sdk/signature-v4/dist-es/utilDate.js
var iso8601 = function(time) {
  return toDate(time).toISOString().replace(/\.\d{3}Z$/, "Z");
};
var toDate = function(time) {
  if (typeof time === "number") {
    return new Date(time * 1e3);
  }
  if (typeof time === "string") {
    if (Number(time)) {
      return new Date(Number(time) * 1e3);
    }
    return new Date(time);
  }
  return time;
};

// node_modules/@aws-sdk/signature-v4/dist-es/SignatureV4.js
var SignatureV4 = function() {
  function SignatureV42(_a) {
    var applyChecksum = _a.applyChecksum, credentials = _a.credentials, region = _a.region, service = _a.service, sha256 = _a.sha256, _b = _a.uriEscapePath, uriEscapePath = _b === void 0 ? true : _b;
    this.service = service;
    this.sha256 = sha256;
    this.uriEscapePath = uriEscapePath;
    this.applyChecksum = typeof applyChecksum === "boolean" ? applyChecksum : true;
    this.regionProvider = normalizeRegionProvider(region);
    this.credentialProvider = normalizeCredentialsProvider(credentials);
  }
  SignatureV42.prototype.presign = function(originalRequest, options) {
    if (options === void 0) {
      options = {};
    }
    return __awaiter(this, void 0, void 0, function() {
      var _a, signingDate, _b, expiresIn, unsignableHeaders, unhoistableHeaders, signableHeaders, signingRegion, signingService, credentials, region, _c, _d, longDate, shortDate, scope, request2, canonicalHeaders, _e, _f, _g, _h, _j, _k;
      return __generator(this, function(_l) {
        switch (_l.label) {
          case 0:
            _a = options.signingDate, signingDate = _a === void 0 ? new Date() : _a, _b = options.expiresIn, expiresIn = _b === void 0 ? 3600 : _b, unsignableHeaders = options.unsignableHeaders, unhoistableHeaders = options.unhoistableHeaders, signableHeaders = options.signableHeaders, signingRegion = options.signingRegion, signingService = options.signingService;
            return [4, this.credentialProvider()];
          case 1:
            credentials = _l.sent();
            if (!(signingRegion !== null && signingRegion !== void 0))
              return [3, 2];
            _c = signingRegion;
            return [3, 4];
          case 2:
            return [4, this.regionProvider()];
          case 3:
            _c = _l.sent();
            _l.label = 4;
          case 4:
            region = _c;
            _d = formatDate(signingDate), longDate = _d.longDate, shortDate = _d.shortDate;
            if (expiresIn > MAX_PRESIGNED_TTL) {
              return [2, Promise.reject("Signature version 4 presigned URLs must have an expiration date less than one week in the future")];
            }
            scope = createScope(shortDate, region, signingService !== null && signingService !== void 0 ? signingService : this.service);
            request2 = moveHeadersToQuery(prepareRequest(originalRequest), { unhoistableHeaders });
            if (credentials.sessionToken) {
              request2.query[TOKEN_QUERY_PARAM] = credentials.sessionToken;
            }
            request2.query[ALGORITHM_QUERY_PARAM] = ALGORITHM_IDENTIFIER;
            request2.query[CREDENTIAL_QUERY_PARAM] = credentials.accessKeyId + "/" + scope;
            request2.query[AMZ_DATE_QUERY_PARAM] = longDate;
            request2.query[EXPIRES_QUERY_PARAM] = expiresIn.toString(10);
            canonicalHeaders = getCanonicalHeaders(request2, unsignableHeaders, signableHeaders);
            request2.query[SIGNED_HEADERS_QUERY_PARAM] = getCanonicalHeaderList(canonicalHeaders);
            _e = request2.query;
            _f = SIGNATURE_QUERY_PARAM;
            _g = this.getSignature;
            _h = [
              longDate,
              scope,
              this.getSigningKey(credentials, region, shortDate, signingService)
            ];
            _j = this.createCanonicalRequest;
            _k = [request2, canonicalHeaders];
            return [4, getPayloadHash(originalRequest, this.sha256)];
          case 5:
            return [4, _g.apply(this, _h.concat([_j.apply(this, _k.concat([_l.sent()]))]))];
          case 6:
            _e[_f] = _l.sent();
            return [2, request2];
        }
      });
    });
  };
  SignatureV42.prototype.sign = function(toSign, options) {
    return __awaiter(this, void 0, void 0, function() {
      return __generator(this, function(_a) {
        if (typeof toSign === "string") {
          return [2, this.signString(toSign, options)];
        } else if (toSign.headers && toSign.payload) {
          return [2, this.signEvent(toSign, options)];
        } else {
          return [2, this.signRequest(toSign, options)];
        }
        return [2];
      });
    });
  };
  SignatureV42.prototype.signEvent = function(_a, _b) {
    var headers = _a.headers, payload = _a.payload;
    var _c = _b.signingDate, signingDate = _c === void 0 ? new Date() : _c, priorSignature = _b.priorSignature, signingRegion = _b.signingRegion, signingService = _b.signingService;
    return __awaiter(this, void 0, void 0, function() {
      var region, _d, _e, shortDate, longDate, scope, hashedPayload, hash, hashedHeaders, _f, stringToSign;
      return __generator(this, function(_g) {
        switch (_g.label) {
          case 0:
            if (!(signingRegion !== null && signingRegion !== void 0))
              return [3, 1];
            _d = signingRegion;
            return [3, 3];
          case 1:
            return [4, this.regionProvider()];
          case 2:
            _d = _g.sent();
            _g.label = 3;
          case 3:
            region = _d;
            _e = formatDate(signingDate), shortDate = _e.shortDate, longDate = _e.longDate;
            scope = createScope(shortDate, region, signingService !== null && signingService !== void 0 ? signingService : this.service);
            return [4, getPayloadHash({ headers: {}, body: payload }, this.sha256)];
          case 4:
            hashedPayload = _g.sent();
            hash = new this.sha256();
            hash.update(headers);
            _f = toHex;
            return [4, hash.digest()];
          case 5:
            hashedHeaders = _f.apply(void 0, [_g.sent()]);
            stringToSign = [
              EVENT_ALGORITHM_IDENTIFIER,
              longDate,
              scope,
              priorSignature,
              hashedHeaders,
              hashedPayload
            ].join("\n");
            return [2, this.signString(stringToSign, { signingDate, signingRegion: region, signingService })];
        }
      });
    });
  };
  SignatureV42.prototype.signString = function(stringToSign, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.signingDate, signingDate = _c === void 0 ? new Date() : _c, signingRegion = _b.signingRegion, signingService = _b.signingService;
    return __awaiter(this, void 0, void 0, function() {
      var credentials, region, _d, shortDate, hash, _e, _f, _g;
      return __generator(this, function(_h) {
        switch (_h.label) {
          case 0:
            return [4, this.credentialProvider()];
          case 1:
            credentials = _h.sent();
            if (!(signingRegion !== null && signingRegion !== void 0))
              return [3, 2];
            _d = signingRegion;
            return [3, 4];
          case 2:
            return [4, this.regionProvider()];
          case 3:
            _d = _h.sent();
            _h.label = 4;
          case 4:
            region = _d;
            shortDate = formatDate(signingDate).shortDate;
            _f = (_e = this.sha256).bind;
            return [4, this.getSigningKey(credentials, region, shortDate, signingService)];
          case 5:
            hash = new (_f.apply(_e, [void 0, _h.sent()]))();
            hash.update(stringToSign);
            _g = toHex;
            return [4, hash.digest()];
          case 6:
            return [2, _g.apply(void 0, [_h.sent()])];
        }
      });
    });
  };
  SignatureV42.prototype.signRequest = function(requestToSign, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.signingDate, signingDate = _c === void 0 ? new Date() : _c, signableHeaders = _b.signableHeaders, unsignableHeaders = _b.unsignableHeaders, signingRegion = _b.signingRegion, signingService = _b.signingService;
    return __awaiter(this, void 0, void 0, function() {
      var credentials, region, _d, request2, _e, longDate, shortDate, scope, payloadHash, canonicalHeaders, signature;
      return __generator(this, function(_f) {
        switch (_f.label) {
          case 0:
            return [4, this.credentialProvider()];
          case 1:
            credentials = _f.sent();
            if (!(signingRegion !== null && signingRegion !== void 0))
              return [3, 2];
            _d = signingRegion;
            return [3, 4];
          case 2:
            return [4, this.regionProvider()];
          case 3:
            _d = _f.sent();
            _f.label = 4;
          case 4:
            region = _d;
            request2 = prepareRequest(requestToSign);
            _e = formatDate(signingDate), longDate = _e.longDate, shortDate = _e.shortDate;
            scope = createScope(shortDate, region, signingService !== null && signingService !== void 0 ? signingService : this.service);
            request2.headers[AMZ_DATE_HEADER] = longDate;
            if (credentials.sessionToken) {
              request2.headers[TOKEN_HEADER] = credentials.sessionToken;
            }
            return [4, getPayloadHash(request2, this.sha256)];
          case 5:
            payloadHash = _f.sent();
            if (!hasHeader(SHA256_HEADER, request2.headers) && this.applyChecksum) {
              request2.headers[SHA256_HEADER] = payloadHash;
            }
            canonicalHeaders = getCanonicalHeaders(request2, unsignableHeaders, signableHeaders);
            return [4, this.getSignature(longDate, scope, this.getSigningKey(credentials, region, shortDate, signingService), this.createCanonicalRequest(request2, canonicalHeaders, payloadHash))];
          case 6:
            signature = _f.sent();
            request2.headers[AUTH_HEADER] = ALGORITHM_IDENTIFIER + " " + ("Credential=" + credentials.accessKeyId + "/" + scope + ", ") + ("SignedHeaders=" + getCanonicalHeaderList(canonicalHeaders) + ", ") + ("Signature=" + signature);
            return [2, request2];
        }
      });
    });
  };
  SignatureV42.prototype.createCanonicalRequest = function(request2, canonicalHeaders, payloadHash) {
    var sortedHeaders = Object.keys(canonicalHeaders).sort();
    return request2.method + "\n" + this.getCanonicalPath(request2) + "\n" + getCanonicalQuery(request2) + "\n" + sortedHeaders.map(function(name4) {
      return name4 + ":" + canonicalHeaders[name4];
    }).join("\n") + "\n\n" + sortedHeaders.join(";") + "\n" + payloadHash;
  };
  SignatureV42.prototype.createStringToSign = function(longDate, credentialScope, canonicalRequest) {
    return __awaiter(this, void 0, void 0, function() {
      var hash, hashedRequest;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            hash = new this.sha256();
            hash.update(canonicalRequest);
            return [4, hash.digest()];
          case 1:
            hashedRequest = _a.sent();
            return [2, ALGORITHM_IDENTIFIER + "\n" + longDate + "\n" + credentialScope + "\n" + toHex(hashedRequest)];
        }
      });
    });
  };
  SignatureV42.prototype.getCanonicalPath = function(_a) {
    var path3 = _a.path;
    if (this.uriEscapePath) {
      var doubleEncoded = encodeURIComponent(path3.replace(/^\//, ""));
      return "/" + doubleEncoded.replace(/%2F/g, "/");
    }
    return path3;
  };
  SignatureV42.prototype.getSignature = function(longDate, credentialScope, keyPromise, canonicalRequest) {
    return __awaiter(this, void 0, void 0, function() {
      var stringToSign, hash, _a, _b, _c;
      return __generator(this, function(_d) {
        switch (_d.label) {
          case 0:
            return [4, this.createStringToSign(longDate, credentialScope, canonicalRequest)];
          case 1:
            stringToSign = _d.sent();
            _b = (_a = this.sha256).bind;
            return [4, keyPromise];
          case 2:
            hash = new (_b.apply(_a, [void 0, _d.sent()]))();
            hash.update(stringToSign);
            _c = toHex;
            return [4, hash.digest()];
          case 3:
            return [2, _c.apply(void 0, [_d.sent()])];
        }
      });
    });
  };
  SignatureV42.prototype.getSigningKey = function(credentials, region, shortDate, service) {
    return getSigningKey(this.sha256, credentials, shortDate, region, service || this.service);
  };
  return SignatureV42;
}();
var formatDate = function(now) {
  var longDate = iso8601(now).replace(/[\-:]/g, "");
  return {
    longDate,
    shortDate: longDate.substr(0, 8)
  };
};
var getCanonicalHeaderList = function(headers) {
  return Object.keys(headers).sort().join(";");
};

// node_modules/@aws-sdk/middleware-sdk-s3/dist-es/S3SignatureV4.js
var S3SignatureV4 = function() {
  function S3SignatureV42(options) {
    this.sigv4Signer = new SignatureV4(options);
    this.signerOptions = options;
  }
  S3SignatureV42.prototype.sign = function(requestToSign, options) {
    if (options === void 0) {
      options = {};
    }
    return __awaiter(this, void 0, void 0, function() {
      return __generator(this, function(_a) {
        if (options.signingRegion === "*") {
          if (this.signerOptions.runtime !== "node")
            throw new Error("This request requires signing with SigV4Asymmetric algorithm. It's only available in Node.js");
          return [2, this.getSigv4aSigner().sign(requestToSign, options)];
        }
        return [2, this.sigv4Signer.sign(requestToSign, options)];
      });
    });
  };
  S3SignatureV42.prototype.presign = function(originalRequest, options) {
    if (options === void 0) {
      options = {};
    }
    return __awaiter(this, void 0, void 0, function() {
      return __generator(this, function(_a) {
        if (options.signingRegion === "*") {
          if (this.signerOptions.runtime !== "node")
            throw new Error("This request requires signing with SigV4Asymmetric algorithm. It's only available in Node.js");
          return [2, this.getSigv4aSigner().presign(originalRequest, options)];
        }
        return [2, this.sigv4Signer.presign(originalRequest, options)];
      });
    });
  };
  S3SignatureV42.prototype.getSigv4aSigner = function() {
    if (!this.sigv4aSigner) {
      var CrtSignerV4_1;
      try {
        CrtSignerV4_1 = require("@aws-sdk/signature-v4-crt").CrtSignerV4;
        if (typeof CrtSignerV4_1 !== "function")
          throw new Error();
      } catch (e) {
        e.message = e.message + '\nPlease check if you have installed "@aws-sdk/signature-v4-crt" package explicitly. \nFor more information please go to https://github.com/aws/aws-sdk-js-v3#known-issues';
        throw e;
      }
      this.sigv4aSigner = new CrtSignerV4_1(__assign(__assign({}, this.signerOptions), { signingAlgorithm: 1 }));
    }
    return this.sigv4aSigner;
  };
  return S3SignatureV42;
}();

// node_modules/@aws-sdk/middleware-sdk-s3/dist-es/use-regional-endpoint.js
var useRegionalEndpointMiddleware = function(config) {
  return function(next) {
    return function(args) {
      return __awaiter(void 0, void 0, void 0, function() {
        var request2, _a;
        return __generator(this, function(_b) {
          switch (_b.label) {
            case 0:
              request2 = args.request;
              if (!HttpRequest.isInstance(request2) || config.isCustomEndpoint)
                return [2, next(__assign({}, args))];
              if (!(request2.hostname === "s3.amazonaws.com"))
                return [3, 1];
              request2.hostname = "s3.us-east-1.amazonaws.com";
              return [3, 3];
            case 1:
              _a = "aws-global";
              return [4, config.region()];
            case 2:
              if (_a === _b.sent()) {
                request2.hostname = "s3.amazonaws.com";
              }
              _b.label = 3;
            case 3:
              return [2, next(__assign({}, args))];
          }
        });
      });
    };
  };
};
var useRegionalEndpointMiddlewareOptions = {
  step: "build",
  tags: ["USE_REGIONAL_ENDPOINT", "S3"],
  name: "useRegionalEndpointMiddleware",
  override: true
};
var getUseRegionalEndpointPlugin = function(config) {
  return {
    applyToStack: function(clientStack) {
      clientStack.add(useRegionalEndpointMiddleware(config), useRegionalEndpointMiddlewareOptions);
    }
  };
};

// node_modules/@aws-sdk/middleware-sdk-s3/dist-es/validate-bucket-name.js
function validateBucketNameMiddleware() {
  var _this = this;
  return function(next) {
    return function(args) {
      return __awaiter(_this, void 0, void 0, function() {
        var Bucket2, err;
        return __generator(this, function(_a) {
          Bucket2 = args.input.Bucket;
          if (typeof Bucket2 === "string" && !validate(Bucket2) && Bucket2.indexOf("/") >= 0) {
            err = new Error("Bucket name shouldn't contain '/', received '" + Bucket2 + "'");
            err.name = "InvalidBucketName";
            throw err;
          }
          return [2, next(__assign({}, args))];
        });
      });
    };
  };
}
var validateBucketNameMiddlewareOptions = {
  step: "initialize",
  tags: ["VALIDATE_BUCKET_NAME"],
  name: "validateBucketNameMiddleware",
  override: true
};
var getValidateBucketNamePlugin = function(unused) {
  return {
    applyToStack: function(clientStack) {
      clientStack.add(validateBucketNameMiddleware(), validateBucketNameMiddlewareOptions);
    }
  };
};

// node_modules/@aws-sdk/middleware-ssec/dist-es/index.js
function ssecMiddleware(options) {
  var _this = this;
  return function(next) {
    return function(args) {
      return __awaiter(_this, void 0, void 0, function() {
        var input, properties, properties_1, properties_1_1, prop, value, valueView, encoded, hash, _a, _b, _c, _d, e_1_1;
        var e_1, _e, _f;
        return __generator(this, function(_g) {
          switch (_g.label) {
            case 0:
              input = __assign({}, args.input);
              properties = [
                {
                  target: "SSECustomerKey",
                  hash: "SSECustomerKeyMD5"
                },
                {
                  target: "CopySourceSSECustomerKey",
                  hash: "CopySourceSSECustomerKeyMD5"
                }
              ];
              _g.label = 1;
            case 1:
              _g.trys.push([1, 6, 7, 8]);
              properties_1 = __values2(properties), properties_1_1 = properties_1.next();
              _g.label = 2;
            case 2:
              if (!!properties_1_1.done)
                return [3, 5];
              prop = properties_1_1.value;
              value = input[prop.target];
              if (!value)
                return [3, 4];
              valueView = ArrayBuffer.isView(value) ? new Uint8Array(value.buffer, value.byteOffset, value.byteLength) : typeof value === "string" ? options.utf8Decoder(value) : new Uint8Array(value);
              encoded = options.base64Encoder(valueView);
              hash = new options.md5();
              hash.update(valueView);
              _a = [__assign({}, input)];
              _f = {}, _f[prop.target] = encoded;
              _b = prop.hash;
              _d = (_c = options).base64Encoder;
              return [4, hash.digest()];
            case 3:
              input = __assign.apply(void 0, _a.concat([(_f[_b] = _d.apply(_c, [_g.sent()]), _f)]));
              _g.label = 4;
            case 4:
              properties_1_1 = properties_1.next();
              return [3, 2];
            case 5:
              return [3, 8];
            case 6:
              e_1_1 = _g.sent();
              e_1 = { error: e_1_1 };
              return [3, 8];
            case 7:
              try {
                if (properties_1_1 && !properties_1_1.done && (_e = properties_1.return))
                  _e.call(properties_1);
              } finally {
                if (e_1)
                  throw e_1.error;
              }
              return [7];
            case 8:
              return [2, next(__assign(__assign({}, args), { input }))];
          }
        });
      });
    };
  };
}
var ssecMiddlewareOptions = {
  name: "ssecMiddleware",
  step: "initialize",
  tags: ["SSE"],
  override: true
};
var getSsecPlugin = function(config) {
  return {
    applyToStack: function(clientStack) {
      clientStack.add(ssecMiddleware(config), ssecMiddlewareOptions);
    }
  };
};

// node_modules/@aws-sdk/middleware-apply-body-checksum/dist-es/applyMd5BodyChecksumMiddleware.js
var applyMd5BodyChecksumMiddleware = function(options) {
  return function(next) {
    return function(args) {
      return __awaiter(void 0, void 0, void 0, function() {
        var request2, body, headers, digest, hash, _a, _b, _c, _d, _e;
        var _f, _g;
        return __generator(this, function(_h) {
          switch (_h.label) {
            case 0:
              request2 = args.request;
              if (!HttpRequest.isInstance(request2))
                return [3, 2];
              body = request2.body, headers = request2.headers;
              if (!!hasHeader2("content-md5", headers))
                return [3, 2];
              digest = void 0;
              if (body === void 0 || typeof body === "string" || ArrayBuffer.isView(body) || isArrayBuffer(body)) {
                hash = new options.md5();
                hash.update(body || "");
                digest = hash.digest();
              } else {
                digest = options.streamHasher(options.md5, body);
              }
              _a = [__assign({}, request2)];
              _f = {};
              _b = [__assign({}, headers)];
              _g = {};
              _c = "content-md5";
              _e = (_d = options).base64Encoder;
              return [4, digest];
            case 1:
              request2 = __assign.apply(void 0, _a.concat([(_f.headers = __assign.apply(void 0, _b.concat([(_g[_c] = _e.apply(_d, [_h.sent()]), _g)])), _f)]));
              _h.label = 2;
            case 2:
              return [2, next(__assign(__assign({}, args), { request: request2 }))];
          }
        });
      });
    };
  };
};
var applyMd5BodyChecksumMiddlewareOptions = {
  name: "applyMd5BodyChecksumMiddleware",
  step: "build",
  tags: ["SET_CONTENT_MD5", "BODY_CHECKSUM"],
  override: true
};
var getApplyMd5BodyChecksumPlugin = function(config) {
  return {
    applyToStack: function(clientStack) {
      clientStack.add(applyMd5BodyChecksumMiddleware(config), applyMd5BodyChecksumMiddlewareOptions);
    }
  };
};
var hasHeader2 = function(soughtHeader, headers) {
  var e_1, _a;
  soughtHeader = soughtHeader.toLowerCase();
  try {
    for (var _b = __values2(Object.keys(headers)), _c = _b.next(); !_c.done; _c = _b.next()) {
      var headerName = _c.value;
      if (soughtHeader === headerName.toLowerCase()) {
        return true;
      }
    }
  } catch (e_1_1) {
    e_1 = { error: e_1_1 };
  } finally {
    try {
      if (_c && !_c.done && (_a = _b.return))
        _a.call(_b);
    } finally {
      if (e_1)
        throw e_1.error;
    }
  }
  return false;
};

// node_modules/@aws-sdk/client-s3/dist-es/commands/DeleteObjectsCommand.js
var DeleteObjectsCommand = function(_super) {
  __extends(DeleteObjectsCommand2, _super);
  function DeleteObjectsCommand2(input) {
    var _this = _super.call(this) || this;
    _this.input = input;
    return _this;
  }
  DeleteObjectsCommand2.prototype.resolveMiddleware = function(clientStack, configuration, options) {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
    this.middlewareStack.use(getBucketEndpointPlugin(configuration));
    this.middlewareStack.use(getApplyMd5BodyChecksumPlugin(configuration));
    var stack = clientStack.concat(this.middlewareStack);
    var logger = configuration.logger;
    var clientName = "S3Client";
    var commandName = "DeleteObjectsCommand";
    var handlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: DeleteObjectsRequest.filterSensitiveLog,
      outputFilterSensitiveLog: DeleteObjectsOutput.filterSensitiveLog
    };
    var requestHandler = configuration.requestHandler;
    return stack.resolve(function(request2) {
      return requestHandler.handle(request2.request, options || {});
    }, handlerExecutionContext);
  };
  DeleteObjectsCommand2.prototype.serialize = function(input, context) {
    return serializeAws_restXmlDeleteObjectsCommand(input, context);
  };
  DeleteObjectsCommand2.prototype.deserialize = function(output, context) {
    return deserializeAws_restXmlDeleteObjectsCommand(output, context);
  };
  return DeleteObjectsCommand2;
}(Command);

// node_modules/@aws-sdk/client-s3/dist-es/commands/GetObjectCommand.js
var GetObjectCommand = function(_super) {
  __extends(GetObjectCommand2, _super);
  function GetObjectCommand2(input) {
    var _this = _super.call(this) || this;
    _this.input = input;
    return _this;
  }
  GetObjectCommand2.prototype.resolveMiddleware = function(clientStack, configuration, options) {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
    this.middlewareStack.use(getSsecPlugin(configuration));
    this.middlewareStack.use(getBucketEndpointPlugin(configuration));
    var stack = clientStack.concat(this.middlewareStack);
    var logger = configuration.logger;
    var clientName = "S3Client";
    var commandName = "GetObjectCommand";
    var handlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: GetObjectRequest.filterSensitiveLog,
      outputFilterSensitiveLog: GetObjectOutput.filterSensitiveLog
    };
    var requestHandler = configuration.requestHandler;
    return stack.resolve(function(request2) {
      return requestHandler.handle(request2.request, options || {});
    }, handlerExecutionContext);
  };
  GetObjectCommand2.prototype.serialize = function(input, context) {
    return serializeAws_restXmlGetObjectCommand(input, context);
  };
  GetObjectCommand2.prototype.deserialize = function(output, context) {
    return deserializeAws_restXmlGetObjectCommand(output, context);
  };
  return GetObjectCommand2;
}(Command);

// node_modules/@aws-sdk/client-s3/dist-es/commands/PutObjectCommand.js
var PutObjectCommand = function(_super) {
  __extends(PutObjectCommand2, _super);
  function PutObjectCommand2(input) {
    var _this = _super.call(this) || this;
    _this.input = input;
    return _this;
  }
  PutObjectCommand2.prototype.resolveMiddleware = function(clientStack, configuration, options) {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
    this.middlewareStack.use(getSsecPlugin(configuration));
    this.middlewareStack.use(getBucketEndpointPlugin(configuration));
    var stack = clientStack.concat(this.middlewareStack);
    var logger = configuration.logger;
    var clientName = "S3Client";
    var commandName = "PutObjectCommand";
    var handlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: PutObjectRequest.filterSensitiveLog,
      outputFilterSensitiveLog: PutObjectOutput.filterSensitiveLog
    };
    var requestHandler = configuration.requestHandler;
    return stack.resolve(function(request2) {
      return requestHandler.handle(request2.request, options || {});
    }, handlerExecutionContext);
  };
  PutObjectCommand2.prototype.serialize = function(input, context) {
    return serializeAws_restXmlPutObjectCommand(input, context);
  };
  PutObjectCommand2.prototype.deserialize = function(output, context) {
    return deserializeAws_restXmlPutObjectCommand(output, context);
  };
  return PutObjectCommand2;
}(Command);

// node_modules/@aws-sdk/config-resolver/dist-es/endpointsConfig/NodeUseDualstackEndpointConfigOptions.js
var ENV_USE_DUALSTACK_ENDPOINT = "AWS_USE_DUALSTACK_ENDPOINT";
var CONFIG_USE_DUALSTACK_ENDPOINT = "use_dualstack_endpoint";
var NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS = {
  environmentVariableSelector: function(env2) {
    return booleanSelector(env2, ENV_USE_DUALSTACK_ENDPOINT, SelectorType.ENV);
  },
  configFileSelector: function(profile) {
    return booleanSelector(profile, CONFIG_USE_DUALSTACK_ENDPOINT, SelectorType.CONFIG);
  },
  default: false
};

// node_modules/@aws-sdk/config-resolver/dist-es/endpointsConfig/NodeUseFipsEndpointConfigOptions.js
var ENV_USE_FIPS_ENDPOINT = "AWS_USE_FIPS_ENDPOINT";
var CONFIG_USE_FIPS_ENDPOINT = "use_fips_endpoint";
var NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS = {
  environmentVariableSelector: function(env2) {
    return booleanSelector(env2, ENV_USE_FIPS_ENDPOINT, SelectorType.ENV);
  },
  configFileSelector: function(profile) {
    return booleanSelector(profile, CONFIG_USE_FIPS_ENDPOINT, SelectorType.CONFIG);
  },
  default: false
};

// node_modules/@aws-sdk/config-resolver/dist-es/endpointsConfig/utils/normalizeBoolean.js
var normalizeBoolean = function(value) {
  if (typeof value === "boolean") {
    var promisified_1 = Promise.resolve(value);
    return function() {
      return promisified_1;
    };
  }
  return value;
};

// node_modules/@aws-sdk/config-resolver/dist-es/endpointsConfig/utils/normalizeEndpoint.js
var normalizeEndpoint = function(_a) {
  var endpoint = _a.endpoint, urlParser = _a.urlParser;
  if (typeof endpoint === "string") {
    var promisified_1 = Promise.resolve(urlParser(endpoint));
    return function() {
      return promisified_1;
    };
  } else if (typeof endpoint === "object") {
    var promisified_2 = Promise.resolve(endpoint);
    return function() {
      return promisified_2;
    };
  }
  return endpoint;
};

// node_modules/@aws-sdk/config-resolver/dist-es/endpointsConfig/utils/getEndpointFromRegion.js
var getEndpointFromRegion = function(input) {
  return __awaiter(void 0, void 0, void 0, function() {
    var _a, tls, region, dnsHostRegex, useDualstackEndpoint, useFipsEndpoint, hostname;
    var _b;
    return __generator(this, function(_c) {
      switch (_c.label) {
        case 0:
          _a = input.tls, tls = _a === void 0 ? true : _a;
          return [4, input.region()];
        case 1:
          region = _c.sent();
          dnsHostRegex = new RegExp(/^([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9])$/);
          if (!dnsHostRegex.test(region)) {
            throw new Error("Invalid region in client config");
          }
          return [4, input.useDualstackEndpoint()];
        case 2:
          useDualstackEndpoint = _c.sent();
          return [4, input.useFipsEndpoint()];
        case 3:
          useFipsEndpoint = _c.sent();
          return [4, input.regionInfoProvider(region, { useDualstackEndpoint, useFipsEndpoint })];
        case 4:
          hostname = ((_b = _c.sent()) !== null && _b !== void 0 ? _b : {}).hostname;
          if (!hostname) {
            throw new Error("Cannot resolve hostname from client config");
          }
          return [2, input.urlParser((tls ? "https:" : "http:") + "//" + hostname)];
      }
    });
  });
};

// node_modules/@aws-sdk/config-resolver/dist-es/endpointsConfig/resolveEndpointsConfig.js
var resolveEndpointsConfig = function(input) {
  var _a;
  var useDualstackEndpoint = normalizeBoolean(input.useDualstackEndpoint);
  var endpoint = input.endpoint, useFipsEndpoint = input.useFipsEndpoint;
  return __assign(__assign({}, input), { tls: (_a = input.tls) !== null && _a !== void 0 ? _a : true, endpoint: endpoint ? normalizeEndpoint(__assign(__assign({}, input), { endpoint })) : function() {
    return getEndpointFromRegion(__assign(__assign({}, input), { useDualstackEndpoint, useFipsEndpoint }));
  }, isCustomEndpoint: endpoint ? true : false, useDualstackEndpoint });
};

// node_modules/@aws-sdk/config-resolver/dist-es/regionConfig/config.js
var REGION_ENV_NAME = "AWS_REGION";
var REGION_INI_NAME = "region";
var NODE_REGION_CONFIG_OPTIONS = {
  environmentVariableSelector: function(env2) {
    return env2[REGION_ENV_NAME];
  },
  configFileSelector: function(profile) {
    return profile[REGION_INI_NAME];
  },
  default: function() {
    throw new Error("Region is missing");
  }
};
var NODE_REGION_CONFIG_FILE_OPTIONS = {
  preferredFile: "credentials"
};

// node_modules/@aws-sdk/config-resolver/dist-es/regionConfig/isFipsRegion.js
var isFipsRegion = function(region) {
  return typeof region === "string" && (region.startsWith("fips-") || region.endsWith("-fips"));
};

// node_modules/@aws-sdk/config-resolver/dist-es/regionConfig/getRealRegion.js
var getRealRegion = function(region) {
  return isFipsRegion(region) ? ["fips-aws-global", "aws-fips"].includes(region) ? "us-east-1" : region.replace(/fips-(dkr-|prod-)?|-fips/, "") : region;
};

// node_modules/@aws-sdk/config-resolver/dist-es/regionConfig/resolveRegionConfig.js
var resolveRegionConfig = function(input) {
  var region = input.region, useFipsEndpoint = input.useFipsEndpoint;
  if (!region) {
    throw new Error("Region is missing");
  }
  return __assign(__assign({}, input), { region: function() {
    return __awaiter(void 0, void 0, void 0, function() {
      var providedRegion;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            if (typeof region === "string") {
              return [2, getRealRegion(region)];
            }
            return [4, region()];
          case 1:
            providedRegion = _a.sent();
            return [2, getRealRegion(providedRegion)];
        }
      });
    });
  }, useFipsEndpoint: function() {
    return __awaiter(void 0, void 0, void 0, function() {
      var providedRegion, _a;
      return __generator(this, function(_b) {
        switch (_b.label) {
          case 0:
            if (!(typeof region === "string"))
              return [3, 1];
            _a = region;
            return [3, 3];
          case 1:
            return [4, region()];
          case 2:
            _a = _b.sent();
            _b.label = 3;
          case 3:
            providedRegion = _a;
            if (isFipsRegion(providedRegion)) {
              return [2, true];
            }
            return [2, typeof useFipsEndpoint === "boolean" ? Promise.resolve(useFipsEndpoint) : useFipsEndpoint()];
        }
      });
    });
  } });
};

// node_modules/@aws-sdk/config-resolver/dist-es/regionInfo/getHostnameFromVariants.js
var getHostnameFromVariants = function(variants, _a) {
  var _b;
  if (variants === void 0) {
    variants = [];
  }
  var useFipsEndpoint = _a.useFipsEndpoint, useDualstackEndpoint = _a.useDualstackEndpoint;
  return (_b = variants.find(function(_a2) {
    var tags = _a2.tags;
    return useFipsEndpoint === tags.includes("fips") && useDualstackEndpoint === tags.includes("dualstack");
  })) === null || _b === void 0 ? void 0 : _b.hostname;
};

// node_modules/@aws-sdk/config-resolver/dist-es/regionInfo/getResolvedHostname.js
var getResolvedHostname = function(resolvedRegion, _a) {
  var regionHostname = _a.regionHostname, partitionHostname = _a.partitionHostname;
  return regionHostname ? regionHostname : partitionHostname ? partitionHostname.replace("{region}", resolvedRegion) : void 0;
};

// node_modules/@aws-sdk/config-resolver/dist-es/regionInfo/getResolvedPartition.js
var getResolvedPartition = function(region, _a) {
  var _b;
  var partitionHash4 = _a.partitionHash;
  return (_b = Object.keys(partitionHash4 || {}).find(function(key) {
    return partitionHash4[key].regions.includes(region);
  })) !== null && _b !== void 0 ? _b : "aws";
};

// node_modules/@aws-sdk/config-resolver/dist-es/regionInfo/getResolvedSigningRegion.js
var getResolvedSigningRegion = function(hostname, _a) {
  var signingRegion = _a.signingRegion, regionRegex = _a.regionRegex, useFipsEndpoint = _a.useFipsEndpoint;
  if (signingRegion) {
    return signingRegion;
  } else if (useFipsEndpoint) {
    var regionRegexJs = regionRegex.replace("\\\\", "\\").replace(/^\^/g, "\\.").replace(/\$$/g, "\\.");
    var regionRegexmatchArray = hostname.match(regionRegexJs);
    if (regionRegexmatchArray) {
      return regionRegexmatchArray[0].slice(1, -1);
    }
  }
};

// node_modules/@aws-sdk/config-resolver/dist-es/regionInfo/getRegionInfo.js
var getRegionInfo = function(region, _a) {
  var _b, _c, _d, _e, _f, _g;
  var _h = _a.useFipsEndpoint, useFipsEndpoint = _h === void 0 ? false : _h, _j = _a.useDualstackEndpoint, useDualstackEndpoint = _j === void 0 ? false : _j, signingService = _a.signingService, regionHash4 = _a.regionHash, partitionHash4 = _a.partitionHash;
  var partition = getResolvedPartition(region, { partitionHash: partitionHash4 });
  var resolvedRegion = region in regionHash4 ? region : (_c = (_b = partitionHash4[partition]) === null || _b === void 0 ? void 0 : _b.endpoint) !== null && _c !== void 0 ? _c : region;
  var hostnameOptions = { useFipsEndpoint, useDualstackEndpoint };
  var regionHostname = getHostnameFromVariants((_d = regionHash4[resolvedRegion]) === null || _d === void 0 ? void 0 : _d.variants, hostnameOptions);
  var partitionHostname = getHostnameFromVariants((_e = partitionHash4[partition]) === null || _e === void 0 ? void 0 : _e.variants, hostnameOptions);
  var hostname = getResolvedHostname(resolvedRegion, { regionHostname, partitionHostname });
  if (hostname === void 0) {
    throw new Error("Endpoint resolution failed for: " + { resolvedRegion, useFipsEndpoint, useDualstackEndpoint });
  }
  var signingRegion = getResolvedSigningRegion(hostname, {
    signingRegion: (_f = regionHash4[resolvedRegion]) === null || _f === void 0 ? void 0 : _f.signingRegion,
    regionRegex: partitionHash4[partition].regionRegex,
    useFipsEndpoint
  });
  return __assign(__assign({ partition, signingService, hostname }, signingRegion && { signingRegion }), ((_g = regionHash4[resolvedRegion]) === null || _g === void 0 ? void 0 : _g.signingService) && {
    signingService: regionHash4[resolvedRegion].signingService
  });
};

// node_modules/@aws-sdk/eventstream-serde-config-resolver/dist-es/EventStreamSerdeConfig.js
var resolveEventStreamSerdeConfig = function(input) {
  return __assign(__assign({}, input), { eventStreamMarshaller: input.eventStreamSerdeProvider(input) });
};

// node_modules/@aws-sdk/middleware-content-length/dist-es/index.js
var CONTENT_LENGTH_HEADER = "content-length";
function contentLengthMiddleware(bodyLengthChecker) {
  var _this = this;
  return function(next) {
    return function(args) {
      return __awaiter(_this, void 0, void 0, function() {
        var request2, body, headers, length;
        var _a;
        return __generator(this, function(_b) {
          request2 = args.request;
          if (HttpRequest.isInstance(request2)) {
            body = request2.body, headers = request2.headers;
            if (body && Object.keys(headers).map(function(str) {
              return str.toLowerCase();
            }).indexOf(CONTENT_LENGTH_HEADER) === -1) {
              length = bodyLengthChecker(body);
              if (length !== void 0) {
                request2.headers = __assign(__assign({}, request2.headers), (_a = {}, _a[CONTENT_LENGTH_HEADER] = String(length), _a));
              }
            }
          }
          return [2, next(__assign(__assign({}, args), { request: request2 }))];
        });
      });
    };
  };
}
var contentLengthMiddlewareOptions = {
  step: "build",
  tags: ["SET_CONTENT_LENGTH", "CONTENT_LENGTH"],
  name: "contentLengthMiddleware",
  override: true
};
var getContentLengthPlugin = function(options) {
  return {
    applyToStack: function(clientStack) {
      clientStack.add(contentLengthMiddleware(options.bodyLengthChecker), contentLengthMiddlewareOptions);
    }
  };
};

// node_modules/@aws-sdk/middleware-expect-continue/dist-es/index.js
function addExpectContinueMiddleware(options) {
  var _this = this;
  return function(next) {
    return function(args) {
      return __awaiter(_this, void 0, void 0, function() {
        var request2;
        return __generator(this, function(_a) {
          request2 = args.request;
          if (HttpRequest.isInstance(request2) && request2.body && options.runtime === "node") {
            request2.headers = __assign(__assign({}, request2.headers), { Expect: "100-continue" });
          }
          return [2, next(__assign(__assign({}, args), { request: request2 }))];
        });
      });
    };
  };
}
var addExpectContinueMiddlewareOptions = {
  step: "build",
  tags: ["SET_EXPECT_HEADER", "EXPECT_HEADER"],
  name: "addExpectContinueMiddleware",
  override: true
};
var getAddExpectContinuePlugin = function(options) {
  return {
    applyToStack: function(clientStack) {
      clientStack.add(addExpectContinueMiddleware(options), addExpectContinueMiddlewareOptions);
    }
  };
};

// node_modules/@aws-sdk/middleware-host-header/dist-es/index.js
function resolveHostHeaderConfig(input) {
  return input;
}
var hostHeaderMiddleware = function(options) {
  return function(next) {
    return function(args) {
      return __awaiter(void 0, void 0, void 0, function() {
        var request2, _a, handlerProtocol;
        return __generator(this, function(_b) {
          if (!HttpRequest.isInstance(args.request))
            return [2, next(args)];
          request2 = args.request;
          _a = (options.requestHandler.metadata || {}).handlerProtocol, handlerProtocol = _a === void 0 ? "" : _a;
          if (handlerProtocol.indexOf("h2") >= 0 && !request2.headers[":authority"]) {
            delete request2.headers["host"];
            request2.headers[":authority"] = "";
          } else if (!request2.headers["host"]) {
            request2.headers["host"] = request2.hostname;
          }
          return [2, next(args)];
        });
      });
    };
  };
};
var hostHeaderMiddlewareOptions = {
  name: "hostHeaderMiddleware",
  step: "build",
  priority: "low",
  tags: ["HOST"],
  override: true
};
var getHostHeaderPlugin = function(options) {
  return {
    applyToStack: function(clientStack) {
      clientStack.add(hostHeaderMiddleware(options), hostHeaderMiddlewareOptions);
    }
  };
};

// node_modules/@aws-sdk/middleware-logger/dist-es/loggerMiddleware.js
var loggerMiddleware = function() {
  return function(next, context) {
    return function(args) {
      return __awaiter(void 0, void 0, void 0, function() {
        var clientName, commandName, inputFilterSensitiveLog, logger, outputFilterSensitiveLog, response, _a, $metadata, outputWithoutMetadata;
        return __generator(this, function(_b) {
          switch (_b.label) {
            case 0:
              clientName = context.clientName, commandName = context.commandName, inputFilterSensitiveLog = context.inputFilterSensitiveLog, logger = context.logger, outputFilterSensitiveLog = context.outputFilterSensitiveLog;
              return [4, next(args)];
            case 1:
              response = _b.sent();
              if (!logger) {
                return [2, response];
              }
              if (typeof logger.info === "function") {
                _a = response.output, $metadata = _a.$metadata, outputWithoutMetadata = __rest(_a, ["$metadata"]);
                logger.info({
                  clientName,
                  commandName,
                  input: inputFilterSensitiveLog(args.input),
                  output: outputFilterSensitiveLog(outputWithoutMetadata),
                  metadata: $metadata
                });
              }
              return [2, response];
          }
        });
      });
    };
  };
};
var loggerMiddlewareOptions = {
  name: "loggerMiddleware",
  tags: ["LOGGER"],
  step: "initialize",
  override: true
};
var getLoggerPlugin = function(options) {
  return {
    applyToStack: function(clientStack) {
      clientStack.add(loggerMiddleware(), loggerMiddlewareOptions);
    }
  };
};

// node_modules/@aws-sdk/middleware-retry/dist-es/config.js
var RETRY_MODES;
(function(RETRY_MODES2) {
  RETRY_MODES2["STANDARD"] = "standard";
  RETRY_MODES2["ADAPTIVE"] = "adaptive";
})(RETRY_MODES || (RETRY_MODES = {}));
var DEFAULT_MAX_ATTEMPTS = 3;
var DEFAULT_RETRY_MODE = RETRY_MODES.STANDARD;

// node_modules/@aws-sdk/service-error-classification/dist-es/constants.js
var CLOCK_SKEW_ERROR_CODES = [
  "AuthFailure",
  "InvalidSignatureException",
  "RequestExpired",
  "RequestInTheFuture",
  "RequestTimeTooSkewed",
  "SignatureDoesNotMatch"
];
var THROTTLING_ERROR_CODES = [
  "BandwidthLimitExceeded",
  "EC2ThrottledException",
  "LimitExceededException",
  "PriorRequestNotComplete",
  "ProvisionedThroughputExceededException",
  "RequestLimitExceeded",
  "RequestThrottled",
  "RequestThrottledException",
  "SlowDown",
  "ThrottledException",
  "Throttling",
  "ThrottlingException",
  "TooManyRequestsException",
  "TransactionInProgressException"
];
var TRANSIENT_ERROR_CODES = ["AbortError", "TimeoutError", "RequestTimeout", "RequestTimeoutException"];
var TRANSIENT_ERROR_STATUS_CODES = [500, 502, 503, 504];

// node_modules/@aws-sdk/service-error-classification/dist-es/index.js
var isRetryableByTrait = function(error) {
  return error.$retryable !== void 0;
};
var isClockSkewError = function(error) {
  return CLOCK_SKEW_ERROR_CODES.includes(error.name);
};
var isThrottlingError = function(error) {
  var _a, _b;
  return ((_a = error.$metadata) === null || _a === void 0 ? void 0 : _a.httpStatusCode) === 429 || THROTTLING_ERROR_CODES.includes(error.name) || ((_b = error.$retryable) === null || _b === void 0 ? void 0 : _b.throttling) == true;
};
var isTransientError = function(error) {
  var _a;
  return TRANSIENT_ERROR_CODES.includes(error.name) || TRANSIENT_ERROR_STATUS_CODES.includes(((_a = error.$metadata) === null || _a === void 0 ? void 0 : _a.httpStatusCode) || 0);
};

// node_modules/@aws-sdk/middleware-retry/dist-es/DefaultRateLimiter.js
var DefaultRateLimiter = function() {
  function DefaultRateLimiter2(options) {
    var _a, _b, _c, _d, _e;
    this.currentCapacity = 0;
    this.enabled = false;
    this.lastMaxRate = 0;
    this.measuredTxRate = 0;
    this.requestCount = 0;
    this.lastTimestamp = 0;
    this.timeWindow = 0;
    this.beta = (_a = options === null || options === void 0 ? void 0 : options.beta) !== null && _a !== void 0 ? _a : 0.7;
    this.minCapacity = (_b = options === null || options === void 0 ? void 0 : options.minCapacity) !== null && _b !== void 0 ? _b : 1;
    this.minFillRate = (_c = options === null || options === void 0 ? void 0 : options.minFillRate) !== null && _c !== void 0 ? _c : 0.5;
    this.scaleConstant = (_d = options === null || options === void 0 ? void 0 : options.scaleConstant) !== null && _d !== void 0 ? _d : 0.4;
    this.smooth = (_e = options === null || options === void 0 ? void 0 : options.smooth) !== null && _e !== void 0 ? _e : 0.8;
    var currentTimeInSeconds = this.getCurrentTimeInSeconds();
    this.lastThrottleTime = currentTimeInSeconds;
    this.lastTxRateBucket = Math.floor(this.getCurrentTimeInSeconds());
    this.fillRate = this.minFillRate;
    this.maxCapacity = this.minCapacity;
  }
  DefaultRateLimiter2.prototype.getCurrentTimeInSeconds = function() {
    return Date.now() / 1e3;
  };
  DefaultRateLimiter2.prototype.getSendToken = function() {
    return __awaiter(this, void 0, void 0, function() {
      return __generator(this, function(_a) {
        return [2, this.acquireTokenBucket(1)];
      });
    });
  };
  DefaultRateLimiter2.prototype.acquireTokenBucket = function(amount) {
    return __awaiter(this, void 0, void 0, function() {
      var delay_1;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            if (!this.enabled) {
              return [2];
            }
            this.refillTokenBucket();
            if (!(amount > this.currentCapacity))
              return [3, 2];
            delay_1 = (amount - this.currentCapacity) / this.fillRate * 1e3;
            return [4, new Promise(function(resolve) {
              return setTimeout(resolve, delay_1);
            })];
          case 1:
            _a.sent();
            _a.label = 2;
          case 2:
            this.currentCapacity = this.currentCapacity - amount;
            return [2];
        }
      });
    });
  };
  DefaultRateLimiter2.prototype.refillTokenBucket = function() {
    var timestamp = this.getCurrentTimeInSeconds();
    if (!this.lastTimestamp) {
      this.lastTimestamp = timestamp;
      return;
    }
    var fillAmount = (timestamp - this.lastTimestamp) * this.fillRate;
    this.currentCapacity = Math.min(this.maxCapacity, this.currentCapacity + fillAmount);
    this.lastTimestamp = timestamp;
  };
  DefaultRateLimiter2.prototype.updateClientSendingRate = function(response) {
    var calculatedRate;
    this.updateMeasuredRate();
    if (isThrottlingError(response)) {
      var rateToUse = !this.enabled ? this.measuredTxRate : Math.min(this.measuredTxRate, this.fillRate);
      this.lastMaxRate = rateToUse;
      this.calculateTimeWindow();
      this.lastThrottleTime = this.getCurrentTimeInSeconds();
      calculatedRate = this.cubicThrottle(rateToUse);
      this.enableTokenBucket();
    } else {
      this.calculateTimeWindow();
      calculatedRate = this.cubicSuccess(this.getCurrentTimeInSeconds());
    }
    var newRate = Math.min(calculatedRate, 2 * this.measuredTxRate);
    this.updateTokenBucketRate(newRate);
  };
  DefaultRateLimiter2.prototype.calculateTimeWindow = function() {
    this.timeWindow = this.getPrecise(Math.pow(this.lastMaxRate * (1 - this.beta) / this.scaleConstant, 1 / 3));
  };
  DefaultRateLimiter2.prototype.cubicThrottle = function(rateToUse) {
    return this.getPrecise(rateToUse * this.beta);
  };
  DefaultRateLimiter2.prototype.cubicSuccess = function(timestamp) {
    return this.getPrecise(this.scaleConstant * Math.pow(timestamp - this.lastThrottleTime - this.timeWindow, 3) + this.lastMaxRate);
  };
  DefaultRateLimiter2.prototype.enableTokenBucket = function() {
    this.enabled = true;
  };
  DefaultRateLimiter2.prototype.updateTokenBucketRate = function(newRate) {
    this.refillTokenBucket();
    this.fillRate = Math.max(newRate, this.minFillRate);
    this.maxCapacity = Math.max(newRate, this.minCapacity);
    this.currentCapacity = Math.min(this.currentCapacity, this.maxCapacity);
  };
  DefaultRateLimiter2.prototype.updateMeasuredRate = function() {
    var t = this.getCurrentTimeInSeconds();
    var timeBucket = Math.floor(t * 2) / 2;
    this.requestCount++;
    if (timeBucket > this.lastTxRateBucket) {
      var currentRate = this.requestCount / (timeBucket - this.lastTxRateBucket);
      this.measuredTxRate = this.getPrecise(currentRate * this.smooth + this.measuredTxRate * (1 - this.smooth));
      this.requestCount = 0;
      this.lastTxRateBucket = timeBucket;
    }
  };
  DefaultRateLimiter2.prototype.getPrecise = function(num) {
    return parseFloat(num.toFixed(8));
  };
  return DefaultRateLimiter2;
}();

// node_modules/uuid/wrapper.mjs
var import_dist = __toModule(require_dist());
var v1 = import_dist.default.v1;
var v3 = import_dist.default.v3;
var v4 = import_dist.default.v4;
var v5 = import_dist.default.v5;
var NIL = import_dist.default.NIL;
var version = import_dist.default.version;
var validate2 = import_dist.default.validate;
var stringify = import_dist.default.stringify;
var parse2 = import_dist.default.parse;

// node_modules/@aws-sdk/middleware-retry/dist-es/constants.js
var DEFAULT_RETRY_DELAY_BASE = 100;
var MAXIMUM_RETRY_DELAY = 20 * 1e3;
var THROTTLING_RETRY_DELAY_BASE = 500;
var INITIAL_RETRY_TOKENS = 500;
var RETRY_COST = 5;
var TIMEOUT_RETRY_COST = 10;
var NO_RETRY_INCREMENT = 1;
var INVOCATION_ID_HEADER = "amz-sdk-invocation-id";
var REQUEST_HEADER = "amz-sdk-request";

// node_modules/@aws-sdk/middleware-retry/dist-es/defaultRetryQuota.js
var getDefaultRetryQuota = function(initialRetryTokens, options) {
  var _a, _b, _c;
  var MAX_CAPACITY = initialRetryTokens;
  var noRetryIncrement = (_a = options === null || options === void 0 ? void 0 : options.noRetryIncrement) !== null && _a !== void 0 ? _a : NO_RETRY_INCREMENT;
  var retryCost = (_b = options === null || options === void 0 ? void 0 : options.retryCost) !== null && _b !== void 0 ? _b : RETRY_COST;
  var timeoutRetryCost = (_c = options === null || options === void 0 ? void 0 : options.timeoutRetryCost) !== null && _c !== void 0 ? _c : TIMEOUT_RETRY_COST;
  var availableCapacity = initialRetryTokens;
  var getCapacityAmount = function(error) {
    return error.name === "TimeoutError" ? timeoutRetryCost : retryCost;
  };
  var hasRetryTokens = function(error) {
    return getCapacityAmount(error) <= availableCapacity;
  };
  var retrieveRetryTokens = function(error) {
    if (!hasRetryTokens(error)) {
      throw new Error("No retry token available");
    }
    var capacityAmount = getCapacityAmount(error);
    availableCapacity -= capacityAmount;
    return capacityAmount;
  };
  var releaseRetryTokens = function(capacityReleaseAmount) {
    availableCapacity += capacityReleaseAmount !== null && capacityReleaseAmount !== void 0 ? capacityReleaseAmount : noRetryIncrement;
    availableCapacity = Math.min(availableCapacity, MAX_CAPACITY);
  };
  return Object.freeze({
    hasRetryTokens,
    retrieveRetryTokens,
    releaseRetryTokens
  });
};

// node_modules/@aws-sdk/middleware-retry/dist-es/delayDecider.js
var defaultDelayDecider = function(delayBase, attempts) {
  return Math.floor(Math.min(MAXIMUM_RETRY_DELAY, Math.random() * Math.pow(2, attempts) * delayBase));
};

// node_modules/@aws-sdk/middleware-retry/dist-es/retryDecider.js
var defaultRetryDecider = function(error) {
  if (!error) {
    return false;
  }
  return isRetryableByTrait(error) || isClockSkewError(error) || isThrottlingError(error) || isTransientError(error);
};

// node_modules/@aws-sdk/middleware-retry/dist-es/StandardRetryStrategy.js
var StandardRetryStrategy = function() {
  function StandardRetryStrategy2(maxAttemptsProvider, options) {
    var _a, _b, _c;
    this.maxAttemptsProvider = maxAttemptsProvider;
    this.mode = RETRY_MODES.STANDARD;
    this.retryDecider = (_a = options === null || options === void 0 ? void 0 : options.retryDecider) !== null && _a !== void 0 ? _a : defaultRetryDecider;
    this.delayDecider = (_b = options === null || options === void 0 ? void 0 : options.delayDecider) !== null && _b !== void 0 ? _b : defaultDelayDecider;
    this.retryQuota = (_c = options === null || options === void 0 ? void 0 : options.retryQuota) !== null && _c !== void 0 ? _c : getDefaultRetryQuota(INITIAL_RETRY_TOKENS);
  }
  StandardRetryStrategy2.prototype.shouldRetry = function(error, attempts, maxAttempts) {
    return attempts < maxAttempts && this.retryDecider(error) && this.retryQuota.hasRetryTokens(error);
  };
  StandardRetryStrategy2.prototype.getMaxAttempts = function() {
    return __awaiter(this, void 0, void 0, function() {
      var maxAttempts, error_1;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2, , 3]);
            return [4, this.maxAttemptsProvider()];
          case 1:
            maxAttempts = _a.sent();
            return [3, 3];
          case 2:
            error_1 = _a.sent();
            maxAttempts = DEFAULT_MAX_ATTEMPTS;
            return [3, 3];
          case 3:
            return [2, maxAttempts];
        }
      });
    });
  };
  StandardRetryStrategy2.prototype.retry = function(next, args, options) {
    return __awaiter(this, void 0, void 0, function() {
      var retryTokenAmount, attempts, totalDelay, maxAttempts, request2, _loop_1, this_1, state_1;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            attempts = 0;
            totalDelay = 0;
            return [4, this.getMaxAttempts()];
          case 1:
            maxAttempts = _a.sent();
            request2 = args.request;
            if (HttpRequest.isInstance(request2)) {
              request2.headers[INVOCATION_ID_HEADER] = v4();
            }
            _loop_1 = function() {
              var _b, response, output, e_1, err, delay_1;
              return __generator(this, function(_c) {
                switch (_c.label) {
                  case 0:
                    _c.trys.push([0, 4, , 7]);
                    if (HttpRequest.isInstance(request2)) {
                      request2.headers[REQUEST_HEADER] = "attempt=" + (attempts + 1) + "; max=" + maxAttempts;
                    }
                    if (!(options === null || options === void 0 ? void 0 : options.beforeRequest))
                      return [3, 2];
                    return [4, options.beforeRequest()];
                  case 1:
                    _c.sent();
                    _c.label = 2;
                  case 2:
                    return [4, next(args)];
                  case 3:
                    _b = _c.sent(), response = _b.response, output = _b.output;
                    if (options === null || options === void 0 ? void 0 : options.afterRequest) {
                      options.afterRequest(response);
                    }
                    this_1.retryQuota.releaseRetryTokens(retryTokenAmount);
                    output.$metadata.attempts = attempts + 1;
                    output.$metadata.totalRetryDelay = totalDelay;
                    return [2, { value: { response, output } }];
                  case 4:
                    e_1 = _c.sent();
                    err = asSdkError(e_1);
                    attempts++;
                    if (!this_1.shouldRetry(err, attempts, maxAttempts))
                      return [3, 6];
                    retryTokenAmount = this_1.retryQuota.retrieveRetryTokens(err);
                    delay_1 = this_1.delayDecider(isThrottlingError(err) ? THROTTLING_RETRY_DELAY_BASE : DEFAULT_RETRY_DELAY_BASE, attempts);
                    totalDelay += delay_1;
                    return [4, new Promise(function(resolve) {
                      return setTimeout(resolve, delay_1);
                    })];
                  case 5:
                    _c.sent();
                    return [2, "continue"];
                  case 6:
                    if (!err.$metadata) {
                      err.$metadata = {};
                    }
                    err.$metadata.attempts = attempts;
                    err.$metadata.totalRetryDelay = totalDelay;
                    throw err;
                  case 7:
                    return [2];
                }
              });
            };
            this_1 = this;
            _a.label = 2;
          case 2:
            if (false)
              return [3, 4];
            return [5, _loop_1()];
          case 3:
            state_1 = _a.sent();
            if (typeof state_1 === "object")
              return [2, state_1.value];
            return [3, 2];
          case 4:
            return [2];
        }
      });
    });
  };
  return StandardRetryStrategy2;
}();
var asSdkError = function(error) {
  if (error instanceof Error)
    return error;
  if (error instanceof Object)
    return Object.assign(new Error(), error);
  if (typeof error === "string")
    return new Error(error);
  return new Error("AWS SDK error wrapper for " + error);
};

// node_modules/@aws-sdk/middleware-retry/dist-es/AdaptiveRetryStrategy.js
var AdaptiveRetryStrategy = function(_super) {
  __extends(AdaptiveRetryStrategy2, _super);
  function AdaptiveRetryStrategy2(maxAttemptsProvider, options) {
    var _this = this;
    var _a = options !== null && options !== void 0 ? options : {}, rateLimiter = _a.rateLimiter, superOptions = __rest(_a, ["rateLimiter"]);
    _this = _super.call(this, maxAttemptsProvider, superOptions) || this;
    _this.rateLimiter = rateLimiter !== null && rateLimiter !== void 0 ? rateLimiter : new DefaultRateLimiter();
    _this.mode = RETRY_MODES.ADAPTIVE;
    return _this;
  }
  AdaptiveRetryStrategy2.prototype.retry = function(next, args) {
    return __awaiter(this, void 0, void 0, function() {
      var _this = this;
      return __generator(this, function(_a) {
        return [2, _super.prototype.retry.call(this, next, args, {
          beforeRequest: function() {
            return __awaiter(_this, void 0, void 0, function() {
              return __generator(this, function(_a2) {
                return [2, this.rateLimiter.getSendToken()];
              });
            });
          },
          afterRequest: function(response) {
            _this.rateLimiter.updateClientSendingRate(response);
          }
        })];
      });
    });
  };
  return AdaptiveRetryStrategy2;
}(StandardRetryStrategy);

// node_modules/@aws-sdk/middleware-retry/dist-es/configurations.js
var ENV_MAX_ATTEMPTS = "AWS_MAX_ATTEMPTS";
var CONFIG_MAX_ATTEMPTS = "max_attempts";
var NODE_MAX_ATTEMPT_CONFIG_OPTIONS = {
  environmentVariableSelector: function(env2) {
    var value = env2[ENV_MAX_ATTEMPTS];
    if (!value)
      return void 0;
    var maxAttempt = parseInt(value);
    if (Number.isNaN(maxAttempt)) {
      throw new Error("Environment variable " + ENV_MAX_ATTEMPTS + ' mast be a number, got "' + value + '"');
    }
    return maxAttempt;
  },
  configFileSelector: function(profile) {
    var value = profile[CONFIG_MAX_ATTEMPTS];
    if (!value)
      return void 0;
    var maxAttempt = parseInt(value);
    if (Number.isNaN(maxAttempt)) {
      throw new Error("Shared config file entry " + CONFIG_MAX_ATTEMPTS + ' mast be a number, got "' + value + '"');
    }
    return maxAttempt;
  },
  default: DEFAULT_MAX_ATTEMPTS
};
var resolveRetryConfig = function(input) {
  var maxAttempts = normalizeMaxAttempts(input.maxAttempts);
  return __assign(__assign({}, input), { maxAttempts, retryStrategy: function() {
    return __awaiter(void 0, void 0, void 0, function() {
      var retryMode;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            if (input.retryStrategy) {
              return [2, input.retryStrategy];
            }
            return [4, getRetryMode(input.retryMode)];
          case 1:
            retryMode = _a.sent();
            if (retryMode === RETRY_MODES.ADAPTIVE) {
              return [2, new AdaptiveRetryStrategy(maxAttempts)];
            }
            return [2, new StandardRetryStrategy(maxAttempts)];
        }
      });
    });
  } });
};
var getRetryMode = function(retryMode) {
  return __awaiter(void 0, void 0, void 0, function() {
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          if (typeof retryMode === "string") {
            return [2, retryMode];
          }
          return [4, retryMode()];
        case 1:
          return [2, _a.sent()];
      }
    });
  });
};
var normalizeMaxAttempts = function(maxAttempts) {
  if (maxAttempts === void 0) {
    maxAttempts = DEFAULT_MAX_ATTEMPTS;
  }
  if (typeof maxAttempts === "number") {
    var promisified_1 = Promise.resolve(maxAttempts);
    return function() {
      return promisified_1;
    };
  }
  return maxAttempts;
};
var ENV_RETRY_MODE = "AWS_RETRY_MODE";
var CONFIG_RETRY_MODE = "retry_mode";
var NODE_RETRY_MODE_CONFIG_OPTIONS = {
  environmentVariableSelector: function(env2) {
    return env2[ENV_RETRY_MODE];
  },
  configFileSelector: function(profile) {
    return profile[CONFIG_RETRY_MODE];
  },
  default: DEFAULT_RETRY_MODE
};

// node_modules/@aws-sdk/middleware-retry/dist-es/retryMiddleware.js
var retryMiddleware = function(options) {
  return function(next, context) {
    return function(args) {
      return __awaiter(void 0, void 0, void 0, function() {
        var retryStrategy;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              return [4, options.retryStrategy()];
            case 1:
              retryStrategy = _a.sent();
              if (retryStrategy === null || retryStrategy === void 0 ? void 0 : retryStrategy.mode)
                context.userAgent = __spreadArray(__spreadArray([], __read(context.userAgent || [])), [["cfg/retry-mode", retryStrategy.mode]]);
              return [2, retryStrategy.retry(next, args)];
          }
        });
      });
    };
  };
};
var retryMiddlewareOptions = {
  name: "retryMiddleware",
  tags: ["RETRY"],
  step: "finalizeRequest",
  priority: "high",
  override: true
};
var getRetryPlugin = function(options) {
  return {
    applyToStack: function(clientStack) {
      clientStack.add(retryMiddleware(options), retryMiddlewareOptions);
    }
  };
};

// node_modules/@aws-sdk/property-provider/dist-es/ProviderError.js
var ProviderError = function(_super) {
  __extends(ProviderError2, _super);
  function ProviderError2(message, tryNextLink) {
    if (tryNextLink === void 0) {
      tryNextLink = true;
    }
    var _this = _super.call(this, message) || this;
    _this.tryNextLink = tryNextLink;
    return _this;
  }
  ProviderError2.from = function(error, tryNextLink) {
    if (tryNextLink === void 0) {
      tryNextLink = true;
    }
    Object.defineProperty(error, "tryNextLink", {
      value: tryNextLink,
      configurable: false,
      enumerable: false,
      writable: false
    });
    return error;
  };
  return ProviderError2;
}(Error);
var CredentialsProviderError = function(_super) {
  __extends(CredentialsProviderError2, _super);
  function CredentialsProviderError2(message, tryNextLink) {
    if (tryNextLink === void 0) {
      tryNextLink = true;
    }
    var _this = _super.call(this, message) || this;
    _this.tryNextLink = tryNextLink;
    _this.name = "CredentialsProviderError";
    return _this;
  }
  CredentialsProviderError2.from = function(error, tryNextLink) {
    if (tryNextLink === void 0) {
      tryNextLink = true;
    }
    Object.defineProperty(error, "tryNextLink", {
      value: tryNextLink,
      configurable: false,
      enumerable: false,
      writable: false
    });
    return error;
  };
  return CredentialsProviderError2;
}(Error);

// node_modules/@aws-sdk/property-provider/dist-es/chain.js
function chain() {
  var providers = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    providers[_i] = arguments[_i];
  }
  return function() {
    var e_1, _a;
    var promise = Promise.reject(new ProviderError("No providers in chain"));
    var _loop_1 = function(provider2) {
      promise = promise.catch(function(err) {
        if (err === null || err === void 0 ? void 0 : err.tryNextLink) {
          return provider2();
        }
        throw err;
      });
    };
    try {
      for (var providers_1 = __values2(providers), providers_1_1 = providers_1.next(); !providers_1_1.done; providers_1_1 = providers_1.next()) {
        var provider = providers_1_1.value;
        _loop_1(provider);
      }
    } catch (e_1_1) {
      e_1 = { error: e_1_1 };
    } finally {
      try {
        if (providers_1_1 && !providers_1_1.done && (_a = providers_1.return))
          _a.call(providers_1);
      } finally {
        if (e_1)
          throw e_1.error;
      }
    }
    return promise;
  };
}

// node_modules/@aws-sdk/property-provider/dist-es/fromStatic.js
var fromStatic = function(staticValue) {
  return function() {
    return Promise.resolve(staticValue);
  };
};

// node_modules/@aws-sdk/property-provider/dist-es/memoize.js
var memoize = function(provider, isExpired, requiresRefresh) {
  var resolved;
  var pending;
  var hasResult;
  var coalesceProvider = function() {
    return __awaiter(void 0, void 0, void 0, function() {
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            if (!pending) {
              pending = provider();
            }
            _a.label = 1;
          case 1:
            _a.trys.push([1, , 3, 4]);
            return [4, pending];
          case 2:
            resolved = _a.sent();
            hasResult = true;
            return [3, 4];
          case 3:
            pending = void 0;
            return [7];
          case 4:
            return [2, resolved];
        }
      });
    });
  };
  if (isExpired === void 0) {
    return function() {
      return __awaiter(void 0, void 0, void 0, function() {
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              if (!!hasResult)
                return [3, 2];
              return [4, coalesceProvider()];
            case 1:
              resolved = _a.sent();
              _a.label = 2;
            case 2:
              return [2, resolved];
          }
        });
      });
    };
  }
  var isConstant = false;
  return function() {
    return __awaiter(void 0, void 0, void 0, function() {
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            if (!!hasResult)
              return [3, 2];
            return [4, coalesceProvider()];
          case 1:
            resolved = _a.sent();
            _a.label = 2;
          case 2:
            if (isConstant) {
              return [2, resolved];
            }
            if (requiresRefresh && !requiresRefresh(resolved)) {
              isConstant = true;
              return [2, resolved];
            }
            if (!isExpired(resolved))
              return [3, 4];
            return [4, coalesceProvider()];
          case 3:
            _a.sent();
            return [2, resolved];
          case 4:
            return [2, resolved];
        }
      });
    });
  };
};

// node_modules/@aws-sdk/middleware-signing/dist-es/configurations.js
var CREDENTIAL_EXPIRE_WINDOW = 3e5;
var resolveAwsAuthConfig = function(input) {
  var normalizedCreds = input.credentials ? normalizeCredentialProvider(input.credentials) : input.credentialDefaultProvider(input);
  var _a = input.signingEscapePath, signingEscapePath = _a === void 0 ? true : _a, _b = input.systemClockOffset, systemClockOffset = _b === void 0 ? input.systemClockOffset || 0 : _b, sha256 = input.sha256;
  var signer;
  if (input.signer) {
    signer = normalizeProvider(input.signer);
  } else {
    signer = function() {
      return normalizeProvider(input.region)().then(function(region) {
        return __awaiter(void 0, void 0, void 0, function() {
          var _a2, _b2, _c;
          var _d;
          return __generator(this, function(_e) {
            switch (_e.label) {
              case 0:
                _b2 = (_a2 = input).regionInfoProvider;
                _c = [region];
                _d = {};
                return [4, input.useFipsEndpoint()];
              case 1:
                _d.useFipsEndpoint = _e.sent();
                return [4, input.useDualstackEndpoint()];
              case 2:
                return [4, _b2.apply(_a2, _c.concat([(_d.useDualstackEndpoint = _e.sent(), _d)]))];
              case 3:
                return [2, [
                  _e.sent() || {},
                  region
                ]];
            }
          });
        });
      }).then(function(_a2) {
        var _b2 = __read(_a2, 2), regionInfo = _b2[0], region = _b2[1];
        var signingRegion = regionInfo.signingRegion, signingService = regionInfo.signingService;
        input.signingRegion = input.signingRegion || signingRegion || region;
        input.signingName = input.signingName || signingService || input.serviceId;
        var params = __assign(__assign({}, input), { credentials: normalizedCreds, region: input.signingRegion, service: input.signingName, sha256, uriEscapePath: signingEscapePath });
        var signerConstructor = input.signerConstructor || SignatureV4;
        return new signerConstructor(params);
      });
    };
  }
  return __assign(__assign({}, input), { systemClockOffset, signingEscapePath, credentials: normalizedCreds, signer });
};
var normalizeProvider = function(input) {
  if (typeof input === "object") {
    var promisified_1 = Promise.resolve(input);
    return function() {
      return promisified_1;
    };
  }
  return input;
};
var normalizeCredentialProvider = function(credentials) {
  if (typeof credentials === "function") {
    return memoize(credentials, function(credentials2) {
      return credentials2.expiration !== void 0 && credentials2.expiration.getTime() - Date.now() < CREDENTIAL_EXPIRE_WINDOW;
    }, function(credentials2) {
      return credentials2.expiration !== void 0;
    });
  }
  return normalizeProvider(credentials);
};

// node_modules/@aws-sdk/middleware-signing/dist-es/utils/getSkewCorrectedDate.js
var getSkewCorrectedDate = function(systemClockOffset) {
  return new Date(Date.now() + systemClockOffset);
};

// node_modules/@aws-sdk/middleware-signing/dist-es/utils/isClockSkewed.js
var isClockSkewed = function(clockTime, systemClockOffset) {
  return Math.abs(getSkewCorrectedDate(systemClockOffset).getTime() - clockTime) >= 3e5;
};

// node_modules/@aws-sdk/middleware-signing/dist-es/utils/getUpdatedSystemClockOffset.js
var getUpdatedSystemClockOffset = function(clockTime, currentSystemClockOffset) {
  var clockTimeInMs = Date.parse(clockTime);
  if (isClockSkewed(clockTimeInMs, currentSystemClockOffset)) {
    return clockTimeInMs - Date.now();
  }
  return currentSystemClockOffset;
};

// node_modules/@aws-sdk/middleware-signing/dist-es/middleware.js
var awsAuthMiddleware = function(options) {
  return function(next, context) {
    return function(args) {
      return __awaiter(this, void 0, void 0, function() {
        var signer, output, _a, _b, headers, dateHeader;
        var _c;
        return __generator(this, function(_d) {
          switch (_d.label) {
            case 0:
              if (!HttpRequest.isInstance(args.request))
                return [2, next(args)];
              return [4, options.signer()];
            case 1:
              signer = _d.sent();
              _a = next;
              _b = [__assign({}, args)];
              _c = {};
              return [4, signer.sign(args.request, {
                signingDate: getSkewCorrectedDate(options.systemClockOffset),
                signingRegion: context["signing_region"],
                signingService: context["signing_service"]
              })];
            case 2:
              return [4, _a.apply(void 0, [__assign.apply(void 0, _b.concat([(_c.request = _d.sent(), _c)]))]).catch(function(error) {
                if (error.ServerTime) {
                  options.systemClockOffset = getUpdatedSystemClockOffset(error.ServerTime, options.systemClockOffset);
                }
                throw error;
              })];
            case 3:
              output = _d.sent();
              headers = output.response.headers;
              dateHeader = headers && (headers.date || headers.Date);
              if (dateHeader) {
                options.systemClockOffset = getUpdatedSystemClockOffset(dateHeader, options.systemClockOffset);
              }
              return [2, output];
          }
        });
      });
    };
  };
};
var awsAuthMiddlewareOptions = {
  name: "awsAuthMiddleware",
  tags: ["SIGNATURE", "AWSAUTH"],
  relation: "after",
  toMiddleware: "retryMiddleware",
  override: true
};
var getAwsAuthPlugin = function(options) {
  return {
    applyToStack: function(clientStack) {
      clientStack.addRelativeTo(awsAuthMiddleware(options), awsAuthMiddlewareOptions);
    }
  };
};

// node_modules/@aws-sdk/middleware-user-agent/dist-es/configurations.js
function resolveUserAgentConfig(input) {
  return __assign(__assign({}, input), { customUserAgent: typeof input.customUserAgent === "string" ? [[input.customUserAgent]] : input.customUserAgent });
}

// node_modules/@aws-sdk/middleware-user-agent/dist-es/constants.js
var USER_AGENT = "user-agent";
var X_AMZ_USER_AGENT = "x-amz-user-agent";
var SPACE = " ";
var UA_ESCAPE_REGEX = /[^\!\#\$\%\&\'\*\+\-\.\^\_\`\|\~\d\w]/g;

// node_modules/@aws-sdk/middleware-user-agent/dist-es/user-agent-middleware.js
var userAgentMiddleware = function(options) {
  return function(next, context) {
    return function(args) {
      return __awaiter(void 0, void 0, void 0, function() {
        var request2, headers, userAgent, defaultUserAgent2, customUserAgent, sdkUserAgentValue, normalUAValue;
        var _a, _b;
        return __generator(this, function(_c) {
          switch (_c.label) {
            case 0:
              request2 = args.request;
              if (!HttpRequest.isInstance(request2))
                return [2, next(args)];
              headers = request2.headers;
              userAgent = ((_a = context === null || context === void 0 ? void 0 : context.userAgent) === null || _a === void 0 ? void 0 : _a.map(escapeUserAgent)) || [];
              return [4, options.defaultUserAgentProvider()];
            case 1:
              defaultUserAgent2 = _c.sent().map(escapeUserAgent);
              customUserAgent = ((_b = options === null || options === void 0 ? void 0 : options.customUserAgent) === null || _b === void 0 ? void 0 : _b.map(escapeUserAgent)) || [];
              sdkUserAgentValue = __spreadArray(__spreadArray(__spreadArray([], __read(defaultUserAgent2)), __read(userAgent)), __read(customUserAgent)).join(SPACE);
              normalUAValue = __spreadArray(__spreadArray([], __read(defaultUserAgent2.filter(function(section) {
                return section.startsWith("aws-sdk-");
              }))), __read(customUserAgent)).join(SPACE);
              if (options.runtime !== "browser") {
                if (normalUAValue) {
                  headers[X_AMZ_USER_AGENT] = headers[X_AMZ_USER_AGENT] ? headers[USER_AGENT] + " " + normalUAValue : normalUAValue;
                }
                headers[USER_AGENT] = sdkUserAgentValue;
              } else {
                headers[X_AMZ_USER_AGENT] = sdkUserAgentValue;
              }
              return [2, next(__assign(__assign({}, args), { request: request2 }))];
          }
        });
      });
    };
  };
};
var escapeUserAgent = function(_a) {
  var _b = __read(_a, 2), name4 = _b[0], version5 = _b[1];
  var prefixSeparatorIndex = name4.indexOf("/");
  var prefix = name4.substring(0, prefixSeparatorIndex);
  var uaName = name4.substring(prefixSeparatorIndex + 1);
  if (prefix === "api") {
    uaName = uaName.toLowerCase();
  }
  return [prefix, uaName, version5].filter(function(item) {
    return item && item.length > 0;
  }).map(function(item) {
    return item === null || item === void 0 ? void 0 : item.replace(UA_ESCAPE_REGEX, "_");
  }).join("/");
};
var getUserAgentMiddlewareOptions = {
  name: "getUserAgentMiddleware",
  step: "build",
  priority: "low",
  tags: ["SET_USER_AGENT", "USER_AGENT"],
  override: true
};
var getUserAgentPlugin = function(config) {
  return {
    applyToStack: function(clientStack) {
      clientStack.add(userAgentMiddleware(config), getUserAgentMiddlewareOptions);
    }
  };
};

// node_modules/@aws-sdk/client-s3/package.json
var name = "@aws-sdk/client-s3";
var description = "AWS SDK for JavaScript S3 Client for Node.js, Browser and React Native";
var version2 = "3.41.0";
var scripts = {
  build: "yarn build:cjs && yarn build:es && yarn build:types",
  "build:cjs": "tsc -p tsconfig.json",
  "build:docs": "yarn clean:docs && typedoc ./",
  "build:es": "tsc -p tsconfig.es.json",
  "build:types": "tsc -p tsconfig.types.json",
  clean: "yarn clean:dist && yarn clean:docs",
  "clean:dist": "rimraf ./dist",
  "clean:docs": "rimraf ./docs",
  "downlevel-dts": "downlevel-dts dist-types dist-types/ts3.4",
  test: "yarn test:unit",
  "test:e2e": "ts-mocha test/**/*.ispec.ts && karma start karma.conf.js",
  "test:unit": "ts-mocha test/**/*.spec.ts"
};
var main = "./dist-cjs/index.js";
var types = "./dist-types/index.d.ts";
var module2 = "./dist-es/index.js";
var sideEffects = false;
var dependencies = {
  "@aws-crypto/sha256-browser": "2.0.0",
  "@aws-crypto/sha256-js": "2.0.0",
  "@aws-sdk/client-sts": "3.41.0",
  "@aws-sdk/config-resolver": "3.40.0",
  "@aws-sdk/credential-provider-node": "3.41.0",
  "@aws-sdk/eventstream-serde-browser": "3.40.0",
  "@aws-sdk/eventstream-serde-config-resolver": "3.40.0",
  "@aws-sdk/eventstream-serde-node": "3.40.0",
  "@aws-sdk/fetch-http-handler": "3.40.0",
  "@aws-sdk/hash-blob-browser": "3.40.0",
  "@aws-sdk/hash-node": "3.40.0",
  "@aws-sdk/hash-stream-node": "3.40.0",
  "@aws-sdk/invalid-dependency": "3.40.0",
  "@aws-sdk/md5-js": "3.40.0",
  "@aws-sdk/middleware-apply-body-checksum": "3.40.0",
  "@aws-sdk/middleware-bucket-endpoint": "3.41.0",
  "@aws-sdk/middleware-content-length": "3.40.0",
  "@aws-sdk/middleware-expect-continue": "3.40.0",
  "@aws-sdk/middleware-host-header": "3.40.0",
  "@aws-sdk/middleware-location-constraint": "3.40.0",
  "@aws-sdk/middleware-logger": "3.40.0",
  "@aws-sdk/middleware-retry": "3.40.0",
  "@aws-sdk/middleware-sdk-s3": "3.41.0",
  "@aws-sdk/middleware-serde": "3.40.0",
  "@aws-sdk/middleware-signing": "3.40.0",
  "@aws-sdk/middleware-ssec": "3.40.0",
  "@aws-sdk/middleware-stack": "3.40.0",
  "@aws-sdk/middleware-user-agent": "3.40.0",
  "@aws-sdk/node-config-provider": "3.40.0",
  "@aws-sdk/node-http-handler": "3.40.0",
  "@aws-sdk/protocol-http": "3.40.0",
  "@aws-sdk/smithy-client": "3.41.0",
  "@aws-sdk/types": "3.40.0",
  "@aws-sdk/url-parser": "3.40.0",
  "@aws-sdk/util-base64-browser": "3.37.0",
  "@aws-sdk/util-base64-node": "3.37.0",
  "@aws-sdk/util-body-length-browser": "3.37.0",
  "@aws-sdk/util-body-length-node": "3.37.0",
  "@aws-sdk/util-user-agent-browser": "3.40.0",
  "@aws-sdk/util-user-agent-node": "3.40.0",
  "@aws-sdk/util-utf8-browser": "3.37.0",
  "@aws-sdk/util-utf8-node": "3.37.0",
  "@aws-sdk/util-waiter": "3.40.0",
  "@aws-sdk/xml-builder": "3.37.0",
  entities: "2.2.0",
  "fast-xml-parser": "3.19.0",
  tslib: "^2.3.0"
};
var devDependencies = {
  "@aws-sdk/service-client-documentation-generator": "3.38.0",
  "@types/chai": "^4.2.11",
  "@types/mocha": "^8.0.4",
  "@types/node": "^12.7.5",
  "downlevel-dts": "0.7.0",
  jest: "^26.1.0",
  rimraf: "^3.0.0",
  "ts-jest": "^26.4.1",
  typedoc: "^0.19.2",
  typescript: "~4.3.5"
};
var engines = {
  node: ">=10.0.0"
};
var typesVersions = {
  "<4.0": {
    "dist-types/*": [
      "dist-types/ts3.4/*"
    ]
  }
};
var files = [
  "dist-*"
];
var author = {
  name: "AWS SDK for JavaScript Team",
  url: "https://aws.amazon.com/javascript/"
};
var license = "Apache-2.0";
var browser = {
  "./dist-es/runtimeConfig": "./dist-es/runtimeConfig.browser"
};
var react_native = {
  "./dist-es/runtimeConfig": "./dist-es/runtimeConfig.native"
};
var homepage = "https://github.com/aws/aws-sdk-js-v3/tree/main/clients/client-s3";
var repository = {
  type: "git",
  url: "https://github.com/aws/aws-sdk-js-v3.git",
  directory: "clients/client-s3"
};
var package_default = {
  name,
  description,
  version: version2,
  scripts,
  main,
  types,
  module: module2,
  sideEffects,
  dependencies,
  devDependencies,
  engines,
  typesVersions,
  files,
  author,
  license,
  browser,
  "react-native": react_native,
  homepage,
  repository
};

// node_modules/@aws-sdk/client-sts/dist-es/models/models_0.js
var AssumedRoleUser;
(function(AssumedRoleUser2) {
  AssumedRoleUser2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(AssumedRoleUser || (AssumedRoleUser = {}));
var PolicyDescriptorType;
(function(PolicyDescriptorType2) {
  PolicyDescriptorType2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(PolicyDescriptorType || (PolicyDescriptorType = {}));
var Tag2;
(function(Tag3) {
  Tag3.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(Tag2 || (Tag2 = {}));
var AssumeRoleRequest;
(function(AssumeRoleRequest2) {
  AssumeRoleRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(AssumeRoleRequest || (AssumeRoleRequest = {}));
var Credentials;
(function(Credentials2) {
  Credentials2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(Credentials || (Credentials = {}));
var AssumeRoleResponse;
(function(AssumeRoleResponse2) {
  AssumeRoleResponse2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(AssumeRoleResponse || (AssumeRoleResponse = {}));
var ExpiredTokenException;
(function(ExpiredTokenException2) {
  ExpiredTokenException2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(ExpiredTokenException || (ExpiredTokenException = {}));
var MalformedPolicyDocumentException;
(function(MalformedPolicyDocumentException2) {
  MalformedPolicyDocumentException2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(MalformedPolicyDocumentException || (MalformedPolicyDocumentException = {}));
var PackedPolicyTooLargeException;
(function(PackedPolicyTooLargeException2) {
  PackedPolicyTooLargeException2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(PackedPolicyTooLargeException || (PackedPolicyTooLargeException = {}));
var RegionDisabledException;
(function(RegionDisabledException2) {
  RegionDisabledException2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(RegionDisabledException || (RegionDisabledException = {}));
var AssumeRoleWithSAMLRequest;
(function(AssumeRoleWithSAMLRequest2) {
  AssumeRoleWithSAMLRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(AssumeRoleWithSAMLRequest || (AssumeRoleWithSAMLRequest = {}));
var AssumeRoleWithSAMLResponse;
(function(AssumeRoleWithSAMLResponse2) {
  AssumeRoleWithSAMLResponse2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(AssumeRoleWithSAMLResponse || (AssumeRoleWithSAMLResponse = {}));
var IDPRejectedClaimException;
(function(IDPRejectedClaimException2) {
  IDPRejectedClaimException2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(IDPRejectedClaimException || (IDPRejectedClaimException = {}));
var InvalidIdentityTokenException;
(function(InvalidIdentityTokenException2) {
  InvalidIdentityTokenException2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(InvalidIdentityTokenException || (InvalidIdentityTokenException = {}));
var AssumeRoleWithWebIdentityRequest;
(function(AssumeRoleWithWebIdentityRequest2) {
  AssumeRoleWithWebIdentityRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(AssumeRoleWithWebIdentityRequest || (AssumeRoleWithWebIdentityRequest = {}));
var AssumeRoleWithWebIdentityResponse;
(function(AssumeRoleWithWebIdentityResponse2) {
  AssumeRoleWithWebIdentityResponse2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(AssumeRoleWithWebIdentityResponse || (AssumeRoleWithWebIdentityResponse = {}));
var IDPCommunicationErrorException;
(function(IDPCommunicationErrorException2) {
  IDPCommunicationErrorException2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(IDPCommunicationErrorException || (IDPCommunicationErrorException = {}));
var DecodeAuthorizationMessageRequest;
(function(DecodeAuthorizationMessageRequest2) {
  DecodeAuthorizationMessageRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(DecodeAuthorizationMessageRequest || (DecodeAuthorizationMessageRequest = {}));
var DecodeAuthorizationMessageResponse;
(function(DecodeAuthorizationMessageResponse2) {
  DecodeAuthorizationMessageResponse2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(DecodeAuthorizationMessageResponse || (DecodeAuthorizationMessageResponse = {}));
var InvalidAuthorizationMessageException;
(function(InvalidAuthorizationMessageException2) {
  InvalidAuthorizationMessageException2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(InvalidAuthorizationMessageException || (InvalidAuthorizationMessageException = {}));
var GetAccessKeyInfoRequest;
(function(GetAccessKeyInfoRequest2) {
  GetAccessKeyInfoRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(GetAccessKeyInfoRequest || (GetAccessKeyInfoRequest = {}));
var GetAccessKeyInfoResponse;
(function(GetAccessKeyInfoResponse2) {
  GetAccessKeyInfoResponse2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(GetAccessKeyInfoResponse || (GetAccessKeyInfoResponse = {}));
var GetCallerIdentityRequest;
(function(GetCallerIdentityRequest2) {
  GetCallerIdentityRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(GetCallerIdentityRequest || (GetCallerIdentityRequest = {}));
var GetCallerIdentityResponse;
(function(GetCallerIdentityResponse2) {
  GetCallerIdentityResponse2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(GetCallerIdentityResponse || (GetCallerIdentityResponse = {}));
var GetFederationTokenRequest;
(function(GetFederationTokenRequest2) {
  GetFederationTokenRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(GetFederationTokenRequest || (GetFederationTokenRequest = {}));
var FederatedUser;
(function(FederatedUser2) {
  FederatedUser2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(FederatedUser || (FederatedUser = {}));
var GetFederationTokenResponse;
(function(GetFederationTokenResponse2) {
  GetFederationTokenResponse2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(GetFederationTokenResponse || (GetFederationTokenResponse = {}));
var GetSessionTokenRequest;
(function(GetSessionTokenRequest2) {
  GetSessionTokenRequest2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(GetSessionTokenRequest || (GetSessionTokenRequest = {}));
var GetSessionTokenResponse;
(function(GetSessionTokenResponse2) {
  GetSessionTokenResponse2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(GetSessionTokenResponse || (GetSessionTokenResponse = {}));

// node_modules/@aws-sdk/client-sts/dist-es/protocols/Aws_query.js
var import_entities2 = __toModule(require_lib());
var import_fast_xml_parser2 = __toModule(require_parser());
var serializeAws_queryAssumeRoleCommand = function(input, context) {
  return __awaiter(void 0, void 0, void 0, function() {
    var headers, body;
    return __generator(this, function(_a) {
      headers = {
        "content-type": "application/x-www-form-urlencoded"
      };
      body = buildFormUrlencodedString(__assign(__assign({}, serializeAws_queryAssumeRoleRequest(input, context)), { Action: "AssumeRole", Version: "2011-06-15" }));
      return [2, buildHttpRpcRequest(context, headers, "/", void 0, body)];
    });
  });
};
var serializeAws_queryAssumeRoleWithWebIdentityCommand = function(input, context) {
  return __awaiter(void 0, void 0, void 0, function() {
    var headers, body;
    return __generator(this, function(_a) {
      headers = {
        "content-type": "application/x-www-form-urlencoded"
      };
      body = buildFormUrlencodedString(__assign(__assign({}, serializeAws_queryAssumeRoleWithWebIdentityRequest(input, context)), { Action: "AssumeRoleWithWebIdentity", Version: "2011-06-15" }));
      return [2, buildHttpRpcRequest(context, headers, "/", void 0, body)];
    });
  });
};
var deserializeAws_queryAssumeRoleCommand = function(output, context) {
  return __awaiter(void 0, void 0, void 0, function() {
    var data, contents, response;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          if (output.statusCode >= 300) {
            return [2, deserializeAws_queryAssumeRoleCommandError(output, context)];
          }
          return [4, parseBody2(output.body, context)];
        case 1:
          data = _a.sent();
          contents = {};
          contents = deserializeAws_queryAssumeRoleResponse(data.AssumeRoleResult, context);
          response = __assign({ $metadata: deserializeMetadata2(output) }, contents);
          return [2, Promise.resolve(response)];
      }
    });
  });
};
var deserializeAws_queryAssumeRoleCommandError = function(output, context) {
  return __awaiter(void 0, void 0, void 0, function() {
    var parsedOutput, _a, response, errorCode, _b, _c, _d, _e, _f, parsedBody, message;
    var _g;
    return __generator(this, function(_h) {
      switch (_h.label) {
        case 0:
          _a = [__assign({}, output)];
          _g = {};
          return [4, parseBody2(output.body, context)];
        case 1:
          parsedOutput = __assign.apply(void 0, _a.concat([(_g.body = _h.sent(), _g)]));
          errorCode = "UnknownError";
          errorCode = loadQueryErrorCode(output, parsedOutput.body);
          _b = errorCode;
          switch (_b) {
            case "ExpiredTokenException":
              return [3, 2];
            case "com.amazonaws.sts#ExpiredTokenException":
              return [3, 2];
            case "MalformedPolicyDocumentException":
              return [3, 4];
            case "com.amazonaws.sts#MalformedPolicyDocumentException":
              return [3, 4];
            case "PackedPolicyTooLargeException":
              return [3, 6];
            case "com.amazonaws.sts#PackedPolicyTooLargeException":
              return [3, 6];
            case "RegionDisabledException":
              return [3, 8];
            case "com.amazonaws.sts#RegionDisabledException":
              return [3, 8];
          }
          return [3, 10];
        case 2:
          _c = [{}];
          return [4, deserializeAws_queryExpiredTokenExceptionResponse(parsedOutput, context)];
        case 3:
          response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([_h.sent()])), { name: errorCode, $metadata: deserializeMetadata2(output) }]);
          return [3, 11];
        case 4:
          _d = [{}];
          return [4, deserializeAws_queryMalformedPolicyDocumentExceptionResponse(parsedOutput, context)];
        case 5:
          response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([_h.sent()])), { name: errorCode, $metadata: deserializeMetadata2(output) }]);
          return [3, 11];
        case 6:
          _e = [{}];
          return [4, deserializeAws_queryPackedPolicyTooLargeExceptionResponse(parsedOutput, context)];
        case 7:
          response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([_h.sent()])), { name: errorCode, $metadata: deserializeMetadata2(output) }]);
          return [3, 11];
        case 8:
          _f = [{}];
          return [4, deserializeAws_queryRegionDisabledExceptionResponse(parsedOutput, context)];
        case 9:
          response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([_h.sent()])), { name: errorCode, $metadata: deserializeMetadata2(output) }]);
          return [3, 11];
        case 10:
          parsedBody = parsedOutput.body;
          errorCode = parsedBody.Error.code || parsedBody.Error.Code || errorCode;
          response = __assign(__assign({}, parsedBody.Error), { name: "" + errorCode, message: parsedBody.Error.message || parsedBody.Error.Message || errorCode, $fault: "client", $metadata: deserializeMetadata2(output) });
          _h.label = 11;
        case 11:
          message = response.message || response.Message || errorCode;
          response.message = message;
          delete response.Message;
          return [2, Promise.reject(Object.assign(new Error(message), response))];
      }
    });
  });
};
var deserializeAws_queryAssumeRoleWithWebIdentityCommand = function(output, context) {
  return __awaiter(void 0, void 0, void 0, function() {
    var data, contents, response;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          if (output.statusCode >= 300) {
            return [2, deserializeAws_queryAssumeRoleWithWebIdentityCommandError(output, context)];
          }
          return [4, parseBody2(output.body, context)];
        case 1:
          data = _a.sent();
          contents = {};
          contents = deserializeAws_queryAssumeRoleWithWebIdentityResponse(data.AssumeRoleWithWebIdentityResult, context);
          response = __assign({ $metadata: deserializeMetadata2(output) }, contents);
          return [2, Promise.resolve(response)];
      }
    });
  });
};
var deserializeAws_queryAssumeRoleWithWebIdentityCommandError = function(output, context) {
  return __awaiter(void 0, void 0, void 0, function() {
    var parsedOutput, _a, response, errorCode, _b, _c, _d, _e, _f, _g, _h, _j, parsedBody, message;
    var _k;
    return __generator(this, function(_l) {
      switch (_l.label) {
        case 0:
          _a = [__assign({}, output)];
          _k = {};
          return [4, parseBody2(output.body, context)];
        case 1:
          parsedOutput = __assign.apply(void 0, _a.concat([(_k.body = _l.sent(), _k)]));
          errorCode = "UnknownError";
          errorCode = loadQueryErrorCode(output, parsedOutput.body);
          _b = errorCode;
          switch (_b) {
            case "ExpiredTokenException":
              return [3, 2];
            case "com.amazonaws.sts#ExpiredTokenException":
              return [3, 2];
            case "IDPCommunicationErrorException":
              return [3, 4];
            case "com.amazonaws.sts#IDPCommunicationErrorException":
              return [3, 4];
            case "IDPRejectedClaimException":
              return [3, 6];
            case "com.amazonaws.sts#IDPRejectedClaimException":
              return [3, 6];
            case "InvalidIdentityTokenException":
              return [3, 8];
            case "com.amazonaws.sts#InvalidIdentityTokenException":
              return [3, 8];
            case "MalformedPolicyDocumentException":
              return [3, 10];
            case "com.amazonaws.sts#MalformedPolicyDocumentException":
              return [3, 10];
            case "PackedPolicyTooLargeException":
              return [3, 12];
            case "com.amazonaws.sts#PackedPolicyTooLargeException":
              return [3, 12];
            case "RegionDisabledException":
              return [3, 14];
            case "com.amazonaws.sts#RegionDisabledException":
              return [3, 14];
          }
          return [3, 16];
        case 2:
          _c = [{}];
          return [4, deserializeAws_queryExpiredTokenExceptionResponse(parsedOutput, context)];
        case 3:
          response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([_l.sent()])), { name: errorCode, $metadata: deserializeMetadata2(output) }]);
          return [3, 17];
        case 4:
          _d = [{}];
          return [4, deserializeAws_queryIDPCommunicationErrorExceptionResponse(parsedOutput, context)];
        case 5:
          response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([_l.sent()])), { name: errorCode, $metadata: deserializeMetadata2(output) }]);
          return [3, 17];
        case 6:
          _e = [{}];
          return [4, deserializeAws_queryIDPRejectedClaimExceptionResponse(parsedOutput, context)];
        case 7:
          response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([_l.sent()])), { name: errorCode, $metadata: deserializeMetadata2(output) }]);
          return [3, 17];
        case 8:
          _f = [{}];
          return [4, deserializeAws_queryInvalidIdentityTokenExceptionResponse(parsedOutput, context)];
        case 9:
          response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([_l.sent()])), { name: errorCode, $metadata: deserializeMetadata2(output) }]);
          return [3, 17];
        case 10:
          _g = [{}];
          return [4, deserializeAws_queryMalformedPolicyDocumentExceptionResponse(parsedOutput, context)];
        case 11:
          response = __assign.apply(void 0, [__assign.apply(void 0, _g.concat([_l.sent()])), { name: errorCode, $metadata: deserializeMetadata2(output) }]);
          return [3, 17];
        case 12:
          _h = [{}];
          return [4, deserializeAws_queryPackedPolicyTooLargeExceptionResponse(parsedOutput, context)];
        case 13:
          response = __assign.apply(void 0, [__assign.apply(void 0, _h.concat([_l.sent()])), { name: errorCode, $metadata: deserializeMetadata2(output) }]);
          return [3, 17];
        case 14:
          _j = [{}];
          return [4, deserializeAws_queryRegionDisabledExceptionResponse(parsedOutput, context)];
        case 15:
          response = __assign.apply(void 0, [__assign.apply(void 0, _j.concat([_l.sent()])), { name: errorCode, $metadata: deserializeMetadata2(output) }]);
          return [3, 17];
        case 16:
          parsedBody = parsedOutput.body;
          errorCode = parsedBody.Error.code || parsedBody.Error.Code || errorCode;
          response = __assign(__assign({}, parsedBody.Error), { name: "" + errorCode, message: parsedBody.Error.message || parsedBody.Error.Message || errorCode, $fault: "client", $metadata: deserializeMetadata2(output) });
          _l.label = 17;
        case 17:
          message = response.message || response.Message || errorCode;
          response.message = message;
          delete response.Message;
          return [2, Promise.reject(Object.assign(new Error(message), response))];
      }
    });
  });
};
var deserializeAws_queryExpiredTokenExceptionResponse = function(parsedOutput, context) {
  return __awaiter(void 0, void 0, void 0, function() {
    var body, deserialized, contents;
    return __generator(this, function(_a) {
      body = parsedOutput.body;
      deserialized = deserializeAws_queryExpiredTokenException(body.Error, context);
      contents = __assign({ name: "ExpiredTokenException", $fault: "client", $metadata: deserializeMetadata2(parsedOutput) }, deserialized);
      return [2, contents];
    });
  });
};
var deserializeAws_queryIDPCommunicationErrorExceptionResponse = function(parsedOutput, context) {
  return __awaiter(void 0, void 0, void 0, function() {
    var body, deserialized, contents;
    return __generator(this, function(_a) {
      body = parsedOutput.body;
      deserialized = deserializeAws_queryIDPCommunicationErrorException(body.Error, context);
      contents = __assign({ name: "IDPCommunicationErrorException", $fault: "client", $metadata: deserializeMetadata2(parsedOutput) }, deserialized);
      return [2, contents];
    });
  });
};
var deserializeAws_queryIDPRejectedClaimExceptionResponse = function(parsedOutput, context) {
  return __awaiter(void 0, void 0, void 0, function() {
    var body, deserialized, contents;
    return __generator(this, function(_a) {
      body = parsedOutput.body;
      deserialized = deserializeAws_queryIDPRejectedClaimException(body.Error, context);
      contents = __assign({ name: "IDPRejectedClaimException", $fault: "client", $metadata: deserializeMetadata2(parsedOutput) }, deserialized);
      return [2, contents];
    });
  });
};
var deserializeAws_queryInvalidIdentityTokenExceptionResponse = function(parsedOutput, context) {
  return __awaiter(void 0, void 0, void 0, function() {
    var body, deserialized, contents;
    return __generator(this, function(_a) {
      body = parsedOutput.body;
      deserialized = deserializeAws_queryInvalidIdentityTokenException(body.Error, context);
      contents = __assign({ name: "InvalidIdentityTokenException", $fault: "client", $metadata: deserializeMetadata2(parsedOutput) }, deserialized);
      return [2, contents];
    });
  });
};
var deserializeAws_queryMalformedPolicyDocumentExceptionResponse = function(parsedOutput, context) {
  return __awaiter(void 0, void 0, void 0, function() {
    var body, deserialized, contents;
    return __generator(this, function(_a) {
      body = parsedOutput.body;
      deserialized = deserializeAws_queryMalformedPolicyDocumentException(body.Error, context);
      contents = __assign({ name: "MalformedPolicyDocumentException", $fault: "client", $metadata: deserializeMetadata2(parsedOutput) }, deserialized);
      return [2, contents];
    });
  });
};
var deserializeAws_queryPackedPolicyTooLargeExceptionResponse = function(parsedOutput, context) {
  return __awaiter(void 0, void 0, void 0, function() {
    var body, deserialized, contents;
    return __generator(this, function(_a) {
      body = parsedOutput.body;
      deserialized = deserializeAws_queryPackedPolicyTooLargeException(body.Error, context);
      contents = __assign({ name: "PackedPolicyTooLargeException", $fault: "client", $metadata: deserializeMetadata2(parsedOutput) }, deserialized);
      return [2, contents];
    });
  });
};
var deserializeAws_queryRegionDisabledExceptionResponse = function(parsedOutput, context) {
  return __awaiter(void 0, void 0, void 0, function() {
    var body, deserialized, contents;
    return __generator(this, function(_a) {
      body = parsedOutput.body;
      deserialized = deserializeAws_queryRegionDisabledException(body.Error, context);
      contents = __assign({ name: "RegionDisabledException", $fault: "client", $metadata: deserializeMetadata2(parsedOutput) }, deserialized);
      return [2, contents];
    });
  });
};
var serializeAws_queryAssumeRoleRequest = function(input, context) {
  var entries = {};
  if (input.RoleArn !== void 0 && input.RoleArn !== null) {
    entries["RoleArn"] = input.RoleArn;
  }
  if (input.RoleSessionName !== void 0 && input.RoleSessionName !== null) {
    entries["RoleSessionName"] = input.RoleSessionName;
  }
  if (input.PolicyArns !== void 0 && input.PolicyArns !== null) {
    var memberEntries = serializeAws_querypolicyDescriptorListType(input.PolicyArns, context);
    Object.entries(memberEntries).forEach(function(_a) {
      var _b = __read(_a, 2), key = _b[0], value = _b[1];
      var loc = "PolicyArns." + key;
      entries[loc] = value;
    });
  }
  if (input.Policy !== void 0 && input.Policy !== null) {
    entries["Policy"] = input.Policy;
  }
  if (input.DurationSeconds !== void 0 && input.DurationSeconds !== null) {
    entries["DurationSeconds"] = input.DurationSeconds;
  }
  if (input.Tags !== void 0 && input.Tags !== null) {
    var memberEntries = serializeAws_querytagListType(input.Tags, context);
    Object.entries(memberEntries).forEach(function(_a) {
      var _b = __read(_a, 2), key = _b[0], value = _b[1];
      var loc = "Tags." + key;
      entries[loc] = value;
    });
  }
  if (input.TransitiveTagKeys !== void 0 && input.TransitiveTagKeys !== null) {
    var memberEntries = serializeAws_querytagKeyListType(input.TransitiveTagKeys, context);
    Object.entries(memberEntries).forEach(function(_a) {
      var _b = __read(_a, 2), key = _b[0], value = _b[1];
      var loc = "TransitiveTagKeys." + key;
      entries[loc] = value;
    });
  }
  if (input.ExternalId !== void 0 && input.ExternalId !== null) {
    entries["ExternalId"] = input.ExternalId;
  }
  if (input.SerialNumber !== void 0 && input.SerialNumber !== null) {
    entries["SerialNumber"] = input.SerialNumber;
  }
  if (input.TokenCode !== void 0 && input.TokenCode !== null) {
    entries["TokenCode"] = input.TokenCode;
  }
  if (input.SourceIdentity !== void 0 && input.SourceIdentity !== null) {
    entries["SourceIdentity"] = input.SourceIdentity;
  }
  return entries;
};
var serializeAws_queryAssumeRoleWithWebIdentityRequest = function(input, context) {
  var entries = {};
  if (input.RoleArn !== void 0 && input.RoleArn !== null) {
    entries["RoleArn"] = input.RoleArn;
  }
  if (input.RoleSessionName !== void 0 && input.RoleSessionName !== null) {
    entries["RoleSessionName"] = input.RoleSessionName;
  }
  if (input.WebIdentityToken !== void 0 && input.WebIdentityToken !== null) {
    entries["WebIdentityToken"] = input.WebIdentityToken;
  }
  if (input.ProviderId !== void 0 && input.ProviderId !== null) {
    entries["ProviderId"] = input.ProviderId;
  }
  if (input.PolicyArns !== void 0 && input.PolicyArns !== null) {
    var memberEntries = serializeAws_querypolicyDescriptorListType(input.PolicyArns, context);
    Object.entries(memberEntries).forEach(function(_a) {
      var _b = __read(_a, 2), key = _b[0], value = _b[1];
      var loc = "PolicyArns." + key;
      entries[loc] = value;
    });
  }
  if (input.Policy !== void 0 && input.Policy !== null) {
    entries["Policy"] = input.Policy;
  }
  if (input.DurationSeconds !== void 0 && input.DurationSeconds !== null) {
    entries["DurationSeconds"] = input.DurationSeconds;
  }
  return entries;
};
var serializeAws_querypolicyDescriptorListType = function(input, context) {
  var e_1, _a;
  var entries = {};
  var counter = 1;
  try {
    for (var input_1 = __values2(input), input_1_1 = input_1.next(); !input_1_1.done; input_1_1 = input_1.next()) {
      var entry = input_1_1.value;
      if (entry === null) {
        continue;
      }
      var memberEntries = serializeAws_queryPolicyDescriptorType(entry, context);
      Object.entries(memberEntries).forEach(function(_a2) {
        var _b = __read(_a2, 2), key = _b[0], value = _b[1];
        entries["member." + counter + "." + key] = value;
      });
      counter++;
    }
  } catch (e_1_1) {
    e_1 = { error: e_1_1 };
  } finally {
    try {
      if (input_1_1 && !input_1_1.done && (_a = input_1.return))
        _a.call(input_1);
    } finally {
      if (e_1)
        throw e_1.error;
    }
  }
  return entries;
};
var serializeAws_queryPolicyDescriptorType = function(input, context) {
  var entries = {};
  if (input.arn !== void 0 && input.arn !== null) {
    entries["arn"] = input.arn;
  }
  return entries;
};
var serializeAws_queryTag = function(input, context) {
  var entries = {};
  if (input.Key !== void 0 && input.Key !== null) {
    entries["Key"] = input.Key;
  }
  if (input.Value !== void 0 && input.Value !== null) {
    entries["Value"] = input.Value;
  }
  return entries;
};
var serializeAws_querytagKeyListType = function(input, context) {
  var e_2, _a;
  var entries = {};
  var counter = 1;
  try {
    for (var input_2 = __values2(input), input_2_1 = input_2.next(); !input_2_1.done; input_2_1 = input_2.next()) {
      var entry = input_2_1.value;
      if (entry === null) {
        continue;
      }
      entries["member." + counter] = entry;
      counter++;
    }
  } catch (e_2_1) {
    e_2 = { error: e_2_1 };
  } finally {
    try {
      if (input_2_1 && !input_2_1.done && (_a = input_2.return))
        _a.call(input_2);
    } finally {
      if (e_2)
        throw e_2.error;
    }
  }
  return entries;
};
var serializeAws_querytagListType = function(input, context) {
  var e_3, _a;
  var entries = {};
  var counter = 1;
  try {
    for (var input_3 = __values2(input), input_3_1 = input_3.next(); !input_3_1.done; input_3_1 = input_3.next()) {
      var entry = input_3_1.value;
      if (entry === null) {
        continue;
      }
      var memberEntries = serializeAws_queryTag(entry, context);
      Object.entries(memberEntries).forEach(function(_a2) {
        var _b = __read(_a2, 2), key = _b[0], value = _b[1];
        entries["member." + counter + "." + key] = value;
      });
      counter++;
    }
  } catch (e_3_1) {
    e_3 = { error: e_3_1 };
  } finally {
    try {
      if (input_3_1 && !input_3_1.done && (_a = input_3.return))
        _a.call(input_3);
    } finally {
      if (e_3)
        throw e_3.error;
    }
  }
  return entries;
};
var deserializeAws_queryAssumedRoleUser = function(output, context) {
  var contents = {
    AssumedRoleId: void 0,
    Arn: void 0
  };
  if (output["AssumedRoleId"] !== void 0) {
    contents.AssumedRoleId = expectString(output["AssumedRoleId"]);
  }
  if (output["Arn"] !== void 0) {
    contents.Arn = expectString(output["Arn"]);
  }
  return contents;
};
var deserializeAws_queryAssumeRoleResponse = function(output, context) {
  var contents = {
    Credentials: void 0,
    AssumedRoleUser: void 0,
    PackedPolicySize: void 0,
    SourceIdentity: void 0
  };
  if (output["Credentials"] !== void 0) {
    contents.Credentials = deserializeAws_queryCredentials(output["Credentials"], context);
  }
  if (output["AssumedRoleUser"] !== void 0) {
    contents.AssumedRoleUser = deserializeAws_queryAssumedRoleUser(output["AssumedRoleUser"], context);
  }
  if (output["PackedPolicySize"] !== void 0) {
    contents.PackedPolicySize = strictParseInt32(output["PackedPolicySize"]);
  }
  if (output["SourceIdentity"] !== void 0) {
    contents.SourceIdentity = expectString(output["SourceIdentity"]);
  }
  return contents;
};
var deserializeAws_queryAssumeRoleWithWebIdentityResponse = function(output, context) {
  var contents = {
    Credentials: void 0,
    SubjectFromWebIdentityToken: void 0,
    AssumedRoleUser: void 0,
    PackedPolicySize: void 0,
    Provider: void 0,
    Audience: void 0,
    SourceIdentity: void 0
  };
  if (output["Credentials"] !== void 0) {
    contents.Credentials = deserializeAws_queryCredentials(output["Credentials"], context);
  }
  if (output["SubjectFromWebIdentityToken"] !== void 0) {
    contents.SubjectFromWebIdentityToken = expectString(output["SubjectFromWebIdentityToken"]);
  }
  if (output["AssumedRoleUser"] !== void 0) {
    contents.AssumedRoleUser = deserializeAws_queryAssumedRoleUser(output["AssumedRoleUser"], context);
  }
  if (output["PackedPolicySize"] !== void 0) {
    contents.PackedPolicySize = strictParseInt32(output["PackedPolicySize"]);
  }
  if (output["Provider"] !== void 0) {
    contents.Provider = expectString(output["Provider"]);
  }
  if (output["Audience"] !== void 0) {
    contents.Audience = expectString(output["Audience"]);
  }
  if (output["SourceIdentity"] !== void 0) {
    contents.SourceIdentity = expectString(output["SourceIdentity"]);
  }
  return contents;
};
var deserializeAws_queryCredentials = function(output, context) {
  var contents = {
    AccessKeyId: void 0,
    SecretAccessKey: void 0,
    SessionToken: void 0,
    Expiration: void 0
  };
  if (output["AccessKeyId"] !== void 0) {
    contents.AccessKeyId = expectString(output["AccessKeyId"]);
  }
  if (output["SecretAccessKey"] !== void 0) {
    contents.SecretAccessKey = expectString(output["SecretAccessKey"]);
  }
  if (output["SessionToken"] !== void 0) {
    contents.SessionToken = expectString(output["SessionToken"]);
  }
  if (output["Expiration"] !== void 0) {
    contents.Expiration = expectNonNull(parseRfc3339DateTime(output["Expiration"]));
  }
  return contents;
};
var deserializeAws_queryExpiredTokenException = function(output, context) {
  var contents = {
    message: void 0
  };
  if (output["message"] !== void 0) {
    contents.message = expectString(output["message"]);
  }
  return contents;
};
var deserializeAws_queryIDPCommunicationErrorException = function(output, context) {
  var contents = {
    message: void 0
  };
  if (output["message"] !== void 0) {
    contents.message = expectString(output["message"]);
  }
  return contents;
};
var deserializeAws_queryIDPRejectedClaimException = function(output, context) {
  var contents = {
    message: void 0
  };
  if (output["message"] !== void 0) {
    contents.message = expectString(output["message"]);
  }
  return contents;
};
var deserializeAws_queryInvalidIdentityTokenException = function(output, context) {
  var contents = {
    message: void 0
  };
  if (output["message"] !== void 0) {
    contents.message = expectString(output["message"]);
  }
  return contents;
};
var deserializeAws_queryMalformedPolicyDocumentException = function(output, context) {
  var contents = {
    message: void 0
  };
  if (output["message"] !== void 0) {
    contents.message = expectString(output["message"]);
  }
  return contents;
};
var deserializeAws_queryPackedPolicyTooLargeException = function(output, context) {
  var contents = {
    message: void 0
  };
  if (output["message"] !== void 0) {
    contents.message = expectString(output["message"]);
  }
  return contents;
};
var deserializeAws_queryRegionDisabledException = function(output, context) {
  var contents = {
    message: void 0
  };
  if (output["message"] !== void 0) {
    contents.message = expectString(output["message"]);
  }
  return contents;
};
var deserializeMetadata2 = function(output) {
  var _a;
  return {
    httpStatusCode: output.statusCode,
    requestId: (_a = output.headers["x-amzn-requestid"]) !== null && _a !== void 0 ? _a : output.headers["x-amzn-request-id"],
    extendedRequestId: output.headers["x-amz-id-2"],
    cfId: output.headers["x-amz-cf-id"]
  };
};
var collectBody2 = function(streamBody, context) {
  if (streamBody === void 0) {
    streamBody = new Uint8Array();
  }
  if (streamBody instanceof Uint8Array) {
    return Promise.resolve(streamBody);
  }
  return context.streamCollector(streamBody) || Promise.resolve(new Uint8Array());
};
var collectBodyString2 = function(streamBody, context) {
  return collectBody2(streamBody, context).then(function(body) {
    return context.utf8Encoder(body);
  });
};
var buildHttpRpcRequest = function(context, headers, path3, resolvedHostname, body) {
  return __awaiter(void 0, void 0, void 0, function() {
    var _a, hostname, _b, protocol, port, basePath, contents;
    return __generator(this, function(_c) {
      switch (_c.label) {
        case 0:
          return [4, context.endpoint()];
        case 1:
          _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
          contents = {
            protocol,
            hostname,
            port,
            method: "POST",
            path: basePath.endsWith("/") ? basePath.slice(0, -1) + path3 : basePath + path3,
            headers
          };
          if (resolvedHostname !== void 0) {
            contents.hostname = resolvedHostname;
          }
          if (body !== void 0) {
            contents.body = body;
          }
          return [2, new HttpRequest(contents)];
      }
    });
  });
};
var parseBody2 = function(streamBody, context) {
  return collectBodyString2(streamBody, context).then(function(encoded) {
    if (encoded.length) {
      var parsedObj = (0, import_fast_xml_parser2.parse)(encoded, {
        attributeNamePrefix: "",
        ignoreAttributes: false,
        parseNodeValue: false,
        trimValues: false,
        tagValueProcessor: function(val) {
          return val.trim() === "" && val.includes("\n") ? "" : (0, import_entities2.decodeHTML)(val);
        }
      });
      var textNodeName = "#text";
      var key = Object.keys(parsedObj)[0];
      var parsedObjToReturn = parsedObj[key];
      if (parsedObjToReturn[textNodeName]) {
        parsedObjToReturn[key] = parsedObjToReturn[textNodeName];
        delete parsedObjToReturn[textNodeName];
      }
      return getValueFromTextNode(parsedObjToReturn);
    }
    return {};
  });
};
var buildFormUrlencodedString = function(formEntries) {
  return Object.entries(formEntries).map(function(_a) {
    var _b = __read(_a, 2), key = _b[0], value = _b[1];
    return extendedEncodeURIComponent(key) + "=" + extendedEncodeURIComponent(value);
  }).join("&");
};
var loadQueryErrorCode = function(output, data) {
  if (data.Error.Code !== void 0) {
    return data.Error.Code;
  }
  if (output.statusCode == 404) {
    return "NotFound";
  }
  return "";
};

// node_modules/@aws-sdk/client-sts/dist-es/commands/AssumeRoleCommand.js
var AssumeRoleCommand = function(_super) {
  __extends(AssumeRoleCommand2, _super);
  function AssumeRoleCommand2(input) {
    var _this = _super.call(this) || this;
    _this.input = input;
    return _this;
  }
  AssumeRoleCommand2.prototype.resolveMiddleware = function(clientStack, configuration, options) {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
    this.middlewareStack.use(getAwsAuthPlugin(configuration));
    var stack = clientStack.concat(this.middlewareStack);
    var logger = configuration.logger;
    var clientName = "STSClient";
    var commandName = "AssumeRoleCommand";
    var handlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: AssumeRoleRequest.filterSensitiveLog,
      outputFilterSensitiveLog: AssumeRoleResponse.filterSensitiveLog
    };
    var requestHandler = configuration.requestHandler;
    return stack.resolve(function(request2) {
      return requestHandler.handle(request2.request, options || {});
    }, handlerExecutionContext);
  };
  AssumeRoleCommand2.prototype.serialize = function(input, context) {
    return serializeAws_queryAssumeRoleCommand(input, context);
  };
  AssumeRoleCommand2.prototype.deserialize = function(output, context) {
    return deserializeAws_queryAssumeRoleCommand(output, context);
  };
  return AssumeRoleCommand2;
}(Command);

// node_modules/@aws-sdk/client-sts/dist-es/commands/AssumeRoleWithWebIdentityCommand.js
var AssumeRoleWithWebIdentityCommand = function(_super) {
  __extends(AssumeRoleWithWebIdentityCommand2, _super);
  function AssumeRoleWithWebIdentityCommand2(input) {
    var _this = _super.call(this) || this;
    _this.input = input;
    return _this;
  }
  AssumeRoleWithWebIdentityCommand2.prototype.resolveMiddleware = function(clientStack, configuration, options) {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
    var stack = clientStack.concat(this.middlewareStack);
    var logger = configuration.logger;
    var clientName = "STSClient";
    var commandName = "AssumeRoleWithWebIdentityCommand";
    var handlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: AssumeRoleWithWebIdentityRequest.filterSensitiveLog,
      outputFilterSensitiveLog: AssumeRoleWithWebIdentityResponse.filterSensitiveLog
    };
    var requestHandler = configuration.requestHandler;
    return stack.resolve(function(request2) {
      return requestHandler.handle(request2.request, options || {});
    }, handlerExecutionContext);
  };
  AssumeRoleWithWebIdentityCommand2.prototype.serialize = function(input, context) {
    return serializeAws_queryAssumeRoleWithWebIdentityCommand(input, context);
  };
  AssumeRoleWithWebIdentityCommand2.prototype.deserialize = function(output, context) {
    return deserializeAws_queryAssumeRoleWithWebIdentityCommand(output, context);
  };
  return AssumeRoleWithWebIdentityCommand2;
}(Command);

// node_modules/@aws-sdk/middleware-sdk-sts/dist-es/index.js
var resolveStsAuthConfig = function(input, _a) {
  var stsClientCtor = _a.stsClientCtor;
  return resolveAwsAuthConfig(__assign(__assign({}, input), { stsClientCtor }));
};

// node_modules/@aws-sdk/client-sts/package.json
var name2 = "@aws-sdk/client-sts";
var description2 = "AWS SDK for JavaScript Sts Client for Node.js, Browser and React Native";
var version3 = "3.41.0";
var scripts2 = {
  build: "yarn build:cjs && yarn build:es && yarn build:types",
  "build:cjs": "tsc -p tsconfig.json",
  "build:docs": "yarn clean:docs && typedoc ./",
  "build:es": "tsc -p tsconfig.es.json",
  "build:types": "tsc -p tsconfig.types.json",
  clean: "yarn clean:dist && yarn clean:docs",
  "clean:dist": "rimraf ./dist",
  "clean:docs": "rimraf ./docs",
  "downlevel-dts": "downlevel-dts dist-types dist-types/ts3.4",
  test: "exit 0"
};
var main2 = "./dist-cjs/index.js";
var types2 = "./dist-types/index.d.ts";
var module3 = "./dist-es/index.js";
var sideEffects2 = false;
var dependencies2 = {
  "@aws-crypto/sha256-browser": "2.0.0",
  "@aws-crypto/sha256-js": "2.0.0",
  "@aws-sdk/config-resolver": "3.40.0",
  "@aws-sdk/credential-provider-node": "3.41.0",
  "@aws-sdk/fetch-http-handler": "3.40.0",
  "@aws-sdk/hash-node": "3.40.0",
  "@aws-sdk/invalid-dependency": "3.40.0",
  "@aws-sdk/middleware-content-length": "3.40.0",
  "@aws-sdk/middleware-host-header": "3.40.0",
  "@aws-sdk/middleware-logger": "3.40.0",
  "@aws-sdk/middleware-retry": "3.40.0",
  "@aws-sdk/middleware-sdk-sts": "3.40.0",
  "@aws-sdk/middleware-serde": "3.40.0",
  "@aws-sdk/middleware-signing": "3.40.0",
  "@aws-sdk/middleware-stack": "3.40.0",
  "@aws-sdk/middleware-user-agent": "3.40.0",
  "@aws-sdk/node-config-provider": "3.40.0",
  "@aws-sdk/node-http-handler": "3.40.0",
  "@aws-sdk/protocol-http": "3.40.0",
  "@aws-sdk/smithy-client": "3.41.0",
  "@aws-sdk/types": "3.40.0",
  "@aws-sdk/url-parser": "3.40.0",
  "@aws-sdk/util-base64-browser": "3.37.0",
  "@aws-sdk/util-base64-node": "3.37.0",
  "@aws-sdk/util-body-length-browser": "3.37.0",
  "@aws-sdk/util-body-length-node": "3.37.0",
  "@aws-sdk/util-user-agent-browser": "3.40.0",
  "@aws-sdk/util-user-agent-node": "3.40.0",
  "@aws-sdk/util-utf8-browser": "3.37.0",
  "@aws-sdk/util-utf8-node": "3.37.0",
  entities: "2.2.0",
  "fast-xml-parser": "3.19.0",
  tslib: "^2.3.0"
};
var devDependencies2 = {
  "@aws-sdk/service-client-documentation-generator": "3.38.0",
  "@types/node": "^12.7.5",
  "downlevel-dts": "0.7.0",
  jest: "^26.1.0",
  rimraf: "^3.0.0",
  "ts-jest": "^26.4.1",
  typedoc: "^0.19.2",
  typescript: "~4.3.5"
};
var engines2 = {
  node: ">=10.0.0"
};
var typesVersions2 = {
  "<4.0": {
    "dist-types/*": [
      "dist-types/ts3.4/*"
    ]
  }
};
var files2 = [
  "dist-*"
];
var author2 = {
  name: "AWS SDK for JavaScript Team",
  url: "https://aws.amazon.com/javascript/"
};
var license2 = "Apache-2.0";
var browser2 = {
  "./dist-es/runtimeConfig": "./dist-es/runtimeConfig.browser"
};
var react_native2 = {
  "./dist-es/runtimeConfig": "./dist-es/runtimeConfig.native"
};
var homepage2 = "https://github.com/aws/aws-sdk-js-v3/tree/main/clients/client-sts";
var repository2 = {
  type: "git",
  url: "https://github.com/aws/aws-sdk-js-v3.git",
  directory: "clients/client-sts"
};
var package_default2 = {
  name: name2,
  description: description2,
  version: version3,
  scripts: scripts2,
  main: main2,
  types: types2,
  module: module3,
  sideEffects: sideEffects2,
  dependencies: dependencies2,
  devDependencies: devDependencies2,
  engines: engines2,
  typesVersions: typesVersions2,
  files: files2,
  author: author2,
  license: license2,
  browser: browser2,
  "react-native": react_native2,
  homepage: homepage2,
  repository: repository2
};

// node_modules/@aws-sdk/client-sts/dist-es/defaultStsRoleAssumers.js
var ASSUME_ROLE_DEFAULT_REGION = "us-east-1";
var decorateDefaultRegion = function(region) {
  if (typeof region !== "function") {
    return region === void 0 ? ASSUME_ROLE_DEFAULT_REGION : region;
  }
  return function() {
    return __awaiter(void 0, void 0, void 0, function() {
      var e_1;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2, , 3]);
            return [4, region()];
          case 1:
            return [2, _a.sent()];
          case 2:
            e_1 = _a.sent();
            return [2, ASSUME_ROLE_DEFAULT_REGION];
          case 3:
            return [2];
        }
      });
    });
  };
};
var getDefaultRoleAssumer = function(stsOptions, stsClientCtor) {
  var stsClient;
  var closureSourceCreds;
  return function(sourceCreds, params) {
    return __awaiter(void 0, void 0, void 0, function() {
      var logger, region, requestHandler, Credentials2;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            closureSourceCreds = sourceCreds;
            if (!stsClient) {
              logger = stsOptions.logger, region = stsOptions.region, requestHandler = stsOptions.requestHandler;
              stsClient = new stsClientCtor(__assign({ logger, credentialDefaultProvider: function() {
                return function() {
                  return __awaiter(void 0, void 0, void 0, function() {
                    return __generator(this, function(_a2) {
                      return [2, closureSourceCreds];
                    });
                  });
                };
              }, region: decorateDefaultRegion(region || stsOptions.region) }, requestHandler ? { requestHandler } : {}));
            }
            return [4, stsClient.send(new AssumeRoleCommand(params))];
          case 1:
            Credentials2 = _a.sent().Credentials;
            if (!Credentials2 || !Credentials2.AccessKeyId || !Credentials2.SecretAccessKey) {
              throw new Error("Invalid response from STS.assumeRole call with role " + params.RoleArn);
            }
            return [2, {
              accessKeyId: Credentials2.AccessKeyId,
              secretAccessKey: Credentials2.SecretAccessKey,
              sessionToken: Credentials2.SessionToken,
              expiration: Credentials2.Expiration
            }];
        }
      });
    });
  };
};
var getDefaultRoleAssumerWithWebIdentity = function(stsOptions, stsClientCtor) {
  var stsClient;
  return function(params) {
    return __awaiter(void 0, void 0, void 0, function() {
      var logger, region, requestHandler, Credentials2;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            if (!stsClient) {
              logger = stsOptions.logger, region = stsOptions.region, requestHandler = stsOptions.requestHandler;
              stsClient = new stsClientCtor(__assign({ logger, region: decorateDefaultRegion(region || stsOptions.region) }, requestHandler ? { requestHandler } : {}));
            }
            return [4, stsClient.send(new AssumeRoleWithWebIdentityCommand(params))];
          case 1:
            Credentials2 = _a.sent().Credentials;
            if (!Credentials2 || !Credentials2.AccessKeyId || !Credentials2.SecretAccessKey) {
              throw new Error("Invalid response from STS.assumeRoleWithWebIdentity call with role " + params.RoleArn);
            }
            return [2, {
              accessKeyId: Credentials2.AccessKeyId,
              secretAccessKey: Credentials2.SecretAccessKey,
              sessionToken: Credentials2.SessionToken,
              expiration: Credentials2.Expiration
            }];
        }
      });
    });
  };
};
var decorateDefaultCredentialProvider = function(provider) {
  return function(input) {
    return provider(__assign({ roleAssumer: getDefaultRoleAssumer(input, input.stsClientCtor), roleAssumerWithWebIdentity: getDefaultRoleAssumerWithWebIdentity(input, input.stsClientCtor) }, input));
  };
};

// node_modules/@aws-sdk/credential-provider-env/dist-es/index.js
var ENV_KEY = "AWS_ACCESS_KEY_ID";
var ENV_SECRET = "AWS_SECRET_ACCESS_KEY";
var ENV_SESSION = "AWS_SESSION_TOKEN";
var ENV_EXPIRATION = "AWS_CREDENTIAL_EXPIRATION";
function fromEnv() {
  return function() {
    var accessKeyId = process.env[ENV_KEY];
    var secretAccessKey = process.env[ENV_SECRET];
    var expiry = process.env[ENV_EXPIRATION];
    if (accessKeyId && secretAccessKey) {
      return Promise.resolve({
        accessKeyId,
        secretAccessKey,
        sessionToken: process.env[ENV_SESSION],
        expiration: expiry ? new Date(expiry) : void 0
      });
    }
    return Promise.reject(new CredentialsProviderError("Unable to find environment variable credentials."));
  };
}

// node_modules/@aws-sdk/credential-provider-imds/dist-es/fromContainerMetadata.js
var import_url = __toModule(require("url"));

// node_modules/@aws-sdk/credential-provider-imds/dist-es/remoteProvider/httpRequest.js
var import_buffer = __toModule(require("buffer"));
var import_http = __toModule(require("http"));
function httpRequest(options) {
  return new Promise(function(resolve, reject) {
    var _a;
    var req = (0, import_http.request)(__assign(__assign({ method: "GET" }, options), { hostname: (_a = options.hostname) === null || _a === void 0 ? void 0 : _a.replace(/^\[(.+)\]$/, "$1") }));
    req.on("error", function(err) {
      reject(Object.assign(new ProviderError("Unable to connect to instance metadata service"), err));
      req.destroy();
    });
    req.on("timeout", function() {
      reject(new ProviderError("TimeoutError from instance metadata service"));
      req.destroy();
    });
    req.on("response", function(res) {
      var _a2 = res.statusCode, statusCode = _a2 === void 0 ? 400 : _a2;
      if (statusCode < 200 || 300 <= statusCode) {
        reject(Object.assign(new ProviderError("Error response received from instance metadata service"), { statusCode }));
        req.destroy();
      }
      var chunks = [];
      res.on("data", function(chunk) {
        chunks.push(chunk);
      });
      res.on("end", function() {
        resolve(import_buffer.Buffer.concat(chunks));
        req.destroy();
      });
    });
    req.end();
  });
}

// node_modules/@aws-sdk/credential-provider-imds/dist-es/remoteProvider/ImdsCredentials.js
var isImdsCredentials = function(arg) {
  return Boolean(arg) && typeof arg === "object" && typeof arg.AccessKeyId === "string" && typeof arg.SecretAccessKey === "string" && typeof arg.Token === "string" && typeof arg.Expiration === "string";
};
var fromImdsCredentials = function(creds) {
  return {
    accessKeyId: creds.AccessKeyId,
    secretAccessKey: creds.SecretAccessKey,
    sessionToken: creds.Token,
    expiration: new Date(creds.Expiration)
  };
};

// node_modules/@aws-sdk/credential-provider-imds/dist-es/remoteProvider/RemoteProviderInit.js
var DEFAULT_TIMEOUT = 1e3;
var DEFAULT_MAX_RETRIES = 0;
var providerConfigFromInit = function(_a) {
  var _b = _a.maxRetries, maxRetries = _b === void 0 ? DEFAULT_MAX_RETRIES : _b, _c = _a.timeout, timeout = _c === void 0 ? DEFAULT_TIMEOUT : _c;
  return { maxRetries, timeout };
};

// node_modules/@aws-sdk/credential-provider-imds/dist-es/remoteProvider/retry.js
var retry = function(toRetry, maxRetries) {
  var promise = toRetry();
  for (var i = 0; i < maxRetries; i++) {
    promise = promise.catch(toRetry);
  }
  return promise;
};

// node_modules/@aws-sdk/credential-provider-imds/dist-es/fromContainerMetadata.js
var ENV_CMDS_FULL_URI = "AWS_CONTAINER_CREDENTIALS_FULL_URI";
var ENV_CMDS_RELATIVE_URI = "AWS_CONTAINER_CREDENTIALS_RELATIVE_URI";
var ENV_CMDS_AUTH_TOKEN = "AWS_CONTAINER_AUTHORIZATION_TOKEN";
var fromContainerMetadata = function(init) {
  if (init === void 0) {
    init = {};
  }
  var _a = providerConfigFromInit(init), timeout = _a.timeout, maxRetries = _a.maxRetries;
  return function() {
    return retry(function() {
      return __awaiter(void 0, void 0, void 0, function() {
        var requestOptions, credsResponse, _a2, _b;
        return __generator(this, function(_c) {
          switch (_c.label) {
            case 0:
              return [4, getCmdsUri()];
            case 1:
              requestOptions = _c.sent();
              _b = (_a2 = JSON).parse;
              return [4, requestFromEcsImds(timeout, requestOptions)];
            case 2:
              credsResponse = _b.apply(_a2, [_c.sent()]);
              if (!isImdsCredentials(credsResponse)) {
                throw new CredentialsProviderError("Invalid response received from instance metadata service.");
              }
              return [2, fromImdsCredentials(credsResponse)];
          }
        });
      });
    }, maxRetries);
  };
};
var requestFromEcsImds = function(timeout, options) {
  return __awaiter(void 0, void 0, void 0, function() {
    var buffer;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          if (process.env[ENV_CMDS_AUTH_TOKEN]) {
            options.headers = __assign(__assign({}, options.headers), { Authorization: process.env[ENV_CMDS_AUTH_TOKEN] });
          }
          return [4, httpRequest(__assign(__assign({}, options), { timeout }))];
        case 1:
          buffer = _a.sent();
          return [2, buffer.toString()];
      }
    });
  });
};
var CMDS_IP = "169.254.170.2";
var GREENGRASS_HOSTS = {
  localhost: true,
  "127.0.0.1": true
};
var GREENGRASS_PROTOCOLS = {
  "http:": true,
  "https:": true
};
var getCmdsUri = function() {
  return __awaiter(void 0, void 0, void 0, function() {
    var parsed;
    return __generator(this, function(_a) {
      if (process.env[ENV_CMDS_RELATIVE_URI]) {
        return [2, {
          hostname: CMDS_IP,
          path: process.env[ENV_CMDS_RELATIVE_URI]
        }];
      }
      if (process.env[ENV_CMDS_FULL_URI]) {
        parsed = (0, import_url.parse)(process.env[ENV_CMDS_FULL_URI]);
        if (!parsed.hostname || !(parsed.hostname in GREENGRASS_HOSTS)) {
          throw new CredentialsProviderError(parsed.hostname + " is not a valid container metadata service hostname", false);
        }
        if (!parsed.protocol || !(parsed.protocol in GREENGRASS_PROTOCOLS)) {
          throw new CredentialsProviderError(parsed.protocol + " is not a valid container metadata service protocol", false);
        }
        return [2, __assign(__assign({}, parsed), { port: parsed.port ? parseInt(parsed.port, 10) : void 0 })];
      }
      throw new CredentialsProviderError("The container metadata credential provider cannot be used unless" + (" the " + ENV_CMDS_RELATIVE_URI + " or " + ENV_CMDS_FULL_URI + " environment") + " variable is set", false);
    });
  });
};

// node_modules/@aws-sdk/node-config-provider/dist-es/fromEnv.js
var fromEnv2 = function(envVarSelector) {
  return function() {
    return __awaiter(void 0, void 0, void 0, function() {
      var config;
      return __generator(this, function(_a) {
        try {
          config = envVarSelector(process.env);
          if (config === void 0) {
            throw new Error();
          }
          return [2, config];
        } catch (e) {
          throw new CredentialsProviderError(e.message || "Cannot load config from environment variables with getter: " + envVarSelector);
        }
        return [2];
      });
    });
  };
};

// node_modules/@aws-sdk/shared-ini-file-loader/dist-es/index.js
var import_fs = __toModule(require("fs"));
var import_os = __toModule(require("os"));
var import_path = __toModule(require("path"));
var ENV_CREDENTIALS_PATH = "AWS_SHARED_CREDENTIALS_FILE";
var ENV_CONFIG_PATH = "AWS_CONFIG_FILE";
var swallowError = function() {
  return {};
};
var loadSharedConfigFiles = function(init) {
  if (init === void 0) {
    init = {};
  }
  var _a = init.filepath, filepath = _a === void 0 ? process.env[ENV_CREDENTIALS_PATH] || (0, import_path.join)(getHomeDir(), ".aws", "credentials") : _a, _b = init.configFilepath, configFilepath = _b === void 0 ? process.env[ENV_CONFIG_PATH] || (0, import_path.join)(getHomeDir(), ".aws", "config") : _b;
  return Promise.all([
    slurpFile(configFilepath).then(parseIni).then(normalizeConfigFile).catch(swallowError),
    slurpFile(filepath).then(parseIni).catch(swallowError)
  ]).then(function(parsedFiles) {
    var _a2 = __read(parsedFiles, 2), configFile = _a2[0], credentialsFile = _a2[1];
    return {
      configFile,
      credentialsFile
    };
  });
};
var profileKeyRegex = /^profile\s(["'])?([^\1]+)\1$/;
var normalizeConfigFile = function(data) {
  var e_1, _a;
  var map = {};
  try {
    for (var _b = __values2(Object.keys(data)), _c = _b.next(); !_c.done; _c = _b.next()) {
      var key = _c.value;
      var matches = void 0;
      if (key === "default") {
        map.default = data.default;
      } else if (matches = profileKeyRegex.exec(key)) {
        var _d = __read(matches, 3), _1 = _d[0], _2 = _d[1], normalizedKey = _d[2];
        if (normalizedKey) {
          map[normalizedKey] = data[key];
        }
      }
    }
  } catch (e_1_1) {
    e_1 = { error: e_1_1 };
  } finally {
    try {
      if (_c && !_c.done && (_a = _b.return))
        _a.call(_b);
    } finally {
      if (e_1)
        throw e_1.error;
    }
  }
  return map;
};
var profileNameBlockList = ["__proto__", "profile __proto__"];
var parseIni = function(iniData) {
  var e_2, _a;
  var map = {};
  var currentSection;
  try {
    for (var _b = __values2(iniData.split(/\r?\n/)), _c = _b.next(); !_c.done; _c = _b.next()) {
      var line = _c.value;
      line = line.split(/(^|\s)[;#]/)[0];
      var section = line.match(/^\s*\[([^\[\]]+)]\s*$/);
      if (section) {
        currentSection = section[1];
        if (profileNameBlockList.includes(currentSection)) {
          throw new Error('Found invalid profile name "' + currentSection + '"');
        }
      } else if (currentSection) {
        var item = line.match(/^\s*(.+?)\s*=\s*(.+?)\s*$/);
        if (item) {
          map[currentSection] = map[currentSection] || {};
          map[currentSection][item[1]] = item[2];
        }
      }
    }
  } catch (e_2_1) {
    e_2 = { error: e_2_1 };
  } finally {
    try {
      if (_c && !_c.done && (_a = _b.return))
        _a.call(_b);
    } finally {
      if (e_2)
        throw e_2.error;
    }
  }
  return map;
};
var slurpFile = function(path3) {
  return new Promise(function(resolve, reject) {
    (0, import_fs.readFile)(path3, "utf8", function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
var getHomeDir = function() {
  var _a = process.env, HOME = _a.HOME, USERPROFILE = _a.USERPROFILE, HOMEPATH = _a.HOMEPATH, _b = _a.HOMEDRIVE, HOMEDRIVE = _b === void 0 ? "C:" + import_path.sep : _b;
  if (HOME)
    return HOME;
  if (USERPROFILE)
    return USERPROFILE;
  if (HOMEPATH)
    return "" + HOMEDRIVE + HOMEPATH;
  return (0, import_os.homedir)();
};

// node_modules/@aws-sdk/node-config-provider/dist-es/fromSharedConfigFiles.js
var DEFAULT_PROFILE = "default";
var ENV_PROFILE = "AWS_PROFILE";
var fromSharedConfigFiles = function(configSelector, _a) {
  if (_a === void 0) {
    _a = {};
  }
  var _b = _a.preferredFile, preferredFile = _b === void 0 ? "config" : _b, init = __rest(_a, ["preferredFile"]);
  return function() {
    return __awaiter(void 0, void 0, void 0, function() {
      var _a2, loadedConfig, _b2, profile, _c, configFile, credentialsFile, profileFromCredentials, profileFromConfig, mergedProfile, configValue;
      return __generator(this, function(_d) {
        switch (_d.label) {
          case 0:
            _a2 = init.loadedConfig, loadedConfig = _a2 === void 0 ? loadSharedConfigFiles(init) : _a2, _b2 = init.profile, profile = _b2 === void 0 ? process.env[ENV_PROFILE] || DEFAULT_PROFILE : _b2;
            return [4, loadedConfig];
          case 1:
            _c = _d.sent(), configFile = _c.configFile, credentialsFile = _c.credentialsFile;
            profileFromCredentials = credentialsFile[profile] || {};
            profileFromConfig = configFile[profile] || {};
            mergedProfile = preferredFile === "config" ? __assign(__assign({}, profileFromCredentials), profileFromConfig) : __assign(__assign({}, profileFromConfig), profileFromCredentials);
            try {
              configValue = configSelector(mergedProfile);
              if (configValue === void 0) {
                throw new Error();
              }
              return [2, configValue];
            } catch (e) {
              throw new CredentialsProviderError(e.message || "Cannot load config for profile " + profile + " in SDK configuration files with getter: " + configSelector);
            }
            return [2];
        }
      });
    });
  };
};

// node_modules/@aws-sdk/node-config-provider/dist-es/fromStatic.js
var isFunction = function(func) {
  return typeof func === "function";
};
var fromStatic2 = function(defaultValue) {
  return isFunction(defaultValue) ? function() {
    return __awaiter(void 0, void 0, void 0, function() {
      return __generator(this, function(_a) {
        return [2, defaultValue()];
      });
    });
  } : fromStatic(defaultValue);
};

// node_modules/@aws-sdk/node-config-provider/dist-es/configLoader.js
var loadConfig = function(_a, configuration) {
  var environmentVariableSelector = _a.environmentVariableSelector, configFileSelector = _a.configFileSelector, defaultValue = _a.default;
  if (configuration === void 0) {
    configuration = {};
  }
  return memoize(chain(fromEnv2(environmentVariableSelector), fromSharedConfigFiles(configFileSelector, configuration), fromStatic2(defaultValue)));
};

// node_modules/@aws-sdk/querystring-parser/dist-es/index.js
function parseQueryString(querystring) {
  var e_1, _a;
  var query = {};
  querystring = querystring.replace(/^\?/, "");
  if (querystring) {
    try {
      for (var _b = __values2(querystring.split("&")), _c = _b.next(); !_c.done; _c = _b.next()) {
        var pair = _c.value;
        var _d = __read(pair.split("="), 2), key = _d[0], _e = _d[1], value = _e === void 0 ? null : _e;
        key = decodeURIComponent(key);
        if (value) {
          value = decodeURIComponent(value);
        }
        if (!(key in query)) {
          query[key] = value;
        } else if (Array.isArray(query[key])) {
          query[key].push(value);
        } else {
          query[key] = [query[key], value];
        }
      }
    } catch (e_1_1) {
      e_1 = { error: e_1_1 };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b.return))
          _a.call(_b);
      } finally {
        if (e_1)
          throw e_1.error;
      }
    }
  }
  return query;
}

// node_modules/@aws-sdk/url-parser/dist-es/index.js
var parseUrl = function(url) {
  var _a = new URL(url), hostname = _a.hostname, pathname = _a.pathname, port = _a.port, protocol = _a.protocol, search = _a.search;
  var query;
  if (search) {
    query = parseQueryString(search);
  }
  return {
    hostname,
    port: port ? parseInt(port) : void 0,
    protocol,
    path: pathname,
    query
  };
};

// node_modules/@aws-sdk/credential-provider-imds/dist-es/config/Endpoint.js
var Endpoint;
(function(Endpoint2) {
  Endpoint2["IPv4"] = "http://169.254.169.254";
  Endpoint2["IPv6"] = "http://[fd00:ec2::254]";
})(Endpoint || (Endpoint = {}));

// node_modules/@aws-sdk/credential-provider-imds/dist-es/config/EndpointConfigOptions.js
var ENV_ENDPOINT_NAME = "AWS_EC2_METADATA_SERVICE_ENDPOINT";
var CONFIG_ENDPOINT_NAME = "ec2_metadata_service_endpoint";
var ENDPOINT_CONFIG_OPTIONS = {
  environmentVariableSelector: function(env2) {
    return env2[ENV_ENDPOINT_NAME];
  },
  configFileSelector: function(profile) {
    return profile[CONFIG_ENDPOINT_NAME];
  },
  default: void 0
};

// node_modules/@aws-sdk/credential-provider-imds/dist-es/config/EndpointMode.js
var EndpointMode;
(function(EndpointMode2) {
  EndpointMode2["IPv4"] = "IPv4";
  EndpointMode2["IPv6"] = "IPv6";
})(EndpointMode || (EndpointMode = {}));

// node_modules/@aws-sdk/credential-provider-imds/dist-es/config/EndpointModeConfigOptions.js
var ENV_ENDPOINT_MODE_NAME = "AWS_EC2_METADATA_SERVICE_ENDPOINT_MODE";
var CONFIG_ENDPOINT_MODE_NAME = "ec2_metadata_service_endpoint_mode";
var ENDPOINT_MODE_CONFIG_OPTIONS = {
  environmentVariableSelector: function(env2) {
    return env2[ENV_ENDPOINT_MODE_NAME];
  },
  configFileSelector: function(profile) {
    return profile[CONFIG_ENDPOINT_MODE_NAME];
  },
  default: EndpointMode.IPv4
};

// node_modules/@aws-sdk/credential-provider-imds/dist-es/utils/getInstanceMetadataEndpoint.js
var getInstanceMetadataEndpoint = function() {
  return __awaiter(void 0, void 0, void 0, function() {
    var _a, _b;
    return __generator(this, function(_c) {
      switch (_c.label) {
        case 0:
          _a = parseUrl;
          return [4, getFromEndpointConfig()];
        case 1:
          _b = _c.sent();
          if (_b)
            return [3, 3];
          return [4, getFromEndpointModeConfig()];
        case 2:
          _b = _c.sent();
          _c.label = 3;
        case 3:
          return [2, _a.apply(void 0, [_b])];
      }
    });
  });
};
var getFromEndpointConfig = function() {
  return __awaiter(void 0, void 0, void 0, function() {
    return __generator(this, function(_a) {
      return [2, loadConfig(ENDPOINT_CONFIG_OPTIONS)()];
    });
  });
};
var getFromEndpointModeConfig = function() {
  return __awaiter(void 0, void 0, void 0, function() {
    var endpointMode;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          return [4, loadConfig(ENDPOINT_MODE_CONFIG_OPTIONS)()];
        case 1:
          endpointMode = _a.sent();
          switch (endpointMode) {
            case EndpointMode.IPv4:
              return [2, Endpoint.IPv4];
            case EndpointMode.IPv6:
              return [2, Endpoint.IPv6];
            default:
              throw new Error("Unsupported endpoint mode: " + endpointMode + "." + (" Select from " + Object.values(EndpointMode)));
          }
          return [2];
      }
    });
  });
};

// node_modules/@aws-sdk/credential-provider-imds/dist-es/fromInstanceMetadata.js
var IMDS_PATH = "/latest/meta-data/iam/security-credentials/";
var IMDS_TOKEN_PATH = "/latest/api/token";
var fromInstanceMetadata = function(init) {
  if (init === void 0) {
    init = {};
  }
  var disableFetchToken = false;
  var _a = providerConfigFromInit(init), timeout = _a.timeout, maxRetries = _a.maxRetries;
  var getCredentials = function(maxRetries2, options) {
    return __awaiter(void 0, void 0, void 0, function() {
      var profile;
      return __generator(this, function(_a2) {
        switch (_a2.label) {
          case 0:
            return [4, retry(function() {
              return __awaiter(void 0, void 0, void 0, function() {
                var profile2, err_1;
                return __generator(this, function(_a3) {
                  switch (_a3.label) {
                    case 0:
                      _a3.trys.push([0, 2, , 3]);
                      return [4, getProfile(options)];
                    case 1:
                      profile2 = _a3.sent();
                      return [3, 3];
                    case 2:
                      err_1 = _a3.sent();
                      if (err_1.statusCode === 401) {
                        disableFetchToken = false;
                      }
                      throw err_1;
                    case 3:
                      return [2, profile2];
                  }
                });
              });
            }, maxRetries2)];
          case 1:
            profile = _a2.sent().trim();
            return [2, retry(function() {
              return __awaiter(void 0, void 0, void 0, function() {
                var creds, err_2;
                return __generator(this, function(_a3) {
                  switch (_a3.label) {
                    case 0:
                      _a3.trys.push([0, 2, , 3]);
                      return [4, getCredentialsFromProfile(profile, options)];
                    case 1:
                      creds = _a3.sent();
                      return [3, 3];
                    case 2:
                      err_2 = _a3.sent();
                      if (err_2.statusCode === 401) {
                        disableFetchToken = false;
                      }
                      throw err_2;
                    case 3:
                      return [2, creds];
                  }
                });
              });
            }, maxRetries2)];
        }
      });
    });
  };
  return function() {
    return __awaiter(void 0, void 0, void 0, function() {
      var endpoint, token, error_1;
      return __generator(this, function(_a2) {
        switch (_a2.label) {
          case 0:
            return [4, getInstanceMetadataEndpoint()];
          case 1:
            endpoint = _a2.sent();
            if (!disableFetchToken)
              return [3, 2];
            return [2, getCredentials(maxRetries, __assign(__assign({}, endpoint), { timeout }))];
          case 2:
            token = void 0;
            _a2.label = 3;
          case 3:
            _a2.trys.push([3, 5, , 6]);
            return [4, getMetadataToken(__assign(__assign({}, endpoint), { timeout }))];
          case 4:
            token = _a2.sent().toString();
            return [3, 6];
          case 5:
            error_1 = _a2.sent();
            if ((error_1 === null || error_1 === void 0 ? void 0 : error_1.statusCode) === 400) {
              throw Object.assign(error_1, {
                message: "EC2 Metadata token request returned error"
              });
            } else if (error_1.message === "TimeoutError" || [403, 404, 405].includes(error_1.statusCode)) {
              disableFetchToken = true;
            }
            return [2, getCredentials(maxRetries, __assign(__assign({}, endpoint), { timeout }))];
          case 6:
            return [2, getCredentials(maxRetries, __assign(__assign({}, endpoint), { headers: {
              "x-aws-ec2-metadata-token": token
            }, timeout }))];
        }
      });
    });
  };
};
var getMetadataToken = function(options) {
  return __awaiter(void 0, void 0, void 0, function() {
    return __generator(this, function(_a) {
      return [2, httpRequest(__assign(__assign({}, options), { path: IMDS_TOKEN_PATH, method: "PUT", headers: {
        "x-aws-ec2-metadata-token-ttl-seconds": "21600"
      } }))];
    });
  });
};
var getProfile = function(options) {
  return __awaiter(void 0, void 0, void 0, function() {
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          return [4, httpRequest(__assign(__assign({}, options), { path: IMDS_PATH }))];
        case 1:
          return [2, _a.sent().toString()];
      }
    });
  });
};
var getCredentialsFromProfile = function(profile, options) {
  return __awaiter(void 0, void 0, void 0, function() {
    var credsResponse, _a, _b;
    return __generator(this, function(_c) {
      switch (_c.label) {
        case 0:
          _b = (_a = JSON).parse;
          return [4, httpRequest(__assign(__assign({}, options), { path: IMDS_PATH + profile }))];
        case 1:
          credsResponse = _b.apply(_a, [_c.sent().toString()]);
          if (!isImdsCredentials(credsResponse)) {
            throw new CredentialsProviderError("Invalid response received from instance metadata service.");
          }
          return [2, fromImdsCredentials(credsResponse)];
      }
    });
  });
};

// node_modules/@aws-sdk/client-sso/dist-es/models/models_0.js
var AccountInfo;
(function(AccountInfo2) {
  AccountInfo2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(AccountInfo || (AccountInfo = {}));
var GetRoleCredentialsRequest;
(function(GetRoleCredentialsRequest2) {
  GetRoleCredentialsRequest2.filterSensitiveLog = function(obj) {
    return __assign(__assign({}, obj), obj.accessToken && { accessToken: SENSITIVE_STRING });
  };
})(GetRoleCredentialsRequest || (GetRoleCredentialsRequest = {}));
var RoleCredentials;
(function(RoleCredentials2) {
  RoleCredentials2.filterSensitiveLog = function(obj) {
    return __assign(__assign(__assign({}, obj), obj.secretAccessKey && { secretAccessKey: SENSITIVE_STRING }), obj.sessionToken && { sessionToken: SENSITIVE_STRING });
  };
})(RoleCredentials || (RoleCredentials = {}));
var GetRoleCredentialsResponse;
(function(GetRoleCredentialsResponse2) {
  GetRoleCredentialsResponse2.filterSensitiveLog = function(obj) {
    return __assign(__assign({}, obj), obj.roleCredentials && { roleCredentials: RoleCredentials.filterSensitiveLog(obj.roleCredentials) });
  };
})(GetRoleCredentialsResponse || (GetRoleCredentialsResponse = {}));
var InvalidRequestException;
(function(InvalidRequestException2) {
  InvalidRequestException2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(InvalidRequestException || (InvalidRequestException = {}));
var ResourceNotFoundException;
(function(ResourceNotFoundException2) {
  ResourceNotFoundException2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(ResourceNotFoundException || (ResourceNotFoundException = {}));
var TooManyRequestsException;
(function(TooManyRequestsException2) {
  TooManyRequestsException2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(TooManyRequestsException || (TooManyRequestsException = {}));
var UnauthorizedException;
(function(UnauthorizedException2) {
  UnauthorizedException2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(UnauthorizedException || (UnauthorizedException = {}));
var ListAccountRolesRequest;
(function(ListAccountRolesRequest2) {
  ListAccountRolesRequest2.filterSensitiveLog = function(obj) {
    return __assign(__assign({}, obj), obj.accessToken && { accessToken: SENSITIVE_STRING });
  };
})(ListAccountRolesRequest || (ListAccountRolesRequest = {}));
var RoleInfo;
(function(RoleInfo2) {
  RoleInfo2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(RoleInfo || (RoleInfo = {}));
var ListAccountRolesResponse;
(function(ListAccountRolesResponse2) {
  ListAccountRolesResponse2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(ListAccountRolesResponse || (ListAccountRolesResponse = {}));
var ListAccountsRequest;
(function(ListAccountsRequest2) {
  ListAccountsRequest2.filterSensitiveLog = function(obj) {
    return __assign(__assign({}, obj), obj.accessToken && { accessToken: SENSITIVE_STRING });
  };
})(ListAccountsRequest || (ListAccountsRequest = {}));
var ListAccountsResponse;
(function(ListAccountsResponse2) {
  ListAccountsResponse2.filterSensitiveLog = function(obj) {
    return __assign({}, obj);
  };
})(ListAccountsResponse || (ListAccountsResponse = {}));
var LogoutRequest;
(function(LogoutRequest2) {
  LogoutRequest2.filterSensitiveLog = function(obj) {
    return __assign(__assign({}, obj), obj.accessToken && { accessToken: SENSITIVE_STRING });
  };
})(LogoutRequest || (LogoutRequest = {}));

// node_modules/@aws-sdk/client-sso/dist-es/protocols/Aws_restJson1.js
var serializeAws_restJson1GetRoleCredentialsCommand = function(input, context) {
  return __awaiter(void 0, void 0, void 0, function() {
    var _a, hostname, _b, protocol, port, basePath, headers, resolvedPath, query, body;
    return __generator(this, function(_c) {
      switch (_c.label) {
        case 0:
          return [4, context.endpoint()];
        case 1:
          _a = _c.sent(), hostname = _a.hostname, _b = _a.protocol, protocol = _b === void 0 ? "https" : _b, port = _a.port, basePath = _a.path;
          headers = __assign({}, isSerializableHeaderValue2(input.accessToken) && { "x-amz-sso_bearer_token": input.accessToken });
          resolvedPath = "" + ((basePath === null || basePath === void 0 ? void 0 : basePath.endsWith("/")) ? basePath.slice(0, -1) : basePath || "") + "/federation/credentials";
          query = __assign(__assign({}, input.roleName !== void 0 && { role_name: input.roleName }), input.accountId !== void 0 && { account_id: input.accountId });
          return [2, new HttpRequest({
            protocol,
            hostname,
            port,
            method: "GET",
            headers,
            path: resolvedPath,
            query,
            body
          })];
      }
    });
  });
};
var deserializeAws_restJson1GetRoleCredentialsCommand = function(output, context) {
  return __awaiter(void 0, void 0, void 0, function() {
    var contents, data, _a, _b;
    return __generator(this, function(_c) {
      switch (_c.label) {
        case 0:
          if (output.statusCode !== 200 && output.statusCode >= 300) {
            return [2, deserializeAws_restJson1GetRoleCredentialsCommandError(output, context)];
          }
          contents = {
            $metadata: deserializeMetadata3(output),
            roleCredentials: void 0
          };
          _a = expectNonNull;
          _b = expectObject;
          return [4, parseBody3(output.body, context)];
        case 1:
          data = _a.apply(void 0, [_b.apply(void 0, [_c.sent()]), "body"]);
          if (data.roleCredentials !== void 0 && data.roleCredentials !== null) {
            contents.roleCredentials = deserializeAws_restJson1RoleCredentials(data.roleCredentials, context);
          }
          return [2, Promise.resolve(contents)];
      }
    });
  });
};
var deserializeAws_restJson1GetRoleCredentialsCommandError = function(output, context) {
  return __awaiter(void 0, void 0, void 0, function() {
    var parsedOutput, _a, response, errorCode, _b, _c, _d, _e, _f, parsedBody, message;
    var _g;
    return __generator(this, function(_h) {
      switch (_h.label) {
        case 0:
          _a = [__assign({}, output)];
          _g = {};
          return [4, parseBody3(output.body, context)];
        case 1:
          parsedOutput = __assign.apply(void 0, _a.concat([(_g.body = _h.sent(), _g)]));
          errorCode = "UnknownError";
          errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
          _b = errorCode;
          switch (_b) {
            case "InvalidRequestException":
              return [3, 2];
            case "com.amazonaws.sso#InvalidRequestException":
              return [3, 2];
            case "ResourceNotFoundException":
              return [3, 4];
            case "com.amazonaws.sso#ResourceNotFoundException":
              return [3, 4];
            case "TooManyRequestsException":
              return [3, 6];
            case "com.amazonaws.sso#TooManyRequestsException":
              return [3, 6];
            case "UnauthorizedException":
              return [3, 8];
            case "com.amazonaws.sso#UnauthorizedException":
              return [3, 8];
          }
          return [3, 10];
        case 2:
          _c = [{}];
          return [4, deserializeAws_restJson1InvalidRequestExceptionResponse(parsedOutput, context)];
        case 3:
          response = __assign.apply(void 0, [__assign.apply(void 0, _c.concat([_h.sent()])), { name: errorCode, $metadata: deserializeMetadata3(output) }]);
          return [3, 11];
        case 4:
          _d = [{}];
          return [4, deserializeAws_restJson1ResourceNotFoundExceptionResponse(parsedOutput, context)];
        case 5:
          response = __assign.apply(void 0, [__assign.apply(void 0, _d.concat([_h.sent()])), { name: errorCode, $metadata: deserializeMetadata3(output) }]);
          return [3, 11];
        case 6:
          _e = [{}];
          return [4, deserializeAws_restJson1TooManyRequestsExceptionResponse(parsedOutput, context)];
        case 7:
          response = __assign.apply(void 0, [__assign.apply(void 0, _e.concat([_h.sent()])), { name: errorCode, $metadata: deserializeMetadata3(output) }]);
          return [3, 11];
        case 8:
          _f = [{}];
          return [4, deserializeAws_restJson1UnauthorizedExceptionResponse(parsedOutput, context)];
        case 9:
          response = __assign.apply(void 0, [__assign.apply(void 0, _f.concat([_h.sent()])), { name: errorCode, $metadata: deserializeMetadata3(output) }]);
          return [3, 11];
        case 10:
          parsedBody = parsedOutput.body;
          errorCode = parsedBody.code || parsedBody.Code || errorCode;
          response = __assign(__assign({}, parsedBody), { name: "" + errorCode, message: parsedBody.message || parsedBody.Message || errorCode, $fault: "client", $metadata: deserializeMetadata3(output) });
          _h.label = 11;
        case 11:
          message = response.message || response.Message || errorCode;
          response.message = message;
          delete response.Message;
          return [2, Promise.reject(Object.assign(new Error(message), response))];
      }
    });
  });
};
var deserializeAws_restJson1InvalidRequestExceptionResponse = function(parsedOutput, context) {
  return __awaiter(void 0, void 0, void 0, function() {
    var contents, data;
    return __generator(this, function(_a) {
      contents = {
        name: "InvalidRequestException",
        $fault: "client",
        $metadata: deserializeMetadata3(parsedOutput),
        message: void 0
      };
      data = parsedOutput.body;
      if (data.message !== void 0 && data.message !== null) {
        contents.message = expectString(data.message);
      }
      return [2, contents];
    });
  });
};
var deserializeAws_restJson1ResourceNotFoundExceptionResponse = function(parsedOutput, context) {
  return __awaiter(void 0, void 0, void 0, function() {
    var contents, data;
    return __generator(this, function(_a) {
      contents = {
        name: "ResourceNotFoundException",
        $fault: "client",
        $metadata: deserializeMetadata3(parsedOutput),
        message: void 0
      };
      data = parsedOutput.body;
      if (data.message !== void 0 && data.message !== null) {
        contents.message = expectString(data.message);
      }
      return [2, contents];
    });
  });
};
var deserializeAws_restJson1TooManyRequestsExceptionResponse = function(parsedOutput, context) {
  return __awaiter(void 0, void 0, void 0, function() {
    var contents, data;
    return __generator(this, function(_a) {
      contents = {
        name: "TooManyRequestsException",
        $fault: "client",
        $metadata: deserializeMetadata3(parsedOutput),
        message: void 0
      };
      data = parsedOutput.body;
      if (data.message !== void 0 && data.message !== null) {
        contents.message = expectString(data.message);
      }
      return [2, contents];
    });
  });
};
var deserializeAws_restJson1UnauthorizedExceptionResponse = function(parsedOutput, context) {
  return __awaiter(void 0, void 0, void 0, function() {
    var contents, data;
    return __generator(this, function(_a) {
      contents = {
        name: "UnauthorizedException",
        $fault: "client",
        $metadata: deserializeMetadata3(parsedOutput),
        message: void 0
      };
      data = parsedOutput.body;
      if (data.message !== void 0 && data.message !== null) {
        contents.message = expectString(data.message);
      }
      return [2, contents];
    });
  });
};
var deserializeAws_restJson1RoleCredentials = function(output, context) {
  return {
    accessKeyId: expectString(output.accessKeyId),
    expiration: expectLong(output.expiration),
    secretAccessKey: expectString(output.secretAccessKey),
    sessionToken: expectString(output.sessionToken)
  };
};
var deserializeMetadata3 = function(output) {
  var _a;
  return {
    httpStatusCode: output.statusCode,
    requestId: (_a = output.headers["x-amzn-requestid"]) !== null && _a !== void 0 ? _a : output.headers["x-amzn-request-id"],
    extendedRequestId: output.headers["x-amz-id-2"],
    cfId: output.headers["x-amz-cf-id"]
  };
};
var collectBody3 = function(streamBody, context) {
  if (streamBody === void 0) {
    streamBody = new Uint8Array();
  }
  if (streamBody instanceof Uint8Array) {
    return Promise.resolve(streamBody);
  }
  return context.streamCollector(streamBody) || Promise.resolve(new Uint8Array());
};
var collectBodyString3 = function(streamBody, context) {
  return collectBody3(streamBody, context).then(function(body) {
    return context.utf8Encoder(body);
  });
};
var isSerializableHeaderValue2 = function(value) {
  return value !== void 0 && value !== null && value !== "" && (!Object.getOwnPropertyNames(value).includes("length") || value.length != 0) && (!Object.getOwnPropertyNames(value).includes("size") || value.size != 0);
};
var parseBody3 = function(streamBody, context) {
  return collectBodyString3(streamBody, context).then(function(encoded) {
    if (encoded.length) {
      return JSON.parse(encoded);
    }
    return {};
  });
};
var loadRestJsonErrorCode = function(output, data) {
  var findKey = function(object, key) {
    return Object.keys(object).find(function(k) {
      return k.toLowerCase() === key.toLowerCase();
    });
  };
  var sanitizeErrorCode = function(rawValue) {
    var cleanValue = rawValue;
    if (cleanValue.indexOf(":") >= 0) {
      cleanValue = cleanValue.split(":")[0];
    }
    if (cleanValue.indexOf("#") >= 0) {
      cleanValue = cleanValue.split("#")[1];
    }
    return cleanValue;
  };
  var headerKey = findKey(output.headers, "x-amzn-errortype");
  if (headerKey !== void 0) {
    return sanitizeErrorCode(output.headers[headerKey]);
  }
  if (data.code !== void 0) {
    return sanitizeErrorCode(data.code);
  }
  if (data["__type"] !== void 0) {
    return sanitizeErrorCode(data["__type"]);
  }
  return "";
};

// node_modules/@aws-sdk/client-sso/dist-es/commands/GetRoleCredentialsCommand.js
var GetRoleCredentialsCommand = function(_super) {
  __extends(GetRoleCredentialsCommand2, _super);
  function GetRoleCredentialsCommand2(input) {
    var _this = _super.call(this) || this;
    _this.input = input;
    return _this;
  }
  GetRoleCredentialsCommand2.prototype.resolveMiddleware = function(clientStack, configuration, options) {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
    var stack = clientStack.concat(this.middlewareStack);
    var logger = configuration.logger;
    var clientName = "SSOClient";
    var commandName = "GetRoleCredentialsCommand";
    var handlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: GetRoleCredentialsRequest.filterSensitiveLog,
      outputFilterSensitiveLog: GetRoleCredentialsResponse.filterSensitiveLog
    };
    var requestHandler = configuration.requestHandler;
    return stack.resolve(function(request2) {
      return requestHandler.handle(request2.request, options || {});
    }, handlerExecutionContext);
  };
  GetRoleCredentialsCommand2.prototype.serialize = function(input, context) {
    return serializeAws_restJson1GetRoleCredentialsCommand(input, context);
  };
  GetRoleCredentialsCommand2.prototype.deserialize = function(output, context) {
    return deserializeAws_restJson1GetRoleCredentialsCommand(output, context);
  };
  return GetRoleCredentialsCommand2;
}(Command);

// node_modules/@aws-sdk/client-sso/package.json
var name3 = "@aws-sdk/client-sso";
var description3 = "AWS SDK for JavaScript Sso Client for Node.js, Browser and React Native";
var version4 = "3.41.0";
var scripts3 = {
  build: "yarn build:cjs && yarn build:es && yarn build:types",
  "build:cjs": "tsc -p tsconfig.json",
  "build:docs": "yarn clean:docs && typedoc ./",
  "build:es": "tsc -p tsconfig.es.json",
  "build:types": "tsc -p tsconfig.types.json",
  clean: "yarn clean:dist && yarn clean:docs",
  "clean:dist": "rimraf ./dist",
  "clean:docs": "rimraf ./docs",
  "downlevel-dts": "downlevel-dts dist-types dist-types/ts3.4",
  test: "exit 0"
};
var main3 = "./dist-cjs/index.js";
var types3 = "./dist-types/index.d.ts";
var module4 = "./dist-es/index.js";
var sideEffects3 = false;
var dependencies3 = {
  "@aws-crypto/sha256-browser": "2.0.0",
  "@aws-crypto/sha256-js": "2.0.0",
  "@aws-sdk/config-resolver": "3.40.0",
  "@aws-sdk/fetch-http-handler": "3.40.0",
  "@aws-sdk/hash-node": "3.40.0",
  "@aws-sdk/invalid-dependency": "3.40.0",
  "@aws-sdk/middleware-content-length": "3.40.0",
  "@aws-sdk/middleware-host-header": "3.40.0",
  "@aws-sdk/middleware-logger": "3.40.0",
  "@aws-sdk/middleware-retry": "3.40.0",
  "@aws-sdk/middleware-serde": "3.40.0",
  "@aws-sdk/middleware-stack": "3.40.0",
  "@aws-sdk/middleware-user-agent": "3.40.0",
  "@aws-sdk/node-config-provider": "3.40.0",
  "@aws-sdk/node-http-handler": "3.40.0",
  "@aws-sdk/protocol-http": "3.40.0",
  "@aws-sdk/smithy-client": "3.41.0",
  "@aws-sdk/types": "3.40.0",
  "@aws-sdk/url-parser": "3.40.0",
  "@aws-sdk/util-base64-browser": "3.37.0",
  "@aws-sdk/util-base64-node": "3.37.0",
  "@aws-sdk/util-body-length-browser": "3.37.0",
  "@aws-sdk/util-body-length-node": "3.37.0",
  "@aws-sdk/util-user-agent-browser": "3.40.0",
  "@aws-sdk/util-user-agent-node": "3.40.0",
  "@aws-sdk/util-utf8-browser": "3.37.0",
  "@aws-sdk/util-utf8-node": "3.37.0",
  tslib: "^2.3.0"
};
var devDependencies3 = {
  "@aws-sdk/service-client-documentation-generator": "3.38.0",
  "@types/node": "^12.7.5",
  "downlevel-dts": "0.7.0",
  jest: "^26.1.0",
  rimraf: "^3.0.0",
  "ts-jest": "^26.4.1",
  typedoc: "^0.19.2",
  typescript: "~4.3.5"
};
var engines3 = {
  node: ">=10.0.0"
};
var typesVersions3 = {
  "<4.0": {
    "dist-types/*": [
      "dist-types/ts3.4/*"
    ]
  }
};
var files3 = [
  "dist-*"
];
var author3 = {
  name: "AWS SDK for JavaScript Team",
  url: "https://aws.amazon.com/javascript/"
};
var license3 = "Apache-2.0";
var browser3 = {
  "./dist-es/runtimeConfig": "./dist-es/runtimeConfig.browser"
};
var react_native3 = {
  "./dist-es/runtimeConfig": "./dist-es/runtimeConfig.native"
};
var homepage3 = "https://github.com/aws/aws-sdk-js-v3/tree/main/clients/client-sso";
var repository3 = {
  type: "git",
  url: "https://github.com/aws/aws-sdk-js-v3.git",
  directory: "clients/client-sso"
};
var package_default3 = {
  name: name3,
  description: description3,
  version: version4,
  scripts: scripts3,
  main: main3,
  types: types3,
  module: module4,
  sideEffects: sideEffects3,
  dependencies: dependencies3,
  devDependencies: devDependencies3,
  engines: engines3,
  typesVersions: typesVersions3,
  files: files3,
  author: author3,
  license: license3,
  browser: browser3,
  "react-native": react_native3,
  homepage: homepage3,
  repository: repository3
};

// node_modules/@aws-sdk/util-buffer-from/dist-es/index.js
var import_buffer2 = __toModule(require("buffer"));
var fromArrayBuffer = function(input, offset, length) {
  if (offset === void 0) {
    offset = 0;
  }
  if (length === void 0) {
    length = input.byteLength - offset;
  }
  if (!isArrayBuffer(input)) {
    throw new TypeError('The "input" argument must be ArrayBuffer. Received type ' + typeof input + " (" + input + ")");
  }
  return import_buffer2.Buffer.from(input, offset, length);
};
var fromString = function(input, encoding) {
  if (typeof input !== "string") {
    throw new TypeError('The "input" argument must be of type string. Received type ' + typeof input + " (" + input + ")");
  }
  return encoding ? import_buffer2.Buffer.from(input, encoding) : import_buffer2.Buffer.from(input);
};

// node_modules/@aws-sdk/hash-node/dist-es/index.js
var import_buffer3 = __toModule(require("buffer"));
var import_crypto = __toModule(require("crypto"));
var Hash = function() {
  function Hash2(algorithmIdentifier, secret) {
    this.hash = secret ? (0, import_crypto.createHmac)(algorithmIdentifier, castSourceData(secret)) : (0, import_crypto.createHash)(algorithmIdentifier);
  }
  Hash2.prototype.update = function(toHash, encoding) {
    this.hash.update(castSourceData(toHash, encoding));
  };
  Hash2.prototype.digest = function() {
    return Promise.resolve(this.hash.digest());
  };
  return Hash2;
}();
function castSourceData(toCast, encoding) {
  if (import_buffer3.Buffer.isBuffer(toCast)) {
    return toCast;
  }
  if (typeof toCast === "string") {
    return fromString(toCast, encoding);
  }
  if (ArrayBuffer.isView(toCast)) {
    return fromArrayBuffer(toCast.buffer, toCast.byteOffset, toCast.byteLength);
  }
  return fromArrayBuffer(toCast);
}

// node_modules/@aws-sdk/querystring-builder/dist-es/index.js
function buildQueryString(query) {
  var e_1, _a;
  var parts = [];
  try {
    for (var _b = __values2(Object.keys(query).sort()), _c = _b.next(); !_c.done; _c = _b.next()) {
      var key = _c.value;
      var value = query[key];
      key = escapeUri(key);
      if (Array.isArray(value)) {
        for (var i = 0, iLen = value.length; i < iLen; i++) {
          parts.push(key + "=" + escapeUri(value[i]));
        }
      } else {
        var qsEntry = key;
        if (value || typeof value === "string") {
          qsEntry += "=" + escapeUri(value);
        }
        parts.push(qsEntry);
      }
    }
  } catch (e_1_1) {
    e_1 = { error: e_1_1 };
  } finally {
    try {
      if (_c && !_c.done && (_a = _b.return))
        _a.call(_b);
    } finally {
      if (e_1)
        throw e_1.error;
    }
  }
  return parts.join("&");
}

// node_modules/@aws-sdk/node-http-handler/dist-es/node-http-handler.js
var import_http2 = __toModule(require("http"));
var import_https = __toModule(require("https"));

// node_modules/@aws-sdk/node-http-handler/dist-es/constants.js
var NODEJS_TIMEOUT_ERROR_CODES = ["ECONNRESET", "EPIPE", "ETIMEDOUT"];

// node_modules/@aws-sdk/node-http-handler/dist-es/get-transformed-headers.js
var getTransformedHeaders = function(headers) {
  var e_1, _a;
  var transformedHeaders = {};
  try {
    for (var _b = __values2(Object.keys(headers)), _c = _b.next(); !_c.done; _c = _b.next()) {
      var name4 = _c.value;
      var headerValues = headers[name4];
      transformedHeaders[name4] = Array.isArray(headerValues) ? headerValues.join(",") : headerValues;
    }
  } catch (e_1_1) {
    e_1 = { error: e_1_1 };
  } finally {
    try {
      if (_c && !_c.done && (_a = _b.return))
        _a.call(_b);
    } finally {
      if (e_1)
        throw e_1.error;
    }
  }
  return transformedHeaders;
};

// node_modules/@aws-sdk/node-http-handler/dist-es/set-connection-timeout.js
var setConnectionTimeout = function(request2, reject, timeoutInMs) {
  if (timeoutInMs === void 0) {
    timeoutInMs = 0;
  }
  if (!timeoutInMs) {
    return;
  }
  request2.on("socket", function(socket) {
    if (socket.connecting) {
      var timeoutId_1 = setTimeout(function() {
        request2.destroy();
        reject(Object.assign(new Error("Socket timed out without establishing a connection within " + timeoutInMs + " ms"), {
          name: "TimeoutError"
        }));
      }, timeoutInMs);
      socket.on("connect", function() {
        clearTimeout(timeoutId_1);
      });
    }
  });
};

// node_modules/@aws-sdk/node-http-handler/dist-es/set-socket-timeout.js
var setSocketTimeout = function(request2, reject, timeoutInMs) {
  if (timeoutInMs === void 0) {
    timeoutInMs = 0;
  }
  request2.setTimeout(timeoutInMs, function() {
    request2.destroy();
    reject(Object.assign(new Error("Connection timed out after " + timeoutInMs + " ms"), { name: "TimeoutError" }));
  });
};

// node_modules/@aws-sdk/node-http-handler/dist-es/write-request-body.js
var import_stream = __toModule(require("stream"));
function writeRequestBody(httpRequest2, request2) {
  var expect = request2.headers["Expect"] || request2.headers["expect"];
  if (expect === "100-continue") {
    httpRequest2.on("continue", function() {
      writeBody(httpRequest2, request2.body);
    });
  } else {
    writeBody(httpRequest2, request2.body);
  }
}
function writeBody(httpRequest2, body) {
  if (body instanceof import_stream.Readable) {
    body.pipe(httpRequest2);
  } else if (body) {
    httpRequest2.end(Buffer.from(body));
  } else {
    httpRequest2.end();
  }
}

// node_modules/@aws-sdk/node-http-handler/dist-es/node-http-handler.js
var NodeHttpHandler = function() {
  function NodeHttpHandler2(_a) {
    var _b = _a === void 0 ? {} : _a, connectionTimeout = _b.connectionTimeout, socketTimeout = _b.socketTimeout, httpAgent = _b.httpAgent, httpsAgent = _b.httpsAgent;
    this.metadata = { handlerProtocol: "http/1.1" };
    this.connectionTimeout = connectionTimeout;
    this.socketTimeout = socketTimeout;
    var keepAlive = true;
    var maxSockets = 50;
    this.httpAgent = httpAgent || new import_http2.Agent({ keepAlive, maxSockets });
    this.httpsAgent = httpsAgent || new import_https.Agent({ keepAlive, maxSockets });
  }
  NodeHttpHandler2.prototype.destroy = function() {
    this.httpAgent.destroy();
    this.httpsAgent.destroy();
  };
  NodeHttpHandler2.prototype.handle = function(request2, _a) {
    var _this = this;
    var _b = _a === void 0 ? {} : _a, abortSignal = _b.abortSignal;
    return new Promise(function(resolve, reject) {
      if (abortSignal === null || abortSignal === void 0 ? void 0 : abortSignal.aborted) {
        var abortError = new Error("Request aborted");
        abortError.name = "AbortError";
        reject(abortError);
        return;
      }
      var isSSL = request2.protocol === "https:";
      var queryString = buildQueryString(request2.query || {});
      var nodeHttpsOptions = {
        headers: request2.headers,
        host: request2.hostname,
        method: request2.method,
        path: queryString ? request2.path + "?" + queryString : request2.path,
        port: request2.port,
        agent: isSSL ? _this.httpsAgent : _this.httpAgent
      };
      var requestFunc = isSSL ? import_https.request : import_http2.request;
      var req = requestFunc(nodeHttpsOptions, function(res) {
        var httpResponse = new HttpResponse({
          statusCode: res.statusCode || -1,
          headers: getTransformedHeaders(res.headers),
          body: res
        });
        resolve({ response: httpResponse });
      });
      req.on("error", function(err) {
        if (NODEJS_TIMEOUT_ERROR_CODES.includes(err.code)) {
          reject(Object.assign(err, { name: "TimeoutError" }));
        } else {
          reject(err);
        }
      });
      setConnectionTimeout(req, reject, _this.connectionTimeout);
      setSocketTimeout(req, reject, _this.socketTimeout);
      if (abortSignal) {
        abortSignal.onabort = function() {
          req.abort();
          var abortError2 = new Error("Request aborted");
          abortError2.name = "AbortError";
          reject(abortError2);
        };
      }
      writeRequestBody(req, request2);
    });
  };
  return NodeHttpHandler2;
}();

// node_modules/@aws-sdk/node-http-handler/dist-es/node-http2-handler.js
var import_http22 = __toModule(require("http2"));
var NodeHttp2Handler = function() {
  function NodeHttp2Handler2(_a) {
    var _b = _a === void 0 ? {} : _a, requestTimeout = _b.requestTimeout, sessionTimeout = _b.sessionTimeout, disableConcurrentStreams = _b.disableConcurrentStreams;
    this.metadata = { handlerProtocol: "h2" };
    this.requestTimeout = requestTimeout;
    this.sessionTimeout = sessionTimeout;
    this.disableConcurrentStreams = disableConcurrentStreams;
    this.sessionCache = new Map();
  }
  NodeHttp2Handler2.prototype.destroy = function() {
    var e_1, _a;
    var _this = this;
    try {
      for (var _b = __values2(this.sessionCache.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
        var sessions = _c.value;
        sessions.forEach(function(session) {
          return _this.destroySession(session);
        });
      }
    } catch (e_1_1) {
      e_1 = { error: e_1_1 };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b.return))
          _a.call(_b);
      } finally {
        if (e_1)
          throw e_1.error;
      }
    }
    this.sessionCache.clear();
  };
  NodeHttp2Handler2.prototype.handle = function(request2, _a) {
    var _this = this;
    var _b = _a === void 0 ? {} : _a, abortSignal = _b.abortSignal;
    return new Promise(function(resolve, rejectOriginal) {
      var _a2;
      var fulfilled = false;
      if (abortSignal === null || abortSignal === void 0 ? void 0 : abortSignal.aborted) {
        fulfilled = true;
        var abortError = new Error("Request aborted");
        abortError.name = "AbortError";
        rejectOriginal(abortError);
        return;
      }
      var hostname = request2.hostname, method = request2.method, port = request2.port, protocol = request2.protocol, path3 = request2.path, query = request2.query;
      var authority = protocol + "//" + hostname + (port ? ":" + port : "");
      var session = _this.getSession(authority, _this.disableConcurrentStreams || false);
      var reject = function(err) {
        if (_this.disableConcurrentStreams) {
          _this.destroySession(session);
        }
        fulfilled = true;
        rejectOriginal(err);
      };
      var queryString = buildQueryString(query || {});
      var req = session.request(__assign(__assign({}, request2.headers), (_a2 = {}, _a2[import_http22.constants.HTTP2_HEADER_PATH] = queryString ? path3 + "?" + queryString : path3, _a2[import_http22.constants.HTTP2_HEADER_METHOD] = method, _a2)));
      req.on("response", function(headers) {
        var httpResponse = new HttpResponse({
          statusCode: headers[":status"] || -1,
          headers: getTransformedHeaders(headers),
          body: req
        });
        fulfilled = true;
        resolve({ response: httpResponse });
        if (_this.disableConcurrentStreams) {
          session.close();
          _this.deleteSessionFromCache(authority, session);
        }
      });
      var requestTimeout = _this.requestTimeout;
      if (requestTimeout) {
        req.setTimeout(requestTimeout, function() {
          req.close();
          var timeoutError = new Error("Stream timed out because of no activity for " + requestTimeout + " ms");
          timeoutError.name = "TimeoutError";
          reject(timeoutError);
        });
      }
      if (abortSignal) {
        abortSignal.onabort = function() {
          req.close();
          var abortError2 = new Error("Request aborted");
          abortError2.name = "AbortError";
          reject(abortError2);
        };
      }
      req.on("frameError", function(type, code, id) {
        reject(new Error("Frame type id " + type + " in stream id " + id + " has failed with code " + code + "."));
      });
      req.on("error", reject);
      req.on("aborted", function() {
        reject(new Error("HTTP/2 stream is abnormally aborted in mid-communication with result code " + req.rstCode + "."));
      });
      req.on("close", function() {
        if (_this.disableConcurrentStreams) {
          session.destroy();
        }
        if (!fulfilled) {
          reject(new Error("Unexpected error: http2 request did not get a response"));
        }
      });
      writeRequestBody(req, request2);
    });
  };
  NodeHttp2Handler2.prototype.getSession = function(authority, disableConcurrentStreams) {
    var _this = this;
    var sessionCache = this.sessionCache;
    var existingSessions = sessionCache.get(authority) || [];
    if (existingSessions.length > 0 && !disableConcurrentStreams)
      return existingSessions[0];
    var newSession = (0, import_http22.connect)(authority);
    var destroySessionCb = function() {
      _this.destroySession(newSession);
      _this.deleteSessionFromCache(authority, newSession);
    };
    newSession.on("goaway", destroySessionCb);
    newSession.on("error", destroySessionCb);
    newSession.on("frameError", destroySessionCb);
    var sessionTimeout = this.sessionTimeout;
    if (sessionTimeout) {
      newSession.setTimeout(sessionTimeout, destroySessionCb);
    }
    existingSessions.push(newSession);
    sessionCache.set(authority, existingSessions);
    return newSession;
  };
  NodeHttp2Handler2.prototype.destroySession = function(session) {
    if (!session.destroyed) {
      session.destroy();
    }
  };
  NodeHttp2Handler2.prototype.deleteSessionFromCache = function(authority, session) {
    var existingSessions = this.sessionCache.get(authority) || [];
    if (!existingSessions.includes(session)) {
      return;
    }
    this.sessionCache.set(authority, existingSessions.filter(function(s) {
      return s !== session;
    }));
  };
  return NodeHttp2Handler2;
}();

// node_modules/@aws-sdk/node-http-handler/dist-es/stream-collector/collector.js
var import_stream2 = __toModule(require("stream"));
var Collector = function(_super) {
  __extends(Collector2, _super);
  function Collector2() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.bufferedBytes = [];
    return _this;
  }
  Collector2.prototype._write = function(chunk, encoding, callback) {
    this.bufferedBytes.push(chunk);
    callback();
  };
  return Collector2;
}(import_stream2.Writable);

// node_modules/@aws-sdk/node-http-handler/dist-es/stream-collector/index.js
var streamCollector = function(stream) {
  return new Promise(function(resolve, reject) {
    var collector = new Collector();
    stream.pipe(collector);
    stream.on("error", function(err) {
      collector.end();
      reject(err);
    });
    collector.on("error", reject);
    collector.on("finish", function() {
      var bytes = new Uint8Array(Buffer.concat(this.bufferedBytes));
      resolve(bytes);
    });
  });
};

// node_modules/@aws-sdk/util-base64-node/dist-es/index.js
var BASE64_REGEX = /^[A-Za-z0-9+/]*={0,2}$/;
function fromBase64(input) {
  if (input.length * 3 % 4 !== 0) {
    throw new TypeError("Incorrect padding on base64 string.");
  }
  if (!BASE64_REGEX.exec(input)) {
    throw new TypeError("Invalid base64 string.");
  }
  var buffer = fromString(input, "base64");
  return new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
}
function toBase64(input) {
  return fromArrayBuffer(input.buffer, input.byteOffset, input.byteLength).toString("base64");
}

// node_modules/@aws-sdk/util-body-length-node/dist-es/index.js
var import_fs2 = __toModule(require("fs"));
function calculateBodyLength(body) {
  if (!body) {
    return 0;
  }
  if (typeof body === "string") {
    return Buffer.from(body).length;
  } else if (typeof body.byteLength === "number") {
    return body.byteLength;
  } else if (typeof body.size === "number") {
    return body.size;
  } else if (typeof body.path === "string") {
    return (0, import_fs2.lstatSync)(body.path).size;
  }
}

// node_modules/@aws-sdk/util-user-agent-node/dist-es/index.js
var import_os2 = __toModule(require("os"));
var import_process = __toModule(require("process"));

// node_modules/@aws-sdk/util-user-agent-node/dist-es/is-crt-available.js
var isCrtAvailable = function() {
  try {
    if (typeof require === "function" && typeof module !== "undefined" && module.require && require("aws-crt")) {
      return ["md/crt-avail"];
    }
    return null;
  } catch (e) {
    return null;
  }
};

// node_modules/@aws-sdk/util-user-agent-node/dist-es/index.js
var UA_APP_ID_ENV_NAME = "AWS_SDK_UA_APP_ID";
var UA_APP_ID_INI_NAME = "sdk-ua-app-id";
var defaultUserAgent = function(_a) {
  var serviceId = _a.serviceId, clientVersion = _a.clientVersion;
  var sections = [
    ["aws-sdk-js", clientVersion],
    ["os/" + (0, import_os2.platform)(), (0, import_os2.release)()],
    ["lang/js"],
    ["md/nodejs", "" + import_process.versions.node]
  ];
  var crtAvailable = isCrtAvailable();
  if (crtAvailable) {
    sections.push(crtAvailable);
  }
  if (serviceId) {
    sections.push(["api/" + serviceId, clientVersion]);
  }
  if (import_process.env.AWS_EXECUTION_ENV) {
    sections.push(["exec-env/" + import_process.env.AWS_EXECUTION_ENV]);
  }
  var appIdPromise = loadConfig({
    environmentVariableSelector: function(env2) {
      return env2[UA_APP_ID_ENV_NAME];
    },
    configFileSelector: function(profile) {
      return profile[UA_APP_ID_INI_NAME];
    },
    default: void 0
  })();
  var resolvedUserAgent = void 0;
  return function() {
    return __awaiter(void 0, void 0, void 0, function() {
      var appId;
      return __generator(this, function(_a2) {
        switch (_a2.label) {
          case 0:
            if (!!resolvedUserAgent)
              return [3, 2];
            return [4, appIdPromise];
          case 1:
            appId = _a2.sent();
            resolvedUserAgent = appId ? __spreadArray(__spreadArray([], __read(sections)), [["app/" + appId]]) : __spreadArray([], __read(sections));
            _a2.label = 2;
          case 2:
            return [2, resolvedUserAgent];
        }
      });
    });
  };
};

// node_modules/@aws-sdk/util-utf8-node/dist-es/index.js
var fromUtf8 = function(input) {
  var buf = fromString(input, "utf8");
  return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength / Uint8Array.BYTES_PER_ELEMENT);
};
var toUtf8 = function(input) {
  return fromArrayBuffer(input.buffer, input.byteOffset, input.byteLength).toString("utf8");
};

// node_modules/@aws-sdk/client-sso/dist-es/endpoints.js
var regionHash = {
  "ap-northeast-1": {
    variants: [
      {
        hostname: "portal.sso.ap-northeast-1.amazonaws.com",
        tags: []
      }
    ],
    signingRegion: "ap-northeast-1"
  },
  "ap-northeast-2": {
    variants: [
      {
        hostname: "portal.sso.ap-northeast-2.amazonaws.com",
        tags: []
      }
    ],
    signingRegion: "ap-northeast-2"
  },
  "ap-south-1": {
    variants: [
      {
        hostname: "portal.sso.ap-south-1.amazonaws.com",
        tags: []
      }
    ],
    signingRegion: "ap-south-1"
  },
  "ap-southeast-1": {
    variants: [
      {
        hostname: "portal.sso.ap-southeast-1.amazonaws.com",
        tags: []
      }
    ],
    signingRegion: "ap-southeast-1"
  },
  "ap-southeast-2": {
    variants: [
      {
        hostname: "portal.sso.ap-southeast-2.amazonaws.com",
        tags: []
      }
    ],
    signingRegion: "ap-southeast-2"
  },
  "ca-central-1": {
    variants: [
      {
        hostname: "portal.sso.ca-central-1.amazonaws.com",
        tags: []
      }
    ],
    signingRegion: "ca-central-1"
  },
  "eu-central-1": {
    variants: [
      {
        hostname: "portal.sso.eu-central-1.amazonaws.com",
        tags: []
      }
    ],
    signingRegion: "eu-central-1"
  },
  "eu-north-1": {
    variants: [
      {
        hostname: "portal.sso.eu-north-1.amazonaws.com",
        tags: []
      }
    ],
    signingRegion: "eu-north-1"
  },
  "eu-west-1": {
    variants: [
      {
        hostname: "portal.sso.eu-west-1.amazonaws.com",
        tags: []
      }
    ],
    signingRegion: "eu-west-1"
  },
  "eu-west-2": {
    variants: [
      {
        hostname: "portal.sso.eu-west-2.amazonaws.com",
        tags: []
      }
    ],
    signingRegion: "eu-west-2"
  },
  "eu-west-3": {
    variants: [
      {
        hostname: "portal.sso.eu-west-3.amazonaws.com",
        tags: []
      }
    ],
    signingRegion: "eu-west-3"
  },
  "sa-east-1": {
    variants: [
      {
        hostname: "portal.sso.sa-east-1.amazonaws.com",
        tags: []
      }
    ],
    signingRegion: "sa-east-1"
  },
  "us-east-1": {
    variants: [
      {
        hostname: "portal.sso.us-east-1.amazonaws.com",
        tags: []
      }
    ],
    signingRegion: "us-east-1"
  },
  "us-east-2": {
    variants: [
      {
        hostname: "portal.sso.us-east-2.amazonaws.com",
        tags: []
      }
    ],
    signingRegion: "us-east-2"
  },
  "us-gov-west-1": {
    variants: [
      {
        hostname: "portal.sso.us-gov-west-1.amazonaws.com",
        tags: []
      }
    ],
    signingRegion: "us-gov-west-1"
  },
  "us-west-2": {
    variants: [
      {
        hostname: "portal.sso.us-west-2.amazonaws.com",
        tags: []
      }
    ],
    signingRegion: "us-west-2"
  }
};
var partitionHash = {
  aws: {
    regions: [
      "af-south-1",
      "ap-east-1",
      "ap-northeast-1",
      "ap-northeast-2",
      "ap-northeast-3",
      "ap-south-1",
      "ap-southeast-1",
      "ap-southeast-2",
      "ca-central-1",
      "eu-central-1",
      "eu-north-1",
      "eu-south-1",
      "eu-west-1",
      "eu-west-2",
      "eu-west-3",
      "me-south-1",
      "sa-east-1",
      "us-east-1",
      "us-east-2",
      "us-west-1",
      "us-west-2"
    ],
    regionRegex: "^(us|eu|ap|sa|ca|me|af)\\-\\w+\\-\\d+$",
    variants: [
      {
        hostname: "portal.sso.{region}.amazonaws.com",
        tags: []
      },
      {
        hostname: "portal.sso-fips.{region}.amazonaws.com",
        tags: ["fips"]
      },
      {
        hostname: "portal.sso-fips.{region}.api.aws",
        tags: ["dualstack", "fips"]
      },
      {
        hostname: "portal.sso.{region}.api.aws",
        tags: ["dualstack"]
      }
    ]
  },
  "aws-cn": {
    regions: ["cn-north-1", "cn-northwest-1"],
    regionRegex: "^cn\\-\\w+\\-\\d+$",
    variants: [
      {
        hostname: "portal.sso.{region}.amazonaws.com.cn",
        tags: []
      },
      {
        hostname: "portal.sso-fips.{region}.amazonaws.com.cn",
        tags: ["fips"]
      },
      {
        hostname: "portal.sso-fips.{region}.api.amazonwebservices.com.cn",
        tags: ["dualstack", "fips"]
      },
      {
        hostname: "portal.sso.{region}.api.amazonwebservices.com.cn",
        tags: ["dualstack"]
      }
    ]
  },
  "aws-iso": {
    regions: ["us-iso-east-1", "us-iso-west-1"],
    regionRegex: "^us\\-iso\\-\\w+\\-\\d+$",
    variants: [
      {
        hostname: "portal.sso.{region}.c2s.ic.gov",
        tags: []
      },
      {
        hostname: "portal.sso-fips.{region}.c2s.ic.gov",
        tags: ["fips"]
      }
    ]
  },
  "aws-iso-b": {
    regions: ["us-isob-east-1"],
    regionRegex: "^us\\-isob\\-\\w+\\-\\d+$",
    variants: [
      {
        hostname: "portal.sso.{region}.sc2s.sgov.gov",
        tags: []
      },
      {
        hostname: "portal.sso-fips.{region}.sc2s.sgov.gov",
        tags: ["fips"]
      }
    ]
  },
  "aws-us-gov": {
    regions: ["us-gov-east-1", "us-gov-west-1"],
    regionRegex: "^us\\-gov\\-\\w+\\-\\d+$",
    variants: [
      {
        hostname: "portal.sso.{region}.amazonaws.com",
        tags: []
      },
      {
        hostname: "portal.sso-fips.{region}.amazonaws.com",
        tags: ["fips"]
      },
      {
        hostname: "portal.sso-fips.{region}.api.aws",
        tags: ["dualstack", "fips"]
      },
      {
        hostname: "portal.sso.{region}.api.aws",
        tags: ["dualstack"]
      }
    ]
  }
};
var defaultRegionInfoProvider = function(region, options) {
  return __awaiter(void 0, void 0, void 0, function() {
    return __generator(this, function(_a) {
      return [2, getRegionInfo(region, __assign(__assign({}, options), { signingService: "awsssoportal", regionHash, partitionHash }))];
    });
  });
};

// node_modules/@aws-sdk/client-sso/dist-es/runtimeConfig.shared.js
var getRuntimeConfig = function(config) {
  var _a, _b, _c, _d, _e;
  return {
    apiVersion: "2019-06-10",
    disableHostPrefix: (_a = config === null || config === void 0 ? void 0 : config.disableHostPrefix) !== null && _a !== void 0 ? _a : false,
    logger: (_b = config === null || config === void 0 ? void 0 : config.logger) !== null && _b !== void 0 ? _b : {},
    regionInfoProvider: (_c = config === null || config === void 0 ? void 0 : config.regionInfoProvider) !== null && _c !== void 0 ? _c : defaultRegionInfoProvider,
    serviceId: (_d = config === null || config === void 0 ? void 0 : config.serviceId) !== null && _d !== void 0 ? _d : "SSO",
    urlParser: (_e = config === null || config === void 0 ? void 0 : config.urlParser) !== null && _e !== void 0 ? _e : parseUrl
  };
};

// node_modules/@aws-sdk/client-sso/dist-es/runtimeConfig.js
var getRuntimeConfig2 = function(config) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
  emitWarningIfUnsupportedVersion(process.version);
  var clientSharedValues = getRuntimeConfig(config);
  return __assign(__assign(__assign({}, clientSharedValues), config), { runtime: "node", base64Decoder: (_a = config === null || config === void 0 ? void 0 : config.base64Decoder) !== null && _a !== void 0 ? _a : fromBase64, base64Encoder: (_b = config === null || config === void 0 ? void 0 : config.base64Encoder) !== null && _b !== void 0 ? _b : toBase64, bodyLengthChecker: (_c = config === null || config === void 0 ? void 0 : config.bodyLengthChecker) !== null && _c !== void 0 ? _c : calculateBodyLength, defaultUserAgentProvider: (_d = config === null || config === void 0 ? void 0 : config.defaultUserAgentProvider) !== null && _d !== void 0 ? _d : defaultUserAgent({ serviceId: clientSharedValues.serviceId, clientVersion: package_default3.version }), maxAttempts: (_e = config === null || config === void 0 ? void 0 : config.maxAttempts) !== null && _e !== void 0 ? _e : loadConfig(NODE_MAX_ATTEMPT_CONFIG_OPTIONS), region: (_f = config === null || config === void 0 ? void 0 : config.region) !== null && _f !== void 0 ? _f : loadConfig(NODE_REGION_CONFIG_OPTIONS, NODE_REGION_CONFIG_FILE_OPTIONS), requestHandler: (_g = config === null || config === void 0 ? void 0 : config.requestHandler) !== null && _g !== void 0 ? _g : new NodeHttpHandler(), retryMode: (_h = config === null || config === void 0 ? void 0 : config.retryMode) !== null && _h !== void 0 ? _h : loadConfig(NODE_RETRY_MODE_CONFIG_OPTIONS), sha256: (_j = config === null || config === void 0 ? void 0 : config.sha256) !== null && _j !== void 0 ? _j : Hash.bind(null, "sha256"), streamCollector: (_k = config === null || config === void 0 ? void 0 : config.streamCollector) !== null && _k !== void 0 ? _k : streamCollector, useDualstackEndpoint: (_l = config === null || config === void 0 ? void 0 : config.useDualstackEndpoint) !== null && _l !== void 0 ? _l : loadConfig(NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS), useFipsEndpoint: (_m = config === null || config === void 0 ? void 0 : config.useFipsEndpoint) !== null && _m !== void 0 ? _m : loadConfig(NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS), utf8Decoder: (_o = config === null || config === void 0 ? void 0 : config.utf8Decoder) !== null && _o !== void 0 ? _o : fromUtf8, utf8Encoder: (_p = config === null || config === void 0 ? void 0 : config.utf8Encoder) !== null && _p !== void 0 ? _p : toUtf8 });
};

// node_modules/@aws-sdk/client-sso/dist-es/SSOClient.js
var SSOClient = function(_super) {
  __extends(SSOClient2, _super);
  function SSOClient2(configuration) {
    var _this = this;
    var _config_0 = getRuntimeConfig2(configuration);
    var _config_1 = resolveRegionConfig(_config_0);
    var _config_2 = resolveEndpointsConfig(_config_1);
    var _config_3 = resolveRetryConfig(_config_2);
    var _config_4 = resolveHostHeaderConfig(_config_3);
    var _config_5 = resolveUserAgentConfig(_config_4);
    _this = _super.call(this, _config_5) || this;
    _this.config = _config_5;
    _this.middlewareStack.use(getRetryPlugin(_this.config));
    _this.middlewareStack.use(getContentLengthPlugin(_this.config));
    _this.middlewareStack.use(getHostHeaderPlugin(_this.config));
    _this.middlewareStack.use(getLoggerPlugin(_this.config));
    _this.middlewareStack.use(getUserAgentPlugin(_this.config));
    return _this;
  }
  SSOClient2.prototype.destroy = function() {
    _super.prototype.destroy.call(this);
  };
  return SSOClient2;
}(Client);

// node_modules/@aws-sdk/util-credentials/dist-es/index.js
var ENV_PROFILE2 = "AWS_PROFILE";
var DEFAULT_PROFILE2 = "default";
var parseKnownFiles = function(init) {
  return __awaiter(void 0, void 0, void 0, function() {
    var _a, loadedConfig, parsedFiles;
    return __generator(this, function(_b) {
      switch (_b.label) {
        case 0:
          _a = init.loadedConfig, loadedConfig = _a === void 0 ? loadSharedConfigFiles(init) : _a;
          return [4, loadedConfig];
        case 1:
          parsedFiles = _b.sent();
          return [2, __assign(__assign({}, parsedFiles.configFile), parsedFiles.credentialsFile)];
      }
    });
  });
};
var getMasterProfileName = function(init) {
  return init.profile || process.env[ENV_PROFILE2] || DEFAULT_PROFILE2;
};

// node_modules/@aws-sdk/credential-provider-sso/dist-es/index.js
var import_crypto2 = __toModule(require("crypto"));
var import_fs3 = __toModule(require("fs"));
var import_path2 = __toModule(require("path"));
var EXPIRE_WINDOW_MS = 15 * 60 * 1e3;
var SHOULD_FAIL_CREDENTIAL_CHAIN = false;
var fromSSO = function(init) {
  if (init === void 0) {
    init = {};
  }
  return function() {
    return __awaiter(void 0, void 0, void 0, function() {
      var ssoStartUrl, ssoAccountId, ssoRegion, ssoRoleName, ssoClient, profiles, profileName, profile, _a, sso_start_url, sso_account_id, sso_region, sso_role_name;
      return __generator(this, function(_b) {
        switch (_b.label) {
          case 0:
            ssoStartUrl = init.ssoStartUrl, ssoAccountId = init.ssoAccountId, ssoRegion = init.ssoRegion, ssoRoleName = init.ssoRoleName, ssoClient = init.ssoClient;
            if (!(!ssoStartUrl && !ssoAccountId && !ssoRegion && !ssoRoleName))
              return [3, 2];
            return [4, parseKnownFiles(init)];
          case 1:
            profiles = _b.sent();
            profileName = getMasterProfileName(init);
            profile = profiles[profileName];
            if (!isSsoProfile(profile)) {
              throw new CredentialsProviderError("Profile " + profileName + " is not configured with SSO credentials.");
            }
            _a = validateSsoProfile(profile), sso_start_url = _a.sso_start_url, sso_account_id = _a.sso_account_id, sso_region = _a.sso_region, sso_role_name = _a.sso_role_name;
            return [2, resolveSSOCredentials({
              ssoStartUrl: sso_start_url,
              ssoAccountId: sso_account_id,
              ssoRegion: sso_region,
              ssoRoleName: sso_role_name,
              ssoClient
            })];
          case 2:
            if (!ssoStartUrl || !ssoAccountId || !ssoRegion || !ssoRoleName) {
              throw new CredentialsProviderError('Incomplete configuration. The fromSSO() argument hash must include "ssoStartUrl", "ssoAccountId", "ssoRegion", "ssoRoleName"');
            } else {
              return [2, resolveSSOCredentials({ ssoStartUrl, ssoAccountId, ssoRegion, ssoRoleName, ssoClient })];
            }
            _b.label = 3;
          case 3:
            return [2];
        }
      });
    });
  };
};
var resolveSSOCredentials = function(_a) {
  var ssoStartUrl = _a.ssoStartUrl, ssoAccountId = _a.ssoAccountId, ssoRegion = _a.ssoRegion, ssoRoleName = _a.ssoRoleName, ssoClient = _a.ssoClient;
  return __awaiter(void 0, void 0, void 0, function() {
    var hasher, cacheName, tokenFile, token, accessToken, sso, ssoResp, e_1, _b, _c, accessKeyId, secretAccessKey, sessionToken, expiration;
    return __generator(this, function(_d) {
      switch (_d.label) {
        case 0:
          hasher = (0, import_crypto2.createHash)("sha1");
          cacheName = hasher.update(ssoStartUrl).digest("hex");
          tokenFile = (0, import_path2.join)(getHomeDir(), ".aws", "sso", "cache", cacheName + ".json");
          try {
            token = JSON.parse((0, import_fs3.readFileSync)(tokenFile, { encoding: "utf-8" }));
            if (new Date(token.expiresAt).getTime() - Date.now() <= EXPIRE_WINDOW_MS) {
              throw new Error("SSO token is expired.");
            }
          } catch (e) {
            throw new CredentialsProviderError("The SSO session associated with this profile has expired or is otherwise invalid. To refresh this SSO session run aws sso login with the corresponding profile.", SHOULD_FAIL_CREDENTIAL_CHAIN);
          }
          accessToken = token.accessToken;
          sso = ssoClient || new SSOClient({ region: ssoRegion });
          _d.label = 1;
        case 1:
          _d.trys.push([1, 3, , 4]);
          return [4, sso.send(new GetRoleCredentialsCommand({
            accountId: ssoAccountId,
            roleName: ssoRoleName,
            accessToken
          }))];
        case 2:
          ssoResp = _d.sent();
          return [3, 4];
        case 3:
          e_1 = _d.sent();
          throw CredentialsProviderError.from(e_1, SHOULD_FAIL_CREDENTIAL_CHAIN);
        case 4:
          _b = ssoResp.roleCredentials, _c = _b === void 0 ? {} : _b, accessKeyId = _c.accessKeyId, secretAccessKey = _c.secretAccessKey, sessionToken = _c.sessionToken, expiration = _c.expiration;
          if (!accessKeyId || !secretAccessKey || !sessionToken || !expiration) {
            throw new CredentialsProviderError("SSO returns an invalid temporary credential.", SHOULD_FAIL_CREDENTIAL_CHAIN);
          }
          return [2, { accessKeyId, secretAccessKey, sessionToken, expiration: new Date(expiration) }];
      }
    });
  });
};
var validateSsoProfile = function(profile) {
  var sso_start_url = profile.sso_start_url, sso_account_id = profile.sso_account_id, sso_region = profile.sso_region, sso_role_name = profile.sso_role_name;
  if (!sso_start_url || !sso_account_id || !sso_region || !sso_role_name) {
    throw new CredentialsProviderError('Profile is configured with invalid SSO credentials. Required parameters "sso_account_id", "sso_region", ' + ('"sso_role_name", "sso_start_url". Got ' + Object.keys(profile).join(", ") + "\nReference: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-sso.html"), SHOULD_FAIL_CREDENTIAL_CHAIN);
  }
  return profile;
};
var isSsoProfile = function(arg) {
  return arg && (typeof arg.sso_start_url === "string" || typeof arg.sso_account_id === "string" || typeof arg.sso_region === "string" || typeof arg.sso_role_name === "string");
};

// node_modules/@aws-sdk/credential-provider-web-identity/dist-es/fromTokenFile.js
var import_fs4 = __toModule(require("fs"));

// node_modules/@aws-sdk/credential-provider-web-identity/dist-es/fromWebToken.js
var fromWebToken = function(init) {
  return function() {
    var roleArn = init.roleArn, roleSessionName = init.roleSessionName, webIdentityToken = init.webIdentityToken, providerId = init.providerId, policyArns = init.policyArns, policy = init.policy, durationSeconds = init.durationSeconds, roleAssumerWithWebIdentity = init.roleAssumerWithWebIdentity;
    if (!roleAssumerWithWebIdentity) {
      throw new CredentialsProviderError("Role Arn '" + roleArn + "' needs to be assumed with web identity, but no role assumption callback was provided.", false);
    }
    return roleAssumerWithWebIdentity({
      RoleArn: roleArn,
      RoleSessionName: roleSessionName !== null && roleSessionName !== void 0 ? roleSessionName : "aws-sdk-js-session-" + Date.now(),
      WebIdentityToken: webIdentityToken,
      ProviderId: providerId,
      PolicyArns: policyArns,
      Policy: policy,
      DurationSeconds: durationSeconds
    });
  };
};

// node_modules/@aws-sdk/credential-provider-web-identity/dist-es/fromTokenFile.js
var ENV_TOKEN_FILE = "AWS_WEB_IDENTITY_TOKEN_FILE";
var ENV_ROLE_ARN = "AWS_ROLE_ARN";
var ENV_ROLE_SESSION_NAME = "AWS_ROLE_SESSION_NAME";
var fromTokenFile = function(init) {
  if (init === void 0) {
    init = {};
  }
  return function() {
    return __awaiter(void 0, void 0, void 0, function() {
      return __generator(this, function(_a) {
        return [2, resolveTokenFile(init)];
      });
    });
  };
};
var resolveTokenFile = function(init) {
  var _a, _b, _c;
  var webIdentityTokenFile = (_a = init === null || init === void 0 ? void 0 : init.webIdentityTokenFile) !== null && _a !== void 0 ? _a : process.env[ENV_TOKEN_FILE];
  var roleArn = (_b = init === null || init === void 0 ? void 0 : init.roleArn) !== null && _b !== void 0 ? _b : process.env[ENV_ROLE_ARN];
  var roleSessionName = (_c = init === null || init === void 0 ? void 0 : init.roleSessionName) !== null && _c !== void 0 ? _c : process.env[ENV_ROLE_SESSION_NAME];
  if (!webIdentityTokenFile || !roleArn) {
    throw new CredentialsProviderError("Web identity configuration not specified");
  }
  return fromWebToken(__assign(__assign({}, init), { webIdentityToken: (0, import_fs4.readFileSync)(webIdentityTokenFile, { encoding: "ascii" }), roleArn, roleSessionName }))();
};

// node_modules/@aws-sdk/credential-provider-ini/dist-es/index.js
var isStaticCredsProfile = function(arg) {
  return Boolean(arg) && typeof arg === "object" && typeof arg.aws_access_key_id === "string" && typeof arg.aws_secret_access_key === "string" && ["undefined", "string"].indexOf(typeof arg.aws_session_token) > -1;
};
var isWebIdentityProfile = function(arg) {
  return Boolean(arg) && typeof arg === "object" && typeof arg.web_identity_token_file === "string" && typeof arg.role_arn === "string" && ["undefined", "string"].indexOf(typeof arg.role_session_name) > -1;
};
var isAssumeRoleProfile = function(arg) {
  return Boolean(arg) && typeof arg === "object" && typeof arg.role_arn === "string" && ["undefined", "string"].indexOf(typeof arg.role_session_name) > -1 && ["undefined", "string"].indexOf(typeof arg.external_id) > -1 && ["undefined", "string"].indexOf(typeof arg.mfa_serial) > -1;
};
var isAssumeRoleWithSourceProfile = function(arg) {
  return isAssumeRoleProfile(arg) && typeof arg.source_profile === "string" && typeof arg.credential_source === "undefined";
};
var isAssumeRoleWithProviderProfile = function(arg) {
  return isAssumeRoleProfile(arg) && typeof arg.credential_source === "string" && typeof arg.source_profile === "undefined";
};
var fromIni = function(init) {
  if (init === void 0) {
    init = {};
  }
  return function() {
    return __awaiter(void 0, void 0, void 0, function() {
      var profiles;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [4, parseKnownFiles(init)];
          case 1:
            profiles = _a.sent();
            return [2, resolveProfileData(getMasterProfileName(init), profiles, init)];
        }
      });
    });
  };
};
var resolveProfileData = function(profileName, profiles, options, visitedProfiles) {
  if (visitedProfiles === void 0) {
    visitedProfiles = {};
  }
  return __awaiter(void 0, void 0, void 0, function() {
    var data, ExternalId, mfa_serial, RoleArn, _a, RoleSessionName, source_profile, credential_source, sourceCreds, params, _b, _c, _d, _e, sso_start_url, sso_account_id, sso_region, sso_role_name;
    var _f;
    return __generator(this, function(_g) {
      switch (_g.label) {
        case 0:
          data = profiles[profileName];
          if (Object.keys(visitedProfiles).length > 0 && isStaticCredsProfile(data)) {
            return [2, resolveStaticCredentials(data)];
          }
          if (!(isAssumeRoleWithSourceProfile(data) || isAssumeRoleWithProviderProfile(data)))
            return [3, 4];
          ExternalId = data.external_id, mfa_serial = data.mfa_serial, RoleArn = data.role_arn, _a = data.role_session_name, RoleSessionName = _a === void 0 ? "aws-sdk-js-" + Date.now() : _a, source_profile = data.source_profile, credential_source = data.credential_source;
          if (!options.roleAssumer) {
            throw new CredentialsProviderError("Profile " + profileName + " requires a role to be assumed, but no role assumption callback was provided.", false);
          }
          if (source_profile && source_profile in visitedProfiles) {
            throw new CredentialsProviderError("Detected a cycle attempting to resolve credentials for profile" + (" " + getMasterProfileName(options) + ". Profiles visited: ") + Object.keys(visitedProfiles).join(", "), false);
          }
          sourceCreds = source_profile ? resolveProfileData(source_profile, profiles, options, __assign(__assign({}, visitedProfiles), (_f = {}, _f[source_profile] = true, _f))) : resolveCredentialSource(credential_source, profileName)();
          params = { RoleArn, RoleSessionName, ExternalId };
          if (!mfa_serial)
            return [3, 2];
          if (!options.mfaCodeProvider) {
            throw new CredentialsProviderError("Profile " + profileName + " requires multi-factor authentication, but no MFA code callback was provided.", false);
          }
          params.SerialNumber = mfa_serial;
          _b = params;
          return [4, options.mfaCodeProvider(mfa_serial)];
        case 1:
          _b.TokenCode = _g.sent();
          _g.label = 2;
        case 2:
          _d = (_c = options).roleAssumer;
          return [4, sourceCreds];
        case 3:
          return [2, _d.apply(_c, [_g.sent(), params])];
        case 4:
          if (isStaticCredsProfile(data)) {
            return [2, resolveStaticCredentials(data)];
          }
          if (isWebIdentityProfile(data)) {
            return [2, resolveWebIdentityCredentials(data, options)];
          }
          if (isSsoProfile(data)) {
            _e = validateSsoProfile(data), sso_start_url = _e.sso_start_url, sso_account_id = _e.sso_account_id, sso_region = _e.sso_region, sso_role_name = _e.sso_role_name;
            return [2, fromSSO({
              ssoStartUrl: sso_start_url,
              ssoAccountId: sso_account_id,
              ssoRegion: sso_region,
              ssoRoleName: sso_role_name
            })()];
          }
          throw new CredentialsProviderError("Profile " + profileName + " could not be found or parsed in shared credentials file.");
      }
    });
  });
};
var resolveCredentialSource = function(credentialSource, profileName) {
  var sourceProvidersMap = {
    EcsContainer: fromContainerMetadata,
    Ec2InstanceMetadata: fromInstanceMetadata,
    Environment: fromEnv
  };
  if (credentialSource in sourceProvidersMap) {
    return sourceProvidersMap[credentialSource]();
  } else {
    throw new CredentialsProviderError("Unsupported credential source in profile " + profileName + ". Got " + credentialSource + ", expected EcsContainer or Ec2InstanceMetadata or Environment.");
  }
};
var resolveStaticCredentials = function(profile) {
  return Promise.resolve({
    accessKeyId: profile.aws_access_key_id,
    secretAccessKey: profile.aws_secret_access_key,
    sessionToken: profile.aws_session_token
  });
};
var resolveWebIdentityCredentials = function(profile, options) {
  return __awaiter(void 0, void 0, void 0, function() {
    return __generator(this, function(_a) {
      return [2, fromTokenFile({
        webIdentityTokenFile: profile.web_identity_token_file,
        roleArn: profile.role_arn,
        roleSessionName: profile.role_session_name,
        roleAssumerWithWebIdentity: options.roleAssumerWithWebIdentity
      })()];
    });
  });
};

// node_modules/@aws-sdk/credential-provider-process/dist-es/index.js
var import_child_process = __toModule(require("child_process"));
var fromProcess = function(init) {
  if (init === void 0) {
    init = {};
  }
  return function() {
    return __awaiter(void 0, void 0, void 0, function() {
      var profiles;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [4, parseKnownFiles(init)];
          case 1:
            profiles = _a.sent();
            return [2, resolveProcessCredentials(getMasterProfileName(init), profiles)];
        }
      });
    });
  };
};
var resolveProcessCredentials = function(profileName, profiles) {
  return __awaiter(void 0, void 0, void 0, function() {
    var profile, credentialProcess;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          profile = profiles[profileName];
          if (!profiles[profileName])
            return [3, 4];
          credentialProcess = profile["credential_process"];
          if (!(credentialProcess !== void 0))
            return [3, 2];
          return [4, execPromise(credentialProcess).then(function(processResult) {
            var data;
            try {
              data = JSON.parse(processResult);
            } catch (_a2) {
              throw Error("Profile " + profileName + " credential_process returned invalid JSON.");
            }
            var version5 = data.Version, accessKeyId = data.AccessKeyId, secretAccessKey = data.SecretAccessKey, sessionToken = data.SessionToken, expiration = data.Expiration;
            if (version5 !== 1) {
              throw Error("Profile " + profileName + " credential_process did not return Version 1.");
            }
            if (accessKeyId === void 0 || secretAccessKey === void 0) {
              throw Error("Profile " + profileName + " credential_process returned invalid credentials.");
            }
            var expirationUnix;
            if (expiration) {
              var currentTime = new Date();
              var expireTime = new Date(expiration);
              if (expireTime < currentTime) {
                throw Error("Profile " + profileName + " credential_process returned expired credentials.");
              }
              expirationUnix = Math.floor(new Date(expiration).valueOf() / 1e3);
            }
            return {
              accessKeyId,
              secretAccessKey,
              sessionToken,
              expirationUnix
            };
          }).catch(function(error) {
            throw new CredentialsProviderError(error.message);
          })];
        case 1:
          return [2, _a.sent()];
        case 2:
          throw new CredentialsProviderError("Profile " + profileName + " did not contain credential_process.");
        case 3:
          return [3, 5];
        case 4:
          throw new CredentialsProviderError("Profile " + profileName + " could not be found in shared credentials file.");
        case 5:
          return [2];
      }
    });
  });
};
var execPromise = function(command) {
  return new Promise(function(resolve, reject) {
    (0, import_child_process.exec)(command, function(error, stdout) {
      if (error) {
        reject(error);
        return;
      }
      resolve(stdout.trim());
    });
  });
};

// node_modules/@aws-sdk/credential-provider-node/dist-es/index.js
var ENV_IMDS_DISABLED = "AWS_EC2_METADATA_DISABLED";
var defaultProvider = function(init) {
  if (init === void 0) {
    init = {};
  }
  var options = __assign({ profile: process.env[ENV_PROFILE2] }, init);
  if (!options.loadedConfig)
    options.loadedConfig = loadSharedConfigFiles(init);
  var providers = [
    fromSSO(options),
    fromIni(options),
    fromProcess(options),
    fromTokenFile(options),
    remoteProvider(options),
    function() {
      return __awaiter(void 0, void 0, void 0, function() {
        return __generator(this, function(_a) {
          throw new CredentialsProviderError("Could not load credentials from any providers", false);
        });
      });
    }
  ];
  if (!options.profile)
    providers.unshift(fromEnv());
  var providerChain = chain.apply(void 0, __spreadArray([], __read(providers)));
  return memoize(providerChain, function(credentials) {
    return credentials.expiration !== void 0 && credentials.expiration.getTime() - Date.now() < 3e5;
  }, function(credentials) {
    return credentials.expiration !== void 0;
  });
};
var remoteProvider = function(init) {
  if (process.env[ENV_CMDS_RELATIVE_URI] || process.env[ENV_CMDS_FULL_URI]) {
    return fromContainerMetadata(init);
  }
  if (process.env[ENV_IMDS_DISABLED]) {
    return function() {
      return Promise.reject(new CredentialsProviderError("EC2 Instance Metadata Service access disabled"));
    };
  }
  return fromInstanceMetadata(init);
};

// node_modules/@aws-sdk/client-sts/dist-es/endpoints.js
var regionHash2 = {
  "aws-global": {
    variants: [
      {
        hostname: "sts.amazonaws.com",
        tags: []
      }
    ],
    signingRegion: "us-east-1"
  },
  "us-east-1": {
    variants: [
      {
        hostname: "sts.us-east-1.amazonaws.com",
        tags: []
      },
      {
        hostname: "sts-fips.us-east-1.amazonaws.com",
        tags: ["fips"]
      }
    ]
  },
  "us-east-2": {
    variants: [
      {
        hostname: "sts.us-east-2.amazonaws.com",
        tags: []
      },
      {
        hostname: "sts-fips.us-east-2.amazonaws.com",
        tags: ["fips"]
      }
    ]
  },
  "us-gov-east-1": {
    variants: [
      {
        hostname: "sts.us-gov-east-1.amazonaws.com",
        tags: []
      },
      {
        hostname: "sts.us-gov-east-1.amazonaws.com",
        tags: ["fips"]
      }
    ]
  },
  "us-gov-west-1": {
    variants: [
      {
        hostname: "sts.us-gov-west-1.amazonaws.com",
        tags: []
      },
      {
        hostname: "sts.us-gov-west-1.amazonaws.com",
        tags: ["fips"]
      }
    ]
  },
  "us-west-1": {
    variants: [
      {
        hostname: "sts.us-west-1.amazonaws.com",
        tags: []
      },
      {
        hostname: "sts-fips.us-west-1.amazonaws.com",
        tags: ["fips"]
      }
    ]
  },
  "us-west-2": {
    variants: [
      {
        hostname: "sts.us-west-2.amazonaws.com",
        tags: []
      },
      {
        hostname: "sts-fips.us-west-2.amazonaws.com",
        tags: ["fips"]
      }
    ]
  }
};
var partitionHash2 = {
  aws: {
    regions: [
      "af-south-1",
      "ap-east-1",
      "ap-northeast-1",
      "ap-northeast-2",
      "ap-northeast-3",
      "ap-south-1",
      "ap-southeast-1",
      "ap-southeast-2",
      "aws-global",
      "ca-central-1",
      "eu-central-1",
      "eu-north-1",
      "eu-south-1",
      "eu-west-1",
      "eu-west-2",
      "eu-west-3",
      "me-south-1",
      "sa-east-1",
      "us-east-1",
      "us-east-1-fips",
      "us-east-2",
      "us-east-2-fips",
      "us-west-1",
      "us-west-1-fips",
      "us-west-2",
      "us-west-2-fips"
    ],
    regionRegex: "^(us|eu|ap|sa|ca|me|af)\\-\\w+\\-\\d+$",
    variants: [
      {
        hostname: "sts.{region}.amazonaws.com",
        tags: []
      },
      {
        hostname: "sts-fips.{region}.amazonaws.com",
        tags: ["fips"]
      },
      {
        hostname: "sts-fips.{region}.api.aws",
        tags: ["dualstack", "fips"]
      },
      {
        hostname: "sts.{region}.api.aws",
        tags: ["dualstack"]
      }
    ]
  },
  "aws-cn": {
    regions: ["cn-north-1", "cn-northwest-1"],
    regionRegex: "^cn\\-\\w+\\-\\d+$",
    variants: [
      {
        hostname: "sts.{region}.amazonaws.com.cn",
        tags: []
      },
      {
        hostname: "sts-fips.{region}.amazonaws.com.cn",
        tags: ["fips"]
      },
      {
        hostname: "sts-fips.{region}.api.amazonwebservices.com.cn",
        tags: ["dualstack", "fips"]
      },
      {
        hostname: "sts.{region}.api.amazonwebservices.com.cn",
        tags: ["dualstack"]
      }
    ]
  },
  "aws-iso": {
    regions: ["us-iso-east-1", "us-iso-west-1"],
    regionRegex: "^us\\-iso\\-\\w+\\-\\d+$",
    variants: [
      {
        hostname: "sts.{region}.c2s.ic.gov",
        tags: []
      },
      {
        hostname: "sts-fips.{region}.c2s.ic.gov",
        tags: ["fips"]
      }
    ]
  },
  "aws-iso-b": {
    regions: ["us-isob-east-1"],
    regionRegex: "^us\\-isob\\-\\w+\\-\\d+$",
    variants: [
      {
        hostname: "sts.{region}.sc2s.sgov.gov",
        tags: []
      },
      {
        hostname: "sts-fips.{region}.sc2s.sgov.gov",
        tags: ["fips"]
      }
    ]
  },
  "aws-us-gov": {
    regions: ["us-gov-east-1", "us-gov-east-1-fips", "us-gov-west-1", "us-gov-west-1-fips"],
    regionRegex: "^us\\-gov\\-\\w+\\-\\d+$",
    variants: [
      {
        hostname: "sts.{region}.amazonaws.com",
        tags: []
      },
      {
        hostname: "sts.{region}.amazonaws.com",
        tags: ["fips"]
      }
    ]
  }
};
var defaultRegionInfoProvider2 = function(region, options) {
  return __awaiter(void 0, void 0, void 0, function() {
    return __generator(this, function(_a) {
      return [2, getRegionInfo(region, __assign(__assign({}, options), { signingService: "sts", regionHash: regionHash2, partitionHash: partitionHash2 }))];
    });
  });
};

// node_modules/@aws-sdk/client-sts/dist-es/runtimeConfig.shared.js
var getRuntimeConfig3 = function(config) {
  var _a, _b, _c, _d, _e;
  return {
    apiVersion: "2011-06-15",
    disableHostPrefix: (_a = config === null || config === void 0 ? void 0 : config.disableHostPrefix) !== null && _a !== void 0 ? _a : false,
    logger: (_b = config === null || config === void 0 ? void 0 : config.logger) !== null && _b !== void 0 ? _b : {},
    regionInfoProvider: (_c = config === null || config === void 0 ? void 0 : config.regionInfoProvider) !== null && _c !== void 0 ? _c : defaultRegionInfoProvider2,
    serviceId: (_d = config === null || config === void 0 ? void 0 : config.serviceId) !== null && _d !== void 0 ? _d : "STS",
    urlParser: (_e = config === null || config === void 0 ? void 0 : config.urlParser) !== null && _e !== void 0 ? _e : parseUrl
  };
};

// node_modules/@aws-sdk/client-sts/dist-es/runtimeConfig.js
var getRuntimeConfig4 = function(config) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
  emitWarningIfUnsupportedVersion(process.version);
  var clientSharedValues = getRuntimeConfig3(config);
  return __assign(__assign(__assign({}, clientSharedValues), config), { runtime: "node", base64Decoder: (_a = config === null || config === void 0 ? void 0 : config.base64Decoder) !== null && _a !== void 0 ? _a : fromBase64, base64Encoder: (_b = config === null || config === void 0 ? void 0 : config.base64Encoder) !== null && _b !== void 0 ? _b : toBase64, bodyLengthChecker: (_c = config === null || config === void 0 ? void 0 : config.bodyLengthChecker) !== null && _c !== void 0 ? _c : calculateBodyLength, credentialDefaultProvider: (_d = config === null || config === void 0 ? void 0 : config.credentialDefaultProvider) !== null && _d !== void 0 ? _d : decorateDefaultCredentialProvider(defaultProvider), defaultUserAgentProvider: (_e = config === null || config === void 0 ? void 0 : config.defaultUserAgentProvider) !== null && _e !== void 0 ? _e : defaultUserAgent({ serviceId: clientSharedValues.serviceId, clientVersion: package_default2.version }), maxAttempts: (_f = config === null || config === void 0 ? void 0 : config.maxAttempts) !== null && _f !== void 0 ? _f : loadConfig(NODE_MAX_ATTEMPT_CONFIG_OPTIONS), region: (_g = config === null || config === void 0 ? void 0 : config.region) !== null && _g !== void 0 ? _g : loadConfig(NODE_REGION_CONFIG_OPTIONS, NODE_REGION_CONFIG_FILE_OPTIONS), requestHandler: (_h = config === null || config === void 0 ? void 0 : config.requestHandler) !== null && _h !== void 0 ? _h : new NodeHttpHandler(), retryMode: (_j = config === null || config === void 0 ? void 0 : config.retryMode) !== null && _j !== void 0 ? _j : loadConfig(NODE_RETRY_MODE_CONFIG_OPTIONS), sha256: (_k = config === null || config === void 0 ? void 0 : config.sha256) !== null && _k !== void 0 ? _k : Hash.bind(null, "sha256"), streamCollector: (_l = config === null || config === void 0 ? void 0 : config.streamCollector) !== null && _l !== void 0 ? _l : streamCollector, useDualstackEndpoint: (_m = config === null || config === void 0 ? void 0 : config.useDualstackEndpoint) !== null && _m !== void 0 ? _m : loadConfig(NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS), useFipsEndpoint: (_o = config === null || config === void 0 ? void 0 : config.useFipsEndpoint) !== null && _o !== void 0 ? _o : loadConfig(NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS), utf8Decoder: (_p = config === null || config === void 0 ? void 0 : config.utf8Decoder) !== null && _p !== void 0 ? _p : fromUtf8, utf8Encoder: (_q = config === null || config === void 0 ? void 0 : config.utf8Encoder) !== null && _q !== void 0 ? _q : toUtf8 });
};

// node_modules/@aws-sdk/client-sts/dist-es/STSClient.js
var STSClient = function(_super) {
  __extends(STSClient2, _super);
  function STSClient2(configuration) {
    var _this = this;
    var _config_0 = getRuntimeConfig4(configuration);
    var _config_1 = resolveRegionConfig(_config_0);
    var _config_2 = resolveEndpointsConfig(_config_1);
    var _config_3 = resolveRetryConfig(_config_2);
    var _config_4 = resolveHostHeaderConfig(_config_3);
    var _config_5 = resolveStsAuthConfig(_config_4, { stsClientCtor: STSClient2 });
    var _config_6 = resolveUserAgentConfig(_config_5);
    _this = _super.call(this, _config_6) || this;
    _this.config = _config_6;
    _this.middlewareStack.use(getRetryPlugin(_this.config));
    _this.middlewareStack.use(getContentLengthPlugin(_this.config));
    _this.middlewareStack.use(getHostHeaderPlugin(_this.config));
    _this.middlewareStack.use(getLoggerPlugin(_this.config));
    _this.middlewareStack.use(getUserAgentPlugin(_this.config));
    return _this;
  }
  STSClient2.prototype.destroy = function() {
    _super.prototype.destroy.call(this);
  };
  return STSClient2;
}(Client);

// node_modules/@aws-sdk/client-sts/dist-es/defaultRoleAssumers.js
var getDefaultRoleAssumer2 = function(stsOptions) {
  if (stsOptions === void 0) {
    stsOptions = {};
  }
  return getDefaultRoleAssumer(stsOptions, STSClient);
};
var getDefaultRoleAssumerWithWebIdentity2 = function(stsOptions) {
  if (stsOptions === void 0) {
    stsOptions = {};
  }
  return getDefaultRoleAssumerWithWebIdentity(stsOptions, STSClient);
};
var decorateDefaultCredentialProvider2 = function(provider) {
  return function(input) {
    return provider(__assign({ roleAssumer: getDefaultRoleAssumer2(input), roleAssumerWithWebIdentity: getDefaultRoleAssumerWithWebIdentity2(input) }, input));
  };
};

// node_modules/@aws-sdk/eventstream-marshaller/dist-es/EventStreamMarshaller.js
var import_crc322 = __toModule(require_build2());

// node_modules/@aws-sdk/eventstream-marshaller/dist-es/Int64.js
var Int64 = function() {
  function Int642(bytes) {
    this.bytes = bytes;
    if (bytes.byteLength !== 8) {
      throw new Error("Int64 buffers must be exactly 8 bytes");
    }
  }
  Int642.fromNumber = function(number) {
    if (number > 9223372036854776e3 || number < -9223372036854776e3) {
      throw new Error(number + " is too large (or, if negative, too small) to represent as an Int64");
    }
    var bytes = new Uint8Array(8);
    for (var i = 7, remaining = Math.abs(Math.round(number)); i > -1 && remaining > 0; i--, remaining /= 256) {
      bytes[i] = remaining;
    }
    if (number < 0) {
      negate(bytes);
    }
    return new Int642(bytes);
  };
  Int642.prototype.valueOf = function() {
    var bytes = this.bytes.slice(0);
    var negative = bytes[0] & 128;
    if (negative) {
      negate(bytes);
    }
    return parseInt(toHex(bytes), 16) * (negative ? -1 : 1);
  };
  Int642.prototype.toString = function() {
    return String(this.valueOf());
  };
  return Int642;
}();
function negate(bytes) {
  for (var i = 0; i < 8; i++) {
    bytes[i] ^= 255;
  }
  for (var i = 7; i > -1; i--) {
    bytes[i]++;
    if (bytes[i] !== 0)
      break;
  }
}

// node_modules/@aws-sdk/eventstream-marshaller/dist-es/HeaderMarshaller.js
var HeaderMarshaller = function() {
  function HeaderMarshaller2(toUtf85, fromUtf85) {
    this.toUtf8 = toUtf85;
    this.fromUtf8 = fromUtf85;
  }
  HeaderMarshaller2.prototype.format = function(headers) {
    var e_1, _a, e_2, _b;
    var chunks = [];
    try {
      for (var _c = __values2(Object.keys(headers)), _d = _c.next(); !_d.done; _d = _c.next()) {
        var headerName = _d.value;
        var bytes = this.fromUtf8(headerName);
        chunks.push(Uint8Array.from([bytes.byteLength]), bytes, this.formatHeaderValue(headers[headerName]));
      }
    } catch (e_1_1) {
      e_1 = { error: e_1_1 };
    } finally {
      try {
        if (_d && !_d.done && (_a = _c.return))
          _a.call(_c);
      } finally {
        if (e_1)
          throw e_1.error;
      }
    }
    var out = new Uint8Array(chunks.reduce(function(carry, bytes2) {
      return carry + bytes2.byteLength;
    }, 0));
    var position = 0;
    try {
      for (var chunks_1 = __values2(chunks), chunks_1_1 = chunks_1.next(); !chunks_1_1.done; chunks_1_1 = chunks_1.next()) {
        var chunk = chunks_1_1.value;
        out.set(chunk, position);
        position += chunk.byteLength;
      }
    } catch (e_2_1) {
      e_2 = { error: e_2_1 };
    } finally {
      try {
        if (chunks_1_1 && !chunks_1_1.done && (_b = chunks_1.return))
          _b.call(chunks_1);
      } finally {
        if (e_2)
          throw e_2.error;
      }
    }
    return out;
  };
  HeaderMarshaller2.prototype.formatHeaderValue = function(header) {
    switch (header.type) {
      case "boolean":
        return Uint8Array.from([header.value ? 0 : 1]);
      case "byte":
        return Uint8Array.from([2, header.value]);
      case "short":
        var shortView = new DataView(new ArrayBuffer(3));
        shortView.setUint8(0, 3);
        shortView.setInt16(1, header.value, false);
        return new Uint8Array(shortView.buffer);
      case "integer":
        var intView = new DataView(new ArrayBuffer(5));
        intView.setUint8(0, 4);
        intView.setInt32(1, header.value, false);
        return new Uint8Array(intView.buffer);
      case "long":
        var longBytes = new Uint8Array(9);
        longBytes[0] = 5;
        longBytes.set(header.value.bytes, 1);
        return longBytes;
      case "binary":
        var binView = new DataView(new ArrayBuffer(3 + header.value.byteLength));
        binView.setUint8(0, 6);
        binView.setUint16(1, header.value.byteLength, false);
        var binBytes = new Uint8Array(binView.buffer);
        binBytes.set(header.value, 3);
        return binBytes;
      case "string":
        var utf8Bytes = this.fromUtf8(header.value);
        var strView = new DataView(new ArrayBuffer(3 + utf8Bytes.byteLength));
        strView.setUint8(0, 7);
        strView.setUint16(1, utf8Bytes.byteLength, false);
        var strBytes = new Uint8Array(strView.buffer);
        strBytes.set(utf8Bytes, 3);
        return strBytes;
      case "timestamp":
        var tsBytes = new Uint8Array(9);
        tsBytes[0] = 8;
        tsBytes.set(Int64.fromNumber(header.value.valueOf()).bytes, 1);
        return tsBytes;
      case "uuid":
        if (!UUID_PATTERN.test(header.value)) {
          throw new Error("Invalid UUID received: " + header.value);
        }
        var uuidBytes = new Uint8Array(17);
        uuidBytes[0] = 9;
        uuidBytes.set(fromHex(header.value.replace(/\-/g, "")), 1);
        return uuidBytes;
    }
  };
  HeaderMarshaller2.prototype.parse = function(headers) {
    var out = {};
    var position = 0;
    while (position < headers.byteLength) {
      var nameLength = headers.getUint8(position++);
      var name4 = this.toUtf8(new Uint8Array(headers.buffer, headers.byteOffset + position, nameLength));
      position += nameLength;
      switch (headers.getUint8(position++)) {
        case 0:
          out[name4] = {
            type: BOOLEAN_TAG,
            value: true
          };
          break;
        case 1:
          out[name4] = {
            type: BOOLEAN_TAG,
            value: false
          };
          break;
        case 2:
          out[name4] = {
            type: BYTE_TAG,
            value: headers.getInt8(position++)
          };
          break;
        case 3:
          out[name4] = {
            type: SHORT_TAG,
            value: headers.getInt16(position, false)
          };
          position += 2;
          break;
        case 4:
          out[name4] = {
            type: INT_TAG,
            value: headers.getInt32(position, false)
          };
          position += 4;
          break;
        case 5:
          out[name4] = {
            type: LONG_TAG,
            value: new Int64(new Uint8Array(headers.buffer, headers.byteOffset + position, 8))
          };
          position += 8;
          break;
        case 6:
          var binaryLength = headers.getUint16(position, false);
          position += 2;
          out[name4] = {
            type: BINARY_TAG,
            value: new Uint8Array(headers.buffer, headers.byteOffset + position, binaryLength)
          };
          position += binaryLength;
          break;
        case 7:
          var stringLength = headers.getUint16(position, false);
          position += 2;
          out[name4] = {
            type: STRING_TAG,
            value: this.toUtf8(new Uint8Array(headers.buffer, headers.byteOffset + position, stringLength))
          };
          position += stringLength;
          break;
        case 8:
          out[name4] = {
            type: TIMESTAMP_TAG,
            value: new Date(new Int64(new Uint8Array(headers.buffer, headers.byteOffset + position, 8)).valueOf())
          };
          position += 8;
          break;
        case 9:
          var uuidBytes = new Uint8Array(headers.buffer, headers.byteOffset + position, 16);
          position += 16;
          out[name4] = {
            type: UUID_TAG,
            value: toHex(uuidBytes.subarray(0, 4)) + "-" + toHex(uuidBytes.subarray(4, 6)) + "-" + toHex(uuidBytes.subarray(6, 8)) + "-" + toHex(uuidBytes.subarray(8, 10)) + "-" + toHex(uuidBytes.subarray(10))
          };
          break;
        default:
          throw new Error("Unrecognized header type tag");
      }
    }
    return out;
  };
  return HeaderMarshaller2;
}();
var HEADER_VALUE_TYPE;
(function(HEADER_VALUE_TYPE2) {
  HEADER_VALUE_TYPE2[HEADER_VALUE_TYPE2["boolTrue"] = 0] = "boolTrue";
  HEADER_VALUE_TYPE2[HEADER_VALUE_TYPE2["boolFalse"] = 1] = "boolFalse";
  HEADER_VALUE_TYPE2[HEADER_VALUE_TYPE2["byte"] = 2] = "byte";
  HEADER_VALUE_TYPE2[HEADER_VALUE_TYPE2["short"] = 3] = "short";
  HEADER_VALUE_TYPE2[HEADER_VALUE_TYPE2["integer"] = 4] = "integer";
  HEADER_VALUE_TYPE2[HEADER_VALUE_TYPE2["long"] = 5] = "long";
  HEADER_VALUE_TYPE2[HEADER_VALUE_TYPE2["byteArray"] = 6] = "byteArray";
  HEADER_VALUE_TYPE2[HEADER_VALUE_TYPE2["string"] = 7] = "string";
  HEADER_VALUE_TYPE2[HEADER_VALUE_TYPE2["timestamp"] = 8] = "timestamp";
  HEADER_VALUE_TYPE2[HEADER_VALUE_TYPE2["uuid"] = 9] = "uuid";
})(HEADER_VALUE_TYPE || (HEADER_VALUE_TYPE = {}));
var BOOLEAN_TAG = "boolean";
var BYTE_TAG = "byte";
var SHORT_TAG = "short";
var INT_TAG = "integer";
var LONG_TAG = "long";
var BINARY_TAG = "binary";
var STRING_TAG = "string";
var TIMESTAMP_TAG = "timestamp";
var UUID_TAG = "uuid";
var UUID_PATTERN = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;

// node_modules/@aws-sdk/eventstream-marshaller/dist-es/splitMessage.js
var import_crc32 = __toModule(require_build2());
var PRELUDE_MEMBER_LENGTH = 4;
var PRELUDE_LENGTH = PRELUDE_MEMBER_LENGTH * 2;
var CHECKSUM_LENGTH = 4;
var MINIMUM_MESSAGE_LENGTH = PRELUDE_LENGTH + CHECKSUM_LENGTH * 2;
function splitMessage(_a) {
  var byteLength = _a.byteLength, byteOffset = _a.byteOffset, buffer = _a.buffer;
  if (byteLength < MINIMUM_MESSAGE_LENGTH) {
    throw new Error("Provided message too short to accommodate event stream message overhead");
  }
  var view = new DataView(buffer, byteOffset, byteLength);
  var messageLength = view.getUint32(0, false);
  if (byteLength !== messageLength) {
    throw new Error("Reported message length does not match received message length");
  }
  var headerLength = view.getUint32(PRELUDE_MEMBER_LENGTH, false);
  var expectedPreludeChecksum = view.getUint32(PRELUDE_LENGTH, false);
  var expectedMessageChecksum = view.getUint32(byteLength - CHECKSUM_LENGTH, false);
  var checksummer = new import_crc32.Crc32().update(new Uint8Array(buffer, byteOffset, PRELUDE_LENGTH));
  if (expectedPreludeChecksum !== checksummer.digest()) {
    throw new Error("The prelude checksum specified in the message (" + expectedPreludeChecksum + ") does not match the calculated CRC32 checksum (" + checksummer.digest() + ")");
  }
  checksummer.update(new Uint8Array(buffer, byteOffset + PRELUDE_LENGTH, byteLength - (PRELUDE_LENGTH + CHECKSUM_LENGTH)));
  if (expectedMessageChecksum !== checksummer.digest()) {
    throw new Error("The message checksum (" + checksummer.digest() + ") did not match the expected value of " + expectedMessageChecksum);
  }
  return {
    headers: new DataView(buffer, byteOffset + PRELUDE_LENGTH + CHECKSUM_LENGTH, headerLength),
    body: new Uint8Array(buffer, byteOffset + PRELUDE_LENGTH + CHECKSUM_LENGTH + headerLength, messageLength - headerLength - (PRELUDE_LENGTH + CHECKSUM_LENGTH + CHECKSUM_LENGTH))
  };
}

// node_modules/@aws-sdk/eventstream-marshaller/dist-es/EventStreamMarshaller.js
var EventStreamMarshaller = function() {
  function EventStreamMarshaller4(toUtf85, fromUtf85) {
    this.headerMarshaller = new HeaderMarshaller(toUtf85, fromUtf85);
  }
  EventStreamMarshaller4.prototype.marshall = function(_a) {
    var rawHeaders = _a.headers, body = _a.body;
    var headers = this.headerMarshaller.format(rawHeaders);
    var length = headers.byteLength + body.byteLength + 16;
    var out = new Uint8Array(length);
    var view = new DataView(out.buffer, out.byteOffset, out.byteLength);
    var checksum = new import_crc322.Crc32();
    view.setUint32(0, length, false);
    view.setUint32(4, headers.byteLength, false);
    view.setUint32(8, checksum.update(out.subarray(0, 8)).digest(), false);
    out.set(headers, 12);
    out.set(body, headers.byteLength + 12);
    view.setUint32(length - 4, checksum.update(out.subarray(8, length - 4)).digest(), false);
    return out;
  };
  EventStreamMarshaller4.prototype.unmarshall = function(message) {
    var _a = splitMessage(message), headers = _a.headers, body = _a.body;
    return { headers: this.headerMarshaller.parse(headers), body };
  };
  EventStreamMarshaller4.prototype.formatHeaders = function(rawHeaders) {
    return this.headerMarshaller.format(rawHeaders);
  };
  return EventStreamMarshaller4;
}();

// node_modules/@aws-sdk/eventstream-serde-universal/dist-es/getChunkedStream.js
function getChunkedStream(source) {
  var _a;
  var currentMessageTotalLength = 0;
  var currentMessagePendingLength = 0;
  var currentMessage = null;
  var messageLengthBuffer = null;
  var allocateMessage = function(size) {
    if (typeof size !== "number") {
      throw new Error("Attempted to allocate an event message where size was not a number: " + size);
    }
    currentMessageTotalLength = size;
    currentMessagePendingLength = 4;
    currentMessage = new Uint8Array(size);
    var currentMessageView = new DataView(currentMessage.buffer);
    currentMessageView.setUint32(0, size, false);
  };
  var iterator = function() {
    return __asyncGenerator(this, arguments, function() {
      var sourceIterator, _a2, value, done, chunkLength, currentOffset, bytesRemaining, numBytesForTotal, numBytesToWrite;
      return __generator(this, function(_b) {
        switch (_b.label) {
          case 0:
            sourceIterator = source[Symbol.asyncIterator]();
            _b.label = 1;
          case 1:
            if (false)
              return [3, 16];
            return [4, __await(sourceIterator.next())];
          case 2:
            _a2 = _b.sent(), value = _a2.value, done = _a2.done;
            if (!done)
              return [3, 10];
            if (!!currentMessageTotalLength)
              return [3, 4];
            return [4, __await(void 0)];
          case 3:
            return [2, _b.sent()];
          case 4:
            if (!(currentMessageTotalLength === currentMessagePendingLength))
              return [3, 7];
            return [4, __await(currentMessage)];
          case 5:
            return [4, _b.sent()];
          case 6:
            _b.sent();
            return [3, 8];
          case 7:
            throw new Error("Truncated event message received.");
          case 8:
            return [4, __await(void 0)];
          case 9:
            return [2, _b.sent()];
          case 10:
            chunkLength = value.length;
            currentOffset = 0;
            _b.label = 11;
          case 11:
            if (!(currentOffset < chunkLength))
              return [3, 15];
            if (!currentMessage) {
              bytesRemaining = chunkLength - currentOffset;
              if (!messageLengthBuffer) {
                messageLengthBuffer = new Uint8Array(4);
              }
              numBytesForTotal = Math.min(4 - currentMessagePendingLength, bytesRemaining);
              messageLengthBuffer.set(value.slice(currentOffset, currentOffset + numBytesForTotal), currentMessagePendingLength);
              currentMessagePendingLength += numBytesForTotal;
              currentOffset += numBytesForTotal;
              if (currentMessagePendingLength < 4) {
                return [3, 15];
              }
              allocateMessage(new DataView(messageLengthBuffer.buffer).getUint32(0, false));
              messageLengthBuffer = null;
            }
            numBytesToWrite = Math.min(currentMessageTotalLength - currentMessagePendingLength, chunkLength - currentOffset);
            currentMessage.set(value.slice(currentOffset, currentOffset + numBytesToWrite), currentMessagePendingLength);
            currentMessagePendingLength += numBytesToWrite;
            currentOffset += numBytesToWrite;
            if (!(currentMessageTotalLength && currentMessageTotalLength === currentMessagePendingLength))
              return [3, 14];
            return [4, __await(currentMessage)];
          case 12:
            return [4, _b.sent()];
          case 13:
            _b.sent();
            currentMessage = null;
            currentMessageTotalLength = 0;
            currentMessagePendingLength = 0;
            _b.label = 14;
          case 14:
            return [3, 11];
          case 15:
            return [3, 1];
          case 16:
            return [2];
        }
      });
    });
  };
  return _a = {}, _a[Symbol.asyncIterator] = iterator, _a;
}

// node_modules/@aws-sdk/eventstream-serde-universal/dist-es/getUnmarshalledStream.js
function getUnmarshalledStream(source, options) {
  var _a;
  return _a = {}, _a[Symbol.asyncIterator] = function() {
    return __asyncGenerator(this, arguments, function() {
      var source_1, source_1_1, chunk, message, messageType, unmodeledError, code, exception, deserializedException, error, event, deserialized, e_1_1;
      var _a2, _b;
      var e_1, _c;
      return __generator(this, function(_d) {
        switch (_d.label) {
          case 0:
            _d.trys.push([0, 12, 13, 18]);
            source_1 = __asyncValues(source);
            _d.label = 1;
          case 1:
            return [4, __await(source_1.next())];
          case 2:
            if (!(source_1_1 = _d.sent(), !source_1_1.done))
              return [3, 11];
            chunk = source_1_1.value;
            message = options.eventMarshaller.unmarshall(chunk);
            messageType = message.headers[":message-type"].value;
            if (!(messageType === "error"))
              return [3, 3];
            unmodeledError = new Error(message.headers[":error-message"].value || "UnknownError");
            unmodeledError.name = message.headers[":error-code"].value;
            throw unmodeledError;
          case 3:
            if (!(messageType === "exception"))
              return [3, 5];
            code = message.headers[":exception-type"].value;
            exception = (_a2 = {}, _a2[code] = message, _a2);
            return [4, __await(options.deserializer(exception))];
          case 4:
            deserializedException = _d.sent();
            if (deserializedException.$unknown) {
              error = new Error(options.toUtf8(message.body));
              error.name = code;
              throw error;
            }
            throw deserializedException[code];
          case 5:
            if (!(messageType === "event"))
              return [3, 9];
            event = (_b = {}, _b[message.headers[":event-type"].value] = message, _b);
            return [4, __await(options.deserializer(event))];
          case 6:
            deserialized = _d.sent();
            if (deserialized.$unknown)
              return [3, 10];
            return [4, __await(deserialized)];
          case 7:
            return [4, _d.sent()];
          case 8:
            _d.sent();
            return [3, 10];
          case 9:
            throw Error("Unrecognizable event type: " + message.headers[":event-type"].value);
          case 10:
            return [3, 1];
          case 11:
            return [3, 18];
          case 12:
            e_1_1 = _d.sent();
            e_1 = { error: e_1_1 };
            return [3, 18];
          case 13:
            _d.trys.push([13, , 16, 17]);
            if (!(source_1_1 && !source_1_1.done && (_c = source_1.return)))
              return [3, 15];
            return [4, __await(_c.call(source_1))];
          case 14:
            _d.sent();
            _d.label = 15;
          case 15:
            return [3, 17];
          case 16:
            if (e_1)
              throw e_1.error;
            return [7];
          case 17:
            return [7];
          case 18:
            return [2];
        }
      });
    });
  }, _a;
}

// node_modules/@aws-sdk/eventstream-serde-universal/dist-es/EventStreamMarshaller.js
var EventStreamMarshaller2 = function() {
  function EventStreamMarshaller4(_a) {
    var utf8Encoder = _a.utf8Encoder, utf8Decoder = _a.utf8Decoder;
    this.eventMarshaller = new EventStreamMarshaller(utf8Encoder, utf8Decoder);
    this.utfEncoder = utf8Encoder;
  }
  EventStreamMarshaller4.prototype.deserialize = function(body, deserializer) {
    var chunkedStream = getChunkedStream(body);
    var unmarshalledStream = getUnmarshalledStream(chunkedStream, {
      eventMarshaller: this.eventMarshaller,
      deserializer,
      toUtf8: this.utfEncoder
    });
    return unmarshalledStream;
  };
  EventStreamMarshaller4.prototype.serialize = function(input, serializer) {
    var _a;
    var self2 = this;
    var serializedIterator = function() {
      return __asyncGenerator(this, arguments, function() {
        var input_1, input_1_1, chunk, payloadBuf, e_1_1;
        var e_1, _a2;
        return __generator(this, function(_b) {
          switch (_b.label) {
            case 0:
              _b.trys.push([0, 7, 8, 13]);
              input_1 = __asyncValues(input);
              _b.label = 1;
            case 1:
              return [4, __await(input_1.next())];
            case 2:
              if (!(input_1_1 = _b.sent(), !input_1_1.done))
                return [3, 6];
              chunk = input_1_1.value;
              payloadBuf = self2.eventMarshaller.marshall(serializer(chunk));
              return [4, __await(payloadBuf)];
            case 3:
              return [4, _b.sent()];
            case 4:
              _b.sent();
              _b.label = 5;
            case 5:
              return [3, 1];
            case 6:
              return [3, 13];
            case 7:
              e_1_1 = _b.sent();
              e_1 = { error: e_1_1 };
              return [3, 13];
            case 8:
              _b.trys.push([8, , 11, 12]);
              if (!(input_1_1 && !input_1_1.done && (_a2 = input_1.return)))
                return [3, 10];
              return [4, __await(_a2.call(input_1))];
            case 9:
              _b.sent();
              _b.label = 10;
            case 10:
              return [3, 12];
            case 11:
              if (e_1)
                throw e_1.error;
              return [7];
            case 12:
              return [7];
            case 13:
              return [4, __await(new Uint8Array(0))];
            case 14:
              return [4, _b.sent()];
            case 15:
              _b.sent();
              return [2];
          }
        });
      });
    };
    return _a = {}, _a[Symbol.asyncIterator] = serializedIterator, _a;
  };
  return EventStreamMarshaller4;
}();

// node_modules/@aws-sdk/eventstream-serde-node/dist-es/EventStreamMarshaller.js
var import_stream3 = __toModule(require("stream"));

// node_modules/@aws-sdk/eventstream-serde-node/dist-es/utils.js
function readabletoIterable(readStream) {
  return __asyncGenerator(this, arguments, function readabletoIterable_1() {
    var streamEnded, generationEnded, records, value;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          streamEnded = false;
          generationEnded = false;
          records = new Array();
          readStream.on("error", function(err) {
            if (!streamEnded) {
              streamEnded = true;
            }
            if (err) {
              throw err;
            }
          });
          readStream.on("data", function(data) {
            records.push(data);
          });
          readStream.on("end", function() {
            streamEnded = true;
          });
          _a.label = 1;
        case 1:
          if (!!generationEnded)
            return [3, 6];
          return [4, __await(new Promise(function(resolve) {
            return setTimeout(function() {
              return resolve(records.shift());
            }, 0);
          }))];
        case 2:
          value = _a.sent();
          if (!value)
            return [3, 5];
          return [4, __await(value)];
        case 3:
          return [4, _a.sent()];
        case 4:
          _a.sent();
          _a.label = 5;
        case 5:
          generationEnded = streamEnded && records.length === 0;
          return [3, 1];
        case 6:
          return [2];
      }
    });
  });
}

// node_modules/@aws-sdk/eventstream-serde-node/dist-es/EventStreamMarshaller.js
var EventStreamMarshaller3 = function() {
  function EventStreamMarshaller4(_a) {
    var utf8Encoder = _a.utf8Encoder, utf8Decoder = _a.utf8Decoder;
    this.eventMarshaller = new EventStreamMarshaller(utf8Encoder, utf8Decoder);
    this.universalMarshaller = new EventStreamMarshaller2({
      utf8Decoder,
      utf8Encoder
    });
  }
  EventStreamMarshaller4.prototype.deserialize = function(body, deserializer) {
    var bodyIterable = typeof body[Symbol.asyncIterator] === "function" ? body : readabletoIterable(body);
    return this.universalMarshaller.deserialize(bodyIterable, deserializer);
  };
  EventStreamMarshaller4.prototype.serialize = function(input, serializer) {
    var serializedIterable = this.universalMarshaller.serialize(input, serializer);
    if (typeof import_stream3.Readable.from === "function") {
      return import_stream3.Readable.from(serializedIterable);
    } else {
      var iterator_1 = serializedIterable[Symbol.asyncIterator]();
      var serializedStream_1 = new import_stream3.Readable({
        autoDestroy: true,
        objectMode: true,
        read: function() {
          return __awaiter(this, void 0, void 0, function() {
            var _this = this;
            return __generator(this, function(_a) {
              iterator_1.next().then(function(_a2) {
                var done = _a2.done, value = _a2.value;
                if (done) {
                  _this.push(null);
                } else {
                  _this.push(value);
                }
              }).catch(function(err) {
                _this.destroy(err);
              });
              return [2];
            });
          });
        }
      });
      serializedStream_1.on("error", function() {
        serializedStream_1.destroy();
      });
      serializedStream_1.on("end", function() {
        serializedStream_1.destroy();
      });
      return serializedStream_1;
    }
  };
  return EventStreamMarshaller4;
}();

// node_modules/@aws-sdk/eventstream-serde-node/dist-es/provider.js
var eventStreamSerdeProvider = function(options) {
  return new EventStreamMarshaller3(options);
};

// node_modules/@aws-sdk/hash-stream-node/dist-es/index.js
var import_fs5 = __toModule(require("fs"));

// node_modules/@aws-sdk/hash-stream-node/dist-es/hash-calculator.js
var import_stream4 = __toModule(require("stream"));
var HashCalculator = function(_super) {
  __extends(HashCalculator2, _super);
  function HashCalculator2(hash, options) {
    var _this = _super.call(this, options) || this;
    _this.hash = hash;
    return _this;
  }
  HashCalculator2.prototype._write = function(chunk, encoding, callback) {
    try {
      this.hash.update(chunk);
    } catch (err) {
      return callback(err);
    }
    callback();
  };
  return HashCalculator2;
}(import_stream4.Writable);

// node_modules/@aws-sdk/hash-stream-node/dist-es/index.js
var fileStreamHasher = function fileStreamHasher2(hashCtor, fileStream) {
  return new Promise(function(resolve, reject) {
    if (!isReadStream(fileStream)) {
      reject(new Error("Unable to calculate hash for non-file streams."));
      return;
    }
    var fileStreamTee = (0, import_fs5.createReadStream)(fileStream.path, {
      start: fileStream.start,
      end: fileStream.end
    });
    var hash = new hashCtor();
    var hashCalculator = new HashCalculator(hash);
    fileStreamTee.pipe(hashCalculator);
    fileStreamTee.on("error", function(err) {
      hashCalculator.end();
      reject(err);
    });
    hashCalculator.on("error", reject);
    hashCalculator.on("finish", function() {
      hash.digest().then(resolve).catch(reject);
    });
  });
};
function isReadStream(stream) {
  return typeof stream.path === "string";
}

// node_modules/@aws-sdk/client-s3/dist-es/endpoints.js
var regionHash3 = {
  "af-south-1": {
    variants: [
      {
        hostname: "s3.af-south-1.amazonaws.com",
        tags: []
      },
      {
        hostname: "s3.dualstack.af-south-1.amazonaws.com",
        tags: ["dualstack"]
      }
    ]
  },
  "ap-east-1": {
    variants: [
      {
        hostname: "s3.ap-east-1.amazonaws.com",
        tags: []
      },
      {
        hostname: "s3.dualstack.ap-east-1.amazonaws.com",
        tags: ["dualstack"]
      }
    ]
  },
  "ap-northeast-1": {
    variants: [
      {
        hostname: "s3.ap-northeast-1.amazonaws.com",
        tags: []
      },
      {
        hostname: "s3.dualstack.ap-northeast-1.amazonaws.com",
        tags: ["dualstack"]
      }
    ]
  },
  "ap-northeast-2": {
    variants: [
      {
        hostname: "s3.ap-northeast-2.amazonaws.com",
        tags: []
      },
      {
        hostname: "s3.dualstack.ap-northeast-2.amazonaws.com",
        tags: ["dualstack"]
      }
    ]
  },
  "ap-northeast-3": {
    variants: [
      {
        hostname: "s3.ap-northeast-3.amazonaws.com",
        tags: []
      },
      {
        hostname: "s3.dualstack.ap-northeast-3.amazonaws.com",
        tags: ["dualstack"]
      }
    ]
  },
  "ap-south-1": {
    variants: [
      {
        hostname: "s3.ap-south-1.amazonaws.com",
        tags: []
      },
      {
        hostname: "s3.dualstack.ap-south-1.amazonaws.com",
        tags: ["dualstack"]
      }
    ]
  },
  "ap-southeast-1": {
    variants: [
      {
        hostname: "s3.ap-southeast-1.amazonaws.com",
        tags: []
      },
      {
        hostname: "s3.dualstack.ap-southeast-1.amazonaws.com",
        tags: ["dualstack"]
      }
    ]
  },
  "ap-southeast-2": {
    variants: [
      {
        hostname: "s3.ap-southeast-2.amazonaws.com",
        tags: []
      },
      {
        hostname: "s3.dualstack.ap-southeast-2.amazonaws.com",
        tags: ["dualstack"]
      }
    ]
  },
  "aws-global": {
    variants: [
      {
        hostname: "s3.amazonaws.com",
        tags: []
      }
    ],
    signingRegion: "us-east-1"
  },
  "ca-central-1": {
    variants: [
      {
        hostname: "s3.ca-central-1.amazonaws.com",
        tags: []
      },
      {
        hostname: "s3-fips.ca-central-1.amazonaws.com",
        tags: ["fips"]
      },
      {
        hostname: "s3-fips.dualstack.ca-central-1.amazonaws.com",
        tags: ["dualstack", "fips"]
      },
      {
        hostname: "s3.dualstack.ca-central-1.amazonaws.com",
        tags: ["dualstack"]
      }
    ]
  },
  "cn-north-1": {
    variants: [
      {
        hostname: "s3.cn-north-1.amazonaws.com.cn",
        tags: []
      },
      {
        hostname: "s3.dualstack.cn-north-1.amazonaws.com.cn",
        tags: ["dualstack"]
      }
    ]
  },
  "cn-northwest-1": {
    variants: [
      {
        hostname: "s3.cn-northwest-1.amazonaws.com.cn",
        tags: []
      },
      {
        hostname: "s3.dualstack.cn-northwest-1.amazonaws.com.cn",
        tags: ["dualstack"]
      }
    ]
  },
  "eu-central-1": {
    variants: [
      {
        hostname: "s3.eu-central-1.amazonaws.com",
        tags: []
      },
      {
        hostname: "s3.dualstack.eu-central-1.amazonaws.com",
        tags: ["dualstack"]
      }
    ]
  },
  "eu-north-1": {
    variants: [
      {
        hostname: "s3.eu-north-1.amazonaws.com",
        tags: []
      },
      {
        hostname: "s3.dualstack.eu-north-1.amazonaws.com",
        tags: ["dualstack"]
      }
    ]
  },
  "eu-south-1": {
    variants: [
      {
        hostname: "s3.eu-south-1.amazonaws.com",
        tags: []
      },
      {
        hostname: "s3.dualstack.eu-south-1.amazonaws.com",
        tags: ["dualstack"]
      }
    ]
  },
  "eu-west-1": {
    variants: [
      {
        hostname: "s3.eu-west-1.amazonaws.com",
        tags: []
      },
      {
        hostname: "s3.dualstack.eu-west-1.amazonaws.com",
        tags: ["dualstack"]
      }
    ]
  },
  "eu-west-2": {
    variants: [
      {
        hostname: "s3.eu-west-2.amazonaws.com",
        tags: []
      },
      {
        hostname: "s3.dualstack.eu-west-2.amazonaws.com",
        tags: ["dualstack"]
      }
    ]
  },
  "eu-west-3": {
    variants: [
      {
        hostname: "s3.eu-west-3.amazonaws.com",
        tags: []
      },
      {
        hostname: "s3.dualstack.eu-west-3.amazonaws.com",
        tags: ["dualstack"]
      }
    ]
  },
  "me-south-1": {
    variants: [
      {
        hostname: "s3.me-south-1.amazonaws.com",
        tags: []
      },
      {
        hostname: "s3.dualstack.me-south-1.amazonaws.com",
        tags: ["dualstack"]
      }
    ]
  },
  "s3-external-1": {
    variants: [
      {
        hostname: "s3-external-1.amazonaws.com",
        tags: []
      }
    ],
    signingRegion: "us-east-1"
  },
  "sa-east-1": {
    variants: [
      {
        hostname: "s3.sa-east-1.amazonaws.com",
        tags: []
      },
      {
        hostname: "s3.dualstack.sa-east-1.amazonaws.com",
        tags: ["dualstack"]
      }
    ]
  },
  "us-east-1": {
    variants: [
      {
        hostname: "s3.us-east-1.amazonaws.com",
        tags: []
      },
      {
        hostname: "s3-fips.dualstack.us-east-1.amazonaws.com",
        tags: ["dualstack", "fips"]
      },
      {
        hostname: "s3-fips.us-east-1.amazonaws.com",
        tags: ["fips"]
      },
      {
        hostname: "s3.dualstack.us-east-1.amazonaws.com",
        tags: ["dualstack"]
      }
    ]
  },
  "us-east-2": {
    variants: [
      {
        hostname: "s3.us-east-2.amazonaws.com",
        tags: []
      },
      {
        hostname: "s3-fips.dualstack.us-east-2.amazonaws.com",
        tags: ["dualstack", "fips"]
      },
      {
        hostname: "s3-fips.us-east-2.amazonaws.com",
        tags: ["fips"]
      },
      {
        hostname: "s3.dualstack.us-east-2.amazonaws.com",
        tags: ["dualstack"]
      }
    ]
  },
  "us-gov-east-1": {
    variants: [
      {
        hostname: "s3.us-gov-east-1.amazonaws.com",
        tags: []
      },
      {
        hostname: "s3-fips.us-gov-east-1.amazonaws.com",
        tags: ["fips"]
      },
      {
        hostname: "s3.dualstack.us-gov-east-1.amazonaws.com",
        tags: ["dualstack"]
      }
    ]
  },
  "us-gov-west-1": {
    variants: [
      {
        hostname: "s3.us-gov-west-1.amazonaws.com",
        tags: []
      },
      {
        hostname: "s3-fips.us-gov-west-1.amazonaws.com",
        tags: ["fips"]
      },
      {
        hostname: "s3.dualstack.us-gov-west-1.amazonaws.com",
        tags: ["dualstack"]
      }
    ]
  },
  "us-west-1": {
    variants: [
      {
        hostname: "s3.us-west-1.amazonaws.com",
        tags: []
      },
      {
        hostname: "s3-fips.dualstack.us-west-1.amazonaws.com",
        tags: ["dualstack", "fips"]
      },
      {
        hostname: "s3-fips.us-west-1.amazonaws.com",
        tags: ["fips"]
      },
      {
        hostname: "s3.dualstack.us-west-1.amazonaws.com",
        tags: ["dualstack"]
      }
    ]
  },
  "us-west-2": {
    variants: [
      {
        hostname: "s3.us-west-2.amazonaws.com",
        tags: []
      },
      {
        hostname: "s3-fips.dualstack.us-west-2.amazonaws.com",
        tags: ["dualstack", "fips"]
      },
      {
        hostname: "s3-fips.us-west-2.amazonaws.com",
        tags: ["fips"]
      },
      {
        hostname: "s3.dualstack.us-west-2.amazonaws.com",
        tags: ["dualstack"]
      }
    ]
  }
};
var partitionHash3 = {
  aws: {
    regions: [
      "af-south-1",
      "ap-east-1",
      "ap-northeast-1",
      "ap-northeast-2",
      "ap-northeast-3",
      "ap-south-1",
      "ap-southeast-1",
      "ap-southeast-2",
      "aws-global",
      "ca-central-1",
      "eu-central-1",
      "eu-north-1",
      "eu-south-1",
      "eu-west-1",
      "eu-west-2",
      "eu-west-3",
      "fips-ca-central-1",
      "fips-us-east-1",
      "fips-us-east-2",
      "fips-us-west-1",
      "fips-us-west-2",
      "me-south-1",
      "s3-external-1",
      "sa-east-1",
      "us-east-1",
      "us-east-2",
      "us-west-1",
      "us-west-2"
    ],
    regionRegex: "^(us|eu|ap|sa|ca|me|af)\\-\\w+\\-\\d+$",
    variants: [
      {
        hostname: "s3.{region}.amazonaws.com",
        tags: []
      },
      {
        hostname: "s3-fips.dualstack.{region}.amazonaws.com",
        tags: ["dualstack", "fips"]
      },
      {
        hostname: "s3.dualstack.{region}.amazonaws.com",
        tags: ["dualstack"]
      }
    ]
  },
  "aws-cn": {
    regions: ["cn-north-1", "cn-northwest-1"],
    regionRegex: "^cn\\-\\w+\\-\\d+$",
    variants: [
      {
        hostname: "s3.{region}.amazonaws.com.cn",
        tags: []
      },
      {
        hostname: "s3.dualstack.{region}.amazonaws.com.cn",
        tags: ["dualstack"]
      }
    ]
  },
  "aws-iso": {
    regions: ["us-iso-east-1", "us-iso-west-1"],
    regionRegex: "^us\\-iso\\-\\w+\\-\\d+$",
    variants: [
      {
        hostname: "s3.{region}.c2s.ic.gov",
        tags: []
      },
      {
        hostname: "s3-fips.{region}.c2s.ic.gov",
        tags: ["fips"]
      }
    ]
  },
  "aws-iso-b": {
    regions: ["us-isob-east-1"],
    regionRegex: "^us\\-isob\\-\\w+\\-\\d+$",
    variants: [
      {
        hostname: "s3.{region}.sc2s.sgov.gov",
        tags: []
      },
      {
        hostname: "s3-fips.{region}.sc2s.sgov.gov",
        tags: ["fips"]
      }
    ]
  },
  "aws-us-gov": {
    regions: ["fips-us-gov-east-1", "fips-us-gov-west-1", "us-gov-east-1", "us-gov-west-1"],
    regionRegex: "^us\\-gov\\-\\w+\\-\\d+$",
    variants: [
      {
        hostname: "s3.{region}.amazonaws.com",
        tags: []
      },
      {
        hostname: "s3-fips.dualstack.{region}.amazonaws.com",
        tags: ["dualstack", "fips"]
      },
      {
        hostname: "s3.dualstack.{region}.amazonaws.com",
        tags: ["dualstack"]
      }
    ]
  }
};
var defaultRegionInfoProvider3 = function(region, options) {
  return __awaiter(void 0, void 0, void 0, function() {
    return __generator(this, function(_a) {
      return [2, getRegionInfo(region, __assign(__assign({}, options), { signingService: "s3", regionHash: regionHash3, partitionHash: partitionHash3 }))];
    });
  });
};

// node_modules/@aws-sdk/client-s3/dist-es/runtimeConfig.shared.js
var getRuntimeConfig5 = function(config) {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  return {
    apiVersion: "2006-03-01",
    disableHostPrefix: (_a = config === null || config === void 0 ? void 0 : config.disableHostPrefix) !== null && _a !== void 0 ? _a : false,
    logger: (_b = config === null || config === void 0 ? void 0 : config.logger) !== null && _b !== void 0 ? _b : {},
    regionInfoProvider: (_c = config === null || config === void 0 ? void 0 : config.regionInfoProvider) !== null && _c !== void 0 ? _c : defaultRegionInfoProvider3,
    serviceId: (_d = config === null || config === void 0 ? void 0 : config.serviceId) !== null && _d !== void 0 ? _d : "S3",
    signerConstructor: (_e = config === null || config === void 0 ? void 0 : config.signerConstructor) !== null && _e !== void 0 ? _e : S3SignatureV4,
    signingEscapePath: (_f = config === null || config === void 0 ? void 0 : config.signingEscapePath) !== null && _f !== void 0 ? _f : false,
    urlParser: (_g = config === null || config === void 0 ? void 0 : config.urlParser) !== null && _g !== void 0 ? _g : parseUrl,
    useArnRegion: (_h = config === null || config === void 0 ? void 0 : config.useArnRegion) !== null && _h !== void 0 ? _h : false
  };
};

// node_modules/@aws-sdk/client-s3/dist-es/runtimeConfig.js
var getRuntimeConfig6 = function(config) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
  emitWarningIfUnsupportedVersion(process.version);
  var clientSharedValues = getRuntimeConfig5(config);
  return __assign(__assign(__assign({}, clientSharedValues), config), { runtime: "node", base64Decoder: (_a = config === null || config === void 0 ? void 0 : config.base64Decoder) !== null && _a !== void 0 ? _a : fromBase64, base64Encoder: (_b = config === null || config === void 0 ? void 0 : config.base64Encoder) !== null && _b !== void 0 ? _b : toBase64, bodyLengthChecker: (_c = config === null || config === void 0 ? void 0 : config.bodyLengthChecker) !== null && _c !== void 0 ? _c : calculateBodyLength, credentialDefaultProvider: (_d = config === null || config === void 0 ? void 0 : config.credentialDefaultProvider) !== null && _d !== void 0 ? _d : decorateDefaultCredentialProvider2(defaultProvider), defaultUserAgentProvider: (_e = config === null || config === void 0 ? void 0 : config.defaultUserAgentProvider) !== null && _e !== void 0 ? _e : defaultUserAgent({ serviceId: clientSharedValues.serviceId, clientVersion: package_default.version }), eventStreamSerdeProvider: (_f = config === null || config === void 0 ? void 0 : config.eventStreamSerdeProvider) !== null && _f !== void 0 ? _f : eventStreamSerdeProvider, maxAttempts: (_g = config === null || config === void 0 ? void 0 : config.maxAttempts) !== null && _g !== void 0 ? _g : loadConfig(NODE_MAX_ATTEMPT_CONFIG_OPTIONS), md5: (_h = config === null || config === void 0 ? void 0 : config.md5) !== null && _h !== void 0 ? _h : Hash.bind(null, "md5"), region: (_j = config === null || config === void 0 ? void 0 : config.region) !== null && _j !== void 0 ? _j : loadConfig(NODE_REGION_CONFIG_OPTIONS, NODE_REGION_CONFIG_FILE_OPTIONS), requestHandler: (_k = config === null || config === void 0 ? void 0 : config.requestHandler) !== null && _k !== void 0 ? _k : new NodeHttpHandler(), retryMode: (_l = config === null || config === void 0 ? void 0 : config.retryMode) !== null && _l !== void 0 ? _l : loadConfig(NODE_RETRY_MODE_CONFIG_OPTIONS), sha256: (_m = config === null || config === void 0 ? void 0 : config.sha256) !== null && _m !== void 0 ? _m : Hash.bind(null, "sha256"), streamCollector: (_o = config === null || config === void 0 ? void 0 : config.streamCollector) !== null && _o !== void 0 ? _o : streamCollector, streamHasher: (_p = config === null || config === void 0 ? void 0 : config.streamHasher) !== null && _p !== void 0 ? _p : fileStreamHasher, useArnRegion: (_q = config === null || config === void 0 ? void 0 : config.useArnRegion) !== null && _q !== void 0 ? _q : loadConfig(NODE_USE_ARN_REGION_CONFIG_OPTIONS), useDualstackEndpoint: (_r = config === null || config === void 0 ? void 0 : config.useDualstackEndpoint) !== null && _r !== void 0 ? _r : loadConfig(NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS), useFipsEndpoint: (_s = config === null || config === void 0 ? void 0 : config.useFipsEndpoint) !== null && _s !== void 0 ? _s : loadConfig(NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS), utf8Decoder: (_t = config === null || config === void 0 ? void 0 : config.utf8Decoder) !== null && _t !== void 0 ? _t : fromUtf8, utf8Encoder: (_u = config === null || config === void 0 ? void 0 : config.utf8Encoder) !== null && _u !== void 0 ? _u : toUtf8 });
};

// node_modules/@aws-sdk/client-s3/dist-es/S3Client.js
var S3Client = function(_super) {
  __extends(S3Client3, _super);
  function S3Client3(configuration) {
    var _this = this;
    var _config_0 = getRuntimeConfig6(configuration);
    var _config_1 = resolveRegionConfig(_config_0);
    var _config_2 = resolveEndpointsConfig(_config_1);
    var _config_3 = resolveRetryConfig(_config_2);
    var _config_4 = resolveHostHeaderConfig(_config_3);
    var _config_5 = resolveAwsAuthConfig(_config_4);
    var _config_6 = resolveBucketEndpointConfig(_config_5);
    var _config_7 = resolveUserAgentConfig(_config_6);
    var _config_8 = resolveEventStreamSerdeConfig(_config_7);
    _this = _super.call(this, _config_8) || this;
    _this.config = _config_8;
    _this.middlewareStack.use(getRetryPlugin(_this.config));
    _this.middlewareStack.use(getContentLengthPlugin(_this.config));
    _this.middlewareStack.use(getHostHeaderPlugin(_this.config));
    _this.middlewareStack.use(getLoggerPlugin(_this.config));
    _this.middlewareStack.use(getAwsAuthPlugin(_this.config));
    _this.middlewareStack.use(getValidateBucketNamePlugin(_this.config));
    _this.middlewareStack.use(getUseRegionalEndpointPlugin(_this.config));
    _this.middlewareStack.use(getAddExpectContinuePlugin(_this.config));
    _this.middlewareStack.use(getUserAgentPlugin(_this.config));
    return _this;
  }
  S3Client3.prototype.destroy = function() {
    _super.prototype.destroy.call(this);
  };
  return S3Client3;
}(Client);

// src/index.ts
var import_fs6 = __toModule(require("fs"));
var import_promises2 = __toModule(require("fs/promises"));

// src/uploadFiles.ts
var import_promises = __toModule(require("fs/promises"));
var import_path3 = __toModule(require("path"));
var entryPointFileNames = ["index.html", "index.htm", "manifest.json", "asset-manifest.json"];
async function uploadFiles({ files: files4, storageService, hostingConfig }) {
  const fileInfos = files4.map((file) => ({
    isEntrypoint: entryPointFileNames.includes(import_path3.default.basename(file)),
    file
  }));
  async function uploadFile(file) {
    const fileConfig = hostingConfig.files.find((x) => x.path === file);
    await storageService.uploadFile(__spreadValues({
      name: file,
      body: await import_promises.default.readFile(file)
    }, fileConfig ? getS3ObjectParams(fileConfig.headers) : {}));
  }
  const nonEntrypoints = fileInfos.filter(({ isEntrypoint }) => !isEntrypoint).map(({ file }) => file);
  await Promise.all(nonEntrypoints.map(uploadFile));
  const entrypoints = fileInfos.filter(({ isEntrypoint }) => isEntrypoint).map(({ file }) => file);
  await Promise.all(entrypoints.map(uploadFile));
}
function getS3ObjectParams(headers) {
  var _a;
  const standardHeaders = ["cache-control", "access-control-allow-origin"];
  const CacheControl = (_a = headers.find((x) => x.key.toLowerCase() === "cache-control")) == null ? void 0 : _a.value;
  const Metadata = Object.fromEntries(headers.filter((x) => !standardHeaders.includes(x.key.toLowerCase())).map((x) => [`header-${x.key}`, x.value]));
  return {
    CacheControl,
    Metadata
  };
}

// node_modules/date-fns/esm/_lib/getTimezoneOffsetInMilliseconds/index.js
function getTimezoneOffsetInMilliseconds(date) {
  var utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
  utcDate.setUTCFullYear(date.getFullYear());
  return date.getTime() - utcDate.getTime();
}

// node_modules/date-fns/esm/_lib/requiredArgs/index.js
function requiredArgs(required, args) {
  if (args.length < required) {
    throw new TypeError(required + " argument" + (required > 1 ? "s" : "") + " required, but only " + args.length + " present");
  }
}

// node_modules/date-fns/esm/toDate/index.js
function toDate2(argument) {
  requiredArgs(1, arguments);
  var argStr = Object.prototype.toString.call(argument);
  if (argument instanceof Date || typeof argument === "object" && argStr === "[object Date]") {
    return new Date(argument.getTime());
  } else if (typeof argument === "number" || argStr === "[object Number]") {
    return new Date(argument);
  } else {
    if ((typeof argument === "string" || argStr === "[object String]") && typeof console !== "undefined") {
      console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule");
      console.warn(new Error().stack);
    }
    return new Date(NaN);
  }
}

// node_modules/date-fns/esm/startOfDay/index.js
function startOfDay(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate2(dirtyDate);
  date.setHours(0, 0, 0, 0);
  return date;
}

// node_modules/date-fns/esm/differenceInCalendarDays/index.js
var MILLISECONDS_IN_DAY = 864e5;
function differenceInCalendarDays(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var startOfDayLeft = startOfDay(dirtyDateLeft);
  var startOfDayRight = startOfDay(dirtyDateRight);
  var timestampLeft = startOfDayLeft.getTime() - getTimezoneOffsetInMilliseconds(startOfDayLeft);
  var timestampRight = startOfDayRight.getTime() - getTimezoneOffsetInMilliseconds(startOfDayRight);
  return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_DAY);
}

// src/calculateChanges.ts
function calculateChanges({
  lastDeploymentLog,
  files: files4,
  maxDays
}) {
  const now = Date.now();
  const isExpiredFile = ({ obsoleteSince }) => obsoleteSince !== null && differenceInCalendarDays(now, new Date(obsoleteSince)) > maxDays;
  console.log({ lastDeploymentLog });
  const filesToDelete = lastDeploymentLog.filter(isExpiredFile).map(({ path: path3 }) => path3);
  const newDeploymentLogMap = new Map();
  lastDeploymentLog.filter((x) => !isExpiredFile(x)).forEach(({ path: path3, obsoleteSince }) => newDeploymentLogMap.set(path3, obsoleteSince != null ? obsoleteSince : new Date(now).toISOString()));
  files4.forEach((path3) => newDeploymentLogMap.set(path3, null));
  return {
    newDeploymentLog: Array.from(newDeploymentLogMap.entries()).map(([path3, obsoleteSince]) => ({
      path: path3,
      obsoleteSince
    })),
    filesToDelete
  };
}

// src/getSourceFiles.ts
var import_glob = __toModule(require_glob());
var import_path4 = __toModule(require("path"));
async function getSourceFiles({ sourceDir }) {
  const globber = await import_glob.default.create(import_path4.default.join(sourceDir, "**"), {
    matchDirectories: false
  });
  const files4 = (await globber.glob()).map((x) => import_path4.default.relative(sourceDir, x));
  return files4;
}

// src/deployAssets.ts
var deploymentLogFileName = "deployment.json";
async function deployAssets({
  sourceDir,
  hostingConfig,
  storageService,
  maxDays
}) {
  const files4 = await getSourceFiles({ sourceDir });
  console.log("Files to upload", files4);
  await uploadFiles({ files: files4, storageService, hostingConfig });
  console.log("Getting last deployment log...");
  const lastDeploymentLogFileContents = await storageService.downloadFileAsString(deploymentLogFileName);
  const lastDeploymentLog = lastDeploymentLogFileContents !== null ? JSON.parse(lastDeploymentLogFileContents) : null;
  if (lastDeploymentLog) {
    console.log("Last deployment log:", lastDeploymentLog);
  } else {
    console.log("Lastdeployment log not found.");
  }
  const { filesToDelete, newDeploymentLog } = calculateChanges({
    lastDeploymentLog: lastDeploymentLog != null ? lastDeploymentLog : [],
    files: files4,
    maxDays
  });
  console.log("Uploading new deployment log...", newDeploymentLog);
  await storageService.uploadFile({ name: deploymentLogFileName, body: JSON.stringify(newDeploymentLog) });
  console.log("New deployment log was uploaded", newDeploymentLog);
  if (filesToDelete.length > 0) {
    console.log(`Deleting ${filesToDelete.length} expired files...`);
    await storageService.deleteFiles(filesToDelete);
    console.log("Expired files were deleted");
  } else {
    console.log("No expired files to delete");
  }
}

// src/StorageService.ts
var import_mime_types = __toModule(require_mime_types());
function createS3StorageService({ s3Client, bucket }) {
  return {
    async downloadFileAsString(name4) {
      const result = await s3Client.send(new GetObjectCommand({ Bucket: bucket, Key: name4 }));
      if (result.Body == null) {
        return null;
      }
      return await readableToString(result.Body);
    },
    async deleteFiles(names) {
      await s3Client.send(new DeleteObjectsCommand({
        Bucket: bucket,
        Delete: { Objects: names.map((Key) => ({ Key })) }
      }));
    },
    async uploadFile(file) {
      await s3Client.send(new PutObjectCommand({
        Bucket: bucket,
        Key: file.name,
        ContentType: (0, import_mime_types.lookup)(file.name) || "text/plain",
        Body: file.body,
        CacheControl: file.CacheControl,
        Metadata: file.Metadata
      }));
    }
  };
}
async function readableToString(readable) {
  return new Promise((resolve, reject) => {
    let data = "";
    readable.on("data", (chunk) => {
      data += chunk;
    });
    readable.on("error", reject);
    readable.on("end", () => resolve(data));
  });
}

// src/index.ts
async function main4() {
  const { accessKeyId, secretAccessKey, sourceDir, bucket, region, maxDays } = getActionParams();
  const s3Client = new S3Client({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey
    }
  });
  const storageService = createS3StorageService({
    s3Client,
    bucket
  });
  const hostingConfig = await readHostingConfig();
  await deployAssets({ storageService, sourceDir, hostingConfig, maxDays });
}
var fileExists = (file) => (0, import_promises2.access)(file, import_fs6.constants.R_OK).catch(() => false).then(() => true);
async function readHostingConfig() {
  const hostingFileName = "hosting.json";
  if (!await fileExists(hostingFileName)) {
    throw new Error(`${hostingFileName} must be created`);
  }
  const hostingFileContent = await (0, import_promises2.readFile)(hostingFileName);
  const hostingConfig = JSON.parse(hostingFileContent.toString());
  return hostingConfig;
}
function getActionParams() {
  return {
    accessKeyId: import_core.default.getInput("access-key-id", {
      required: true
    }),
    secretAccessKey: import_core.default.getInput("secret-access-key", {
      required: true
    }),
    region: import_core.default.getInput("region", {
      required: true
    }),
    bucket: import_core.default.getInput("bucket", {
      required: true
    }),
    sourceDir: import_core.default.getInput("source-dir", {
      required: true
    }),
    maxDays: parseInt(import_core.default.getInput("max-days", {
      required: false
    }))
  };
}
main4().catch((error) => {
  import_core.default.setFailed(error.message);
});
/*!
 * mime-db
 * Copyright(c) 2014 Jonathan Ong
 * MIT Licensed
 */
/*!
 * mime-types
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
