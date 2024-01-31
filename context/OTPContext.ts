import { createContext } from "react";

const OTPContext = createContext<{
  id: string;
  setID: (otp: string) => void;
}>({
  id: "",
  setID: () => { },
});

export default OTPContext;
