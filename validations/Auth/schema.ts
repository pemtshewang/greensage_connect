import { z } from 'zod';

const LoginSchema = z.object({
  // specify the message for each field
  username: z.string().min(5, { message: "Username must be between 5 and 20 characters" }).max(15, { message: "Username must be between 5 and 20 characters" }) || z.number().min(8, { message: "Number must be of 8 digits" }).max(8, { message: "Number must be of 8 digits" }),
  password: z
    .string()
    .min(3, { message: "Password must be between 3 and 20 characters" })
    .max(20, { message: "Password must be between 3 and 20 characters" })
});

const SignUpSchema = z.object({
  username: z.string().min(5, { message: "Username must be between 5 and 20 characters" }).max(15, { message: "Username must be between 5 and 20 characters" }),
  phoneNumber: z.string().min(8, { message: "Number must be of 8 digits" }).max(8, { message: "Number must be of 8 digits" }),
  idNumber: z.string().min(8, { message: "The ID number should be of min of 8 chars" }),
  password: z
    .string()
    .min(3, { message: "Password must be between 3 and 20 characters" })
    .max(20, { message: "Password must be between 3 and 20 characters" }),
  confirmPassword: z
    .string()
    .min(3, { message: "Password must be between 3 and 20 characters" })
    .max(20, { message: "Password must be between 3 and 20 characters" })
    .refine((data) => data.password === data.confirmPassword, { message: "Passwords do not match" }),
});

export { LoginSchema, SignUpSchema };
