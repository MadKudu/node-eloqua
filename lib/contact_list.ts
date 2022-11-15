import EloquaClient from './client';

export default class List {
  client: EloquaClient;

  constructor(client: EloquaClient) {
    this.client = client;
  }

  getAll(options?: any) {
    return this.client._request({
      method: 'GET',
      url: '/api/REST/1.0/assets/contact/lists',
      params: options,
    });
  }

  get(id: number, options?: any) {
    return this.client._request({
      method: 'GET',
      url: `/api/REST/1.0/assets/contact/list/${id}`,
      params: options,
    });
  }

  create(data: any) {
    return this.client._request({
      data,
      method: 'POST',
      url: '/api/REST/1.0/assets/contact/list',
    });
  }

  update(id: number, data: any) {
    return this.client._request({
      data,
      method: 'PUT',
      url: `/api/REST/1.0/assets/contact/list/${id}`,
    });
  }

  delete(id: number) {
    return this.client._request({
      method: 'DELETE',
      url: `/api/REST/1.0/assets/contact/list/${id}`,
    });
  }
}
