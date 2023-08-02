import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import { useEffect, useState } from 'react'
import Files from './components/Files'

const WS_URL = 'http://localhost:8080/files'
const WS_FILENAME_PARAM = 'fileName'

function App() {
  const [files, setFiles] = useState([])
  const [fileName, setFileName] = useState('')
  const [withBlanks, setWithBlanks] = useState(false)

  const fetchFiles = (fileName = '') => {
    fetch(WS_URL + '?' + WS_FILENAME_PARAM + '=' + fileName)
      .then(response => response.json())
      .then(data => setFiles(data))
  }

  useEffect(() => {
    fetchFiles(fileName)
  }, [fileName])

  return (
    <Container fluid>
      <Row className='header'>
        <Col>
          React Test App
        </Col>
      </Row>

      <Form onSubmit={(event) => { event.preventDefault() }}>
        <Row>
          <Col xs={7} sm={9}>
            <Form.Control
              placeholder='Enter a file name to trigger a search'
              id='FileName'
              type='text'
              autoComplete='off'
              onChange={(event) => {
                setFileName(event.target.value)
              }}
            />
          </Col>
          <Col xs={5} sm={3}>
            <Form.Check
              type='switch'
              id='withBlanks'
              label='With Blanks'
              defaultChecked={withBlanks}
              onChange={() => {
                setWithBlanks(!withBlanks)
              }}
            />
          </Col>
        </Row>
      </Form>

      <Row>
        <Col>
          <Files
            files={files}
            withBlanks={withBlanks}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default App
