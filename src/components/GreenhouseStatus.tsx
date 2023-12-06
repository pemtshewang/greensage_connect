import React, { useState } from "react";
import { Box, Center, Text, Switch } from "native-base";

// Add type annotations for the props
interface ToggleButtonProps {
  isEnabled: boolean;
  onToggle: () => void;
}

// Separate ToggleButton component
const ToggleButton: React.FC<ToggleButtonProps> = ({ isEnabled, onToggle }) => {
  return (
    <Switch
    size="lg" // You can try "2xl", "3xl", etc. for larger sizes
      isChecked={isEnabled}
      onToggle={onToggle}
      colorScheme="red"
    />
  );
};

// GreenhouseStatus component
export default function GreenhouseStatus({
  children,
  type,
}: {
  children: React.ReactNode;
  type: "valve" | "exhaust_fan";
}) {
  const [isEnabled, setIsEnabled] = useState(false);

  const handleToggle = () => {
    setIsEnabled((prev) => !prev);
  };

  return (
    <Box
      bg="green.700"
      p="3"
      rounded="2xl"
      shadow={20}
      _text={{
        fontSize: "md",
        fontWeight: "medium",
        color: "warmGray.50",
        textAlign: "center",
      }}
    >
      {children}  

      <Center>
        <ToggleButton isEnabled={isEnabled} onToggle={handleToggle} />
      </Center>
       <Text mt="-4" fontSize="lg">
        Switch: {isEnabled ? "ON" : "OFF"}
      </Text>
    </Box>
  );
}
