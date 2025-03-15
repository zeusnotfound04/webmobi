'use client'
import type { JobDescription } from '@/types';
import { Upload, Briefcase, Mail, Linkedin, User, Code, BookOpen } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { FileUpload } from '@/components/ui/FileUpload';

import pdfToText from 'react-pdftotext';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from './ui/button';


const candidateSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  linkedinUrl: z.string()
    .url({ message: 'Must be a valid URL' })
    .regex(/^https:\/\/[www.]*linkedin.com\/.*$/i, { 
      message: 'Must be a valid LinkedIn URL' 
    }),
  skills: z.string().optional(),
  experience: z.string().min(1, { message: 'Experience is required' }),
  resumeFile: z.any().optional(), // Changed to any to avoid type issues with File
});

// Export the type for use elsewhere
export type CandidateFormData = z.infer<typeof candidateSchema>;

export default function CandidateForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeText , setResumeText] = useState<string | null>(null) 
  
  // Initialize form with Zod resolver
  const form = useForm<CandidateFormData>({
    resolver: zodResolver(candidateSchema),
    defaultValues: {
      name: '',
      email: '',
      linkedinUrl: '',
      skills: '',
      experience: '',
    },
  });

  const handleFileChange = (files: File[]) => {
    if (files && files.length > 0) {
      // Get the first file only
      const file = files[0];
      // Check if it's a PDF
      if (file.type === 'application/pdf') {
        setResumeFile(file);
        form.setValue('resumeFile', file);
        console.log('Resume uploaded:', file.name);


        pdfToText(file)
          .then((text) => {
            console.log('Extracted text:', text);
            setResumeText(text);
           
            form.setValue('experience', text);
          })
          .catch((error) => console.error('Failed to extract text from PDF', error));

      } else {
        console.error('Invalid file type. Please upload a PDF file.');
              }
    }
  };

  const handleClick = async () => {

    try {
      
    } catch (error) {
      
    }
  }
  const onSubmit = async (data: CandidateFormData) => {
    setIsSubmitting(true);
    console.log("Raw Data ::::::" , data)
    try {
     
      const formData = {
        ...data,
        resumeFile: resumeFile,
        resumeText: resumeText,
      };
      
     
      console.log('Form data:', formData);
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

          <Button onClick={handleCli}>Create Index</Button>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl">
              <div className="grid grid-cols-1 gap-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-sm font-medium text-gray-700">
                        <User className="h-4 w-4 mr-2" />
                        Name
                      </FormLabel>
                      <FormControl>
                        <input
                          type="text"
                          className="form-input-transition w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-sm font-medium text-gray-700">
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                      </FormLabel>
                      <FormControl>
                        <input
                          type="email"
                          className="form-input-transition w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="linkedinUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-sm font-medium text-gray-700">
                        <Linkedin className="h-4 w-4 mr-2" />
                        LinkedIn URL
                      </FormLabel>
                      <FormControl>
                        <input
                          type="url"
                          className="form-input-transition w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Upload className="h-4 w-4 mr-2" />
                    Resume (PDF)
                  </label>
                  {/* Use FileUpload component directly without wrapping in FormField */}
                  <FileUpload onChange={handleFileChange} />
                  <p className="mt-2 text-xs text-gray-500">
                    Upload your resume in PDF format
                  </p>
                  {resumeFile && (
                    <p className="mt-2 text-sm text-green-600">
                      Selected file: {resumeFile.name}
                    </p>
                  )}
                </div>

                <FormField
                  control={form.control}
                  name="skills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-sm font-medium text-gray-700">
                        <Code className="h-4 w-4 mr-2" />
                        Skills (comma-separated)
                      </FormLabel>
                      <FormControl>
                        <input
                          type="text"
                          className="form-input-transition w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g., JavaScript, React, Node.js"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-sm font-medium text-gray-700">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Experience
                      </FormLabel>
                      <FormControl>
                        <textarea
                          rows={4}
                          className="form-input-transition w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Briefly describe your relevant experience..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
          </Form>
        </div>
      </div>
    </div>
  );
}