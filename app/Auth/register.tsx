import PasswordInput from "../../components/PasswordInput";
import { Button } from "native-base";
import { HomeStyles } from "../../styles/styles";
import CustomTextInput from "../../components/TextInput";
import { VStack } from 'native-base';

function Register() {
    return (
        <VStack space={4} alignItems="center">
            <CustomTextInput style={HomeStyles.container} placeholder="Enter ID" width={300} />
            <CustomTextInput style={HomeStyles.container} placeholder='Enter Users Full Name' width={300} />
            <CustomTextInput style={HomeStyles.container} placeholder='Enter Phine Number' width={300} />
            <PasswordInput placeholder="Enter Password" width='285' />
            <PasswordInput placeholder="Confirm Password" width='285' />
            <Button>Register</Button>
        </VStack>
    );
}

export default Register;
