import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const VideoAnalyticsUsersTable = ({ 
  data, 
  tableTitle = "Users", 
  itemsPerPage = 10, 
  columns = ["No.", "Name", "viewDuration", "engagementScore", "completionRate"] 
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page on search
  };

  const filteredUsers = data.filter(
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
        <h2 className='text-xl font-semibold text-gray-100'>{tableTitle}</h2>
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
              {columns.map((col, index) => (
                <th 
                  key={index}
                  className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className='divide-y divide-gray-700'>
            {currentItems.map((user, index) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='text-sm text-gray-300'>{(currentPage - 1) * itemsPerPage + index + 1}</div>
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
                  <div className='text-sm text-gray-300'>{user.viewDuration}</div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='text-sm text-gray-300'>{user.engagementScore}</div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='text-sm text-gray-300'>{user.completionRate}</div>
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

export default VideoAnalyticsUsersTable;
