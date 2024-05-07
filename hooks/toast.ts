import { useToast } from "native-base";

const createToast = () => {
  const toast = useToast();
  const toastMessage = ({
    message,
    type,
    duration,
  }: {
    message: string;
    type: "info" | "warning" | "success" | "error";
    duration?: null | number;
  }) => {
    return toast.show({
      duration: duration ? duration : 2000,
      placement: "bottom",
      bg:
        type === "success"
          ? "success.500"
          : type === "error"
            ? "error.500"
            : type === "warning"
              ? "warning.500"
              : "info.600",
      description: message,
    });
  };
  return { toastMessage };
};

export default createToast;
