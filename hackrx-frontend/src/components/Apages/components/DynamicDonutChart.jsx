import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { motion } from "framer-motion";

// Define colors for completed vs dropped-off
const COLORS = ['#10B981', '#EC4899']; // Green for completed, red for dropped-off

const DynamicDonutChart = ({ chartData, chartTitle }) => {
	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-filter 
            bg-n-9/40 backdrop-blur border border-n-1/10 p-6 rounded-lg shadow-md'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.4 }}
		>
			<h2 className='text-xl font-semibold text-gray-100 mb-4'>{chartTitle}</h2>
			<div style={{ width: "100%", height: 300 }}>
				<ResponsiveContainer>
					<PieChart>
						<Pie
							data={chartData}
							dataKey="value"
							nameKey="name"
							innerRadius={50}
							outerRadius={100}
							fill="#8884d8"
							paddingAngle={5}
						>
							{chartData.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
							))}
						</Pie>
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)",
								borderColor: "#4B5563",
							}}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						<Legend />
					</PieChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};

export default DynamicDonutChart;
