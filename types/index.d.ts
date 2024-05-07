import { LoginSchema, SignUpSchema } from "../validations/Auth/schema";
import GreenhouseAddFormSchema from "../validations/GreenhouseAddFormSchema";
import { MQTTBrokerSchema } from "../validations/MQTTBroker";

// Path: types/index.d.ts
interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  image: string;
  author: string;
}

interface UserProfile {
  username: string;
  id: string;
  mobile: string;
  dzongkhag: string;
  gewog: string;
  greenhouseCount: string;
  irrigationCount: string;
  cid: string;
  expirationDate: string;
}

interface DzongkhagCategory {
  key: string;
  value: string;
}

interface DzongkhagSubCategory {
  [key: string]: DzongkhagCategory[];
}

// interface for graphs
export interface IReadings {
  temperature: number;
  humidity: number;
  Pressure: number;
  soilMoisture: number;
  recordedAt: Date;
}

export interface IWaterScheduleRecords {
  startTime: string;
  endTime: string;
  repetitionDays: number;
}

export interface IHumidityThresholdRecord {
  recordedAt: Date;
  value: number;
}

export interface ITemperatureThresholdRecord {
  recordedAt: Date;
  value: number;
}

export interface ISoilMoistureThresholdRecords {
  recordedAt: Date;
  value: number;
}

type LoginSchemaType = z.infer<typeof LoginSchema>;
type SignUpSchemaType = z.infer<typeof SignUpSchema>;
type PostType = z.infer<typeof Post>;
type GreenhouseAddFormSchemaType = z.infer<typeof GreenhouseAddFormSchema>;
type DzongkhagCategoryType = z.infer<typeof DzongkhagCategory>;
type DzongkhagSubCategoryType = z.infer<typeof DzongkhagSubCategory>;
type BrokerConfigType = z.infer<typeof MQTTBrokerSchema>;
type UserProfileType = z.infer<typeof UserProfile>;

export {
  LoginSchemaType,
  SignUpSchemaType,
  PostType,
  GreenhouseAddFormSchemaType,
  DzongkhagCategoryType,
  DzongkhagSubCategoryType,
  BrokerConfigType,
  UserProfileType,
};
