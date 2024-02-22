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
  username: z.string().min(5, { message: "Username must be between 5 and 20 characters" }).max(20, { message: "Username cannot be longer than 20 characters" }), // Corrected max length to 20
  phoneNumber: z.string().length(8, { message: "Phone number must be 8 digits long" }), // Used .length for exact length
  idNumber: z.string().min(10, { message: "Enter valid ID card number" }), // Corrected min length to 10
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }), // Corrected min length to 8
  confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters long" }), // Corrected min length to 8
  dzongkhag: z.string().min(1, { message: "Select a dzongkhag" }), // Corrected min length to 1
  gewog: z.string().min(1, { message: "Select a gewog" }), // Corrected min length to 1
  coords: z.object({
    latitude: z.string(),
    longitude: z.string()
  }).optional(),
}).superRefine((data, ctx) => {
  if (data.password !== data.confirmPassword) {
    //use ctx and code to throw error
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });
  }
});
export { LoginSchema, SignUpSchema };
