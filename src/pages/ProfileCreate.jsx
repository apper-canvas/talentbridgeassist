import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

// Form Steps Components
function BasicInfoForm({ formData, updateFormData, nextStep }) {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName?.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName?.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email?.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone?.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.location?.trim()) newErrors.location = 'Location is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      nextStep();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData('basicInfo', { ...formData, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName || ''}
            onChange={handleChange}
            className={`input-field ${errors.firstName ? 'border-red-500 dark:border-red-400' : ''}`}
            placeholder="John"
          />
          {errors.firstName && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.firstName}</p>}
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName || ''}
            onChange={handleChange}
            className={`input-field ${errors.lastName ? 'border-red-500 dark:border-red-400' : ''}`}
            placeholder="Doe"
          />
          {errors.lastName && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.lastName}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email || ''}
          onChange={handleChange}
          className={`input-field ${errors.email ? 'border-red-500 dark:border-red-400' : ''}`}
          placeholder="john.doe@example.com"
        />
        {errors.email && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
          Phone Number *
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone || ''}
          onChange={handleChange}
          className={`input-field ${errors.phone ? 'border-red-500 dark:border-red-400' : ''}`}
          placeholder="+1 (555) 123-4567"
        />
        {errors.phone && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.phone}</p>}
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
          Location *
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location || ''}
          onChange={handleChange}
          className={`input-field ${errors.location ? 'border-red-500 dark:border-red-400' : ''}`}
          placeholder="New York, NY, USA"
        />
        {errors.location && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.location}</p>}
      </div>

      <div className="pt-4">
        <button type="submit" className="btn btn-primary px-6 py-3 w-full md:w-auto">
          Continue
        </button>
      </div>
    </form>
  );
}

function ProfessionalInfoForm({ formData, updateFormData, nextStep, prevStep }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData('professionalInfo', { ...formData, [name]: value });
  };

  return (
    <form 
      onSubmit={(e) => {
        e.preventDefault();
        nextStep();
      }} 
      className="space-y-6"
    >
      <div>
        <label htmlFor="jobTitle" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
          Job Title
        </label>
        <input
          type="text"
          id="jobTitle"
          name="jobTitle"
          value={formData.jobTitle || ''}
          onChange={handleChange}
          className="input-field"
          placeholder="Software Engineer"
        />
      </div>

      <div>
        <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
          Years of Experience
        </label>
        <input
          type="number"
          id="yearsOfExperience"
          name="yearsOfExperience"
          min="0"
          max="50"
          value={formData.yearsOfExperience || ''}
          onChange={handleChange}
          className="input-field"
          placeholder="5"
        />
      </div>

      <div>
        <label htmlFor="summary" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
          Professional Summary
        </label>
        <textarea
          id="summary"
          name="summary"
          rows="4"
          value={formData.summary || ''}
          onChange={handleChange}
          className="input-field"
          placeholder="Brief overview of your professional background, skills, and career goals..."
        ></textarea>
      </div>

      <div className="flex justify-between pt-4">
        <button 
          type="button" 
          onClick={prevStep}
          className="btn btn-outline px-6 py-3"
        >
          Back
        </button>
        <button type="submit" className="btn btn-primary px-6 py-3">
          Continue
        </button>
      </div>
    </form>
  );
}

