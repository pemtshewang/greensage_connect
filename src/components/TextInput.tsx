import React from "react";
import { Box, Input} from "native-base";
import { ResponsiveValue } from "native-base/lib/typescript/components/types";
import { SizeType } from "native-base/lib/typescript/components/types";

export default function TextInput({ placeholder, width }: {
  placeholder: string,
  width: SizeType
}) {
  const [value, setValue] = React.useState("");
  const handleChange = (text: React.SetStateAction<string>) => setValue(text);
  return (
    <Box alignItems="center">
      <Input value={value} w={width} onChangeText={handleChange} placeholder={placeholder} />
    </Box>
  )
}
