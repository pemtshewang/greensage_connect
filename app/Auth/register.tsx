import PasswordInput from "../../components/PasswordInput";
import { Button, View, Text} from "native-base";
import { HomeStyles, LoginStyles } from "../../styles/styles";
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
        <LinearGradient
            colors={["#228B29", "#6A9"]}
            style={LoginStyles.container}
        >
            <VStack space={10} alignItems="center" marginTop={120}>
            <View>
                    <Text fontSize="xl" style={RegisterStyles.link}>Register</Text>
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
                <View>
                    <FormControl w="3/4" maxW="300" isRequired >
                        <Select minWidth="300" accessibilityLabel="Choose Dzongkhag" placeholder="Choose Dzongkhad" _selectedItem={
                            {
                                bg: "teal.600",
                                endIcon: <CheckIcon size={5} />
                            }
                        } mt="1">
                        <Select.Item label="UX Research" value="ux" />
                        <Select.Item label="Web Development" value="web" />
                        <Select.Item label="Cross Platform Development" value="cross" />
                        <Select.Item label="UI Designing" value="ui" />
                        <Select.Item label="Backend Development" value="backend" />
                        </Select>
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                        Please Select Dzongkhag!
                        </FormControl.ErrorMessage>
                    </FormControl>
                    
                </View>
                <View style={{ alignItems: "center"}}>
                    <Button style = {RegisterStyles.button}>
                        Register
                    </Button>
                </View>
                <View style={RegisterStyles.linkView}>
                    <Text>Don't have an account?</Text>
                    <Link href="/Auth/register" style={RegisterStyles.link}>Login</Link>
                </View>
            {/* <CustomTextInput style={HomeStyles.container} placeholder="Enter ID" width={300} />
            <CustomTextInput style={HomeStyles.container} placeholder='Enter Users Full Name' width={300} />
            <CustomTextInput style={HomeStyles.container} placeholder='Enter Phine Number' width={300} />
            <PasswordInput placeholder="Enter Password" width='285' />
            <PasswordInput placeholder="Confirm Password" width='285' />
            <Button>Register</Button> */}
        </VStack>

  
        </LinearGradient>
        
    );
}

export default Register;
