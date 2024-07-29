import { createContext } from "react";

const RegistrantIdContext = createContext<{
  registrantId: String|null;
  setRegistrantId: (value:string)=>void;
}>({
  registrantId: "",
  setRegistrantId: (registrantId:String) => { },
});

export default RegistrantIdContext;
