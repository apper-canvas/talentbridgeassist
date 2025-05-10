import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

function NotFound() {
  // Icon components
  const HomeIcon = getIcon('Home');
  const AlertTriangleIcon = getIcon('AlertTriangle');
  
  return (
    <motion.div 
      className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center max-w-md mx-auto">
        <motion.div 
          className="w-24 h-24 mx-auto mb-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ 
            duration: 0.5,
            type: "spring",
            stiffness: 100 
          }}
        >
          <AlertTriangleIcon className="w-12 h-12 text-red-500 dark:text-red-400" />
        </motion.div>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-red-500 dark:text-red-400">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-surface-600 dark:text-surface-400 mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link 
            to="/" 
            className="btn btn-primary px-6 py-3 text-base inline-flex items-center"
          >
            <HomeIcon className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default NotFound;