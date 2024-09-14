import { motion } from "framer-motion";

import Header from "./components/Header";
import StatCard from "./components/StatCard";

import { AlertTriangle, DollarSign, Package, PlayCircle, ReplyAll, TrendingUp } from "lucide-react";
import CategoryDistributionChart from "./components/CategoryDistributionChart";
import SalesTrendChart from "./components/SalesTrendChart";
import ProductsTable from "./components/ProductTable";
import UserRetention from "./components/UserRetention";
// import ProductPerformance from "./components/DynamicBarChart";
import UserActivityHeatmap from "./components/UserActivityHeatmap";
import AIPoweredInsights from "./components/AIPoweredInsights";
import ProgressBar from "./components/ProgressBar";
import DynamicBarChart from "./components/DynamicBarChart";
import DynamicDonutChart from "./components/DynamicDonutChart";
import DynamicAreaChart from "./components/DynamicAreaChart";
import UsersTable from "./components/UsersTable";
import VideoAnalyticsUsersTable from "./components/VideoAnalyticsUsersTable";

const watchTimeData = [
	{ WatchRange: "0-2", Users: 8 },
	{ WatchRange: "2-4", Users: 12 },
	{ WatchRange: "4-8", Users: 20 },
	{ WatchRange: "8-10", Users: 18 },
	{ WatchRange: "10-12", Users: 15 },
];

const completionRateData = [
	{ name: "Completed Views", value: 134 },
	{ name: "Dropped-off Views", value: 100 },
];
// const dropOffData = [
// 	{ name: "Q1", dropOff: 2.5 },
// 	{ name: "Q2", dropOff: 3 },
// 	{ name: "Q3", dropOff: 4.6 },
// 	{ name: "Q4", dropOff: 3 },
// 	// { name: "Q5", dropOff: 4.5 },
// 	// { name: "Q6", dropOff: 4.0 },
// 	// { name: "Q7", dropOff: 3.8 },
// 	// { name: "Q8", dropOff: 3.5 },
//   ];
  const engagementRateData = [
	{ time: "1 min", engagementRate: 75 },
	{ time: "2 min", engagementRate: 72 },
	{ time: "3 min", engagementRate: 70 },
	{ time: "4 min", engagementRate: 68 },
	{ time: "5 min", engagementRate: 65 },
	{ time: "6 min", engagementRate: 60 },
	{ time: "7 min", engagementRate: 55 },
	{ time: "8 min", engagementRate: 50 },
	{ time: "9 min", engagementRate: 48 },
	{ time: "10 min", engagementRate: 45 },
	{ time: "11 min", engagementRate: 43 },
	{ time: "12 min", engagementRate: 40 },
  ];
  const videoAnalyticsData = [
	{ id: 1, name: "John Doe", viewDuration: "08:30", engagementScore: 70, completionRate: "70%" },
	{ id: 2, name: "Jane Smith", viewDuration: "10:00", engagementScore: 85, completionRate: "83%" },
	{ id: 3, name: "Michael Johnson", viewDuration: "05:45", engagementScore: 50, completionRate: "48%" },
	{ id: 4, name: "Emily Davis", viewDuration: "11:30", engagementScore: 90, completionRate: "95%" },
	{ id: 5, name: "Daniel Brown", viewDuration: "09:20", engagementScore: 65, completionRate: "77%" },
	{ id: 6, name: "Olivia Martinez", viewDuration: "10:15", engagementScore: 75, completionRate: "85%" },
	{ id: 7, name: "Lucas Garcia", viewDuration: "07:00", engagementScore: 60, completionRate: "58%" },
	{ id: 8, name: "Sophia Wilson", viewDuration: "11:00", engagementScore: 85, completionRate: "92%" },
	{ id: 9, name: "Ethan Moore", viewDuration: "10:30", engagementScore: 80, completionRate: "87%" },
	{ id: 10, name: "Ava Taylor", viewDuration: "09:10", engagementScore: 70, completionRate: "76%" },
	{ id: 11, name: "Mason Anderson", viewDuration: "08:00", engagementScore: 65, completionRate: "67%" },
	{ id: 12, name: "Isabella Thomas", viewDuration: "10:30", engagementScore: 80, completionRate: "83%" },
	{ id: 13, name: "Logan Harris", viewDuration: "06:30", engagementScore: 55, completionRate: "54%" },
	{ id: 14, name: "Mia Clark", viewDuration: "07:30", engagementScore: 60, completionRate: "63%" },
	{ id: 15, name: "James Lewis", viewDuration: "11:00", engagementScore: 85, completionRate: "92%" },
	{ id: 16, name: "Charlotte Robinson", viewDuration: "12:00", engagementScore: 95, completionRate: "100%" },
	{ id: 17, name: "Benjamin Walker", viewDuration: "10:00", engagementScore: 75, completionRate: "83%" },
	{ id: 18, name: "Amelia Young", viewDuration: "09:45", engagementScore: 70, completionRate: "81%" }
  ];
  


const VideoAnalytics = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10'>
			{/* <Header title='Products' /> */}

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Total Views' icon={PlayCircle} value={234} color='#6366F1' />
					<StatCard name='Avg Watch Time' icon={TrendingUp} value={"10.5 / 12 mins"} color='#10B981' />
					<StatCard name='Total Replays' icon={ReplyAll} value={34} color='#F59E0B' />
					{/* <StatCard name='Total Revenue' icon={DollarSign} value={"$543,210"} color='#EF4444' />
					 */}
					<ProgressBar progress={75} label="Video Completion Rate" />
				</motion.div>

				{/* <ProductsTable /> */}

				{/* CHARTS */}
				<div className='grid grid-col-1 lg:grid-cols-2 gap-8'>
					{/* <UserRetention/>
                    <ProductPerformance/>
					<SalesTrendChart />
					<CategoryDistributionChart />
                    <UserActivityHeatmap/>
                    <AIPoweredInsights/> */}

					<DynamicBarChart
						chartData={watchTimeData}
						chartTitle="Watch Time Analytics"
						xAxisKey="WatchRange"
						yAxisKey="Users" />

					<DynamicDonutChart
						chartData={completionRateData}
						chartTitle="Completion Rate Distribution"
					/>
					<DynamicAreaChart
						chartData={engagementRateData}
						chartTitle="Engagment Rate Analysis"
						xAxisKey="time"
						yAxisKey="engagementRate"
					/>
					 <AIPoweredInsights/>
				</div>
				<div className="mt-8 mb-8"><VideoAnalyticsUsersTable
					data={videoAnalyticsData}
					tableTitle="Video Analytics Statistics"
					itemsPerPage={10}
					columns={["No.", "Name", "viewDuration", "engagementScore", "completionRate",]}
				/>
				</div>




			</main>
		</div>
	);
};
export default VideoAnalytics;