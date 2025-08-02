import React from 'react'
import HeroSection from './HeroSection'
import CategoryCrousel from './CategoryCrousel'
import LatestJobs from './LatestJobs'
import Footer from './Footer'
import useGetALLjobs from '../hooks/useGetALLjobs'

const Home = () => {
  useGetALLjobs();
  return (
    <div>
        <HeroSection/>
        <CategoryCrousel/>
        <LatestJobs/>
        <Footer/>
    </div>
  )
}

export default Home