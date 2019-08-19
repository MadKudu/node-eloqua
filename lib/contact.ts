import Field from './field';
import List from './contact_list';
import Segment from './contact_segment';
import EloquaClient from './client';

export default class Contact {
  client: EloquaClient;
  fields: any;
  lists: any;
  segments: any;

  constructor (client: EloquaClient) {
    this.client = client;
    this.fields = new Field(this.client, 'contact');
    this.lists = new List(this.client);
    this.segments = new Segment(this.client);
  }

  get (id: number, options?: any) {
    return this.client._request({
      method: 'GET',
      url: `/api/REST/1.0/data/contact/${id}`,
      params: options
    });
  }

  getAll (options?: any) {
    return this.client._request({
      method: 'GET',
      url: '/api/REST/1.0/data/contacts',
      params: options
    });
  }

  getSegment (segmentId: number, options?: any) {
    return this.client._request({
      method: 'GET',
      url: `/api/REST/2.0/data/contacts/segment/${segmentId}`,
      // somehow, this call seems to be undocumented (https://community.oracle.com/thread/3900099)
      params: options
    });
  }

  update (id: number, data: any) {
    return this.client._request({
      data,
      method: 'PUT',
      url: `/api/REST/1.0/data/contact/${id}`
    });
  }
}
