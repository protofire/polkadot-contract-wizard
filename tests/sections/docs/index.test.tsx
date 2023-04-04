import { render, screen } from '@testing-library/react'
import Docs from '@pages/docs'

describe('Home', () => {
  it('renders a heading', () => {
    render(<Docs />)

    const heading = screen.getByRole('heading', {
      name: /Learn more about Polkadot Contract Wizard/i
    })

    expect(heading).toBeInTheDocument()
  })
})
