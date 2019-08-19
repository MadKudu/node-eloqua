import { expect } from 'chai';
import Eloqua from '../lib/client';

describe('account_field', function () {
  this.timeout(10000);
  const eloqua = new Eloqua({
    siteName: process.env.siteName,
    userName: process.env.username,
    password: process.env.password
  });

  describe('getAll', () => {
    it('should return a list of account fields', async () => {
      const results = await eloqua.accounts.fields.getAll();
      // console.log(results);
      const { elements = {} } = results;
      expect(elements).to.be.an('array');
      expect(results.page).to.be.a('number');
      expect(results.pageSize).to.be.a('number');
      expect(results.total).to.be.a('number');
      const field = elements && elements[0];
      expect(field.type).to.be.a('string');
      expect(field.name).to.be.a('string');
    });
  });

  describe('get', () => {
    let accountFieldId: number;

    before(async () => {
      const results = await eloqua.accounts.fields.getAll();
      const field = results && results.elements && results.elements[0];
      accountFieldId = field.id;
    });

    it('should return a account field', async () => {
      const field = await eloqua.accounts.fields.get(accountFieldId);
      // console.log(field)
      expect(field.id).to.equal(accountFieldId);
      expect(field.type).to.be.an('string');
      expect(field.name).to.be.a('string');
    });
  });
});
