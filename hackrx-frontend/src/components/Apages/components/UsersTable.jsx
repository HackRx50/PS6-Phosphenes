// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Search } from "lucide-react";

// const userData = [
// 	{ id: 1, name: "John Doe", score: "50/100", correctAnswers: "5/10", reattempt: 1 },
// 	{ id: 2, name: "Jane Smith", score: "80/100", correctAnswers: "8/10", reattempt: 0 },
// 	{ id: 3, name: "Michael Johnson", score: "40/100", correctAnswers: "4/10", reattempt: 2 },
// 	{ id: 4, name: "Emily Davis", score: "90/100", correctAnswers: "9/10", reattempt: 1 },
// 	{ id: 5, name: "Daniel Brown", score: "60/100", correctAnswers: "6/10", reattempt: 3 },
// 	{ id: 6, name: "Olivia Martinez", score: "70/100", correctAnswers: "7/10", reattempt: 1 },
// 	{ id: 7, name: "Lucas Garcia", score: "55/100", correctAnswers: "5/10", reattempt: 2 },
// 	{ id: 8, name: "Sophia Wilson", score: "85/100", correctAnswers: "8/10", reattempt: 0 },
// 	{ id: 9, name: "Ethan Moore", score: "75/100", correctAnswers: "7/10", reattempt: 1 },
// 	{ id: 10, name: "Ava Taylor", score: "65/100", correctAnswers: "6/10", reattempt: 2 },
// 	{ id: 11, name: "Mason Anderson", score: "50/100", correctAnswers: "5/10", reattempt: 1 },
// 	{ id: 12, name: "Isabella Thomas", score: "80/100", correctAnswers: "8/10", reattempt: 1 },
// 	{ id: 13, name: "Logan Harris", score: "45/100", correctAnswers: "4/10", reattempt: 3 },
// 	{ id: 14, name: "Mia Clark", score: "55/100", correctAnswers: "5/10", reattempt: 2 },
// 	{ id: 15, name: "James Lewis", score: "85/100", correctAnswers: "8/10", reattempt: 1 },
// 	{ id: 16, name: "Charlotte Robinson", score: "90/100", correctAnswers: "9/10", reattempt: 0 },
// 	{ id: 17, name: "Benjamin Walker", score: "70/100", correctAnswers: "7/10", reattempt: 2 },
// 	{ id: 18, name: "Amelia Young", score: "60/100", correctAnswers: "6/10", reattempt: 1 },
// ];

// const UsersTable = () => {
// 	const [searchTerm, setSearchTerm] = useState("");
// 	const [filteredUsers, setFilteredUsers] = useState(userData);

// 	const handleSearch = (e) => {
// 		const term = e.target.value.toLowerCase();
// 		setSearchTerm(term);
// 		const filtered = userData.filter(
// 			(user) =>
// 				user.name.toLowerCase().includes(term) ||
// 				user.score.toLowerCase().includes(term) // Fixed to use score instead of email
// 		);
// 		setFilteredUsers(filtered);
// 	};

// 	return (
// 		<motion.div
// 			className='bg-n-9/40 backdrop-blur border border-n-1/10 shadow-md bg-opacity-50 rounded-xl p-6 border-gray-700'
// 			initial={{ opacity: 0, y: 20 }}
// 			animate={{ opacity: 1, y: 0 }}
// 			transition={{ delay: 0.2 }}
// 		>
// 			<div className='flex justify-between items-center mb-6'>
// 				<h2 className='text-xl font-semibold text-gray-100'>Users</h2>
// 				<div className='relative'>
// 					<input
// 						type='text'
// 						placeholder='Search users...'
// 						className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
// 						value={searchTerm}
// 						onChange={handleSearch}
// 					/>
// 					<Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
// 				</div>
// 			</div>

// 			<div className='overflow-x-auto'>
// 				<table className='min-w-full divide-y divide-gray-700'>
// 					<thead>
// 						<tr>
// 							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
// 								Name
// 							</th>
// 							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
// 								Score
// 							</th>
// 							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
// 								No. Of Correct Answers
// 							</th>
// 							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
// 								Reattempts
// 							</th>
// 						</tr>
// 					</thead>

// 					<tbody className='divide-y divide-gray-700'>
// 						{filteredUsers.map((user) => (
// 							<motion.tr
// 								key={user.id}
// 								initial={{ opacity: 0 }}
// 								animate={{ opacity: 1 }}
// 								transition={{ duration: 0.3 }}
// 							>
// 								<td className='px-6 py-4 whitespace-nowrap'>
// 									<div className='flex items-center'>
// 										<div className='flex-shrink-0 h-10 w-10'>
// 											<div className='h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold'>
// 												{user.name.charAt(0)}
// 											</div>
// 										</div>
// 										<div className='ml-4'>
// 											<div className='text-sm font-medium text-gray-100'>{user.name}</div>
// 										</div>
// 									</div>
// 								</td>

// 								<td className='px-6 py-4 whitespace-nowrap'>
// 									<div className='text-sm text-gray-300'>{user.score}</div>
// 								</td>
// 								<td className='px-6 py-4 whitespace-nowrap'>
// 									<div className='text-sm text-gray-300'>{user.correctAnswers}</div>
// 								</td>

// 								<td className='px-6 py-4 whitespace-nowrap'>
// 									<div className='text-sm text-gray-300'>{user.reattempt}</div>
// 								</td>
// 							</motion.tr>
// 						))}
// 					</tbody>
// 				</table>
// 			</div>
// 		</motion.div>
// 	);
// };

// export default UsersTable;
import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

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

const UsersTable = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;

	const handleSearch = (e) => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);
		setCurrentPage(1); // Reset to first page on search
	};

	const filteredUsers = userData.filter(
		(user) =>
			user.name.toLowerCase().includes(searchTerm) ||
			user.score.toLowerCase().includes(searchTerm)
	);

	const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	const currentItems = filteredUsers.slice(
		(itemsPerPage * currentPage) - itemsPerPage,
		itemsPerPage * currentPage
	);

	return (
		<motion.div
			className='bg-n-9/40 backdrop-blur border border-n-1/10 shadow-md bg-opacity-50 rounded-xl p-6 border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-xl font-semibold text-gray-100'>Users</h2>
				<div className='relative'>
					<input
						type='text'
						placeholder='Search users...'
						className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
						value={searchTerm}
						onChange={handleSearch}
					/>
					<Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
				</div>
			</div>

			<div className='overflow-x-auto'>
				<table className='min-w-full divide-y divide-gray-700'>
					<thead>
						<tr>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								No.
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Name
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Score
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Correct Answers
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Reattempts
							</th>
						</tr>
					</thead>

					<tbody className='divide-y divide-gray-700'>
						{currentItems.map((user) => (
							<motion.tr
								key={user.id}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.3 }}
							>
                                <td className='px-6 py-4 whitespace-nowrap'>
									<div className='text-sm text-gray-300'>{user.id}</div>
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='flex items-center'>
										<div className='flex-shrink-0 h-10 w-10'>
											<div className='h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold'>
												{user.name.charAt(0)}
											</div>
										</div>
										<div className='ml-4'>
											<div className='text-sm font-medium text-gray-100'>{user.name}</div>
										</div>
									</div>
								</td>

								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='text-sm text-gray-300'>{user.score}</div>
								</td>
								<td className='px-6 py-4 whitespace-nowrap '>
									<div className='text-sm text-gray-300'>{user.correctAnswers}</div>
								</td>

								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='text-sm text-gray-300'>{user.reattempt}</div>
								</td>
							</motion.tr>
						))}
					</tbody>
				</table>
			</div>

			<div className='flex justify-center mt-4 gap-2'>
				<nav className='flex items-center gap-2'>
					<button
						className='px-3 py-1 text-sm font-medium text-gray-300 bg-gray-800 hover:bg-purple-700 disabled:opacity-50 rounded-full'
						onClick={() => handlePageChange(currentPage - 1)}
						disabled={currentPage === 1}
					>
						Previous
					</button>
					{Array.from({ length: totalPages }, (_, index) => (
						<button
							key={index}
							className={`px-3 py-1 text-sm font-medium ${currentPage === index + 1 ? 'bg-purple-500 text-white' : 'bg-gray-800 text-gray-300'} rounded-full hover:bg-purple-600`}
							onClick={() => handlePageChange(index + 1)}
						>
							{index + 1}
						</button>
					))}
					<button
						className='px-3 py-1 text-sm font-medium text-gray-300 bg-gray-800 rounded-full hover:bg-purple-700 disabled:opacity-50'
						onClick={() => handlePageChange(currentPage + 1)}
						disabled={currentPage === totalPages}
					>
						Next
					</button>
				</nav>
			</div>
		</motion.div>
	);
};

export default UsersTable;
