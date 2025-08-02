import axios from 'axios';
import { setAllJobs } from '../redux/jobslice'
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const useGetALLjobs = () => {
    const dispatch=useDispatch();
    useEffect(()=>{
        const fetchALLjobs=async()=>{
            try {
                const res=await axios.get("http://localhost:3000/api/job/getAllJobs",{withCredentials:true})
                if(res.data.success)
                {
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchALLjobs();
    },[])
}

export default useGetALLjobs