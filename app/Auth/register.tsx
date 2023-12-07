import PasswordInput from "../../components/PasswordInput";
<<<<<<< Updated upstream
import { Button, View, Text} from "native-base";
import { HomeStyles, LoginStyles } from "../../styles/styles";
=======
import { Button, View } from "native-base";
import { HomeStyles } from "../../styles/styles";
>>>>>>> Stashed changes
import CustomTextInput from "../../components/TextInput";
import TextInputIcon from "../../components/TextInputIcon";
import { VStack } from 'native-base';
import { Icon } from "lucide-react-native";
import { Icons } from "../../assets/Icons/Icons";
import { Link } from "expo-router";
import { RegisterStyles } from "../../styles/styles";
import { LinearGradient } from "expo-linear-gradient";


function Register() {
    return (
<<<<<<< Updated upstream
        <LinearGradient
            colors={["#228B29", "#6A9"]}
            style={LoginStyles.container}
        >
            <VStack space={4} alignItems="center">
            <View>
                    <Text fontSize="xl" style={RegisterStyles.link}>GreenSage Connect Login</Text>
                </View>
                <View>
                    <TextInputIcon
                        type='text'
                        placeholder="Username/Phone Number"
                        width={300}
                        icon={<Icons.loginUser color='black' />}
                    />
                </View>
                                <View>
                    <TextInputIcon
                        type='text'
                        placeholder="Username/Phone Number"
                        width={300}
                        icon={<Icons.loginUser color='black' />}
                    />
                </View>
                                <View>
                    <TextInputIcon
                        type='text'
                        placeholder="Username/Phone Number"
                        width={300}
                        icon={<Icons.loginUser color='black' />}
                    />
                </View>
                <View>
                    <TextInputIcon
                        type='password'
                        placeholder="Password"
                        width={300}
                        icon={<Icons.loginLock color='black' />}
                    />
                </View>
                                <View>
                    <TextInputIcon
                        type='password'
                        placeholder="Password"
                        width={300}
                        icon={<Icons.loginLock color='black' />}
                    />
                </View>
                <View style={{
                    alignItems: "center"
                }}>
                    <Button style={RegisterStyles.button}>
                        Register
                    </Button>
                </View>
                <View style={RegisterStyles.linkView}>
                    <Text>Don't have an account?</Text>
                    <Link href="/Auth/register" style={RegisterStyles.link}>Login</Link>
                </View>
            {/* <CustomTextInput style={HomeStyles.container} placeholder="Enter ID" width={300} />
=======
        
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <VStack space={4} alignItems="center">
            <CustomTextInput style={HomeStyles.container} placeholder="Enter ID" width={300} />
>>>>>>> Stashed changes
            <CustomTextInput style={HomeStyles.container} placeholder='Enter Users Full Name' width={300} />
            <CustomTextInput style={HomeStyles.container} placeholder='Enter Phine Number' width={300} />
            <PasswordInput placeholder="Enter Password" width='285' />
            <PasswordInput placeholder="Confirm Password" width='285' />
            <Button>Register</Button> */}
        </VStack>
<<<<<<< Updated upstream

  
        </LinearGradient>
        
=======
        </View>
>>>>>>> Stashed changes
    );
}

export default Register;
