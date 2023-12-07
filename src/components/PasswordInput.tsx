import React from "react";
import { Input } from "native-base";
import { Box } from "native-base";
import { Button } from "native-base";
//icons here
import { Icons } from "../assets/Icons/Icons";
import { PasswordInputStyles } from "../styles/styles";
import { SizeType } from "native-base/lib/typescript/components/types";

const PasswordInput = ({
  width,
  placeholder
}: {
  width?: SizeType,
  placeholder ?: string
}) => {
  const [show, setShow] = React.useState(false);

  const handleClick = () => setShow(!show);

  return <Box alignItems="center" style={PasswordInputStyles.input}>
    <Input type={show ? "text" : "password"} w={width} py="0"  
      InputRightElement={<Button size="xs" rounded="none" w="1/6" h="full" onPress={handleClick}
       
      >
        {show ? <Icons.visibleOff color="black" /> : <Icons.visible color="black" />}
      </Button>} placeholder={placeholder} />
  </Box>;
};

export default PasswordInput;
