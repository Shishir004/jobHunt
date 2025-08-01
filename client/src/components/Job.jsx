import React from 'react';
import { useNavigate } from 'react-router-dom';

// --- MOCK DATA ---
export const jobsData = [  // Export this if you want to use in another component
    {
        id: 1,
        postedDate: '2 days ago',
        companyName: 'Innovate Inc.',
        companyLogo: 'https://placehold.co/40x40/1F2937/9CA3AF?text=I',
        location: 'San Francisco, CA',
        title: 'Senior Frontend Developer',
        description: 'We are looking for a passionate Senior Frontend Developer to join our team and build the future of web applications.',
        tags: ['Full Time', 'Remote', '$150k'],
        featured: true,
    },
     {
        id: 1,
        postedDate: '2 days ago',
        companyName: 'Innovate Inc.',
        companyLogo: 'https://placehold.co/40x40/1F2937/9CA3AF?text=I',
        location: 'San Francisco, CA',
        title: 'Senior Frontend Developer',
        description: 'We are looking for a passionate Senior Frontend Developer to join our team and build the future of web applications.',
        tags: ['Full Time', 'Remote', '$150k'],
        featured: true,
    },
     {
        id: 1,
        postedDate: '2 days ago',
        companyName: 'Innovate Inc.',
        companyLogo: 'https://placehold.co/40x40/1F2937/9CA3AF?text=I',
        location: 'San Francisco, CA',
        title: 'Senior Frontend Developer',
        description: 'We are looking for a passionate Senior Frontend Developer to join our team and build the future of web applications.',
        tags: ['Full Time', 'Remote', '$150k'],
        featured: true,
    },
     {
        id: 1,
        postedDate: '2 days ago',
        companyName: 'Innovate Inc.',
        companyLogo: 'https://placehold.co/40x40/1F2937/9CA3AF?text=I',
        location: 'San Francisco, CA',
        title: 'Senior Frontend Developer',
        description: 'We are looking for a passionate Senior Frontend Developer to join our team and build the future of web applications.',
        tags: ['Full Time', 'Remote', '$150k'],
        featured: true,
    },
     {
        id: 1,
        postedDate: '2 days ago',
        companyName: 'Innovate Inc.',
        companyLogo: 'https://placehold.co/40x40/1F2937/9CA3AF?text=I',
        location: 'San Francisco, CA',
        title: 'Senior Frontend Developer',
        description: 'We are looking for a passionate Senior Frontend Developer to join our team and build the future of web applications.',
        tags: ['Full Time', 'Remote', '$150k'],
        featured: true,
    },
     {
        id: 1,
        postedDate: '2 days ago',
        companyName: 'Innovate Inc.',
        companyLogo: 'https://placehold.co/40x40/1F2937/9CA3AF?text=I',
        location: 'San Francisco, CA',
        title: 'Senior Frontend Developer',
        description: 'We are looking for a passionate Senior Frontend Developer to join our team and build the future of web applications.',
        tags: ['Full Time', 'Remote', '$150k'],
        featured: true,
    },
    // ...rest of the jobs
];

// --- SVG ICONS ---
const BookmarkIcon = ({ saved }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={saved ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`cursor-pointer transition-colors duration-300 ${saved ? 'text-purple-400' : 'text-gray-500 hover:text-purple-400'}`}
    >
        <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
    </svg>
);

const LocationIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-gray-500"
    >
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
        <circle cx="12" cy="10" r="3"></circle>
    </svg>
);

// --- Job Card Component ---
const Job = ({ job }) => {
  const cardBorderStyle = job.featured ? 'border-purple-500' : 'border-gray-700';
  const nvigate=useNavigate();
  const jobId="abavada";

  return (
    <div className={`bg-[#161B22] rounded-xl shadow-lg p-4 border ${cardBorderStyle} flex flex-col gap-3 hover:border-purple-500/80 transition-all duration-300`}>
      <div className="flex justify-between items-start">
        <span className="text-xs text-gray-500">{job.postedDate}</span>
        <BookmarkIcon saved={job.featured} />
      </div>

      <div className="flex items-center gap-3">
        <img src={job.companyLogo} alt={`${job.companyName} logo`} className="w-10 h-10 rounded-lg bg-gray-800" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/40x40/161B22/4B5563?text=Err'; }} />
        <div>
          <h3 className="font-semibold text-sm text-gray-300">{job.companyName}</h3>
          <div className="flex items-center gap-1.5 mt-0.5">
            <LocationIcon />
            <p className="text-xs text-gray-400">{job.location}</p>
          </div>
        </div>
      </div>

      <h2 className="text-lg font-bold text-gray-100 truncate">{job.title}</h2>

      <p className="text-gray-400 text-xs leading-relaxed flex-grow line-clamp-2">
        {job.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {job.tags.map((tag, index) => (
          <span key={index} className="bg-gray-700/50 text-gray-300 text-[10px] font-medium px-2.5 py-1 rounded-full border border-gray-600">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-800">
        <button 
        onClick={()=>{nvigate(`/description/${jobId}`)}}
        className="w-full text-center text-gray-300 font-semibold py-2 px-3 rounded-lg border border-gray-600 hover:bg-gray-700 text-sm transition-all duration-300">
            Details
        </button>
        <button className="w-full text-center text-white font-semibold py-2 px-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 text-sm hover:to-blue-600 transition-all duration-300">
            Apply Now
        </button>
      </div>
    </div>
  );
};

export default Job;
