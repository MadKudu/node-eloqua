import Debug from 'debug';
import EloquaClient from './client';
import Stream from './stream';

const debug = Debug('eloqua:client');

export default class List {
  client: EloquaClient;

  constructor(client: EloquaClient) {
    this.client = client;
  }

  createExport(
    objectName: string,
    exportName: string,
    fields: any,
    filter: string
  ) {
    return this.client._request({
      method: 'POST',
      url: `/api/bulk/2.0/${objectName}/exports`,
      data: {
        fields,
        filter,
        name: exportName,
        areSystemTimestampsInUTC: true,
      },
    });
  }

  createSync(exportUri: string) {
    return this.client._request({
      method: 'POST',
      url: '/api/bulk/2.0/syncs',
      data: { syncedInstanceUri: exportUri },
    });
  }

  checkSync(syncUri: string) {
    return this.client._request({
      method: 'GET',
      url: `/api/bulk/2.0${syncUri}`,
    });
  }

  async pollSync(syncUri: string): Promise<any> {
    const results = await this.checkSync(syncUri);
    const { status } = results;
    debug(status);
    if (['active', 'pending'].includes(status)) {
      await new Promise((resolve) => setTimeout(resolve, 10000));
      return this.pollSync(syncUri);
    }
    return results;
  }

  getSyncData(syncUri: string, limit = 1000, offset = 0) {
    return this.client._request({
      method: 'GET',
      url: `/api/bulk/2.0${syncUri}/data`,
      params: { limit, offset },
    });
  }

  async completeExport(
    objectName: string,
    exportName: string,
    fields: any,
    filter: string
  ) {
    const bulkExport = await this.createExport(
      objectName,
      exportName,
      fields,
      filter
    );
    const sync = await this.createSync(bulkExport.uri);
    const syncUri = sync.uri;
    const results = await this.pollSync(syncUri);
    const { status } = results;
    return { syncUri, status };
  }

  async runExport(
    objectName: string,
    exportName: string,
    fields: any,
    filter: string
  ) {
    const { status, syncUri } = await this.completeExport(
      objectName,
      exportName,
      fields,
      filter
    );
    if (status === 'success') {
      return this.getSyncData(syncUri);
    }
    return;
  }

  async getExportStream(
    objectName: string,
    exportName: string,
    fields: any,
    filter: string
  ) {
    const { status, syncUri } = await this.completeExport(
      objectName,
      exportName,
      fields,
      filter
    );
    if (status === 'success') {
      return new Stream(this.client, syncUri);
    }
    return;
  }
}
