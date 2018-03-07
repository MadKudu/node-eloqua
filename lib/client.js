const _ = require('lodash')
const axios = require('axios')
const EventEmitter = require('events').EventEmitter

const Contact = require('./contact')

const debug = require('debug')('eloqua:client')

// define how long to wait API response before throwing a timeout error
// const API_TIMEOUT = 15000
// const MAX_USE_PERCENT_DEFAULT = 90

class Client extends EventEmitter {
  constructor (options = {}) {
    super()
    this.qs = {}
    this.auth = undefined
    this.setAuth(options)
    // this.setOAuth(options)
    this.loginUrl = options.loginUrl || 'https://login.eloqua.com/id'
    this.baseUrl = options.baseUrl
    // this.apiTimeout = options.timeout || API_TIMEOUT
    this.apiCalls = 0
    this.on('apiCall', params => {
      debug('apiCall', params)
      this.apiCalls += 1
    })

    this.contacts = new Contact(this)
  }

  // setAccessToken (accessToken) {
  //   this.accessToken = accessToken
  //   this.auth = { 'bearer': accessToken }
  // }

  // refreshAccessToken () {
  //   return this.oauth.refreshAccessToken()
  // }

  // setOAuth (options = {}) {
  //   this.clientId = options.clientId
  //   this.clientSecret = options.clientSecret
  //   this.redirectUri = options.redirectUri
  //   this.refreshToken = options.refreshToken
  // }

  setAuth (options = {}) {
    this.auth = {
      username: `${options.siteName}\\${options.username}`,
      password: `${options.password}`
    }
  }

  async _init () {
    if (this.baseUrl) { return this.baseUrl }
    this.baseUrl = await this.getBaseUrl()
  }

  async getBaseUrl () {
    const params = {
      url: this.loginUrl
    }
    const response = await this._request(params)
    const { data = {} } = response
    const { urls = {} } = data
    if (urls.base) {
      return urls.base
    } else {
      throw new Error('Error obtaining baseUrl')
    }
  }

  async _request (opts, cb = () => {}) {
    const params = _.cloneDeep(opts)
    if (this.auth) { params.auth = this.auth }
    // params.json = true

    if (!params.baseUrl && params.url !== this.loginUrl) { // if a baseUrl is provided or we're calling the login url, skip this
      await this._init()
    }
    params.baseURL = this.baseUrl

    // delete params.path
    // params.qs = _.extend({}, this.qs, params.qs)
    //
    // params.qsStringifyOptions = {
    //   arrayFormat: 'repeat'
    // }
    //
    // params.timeout = this.apiTimeout

    try {
      this.emit('apiCall', params)
      const response = await axios(params)
      cb(response)
      return response
    } catch (err) {
      cb(err)
      throw err
    }
  }
}

module.exports = Client
