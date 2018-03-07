const chai = require('chai')
const expect = chai.expect
const Eloqua = require('..')

describe('contact_segment', function () {
  this.timeout(10000)
  let eloqua = new Eloqua({ siteName: process.env.siteName, username: process.env.username, password: process.env.password })

  describe('getAll', function () {
    it('should return a list of segments', async () => {
      const results = await eloqua.contacts.segments.getAll()
      // console.log(results)
      const { elements = {} } = results
      expect(elements).to.be.an('array')
      expect(results.page).to.be.a('number')
      expect(results.pageSize).to.be.a('number')
      expect(results.total).to.be.a('number')
      const segment = elements && elements[0]
      expect(segment.type).to.be.a('string')
      expect(segment.name).to.be.a('string')
    })
  })

  describe('get', function () {
    let contactSegmentId

    before(async () => {
      const results = await eloqua.contacts.segments.getAll()
      const segment = results && results.elements && results.elements[0]
      contactSegmentId = segment.id
    })

    it('should return a contact segment', async () => {
      const segment = await eloqua.contacts.segments.get(contactSegmentId)
      // console.log(segment)
      expect(segment.id).to.equal(contactSegmentId)
      expect(segment.type).to.be.an('string')
      expect(segment.name).to.be.a('string')
    })
  })
})
