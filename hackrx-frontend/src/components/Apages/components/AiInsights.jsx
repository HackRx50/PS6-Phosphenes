import { motion } from "framer-motion";
import { TrendingUp, Users, VideoIcon, LucideTicketCheck } from "lucide-react";

// Define the default insights (optional, in case no data is passed)
const DEFAULT_INSIGHTS = [
  {
    icon: TrendingUp,
    color: "text-green-500",
    insight: "43% of viewers drop off before finishing, indicating room for retention improvements.",
  },
  {
    icon: Users,
    color: "text-blue-500",
    insight: "The highest drop-off occurs around the 4.6-minute mark, suggesting a need to enhance content at this point.",
  },
  {
    icon: VideoIcon,
    color: "text-purple-500",
    insight: 'Engagement drops from 75% at 1 minute to 40% at 12 minutes, signaling attention loss over time.',
  },
  {
    icon: LucideTicketCheck,
    color: "text-yellow-500",
    insight: "The 4-8 minute range has the most viewers, with 20 users, showing strong engagement in the middle of the video.",
  },
];

const AIPoweredInsights = ({ insights = DEFAULT_INSIGHTS }) => {
  return (
    <motion.div
      className="backdrop-filter bg-n-9/40 backdrop-blur border border-n-1/10 p-6 rounded-lg shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0 }}
    >
      <h2 className="text-xl font-semibold text-gray-100 mb-4">AI-Powered Insights</h2>
      <div className="space-y-4">
        {insights.map((item, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className={`p-2 rounded-full ${item.color} bg-opacity-20`}>
              <item.icon className={`size-6 ${item.color}`} />
            </div>
            <p className="text-gray-300">{item.insight}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default AIPoweredInsights;
