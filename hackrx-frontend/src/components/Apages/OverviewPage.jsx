import React from 'react'
import { GradientLight } from '../design/Features'
import { BarChart2,  Menu ,Video,FileQuestionIcon} from "lucide-react";
import SidebarAnalytics from './components/SidebarAnalytics'
import Overview from './OverView'

// const DASHBOARD_SIDEBAR_ITEMS = [
// 	{ name: "Overview", icon: BarChart2, color: "#6366f1", href: "/overview" },
// 	{ name: "Video Analytics", icon: Video, color: "#8B5CF6", href: "/videoanalytics" },
// 	{ name: "Quiz Analytics", icon: FileQuestionIcon, color: "#EC4899", href: "/quizanalytics" },
// ];

const OverviewPage = () => {
  return (
    <div className='flex h-screen bg-n-8 text-gray-100 overflow-hidden'>
            {/* BG */}
            <div className='fixed inset-0 z-0'>
              <div className='absolute inset-0 bg-gradient-to-br opacity-80' />
              <GradientLight/>
              <div className='absolute inset-0 backdrop-blur-sm' />
            </div>
            <SidebarAnalytics />
            <Overview />
          </div>
  )
}

export default OverviewPage