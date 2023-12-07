import { LoginSchema } from "../validations/Auth/schema";

// Path: types/index.d.ts

type LoginSchemaType = z.infer<typeof LoginSchema>;

export { LoginSchemaType };
