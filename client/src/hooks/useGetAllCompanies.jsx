import axios from 'axios';
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setCompaniez } from '../redux/companySlice';

const useGetAllCompanies = () => {
    const dispatch=useDispatch();
    useEffect(()=>{
        const fetchSingleCompany=async()=>{
            try {
                const res=await axios.get(`https://jobhunt-1-gvy1.onrender.com/api/company/get`,{withCredentials:true})
                if(res.data.success)
                {
                    dispatch(setCompaniez(res.data.companies));
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchSingleCompany();
    },[])
}

export default useGetAllCompanies