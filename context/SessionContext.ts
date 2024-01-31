import { createContext } from "react";

const SessionContext = createContext<{
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  modalVisible: false,
  setModalVisible: () => { },
});

export default SessionContext;
