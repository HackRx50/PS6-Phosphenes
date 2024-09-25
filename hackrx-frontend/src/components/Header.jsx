import { Link, useLocation } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import logo from "../assets/logo/logo-aura.png";
import { useState, useEffect, useRef } from "react";
import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";
import { auth, signOut } from "./firebaseConfig";
import SharePopup from "./SharePopUp"; // Import the SharePopup component

const homeNavigation = [
  { id: 1, title: "Features", url: "#features" },
  { id: 2, title: "How It Works", url: "#howitworks" },
  { id: 3, title: "Use Cases", url: "#Usecases" },
  { id: 4, title: "Impact", url: "#impact" },
  { id: 5, title: "Pricing", url: "#pricing" },
 
];

const dashboardNavigation = [
  { id: 1, title: "My Projects", url: "/projects" },
  { id: 2, title: "Dashboard", url: "/overview" },
  { id: 3, title: "Help", url: "/help" },
];

const Header = () => {
  const location = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sharePopupOpen, setSharePopupOpen] = useState(false); // State to handle share popup visibility
  const dropdownRef = useRef(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user || null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleProfileClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const openSharePopup = () => {
    setSharePopupOpen(true); // Open the share popup
  };

  const closeSharePopup = () => {
    setSharePopupOpen(false); // Close the share popup
  };

  const getNavigationLinks = () => {
    if (
      location.pathname.startsWith("/overview") ||
      location.pathname.startsWith("/getstarted") ||
      location.pathname.startsWith("/customisation") ||
      location.pathname.startsWith("/preview") ||
      location.pathname.startsWith("/quiz") ||
      location.pathname.startsWith("/overview") ||
      location.pathname.startsWith("/quizanalytics") ||
      location.pathname.startsWith("/videoanalytics") ||
      location.pathname.startsWith("/projects")
    ) {
      return dashboardNavigation;
    }
    return homeNavigation; // Default to homeNavigation if not on dashboard
  };

  const navigationLinks = getNavigationLinks(); // Get the appropriate links
  const isHomePage = location.pathname === "/"; // Check if it's the home page

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${
        openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <Link className="flex w-[12rem] xl:mr-8" to="/">
          <img src={logo} width={35} height={35} alt="Aura AI" />
          <p className="ml-3 mt-3 text-2xl bg-gradient-text text-transparent bg-clip-text font-bold">
            AURA.ai
          </p>
        </Link>

        <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent ${
            location.pathname.startsWith("/overview") ? "lg:ml-auto" : "" // Right-align for dashboard
          }`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigationLinks.map((item) => (
              <a
                key={item.id}
                href={item.url}
                onClick={() => setOpenNavigation(false)}
                className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                  location.pathname === item.url
                    ? "lg:text-n-1"
                    : "lg:text-n-1/50"
                } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
              >
                {item.title}
              </a>
            ))}
          </div>

          <HamburgerMenu />
        </nav>

        {location.pathname.startsWith("/projects") && (
          <Button
            onClick={openSharePopup}
            className="hidden lg:flex mr-4"
          >
            Share
          </Button>
        )}

        {user ? (
          <div className="flex items-center space-x-4 ml-auto">
            {isHomePage && (
              <span className="hidden lg:flex text-n-1">
                Welcome, {user.displayName || "User"}
              </span>
            )}
            <img
              src={user.photoURL || "default-profile-pic-url"}
              alt={user.displayName || "User"}
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={handleProfileClick}
            />
            {dropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute right-0 top-full mt-2 bg-n-9 border border-n-6 rounded-md shadow-lg py-2 w-48"
              >
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-n-1 hover:bg-n-7"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login">
            <Button className="hidden lg:flex" href="#login">
              Sign in
            </Button>
          </Link>
        )}

        <Button
          className="ml-auto lg:hidden"
          px="px-3"
          onClick={toggleNavigation}
        >
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>

      {sharePopupOpen && (
        <SharePopup onClose={closeSharePopup} /> // Render the SharePopup component
      )}
    </div>
  );
};

export default Header;
