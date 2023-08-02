export default function File (props) {
  return (
    <tr>
      <td>{props.file}</td>
      <td>{props.text}</td>
      <td>{props.number}</td>
      <td>{props.hex}</td>
    </tr>
  )
}
