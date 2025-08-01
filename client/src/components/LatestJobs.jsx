// LatestJobs.jsx
import React from 'react';
import JobCard from './JobCard';

const LatestJobs = () => {
  const jobListings = [
    {
        id: 1,
        companyName: "Tech Solutions Inc.",
        location: "India",
        jobTitle: "Senior Frontend Developer",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
        tags: [
            { text: "12 Positions", color: "blue" },
            { text: "Full Time", color: "red" },
            { text: "24LPA", color: "purple" }
        ]
    },
    {
        id: 2,
        companyName: "Innovate Hub",
        location: "Remote",
        jobTitle: "Backend Engineer (Go)",
        description: "Designing and implementing scalable backend services and APIs for our core products.",
        tags: [
            { text: "5 Positions", color: "blue" },
            { text: "Part Time", color: "red" },
            { text: "30LPA", color: "purple" }
        ]
    },
    {
        id: 3,
        companyName: "Creative Minds",
        location: "Mumbai, India",
        jobTitle: "Lead UI/UX Designer",
        description: "Lead the design team to create beautiful and intuitive user interfaces for web and mobile.",
        tags: [
            { text: "1 Position", color: "blue" },
            { text: "Full Time", color: "red" },
            { text: "28LPA", color: "purple" }
        ]
    },
    {
        id: 4,
        companyName: "Data Corp",
        location: "Bengaluru, India",
        jobTitle: "Data Scientist",
        description: "Analyze large, complex data sets to identify trends and opportunities for product innovation.",
        tags: [
            { text: "3 Positions", color: "blue" },
            { text: "Full Time", color: "red" },
            { text: "35LPA", color: "purple" }
        ]
    },
    {
        id: 5,
        companyName: "Marketing Gurus",
        location: "Remote",
        jobTitle: "SEO Specialist",
        description: "Develop and execute successful SEO strategies to increase organic search visibility and traffic.",
        tags: [
            { text: "2 Positions", color: "blue" },
            { text: "Contract", color: "red" },
            { text: "18LPA", color: "purple" }
        ]
    },
    {
        id: 6,
        companyName: "CloudNet",
        location: "Pune, India",
        jobTitle: "DevOps Engineer",
        description: "Build and maintain our CI/CD pipelines and cloud infrastructure on AWS.",
        tags: [
            { text: "4 Positions", color: "blue" },
            { text: "Full Time", color: "red" },
            { text: "22LPA", color: "purple" }
        ]
    }
  ];

  return (
    <div className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center mb-12">
                <span className="bg-gradient-to-r from-purple-500 to-indigo-600 text-transparent bg-clip-text">
                    Latest & Top 
                </span> Job Openings
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {
                    jobListings.map((job) => (
                        <JobCard 
                            key={job.id}
                            companyName={job.companyName}
                            location={job.location}
                            jobTitle={job.jobTitle}
                            description={job.description}
                            tags={job.tags}
                        />
                    ))
                }
            </div>
        </div>
    </div>
  );
};

export default LatestJobs;
