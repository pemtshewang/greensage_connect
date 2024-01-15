import { z } from "zod";

export const MQTTBrokerSchema = z.object({
  brokerURL: z.string().url({ message: "The URL or IP of broker should be valid" }) || z.string().ip({ message: "The URL or IP of broker should be valid" }),
  brokerUsername: z.string().min(5, { message: "Username must be between 5 and 20 characters" }).max(20, { message: "Username must be between 5 and 20 characters" }),
  brokerPassword: z.string().min(5, { message: "Password must be between 5 and 20 characters" }).max(20, { message: "Password must be between 5 and 20 characters" }),
  brokerPort: z.number().min(1, { message: "Port must be between 1 and 65535" }).max(65535, { message: "Port must be between 1 and 65535" }),
});
