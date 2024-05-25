import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import StoriesList from '../components/StoriesList'

// Mock fetch to return a list of stories
beforeAll(() => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: async () => [
      { id: 1, imageUrl: '/images/story1.jpg', duration: 5000 },
      { id: 2, imageUrl: '/images/story2.jpg', duration: 5000 },
      { id: 3, imageUrl: '/images/story3.jpg', duration: 5000 },
    ],
  } as Response)
})

afterAll(() => {
  jest.restoreAllMocks()
})

describe('StoriesList', () => {
  it('renders stories and navigates between them', async () => {
    render(<StoriesList />)

    // Check if the first story is displayed
    const firstStoryImage = await screen.findByAltText('Story')
    expect(firstStoryImage).toHaveAttribute('src', '/images/story1.jpg')

    // Simulate clicking the "Next" button
    const nextButton = screen.getByText('Next')
    fireEvent.click(nextButton)

    // Check if the second story is displayed
    await waitFor(() => {
      expect(firstStoryImage).toHaveAttribute('src', '/images/story2.jpg')
    })

    // Simulate clicking the "Prev" button
    const prevButton = screen.getByText('Prev')
    fireEvent.click(prevButton)

    // Check if the first story is displayed again
    await waitFor(() => {
      expect(firstStoryImage).toHaveAttribute('src', '/images/story1.jpg')
    })
  })
})