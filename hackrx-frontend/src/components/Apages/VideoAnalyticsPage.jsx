import React from 'react'
import { GradientLight } from '../design/Features'
import SidebarAnalytics from './components/SidebarAnalytics'
import VideoAnalytics from './VideoAnalytics'



const VideoAnalyticsPage = () => {
  return (
    <div className='flex h-screen bg-n-8 text-gray-100 overflow-hidden'>
            {/* BG */}
            <div className='fixed inset-0 z-0'>
              <div className='absolute inset-0 bg-gradient-to-br opacity-80' />
              <GradientLight/>
              <div className='absolute inset-0 backdrop-blur-sm' />
            </div>
            <SidebarAnalytics />
            <VideoAnalytics />
          </div>
  )
}

export default VideoAnalyticsPage