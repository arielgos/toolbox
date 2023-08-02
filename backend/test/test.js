const expect = require('chai').expect
const http = require('http')

const WS_URL = 'http://localhost:8080'
const WS_URL_FILES = WS_URL + '/files'
const WS_URL_FILES_LIST = WS_URL + '/files/list'
const WS_URL_FILENAME = WS_URL + '/files?fileName=test2.csv'
const UTF8 = 'utf8'

it('Check Health Status', function (done) {
  http.get(WS_URL, response => {
    response.on('data', data => {
      expect(data.toString(UTF8)).to.equal('It\'s alive')
      done()
    })
  }).end()
})

describe('List and filter files', () => {
  it('List Files', function (done) {
    this.timeout(15000)
    http.get(WS_URL_FILES, response => {
      response.on('data', data => {
        expect(JSON.parse(data.toString(UTF8))).to.be.an('array')
        done()
      })
    }).end()
  })

  it('List a specific file', function (done) {
    this.timeout(15000)
    http.get(WS_URL_FILENAME, response => {
      response.on('data', data => {
        const result = JSON.parse(data.toString(UTF8))
        expect(result).to.be.an('array') && expect(result).to.have.nested.property('[0].file').equal('test2.csv')
        done()
      })
    }).end()
  })


  it('List a raw file list', function (done) {
    this.timeout(15000)
    http.get(WS_URL_FILES_LIST, response => {
      response.on('data', data => {
        expect(JSON.parse(data.toString(UTF8))).to.have.property('files')
        done()
      })
    }).end()
  })
})
