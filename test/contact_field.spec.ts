import { expect } from 'chai';
import Eloqua from '../lib/client';

describe('contact_field', function () {
  const eloqua = new Eloqua({
    siteName: process.env.siteName!,
    userName: process.env.username!,
    password: process.env.password!,
  });

  describe('getAll', () => {
    it('should return a list of contact fields', async () => {
      const results = await eloqua.contacts.fields.getAll();
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
    let contactFieldId: number;

    before(async () => {
      const results = await eloqua.contacts.fields.getAll();
      const field = results && results.elements && results.elements[0];
      contactFieldId = field.id;
    });

    it('should return a contact field', async () => {
      const field = await eloqua.contacts.fields.get(contactFieldId);
      expect(field.id).to.equal(contactFieldId);
      expect(field.type).to.be.an('string');
      expect(field.name).to.be.a('string');
    });
  });
});
