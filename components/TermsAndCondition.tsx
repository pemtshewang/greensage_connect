import CustomModal from "./ui/Modal";
import { ScrollView, Text } from "native-base";

export const TCModal = ({
  modalVisible,
  setModalVisible
}: {
  modalVisible: boolean,
  setModalVisible: (bool: boolean) => void
}) => {
  return (
    <CustomModal
      setModalVisible={setModalVisible}
      modalTitle="Terms and Conditions"
      modalVisible={modalVisible}>
      <ScrollView>
        <Text>
          These terms and conditions ("Terms") govern your use of the Greensage Connect application ("the App"). By registering and using the App, you agree to comply with these Terms. If you do not agree with any part of these Terms, you may not use the App.

          {'\n\n'}
          1. Acceptance of Terms{'\n\n'}
          By registering for and using the Greensage Connect application, you acknowledge that you have read, understood, and agree to be bound by these Terms.

          {'\n\n'}
          2. Use of Services{'\n\n'}
          a. The Greensage Connect application provides access to MQTT (Message Queuing Telemetry Transport) service in addition to WebSocket service.

          b. You agree to use the App's services in compliance with all applicable laws and regulations.

          {'\n\n'}
          3. Collection of User Data{'\n\n'}
          a. The App may collect user data, including but not limited to:
          - Device information
          - Usage statistics
          - Location data (if permitted by the user)

          b. The collected data may be used for analytics purposes, including improving the functionality of the App and enhancing user experience.

          {'\n\n'}
          4. Privacy{'\n\n'}
          a. Greensage Connect respects your privacy and is committed to protecting your personal information. Please review our Privacy Policy for details on how we collect, use, and disclose your data.

          {'\n\n'}
          5. Account Security{'\n\n'}
          a. You are responsible for maintaining the confidentiality of your account credentials and for any activities that occur under your account.

          b. You agree to notify Greensage Connect immediately of any unauthorized use of your account or any other breach of security.

          {'\n\n'}
          6. Intellectual Property{'\n\n'}
          a. All content and materials provided through the App are the property of Greensage Connect or its licensors and are protected by intellectual property laws.

          b. You may not reproduce, distribute, modify, or create derivative works of any content or materials from the App without prior written consent.

          {'\n\n'}
          7. Limitation of Liability{'\n\n'}
          a. Greensage Connect shall not be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in any way connected with your use of the App.

          {'\n\n'}
          8. Modifications to Terms{'\n\n'}
          a. Greensage Connect reserves the right to modify or update these Terms at any time without prior notice. Continued use of the App after any such changes shall constitute your consent to such changes.

          {'\n\n'}
          9. Contact Information{'\n\n'}
          a. If you have any questions or concerns about these Terms, please contact us at pemtshewang500@gmail.com
        </Text>
      </ScrollView>
    </CustomModal>
  )
}
