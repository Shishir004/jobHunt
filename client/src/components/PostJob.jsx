import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AttractiveLoader from "./shadcn/Loader";

const PostJob = () => {
  const { companiez } = useSelector((store) => store.company);
  const navigate=useNavigate();
  const [loading , setloading]=useState(false);
  const [input,setInput]=useState({
    title :'',
    description : '',
    requirements : '',
    Salary:'',
    location : '',
    jobType : '',
    experience:'',
    companyId : '',
    position:''
    
  })
  const onChangeHandler=(e)=>{
    setInput({...input,[e.target.name]:e.target.value})
  }
  const onSelectedHandler=(value)=>{
    const findCompanyId=companiez.find((c)=>c.name.toLowerCase() === value);
    setInput({...input , companyId:findCompanyId._id})
  }
  const submitHandler=async(e)=>{
    e.preventDefault();
    console.log(input);
    try {
      setloading(true)
      const res=await axios.post('http://localhost:3000/api/job/postJob',input,{
        headers:{
          'Content-Type':'application/json'
        },
        withCredentials:true
      });
      if(res.data.success)
      {
        console.log(res);
        navigate('/admin/jobs/create');
      }
    } catch (error) {
      setloading(false)
      console.log(error);
    }
  }
  console.log(input)
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-3xl bg-slate-800 rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Post a New Job</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={submitHandler}>
          <div className="flex flex-col">
            <label className="text-gray-300 mb-2">Job Title</label>
            <input
              type="text"
              placeholder="Frontend Developer"
              name="title"
              value={input.title}
              onChange={onChangeHandler}
              className="bg-slate-700 text-white placeholder-gray-400 border border-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-300 mb-2">Location</label>
            <input
              type="text"
              placeholder="Remote / site"
              name="location"
              value={input.location}
              onChange={onChangeHandler}
              className="bg-slate-700 text-white placeholder-gray-400 border border-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-300 mb-2">Salary</label>
            <input
              type="number"
              name="Salary"
              placeholder="10 Lpa"
              value={input.Salary}
              onChange={onChangeHandler}
              className="bg-slate-700 text-white placeholder-gray-400 border border-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-300 mb-2">Exprience Level</label>
            <input
              type="number"
              placeholder="5 years"
              name="experience"
              value={input.experience}
              onChange={onChangeHandler}
              className="bg-slate-700 text-white placeholder-gray-400 border border-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-300 mb-2">No of Positions</label>
            <input
              type="number"
              placeholder="5"
              name="position"
              value={input.position}
              onChange={onChangeHandler}
              className="bg-slate-700 text-white placeholder-gray-400 border border-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-300 mb-2">Job Type</label>
            <input
              type="text"
              placeholder="remote/on site"
              name='jobType'
              value={input.jobType}
              onChange={onChangeHandler}
              className="bg-slate-700 text-white placeholder-gray-400 border border-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-300 mb-2">Requirements</label>
            <input
              type="text"
              placeholder="Requirements"
              name='requirements'
              value={input.requirements}
              onChange={onChangeHandler}
              className="bg-slate-700 text-white placeholder-gray-400 border border-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-300 mb-2">Select a Company</label>
            <select
              className="bg-slate-700 text-white border border-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
               onChange={(e)=>{onSelectedHandler(e.target.value)}
              }
              defaultValue=""
            >
              <option value="" disabled>Select a company</option>
              {companiez.length>0 &&(
                companiez.map((company)=>
                <option key={company._id} value={company.name.toLowerCase()}>
                  {company.name}
                </option>)
              )}
            </select>
          </div>

          <div className="col-span-1 md:col-span-2 flex flex-col">
            <label className="text-gray-300 mb-2">Job Description</label>
            <textarea
            value={input.description}
            name="description"
            onChange={onChangeHandler}
              placeholder="Describe the features as well as more info of the job"
              className="bg-slate-700 text-white placeholder-gray-400 border border-slate-600 rounded-lg px-4 py-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>
          {
            companiez.length<=0?<h3 className="text-red-600">*Please register a compnay before posting a job</h3>:''
          }
          <div className="col-span-1 md:col-span-2 text-center">
            {loading ? (
                <AttractiveLoader/>
            ) : (
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105"
              >
                Post
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;