import { Box, Input } from "native-base";
import { SizeType } from "native-base/lib/typescript/components/types";
import { Icons } from "../assets/Icons/Icons";
import { useState } from "react";
import { LucideIcon, LucideProps } from "lucide-react-native";
import { LoginStyles } from "../styles/styles";

export default function TextInputIcon({ placeholder, width, icon, type }: {
  placeholder: string,
  width: SizeType,
  icon: React.ReactNode,
  type: "password" | "text"
}) {
  const [value, setValue] = useState("");
  const handleChange = text => setValue(text);
  return (
    <Box alignItems="center">
      <Input
        type={type}
        value={value}
        w={width}
        onChangeText={handleChange}
        placeholder={placeholder}
        InputLeftElement={<Box style={LoginStyles.icon}>{icon}</Box>}
        style={LoginStyles.input}
        borderColor={"black"}
      />
    </Box>
  )
}
