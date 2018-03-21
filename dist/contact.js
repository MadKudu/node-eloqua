'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Field = require('./contact_field');
var List = require('./contact_list');
var Segment = require('./contact_segment');

var Contact = function () {
  function Contact(client) {
    (0, _classCallCheck3.default)(this, Contact);

    this.client = client;
    this.fields = new Field(this.client);
    this.lists = new List(this.client);
    this.segments = new Segment(this.client);
  }

  (0, _createClass3.default)(Contact, [{
    key: 'get',
    value: function get(id, options) {
      return this.client._request({
        method: 'GET',
        url: '/api/REST/1.0/data/contact/' + id,
        params: options
      });
    }
  }, {
    key: 'getAll',
    value: function getAll(options) {
      return this.client._request({
        method: 'GET',
        url: '/api/REST/1.0/data/contacts',
        params: options
      });
    }
  }, {
    key: 'getSegment',
    value: function getSegment(segmentId, options) {
      return this.client._request({
        method: 'GET',
        url: '/api/REST/1.0/data/contacts/segment/' + segmentId, // somehow, this call seems to be undocumented (https://community.oracle.com/thread/3900099)
        params: options
      });
    }
  }, {
    key: 'getList',
    value: function getList(listId, options) {
      return this.client._request({
        method: 'GET',
        url: '/api/REST/1.0/data/contacts/segment/' + listId, // somehow, this call seems to be undocumented (https://community.oracle.com/thread/3900099)
        params: options
      });
    }
  }, {
    key: 'update',
    value: function update(id, data) {
      return this.client._request({
        method: 'PUT',
        url: '/api/REST/1.0/data/contact/' + id,
        data: data
      });
    }
  }]);
  return Contact;
}();

module.exports = Contact;