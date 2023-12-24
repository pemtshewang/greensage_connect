import { Box, Input } from "native-base";
import { LoginStyles } from "../styles/styles";

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
