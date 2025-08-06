import React from 'react';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';

const AllJobs = () => {
  const { allJobs, searchForTheJobUsingKeyword } = useSelector((store) => store.job);

  // Filter the jobs based on the criteria from the Redux store
  const filteredJobs = allJobs
    ?.filter((job) => {
      // Basic check to ensure job is a valid object before filtering
      if (!job || typeof job !== 'object') {
        return false;
      }

      const { Industry, Location, Salary } = searchForTheJobUsingKeyword;

      // 1. Location Filter
      // If a Location filter is active, check if the job's location matches.
      // The comparison is case-insensitive. If no Location filter is active, this check passes.
      const locationMatch = !Location || job.location?.toLowerCase() === Location.toLowerCase();

      // 2. Industry/Category Filter
      // Assuming the industry is stored in the 'category' field of your job object.
      // If an Industry filter is active, check if the job's category matches.
      const industryMatch = !Industry || job.category?.toLowerCase() === Industry.toLowerCase();

      // 3. Salary Filter
      let salaryMatch = true; // Default to true, will be set to false if it doesn't match
      if (Salary) {
        // Parse the salary range from the filter string (e.g., "5-10 LPA")
        const salaryRange = Salary.replace(/LPA/i, '').trim().split('-');
        if (salaryRange.length === 2) {
          const minSalary = parseFloat(salaryRange[0]);
          const maxSalary = parseFloat(salaryRange[1]);
          
          // Assuming job.salary is a numeric value representing lakhs per annum (e.g., 8 for 8 LPA)
          const jobSalary = parseFloat(job.salary);

          // Check if all values are valid numbers and if the job's salary is outside the range
          if (
            !isNaN(minSalary) &&
            !isNaN(maxSalary) &&
            !isNaN(jobSalary) &&
            (jobSalary < minSalary || jobSalary > maxSalary)
          ) {
            salaryMatch = false;
          }
        }
      }

      // The job is included in the result only if it matches all active filters
      return locationMatch && industryMatch && salaryMatch;
    });

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Column: Filter Card */}
        <div className="lg:col-span-1">
          <FilterCard />
        </div>

        {/* Right Column: Job Listings */}
        <div className="lg:col-span-3">
          {/* Check the length of the *filtered* jobs array */}
          {filteredJobs?.length <= 0 ? (
            <div className="text-center py-20 bg-[#161B22] rounded-xl">
              <h2 className="text-3xl font-bold text-gray-200">No Jobs Found</h2>
              <p className="text-gray-500 mt-3">
                No jobs match your current filters. Try clearing them or refining your search.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* Map over the *filtered* jobs array to render them */}
              {filteredJobs.map((job) => (
                <Job key={job._id} job={job} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllJobs;