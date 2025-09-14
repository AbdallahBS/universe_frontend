import { z } from 'zod';

// At least 8 chars, one uppercase, one lowercase, one number
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export const SignupSchema = z
  .object({
    firstname: z.string().min(2).max(50).trim(),
    lastname: z.string().min(2).max(50).trim(),
    email: z.string().email().trim(),
    password: z.string().regex(passwordRegex, {
      message: 'Password must be 8+ chars, include upper, lower, and a number',
    }),
    confirmPassword: z.string(),
    agreeToTerms: z.literal(true, {
      errorMap: () => ({ message: 'You must agree to the terms' }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type SignupForm = z.infer<typeof SignupSchema>;


