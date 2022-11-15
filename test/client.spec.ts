import { expect } from 'chai';
import Eloqua from '../lib/client';

describe('client', () => {
  let eloqua: any;

  before(() => {
    eloqua = new Eloqua({
      siteName: process.env.siteName!,
      userName: process.env.username!,
      password: process.env.password!,
    });
  });

  describe('methods', () => {
    it('should check to see if client has all endpoints defined', () => {
      expect(eloqua.contacts).to.be.a('object');
    });
  });

  describe('getBaseUrl', () => {
    it('should obtain a baseUrl from the login endpoint', async () => {
      const baseUrl = await eloqua.getBaseUrl();
      expect(baseUrl).to.be.a('string');
      expect(baseUrl).to.contain('secure');
      expect(baseUrl).to.contain('eloqua.com');
    });
  });

  describe('_init', () => {
    it('should set the baseUrl parameter on the client', async () => {
      await eloqua._init();
      expect(eloqua.baseUrl).to.be.a('string');
      expect(eloqua.baseUrl).to.contain('secure');
      expect(eloqua.baseUrl).to.contain('eloqua.com');
    });
  });
});
