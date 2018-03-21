'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ = require('lodash');
var axios = require('axios');
// const https = require('https')
var EventEmitter = require('events').EventEmitter;
var EloquaError = require('./errors').EloquaError;
var Contact = require('./contact');

var debug = require('debug')('eloqua:client');

// define how long to wait API response before throwing a timeout error
// const API_TIMEOUT = 15000
// const MAX_USE_PERCENT_DEFAULT = 90

var Client = function (_EventEmitter) {
  (0, _inherits3.default)(Client, _EventEmitter);

  function Client() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, Client);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Client.__proto__ || (0, _getPrototypeOf2.default)(Client)).call(this));

    _this.qs = {};
    _this.auth = undefined;
    _this.setAuth(options);
    // this.setOAuth(options)
    _this.loginUrl = options.loginUrl || 'https://login.eloqua.com/id';
    _this.baseUrl = options.baseUrl;
    // this.apiTimeout = options.timeout || API_TIMEOUT
    _this.apiCalls = 0;
    _this.on('apiCall', function (params) {
      debug('apiCall', params);
      _this.apiCalls += 1;
    });

    _this.contacts = new Contact(_this);
    return _this;
  }

  (0, _createClass3.default)(Client, [{
    key: 'setAuth',
    value: function setAuth() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (!options.siteName) {
        throw new Error('A siteName needs to be provided');
      } else if (!options.username) {
        throw new Error('A username needs to be provided');
      } else if (!options.password) {
        throw new Error('A password needs to be provided');
      }
      this.auth = {
        username: options.siteName + '\\' + options.username,
        password: '' + options.password
      };
    }
  }, {
    key: '_init',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.baseUrl) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt('return', this.baseUrl);

              case 2:
                _context.next = 4;
                return this.getBaseUrl();

              case 4:
                this.baseUrl = _context.sent;

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _init() {
        return _ref.apply(this, arguments);
      }

      return _init;
    }()
  }, {
    key: 'getBaseUrl',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var params, response, _response$data, data, _data$urls, urls;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                // disable certificate checks - was getting inconsistent certificate results with this call
                // const agent = new https.Agent({ rejectUnauthorized: false })

                params = {
                  url: this.loginUrl,
                  auth: this.auth
                  // httpsAgent: agent,
                };
                _context2.next = 3;
                return axios(params);

              case 3:
                response = _context2.sent;
                _response$data = response.data, data = _response$data === undefined ? {} : _response$data;
                _data$urls = data.urls, urls = _data$urls === undefined ? {} : _data$urls;

                if (!urls.base) {
                  _context2.next = 10;
                  break;
                }

                return _context2.abrupt('return', urls.base);

              case 10:
                throw new Error('Error obtaining baseUrl');

              case 11:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getBaseUrl() {
        return _ref2.apply(this, arguments);
      }

      return getBaseUrl;
    }()
  }, {
    key: '_request',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(opts) {
        var params, response, _response$data2, data;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                params = _.cloneDeep(opts);

                if (this.auth) {
                  params.auth = this.auth;
                }
                // params.json = true

                if (params.baseUrl) {
                  _context3.next = 5;
                  break;
                }

                _context3.next = 5;
                return this._init();

              case 5:
                params.baseURL = this.baseUrl;

                // delete params.path
                // params.qs = _.extend({}, this.qs, params.qs)
                //
                // params.qsStringifyOptions = {
                //   arrayFormat: 'repeat'
                // }
                //
                // params.timeout = this.apiTimeout

                _context3.prev = 6;

                this.emit('apiCall', params);
                _context3.next = 10;
                return axios(params);

              case 10:
                response = _context3.sent;
                _response$data2 = response.data, data = _response$data2 === undefined ? {} : _response$data2;
                // console.log(95, data)

                return _context3.abrupt('return', data);

              case 15:
                _context3.prev = 15;
                _context3.t0 = _context3['catch'](6);
                throw new EloquaError(_context3.t0);

              case 18:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[6, 15]]);
      }));

      function _request(_x3) {
        return _ref3.apply(this, arguments);
      }

      return _request;
    }()
  }]);
  return Client;
}(EventEmitter);

module.exports = Client;