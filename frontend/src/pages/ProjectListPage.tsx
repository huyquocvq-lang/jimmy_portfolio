import React, { useState, useEffect, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ProjectCard } from '../components/ProjectCard';
import { SectionTitle } from '../components/SectionTitle';
import { Container } from '../components/Container';
import { Button } from '../components/Button';
import { Pagination } from '../components/Pagination';
import { projectApi } from '../services/api';
import type { Project, Pagination as PaginationType } from '../services/api';

export const ProjectListPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const language = (searchParams.get('lang') || 'vi') as 'vi' | 'en';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const [projects, setProjects] = useState<Project[]>([]);
  const [pagination, setPagination] = useState<PaginationType>({
    page: 1,
    limit: 9,
    total: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);

  const loadProjects = useCallback(async () => {
    setLoading(true);
    try {
      const response = await projectApi.getProjects({
        page,
        limit: 9,
        lang: language,
      });
      setProjects(response.data || []);
      setPagination(
        response.pagination || {
          page: 1,
          limit: 9,
          total: 0,
          totalPages: 0,
        },
      );
    } catch (error) {
      console.error('Failed to load projects:', error);
      setProjects([]);
      setPagination({
        page: 1,
        limit: 9,
        total: 0,
        totalPages: 0,
      });
    } finally {
      setLoading(false);
    }
  }, [language, page]);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', newPage.toString());
    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading projects...</p>
          </div>
        ) : projects.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 items-start w-full mb-8">
              {projects.map((project, index) => {
                // Map display_order to shadow variant for visual variety
                const shadowVariants: ('small' | 'medium' | 'large')[] = ['small', 'medium', 'large'];
                const shadowVariant = shadowVariants[index % 3] || 'medium';
                
                return (
                  <Link key={project.id} to={`/projects/${project.slug}`}>
                    <ProjectCard
                      image={project.image_url || undefined}
                      title={project.title}
                      description={project.description}
                      linkUrl={`/projects/${project.slug}`}
                      linkText="View Project"
                      shadowVariant={shadowVariant}
                      className="cursor-pointer hover:scale-105 transition-transform"
                    />
                  </Link>
                );
              })}
            </div>
            {pagination && pagination.totalPages > 1 && (
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-600">No projects available at the moment.</p>
          </div>
        )}
      </Container>
    </div>
  );
};

