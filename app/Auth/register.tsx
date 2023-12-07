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
import { Select } from "native-base";
import { FormControl } from "native-base";
import { CheckIcon } from "native-base";
import { WarningOutlineIcon } from "native-base";
function Register() {
    return (
<<<<<<< Updated upstream
        <LinearGradient
            colors={["#228B29", "#6A9"]}
            style={LoginStyles.container}
        >
            <VStack space={10} alignItems="center" marginTop={150}>
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
                        icon={<Icons.loginLock color='#000' />}
                    />
                </View>
                <View>
                    <FormControl w="3/4" maxW="300" isRequired >
                        <Select minWidth="300"  placeholder="Choose Dzongkhad" _selectedItem={
                            {
                                bg: "teal.600",
                                endIcon: <CheckIcon size={10} />
                            }
                        } mt="1">
                        <Select.Item label="UX Research" value="ux" />
                        <Select.Item label="Web Development" value="web" />
                        <Select.Item label="Cross Platform Development" value="cross" />
                        <Select.Item label="UI Designing" value="ui" />
                        <Select.Item label="Backend Development" value="backend" />
                        </Select>
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                        Please Select!
                        </FormControl.ErrorMessage>
                    </FormControl>
                    
                </View>
                <View style={{ alignItems: "center"}}>
                    <Button style = {RegisterStyles.button}>
                        Register
                    </Button>
                </View>
                <View style={RegisterStyles.linkView}>
                    <Text>Already have an account?</Text>
                    <Link href="/Auth/login" style={RegisterStyles.link}>Login</Link>
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
