import Debug from 'debug';
import { Readable } from 'stream';

const debug = Debug('eloqua:client');

export default class BulkStream extends Readable {
  client: any;
  syncUri: string;
  ended: boolean;
  connecting: boolean;
  limit: number;
  offset: number;
  count: 0;

  constructor(client: any, syncUri: string) {
    super({ objectMode: true });
    this.client = client;
    this.syncUri = syncUri;
    this.limit = 10000;
    this.offset = 0;
    this.count = 0;
    this.ended = false;
    this.connecting = false;
  }

  async fetchPage() {
    this.connecting = true; // set to connecting = true to prevent the stream to call _read multiple times
    debug('fetch', this.limit, this.offset);
    try {
      const results = await this.client.bulk.getSyncData(this.syncUri, this.limit, this.offset);
      const { hasMore, count, totalResults } = results;
      this.count = this.count + count;
      debug('results', count, this.count, totalResults, hasMore);
      if (hasMore) {
        this.offset = this.offset + this.limit;
      } else {
        this.ended = true;
      }
      this.connecting = false; // from there, we can fetch again
      results.items && results.items.forEach((item: any) => {
        this.push(item);
      });
      if (this.ended) {
        this.push(null);
      }
    } catch (err) {
      this.emit('error', err);
    }
  }

  // tslint:disable-next-line:function-name
  _read() {
    if (this.ended || this.connecting) { return; }
    this.fetchPage();
  }
}
