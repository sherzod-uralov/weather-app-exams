import { render, screen } from '@testing-library/react'
import Nav from '../components/Nav.jsx'

test('renders Nav component', () => {
    render(<Nav />)

    // Verify that the component renders correctly
    const weatherLogo = screen.getByAltText('weatherLogo')
    expect(weatherLogo).toBeInTheDocument()
})
