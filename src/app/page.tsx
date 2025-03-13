'use client'
import type { JobDescription } from '@/types';
import { Upload, Briefcase, Mail, Linkedin, User, Code, BookOpen } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
// Import the FileUpload component and its props type
import { FileUpload } from '@/components/ui/FileUpload';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import CandidateForm from '@/components/Form';
import Squares from '@/components/SquareBg';

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
  resumeFile: z.any().optional(), // Changed to any to avoid type issues with File
});

// Export the type for use elsewhere
export type CandidateFormData = z.infer<typeof candidateSchema>;

export default function Home() {
  

  return (
    <div className="h-full w-full">
      
    <CandidateForm/>
    </div>
  );
}