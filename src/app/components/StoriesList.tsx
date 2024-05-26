import React, { useEffect, useState } from 'react';
import FullScreenStoryViewer from './FullScreenStoryViewe';

interface Story {
  id: number;
  imageUrl: string;
  duration: number;
}

const StoriesList: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [animationStyle, setAnimationStyle] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
   const [showFullScreenViewer, setShowFullScreenViewer] = useState(false);
  const [fullScreenInitialIndex, setFullScreenInitialIndex] = useState(0);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch('/api/stories');
        if (!response.ok) {
          throw new Error(`Failed to fetch stories: ${response.status}`);
        }
        const data = await response.json();
        setStories(data.stories);
      } catch (error) {
        console.error(error);
      }
    };
    fetchStories();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === stories.length - 1 ? 0 : prevIndex + 1
      );
    }, stories[currentIndex]?.duration || 5000);
    return () => clearTimeout(timer);
  }, [currentIndex, stories.length]);

  const goToPreviousStory = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? stories.length - 1 : prevIndex - 1
    );
    setAnimationStyle('transform transition-transform duration-500 translate-x-full');
    setTimeout(() => {
      setAnimationStyle('');
    }, 500);
    setHoveredIndex(null); // Reset hovered index when going to the previous story
  };

  const goToNextStory = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === stories.length - 1 ? 0 : prevIndex + 1
    );
    setAnimationStyle('transform transition-transform duration-500 -translate-x-full');
    setTimeout(() => {
      setAnimationStyle('');
    }, 500);
    setHoveredIndex(null); // Reset hovered index when going to the next story
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchDifference = touchStartX - touchEndX;

    if (touchDifference > 50) {
      goToNextStory();
    } else if (touchDifference < -50) {
      goToPreviousStory();
    }
  };

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

   const openFullScreenViewer = (index: number) => {
    setFullScreenInitialIndex(index);
    setShowFullScreenViewer(true);
  };

  return (
    <>
     {showFullScreenViewer && (
        <FullScreenStoryViewer
          stories={stories}
          initialIndex={fullScreenInitialIndex}
          onClose={() => setShowFullScreenViewer(false)}
        />
      )}
    <div className="overflow-x-scroll w-full h-48 flex items-center justify-center">
      <div className="flex space-x-4">
        {stories.slice(currentIndex, currentIndex + 4).map((story, index) => (
          <div
            key={story.id}
            className={`w-24 h-24 bg-gray-300 rounded-full overflow-hidden cursor-pointer ${
              ( index === hoveredIndex ) ? 'border-4 border-pink-700' : ''
            }`}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={index === 3 ? goToNextStory : index === 0 ? goToPreviousStory : undefined}
            style={{ transform: index === 9 ? animationStyle : index === 0 ? animationStyle : '' }}
          >
            <img
            onClick={() => openFullScreenViewer(index)}
              src={story.imageUrl}
              alt={`Story ${story.id}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default StoriesList;
