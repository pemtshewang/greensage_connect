import { LoginSchema, SignUpSchema } from "../validations/Auth/schema";

// Path: types/index.d.ts
interface Post {
  id: string;
  title: string;
  body: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

type LoginSchemaType = z.infer<typeof LoginSchema>;
type SignUpSchemaType = z.infer<typeof SignUpSchema>;
type PostType = z.infer<typeof Post>;

export { LoginSchemaType, SignUpSchemaType, PostType };