function SkillsEducationForm({ formData, updateFormData, nextStep, prevStep }) {
  const [skill, setSkill] = useState('');
  const [education, setEducation] = useState({
    degree: '',
    institution: '',
    year: ''
  });

  const handleAddSkill = () => {
    if (skill.trim()) {
      const updatedSkills = [...(formData.skills || []), skill.trim()];
      updateFormData('skillsEducation', { ...formData, skills: updatedSkills });
      setSkill('');
    }
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = [...(formData.skills || [])];
    updatedSkills.splice(index, 1);
    updateFormData('skillsEducation', { ...formData, skills: updatedSkills });
  };

  const handleAddEducation = () => {
    if (education.degree.trim() && education.institution.trim()) {
      const updatedEducation = [...(formData.education || []), education];
      updateFormData('skillsEducation', { ...formData, education: updatedEducation });
      setEducation({ degree: '', institution: '', year: '' });
    }
  };

  const handleRemoveEducation = (index) => {
    const updatedEducation = [...(formData.education || [])];
    updatedEducation.splice(index, 1);
    updateFormData('skillsEducation', { ...formData, education: updatedEducation });
  };

  return (
    <form 
      onSubmit={(e) => {
        e.preventDefault();
        nextStep();
      }} 
      className="space-y-8"
    >
      {/* Skills Section */}
      <div>
        <h3 className="font-medium text-lg mb-3">Skills</h3>
        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            className="input-field flex-grow"
            placeholder="Add a skill"
          />
          <button 
            type="button" 
            onClick={handleAddSkill}
            className="btn btn-primary px-4 py-2"
          >
            Add
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-3">
          {(formData.skills || []).map((s, index) => (
            <div key={index} className="bg-surface-200 dark:bg-surface-700 px-3 py-1 rounded-full flex items-center gap-2">
              <span>{s}</span>
              <button 
                type="button" 
                onClick={() => handleRemoveSkill(index)}
                className="text-surface-600 dark:text-surface-400 hover:text-red-500 dark:hover:text-red-400"
                aria-label="Remove skill"
              >
                {getIcon('X')({ className: "w-4 h-4" })}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Education Section */}
      <div>
        <h3 className="font-medium text-lg mb-3">Education</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          <input
            type="text"
            value={education.degree}
            onChange={(e) => setEducation({ ...education, degree: e.target.value })}
            className="input-field"
            placeholder="Degree / Certification"
          />
          <input
            type="text"
            value={education.institution}
            onChange={(e) => setEducation({ ...education, institution: e.target.value })}
            className="input-field"
            placeholder="Institution"
          />
          <input
            type="text"
            value={education.year}
            onChange={(e) => setEducation({ ...education, year: e.target.value })}
            className="input-field"
            placeholder="Year"
          />
        </div>
        <button 
          type="button" 
          onClick={handleAddEducation}
          className="btn btn-outline px-4 py-2 mb-4"
        >
          Add Education
        </button>

        <div className="space-y-3 mt-4">
          {(formData.education || []).map((edu, index) => (
            <div key={index} className="bg-surface-100 dark:bg-surface-800 p-3 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-medium">{edu.degree}</p>
                <p className="text-sm text-surface-600 dark:text-surface-400">{edu.institution}, {edu.year}</p>
              </div>
              <button 
                type="button" 
                onClick={() => handleRemoveEducation(index)}
                className="text-surface-600 dark:text-surface-400 hover:text-red-500 dark:hover:text-red-400"
                aria-label="Remove education"
              >
                {getIcon('Trash2')({ className: "w-4 h-4" })}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <button 
          type="button" 
          onClick={prevStep}
          className="btn btn-outline px-6 py-3"
        >
          Back
        </button>
        <button type="submit" className="btn btn-primary px-6 py-3">
          Next Step
        </button>
      </div>
    </form>
  );
}

function ExperienceForm({ formData, updateFormData, nextStep, prevStep }) {
  const [experience, setExperience] = useState({
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: ''
  });

  const handleAddExperience = () => {
    if (experience.title.trim() && experience.company.trim()) {
      const updatedExperience = [...(formData.experiences || []), experience];
      updateFormData('experience', { ...formData, experiences: updatedExperience });
      setExperience({
        title: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      });
    }
  };

  const handleRemoveExperience = (index) => {
    const updatedExperience = [...(formData.experiences || [])];
    updatedExperience.splice(index, 1);
    updateFormData('experience', { ...formData, experiences: updatedExperience });
  };

  const handleCurrentJob = (e) => {
    const isCurrent = e.target.checked;
    setExperience({ 
      ...experience, 
      current: isCurrent,
      endDate: isCurrent ? '' : experience.endDate
    });
  };

  return (
    <form 
      onSubmit={(e) => {
        e.preventDefault();
        nextStep();
      }} 
      className="space-y-8"
    >
      <div>
        <h3 className="font-medium text-lg mb-3">Work Experience</h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="jobTitle" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                Job Title
              </label>
              <input
                type="text"
                id="jobTitle"
                value={experience.title}
                onChange={(e) => setExperience({ ...experience, title: e.target.value })}
                className="input-field"
                placeholder="Software Developer"
              />
            </div>
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                Company
              </label>
              <input
                type="text"
                id="company"
                value={experience.company}
                onChange={(e) => setExperience({ ...experience, company: e.target.value })}
                className="input-field"
                placeholder="Acme Inc."
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
              Location
            </label>
            <input
              type="text"
              id="location"
              value={experience.location}
              onChange={(e) => setExperience({ ...experience, location: e.target.value })}
              className="input-field"
              placeholder="Remote / New York, NY"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                value={experience.startDate}
                onChange={(e) => setExperience({ ...experience, startDate: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                value={experience.endDate}
                onChange={(e) => setExperience({ ...experience, endDate: e.target.value })}
                className="input-field"
                disabled={experience.current}
              />
            </div>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="currentJob"
              checked={experience.current}
              onChange={handleCurrentJob}
              className="w-4 h-4 text-primary bg-surface-100 dark:bg-surface-700 border-surface-300 dark:border-surface-600 rounded"
            />
            <label htmlFor="currentJob" className="ml-2 text-sm font-medium text-surface-700 dark:text-surface-300">
              I currently work here
            </label>
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
              Description
            </label>
            <textarea
              id="description"
              rows="3"
              value={experience.description}
              onChange={(e) => setExperience({ ...experience, description: e.target.value })}
              className="input-field"
              placeholder="Describe your responsibilities and achievements..."
            ></textarea>
          </div>
          
          <button 
            type="button" 
            onClick={handleAddExperience}
            className="btn btn-outline px-4 py-2"
          >
            Add Experience
          </button>
        </div>
        
        <div className="space-y-4 mt-6">
          {(formData.experiences || []).map((exp, index) => (
            <div key={index} className="bg-surface-100 dark:bg-surface-800 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-base">{exp.title}</h4>
                  <p className="text-surface-600 dark:text-surface-400">{exp.company} - {exp.location}</p>
                  <p className="text-sm text-surface-500 dark:text-surface-500">
                    {exp.startDate ? new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : ''}
                    {' — '}
                    {exp.current ? 'Present' : (exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : '')}
                  </p>
                </div>
                <button 
                  type="button" 
                  onClick={() => handleRemoveExperience(index)}
                  className="text-surface-600 dark:text-surface-400 hover:text-red-500 dark:hover:text-red-400"
                  aria-label="Remove experience"
                >
                  {getIcon('Trash2')({ className: "w-4 h-4" })}
                </button>
              </div>
              {exp.description && (
                <p className="mt-2 text-sm">{exp.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <button 
          type="button" 
          onClick={prevStep}
          className="btn btn-outline px-6 py-3"
        >
          Back
        </button>
        <button type="submit" className="btn btn-primary px-6 py-3">
          Continue
        </button>
      </div>
    </form>
  );
}

function AdditionalInfoForm({ formData, updateFormData, prevStep, submitForm }) {
  const [language, setLanguage] = useState({ name: '', proficiency: 'Basic' });
  const [fileUploaded, setFileUploaded] = useState(false);
  
  const handleAddLanguage = () => {
    if (language.name.trim()) {
      const updatedLanguages = [...(formData.languages || []), language];
      updateFormData('additionalInfo', { ...formData, languages: updatedLanguages });
      setLanguage({ name: '', proficiency: 'Basic' });
    }
  };

  const handleRemoveLanguage = (index) => {
    const updatedLanguages = [...(formData.languages || [])];
    updatedLanguages.splice(index, 1);
    updateFormData('additionalInfo', { ...formData, languages: updatedLanguages });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      // In a real app, you would handle file upload to server
      // Here we'll just update state to simulate upload
      setFileUploaded(true);
      updateFormData('additionalInfo', { 
        ...formData, 
        resume: { name: file.name, size: file.size }
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData('additionalInfo', { ...formData, [name]: value });
  };

  return (
    <form 
      onSubmit={(e) => {
        e.preventDefault();
        submitForm();
      }} 
      className="space-y-8"
    >
      {/* Resume Upload */}
      <div>
        <h3 className="font-medium text-lg mb-3">Resume/CV</h3>
        <div className="border-2 border-dashed border-surface-300 dark:border-surface-600 rounded-lg p-6 text-center">
          {!fileUploaded ? (
            <>
              <label htmlFor="resume-upload" className="cursor-pointer block">
                <div className="text-surface-600 dark:text-surface-400 mb-2">
                  {getIcon('Upload')({ className: "w-10 h-10 mx-auto mb-2" })}
                  <p>Drag and drop your resume here or click to browse</p>
                  <p className="text-sm mt-1">Supported formats: PDF, DOCX, RTF (Max 5MB)</p>
                </div>
                <input 
                  id="resume-upload" 
                  type="file" 
                  accept=".pdf,.docx,.rtf"
                  className="hidden" 
                  onChange={handleFileUpload}
                />
                <button type="button" className="btn btn-outline px-4 py-2 mt-3">
                  Select File
                </button>
              </label>
            </>
          ) : (
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-primary">
                {getIcon('FileText')({ className: "w-6 h-6" })}
                <span className="font-medium">{formData.resume?.name}</span>
              </div>
              <p className="text-sm text-surface-500 mt-1">
                {Math.round(formData.resume?.size / 1024)} KB
              </p>
              <button 
                type="button" 
                className="btn btn-outline px-4 py-2 mt-3"
                onClick={() => {
                  setFileUploaded(false);
                  updateFormData('additionalInfo', { ...formData, resume: null });
                }}
              >
                Replace File
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Languages */}
      <div>
        <h3 className="font-medium text-lg mb-3">Languages</h3>
        <div className="flex items-end gap-3 mb-4">
          <div className="flex-grow">
            <label htmlFor="language" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
              Language
            </label>
            <input
              type="text"
              id="language"
              value={language.name}
              onChange={(e) => setLanguage({ ...language, name: e.target.value })}
              className="input-field"
              placeholder="e.g. English, Spanish, French"
            />
          </div>
          <div className="flex-grow">
            <label htmlFor="proficiency" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
              Proficiency
            </label>
            <select
              id="proficiency"
              value={language.proficiency}
              onChange={(e) => setLanguage({ ...language, proficiency: e.target.value })}
              className="input-field"
            >
              <option value="Basic">Basic</option>
              <option value="Conversational">Conversational</option>
              <option value="Proficient">Proficient</option>
              <option value="Fluent">Fluent</option>
              <option value="Native">Native</option>
            </select>
          </div>
          <button 
            type="button" 
            onClick={handleAddLanguage}
            className="btn btn-primary px-4 py-2"
          >
            Add
          </button>
        </div>
        
        <div className="space-y-2">
          {(formData.languages || []).map((lang, index) => (
            <div key={index} className="bg-surface-100 dark:bg-surface-800 p-3 rounded-lg flex justify-between items-center">
              <div>
                <span className="font-medium">{lang.name}</span>
                <span className="ml-2 text-sm text-surface-600 dark:text-surface-400">
                  ({lang.proficiency})
                </span>
              </div>
              <button 
                type="button" 
                onClick={() => handleRemoveLanguage(index)}
                className="text-surface-600 dark:text-surface-400 hover:text-red-500 dark:hover:text-red-400"
                aria-label="Remove language"
              >
                {getIcon('X')({ className: "w-4 h-4" })}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Social Links */}
      <div>
        <h3 className="font-medium text-lg mb-3">Social Links</h3>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="linkedin" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
              LinkedIn
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-surface-300 dark:border-surface-600 bg-surface-100 dark:bg-surface-700 text-surface-500 dark:text-surface-400">
                linkedin.com/in/
              </span>
              <input
                type="text"
                id="linkedin"
                name="linkedin"
                value={formData.linkedin || ''}
                onChange={handleChange}
                className="input-field rounded-none rounded-r-lg"
                placeholder="username"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="github" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
              GitHub
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-surface-300 dark:border-surface-600 bg-surface-100 dark:bg-surface-700 text-surface-500 dark:text-surface-400">
                github.com/
              </span>
              <input
                type="text"
                id="github"
                name="github"
                value={formData.github || ''}
                onChange={handleChange}
                className="input-field rounded-none rounded-r-lg"
                placeholder="username"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="portfolio" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
              Portfolio Website
            </label>
            <input
              type="url"
              id="portfolio"
              name="portfolio"
              value={formData.portfolio || ''}
              onChange={handleChange}
              className="input-field"
              placeholder="https://yourportfolio.com"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <button 
          type="button" 
          onClick={prevStep}
          className="btn btn-outline px-6 py-3"
        >
          Back
        </button>
        <button type="submit" className="btn btn-secondary px-6 py-3">
          Complete Profile
        </button>
      </div>
    </form>
  );
}

// Main Component
function ProfileCreate({ darkMode }) {
  const [step, setStep] = useState(1);
  const [profileData, setProfileData] = useState({
    basicInfo: {},
    professionalInfo: {},
    skillsEducation: {},
    experience: {},
    additionalInfo: {}
  });

  const formSteps = [
    { step: 1, title: "Basic Information", description: "Your contact information" },
    { step: 2, title: "Professional Information", description: "Your work experience and expertise" },
    { step: 3, title: "Skills & Education", description: "Your abilities and academic background" },
    { step: 4, title: "Work Experience", description: "Your previous jobs and responsibilities" },
    { step: 5, title: "Additional Details", description: "Languages, resume, and social links" }
  ];

  const updateFormData = (section, data) => {
    setProfileData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, formSteps.length));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const submitForm = () => {
    // In a real application, you would submit this data to your API
    console.log("Profile Data:", profileData);
    
    toast.success("Profile created successfully!", {
      icon: "🎉"
    });
    
    // For demonstration purposes, we'll just log the data
    // and show a success toast
  };

  const ChevronRightIcon = getIcon('ChevronRight');
  const CheckIcon = getIcon('Check');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-12 px-4"
    >
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Create Your Candidate Profile</h1>
          <p className="text-surface-600 dark:text-surface-400">
            Complete your profile to connect with employers and find your ideal job.
          </p>
        </div>
        
        {/* Progress Bar */}
        <div className="hidden md:flex items-center justify-between mb-12">
          {formSteps.map((formStep, index) => (
            <div key={index} className="flex items-center">
              {/* Step Circle */}
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                  step > formStep.step 
                    ? 'bg-primary text-white' 
                    : step === formStep.step 
                      ? 'bg-primary-light text-white' 
                      : 'bg-surface-200 dark:bg-surface-700 text-surface-600 dark:text-surface-400'
                }`}
              >
                {step > formStep.step ? <CheckIcon className="w-5 h-5" /> : formStep.step}
              </div>
              
              {/* Step Title */}
              <div className="ml-3 hidden lg:block">
                <p className={`font-medium ${
                  step >= formStep.step 
                    ? 'text-surface-800 dark:text-surface-200' 
                    : 'text-surface-500 dark:text-surface-500'
                }`}>
                  {formStep.title}
                </p>
                <p className="text-xs text-surface-500 dark:text-surface-500">
                  {formStep.description}
                </p>
              </div>
              
              {/* Connector Line */}
              {index < formSteps.length - 1 && (
                <div className={`w-12 lg:w-24 h-1 mx-2 ${
                  step > formStep.step 
                    ? 'bg-primary' 
                    : 'bg-surface-200 dark:bg-surface-700'
                }`}></div>
              )}
            </div>
          ))}
        </div>
        
        {/* Mobile Step Indicator */}
        <div className="md:hidden mb-6">
          <p className="text-center text-surface-600 dark:text-surface-400 mb-2">
            Step {step} of {formSteps.length}: {formSteps[step-1].title}
          </p>
          <div className="w-full bg-surface-200 dark:bg-surface-700 h-2 rounded-full">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / formSteps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form Container */}
        <div className={`bg-white dark:bg-surface-800 rounded-xl p-6 md:p-8 shadow-card`}>
          {step === 1 && (
            <BasicInfoForm 
              formData={profileData.basicInfo} 
              updateFormData={updateFormData} 
              nextStep={nextStep} 
            />
          )}
          
          {step === 2 && (
            <ProfessionalInfoForm 
              formData={profileData.professionalInfo} 
              updateFormData={updateFormData} 
              nextStep={nextStep} 
              prevStep={prevStep} 
            />
          )}
          
          {step === 3 && (
            <SkillsEducationForm 
              formData={profileData.skillsEducation} 
              updateFormData={updateFormData} 
              nextStep={nextStep} 
              prevStep={prevStep} 
            />
          )}
          
          {step === 4 && (
            <ExperienceForm 
              formData={profileData.experience} 
              updateFormData={updateFormData} 
              nextStep={nextStep} 
              prevStep={prevStep} 
            />
          )}
          
          {step === 5 && (
            <AdditionalInfoForm 
              formData={profileData.additionalInfo} 
              updateFormData={updateFormData} 
              prevStep={prevStep} 
              submitForm={submitForm} 
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default ProfileCreate;