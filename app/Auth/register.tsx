import PasswordInput from "../../components/PasswordInput";
import { Button, View } from "native-base";
import { HomeStyles } from "../../styles/styles";
import CustomTextInput from "../../components/TextInput";
import TextInputIcon from "../../components/TextInputIcon";
import { VStack } from 'native-base';
import { Icon } from "lucide-react-native";
import { Icons } from "../../assets/Icons/Icons";
import { Link } from "expo-router";
import { RegisterStyles } from "../../styles/styles";
import { LinearGradient } from "expo-linear-gradient";
import { Select } from "native-base";
import { FormControl } from "native-base";
import { CheckIcon } from "native-base";
import { WarningOutlineIcon } from "native-base";
function Register() {
    return (
        
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <VStack space={4} alignItems="center">
            <CustomTextInput style={HomeStyles.container} placeholder="Enter ID" width={300} />
            <CustomTextInput style={HomeStyles.container} placeholder='Enter Users Full Name' width={300} />
            <CustomTextInput style={HomeStyles.container} placeholder='Enter Phine Number' width={300} />
            <PasswordInput placeholder="Enter Password" width='285' />
            <PasswordInput placeholder="Confirm Password" width='285' />
            <Button>Register</Button> */}
        </VStack>
        </View>
    );
}

export default Register;
