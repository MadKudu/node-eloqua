import { expect } from 'chai';
import Eloqua from '../lib/client';

describe('contacts', function () {
  const eloqua = new Eloqua({
    siteName: process.env.siteName!,
    userName: process.env.username!,
    password: process.env.password!,
  });

  describe('getAll', () => {
    it('should return a list of contacts', async () => {
      const results = await eloqua.contacts.getAll();
      expect(results.elements).to.be.an('array');
      expect(results.page).to.be.a('number');
      expect(results.pageSize).to.be.a('number');
      expect(results.total).to.be.a('number');
    });
  });

  describe('get', () => {
    let contactId: number;

    before(async () => {
      const results = await eloqua.contacts.getAll();
      const contact = results && results.elements && results.elements[0];
      contactId = contact.id;
    });

    it('should return a single contact', async () => {
      const contact = await eloqua.contacts.get(contactId);
      expect(contact.id).to.equal(contactId);
      expect(contact.id).to.equal(contactId);
      expect(contact.fieldValues).to.be.an('array');
      expect(contact.emailAddress).to.be.a('string');
    });

    it('should take into account the depth parameter', async () => {
      const contact = await eloqua.contacts.get(contactId, {
        depth: 'partial',
      });
      expect(contact.id).to.equal(contactId);
      expect(contact.id).to.equal(contactId);
      expect(contact.emailAddress).to.be.a('string');
      expect(contact.fieldValues).to.be.an('undefined');
      // this should not return in partial or minimal mode
      // (https://docs.oracle.com/cloud/latest/marketingcs_gs/OMCAB/index.html#CSHID=RequestDepth)
    });
  });
});
