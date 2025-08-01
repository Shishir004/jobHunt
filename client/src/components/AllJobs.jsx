import React from 'react';
import FilterCard from './FilterCard';
import Job from './Job';
import { jobsData } from './Job'; // Make sure Job.jsx exports jobsData

const AllJobs = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Column: Filter Card */}
        <div className="lg:col-span-1">
          <FilterCard />
        </div>

        {/* Right Column: Job Listings */}
        <div className="lg:col-span-3">
          {jobsData.length <= 0 ? (
            <div className="text-center py-20 bg-[#161B22] rounded-xl">
              <h2 className="text-3xl font-bold text-gray-200">No Jobs Found</h2>
              <p className="text-gray-500 mt-3">Please check back later or refine your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {jobsData.map((job) => (
                <Job key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllJobs;
