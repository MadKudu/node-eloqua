import { expect } from 'chai';
import Eloqua from '../lib/client';

const exportName = 'MK FormSubmit';
const fields =  {
  ActivityId: '{{Activity.Id}}',
  ActivityType: '{{Activity.Type}}',
  ActivityDate: '{{Activity.CreatedAt}}',
  ContactId: '{{Activity.Contact.Id}}',
  AssetType: '{{Activity.Asset.Type}}',
  AssetName: '{{Activity.Asset.Name}}'
};
// tslint:disable-next-line:max-line-length
const filter = "'{{Activity.Type}}'='FormSubmit' AND '{{Activity.CreatedAt}}' > '2019-02-10 13:00:00.000' AND '{{Activity.CreatedAt}}' < '2019-02-10 14:00:00.000'";

describe('bulk', function () {
  this.timeout(10000);
  const eloqua = new Eloqua({
    siteName: process.env.siteName,
    userName: process.env.username,
    password: process.env.password
  });

  describe('createExport', () => {
    it('should create an export', async () => {
      const results = await eloqua.bulk.createExport('activities', exportName, fields, filter);
      const { uri, createdBy } = results;
      expect(uri).to.contain('/activities/exports/');
    });
  });

  describe('createSync', () => {
    let exportUri: string;

    before(async () => {
      const { uri } = await eloqua.bulk.createExport('activities', exportName, fields, filter);
      exportUri = uri;
    });

    it('should start a sync', async () => {
      const results = await eloqua.bulk.createSync(exportUri);
      const { uri, syncedInstanceUri, status } = results;
      expect(uri).to.contain('/syncs/');
      expect(syncedInstanceUri).to.equal(exportUri);
      expect(status).to.be.a('string');
    });
  });

  describe('checkSync', () => {
    let exportUri: string;
    let syncUri: string;

    before(async () => {
      const { uri } = await eloqua.bulk.createExport('activities', exportName, fields, filter);
      exportUri = uri;
    });

    before(async () => {
      const { uri } = await eloqua.bulk.createSync(exportUri);
      syncUri = uri;
    });

    it('should retrieve a sync status', async () => {
      const results = await eloqua.bulk.checkSync(syncUri);
      console.log(results);
      const { uri, createdBy, status } = results;
      expect(uri).to.equal(syncUri);
      expect(status).to.be.a('string');
    });
  });

  describe('pollSync', function () {
    this.timeout(60000);
    let exportUri: string;
    let syncUri: string;

    before(async () => {
      const { uri } = await eloqua.bulk.createExport('activities', exportName, fields, filter);
      exportUri = uri;
    });

    before(async () => {
      const { uri } = await eloqua.bulk.createSync(exportUri);
      syncUri = uri;
    });

    it('should retrieve a sync status', async () => {
      const results = await eloqua.bulk.pollSync(syncUri);
      const { uri, createdBy, status } = results;
      expect(uri).to.equal(syncUri);
      expect(status).to.equal('success');
    });
  });

  describe('runExport', function () {
    this.timeout(60000);
    let exportUri: string;
    let syncUri: string;

    before(async () => {
      const { uri } = await eloqua.bulk.createExport('activities', exportName, fields, filter);
      exportUri = uri;
    });

    before(async () => {
      const { uri } = await eloqua.bulk.createSync(exportUri);
      syncUri = uri;
    });

    it('should create an export and return the results', async () => {
      const results = await eloqua.bulk.runExport('activities', exportName, fields, filter);
      expect(results.count).to.be.a('number');
    });
  });

  describe('getExportStream', function () {
    this.timeout(60000);

    it('should create a stream with the results', async () => {
      const stream = await eloqua.bulk.getExportStream('activities', exportName, fields, filter);
      // console.log(results);
      // let count = 0;
      return new Promise((resolve, reject) => {
        stream
        .on('data', () => {})
        .on('end', resolve)
        .on('error', reject);
      });
    });

    it('should work if the export returns no data', async () => {
      // tslint:disable-next-line:max-line-length
      const emptyFilter = "'{{Activity.Type}}'='FormSubmit' AND '{{Activity.CreatedAt}}' > '2019-02-10 13:00:00.000' AND '{{Activity.CreatedAt}}' < '2019-02-10 13:00:00.000'";
      const stream = await eloqua.bulk.getExportStream('activities', exportName, fields, filter);
      return new Promise((resolve, reject) => {
        stream
          .on('data', () => { })
          .on('end', resolve)
          .on('error', reject);
      });
    });
  });
});
