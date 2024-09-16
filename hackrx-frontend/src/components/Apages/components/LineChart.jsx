import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const userRetentionData = [
	{ name: "Q1", "Avg Time Taken": 2.5 },
	{ name: "Q2", "Avg Time Taken": 3 },
	{ name: "Q3", "Avg Time Taken": 4.6 },
	{ name: "Q4", "Avg Time Taken": 3 },
	{ name: "Q5", "Avg Time Taken": 4.5 },
	{ name: "Q6", "Avg Time Taken": 4.0 },
	{ name: "Q7", "Avg Time Taken": 3.8 },
	{ name: "Q8", "Avg Time Taken": 3.5 },
];//avgtimeperquestion

const UserRetention = () => {
	return (
		<motion.div
			className=' bg-opacity-50 backdrop-filter 
            bg-n-9/40 backdrop-blur border border-n-1/10 p-6 rounded-lg shadow-md'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.5 }}
		>
			<h2 className='text-xl font-semibold text-gray-100 mb-4'>Average Time Per Question</h2>
			<div style={{ width: "100%", height: 300 }}>
				<ResponsiveContainer>
					<LineChart data={userRetentionData}>
						<CartesianGrid strokeDasharray='3 3' stroke='#374151' />
						<XAxis dataKey='name' stroke='#9CA3AF' />
						<YAxis stroke='#9CA3AF' />
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)",
								borderColor: "#4B5563",
							}}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						<Legend />
						<Line type='monotone' dataKey='Avg Time Taken' stroke='#8B5CF6' strokeWidth={2} />
					</LineChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};
export default UserRetention;
