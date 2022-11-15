import { expect } from 'chai';
import Eloqua from '../lib/client';

describe('accounts', function () {
  const eloqua = new Eloqua({
    siteName: process.env.siteName!,
    userName: process.env.username!,
    password: process.env.password!,
  });

  describe('getAll', () => {
    it('should return a list of accounts', async () => {
      const results = await eloqua.accounts.getAll();
      expect(results.elements).to.be.an('array');
      expect(results.page).to.be.a('number');
      expect(results.pageSize).to.be.a('number');
      expect(results.total).to.be.a('number');
    });
  });

  describe('get', () => {
    let accountId: number;

    before(async () => {
      const results = await eloqua.accounts.getAll();
      const account = results && results.elements && results.elements[0];
      accountId = account.id;
    });

    it('should return a single account', async () => {
      const account = await eloqua.accounts.get(accountId);
      expect(account.id).to.equal(accountId);
      expect(account.id).to.equal(accountId);
      expect(account.fieldValues).to.be.an('array');
      expect(account.depth).to.equal('complete');
    });

    it('should take into account the depth parameter', async () => {
      const account = await eloqua.accounts.get(accountId, {
        depth: 'partial',
      });
      expect(account.id).to.equal(accountId);
      expect(account.id).to.equal(accountId);
      expect(account.depth).to.equal('partial');
      // this should not return in partial or minimal mode
      // (https://docs.oracle.com/cloud/latest/marketingcs_gs/OMCAB/index.html#CSHID=RequestDepth)
    });
  });
});
