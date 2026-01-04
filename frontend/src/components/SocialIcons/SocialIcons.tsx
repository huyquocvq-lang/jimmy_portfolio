import React from 'react';
import type { IconType } from 'react-icons';

interface SocialIcon {
  name: string;
  icon?: string; // For backward compatibility with image URLs
  IconComponent?: IconType; // React icon component from react-icons
  iconAlt?: string;
  url?: string;
}

interface SocialIconsProps {
  icons: SocialIcon[];
  className?: string;
}

export const SocialIcons: React.FC<SocialIconsProps> = ({
  icons,
  className = '',
}) => {
  return (
    <div className={`flex gap-4 items-center justify-end ${className}`}>
      {icons.map((social, index) => {
        const IconComponent = social.IconComponent;
        
        return (
          <a
            key={index}
            href={social.url || '#'}
            className="relative shrink-0 w-8 h-8 hover:opacity-70 transition-opacity flex items-center justify-center"
            aria-label={social.name}
          >
            {IconComponent ? (
              <IconComponent className="w-full h-full" />
            ) : social.icon ? (
              <img
                src={social.icon}
                alt={social.iconAlt || social.name}
                className="w-full h-full object-contain"
              />
            ) : null}
          </a>
        );
      })}
    </div>
  );
};

