import { LoginSchema, SignUpSchema } from "../validations/Auth/schema";

// Path: types/index.d.ts

type LoginSchemaType = z.infer<typeof LoginSchema>;
type SignUpSchemaType = z.infer<typeof SignUpSchema>;

export { LoginSchemaType, SignUpSchemaType };
