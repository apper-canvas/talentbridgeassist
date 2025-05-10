import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

function JobPost({ darkMode }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    jobTitle: '',
    company: '',
    location: '',
    jobType: 'Full-time',
    salaryRangeMin: '',
    salaryRangeMax: '',
    description: '',
    requirements: '',
    benefits: '',
    contactEmail: '',
    applicationDeadline: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Icons
  const BriefcaseIcon = getIcon('Briefcase');
  const BuildingIcon = getIcon('Building');
  const MapPinIcon = getIcon('MapPin');
  const CalendarIcon = getIcon('Calendar');
  const DollarSignIcon = getIcon('DollarSign');
  const FileTextIcon = getIcon('FileText');
  const CheckSquareIcon = getIcon('CheckSquare');
  const HeartIcon = getIcon('Heart');
  const MailIcon = getIcon('Mail');
  const ClockIcon = getIcon('Clock');
  const ArrowLeftIcon = getIcon('ArrowLeft');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is being edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ['jobTitle', 'company', 'location', 'description', 'requirements', 'contactEmail'];
    
    requiredFields.forEach(field => {
      if (!formData[field].trim()) {
        newErrors[field] = 'This field is required';
      }
    });
    
    // Email validation
    if (formData.contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email address';
    }
    
    // Salary validation
    if (formData.salaryRangeMin && formData.salaryRangeMax) {
      if (Number(formData.salaryRangeMin) > Number(formData.salaryRangeMax)) {
        newErrors.salaryRangeMin = 'Minimum salary cannot be greater than maximum';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form', {
        icon: "⚠️"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Job posting created successfully!', {
        icon: "🎉"
      });
      
      // Navigate back to home after successful submission
      setTimeout(() => {
        navigate('/');
      }, 1500);
      
    } catch (error) {
      toast.error('Something went wrong. Please try again.', {
        icon: "❌"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const pageAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };
  
  return (
    <motion.div 
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageAnimation}
      className="container mx-auto px-4 py-8"
    >
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigate('/')}
            className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors mr-2"
            aria-label="Go back"
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold">Post a New Job</h1>
        </div>
        
        <div className={`rounded-xl p-6 ${darkMode ? 'bg-surface-800 border border-surface-700' : 'bg-white shadow-card'}`}>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Job Title */}
              <div className="col-span-2 md:col-span-1">
                <label htmlFor="jobTitle" className="block mb-2 font-medium">
                  Job Title<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <BriefcaseIcon className="w-5 h-5 text-surface-400" />
                  </div>
                  <input
                    type="text"
                    id="jobTitle"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    className={`input-field pl-10 ${errors.jobTitle ? 'border-red-500 dark:border-red-400' : ''}`}
                    placeholder="e.g. Senior React Developer"
                    aria-invalid={errors.jobTitle ? "true" : "false"}
                  />
                </div>
                {errors.jobTitle && <p className="mt-1 text-sm text-red-500">{errors.jobTitle}</p>}
              </div>
              
              {/* Company */}
              <div className="col-span-2 md:col-span-1">
                <label htmlFor="company" className="block mb-2 font-medium">
                  Company<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <BuildingIcon className="w-5 h-5 text-surface-400" />
                  </div>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className={`input-field pl-10 ${errors.company ? 'border-red-500 dark:border-red-400' : ''}`}
                    placeholder="e.g. TalentBridge LLC"
                    aria-invalid={errors.company ? "true" : "false"}
                  />
                </div>
                {errors.company && <p className="mt-1 text-sm text-red-500">{errors.company}</p>}
              </div>
              
              {/* Location */}
              <div>
                <label htmlFor="location" className="block mb-2 font-medium">
                  Location<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <MapPinIcon className="w-5 h-5 text-surface-400" />
                  </div>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className={`input-field pl-10 ${errors.location ? 'border-red-500 dark:border-red-400' : ''}`}
                    placeholder="e.g. San Francisco, CA or Remote"
                    aria-invalid={errors.location ? "true" : "false"}
                  />
                </div>
                {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location}</p>}
              </div>
              
              {/* Job Type */}
              <div>
                <label htmlFor="jobType" className="block mb-2 font-medium">
                  Job Type
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <CalendarIcon className="w-5 h-5 text-surface-400" />
                  </div>
                  <select
                    id="jobType"
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleChange}
                    className="input-field pl-10"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                    <option value="Temporary">Temporary</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Description and Requirements */}
            <div className="grid grid-cols-1 gap-6 mb-6">
              <div>
                <label htmlFor="description" className="block mb-2 font-medium">
                  Job Description<span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className={`input-field ${errors.description ? 'border-red-500 dark:border-red-400' : ''}`}
                  placeholder="Provide a detailed description of the job role, responsibilities, and expectations..."
                  aria-invalid={errors.description ? "true" : "false"}
                ></textarea>
                {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
              </div>
              
              <div>
                <label htmlFor="requirements" className="block mb-2 font-medium">
                  Requirements<span className="text-red-500">*</span>
                </label>
                <textarea
                  id="requirements"
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  rows="4"
                  className={`input-field ${errors.requirements ? 'border-red-500 dark:border-red-400' : ''}`}
                  placeholder="List the skills, qualifications, and experience required for this position..."
                  aria-invalid={errors.requirements ? "true" : "false"}
                ></textarea>
                {errors.requirements && <p className="mt-1 text-sm text-red-500">{errors.requirements}</p>}
              </div>
            </div>
            
            <div className="flex justify-end">
              <button type="submit" className="btn btn-secondary px-6 py-3" disabled={isSubmitting}>
                {isSubmitting ? 'Posting Job...' : 'Post Job'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}

export default JobPost;