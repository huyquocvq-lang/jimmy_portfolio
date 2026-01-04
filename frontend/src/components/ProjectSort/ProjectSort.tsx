import React from 'react';

interface ProjectSortProps {
  sort: 'newest' | 'oldest' | 'name_asc' | 'name_desc';
  onSortChange: (sort: 'newest' | 'oldest' | 'name_asc' | 'name_desc') => void;
  className?: string;
}

export const ProjectSort: React.FC<ProjectSortProps> = ({
  sort,
  onSortChange,
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <label className="text-sm font-medium text-gray-700">Sort by:</label>
      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value as 'newest' | 'oldest' | 'name_asc' | 'name_desc')}
        className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#5e3bee] bg-white"
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="name_asc">Name (A-Z)</option>
        <option value="name_desc">Name (Z-A)</option>
      </select>
    </div>
  );
};

