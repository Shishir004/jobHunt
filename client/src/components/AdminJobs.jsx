import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useAdminJobs from '../hooks/useAdminJobs';
import { setSearchJobByText } from '../redux/jobslice';
import AdminJobTable from './AdminJobTable'; // Don't forget to import the table component

const AdminJobs = () => {
  const navigate = useNavigate();
  const [filterData, setFilterData] = useState('');
  const dispatch = useDispatch();

  useAdminJobs(); // Custom hook to fetch jobs

  useEffect(() => {
    dispatch(setSearchJobByText(filterData));
  }, [filterData, dispatch]);

  return (
    <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-6 md:p-8 shadow-2xl shadow-slate-900/50">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Filter by name and role"
            value={filterData}
            onChange={(e) => setFilterData(e.target.value)}
            className="w-full bg-slate-900/70 border border-slate-700 text-white placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5 transition-colors duration-200"
          />
        </div>
        <button
          onClick={() => navigate('/admin/jobs/post')}
          className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Post Jobs
        </button>
      </div>

      <AdminJobTable />
    </div>
  );
};

export default AdminJobs;
