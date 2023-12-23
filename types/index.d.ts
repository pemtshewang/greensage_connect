import { LoginSchema, SignUpSchema } from "../validations/Auth/schema";
import GreenhouseAddFormSchema from '../validations/GreenhouseAddFormSchema';

// Path: types/index.d.ts
interface Post {
  id: string;
  title: string;
  content: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

interface DzongkhagCategory {
  key: string;
  value: string;
}
interface DzongkhagSubCategory {
  [key: string]: DzongkhagCategory[];
}
type LoginSchemaType = z.infer<typeof LoginSchema>;
type SignUpSchemaType = z.infer<typeof SignUpSchema>;
type PostType = z.infer<typeof Post>;
type GreenhouseAddFormSchemaType = z.infer<typeof GreenhouseAddFormSchema>;
type DzongkhagCategoryType = z.infer<typeof DzongkhagCategory>;
type DzongkhagSubCategoryType = z.infer<typeof DzongkhagSubCategory>;

export { LoginSchemaType, SignUpSchemaType, PostType, GreenhouseAddFormSchemaType, DzongkhagCategoryType, DzongkhagSubCategoryType };
