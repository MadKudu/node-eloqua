class Contact {
  constructor (client) {
    this.client = client
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
}

module.exports = Contact
