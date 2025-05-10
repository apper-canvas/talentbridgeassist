import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import getIcon from '../utils/iconUtils';
import MainFeature from '../components/MainFeature';

function Home({ darkMode }) {
  const [activeTab, setActiveTab] = useState('jobSeeker');
  
  // Icon components
  const navigate = useNavigate();
  
  const BriefcaseIcon = getIcon('Briefcase');
  const UserIcon = getIcon('User');
  const BuildingIcon = getIcon('Building');
  const SearchIcon = getIcon('Search');
  const CheckCircleIcon = getIcon('CheckCircle');
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const tabItems = [
    { id: 'jobSeeker', label: 'Job Seekers', icon: UserIcon },
    { id: 'employer', label: 'Employers', icon: BuildingIcon },
  ];
  
  const features = {
    jobSeeker: [
      { icon: CheckCircleIcon, text: "Create a professional profile to showcase your skills" },
      { icon: CheckCircleIcon, text: "Upload and manage your resume and portfolio" },
      { icon: CheckCircleIcon, text: "Search and apply for positions matching your expertise" },
      { icon: CheckCircleIcon, text: "Track application status and receive updates" }
    ],
    employer: [
      { icon: CheckCircleIcon, text: "Post job listings with detailed requirements" },
      { icon: CheckCircleIcon, text: "Search candidate profiles based on skills and experience" },
      { icon: CheckCircleIcon, text: "Manage applications through an intuitive dashboard" },
      { icon: CheckCircleIcon, text: "Schedule interviews and communicate with candidates" }
    ]
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <motion.section 
        className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-white to-surface-100 dark:from-surface-800 dark:to-surface-900"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/10 dark:bg-primary/5 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-secondary/10 dark:bg-secondary/5 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="w-full lg:w-1/2">
              <motion.h2 
                className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 text-balance"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
              >
                Connect with Your <span className="text-primary">Dream Career</span> or <span className="text-secondary">Perfect Talent</span>
              </motion.h2>
              
              <motion.p 
                className="text-lg text-surface-600 dark:text-surface-300 mb-8 max-w-2xl"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } }
                }}
              >
                TalentBridge connects qualified professionals with companies looking for talent. Whether you're seeking new opportunities or recruiting top candidates, we've got you covered.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 mb-8"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.4 } }
                }}
              >
                <button 
                  className="btn btn-primary px-6 py-3 text-base"
                  onClick={() => {
                    navigate('/profile/create');
                  }}
                >
                  <UserIcon className="w-5 h-5 mr-2" />
                  Find a Job
                </button>
                <button 
                  className="btn btn-secondary px-6 py-3 text-base"
                  onClick={() => {
                    navigate('/job/post');
                  }}
                >
                  <BuildingIcon className="w-5 h-5 mr-2" />
                  Hire Talent
                </button>
              </motion.div>
            </div>
            
            <div className="w-full lg:w-1/2">
              <motion.div 
                className={`p-1 rounded-2xl ${darkMode ? 'neu-dark' : 'neu-light'}`}
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.95 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: { 
                      duration: 0.6,
                      delay: 0.5
                    } 
                  }
                }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Professional meeting" 
                  className="rounded-xl object-cover w-full h-[350px]"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>
      
      {/* Features Section */}
      <motion.section 
        className="py-16 bg-white dark:bg-surface-900"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">How TalentBridge Works</h2>
            <p className="text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
              Our platform is designed to streamline the job search and hiring process for both candidates and employers.
            </p>
            
            {/* Tabs */}
            <div className="flex justify-center mt-8 mb-12">
              <div className="inline-flex p-1 rounded-lg bg-surface-100 dark:bg-surface-800">
                {tabItems.map((tab) => {
                  const TabIcon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        activeTab === tab.id
                          ? "bg-white dark:bg-surface-700 text-primary dark:text-primary-light shadow-sm"
                          : "text-surface-600 dark:text-surface-400 hover:text-surface-800 dark:hover:text-surface-200"
                      }`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      <TabIcon className="w-4 h-4 mr-2" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Feature Cards */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
          >
            {features[activeTab].map((feature, index) => {
              const FeatureIcon = feature.icon;
              return (
                <motion.div
                  key={index}
                  className="card p-6"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="rounded-full p-2 bg-primary/10 dark:bg-primary/20 text-primary">
                      <FeatureIcon className="w-5 h-5" />
                    </div>
                    <p className="text-surface-800 dark:text-surface-200">{feature.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>
      
      {/* Main Feature Section */}
      <MainFeature darkMode={darkMode} />
      
      {/* Testimonials/Stats Section */}
      <motion.section 
        className="py-16 bg-surface-50 dark:bg-surface-800"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Trusted by Thousands</h2>
            <p className="text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
              Join the growing community of professionals and companies using TalentBridge to achieve their goals.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <motion.div 
              className="card py-8 px-4"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { delay: 0.1 } }
              }}
            >
              <p className="text-3xl md:text-4xl font-bold text-primary mb-2">4.8K+</p>
              <p className="text-surface-600 dark:text-surface-400 text-sm">Companies</p>
            </motion.div>
            
            <motion.div 
              className="card py-8 px-4"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { delay: 0.2 } }
              }}
            >
              <p className="text-3xl md:text-4xl font-bold text-secondary mb-2">28K+</p>
              <p className="text-surface-600 dark:text-surface-400 text-sm">Job Seekers</p>
            </motion.div>
            
            <motion.div 
              className="card py-8 px-4"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { delay: 0.3 } }
              }}
            >
              <p className="text-3xl md:text-4xl font-bold text-accent mb-2">12K+</p>
              <p className="text-surface-600 dark:text-surface-400 text-sm">Placements</p>
            </motion.div>
            
            <motion.div 
              className="card py-8 px-4"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { delay: 0.4 } }
              }}
            >
              <p className="text-3xl md:text-4xl font-bold text-primary-dark mb-2">95%</p>
              <p className="text-surface-600 dark:text-surface-400 text-sm">Satisfaction</p>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

export default Home;