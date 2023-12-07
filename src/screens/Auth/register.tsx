import { TextInput, View  } from "react-native";
import PasswordInput from "../../components/PasswordInput";
import { ButtonStyle, InputText } from "../../styles/styles";
import { Button } from "native-base";
import { HomeStyles } from "../../styles/styles";
import { InputTextStyle } from "../../styles/styles";
import { Import } from "lucide-react-native";
import { Icons } from "../../assets/Icons/Icons";
import CustomTextInput from "../../components/TextInput";
import { FinalButonStyle } from "../../styles/styles";
import { VStack } from 'native-base';

function Register() {
    return (

        <VStack space={4} alignItems="center">
        
        <CustomTextInput  style={HomeStyles.container} placeholder="Enter ID" width={300}/>
            <CustomTextInput style={HomeStyles.container} placeholder='Enter Users Full Name' width={300}/>
            <CustomTextInput style={HomeStyles.container} placeholder='Enter Phine Number' width={300}/>
            <PasswordInput   placeholder="Enter Password" width = '284'/>
            <PasswordInput   placeholder="Confirm Password" width = '284'/>
            <Button style = {FinalButonStyle.buttons}> Register</Button>
        </VStack>
    );
    


       
}


export default Register;