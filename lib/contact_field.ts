import EloquaClient from './client';

export default class Properties {
  client: EloquaClient;

  constructor (client: EloquaClient) {
    this.client = client;
  }

  getAll (options: any) {
    return this.client._request({
      method: 'GET',
      url: '/api/REST/1.0/assets/contact/fields',
      params: options
    });
  }

  get (id: number, options: any) {
    return this.client._request({
      method: 'GET',
      url: `/api/REST/1.0/assets/contact/field/${id}`,
      params: options
    });
  }

  create (data: any) {
    return this.client._request({
      data,
      method: 'POST',
      url: '/api/REST/1.0/assets/contact/field'
    });
  }

  update (id: number, data: any) {
    return this.client._request({
      data,
      method: 'PUT',
      url: `/api/REST/1.0/assets/contact/field/${id}`
    });
  }

  delete (id: number) {
    return this.client._request({
      method: 'DELETE',
      url: `/api/REST/1.0/assets/contact/field/${id}`
    });
  }
}
