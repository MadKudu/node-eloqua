const Field = require('./contact_field')

class Contact {
  constructor (client) {
    this.client = client
    this.fields = new Field(this.client)
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

  update (id, options) {
    return this.client._request({
      method: 'PUT',
      url: `/api/REST/1.0/data/contact/${id}`,
      params: options
    })
  }
}

module.exports = Contact
