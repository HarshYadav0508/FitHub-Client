import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Switch } from '@mui/material';
import { motion } from 'framer-motion';
import { AuthContext } from '../../utilities/providers/AuthProvider';
import Swal from 'sweetalert2';
import photoURL from '../../assets/home/user.png';
import { FaBars } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5'; // Import the close icon

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff0000",
    },
    secondary: {
      main: "#00e300",
    },
  },
});

const navLinks = [
  { name: 'Home', route: '/' },
  { name: 'Instructors', route: '/instructors' },
  { name: 'Classes', route: '/classes' },
];

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHome, setIsHome] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isFixed, setIsFixed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [navBg, setNavBg] = useState('bg-transparent');
  const { logout, user } = useContext(AuthContext);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const darkClass = 'dark';
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add(darkClass);
    } else {
      root.classList.remove(darkClass);
    }
  }, [isDarkMode]);

  useEffect(() => {
    setIsHome(location.pathname === '/');
    setIsLogin(location.pathname === '/login');
    setIsFixed(location.pathname === '/signup' || location.pathname === '/login');
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.pageYOffset;
      setScrollPosition(currentPosition);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const bgClass = scrollPosition > 100
      ? (isHome ? 'bg-white backdrop-filter backdrop-blur-xl bg-opacity-0' : 'bg-white text-black')
      : (isHome || location.pathname === '/' ? 'bg-transparent' : 'bg-white text-black');
    const darkBgClass = isDarkMode ? 'dark:bg-dark dark:text-white' : '';
    setNavBg(`${bgClass} ${darkBgClass}`);
  }, [scrollPosition, isHome, location.pathname, isDarkMode]);

  const handleLogoutAndCloseMenu = (e) => {
    e.preventDefault();
    toggleMobileMenu(); // Close the mobile menu first
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout"
    }).then((result) => {
      if (result.isConfirmed) {
        logout().then(
          Swal.fire({
            title: "Logged Out",
            text: "You have been Logged out",
            icon: "success"
          })
        ).catch((err) => console.log(err))
      }
      navigate('/')
    });
  };

  return (
    // <ThemeProvider theme={theme}>

    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`${isHome ? navBg : 'bg-white dark:bg-dark backdrop-blur-2xl'} ${isFixed ? 'static' : 'fixed'} top-0 transition-colors duration-500 ease-in-out w-full z-10`}
    >
      <div className='lg:w-[95%] mx-auto sm:px-6 lg:px-6'>
        <div className='px-4 py-4 flex items-center justify-between'>
          <div onClick={() => navigate('/')} className='flex-shrink-0 cursor-pointer pl-7 md:p-0 flex items-center'>
            <div className='dark:text-white'>
              <h1 className='text-2xl inline-flex gap-3 items-center font-bold'>
                FitHub <img src='/fithub-logo.png' className='w-8 h-8 rounded-full' alt='FitHub Logo' />
              </h1>
              <p className='font-bold text-[13px] tracking-[4px]'>Empower Health</p>
            </div>
          </div>

          <div className='md:hidden flex items-center'>
            <button type='button' onClick={toggleMobileMenu} className='text-gray-300 hover:text-white focus:outline-none'>
              <FaBars className='h-6 w-6 hover:text-primary' />
            </button>
          </div>

          <div className={`fixed top-0 right-0 h-full bg-white dark:bg-dark z-20 transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} w-3/4 md:w-1/2 lg:w-1/4`}>
            <div className='flex justify-end p-4'>
              <button type='button' onClick={toggleMobileMenu} className='text-gray-500 hover:text-black'>
                <IoClose className='h-6 w-6' />
              </button>
            </div>
            <div className='flex flex-col items-center'>
              <ul className='space-y-4'>
                {navLinks.map((link) => (
                  <li key={link.route}>
                    <NavLink
                      to={link.route}
                      onClick={toggleMobileMenu}
                      className={({ isActive }) => {
                        const baseClass = `font-bold text-xl py-2 px-4 block`;
                        const activeClass = isActive ? 'text-secondary' : '';
                        const colorClass = navBg.includes('bg-transparent')
                          ? 'text-black'
                          : 'text-black dark:text-white';
                        
                        return `${baseClass} ${activeClass} ${colorClass}`;
                      }}
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
                {
                  !user && (
                    isLogin ? (
                      <li>
                        <NavLink to={"/signup"} onClick={toggleMobileMenu} className={({ isActive }) => `font-bold text-xl py-2 px-4 block ${isActive ? 'text-secondary' : ''}`}>
                          Sign Up
                        </NavLink>
                      </li>
                    ) : (
                      <li>
                        <NavLink to={"/login"} onClick={toggleMobileMenu} className={({ isActive }) => `font-bold text-xl py-2 px-4 block ${isActive ? 'text-secondary' : ''}`}>
                          Login
                        </NavLink>
                      </li>
                    )
                  )
                }
                {
                  user && (
                    <>
                      <li>
                        <NavLink to={'/dashboard'} onClick={toggleMobileMenu} className={({ isActive }) => `font-bold text-xl py-2 px-4 block ${isActive ? 'text-secondary' : ''}`}>
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <img src={user.photoURL} alt='pic' className='h-[40px] rounded-full w-[40px]' />
                      </li>
                      <li>
                        <button onClick={handleLogoutAndCloseMenu} className='font-bold text-xl py-2 px-4 block bg-secondary text-white rounded-xl' >
                          Logout
                        </button>
                      </li>
                    </>
                  )
                }
                <li>
                  <ThemeProvider theme={theme}>
                    <div className='flex flex-col justify-center items-center'>
                      <Switch checked={isDarkMode} onChange={() => setIsDarkMode(!isDarkMode)} />
                      <h1 className='text-[8px]'>Dark Mode</h1>
                    </div>
                  </ThemeProvider>
                </li>
              </ul>
            </div>
          </div>

          <div className='hidden md:block text-black dark:text-white'>
            <div className='flex'>
              <ul className='ml-10 flex items-center space-x-4 pr-4'>
                {navLinks.map((link) => (
                  <li key={link.route}>
                    <NavLink
                      to={link.route}
                      style={{ whiteSpace: 'nowrap' }}
                      className={({ isActive }) => {
                        const baseClass = `font-bold hover:text-secondary duration-300`;
                        const activeClass = isActive ? 'text-secondary' : '';
                        const colorClass = navBg.includes('bg-transparent')
                          ? 'text-black '
                          : 'text-black dark:text-white';
                        
                        return `${baseClass} ${activeClass} ${colorClass}`;
                      }}
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
                {
                  !user && (
                    isLogin ? (
                      <li>
                        <NavLink to={"/signup"} className={({ isActive }) => `font-bold hover:text-secondary duration-300 ${isActive ? 'text-secondary' : ''}`}>
                          Sign Up
                        </NavLink>
                      </li>
                    ) : (
                      <li>
                        <NavLink to={"/login"} className={({ isActive }) => `font-bold hover:text-secondary duration-300 ${isActive ? 'text-secondary' : ''}`}>
                          Login
                        </NavLink>
                      </li>
                    )
                  )
                }
                {
                  user && (
                    <>
                      <li>
                        <NavLink to={'/dashboard'} className={({ isActive }) => `font-bold hover:text-secondary duration-300 ${isActive ? 'text-secondary' : ''}`}>
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <img src={user.photoURL} alt='pic' className='h-[40px] rounded-full w-[40px]' />
                      </li>
                      <li>
                        <button onClick={handleLogoutAndCloseMenu} className='font-bold px-3 py-2 bg-secondary text-white rounded-xl'>
                          Logout
                        </button>
                      </li>
                    </>
                  )
                }
                <li>
                  <ThemeProvider theme={theme}>
                    <div className='flex flex-col justify-center items-center'>
                      <Switch checked={isDarkMode} onChange={() => setIsDarkMode(!isDarkMode)} />
                      <h1 className='text-[8px]'>Dark Mode</h1>
                    </div>
                  </ThemeProvider>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

export default NavBar;
