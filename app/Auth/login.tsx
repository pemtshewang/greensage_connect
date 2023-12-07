import { VStack } from 'native-base';
import { Image } from 'native-base';
import { View } from 'native-base';
import { LoginStyles } from '../../styles/styles';
import { Text } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import TextInputIcon from '../../components/TextInputIcon';
import { Icons } from '../../assets/Icons/Icons';
import { Button } from 'native-base';
import { Link } from 'expo-router';

function Login() {
    return (
        <LinearGradient
            colors={["#228B29", "#6A9"]}
            style={LoginStyles.container}
        >
            <VStack space={4} alignItems="start">
                <View>
                    <Image source={require('../../assets/registerback.png')} alt="image" />
                </View>
                <View>
                    <Text fontSize="xl" style={LoginStyles.heading}>GreenSage Connect Login</Text>
                </View>
                <View>
                    <TextInputIcon
                        type='text'
                        placeholder="Username/Phone Number"
                        width="80%"
                        icon={<Icons.loginUser color='black' />}
                    />
                </View>
                <View>
                    <TextInputIcon
                        type='password'
                        placeholder="Password"
                        width="80%"
                        icon={<Icons.loginLock color='black' />}
                    />
                </View>
                <View style={{
                    alignItems: "center"
                }}>
                    <Button style={LoginStyles.button}>
                        Login
                    </Button>
                </View>
                <View style={LoginStyles.linkView}>
                    <Text>Don't have an account?</Text>
                    <Link href="/Auth/register" style={LoginStyles.link}>Register</Link>
                </View>
            </VStack>
        </LinearGradient>
    );
}
export default Login;
