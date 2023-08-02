import { render, screen } from '@testing-library/react'
import App from './App'

test('renders page', () => {
  render(<App />)
  const fileNameElement = screen.getByText(/React Test App/i)
  expect(fileNameElement.innerHTML).toMatch(/React Test App/i)
})
