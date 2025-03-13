import Image from "next/image";
import { Upload, Briefcase, Mail, Linkedin, User, Code, BookOpen } from 'lucide-react';
import { useForm } from 'react-hook-form';


export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<Candidate>();
  const [resumeText, setResumeText] = useState('');

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      // TODO: Implement PDF parsing
      console.log('File uploaded:', file.name);
    }
  };

  

  const onSubmit = async (data: Candidate) => {
    setIsSubmitting(true);
    try {
      // TODO: Implement submission logic
      console.log('Form data:', data);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen gradient-bg">
    <div className="min-h-screen bg-white/10 backdrop-blur-sm py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12 animate-float">
          <Briefcase className="h-16 w-16 mx-auto mb-4 text-white" />
          <h1 className="text-4xl font-bold text-white mb-4">AI-Powered Recruitment</h1>
          <p className="text-xl text-white/80">Submit your application and let AI match you with the perfect role</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl">
          <div className="grid grid-cols-1 gap-8">
            <div className="relative">
              <label htmlFor="name" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <User className="h-4 w-4 mr-2" />
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register('name', { required: 'Name is required' })}
                className="form-input-transition w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
            </div>

            <div className="relative">
              <label htmlFor="email" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Mail className="h-4 w-4 mr-2" />
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                className="form-input-transition w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>

            <div className="relative">
              <label htmlFor="linkedinUrl" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Linkedin className="h-4 w-4 mr-2" />
                LinkedIn URL
              </label>
              <input
                type="url"
                id="linkedinUrl"
                {...register('linkedinUrl', { 
                  required: 'LinkedIn URL is required',
                  pattern: {
                    value: /^https:\/\/[www.]*linkedin.com\/.*$/i,
                    message: 'Must be a valid LinkedIn URL'
                  }
                })}
                className="form-input-transition w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.linkedinUrl && <p className="mt-1 text-sm text-red-600">{errors.linkedinUrl.message}</p>}
            </div>

            <div className="relative">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Upload className="h-4 w-4 mr-2" />
                Resume
              </label>
              <div
                {...getRootProps()}
                className={`form-input-transition border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-200
                  ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'}`}
              >
                <input {...getInputProps()} />
                <Upload className={`mx-auto h-12 w-12 ${isDragActive ? 'text-blue-500 animate-bounce' : 'text-gray-400'}`} />
                <p className="mt-2 text-sm text-gray-600">
                  Drag & drop your resume PDF here, or click to select
                </p>
              </div>
            </div>

            <div className="relative">
              <label htmlFor="skills" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Code className="h-4 w-4 mr-2" />
                Skills (comma-separated)
              </label>
              <input
                type="text"
                id="skills"
                {...register('skills')}
                className="form-input-transition w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., JavaScript, React, Node.js"
              />
            </div>

            <div className="relative">
              <label htmlFor="experience" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <BookOpen className="h-4 w-4 mr-2" />
                Experience
              </label>
              <textarea
                id="experience"
                {...register('experience', { required: 'Experience is required' })}
                rows={4}
                className="form-input-transition w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Briefly describe your relevant experience..."
              />
              {errors.experience && <p className="mt-1 text-sm text-red-600">{errors.experience.message}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg text-white text-lg font-medium transition-all duration-200 transform hover:scale-[1.02]
              ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 active:scale-95'}`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  </div>
  );
}
