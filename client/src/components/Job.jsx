import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
  const {
    title,
    description,
    position,
    salary,
    jobType,
    location,
    companyId,
    createdAt,
  } = job || {};

  const postedDaysAgo = createdAt
    ? formatDistanceToNow(new Date(createdAt), { addSuffix: true })
    : 'Just now';
    const navigate=useNavigate();
  return (
    <div className="bg-[#161B22] text-white p-5 rounded-xl shadow-md relative">
      {/* Bookmark Icon */}
      <div className="absolute top-4 right-4">
        <button className="text-white hover:text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5v14l7-5 7 5V5a2 2 0 00-2-2H7a2 2 0 00-2 2z" />
          </svg>
        </button>
      </div>

      {/* Posted Time */}
      <p className="text-sm text-gray-400 mb-2">{postedDaysAgo}</p>

      {/* Company Name */}
      <h3 className="text-blue-400 font-semibold text-sm px-20">
        {companyId?.name || 'Unknown Company'}
      </h3>
      <img className='size-10  rounded-3xl'  src={job?.companyId?.logo} alt='logo'/>
      <p className="text-gray-400 text-xs mb-2">{location || 'Unknown Location'}</p>

      {/* Job Title */}
      <h2 className="text-lg font-bold mb-1">{title || 'Job Title'}</h2>

      {/* Job Description */}
      <p className="text-sm text-gray-300 mb-4 line-clamp-2">{description || 'No description provided.'}</p>

      {/* Tags: Position, Job Type, Salary */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="bg-gray-700/50 text-gray-300 text-[10px] font-medium px-2.5 py-1 rounded-full border border-gray-600">
          {position || 1} Position{position > 1 ? 's' : ''}
        </span>
        <span className="bg-red-700/60 text-gray-100 text-[10px] font-medium px-2.5 py-1 rounded-full border border-red-600">
          {jobType || 'Full Time'}
        </span>
        <span className="bg-purple-700/50 text-white text-[10px] font-medium px-2.5 py-1 rounded-full border border-purple-600">
          {salary ? `${salary} LPA` : 'N/A'}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <button className="text-sm text-white bg-gray-700 px-3 py-1 rounded-md hover:bg-gray-600" onClick={()=>navigate(`/description/${job?._id}`)}>
          Details
        </button>
        <button className="text-sm text-white bg-purple-600 px-3 py-1 rounded-md hover:bg-purple-700">
          Save For Later
        </button>
      </div>
    </div>
  );
};

export default Job;
