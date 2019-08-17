import axios, { AxiosRequestConfig } from 'axios';
import Debug from 'debug';
import * as EventEmitter from 'events';
import * as _ from 'lodash';
import Bulk from './bulk';
import Contact from './contact';
import EloquaError from './errors';

const debug = Debug('eloqua:client');

// define how long to wait API response before throwing a timeout error
// const API_TIMEOUT = 15000
// const MAX_USE_PERCENT_DEFAULT = 90

type EloquaOptions = {
  loginUrl?: string;
  baseUrl?: string;
  siteName: string;
  userName: string;
  password: string;
};

export default class EloquaClient extends EventEmitter {
  qs: any;
  auth: {
    username: string;
    password: string;
  };
  loginUrl: string;
  baseUrl: string;
  apiCalls: number;
  contacts: any;
  bulk: any;

  constructor (options: EloquaOptions) {
    super();
    this.qs = {};
    this.auth = { username: undefined, password: undefined };
    this.setAuth(options);
    // this.setOAuth(options)
    this.loginUrl = options.loginUrl || 'https://login.eloqua.com/id';
    this.baseUrl = options.baseUrl;
    // this.apiTimeout = options.timeout || API_TIMEOUT
    this.apiCalls = 0;
    this.on('apiCall', (params: any) => {
      debug('apiCall', params);
      this.apiCalls += 1;
    });

    this.contacts = new Contact(this);
    this.bulk = new Bulk(this);
  }

  setAuth (options: EloquaOptions) {
    if (!options.siteName) {
      throw new Error('A siteName needs to be provided');
    } else if (!options.userName) {
      throw new Error('A userName needs to be provided');
    } else if (!options.password) {
      throw new Error('A password needs to be provided');
    }
    this.auth = {
      username: `${options.siteName}\\${options.userName}`,
      password: `${options.password}`
    };
  }

  // tslint:disable-next-line: function-name
  async _init () {
    if (this.baseUrl) { return this.baseUrl; }
    this.baseUrl = await this.getBaseUrl();
  }

  async getBaseUrl () {
    // disable certificate checks - was getting inconsistent certificate results with this call
    // const agent = new https.Agent({ rejectUnauthorized: false })

    const params: AxiosRequestConfig = {
      url: this.loginUrl,
      auth: this.auth
      // httpsAgent: agent,
    };
    const response = await axios(params);
    const { data = {} } = response;
    const { urls = {} } = data;

    if (urls.base) {
      return urls.base;
    }
    throw new Error('Error obtaining baseUrl');
  }

  // tslint:disable-next-line: function-name
  async _request (opts: AxiosRequestConfig) {
    const params = _.cloneDeep(opts);
    if (this.auth) { params.auth = this.auth; }
    // params.json = true

    if (!this.baseUrl) { // if a baseUrl is provided or we're calling the login url, skip this
      await this._init();
    }
    params.baseURL = this.baseUrl;

    try {
      this.emit('apiCall', params);
      const response = await axios(params);
      const { data = {} } = response;
      return data;
    } catch (err) {
      throw new EloquaError(err);
    }
  }
}
