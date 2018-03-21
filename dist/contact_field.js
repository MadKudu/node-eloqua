'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Properties = function () {
  function Properties(client) {
    (0, _classCallCheck3.default)(this, Properties);

    this.client = client;
  }

  (0, _createClass3.default)(Properties, [{
    key: 'getAll',
    value: function getAll(options) {
      return this.client._request({
        method: 'GET',
        url: '/api/REST/1.0/assets/contact/fields',
        params: options
      });
    }
  }, {
    key: 'get',
    value: function get(id, options) {
      return this.client._request({
        method: 'GET',
        url: '/api/REST/1.0/assets/contact/field/' + id,
        params: options
      });
    }
  }, {
    key: 'create',
    value: function create(data) {
      return this.client._request({
        method: 'POST',
        url: '/api/REST/1.0/assets/contact/field',
        data: data
      });
    }
  }, {
    key: 'update',
    value: function update(id, data) {
      return this.client._request({
        method: 'PUT',
        url: '/api/REST/1.0/assets/contact/field/' + id,
        data: data
      });
    }
  }, {
    key: 'delete',
    value: function _delete(id) {
      return this.client._request({
        method: 'DELETE',
        url: '/api/REST/1.0/assets/contact/field/' + id
      });
    }

    // upsert (data) {
    //   return this.create(data)
    //     .catch(err => {
    //       if (err.statusCode === 409) { // if 409, the property already exists, update it
    //         return this.update(data.name, data)
    //       } else {
    //         throw err
    //       }
    //     })
    // }

  }]);
  return Properties;
}();

module.exports = Properties;