import Table from 'react-bootstrap/Table'
import File from './File'

export default function Files (props) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>File Name</th>
          <th>Text</th>
          <th>Number</th>
          <th>Hex</th>
        </tr>
      </thead>
      <tbody>
        {props.files.map((file, index) => (
          file.lines.filter((item) => {
            return (item.number !== '' && item.hex !== '') || props.withBlanks
          }).map((element, line) => (
            <File
              key={index + '-' + line}
              file={file.file}
              text={element.text}
              number={element.number}
              hex={element.hex}
            />
          ))
        ))}
      </tbody>
    </Table>
  )
}
