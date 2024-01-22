import { useToast } from "native-base";

const createToast = () => {
  const toast = useToast()
  const toastMessage = ({ message, type }: {
    message: string,
    type: "info" | "warning" | "success" | "error"
  }) => {
    return toast.show({
      duration: 2000,
      placement: "bottom",
      bg: type === "success" ? "green.500" : type === "error" ? "red.500" : type === "warning" ? "yellow.500" : "info.500",
      description: message,
    });
  }
  return { toastMessage };
}

export default createToast;
