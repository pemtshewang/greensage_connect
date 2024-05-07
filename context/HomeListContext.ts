import React, { SetStateAction, createContext } from "react";

const HomeListContext = createContext<{
  type: "greenhouse" | "irrigation";
  setType: React.Dispatch<SetStateAction<"greenhouse" | "irrigation">>;
}>({
  type: "irrigation",
  setType: () => { },
});

export default HomeListContext;
