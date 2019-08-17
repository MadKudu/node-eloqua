import Debug from 'debug';
import EloquaClient from './client';
import Stream from './stream';

const debug = Debug('eloqua:client');

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
        filter,
        areSystemTimestampsInUTC: true
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

  async pollSync(syncUri: string): Promise<any> {
    const results = await this.checkSync(syncUri);
    const { status } = results;
    debug(status);
    if (['active', 'pending'].includes(status)) {
      await new Promise(resolve => setTimeout(resolve, 10000));
      return this.pollSync(syncUri);
    }
    return results;
  }

  getSyncData(syncUri: string, limit: number = 1000, offset: number = 0) {
    return this.client._request({
      method: 'GET',
      url: `/api/bulk/2.0${syncUri}/data`,
      params: { limit, offset }
    });
  }

  async completeExport(name: string, fields: any, filter: string) {
    const bulkExport = await this.createExport(name, fields, filter);
    const sync = await this.createSync(bulkExport.uri);
    const syncUri = sync.uri;
    const results = await this.pollSync(syncUri);
    const { status } = results;
    return { syncUri, status };
  }

  async runExport(name: string, fields: any, filter: string) {
    const { status, syncUri } = await this.completeExport(name, fields, filter);
    if (status === 'success') {
      return this.getSyncData(syncUri);
    }
    return;
  }

  async getExportStream(name: string, fields: any, filter: string) {
    const { status, syncUri } = await this.completeExport(name, fields, filter);
    if (status === 'success') {
      return new Stream(this.client, syncUri);
    }
    return;
  }
}
