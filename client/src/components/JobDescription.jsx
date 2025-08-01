import React from 'react'
const JobTag = ({ text }) => (
    <span className="text-xs font-semibold text-purple-300 bg-purple-500/10 border border-purple-500/20 rounded-md px-3 py-1">
        {text}
    </span>
);
const JobDescription = () => {
    const isApplied=true;
    return (
        <div className="mt-12 w-full max-w-4xl mx-auto bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-700/50 font-sans text-white">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                <div>
                    <h2 className="text-3xl font-bold text-white">Frontend Developer</h2>
                    <div className="flex flex-wrap items-center gap-2 mt-3">
                        <JobTag text="12 Positions" />
                        <JobTag text="Part Time" />
                        <JobTag text="24LPA" />
                    </div>
                </div>
                <button  disabled={isApplied} className={`bg-gradient-to-r from-blue-500 to-purple-600  text-white font-bold py-2 px-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-200 w-full sm:w-auto ${isApplied?'cursor-not-allowed blur-[0.5px]':''}`}>
                    {isApplied?"Already Applied":"Apply Now"}
                </button>
            </div>
            <div className="border-t border-gray-700/50 my-6"></div>
            <div>
                <h3 className="text-xl font-semibold text-white mb-6">Job Description</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5 text-gray-300">
                    {/* Data is now hardcoded instead of using .map() */}
                    <div className="flex flex-col">
                        <span className="text-sm text-gray-400 font-semibold">Role</span>
                        <span className="text-base text-white mt-1">Frontend Developer</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm text-gray-400 font-semibold">Location</span>
                        <span className="text-base text-white mt-1">Hyderabad</span>
                    </div>
                    <div className="flex flex-col md:col-span-2">
                        <span className="text-sm text-gray-400 font-semibold">Description</span>
                        <span className="text-base text-white mt-1">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium similique sed dolor!</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm text-gray-400 font-semibold">Experience</span>
                        <span className="text-base text-white mt-1">2 yrs</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm text-gray-400 font-semibold">Salary</span>
                        <span className="text-base text-white mt-1">12LPA</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm text-gray-400 font-semibold">Total Applicants</span>
                        <span className="text-base text-white mt-1">4</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm text-gray-400 font-semibold">Posted Date</span>
                        <span className="text-base text-white mt-1">17-07-2024</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDescription