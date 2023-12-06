import { TextInput, View  } from "react-native";
import PasswordInput from "../../components/PasswordInput";
import { ButtonStyle } from "../../styles/styles";
import { Button } from "native-base";
import { HomeStyles } from "../../styles/styles";
import { StatusBar} from "native-base";

function Register() {
    return <View style={HomeStyles.container}>
        <PasswordInput width='50%' />
        <TextInput placeholder='Email'/>
        <Button style = {ButtonStyle.register}> </Button>
   
    </View>
}

export default Register;