// pages/api/stories.ts

import { NextApiRequest, NextApiResponse } from 'next'

type Story = {
  id: number
  imageUrl: string
  duration: number
}

type ResponseData = {
  stories: Story[]
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const dummyStories: Story[] = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    imageUrl: `https://picsum.photos/300/200?random=${index + 1}`,
    duration: 5000, // Set duration as per your requirement
  }))

  res.status(200).json({ stories: dummyStories })
}
