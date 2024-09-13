import { motion } from "framer-motion";

import Header from "./components/Header";
import StatCard from "./components/StatCard";

import { AlertTriangle, DollarSign, Package, TrendingUp } from "lucide-react";
import CategoryDistributionChart from "./components/CategoryDistributionChart";
import SalesTrendChart from "./components/SalesTrendChart";
import ProductsTable from "./components/ProductTable";
import UserRetention from "./components/UserRetention";
import ProductPerformance from "./components/ProductPerformance";
import UserActivityHeatmap from "./components/UserActivityHeatmap";
import AIPoweredInsights from "./components/AIPoweredInsights";

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
					<StatCard name='Total Products' icon={Package} value={1234} color='#6366F1' />
					<StatCard name='Top Selling' icon={TrendingUp} value={89} color='#10B981' />
					<StatCard name='Low Stock' icon={AlertTriangle} value={23} color='#F59E0B' />
					<StatCard name='Total Revenue' icon={DollarSign} value={"$543,210"} color='#EF4444' />
				</motion.div>

				{/* <ProductsTable /> */}

				{/* CHARTS */}
				<div className='grid grid-col-1 lg:grid-cols-2 gap-8'>
                    <UserRetention/>
                    <ProductPerformance/>
					<SalesTrendChart />
					<CategoryDistributionChart />
                    <UserActivityHeatmap/>
                    <AIPoweredInsights/>
				</div>
			</main>
		</div>
	);
};
export default Overview;