class Segment {
  constructor (client) {
    this.client = client
  }

  getAll (options) {
    return this.client._request({
      method: 'GET',
      url: `/api/REST/1.0/assets/contact/segments`,
      params: options
    })
  }

  get (id, options) {
    return this.client._request({
      method: 'GET',
      url: `/api/REST/1.0/assets/contact/segment/${id}`,
      params: options
    })
  }

  create (data) {
    return this.client._request({
      method: 'POST',
      url: '/api/REST/1.0/assets/contact/segment',
      data
    })
  }

  update (id, data) {
    return this.client._request({
      method: 'PUT',
      url: `/api/REST/1.0/assets/contact/segment/${id}`,
      data
    })
  }

  delete (id) {
    return this.client._request({
      method: 'DELETE',
      url: `/api/REST/1.0/assets/contact/segment/${id}`
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

module.exports = Segment
