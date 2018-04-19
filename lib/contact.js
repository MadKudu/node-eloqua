const Field = require('./contact_field')
const List = require('./contact_list')
const Segment = require('./contact_segment')

class Contact {
  constructor (client) {
    this.client = client
    this.fields = new Field(this.client)
    this.lists = new List(this.client)
    this.segments = new Segment(this.client)
  }

  get (id, options) {
    return this.client._request({
      method: 'GET',
      url: `/api/REST/1.0/data/contact/${id}`,
      params: options
    })
  }

  getAll (options) {
    return this.client._request({
      method: 'GET',
      url: '/api/REST/1.0/data/contacts',
      params: options
    })
  }

  getSegment (segmentId, options) {
    return this.client._request({
      method: 'GET',
      url: `/api/REST/2.0/data/contacts/segment/${segmentId}`, // somehow, this call seems to be undocumented (https://community.oracle.com/thread/3900099)
      params: options
    })
  }

  update (id, data) {
    return this.client._request({
      method: 'PUT',
      url: `/api/REST/1.0/data/contact/${id}`,
      data
    })
  }
}

module.exports = Contact
