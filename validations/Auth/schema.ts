import { z } from 'zod';

const LoginSchema = z.object({
  username: z.string().min(5).max(15) || z.number().min(8).max(8),
  password: z
    .string()
    .min(3)
    .max(20)
});


export { LoginSchema };
