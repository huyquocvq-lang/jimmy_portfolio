import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { SectionTitle } from '../components/SectionTitle';
import { ServiceCard } from '../components/ServiceCard';
import { AboutSection } from '../components/AboutSection';
import { ProjectCard } from '../components/ProjectCard';
import { TestimonialCard } from '../components/TestimonialCard';
import { ContactForm } from '../components/ContactForm';
import { Button } from '../components/Button';
import { Container } from '../components/Container';
import { Animated, AnimatedList } from '../components/Animated';
import { LatestStories } from '../components/LatestStories';
import { Carousel } from '../components/Carousel';
import { skillApi, projectApi, blogApi, testimonialApi } from '../services/api';
import type { Skill, Project, BlogPostListItem, Testimonial } from '../services/api';
import { useLanguage } from '../contexts/LanguageContext';

// Image URLs from Figma (these would be replaced with actual image imports)
const images = {
  logo: 'https://www.figma.com/api/mcp/asset/2d613df7-1149-428e-a2f5-8f1fe969b468',
  heroImage: 'https://www.figma.com/api/mcp/asset/a7e31cdd-975a-4ca8-9f43-fac4c728e5b7',
  aboutMe: 'https://www.figma.com/api/mcp/asset/570b6562-30d0-4025-986a-0f1513643c94',
  productChain: 'https://www.figma.com/api/mcp/asset/494f6294-2064-44d9-9b58-f3715ad96365',
  tag: 'https://www.figma.com/api/mcp/asset/3fcad0fa-0413-49a8-9728-f2e6fdc16e74',
  featherPen1: 'https://www.figma.com/api/mcp/asset/4d6c5c99-0050-4899-be17-73f47195af6e',
  featherPen2: 'https://www.figma.com/api/mcp/asset/260872fa-8ab4-4193-a059-677b02656b8c',
  project1: 'https://www.figma.com/api/mcp/asset/0155fdb9-55b8-4fc9-b97d-08a48026086b',
  project2: 'https://www.figma.com/api/mcp/asset/26329701-4aad-44fd-8065-712985d6e61c',
  project3: 'https://www.figma.com/api/mcp/asset/8a4f3db5-75c0-4adc-9c7c-36ea627cc840',
  testimonial1: 'https://www.figma.com/api/mcp/asset/85e760fc-decf-498c-925f-13178e258228',
  testimonial2: 'https://www.figma.com/api/mcp/asset/d5b1c1f6-6d11-428e-83c2-43c5e2186692',
  testimonial3: 'https://www.figma.com/api/mcp/asset/528ab1ab-15dd-452e-a436-2ce0658be45c',
  stars: 'https://www.figma.com/api/mcp/asset/965d6b85-8b24-47fe-8db4-e057060259c2',
  facebook: 'https://www.figma.com/api/mcp/asset/183c0738-adb6-4522-8126-eb4b36149542',
  instagram: 'https://www.figma.com/api/mcp/asset/509860c3-bd02-4480-a469-cb6233c8e854',
  twitter: 'https://www.figma.com/api/mcp/asset/0e7a89ee-7e0e-48cf-95ec-6009a74decdc',
  linkedin: 'https://www.figma.com/api/mcp/asset/23ea53ab-4ac3-4652-bbbf-fac2e035414a',
  dribbble: 'https://www.figma.com/api/mcp/asset/1fb2f610-c26b-4891-88ee-1bff1dd06a81',
  arrow: 'https://www.figma.com/api/mcp/asset/deb0af08-f713-48e8-b5c7-b57c75fdccdf',
};

