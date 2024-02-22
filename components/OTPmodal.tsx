import { Modal } from "native-base";
import OTPForm from "./Forms/OTPForm";
// @ts-nocheck
export default function OTPModal({
  otp,
  mobile,
  modalVisible,
  setModalVisible }: {
    otp: number;
    mobile: string,
    modalVisible: boolean,
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  }) {
  return <>
    <Modal isOpen={modalVisible} onClose={setModalVisible} >
      <Modal.Content maxH="212">
        <Modal.Body>
          <OTPForm generatedOTP={otp} setModalVisible={setModalVisible} mobile={mobile} />
        </Modal.Body>
      </Modal.Content>
    </Modal>
  </>;
}
