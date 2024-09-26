import { motion } from "framer-motion";

import Header from "./components/Header";
import StatCard from "./components/StatCard";
import DynamicBarChart from "./components/DynamicBarChart";
import AIPoweredInsights from "./components/AiInsights";
import { TimerIcon, User, Video,TrendingUp,Users ,VideoIcon,LucideTicketCheck,LucideRepeat} from "lucide-react";
import { MdQuiz } from "react-icons/md";

const scoreDistributionData = [
	{ ScoreRange: "0-20", Users: 5 },
	{ ScoreRange: "20-40", Users: 10 },
	{ ScoreRange: "40-60", Users: 15 },
	{ ScoreRange: "60-80", Users: 30 },
	{ ScoreRange: "80-100", Users: 20 },
];
const overallAIInsights = [
    {
        icon: TrendingUp,
        color: "text-green-500",
        insight: "65% complete videos, 75% finish quizzes.",
    },
    {
        icon: Users,
        color: "text-blue-500",
        insight: "Video drop-offs align with lower quiz scores.",
    },
    {
        icon: VideoIcon,
        color: "text-purple-500",
        insight: "Engagement drops to 40% after 12 minutes.",
    },
    {
        icon: LucideTicketCheck,
        color: "text-yellow-500",
        insight: "Watching over 10 minutes boosts quiz scores.",
    },
    {
        icon: LucideRepeat,
        color: "text-orange-500",
        insight: "Reattempting quizzes improves scores by 10 points.",
    },
    {
        icon: TrendingUp,
        color: "text-green-500",
        insight: "Average engagement score is 70% overall.",
    },
];



const Overview = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10'>
			{/* <Header title='Overview' /> */}

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Total Users' icon={User} value={334} color='#6366F1' />
					<StatCard name='Total Quiz Players' icon={MdQuiz} value={100} color='#10B981' />
					<StatCard name='Total Video Watchers' icon={Video} value={234} color='#F59E0B' />
					<StatCard name='Total Time Spent' icon={TimerIcon} value={"10 hrs"} color='#EF4444' />
				</motion.div>

	

				{/* CHARTS */}
				<div className='grid grid-col-1 lg:grid-cols-2 gap-8'>
				<DynamicBarChart
						chartData={scoreDistributionData} chartTitle="Total Engagement Score out of 100"
						xAxisKey="ScoreRange"
						yAxisKey="Users" />
				<AIPoweredInsights  insights={overallAIInsights} />

				</div>
			</main>
		</div>
	);
};
export default Overview;