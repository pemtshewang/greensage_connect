import { Box, Input } from "native-base";
import { LoginStyles } from "../styles/styles";
import { IInputComponentType } from "native-base/lib/typescript/components/primitives/Input/types";

export default function NotificationSpacer() {
  return (
    <Box alignItems="center">
      <Input
        style={LoginStyles.input}
        borderColor={"black"}
      
      />
    </Box>
  )
}
