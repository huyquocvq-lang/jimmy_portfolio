import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import type { BlogPostListItem } from '../../services/api';

interface LatestStoriesProps {
  blogs: BlogPostListItem[];
  loading?: boolean;
}

export const LatestStories: React.FC<LatestStoriesProps> = ({ blogs, loading = false }) => {
  if (loading) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-600">Loading stories...</p>
      </div>
    );
  }

  if (blogs.length === 0) {
    return null;
  }

  const featuredBlog = blogs[0];
  const sidebarBlogs = blogs.slice(1, 4);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    try {
      return format(new Date(dateString), 'MMM dd yyyy');
    } catch {
      return '';
    }
  };

  const getCategory = (blog: BlogPostListItem) => {
    return blog.tags.length > 0 ? blog.tags[0].name : 'Blog';
  };

  return (
    <section className="w-full py-16 md:py-24 lg:py-36">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 md:mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">Latest Stories</h2>
        <Link
          to="/blog"
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm md:text-base text-gray-700 hover:bg-gray-50 transition-colors"
        >
          View all stories
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Featured Blog - Left Side */}
        <div className="lg:col-span-2">
          <Link to={`/blog/${featuredBlog.slug}`} className="block group">
            <article className="flex flex-col gap-4">
              {featuredBlog.featured_image && (
                <div className="w-full h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden">
                  <img
                    src={featuredBlog.featured_image}
                    alt={featuredBlog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="flex flex-col gap-3">
                <span className="text-sm text-gray-500 uppercase tracking-wide">
                  {getCategory(featuredBlog)}
                </span>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 group-hover:text-[#5e3bee] transition-colors line-clamp-2">
                  {featuredBlog.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  {featuredBlog.published_at && (
                    <>
                      <span>{formatDate(featuredBlog.published_at)}</span>
                      <span>•</span>
                    </>
                  )}
                  <span>7 min read</span>
                </div>
                <p className="text-gray-600 line-clamp-3 text-base md:text-lg">
                  {featuredBlog.excerpt}
                </p>
              </div>
            </article>
          </Link>
        </div>

        {/* Sidebar Blogs - Right Side */}
        <div className="flex flex-col gap-6 md:gap-8">
          {sidebarBlogs.map((blog) => (
            <Link key={blog.id} to={`/blog/${blog.slug}`} className="block group">
              <article className="flex gap-4">
                {blog.featured_image && (
                  <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden">
                    <img
                      src={blog.featured_image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="flex flex-col gap-2 flex-1 min-w-0">
                  <span className="text-xs text-gray-500 uppercase tracking-wide">
                    {getCategory(blog)}
                  </span>
                  <h4 className="text-base md:text-lg font-bold text-gray-900 group-hover:text-[#5e3bee] transition-colors line-clamp-2">
                    {blog.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    {blog.published_at && (
                      <>
                        <span>{formatDate(blog.published_at)}</span>
                        <span>•</span>
                      </>
                    )}
                    <span>7 min read</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

