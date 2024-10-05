import { Menu } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

const Sidebar = ({ navItems, setActiveSection }) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	// Function to handle section change when a nav item is clicked
	const handleSectionClick = (sectionName) => {
		setActiveSection(sectionName); // Update the active section in the parent component
	};

	return (
		<motion.div
			className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
				isSidebarOpen ? "w-64" : "w-20"
			}`}
			animate={{ width: isSidebarOpen ? 256 : 80 }}
		>
			<div className="h-full p-4 flex flex-col border-r bg-n-8 backdrop-blur border border-n-1/10 shadow-md">
				<motion.button
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					onClick={() => setIsSidebarOpen(!isSidebarOpen)}
					className="p-2 rounded-full hover:bg-n-9/40 transition-colors max-w-fit"
				>
					<Menu size={24} />
				</motion.button>

				<nav className="mt-8 flex-grow">
					{navItems.map((item) => (
						<motion.div
							key={item.name}
							className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2 cursor-pointer"
							onClick={() => handleSectionClick(item.name)} // Call the section change handler
						>
							<item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
							<AnimatePresence>
								{isSidebarOpen && (
									<motion.span
										className="ml-4 whitespace-nowrap"
										initial={{ opacity: 0, width: 0 }}
										animate={{ opacity: 1, width: "auto" }}
										exit={{ opacity: 0, width: 0 }}
										transition={{ duration: 0.2, delay: 0.3 }}
									>
										{item.name}
									</motion.span>
								)}
							</AnimatePresence>
						</motion.div>
					))}
				</nav>
			</div>
		</motion.div>
	);
};

export default Sidebar;
