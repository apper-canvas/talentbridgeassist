import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from 'framer-motion';
import getIcon from './utils/iconUtils';

// Pages
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ProfileCreate from './pages/ProfileCreate';
import JobPost from './pages/JobPost';

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true' || 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    toast.info(`${!darkMode ? 'Dark' : 'Light'} mode activated`, {
      position: "bottom-right",
      autoClose: 2000,
      icon: !darkMode ? "🌙" : "☀️"
    });
  };

  // Icon components
  const SunIcon = getIcon('Sun');
  const MoonIcon = getIcon('Moon');
  const BriefcaseIcon = getIcon('Briefcase');
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700 shadow-sm sticky top-0 z-10 transition-colors">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BriefcaseIcon className="h-7 w-7 text-primary" />
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              TalentBridge
            </h1>
          </div>
          
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
            aria-label="Toggle dark mode"
          >
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: darkMode ? 360 : 0 }}
              transition={{ duration: 0.5 }}
            >
              {darkMode ? (
                <SunIcon className="h-5 w-5 text-yellow-400" />
              ) : (
                <MoonIcon className="h-5 w-5 text-surface-600" />
              )}
            </motion.div>
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home darkMode={darkMode} />} />
            <Route path="/profile/create" element={<ProfileCreate darkMode={darkMode} />} />
            <Route path="/job/post" element={<JobPost darkMode={darkMode} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700 py-6 transition-colors">
        <div className="container mx-auto px-4 text-center">
          <p className="text-surface-600 dark:text-surface-400 text-sm">
            © {new Date().getFullYear()} TalentBridge. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Toast Container */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
        toastClassName="rounded-lg font-medium"
      />
    </div>
  );
}

export default App;