const express = require('express')
const cors = require('cors')
const https = require('https')
const app = express()
const PORT = process.env.PORT || 8080

const WS_PORT = 443
const WS_URL = 'echo-serv.tbxnet.com'
const GET_METHOD = 'GET'
const TOKEN = 'Bearer aSuperSecretKey'
const CONTENT_TYPE = 'Content-Type'
const CONTENT_TYPE_JSON = 'application/json'
const CORS_ORIGIN = 'http://localhost:3000'

const options = {
  host: WS_URL,
  port: WS_PORT,
  method: GET_METHOD,
  headers: {
    authorization: TOKEN
  }
}

function getFiles () {
  options.path = '/v1/secret/files'
  return new Promise(resolve => {
    https.request(options, (res) => {
      res.on('data', (data) => {
        resolve(JSON.parse(data.toString('utf8')))
      })
    }).end()
  })
}

function getFile (fileName) {
  options.path = '/v1/secret/file/' + fileName
  return new Promise(resolve => {
    https.request(options, (res) => {
      res.on('data', (data) => {
        const content = data.toString('utf8').split('\n')
        content.shift()
        const lines = []
        for (let j = 0; j < content.length; j++) {
          const lineContent = content[j].split(',')
          lines.push({
            text: lineContent[1] ?? '',
            number: lineContent[2] ?? '',
            hex: lineContent[3] ?? ''
          })
        }
        resolve(lines)
      })
    }).end()
  })
}

app.use(express.json())
app.use(cors({
  origin: CORS_ORIGIN
}))

// health status check
app.get('/', (_, response) => {
  response.setHeader(CONTENT_TYPE, CONTENT_TYPE_JSON)
  response.send('It\'s alive')
})

// file list enpoint
app.get('/files', async (request, response) => {
  const results = []
  let files = await getFiles()
  files = files.files ?? []
  files = files.filter(fileName => fileName.includes(request.query.fileName ?? ''))
  for (let i = 0; i < files.length; i++) {
    const lines = await getFile(files[i])
    if (lines.length > 0) {
      results.push({
        file: files[i],
        lines
      })
    }
  }
  response.setHeader(CONTENT_TYPE, CONTENT_TYPE_JSON)
  response.send(results)
})

// file list raw data endpoint
app.get('/files/list', async (_, response) => {
  response.setHeader(CONTENT_TYPE, CONTENT_TYPE_JSON)
  response.send(await getFiles())
})

app.listen(PORT, () => {
  console.log('Server Listening on PORT:', PORT)
})
