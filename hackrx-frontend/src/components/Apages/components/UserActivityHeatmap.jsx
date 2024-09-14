
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { motion } from "framer-motion";

const userActivityData = [
	{ name: "Q1", "Easy": 20, "Medium": 20, "Hard": 20, "Very Hard": 20},
	{ name: "Q2", "Easy": 10, "Medium": 20, "Hard": 30, "Very Hard": 25,  },
	{ name: "Q3", "Easy": 8, "Medium": 12, "Hard": 28, "Very Hard": 25,  },
	{ name: "Q4", "Easy": 5, "Medium": 15, "Hard": 25, "Very Hard": 30, },
	{ name: "Q5", "Easy": 20, "Medium": 10, "Hard": 30, "Very Hard": 15,  },
];
// // const questionDifficultyData = [
// // 	{
// // 	  question: "Question 1",
// // 	  difficulty: [
// // 		{ range: "0-20%", value: 5 },
// // 		{ range: "20-40%", value: 15 },
// // 		{ range: "40-60%", value: 25 },
// // 		{ range: "60-80%", value: 30 },
// // 		{ range: "80-100%", value: 25 }
// // 	  ]
// // 	},
// // 	{
// // 	  question: "Question 2",
// // 	  difficulty: [
// // 		{ range: "0-20%", value: 10 },
// // 		{ range: "20-40%", value: 20 },
// // 		{ range: "40-60%", value: 30 },
// // 		{ range: "60-80%", value: 25 },
// // 		{ range: "80-100%", value: 15 }
// // 	  ]
// // 	},
// // 	{
// // 	  question: "Question 3",
// // 	  difficulty: [
// // 		{ range: "0-20%", value: 8 },
// // 		{ range: "20-40%", value: 12 },
// // 		{ range: "40-60%", value: 28 },
// // 		{ range: "60-80%", value: 25 },
// // 		{ range: "80-100%", value: 27 }
// // 	  ]
// // 	},
// // 	// Add more questions as needed
// //value: Indicates how many users found the question within that difficulty range
// //   ];
  

const UserActivityHeatmap = () => {
	return (
		<motion.div
			className="border-gray-700 bg-n-9/40 backdrop-blur border border-n-1/10 p-6 rounded-lg shadow-md"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.4 }}
		>
			<h2 className='text-xl font-semibold text-gray-100 mb-4'>Question Difficulty Heatmap</h2>
			<div style={{ width: "100%", height: 300 }}>
				<ResponsiveContainer>
					<BarChart data={userActivityData}>
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
						<Bar dataKey='Easy' stackId='a' fill='#6366F1' name="Easy" />
						<Bar dataKey='Medium' stackId='a' fill='#8B5CF6' name="Medium" />
						<Bar dataKey='Hard' stackId='a' fill='#EC4899' name="Hard" />
						<Bar dataKey='Very Hard' stackId='a' fill='#10B981' name="Very Hard" />
						{/* <Bar dataKey='yo' stackId='a' fill='#F59E0B' name="yo" /> */}
					</BarChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};

export default UserActivityHeatmap;
