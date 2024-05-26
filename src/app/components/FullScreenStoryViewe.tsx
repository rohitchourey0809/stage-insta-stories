import React, { useEffect, useState } from 'react';

interface Story {
  id: number;
  imageUrl: string;
  duration: number;
}

interface FullScreenStoryViewerProps {
  stories: Story[];
  initialIndex: number;
  onClose: () => void;
}

const FullScreenStoryViewer: React.FC<FullScreenStoryViewerProps> = ({ stories, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const currentStory = stories[currentIndex];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % stories.length);
    }, currentStory?.duration || 5000);

    return () => clearInterval(intervalId);
  }, [currentIndex, currentStory, stories]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;

    if (x < rect.width / 2) {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? stories.length - 1 : prevIndex - 1));
    } else {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % stories.length);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black z-50 flex flex-col items-center justify-center" onClick={handleClick}>
      <div className="relative w-full h-full">
        <div className="absolute top-4 left-4 right-4 flex justify-between z-10">
          {stories.map((story, index) => (
            <div key={index} className="flex-1 mx-1 bg-gray-500 h-1">
              <div
                className="bg-blue-500 h-full"
                style={{ animation: currentIndex === index ? `progress ${story.duration || 5000}ms linear` : 'none' }}
              />
            </div>
          ))}
        </div>
        {stories.map((story, index) => (
          <img
            key={story.id}
            src={story.imageUrl}
            alt={`Story ${story.id}`}
            className="absolute top-0 left-0 w-full h-full object-cover"
            style={{
              opacity: index >= currentIndex && index < currentIndex + 5 ? 1 : 0,
              transition: `opacity ${story.duration || 5000}ms ease-in-out`,
            }}
          />
        ))}
        <button className="absolute top-4 right-4 bg-white text-black px-4 py-2 rounded" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default FullScreenStoryViewer;
