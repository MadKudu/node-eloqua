import EloquaClient from './client';

export default class List {
  client: EloquaClient;

  constructor(client: EloquaClient) {
    this.client = client;
  }

  createExport(name: string, fields: any, filter: string) {
    return this.client._request({
      method: 'POST',
      url: '/api/bulk/2.0/activities/exports',
      data: {
        name,
        fields,
        filter
      }
    });
  }

  createSync(exportUri: string) {
    return this.client._request({
      method: 'POST',
      url: '/api/bulk/2.0/syncs',
      data: { syncedInstanceUri: exportUri }
    });
  }

  checkSync(syncUri: string) {
    return this.client._request({
      method: 'GET',
      url: `/api/bulk/2.0${syncUri}`
    });
  }
}
