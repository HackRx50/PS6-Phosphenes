import { motion } from "framer-motion";

import Header from "./components/Header";
import StatCard from "./components/StatCard";

import { AlertTriangle, DollarSign, Package, TrendingUp, Users2 } from "lucide-react";
import CategoryDistributionChart from "./components/CategoryDistributionChart";
import SalesTrendChart from "./components/SalesTrendChart";
import ProductsTable from "./components/ProductTable";
import UserRetention from "./components/UserRetention";
import ProductPerformance from "./components/ProductPerformance";
import UserActivityHeatmap from "./components/UserActivityHeatmap";
import AIPoweredInsights from "./components/AIPoweredInsights";
import ProgressBar from "./components/ProgressBar";
import UsersTable from "./components/UsersTable";
import { GrScorecard } from "react-icons/gr";
import { MdOutlineQuiz } from "react-icons/md";

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

				{/* <ProductsTable /> */}

				{/* CHARTS */}
				<div className='grid grid-col-1 lg:grid-cols-2 gap-8'>
                    <UserRetention/>
					{/* avg time taken per ques line graph */}
                    <ProductPerformance/> 
					{/* //score ditribution */}
					{/* <SalesTrendChart /> */}
					<CategoryDistributionChart />
					{/* Accuracy rate per question */}
					
                    <UserActivityHeatmap/>
					{/* question difficulty heatmap */}


                    {/* <AIPoweredInsights/> */}
				</div>
				<div className="mt-8 mb-8"><UsersTable/></div>
				
			</main>
		</div>
	);
};
export default QuizAnalytics;