import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { motion } from "framer-motion";

// const productPerformanceData = [
// 	{ name: "Product A", sales: 4000, revenue: 2400, profit: 2400 },
// 	{ name: "Product B", sales: 3000, revenue: 1398, profit: 2210 },
// 	{ name: "Product C", sales: 2000, revenue: 9800, profit: 2290 },
// 	{ name: "Product D", sales: 2780, revenue: 3908, profit: 2000 },
// 	{ name: "Product E", sales: 1890, revenue: 4800, profit: 2181 },
// ];
const scoreDistributionData = [
	{ ScoreRange: "0-10", Users: 5},
	{ScoreRange: "10-20", Users: 10},
	{ ScoreRange: "20-30", Users: 15},
	{ScoreRange: "30-40", Users: 30},
	{ScoreRange: "40-50", Users: 20},
];
// const scoreDistributionData = [
// 	{ ScoreRange: "0-10", Users: 5, revenue: 2400, profit: 2400 },
// 	{ScoreRange: "10-20", Users: 10, revenue: 1398, profit: 2210 },
// 	{ ScoreRange: "20-30", Users: 15, revenue: 9800, profit: 2290 },
// 	{ScoreRange: "30-40", Users: 30, revenue: 3908, profit: 2000 },
// 	{ScoreRange: "40-50", Users: 20,  },
// ];
// {
// 	"quiz_id": "quiz123",
// 	"total_users": 100,
// 	"score_distribution": [
// 	  {
// 		"score_range": "90-100",
// 		"number_of_users": 25
// 	  },
// 	  {
// 		"score_range": "80-89",
// 		"number_of_users": 30
// 	  },
// 	  {
// 		"score_range": "70-79",
// 		"number_of_users": 20
// 	  },
// 	  {
// 		"score_range": "60-69",
// 		"number_of_users": 10
// 	  },
// 	  {
// 		"score_range": "50-59",
// 		"number_of_users": 8
// 	  },
// 	  {
// 		"score_range": "40-49",
// 		"number_of_users": 4
// 	  },
// 	  {
// 		"score_range": "30-39",
// 		"number_of_users": 2
// 	  },
// 	  {
// 		"score_range": "0-29",
// 		"number_of_users": 1
// 	  }
// 	],
// 	"average_score": 78.5,
// 	"median_score": 82,
// 	"highest_score": 100,
// 	"lowest_score": 15
//   }
  

const ProductPerformance = () => {
	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-filter 
            bg-n-9/40 backdrop-blur border border-n-1/10 p-6 rounded-lg shadow-md'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.4 }}
		>
			<h2 className='text-xl font-semibold text-gray-100 mb-4'>Score Distribution</h2>
			<div style={{ width: "100%", height: 300 }}>
				<ResponsiveContainer>
					<BarChart data={scoreDistributionData}>
						<CartesianGrid strokeDasharray='3 3' stroke='#374151' />
						<XAxis dataKey='ScoreRange' stroke='#9CA3AF' />
						<YAxis stroke='#9CA3AF' />
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)",
								borderColor: "#4B5563",
							}}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						<Legend />
						<Bar dataKey='Users' fill='#8B5CF6' />
						{/* <Bar dataKey='revenue' fill='#10B981' />
						<Bar dataKey='profit' fill='#F59E0B' /> */}
					</BarChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};
export default ProductPerformance;
