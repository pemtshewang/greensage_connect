import { VStack, Select, Box, Badge, HStack } from "native-base";
import { useState } from "react";
import { VegIcons } from "../api/data/threshold";
import Icons from "../assets/Icons/Icons";

const Example = ({
  Items
}: {
  Items: {
    label: string;
    value: string;
    _icon: any;
  }[]
}) => {
  let [service, setService] = useState("");
  return <HStack borderWidth={1} maxW={250}>
    <Icons.onionIcon width={32} height={32} />
    <Select
      shadow={2}
      selectedValue={service}
      w="container"
      minW={200}
      accessibilityLabel="Choose threshold for the plants "
      placeholder="Select a threshold"
      borderWidth="0"
      onValueChange={itemValue => setService(itemValue)}>
      {
        Items.map((item, index) => {
          return <Select.Item key={index} label={item.label}
            endIcon={<Box><Badge>{item.value + "%"}</Badge></Box>}
            value={item.value} startIcon={<item._icon width={32} height={32} />} />
        })
      }
    </Select>
  </HStack >;
}

export default Example;
