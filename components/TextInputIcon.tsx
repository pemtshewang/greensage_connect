import { Box, Input } from "native-base";
import { LoginStyles } from "../styles/styles";
import { IInputComponentType } from "native-base/lib/typescript/components/primitives/Input/types";

export default function TextInputIcon(props: IInputComponentType) {
  return (
    <Box alignItems="center">
      <Input
        style={LoginStyles.input}
        borderColor={"black"}
        {...props}
        fontFamily="OpenSans"
        letterSpacing="1"
        placeholderTextColor="coolGray.200"
        _focus={{
          borderWidth: 2,
          borderColor: "black",
          focusOutlineColor: "text.200",
        }}
      />
    </Box>
  );
}
