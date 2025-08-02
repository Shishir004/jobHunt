import React from 'react';
import Job from './Job';
import { jobsData } from './Job'; 
const randomJobs = [1, 2, 45];

const Browse = () => {
  return (
    <>
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10">
          Search Results ({randomJobs.length})
        </h1>
        <div className="grid grid-cols-3 gap-4">
          {
            jobsData.map((job) => {
              return (
                <Job key={job.id} job={job} />
              )
            })
          }
        </div>
      </div>
    </>
  );
};

export default Browse;
