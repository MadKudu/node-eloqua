import EloquaClient from './client';

export default class Properties {
  client: EloquaClient;
  objectName: string;

  constructor (client: EloquaClient, objectName: string) {
    this.client = client;
    this.objectName = objectName;
  }

  getAll (options?: any) {
    return this.client._request({
      method: 'GET',
      url: `/api/REST/1.0/assets/${this.objectName}/fields`,
      params: options
    });
  }

  get (id: number, options?: any) {
    return this.client._request({
      method: 'GET',
      url: `/api/REST/1.0/assets/${this.objectName}/field/${id}`,
      params: options
    });
  }

  create (data: any) {
    return this.client._request({
      data,
      method: 'POST',
      url: `/api/REST/1.0/assets/${this.objectName}/field`
    });
  }

  update (id: number, data: any) {
    return this.client._request({
      data,
      method: 'PUT',
      url: `/api/REST/1.0/assets/${this.objectName}/field/${id}`
    });
  }

  delete (id: number) {
    return this.client._request({
      method: 'DELETE',
      url: `/api/REST/1.0/assets/${this.objectName}/field/${id}`
    });
  }
}
