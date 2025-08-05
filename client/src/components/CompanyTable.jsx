import axios from "axios";
import { MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CompaniesTable = () => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const { companiez, searchCompany } = useSelector((store) => store.company);
  const [filterCompany, setFilterCompany] = useState(companiez);
  const handleDropdownToggle = (id) => {
    setOpenDropdownIndex(openDropdownIndex === id ? null : id);
  };
  const handleDeleteJobs = async (userID) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/company/delete/${userID}`,
        {
          withCredentials: true,
        }
      );
      setFilterCompany((prev) => prev.filter((c) => c._id !== userID));
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const myfilteredcompanies = companiez.filter((c) => {
      if (!searchCompany) {
        return true;
      }
      return c?.name?.toLowerCase().includes(searchCompany.toLowerCase());
    });
    setFilterCompany(myfilteredcompanies);
  }, [companiez, searchCompany]);
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-300">
        <thead className="text-xs text-gray-400 uppercase bg-slate-800/50">
          <tr>
            <th scope="col" className="px-6 py-4">
              Logo
            </th>
            <th scope="col" className="px-6 py-4">
              Name
            </th>
            <th scope="col" className="px-6 py-4">
              Date
            </th>
            <th scope="col" className="px-6 py-4 text-right">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {filterCompany.length > 0 ? (
            filterCompany.map((company) => (
              <tr
                key={company?._id}
                className="border-b border-slate-700 hover:bg-slate-800/60 transition-colors duration-200"
              >
                {/* Logo cell */}
                <td className="px-6 py-4">
                  <img
                    src={company.logo}
                    alt="logo"
                    className="h-10 w-10 object-contain rounded-full"
                  />
                </td>

                {/* Name cell */}
                <td className="px-6 py-4 font-medium text-white whitespace-nowrap">
                  {company?.name}
                </td>

                {/* Date cell */}
                <td className="px-6 py-4">
                  {company?.createdAt.split("T")[0]}
                </td>

                {/* Action cell */}
                <td className="px-6 py-4 text-right relative">
                  <button
                    className="p-2 rounded-full hover:bg-slate-700 transition-colors duration-200"
                    onClick={() => handleDropdownToggle(company?._id)}
                  >
                    <MoreHorizontal className="w-5 h-5" />
                  </button>

                  {openDropdownIndex === company?._id && (
                    <div className="absolute right-4 mt-2 bg-slate-800 text-white text-sm rounded shadow z-10">
                      <button
                        className="block px-4 py-2 hover:bg-slate-700 w-full text-left"
                        onClick={() => {
                          handleDeleteJobs(company?._id);
                          setOpenDropdownIndex(null);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-10 text-gray-500">
                A list of your recent registered companies will appear here.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CompaniesTable;
