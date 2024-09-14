import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { motion } from "framer-motion";

const DynamicAreaChart = ({ chartData, chartTitle, xAxisKey, yAxisKey }) => {
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
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray='3 3' stroke='#374151' />
            <XAxis dataKey={xAxisKey} stroke='#9CA3AF' />
            <YAxis stroke='#9CA3AF' />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            <Legend />
            <Area
              type='monotone'
              dataKey={yAxisKey}
              stroke='#8B5CF6'
              fill='#8B5CF6'
              fillOpacity={0.3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default DynamicAreaChart;
