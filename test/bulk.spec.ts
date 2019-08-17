import { expect } from 'chai';
import Eloqua from '../lib/client';

const name = 'MK FormSubmit';
const fields =  {
  ActivityId: '{{Activity.Id}}',
  ActivityType: '{{Activity.Type}}',
  ActivityDate: '{{Activity.CreatedAt}}',
  ContactId: '{{Activity.Contact.Id}}',
  AssetType: '{{Activity.Asset.Type}}',
  AssetName: '{{Activity.Asset.Name}}'
};
// tslint:disable-next-line:max-line-length
const filter = "'{{Activity.Type}}'='FormSubmit' AND '{{Activity.CreatedAt}}' >= '2019-02-10' AND '{{Activity.CreatedAt}}' < '2019-02-11'";

describe('bulk', function () {
  this.timeout(10000);
  const eloqua = new Eloqua({
    siteName: process.env.siteName,
    userName: process.env.username,
    password: process.env.password
  });

  describe('createExport', () => {
    it('should create an expoert', async () => {
      const results = await eloqua.bulk.createExport(name, fields, filter);
      // console.log(results);
      const { uri, createdBy } = results;
      expect(uri).to.contain('/activities/exports/');
      expect(createdBy.toLowerCase()).to.equal(process.env.username);
    });
  });

  describe('createSync', () => {
    let exportUri: string;

    before(async () => {
      const { uri } = await eloqua.bulk.createExport(name, fields, filter);
      exportUri = uri;
    });

    it('should start a sync', async () => {
      const results = await eloqua.bulk.createSync(exportUri);
      console.log(results);
      const { uri, createdBy, status } = results;
      expect(uri).to.contain('/syncs/');
      expect(createdBy.toLowerCase()).to.equal(process.env.username);
      expect(status).to.be.a('string');
    });
  });

  describe('checkSync', () => {
    let exportUri: string;
    let syncUri: string;

    before(async () => {
      const { uri } = await eloqua.bulk.createExport(name, fields, filter);
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
      expect(createdBy.toLowerCase()).to.equal(process.env.username);
      expect(status).to.be.a('string');
    });
  });
});
