import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ProjectCard } from '../components/ProjectCard';
import { SectionTitle } from '../components/SectionTitle';
import { Container } from '../components/Container';
import { Button } from '../components/Button';
import { Pagination } from '../components/Pagination';
import { ProjectSearch } from '../components/ProjectSearch';
import { ProjectSort } from '../components/ProjectSort';
import { Animated, AnimatedList } from '../components/Animated';
import { projectApi } from '../services/api';
import type { Project, Pagination as PaginationType } from '../services/api';
import { useLanguage } from '../contexts/LanguageContext';

export const ProjectListPage: React.FC = () => {
  const { language } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const search = searchParams.get('search') || '';
  const sort = (searchParams.get('sort') || 'newest') as 'newest' | 'oldest' | 'name_asc' | 'name_desc';
  
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [pagination, setPagination] = useState<PaginationType>({
    page: 1,
    limit: 6,
    total: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);

  const loadProjects = useCallback(async () => {
    setLoading(true);
    try {
      // Load all projects for client-side filtering
      const response = await projectApi.getProjects({
        page: 1,
        limit: 1000, // Load all for client-side filtering
        lang: language,
      });
      setAllProjects(response.data || []);
    } catch (error) {
      console.error('Failed to load projects:', error);
      setAllProjects([]);
    } finally {
      setLoading(false);
    }
  }, [language]);

  // Filter and sort projects client-side
  const filteredAndSortedProjects = useMemo(() => {
    let filtered = [...allProjects];

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchLower) ||
          project.description.toLowerCase().includes(searchLower) ||
          project.technologies.some((tech) => tech.toLowerCase().includes(searchLower))
      );
    }

    // Apply sort
    filtered.sort((a, b) => {
      switch (sort) {
        case 'newest':
          const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
          const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
          return dateB - dateA;
        case 'oldest':
          const dateAOld = a.created_at ? new Date(a.created_at).getTime() : 0;
          const dateBOld = b.created_at ? new Date(b.created_at).getTime() : 0;
          return dateAOld - dateBOld;
        case 'name_asc':
          return a.title.localeCompare(b.title);
        case 'name_desc':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [allProjects, search, sort]);

  // Paginate filtered results
  const paginatedProjects = useMemo(() => {
    const startIndex = (page - 1) * 6;
    const endIndex = startIndex + 6;
    return filteredAndSortedProjects.slice(startIndex, endIndex);
  }, [filteredAndSortedProjects, page]);

  // Update pagination based on filtered results
  useEffect(() => {
    const total = filteredAndSortedProjects.length;
    const totalPages = Math.ceil(total / 6);
    setPagination({
      page,
      limit: 6,
      total,
      totalPages,
    });
  }, [filteredAndSortedProjects, page]);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', newPage.toString());
    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (searchTerm: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (searchTerm) {
      newParams.set('search', searchTerm);
    } else {
      newParams.delete('search');
    }
    newParams.set('page', '1'); // Reset to first page on search
    setSearchParams(newParams);
  };

  const handleSortChange = (newSort: 'newest' | 'oldest' | 'name_asc' | 'name_desc') => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('sort', newSort);
    newParams.set('page', '1'); // Reset to first page on sort
    setSearchParams(newParams);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <Container maxWidth="xl" className="w-full">
          <div className="text-center py-12">
            <p className="text-gray-600">Loading projects...</p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 md:py-16 lg:py-20">
      <Container maxWidth="xl" className="w-full">
        <div className="flex flex-col gap-8 md:gap-12 mb-8 md:mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
            <SectionTitle
              subtitle="All Projects"
              title="My Portfolio"
              align="left"
            />
            <Link to="/">
              <Button variant="outline" className="text-sm md:text-base">
                ← Back to Home
              </Button>
            </Link>
          </div>
        </div>

        <Animated animation="fadeIn" delay={0.2}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex-1 max-w-md">
              <ProjectSearch 
                onSearch={handleSearch} 
                placeholder="Search projects..." 
                className="w-full"
              />
            </div>
            <ProjectSort sort={sort} onSortChange={handleSortChange} />
          </div>
        </Animated>

        <Animated animation="fadeIn" delay={0.3}>
          <div className="text-sm text-gray-600 mb-6">
            {loading ? (
              'Loading...'
            ) : (
              `Found ${filteredAndSortedProjects.length} project${filteredAndSortedProjects.length !== 1 ? 's' : ''}`
            )}
          </div>
        </Animated>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading projects...</p>
          </div>
        ) : paginatedProjects.length > 0 ? (
          <>
            <AnimatedList
              animation="scale"
              staggerDelay={0.1}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 w-full mb-8 items-stretch"
            >
              {paginatedProjects.map((project, index) => {
                // Map display_order to shadow variant for visual variety
                const shadowVariants: ('small' | 'medium' | 'large')[] = ['small', 'medium', 'large'];
                const shadowVariant = shadowVariants[index % 3] || 'medium';
                
                return (
                  <ProjectCard
                    key={project.id}
                    image={project.image_url || undefined}
                    title={project.title}
                    description={project.description}
                    linkUrl={`/projects/${project.slug}`}
                    linkText="View Project"
                    shadowVariant={shadowVariant}
                    className="cursor-pointer hover:scale-105 transition-transform"
                  />
                );
              })}
            </AnimatedList>
            {pagination && pagination.totalPages > 1 && (
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
                showInfo={true}
                totalItems={pagination.total}
                itemsPerPage={pagination.limit}
              />
            )}
          </>
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-600">
              {search ? 'No projects found matching your search.' : 'No projects available at the moment.'}
            </p>
          </div>
        )}
      </Container>
    </div>
  );
};

