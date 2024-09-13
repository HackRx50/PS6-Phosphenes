import { motion } from "framer-motion";

const ProgressBar = ({ progress, label }) => {
	return (
		<motion.div
			className='bg-opacity-50 backdrop-filter bg-n-9/40 backdrop-blur border border-n-1/10 p-6 rounded-lg shadow-md'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.5 }}
		>
			<span className='flex items-center text-sm font-medium text-gray-400 '>{label}</span>
            <div className="flex justify-center items-center gap-1 mt-2">
			<div className='relative w-full h-4 bg-gray-700 rounded-full'>
				<motion.div
					className='absolute h-4 bg-purple-500 rounded-full '
					initial={{ width: 0 }}
					animate={{ width: `${progress}%` }}
					transition={{ duration: 1 }}
				></motion.div>
			</div>
			<div className='text-right  text-sm text-gray-100 flex justify-center items-center'>{progress}%</div>
            </div>
		</motion.div>
	);
};

export default ProgressBar;
