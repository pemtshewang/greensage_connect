import { TextInput, View  } from "react-native";
import PasswordInput from "../../components/PasswordInput";
import { ButtonStyle } from "../../styles/styles";
import { Button } from "native-base";
import { HomeStyles } from "../../styles/styles";

function login() {
    return <View style={HomeStyles.container}>
        <CustomStatusBar style='auto' />
        <PasswordInput width='50%' />
        <Button style = {ButtonStyle.register}> </Button>


        <PasswordInput/>   
    </View>
}

export default login;