import { Popover } from "native-base";

const CustomPopover = ({
  popoverVisible,
  setPopoverVisible,
  popoverContent,
  position,
  TriggerElement,
}: {
  popoverVisible: boolean;
  setPopoverVisible: (visible: boolean) => void;
  popoverContent: JSX.Element;
  TriggerElement: (props: any) => JSX.Element;
  position: "top" | "bottom" | "left" | "right";
}) => {
  return (
    <Popover // @ts-ignore
      placement={position}
      trigger={(triggerProps) => {
        return <TriggerElement {...triggerProps} />;
      }}
      isOpen={popoverVisible}
      onClose={() => setPopoverVisible(false)}
    >
      <Popover.Content w="56">
        <Popover.Arrow />
        <Popover.CloseButton onPress={() => setPopoverVisible(false)} />
        <Popover.Header>Delete Customer</Popover.Header>
        <Popover.Body>{popoverContent}</Popover.Body>
        <Popover.Footer justifyContent="flex-end"></Popover.Footer>
      </Popover.Content>
    </Popover>
  );
};

export default CustomPopover;