// Helper function to generate slug from title
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const LandingPage: React.FC = () => {
  const { language } = useLanguage();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [skillsLoading, setSkillsLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [blogs, setBlogs] = useState<BlogPostListItem[]>([]);
  const [blogsLoading, setBlogsLoading] = useState(true);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [testimonialsLoading, setTestimonialsLoading] = useState(true);

  useEffect(() => {
    loadSkills();
    loadProjects();
    loadBlogs();
    loadTestimonials();
  }, [language]);

  const loadSkills = async () => {
    setSkillsLoading(true);
    try {
      const response = await skillApi.getSkills(language);
      setSkills(response.data);
    } catch (error) {
      console.error('Failed to load skills:', error);
      setSkills([]);
    } finally {
      setSkillsLoading(false);
    }
  };

  const loadProjects = async () => {
    setProjectsLoading(true);
    try {
      const response = await projectApi.getProjects({ page: 1, limit: 6, lang: language });
      // Show top 6 projects on desktop, top 3 on mobile (already sorted by display_order from API)
      console.log('Projects loaded:', response.data);
      setProjects(response.data || []);
    } catch (error) {
      console.error('Failed to load projects:', error);
      setProjects([]);
    } finally {
      setProjectsLoading(false);
    }
  };

  const loadBlogs = async () => {
    setBlogsLoading(true);
    try {
      const response = await blogApi.getBlogs({ page: 1, limit: 4, lang: language, sort: 'newest' });
      setBlogs(response.data || []);
    } catch (error) {
      console.error('Failed to load blogs:', error);
      setBlogs([]);
    } finally {
      setBlogsLoading(false);
    }
  };

  const loadTestimonials = async () => {
    setTestimonialsLoading(true);
    try {
      const response = await testimonialApi.getTestimonials({ lang: language });
      setTestimonials(response.data || []);
    } catch (error) {
      console.error('Failed to load testimonials:', error);
      setTestimonials([]);
    } finally {
      setTestimonialsLoading(false);
    }
  };

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleGetInTouch = () => {
    handleContactClick();
  };

  const handleFormSubmit = (data: unknown) => {
    console.log('Form submitted:', data);
    // Handle form submission
  };

  return (
    <div className="bg-white relative w-full">
      <section id="home">
        <Hero
          greeting="Hey, I am John"
          title="I create product design and brand experience"
          highlightedText="product design "
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique."
          image={images.heroImage}
          onGetInTouch={handleGetInTouch}
        />
      </section>

      <section id="skills" className="flex flex-col gap-12 md:gap-16 lg:gap-20 items-start justify-center py-16 md:py-24 lg:py-36 w-full">
        <Container maxWidth="xl" className="w-full">
          <Animated animation="slideUp" delay={0.1}>
            <div className="flex flex-col gap-4 md:gap-5 items-start justify-center w-full mb-8 md:mb-12">
              <SectionTitle
                subtitle="My Skills"
                title="My Expertise"
                align="left"
              />
            </div>
          </Animated>
          {skillsLoading ? (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-600">Loading skills...</p>
            </div>
          ) : skills.length > 0 ? (
            <AnimatedList
              animation="slideUp"
              staggerDelay={0.08}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10 items-stretch w-full"
            >
              {skills.map((skill) => (
                <ServiceCard
                  key={skill.id}
                  icon={skill.icon_url || undefined}
                  title={skill.title}
                  description={skill.description}
                  highlighted={skill.highlighted}
                  slug={generateSlug(skill.title)}
                />
              ))}
            </AnimatedList>
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-600">No skills available</p>
            </div>
          )}
        </Container>
      </section>

      <section id="about">
        <AboutSection
          image={images.aboutMe}
          title="About Me"
          description={[
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce varius faucibus massa sollicitudin amet augue. Nibh metus a semper purus mauris duis. Lorem eu neque, tristique quis duis. Nibh scelerisque ac adipiscing velit non nulla in amet pellentesque.',
            '',
            'Sit turpis pretium eget maecenas. Vestibulum dolor mattis consectetur eget commodo vitae. Amet pellentesque sit pulvinar lorem mi a, euismod risus r.',
          ]}
        />
      </section>

      <section id="portfolio" className="flex flex-col gap-12 md:gap-16 lg:gap-20 items-start py-16 md:py-24 lg:py-36 w-full">
        <Container maxWidth="xl" className="w-full">
          <Animated animation="slideUp" delay={0.1}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 w-full mb-8 md:mb-12">
              <div className="flex flex-col gap-4 md:gap-5 items-start w-full sm:w-auto">
                <SectionTitle
                  subtitle="Recent Projects"
                  title="My Portfolio"
                  align="left"
                />
              </div>
              <Link to="/projects">
                <Button variant="social" className="flex items-center gap-2 md:gap-4 text-sm md:text-base">
                  <img src={images.dribbble} alt="Dribbble" className="w-6 h-6 md:w-8 md:h-8" />
                  Visit My Portfolio
                </Button>
              </Link>
            </div>
          </Animated>
          {projectsLoading ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Loading projects...</p>
            </div>
          ) : projects.length > 0 ? (
            <AnimatedList
              animation="scale"
              staggerDelay={0.1}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 w-full"
            >
              {projects.map((project, index) => {
                const shadowVariants: ('small' | 'medium' | 'large')[] = ['small', 'medium', 'large'];
                const shadowVariant = shadowVariants[index % 3] || 'medium';
                // Hide projects after index 2 (top 3) on mobile, show all on desktop
                const isHiddenOnMobile = index >= 3;
                
                return (
                  <div
                    key={project.id}
                    className={isHiddenOnMobile ? 'hidden md:block' : ''}
                  >
                    <ProjectCard
                      image={project.image_url || undefined}
                      title={project.title}
                      description={project.description}
                      linkUrl={`/projects/${project.slug}`}
                      linkText="View Project"
                      shadowVariant={shadowVariant}
                    />
                  </div>
                );
              })}
            </AnimatedList>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">No projects available</p>
            </div>
          )}
        </Container>
      </section>

      <section id="blog" className="flex flex-col gap-12 md:gap-16 lg:gap-20 items-start py-16 md:py-24 lg:py-36 w-full">
        <Container maxWidth="xl" className="w-full">
          <Animated animation="slideUp" delay={0.1}>
            <LatestStories blogs={blogs} loading={blogsLoading} />
          </Animated>
        </Container>
      </section>

      <section id="testimonials" className="bg-[#f5fcff] flex flex-col gap-12 md:gap-16 lg:gap-20 items-center py-16 md:py-24 lg:py-36 w-full">
        <Container maxWidth="xl" className="w-full">
          <Animated animation="slideUp" delay={0.1}>
            <div className="flex flex-col gap-4 md:gap-5 items-start text-[#282938] w-full mb-8 md:mb-12">
              <p className="font-semibold leading-[1.5] text-base md:text-lg">
                Clients Feedback
              </p>
              <p className="font-bold leading-[1.2] text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                Customer testimonials
              </p>
            </div>
          </Animated>
          {testimonialsLoading ? (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-600">Loading testimonials...</p>
            </div>
          ) : testimonials.length > 0 ? (
            <>
              {/* Carousel for mobile */}
              <div className="md:hidden w-full">
                <Carousel
                  slideDuration={4000}
                  autoPlay={true}
                  itemsPerView={1}
                >
                  {testimonials.map((testimonial) => (
                    <TestimonialCard
                      key={testimonial.id}
                      quote={testimonial.quote}
                      name={testimonial.name}
                      company={testimonial.company}
                      avatar={testimonial.avatar_url || undefined}
                      rating={testimonial.rating}
                    />
                  ))}
                </Carousel>
              </div>
              {/* Grid for desktop */}
              <div className="hidden md:block w-full">
                <AnimatedList
                  animation="slideUp"
                  staggerDelay={0.1}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 items-stretch w-full"
                >
                  {testimonials.map((testimonial) => (
                    <TestimonialCard
                      key={testimonial.id}
                      quote={testimonial.quote}
                      name={testimonial.name}
                      company={testimonial.company}
                      avatar={testimonial.avatar_url || undefined}
                      rating={testimonial.rating}
                    />
                  ))}
                </AnimatedList>
              </div>
            </>
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-600">No testimonials available</p>
            </div>
          )}
        </Container>
      </section>

      <section id="contact">
        <ContactForm onSubmit={handleFormSubmit} />
      </section>
    </div>
  );
};

