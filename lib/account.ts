import EloquaClient from './client';
import Field from './field';

export default class Contact {
  client: EloquaClient;
  fields: any;
  lists: any;

  constructor(client: EloquaClient) {
    this.client = client;
    this.fields = new Field(this.client, 'account');
  }

  get(id: number, options?: any) {
    return this.client._request({
      method: 'GET',
      url: `/api/REST/1.0/data/account/${id}`,
      params: options,
    });
  }

  getAll(options?: any) {
    return this.client._request({
      method: 'GET',
      url: '/api/REST/1.0/data/accounts',
      params: options,
    });
  }

  update(id: number, data: any) {
    return this.client._request({
      data,
      method: 'PUT',
      url: `/api/REST/1.0/data/account/${id}`,
    });
  }
}
