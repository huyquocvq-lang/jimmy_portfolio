import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../Button';
import { Container } from '../Container';
import { FlipButton } from '../FlipButton';
import { useLanguage } from '../../contexts/LanguageContext';

interface NavbarProps {
  logo?: string;
  logoAlt?: string;
  menuItems?: Array<{ label: string; href: string; active?: boolean }>;
  onContactClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  logo,
  logoAlt = 'Logo',
  menuItems = [
    { label: 'Home', href: '#home', active: true },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'About me', href: '#about' },
    { label: 'Testimonials', href: '#testimonials' },
  ],
  onContactClick,
}) => {
  const { language, toggleLanguage } = useLanguage();
  const isExternalLink = (href: string) => href.startsWith('#') || href.startsWith('http');

  return (
    <nav className="bg-white shadow-[0px_5.333px_80px_0px_rgba(0,0,0,0.1)] h-20 md:h-24 lg:h-[120px] flex items-center py-0">
      <Container maxWidth="xl" className="w-full">
        <div className="flex gap-4 md:gap-6 lg:gap-10 items-center justify-between w-full">
          <div className="flex gap-3 md:gap-4 items-center">
            {logo && (
              <Link to="/" className="h-8 md:h-10 w-32 md:w-40 lg:w-48 shrink-0">
                <img src={logo} alt={logoAlt} className="w-full h-full object-contain" />
              </Link>
            )}
            <FlipButton
              variant="outline"
              size="sm"
              from="top"
              onClick={toggleLanguage}
              isFlipped={language === 'en'}
              className="text-sm md:text-base min-w-[60px]"
              aria-label="Toggle language"
            >
              <span>VI</span>
              <span>EN</span>
            </FlipButton>
          </div>
          <div className="hidden md:flex font-normal gap-4 lg:gap-10 items-center text-base lg:text-lg leading-[1.5]">
            {menuItems.map((item, index) => {
              const className = `shrink-0 ${
                item.active ? 'text-[#5e3bee]' : 'text-[#1c1e53]'
              } hover:text-[#5e3bee] transition-colors`;
              
              if (isExternalLink(item.href)) {
                return (
                  <a
                    key={index}
                    href={item.href}
                    className={className}
                  >
                    {item.label}
                  </a>
                );
              }
              
              return (
                <Link
                  key={index}
                  to={item.href}
                  className={className}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
          <Button variant="outline" onClick={onContactClick} className="text-sm md:text-base">
            Contact Me
          </Button>
        </div>
      </Container>
    </nav>
  );
};

