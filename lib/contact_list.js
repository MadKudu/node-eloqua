class List {
  constructor (client) {
    this.client = client
  }

  getAll (options) {
    return this.client._request({
      method: 'GET',
      url: `/api/REST/1.0/assets/contact/lists`,
      params: options
    })
  }

  get (id, options) {
    return this.client._request({
      method: 'GET',
      url: `/api/REST/1.0/assets/contact/list/${id}`,
      params: options
    })
  }

  create (data) {
    return this.client._request({
      method: 'POST',
      url: '/api/REST/1.0/assets/contact/list',
      data
    })
  }

  update (id, data) {
    return this.client._request({
      method: 'PUT',
      url: `/api/REST/1.0/assets/contact/list/${id}`,
      data
    })
  }

  delete (id) {
    return this.client._request({
      method: 'DELETE',
      url: `/api/REST/1.0/assets/contact/list/${id}`
    })
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
}

module.exports = List
