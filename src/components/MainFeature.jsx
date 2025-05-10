import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

function MainFeature({ darkMode }) {
  // Job search state
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showJobDetails, setShowJobDetails] = useState(false);
  
  // Icon components
  const SearchIcon = getIcon('Search');
  const MapPinIcon = getIcon('MapPin');
  const BriefcaseIcon = getIcon('Briefcase');
  const FilterIcon = getIcon('Filter');
  const CalendarIcon = getIcon('Calendar');
  const DollarSignIcon = getIcon('DollarSign');
  const CheckIcon = getIcon('Check');
  const XIcon = getIcon('X');
  const BookmarkIcon = getIcon('Bookmark');
  const ChevronLeftIcon = getIcon('ChevronLeft');
  const BuildingIcon = getIcon('Building');
  const StarIcon = getIcon('Star');
  
  // Mock job data
  const mockJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechGrowth Inc",
      location: "San Francisco, CA",
      salary: "$120K - $150K",
      type: "Full-time",
      posted: "2 days ago",
      description: "We're looking for an experienced Frontend Developer with strong React skills to join our growing team.",
      requirements: [
        "5+ years of experience in frontend development",
        "Expert knowledge of React, JavaScript, and modern web technologies",
        "Experience with responsive design and CSS frameworks",
        "Understanding of CI/CD pipelines and testing methodologies"
      ],
      companyInfo: "TechGrowth is a leading software company specializing in building enterprise SaaS solutions.",
      logo: "https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80"
    },
    {
      id: 2,
      title: "UX/UI Designer",
      company: "Creative Solutions",
      location: "New York, NY",
      salary: "$90K - $120K",
      type: "Full-time",
      posted: "1 week ago",
      description: "Join our design team to create beautiful, intuitive interfaces for our clients across various industries.",
      requirements: [
        "3+ years of experience in UX/UI design",
        "Proficiency in Figma, Sketch, or similar design tools",
        "Strong portfolio demonstrating user-centered design process",
        "Excellent communication and collaboration skills"
      ],
      companyInfo: "Creative Solutions is a design agency working with Fortune 500 companies to create exceptional digital experiences.",
      logo: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80"
    },
    {
      id: 3,
      title: "DevOps Engineer",
      company: "CloudScale",
      location: "Remote",
      salary: "$110K - $140K",
      type: "Contract",
      posted: "3 days ago",
      description: "Help us build and maintain our cloud infrastructure and CI/CD pipelines for maximum reliability and performance.",
      requirements: [
        "Experience with AWS, Docker, and Kubernetes",
        "Knowledge of infrastructure as code using Terraform or CloudFormation",
        "Understanding of monitoring and logging solutions",
        "Experience with automation and CI/CD pipelines"
      ],
      companyInfo: "CloudScale provides cloud infrastructure solutions for high-growth startups and enterprises.",
      logo: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80"
    },
    {
      id: 4,
      title: "Product Manager",
      company: "InnovateTech",
      location: "Austin, TX",
      salary: "$130K - $160K",
      type: "Full-time",
      posted: "5 days ago",
      description: "Lead product development from conception to launch, working with cross-functional teams to deliver exceptional user experiences.",
      requirements: [
        "5+ years of product management experience",
        "Strong analytical skills and data-driven approach",
        "Experience with agile methodologies and product lifecycle",
        "Excellent communication and stakeholder management skills"
      ],
      companyInfo: "InnovateTech builds cutting-edge software products that transform how businesses operate.",
      logo: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80"
    }
  ];
  
  // Filter logic
  const jobTypes = ["Full-time", "Part-time", "Contract", "Remote"];
  const locations = ["San Francisco, CA", "New York, NY", "Austin, TX", "Remote"];
  
  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulating API call with timeout
    setTimeout(() => {
      let filteredResults = [...mockJobs];
      
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredResults = filteredResults.filter(job => 
          job.title.toLowerCase().includes(query) || 
          job.company.toLowerCase().includes(query) ||
          job.description.toLowerCase().includes(query)
        );
      }
      
      if (location) {
        filteredResults = filteredResults.filter(job => 
          job.location === location
        );
      }
      
      if (jobType) {
        filteredResults = filteredResults.filter(job => 
          job.type === jobType
        );
      }
      
      setSearchResults(filteredResults);
      setIsLoading(false);
      setHasSearched(true);
      
      // Show toast based on results
      if (filteredResults.length === 0) {
        toast.info("No jobs match your search criteria. Try adjusting your filters.", {
          icon: "🔍"
        });
      } else {
        toast.success(`Found ${filteredResults.length} matching jobs!`, {
          icon: "✨"
        });
      }
    }, 1200);
  };
  
  // Clear filters
  const clearFilters = () => {
    setSearchQuery('');
    setLocation('');
    setJobType('');
    
    if (hasSearched) {
      setIsLoading(true);
      setTimeout(() => {
        setSearchResults(mockJobs);
        setIsLoading(false);
        toast.info("All filters cleared", {
          icon: "🔄"
        });
      }, 600);
    }
  };
  
  // View job details
  const viewJobDetails = (job) => {
    setSelectedJob(job);
    setShowJobDetails(true);
  };
  
  // Save job function
  const saveJob = (e, jobId) => {
    e.stopPropagation();
    toast.success("Job saved to your favorites!", {
      icon: "❤️"
    });
  };
  
  // Apply to job function
  const applyToJob = () => {
    toast.success("Your application has been submitted!", {
      icon: "🎉"
    });
    setShowJobDetails(false);
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    },
    exit: { opacity: 0 }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };
  
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 25 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: { duration: 0.15 }
    }
  };
  
  return (
    <section className="py-16 bg-surface-50 dark:bg-surface-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Find Your Perfect Match</h2>
          <p className="text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
            Explore opportunities that align with your skills, experience, and career goals. Our advanced job search helps you find positions that truly fit your profile.
          </p>
        </div>
        
        {/* Search Form */}
        <div className={`p-6 mb-8 rounded-xl ${darkMode ? 'neu-dark' : 'neu-light'}`}>
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <label htmlFor="search-query" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                Job Title or Keywords
              </label>
              <div className="relative">
                <input
                  id="search-query"
                  type="text"
                  className="input-field pl-10"
                  placeholder="e.g. Developer, Designer"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400">
                  <SearchIcon className="w-5 h-5" />
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                Location
              </label>
              <div className="relative">
                <select
                  id="location"
                  className="input-field pl-10 appearance-none"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <option value="">Any Location</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400">
                  <MapPinIcon className="w-5 h-5" />
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="job-type" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                Job Type
              </label>
              <div className="relative">
                <select
                  id="job-type"
                  className="input-field pl-10 appearance-none"
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                >
                  <option value="">Any Type</option>
                  {jobTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400">
                  <BriefcaseIcon className="w-5 h-5" />
                </div>
              </div>
            </div>
            
            <div className="flex items-end gap-2">
              <button 
                type="submit" 
                className="btn btn-primary flex-grow py-2 h-[42px]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Searching
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <SearchIcon className="w-5 h-5 mr-2" />
                    Search
                  </span>
                )}
              </button>
              <button 
                type="button" 
                onClick={clearFilters}
                className="btn btn-outline p-2 h-[42px]"
                title="Clear filters"
              >
                <FilterIcon className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
        
        {/* Search Results */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div 
              key="loading"
              className="flex flex-col items-center justify-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
              <p className="text-surface-600 dark:text-surface-400">Searching for jobs...</p>
            </motion.div>
          ) : hasSearched && searchResults.length === 0 ? (
            <motion.div 
              key="no-results"
              className="text-center py-12"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="w-20 h-20 mx-auto mb-4 text-surface-400">
                <SearchIcon className="w-full h-full" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
              <p className="text-surface-600 dark:text-surface-400 max-w-md mx-auto">
                We couldn't find any jobs matching your search criteria. Try adjusting your filters or search terms.
              </p>
            </motion.div>
          ) : hasSearched ? (
            <motion.div 
              key="results"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {searchResults.map((job) => (
                <motion.div 
                  key={job.id}
                  className="card cursor-pointer hover:shadow-lg transition-all duration-300 group"
                  onClick={() => viewJobDetails(job)}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-surface-100 dark:bg-surface-700 flex-shrink-0">
                          <img 
                            src={job.logo} 
                            alt={job.company} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">{job.title}</h3>
                          <p className="text-surface-600 dark:text-surface-400 text-sm flex items-center">
                            <BuildingIcon className="w-4 h-4 mr-1 inline" />
                            {job.company}
                          </p>
                        </div>
                      </div>
                      <button 
                        onClick={(e) => saveJob(e, job.id)}
                        className="p-2 rounded-full text-surface-400 hover:text-primary hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                        aria-label="Save job"
                      >
                        <BookmarkIcon className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-surface-600 dark:text-surface-400">
                        <MapPinIcon className="w-4 h-4 mr-2" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-surface-600 dark:text-surface-400">
                        <DollarSignIcon className="w-4 h-4 mr-2" />
                        <span>{job.salary}</span>
                      </div>
                      <div className="flex items-center text-sm text-surface-600 dark:text-surface-400">
                        <BriefcaseIcon className="w-4 h-4 mr-2" />
                        <span>{job.type}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-surface-500 dark:text-surface-400 flex items-center">
                        <CalendarIcon className="w-3 h-3 mr-1" />
                        Posted {job.posted}
                      </span>
                      <span className="text-xs font-medium text-primary dark:text-primary-light">
                        View Details
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : null}
        </AnimatePresence>
        
        {/* Job Details Modal */}
        <AnimatePresence>
          {showJobDetails && selectedJob && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowJobDetails(false)}
            >
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-surface-800 shadow-lg relative ${darkMode ? 'neu-dark' : 'neu-light'}`}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-4 p-2 rounded-full bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 text-surface-600 dark:text-surface-400"
                  onClick={() => setShowJobDetails(false)}
                >
                  <XIcon className="w-5 h-5" />
                </button>
                
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-surface-100 dark:bg-surface-700 flex-shrink-0">
                      <img 
                        src={selectedJob.logo} 
                        alt={selectedJob.company} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold mb-1">{selectedJob.title}</h2>
                      <p className="text-surface-600 dark:text-surface-400 mb-2">
                        {selectedJob.company} · {selectedJob.location}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-block px-3 py-1 text-xs rounded-full bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light">
                          {selectedJob.type}
                        </span>
                        <span className="inline-block px-3 py-1 text-xs rounded-full bg-secondary/10 text-secondary dark:bg-secondary/20 dark:text-secondary-light">
                          {selectedJob.salary}
                        </span>
                        <span className="inline-block px-3 py-1 text-xs rounded-full bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300">
                          Posted {selectedJob.posted}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Job Description</h3>
                    <p className="text-surface-700 dark:text-surface-300 mb-4">
                      {selectedJob.description}
                    </p>
                    
                    <h3 className="text-lg font-semibold mb-2">Requirements</h3>
                    <ul className="space-y-2 mb-4">
                      {selectedJob.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-2 text-surface-700 dark:text-surface-300">
                          <span className="mt-1 text-primary">
                            <CheckIcon className="w-4 h-4" />
                          </span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <h3 className="text-lg font-semibold mb-2">About {selectedJob.company}</h3>
                    <p className="text-surface-700 dark:text-surface-300">
                      {selectedJob.companyInfo}
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={applyToJob}
                      className="btn btn-primary py-3 flex-1"
                    >
                      Apply Now
                    </button>
                    <button
                      onClick={(e) => saveJob(e, selectedJob.id)}
                      className="btn btn-outline py-3"
                    >
                      <BookmarkIcon className="w-5 h-5 mr-2" />
                      Save Job
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default MainFeature;