import React from "react";
import { Input } from "native-base";
import { Box } from "native-base";
import { Button } from "native-base";
//icons here
import { Icons } from "../assets/Icons/Icons";

const PasswordInput = ({
  width,
}: {
  width?: string;
}) => {
  const [show, setShow] = React.useState(false);

  const handleClick = () => setShow(!show);

  return <Box alignItems="center">
    <Input type={show ? "text" : "password"} w={width} py="0" InputRightElement={<Button size="xs" rounded="none" w="1/6" h="full" onPress={handleClick}>
      {show ? <Icons.visibleOff /> : <Icons.visible />}
    </Button>} placeholder="Password" />
  </Box>;
};

export default PasswordInput;
