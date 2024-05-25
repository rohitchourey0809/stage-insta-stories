"use client"
import React, { useEffect } from 'react'

type StoryProps = {
  imageUrl: string
  duration: number
  onNext: () => void
}

const Story: React.FC<StoryProps> = ({ imageUrl, duration, onNext }) => {
  useEffect(() => {
    const timer = setTimeout(onNext, duration)
    return () => clearTimeout(timer)
  }, [duration, onNext])

  return (
    <div className="story">
      <img src={imageUrl} alt="Story" />
      <style jsx>{`
        .story {
          position: relative;
          width: 100%;
          height: 100%;
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>
    </div>
  )
}

export default Story
