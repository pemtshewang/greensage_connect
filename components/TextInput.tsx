import React from "react";
import { Box, Input} from "native-base";
import { ResponsiveValue } from "native-base/lib/typescript/components/types";
import { SizeType } from "native-base/lib/typescript/components/types";
import { InputTextStyle } from "../styles/styles";
import { Icon } from "lucide-react-native";
import { Button } from "native-base";
import { HomeStyles } from "../styles/styles";
export default function CustomTextInput({ placeholder, width, style}: {
  placeholder: string,
  width: SizeType,
  style: any,
}) {
  const [value, setValue] = React.useState("");
  const handleChange = (text: React.SetStateAction<string>) => setValue(text);
  return (
    
      <Input   value={value} w={width}  placeholder={placeholder} style={style} />
    
  )
}
