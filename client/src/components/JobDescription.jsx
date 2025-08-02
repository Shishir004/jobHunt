import axios from "axios";
import { setSingleJob } from "../redux/jobslice"; // Assuming this path is correct
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const JobTag = ({ text, value }) => (
  <span className="text-xs font-semibold text-purple-300 bg-purple-500/10 border border-purple-500/20 rounded-md px-3 py-1">
    {text} {value}
  </span>
);

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const params = useParams();
  const jobId = params.id;

  const [isApplied, setIsApplied] = useState(false);

  // Fetch job when component mounts
  useEffect(() => {
    const fetchJob = async () => {
      // Ensure we don't run this fetch if jobId is not available yet.
      if (!jobId) return;

      try {
        const res = await axios.get(`/api/job/getAllJobsById/${jobId}`, {
          withCredentials: true,
        });
        console.log("Full API response:", res.data);
        if (res.data?.success && res.data?.jobs) {
          const jobData = res.data.jobs;
          dispatch(setSingleJob(jobData));

          // This logic assumes your backend populates the 'applications' array
          // with objects that each contain an 'applicant' field.
          const applied = jobData.applications?.some(
            (application) =>
              application === user?._id || application.applicant === user?._id
          );

          setIsApplied(!!applied); // Use !! to ensure the value is a boolean
        } else {
          // --- FIX: Log the entire response data for easier debugging ---
          console.error(
            "Job data not found in response. Full response data:",
            res.data
          );
        }
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };

    fetchJob();
  }, [jobId, dispatch, user?._id]);

  // Apply job handler
  const applyJobHandler = async () => {
    console.log("Apply button clicked"); 
    try {
      // Note: Make sure this API endpoint is correct based on your backend router.
      const res = await axios.post(
        `/api/application/apply/job/${jobId}`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true);
        // To make the UI fully reactive, you might want to re-fetch the job data here
        // or update the redux state more accurately.
        const updatedApplications = [
          ...(singleJob.applications || []),
          { applicant: user?._id },
        ];
        dispatch(
          setSingleJob({ ...singleJob, applications: updatedApplications })
        );
      } else {
        console.log(res.data.message);
      }
    } catch (error) {
      // --- FIX: Removed the stray '_id' from this line ---
      console.error("Error applying for job:", error);
    }
  };

  return (
    <div className="mt-12 w-full max-w-4xl mx-auto bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-700/50 font-sans text-white">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold text-white">{singleJob?.title}</h2>
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <JobTag text={singleJob?.position} value="" />
            <JobTag text={singleJob?.jobType} value="" />
            <JobTag text={singleJob?.Salary} value="rs" />
          </div>
        </div>
        <button
          onClick={applyJobHandler}
          disabled={isApplied}
          className={`bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-2 px-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-200 w-full sm:w-auto ${
            isApplied ? "cursor-not-allowed opacity-60" : ""
          }`}
        >
          {isApplied ? "Applied" : "Apply Now"}
        </button>
      </div>

      <div className="border-t border-gray-700/50 my-6"></div>

      <div>
        <h3 className="text-xl font-semibold text-white mb-6">
          Job Description
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5 text-gray-300">
          <div className="flex flex-col">
            <span className="text-sm text-gray-400 font-semibold">Role</span>
            <span className="text-base text-white mt-1">
              {singleJob?.title}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-400 font-semibold">
              Location
            </span>
            <span className="text-base text-white mt-1">
              {singleJob?.location}
            </span>
          </div>
          <div className="flex flex-col md:col-span-2">
            <span className="text-sm text-gray-400 font-semibold">
              Description
            </span>
            <span className="text-base text-white mt-1">
              {singleJob?.description}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-400 font-semibold">
              Experience
            </span>
            <span className="text-base text-white mt-1">
              {singleJob?.experience}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-400 font-semibold">Salary</span>
            <span className="text-base text-white mt-1">
              {singleJob?.Salary} rs
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-400 font-semibold">
              Total Applicants
            </span>
            <span className="text-base text-white mt-1">
              {singleJob?.applications?.length || 0}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-400 font-semibold">
              Posted Date
            </span>
            <span className="text-base text-white mt-1">
              {singleJob?.createdAt?.split("T")[0]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
