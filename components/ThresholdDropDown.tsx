import { Select, Box, Badge, HStack } from "native-base";
import Icons from "../assets/Icons/Icons";

const ThresholdDropDown = ({
  Items,
  value,
  setValue
}: {
  Items: {
    label: string;
    value: {
      humidity: number;
      temperature: number;
      soil_moisture: number;
    };
    _icon: any;
  }[],
  value: number,
  setValue: (value: number) => void
}) => {
  return <HStack borderWidth={1} maxW={250}>
    <Icons.onionIcon width={32} height={32} />
    <Select
      shadow={2}
      selectedValue={value.toString()}
      w="container"
      minW={200}
      accessibilityLabel="Choose threshold for the plants "
      placeholder="Select a threshold"
      borderWidth="0"
      onValueChange={itemValue => setValue(Number(itemValue))}>
      {
        Items.map((item, index) => {
          return <Select.Item key={index} label={item.label}
            endIcon={<Box><Badge>{item.value.humidity + "%"}</Badge></Box>}
            value={String(item.value.humidity)} startIcon={<item._icon width={32} height={32} />} />
        })
      }
    </Select>
  </HStack >;
}

export default ThresholdDropDown;
