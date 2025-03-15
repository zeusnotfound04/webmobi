'use client'
import * as z from 'zod';
import CandidateForm from '@/components/Form';

// Define Zod schema for form validation
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
  resumeFile: z.any().optional(), 
});

export type CandidateFormData = z.infer<typeof candidateSchema>;

export default function Home() {
  

  return (
    <div className="h-full w-full">
      
    <CandidateForm/>
    </div>
  );
}