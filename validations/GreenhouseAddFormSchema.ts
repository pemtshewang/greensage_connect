import { z } from 'zod';

const GreenhouseAddFormSchema = z.object({
    id: z.string(),
    name: z.string().min(5, { message: "Name must be between 5 and 20 characters" }).max(20, { message: "Name must be between 5 and 20 characters" }),
    ipAddress: z.string().ip({ message: "IP Address must be valid" }),
    image: z.string().optional()
})

export default GreenhouseAddFormSchema