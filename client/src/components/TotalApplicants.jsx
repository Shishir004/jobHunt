import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setApplication } from "../redux/applicantsSlice";
import axios from "axios";
import { useParams } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";

const TotalApplicants = () => {
  const dispatch = useDispatch();
  const { id: jobId } = useParams();
  const applications = useSelector((state) => state.applicants.applications);

  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [toastMessage, setToastMessage] = useState(""); // toast message
  const [showToast, setShowToast] = useState(false); // visibility control

  const updateStatusHandler = async (id, status) => {
    try {
      const res = await axios.post(
        `http://localhost:3000/api/application/update/status/${id}`,
        { status },
        { withCredentials: true }
      );
      console.log(res)

      if (res.data.message === "update successfully") {
        setToastMessage(`✅ Status updated to ${status}`);
        setShowToast(true);
        setOpenDropdownId(null);
      } else {
        setToastMessage("⚠️ Something went wrong.");
        setShowToast(true);
      }
    } catch (error) {
      setToastMessage("❌ Failed to update status");
      setShowToast(true);
    }

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleDropdownToggle = (appId) => {
    setOpenDropdownId(openDropdownId === appId ? null : appId);
  };

  useEffect(() => {
    const fetchApplications = async () => {
      if (!jobId) {
        console.error("No Job ID found in URL.");
        return;
      }
      try {
        const res = await axios.get(
          `http://localhost:3000/api/application/get/Applicants/${jobId}`
        );
        dispatch(setApplication(res.data.job.applications));
      } catch (error) {
        console.error("❌ Error fetching applicants:", error);
      }
    };
    fetchApplications();
  }, [jobId, dispatch]);

  return (
    <div className="p-4 relative">
      {/* ✅ Toast Notification */}
      {showToast && (
        <div className="fixed top-5 right-5 bg-gray-800 text-white px-4 py-2 rounded shadow-lg z-50 transition-opacity duration-300">
          {toastMessage}
        </div>
      )}

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
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications && applications.length > 0 ? (
              applications.map((app) => (
                <tr
                  key={app._id}
                  className="border-b border-gray-700 hover:bg-gray-800"
                >
                  <td className="px-6 py-4">{app.applicant?.fullName || "N/A"}</td>
                  <td className="px-6 py-4">{app.applicant?.email || "N/A"}</td>
                  <td className="px-6 py-4">{app.applicant?.phoneNumber || "N/A"}</td>
                  <td className="px-6 py-4">
                    {app.applicant?.profile?.resume &&
                    app.applicant.profile.resume[0] ? (
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
                    {app.createdAt
                      ? new Date(app.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4 text-center relative">
                    <button
                      className="p-2 rounded-full hover:bg-slate-700 transition-colors duration-200"
                      onClick={() => handleDropdownToggle(app._id)}
                    >
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                    {openDropdownId === app._id && (
                      <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10">
                        <div
                          className="py-1"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="options-menu"
                        >
                          <button
                            className="block w-full text-left px-4 py-2 text-sm text-green-400 hover:bg-gray-700"
                            role="menuitem"
                            value="ACCEPTED"
                            onClick={(e) =>
                              updateStatusHandler(app._id, e.target.value)
                            }
                          >
                            Accept
                          </button>
                          <button
                            className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700"
                            role="menuitem"
                            value="REJECTED"
                            onClick={(e) =>
                              updateStatusHandler(app._id, e.target.value)
                            }
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    )}
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
