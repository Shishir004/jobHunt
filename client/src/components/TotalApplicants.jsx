import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setApplication } from "../redux/applicantsSlice"; // adjust path if needed
import axios from "axios";
import { useParams } from "react-router-dom";

const TotalApplicants = () => {
  const dispatch = useDispatch();
  const { id: jobId } = useParams(); 
  const applications = useSelector((state) => state.applicants.applications);

  useEffect(() => {
    const fetchApplications = async () => {
      if (!jobId) {
        console.error("No Job ID found in URL.");
        return;
      }
      try {
        const res = await axios.get(`http://localhost:3000/api/application/get/Applicants/${jobId}`);
        dispatch(setApplication(res.data.job.applications));
      } catch (error) {
        console.error("❌ Error fetching applicants:", error);
      }
    };
    fetchApplications();
  }, [jobId, dispatch]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-white mb-4">
        Total Applications ({applications?.length || 0})
      </h1>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-white bg-gray-900 rounded-lg">
          <thead className="text-xs uppercase bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-3">Full Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Contact</th>
              <th className="px-6 py-3">Resume</th>
              <th className="px-6 py-3">Date Applied</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications && applications.length > 0 ? (
              applications.map((app) => (
                <tr key={app._id} className="border-b border-gray-700 hover:bg-gray-800">
                  <td className="px-6 py-4">{app.applicant?.fullName || "N/A"}</td>
                  <td className="px-6 py-4">{app.applicant?.email || "N/A"}</td>
                  <td className="px-6 py-4">{app.applicant?.phoneNumber || "N/A"}</td>
                  <td className="px-6 py-4">
                    {/* CORRECTED: Using the deep nested path to the resume URL */}
                    {app.applicant?.profile?.resume && app.applicant.profile.resume[0] ? (
                      <a 
                        href={app.applicant.profile.resume[0]} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-400 underline"
                      >
                        View Resume
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-400 hover:underline">
                      Download
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-400">
                  No applications found for this job.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TotalApplicants;
