import { expect } from 'chai';
import Eloqua from '../lib/client';

describe('contact_list', function () {
  const eloqua = new Eloqua({
    siteName: process.env.siteName!,
    userName: process.env.username!,
    password: process.env.password!,
  });

  describe('getAll', () => {
    it('should return a list of contact lists', async () => {
      const results = await eloqua.contacts.lists.getAll();
      const { elements = {} } = results;
      expect(elements).to.be.an('array');
      expect(results.page).to.be.a('number');
      expect(results.pageSize).to.be.a('number');
      expect(results.total).to.be.a('number');
      const list = elements && elements[0];
      expect(list.type).to.be.a('string');
      expect(list.name).to.be.a('string');
    });
  });

  describe('get', () => {
    let contactSegmentId: number;

    before(async () => {
      const results = await eloqua.contacts.lists.getAll();
      const segment = results && results.elements && results.elements[0];
      contactSegmentId = segment.id;
    });

    it('should return a contact segment', async () => {
      const list = await eloqua.contacts.lists.get(contactSegmentId);
      expect(list.id).to.equal(contactSegmentId);
      expect(list.type).to.be.an('string');
      expect(list.name).to.be.a('string');
    });
  });
});
