import React from 'react';

interface TestimonialCardProps {
  stars?: string;
  starsAlt?: string;
  quote: string;
  avatar?: string;
  avatarAlt?: string;
  name: string;
  company: string;
  rating?: number;
  className?: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  stars,
  starsAlt = 'Rating stars',
  quote,
  avatar,
  avatarAlt = 'Avatar',
  name,
  company,
  rating = 5,
  className = '',
}) => {
  // Generate stars based on rating
  const renderStars = () => {
    if (stars) {
      return (
        <div className="h-5 md:h-6 shrink-0 w-32 md:w-40">
          <img src={stars} alt={starsAlt} className="w-full h-full object-contain" />
        </div>
      );
    }
    
    // Render star icons based on rating
    return (
      <div className="flex gap-1 shrink-0">
        {Array.from({ length: 5 }).map((_, index) => (
          <svg
            key={index}
            className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div
      className={`bg-white border border-[#006b6a] w-full rounded-lg md:rounded-xl transition-all duration-300 hover:shadow-xl hover:border-[#5e3bee] hover:-translate-y-1 h-full ${className}`}
    >
      <div className="flex flex-col gap-6 md:gap-8 lg:gap-10 items-start justify-between p-6 md:p-8 lg:p-10 rounded-lg md:rounded-xl w-full h-full">
        <div className="flex flex-col gap-6 md:gap-8 w-full">
          {renderStars()}
          <p className="font-normal leading-[1.5] text-base md:text-lg text-[#1c1e53] w-full line-clamp-4">
            {quote}
          </p>
        </div>
        <div className="flex gap-4 md:gap-5 items-center shrink-0 mt-auto">
          {avatar && (
            <div className="relative shrink-0 w-12 h-12 md:w-16 md:h-16 lg:w-[74.667px] lg:h-[74.667px]">
              <img
                src={avatar}
                alt={avatarAlt}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          )}
          <div className="flex flex-col items-start leading-[1.5] text-base md:text-lg">
            <p className="font-semibold text-[#282938]">{name}</p>
            <p className="font-normal text-[#1c1e53]">{company}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

