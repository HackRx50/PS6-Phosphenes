import { motion } from "framer-motion";

import Header from "./components/Header";
import StatCard from "./components/StatCard";

import { Users2 } from "lucide-react";
import CategoryDistributionChart from "./components/PieChart";


import UserRetention from "./components/LineChart";

import UserActivityHeatmap from "./components/Heatmap";

import ProgressBar from "./components/ProgressBar";
import UsersTable from "./components/UsersTable";
import { GrScorecard } from "react-icons/gr";
import { MdOutlineQuiz } from "react-icons/md";
import DynamicBarChart from "./components/DynamicBarChart";

const scoreDistributionData = [
	{ ScoreRange: "0-10", Users: 5 },
	{ ScoreRange: "10-20", Users: 10 },
	{ ScoreRange: "20-30", Users: 15 },
	{ ScoreRange: "30-40", Users: 30 },
	{ ScoreRange: "40-50", Users: 20 },
];

const userData = [
	{ id: 1, name: "John Doe", score: "50/100", correctAnswers: "5/10", reattempt: 1 },
	{ id: 2, name: "Jane Smith", score: "80/100", correctAnswers: "8/10", reattempt: 0 },
	{ id: 3, name: "Michael Johnson", score: "40/100", correctAnswers: "4/10", reattempt: 2 },
	{ id: 4, name: "Emily Davis", score: "90/100", correctAnswers: "9/10", reattempt: 1 },
	{ id: 5, name: "Daniel Brown", score: "60/100", correctAnswers: "6/10", reattempt: 3 },
	{ id: 6, name: "Olivia Martinez", score: "70/100", correctAnswers: "7/10", reattempt: 1 },
	{ id: 7, name: "Lucas Garcia", score: "55/100", correctAnswers: "5/10", reattempt: 2 },
	{ id: 8, name: "Sophia Wilson", score: "85/100", correctAnswers: "8/10", reattempt: 0 },
	{ id: 9, name: "Ethan Moore", score: "75/100", correctAnswers: "7/10", reattempt: 1 },
	{ id: 10, name: "Ava Taylor", score: "65/100", correctAnswers: "6/10", reattempt: 2 },
	{ id: 11, name: "Mason Anderson", score: "50/100", correctAnswers: "5/10", reattempt: 1 },
	{ id: 12, name: "Isabella Thomas", score: "80/100", correctAnswers: "8/10", reattempt: 1 },
	{ id: 13, name: "Logan Harris", score: "45/100", correctAnswers: "4/10", reattempt: 3 },
	{ id: 14, name: "Mia Clark", score: "55/100", correctAnswers: "5/10", reattempt: 2 },
	{ id: 15, name: "James Lewis", score: "85/100", correctAnswers: "8/10", reattempt: 1 },
	{ id: 16, name: "Charlotte Robinson", score: "90/100", correctAnswers: "9/10", reattempt: 0 },
	{ id: 17, name: "Benjamin Walker", score: "70/100", correctAnswers: "7/10", reattempt: 2 },
	{ id: 18, name: "Amelia Young", score: "60/100", correctAnswers: "6/10", reattempt: 1 },
];

const QuizAnalytics = () => {
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
					<StatCard name='Total Players' icon={Users2} value={100} color='#6366F1' />
					<StatCard name='Average Score ' icon={GrScorecard} value="30/100" color='#10B981' />
					{/* <StatCard name='Top Performers' icon={AlertTriangle} value={"23%"} color='#F59E0B' /> */}
					<StatCard name='Total Quiz Reattempts' icon={MdOutlineQuiz} value={"186"} color='#EF4444' />
					<ProgressBar progress={75} label="Quiz Completion Rate" />
				</motion.div>

				

				{/* CHARTS */}
				<div className='grid grid-col-1 lg:grid-cols-2 gap-8'>
					<UserRetention />
					{/* avg time taken per ques line graph */}

					<DynamicBarChart
						chartData={scoreDistributionData} chartTitle="Score Distribution"
						xAxisKey="ScoreRange"
						yAxisKey="Users" />

					{/* <SalesTrendChart /> */}
					<CategoryDistributionChart />
					{/* Accuracy rate per question */}

					<UserActivityHeatmap />
					{/* question difficulty heatmap */}


					
				</div>
				<div className="mt-8 mb-8"><UsersTable
					data={userData}
					tableTitle="User Statistics"
					itemsPerPage={10}
					columns={["No.", "Name", "Score", "Correct Answers", "Reattempts"]}
				/>
				</div>

			</main>
		</div>
	);
};
export default QuizAnalytics;