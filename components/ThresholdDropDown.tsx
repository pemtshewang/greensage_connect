import { VStack, Select } from "native-base";
import { useState } from "react";
import { CheckIcon, Image } from "native-base";
import Icons from "../assets/Icons/Icons";

const Example = ({
  Items
}: {
  Items: {
    label: string;
    value: string;
    _icon: JSX.Element
  }
}) => {
  let [service, setService] = useState("");
  return <VStack alignItems="center" space={4}>
    <Select shadow={2} selectedValue={service} minWidth="200" accessibilityLabel="Choose threshold for the plants " placeholder="Choose Service" _selectedItem={{
      bg: "teal.600",
      endIcon: <CheckIcon size="5" />
    }} _light={{
      bg: "coolGray.100",
    }} _dark={{
      bg: "coolGray.800",
    }} onValueChange={itemValue => setService(itemValue)}>
      <Select.Item shadow={2} label="UX Res" value="ux"
        startIcon={<Icons.maizeIcon width={32} height={32} />}
      />
      <Select.Item shadow={2} label="Web Development" value="web" />
      <Select.Item shadow={2} label="Cross Platform Development" value="cross" />
      <Select.Item shadow={2} label="UI Designing" value="ui" />
      <Select.Item shadow={2} label="Backend Development" value="backend" />
    </Select>
  </VStack>;
}

export default Example;
