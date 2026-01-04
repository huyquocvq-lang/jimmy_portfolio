import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Container } from '../components/Container';
import { projectApi } from '../services/api';
import type { ProjectDetail } from '../services/api';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const language = (searchParams.get('lang') || 'vi') as 'vi' | 'en';
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProject = useCallback(async () => {
    if (!slug) return;
    setLoading(true);
    setError(null);
    try {
      const projectData = await projectApi.getProjectBySlug(slug, language);
      setProject(projectData);
    } catch (err) {
      setError('Failed to load project');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [slug, language]);

  useEffect(() => {
    if (slug) {
      loadProject();
    }
  }, [slug, loadProject]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <Container maxWidth="xl" className="w-full">
          <div className="text-center py-12">
            <p className="text-gray-600">Loading project...</p>
          </div>
        </Container>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <Container maxWidth="xl" className="w-full">
          <div className="text-center py-12">
            <p className="text-red-600">{error || 'Project not found'}</p>
            <Link to="/projects" className="text-purple-600 hover:underline mt-4 inline-block">
              ← Back to Projects
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  // Helper function to convert markdown-like text to HTML
  const formatDescription = (text: string | null): string => {
    if (!text) return '';
    return text
      .split('\n')
      .map((line: string) => {
        if (line.startsWith('# ')) {
          return `<h1 class="text-3xl font-bold mb-4 mt-8">${line.substring(2)}</h1>`;
        }
        if (line.startsWith('## ')) {
          return `<h2 class="text-2xl font-bold mt-8 mb-4">${line.substring(3)}</h2>`;
        }
        if (line.startsWith('### ')) {
          return `<h3 class="text-xl font-bold mt-6 mb-3">${line.substring(4)}</h3>`;
        }
        if (line.startsWith('- ')) {
          return `<li class="ml-4 mb-2">${line.substring(2)}</li>`;
        }
        if (line.trim() === '') {
          return '<br />';
        }
        if (line.startsWith('**') && line.endsWith('**')) {
          return `<p class="mb-4"><strong>${line.replace(/\*\*/g, '')}</strong></p>`;
        }
        return `<p class="mb-4">${line}</p>`;
      })
      .join('');
  };

  const fullDescription = language === 'vi' ? project.full_description_vi : project.full_description_en;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Container maxWidth="xl" className="w-full">
        <Link
          to="/projects"
          className="text-purple-600 hover:text-purple-700 mb-6 inline-block"
        >
          ← Back to Projects
        </Link>

        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          {project.image_url && (
            <div className="h-64 md:h-96 lg:h-[500px] relative w-full overflow-hidden">
              <img
                src={project.image_url}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-6 md:p-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  {project.title}
                </h1>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  {project.year && <span>Year: {project.year}</span>}
                  {project.category && <span>Category: {project.category}</span>}
                </div>
              </div>
            </div>

            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {project.description}
              </p>
            </div>

            {project.technologies && project.technologies.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Technologies</h2>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech: string, index: number) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {fullDescription && (
              <div className="prose prose-lg max-w-none">
                <div
                  className="whitespace-pre-line text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: formatDescription(fullDescription),
                  }}
                />
              </div>
            )}
          </div>
        </article>
      </Container>
    </div>
  );
};

