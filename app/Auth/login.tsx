import { VStack } from 'native-base';
import { Image } from 'native-base';
import { View } from 'native-base';
import { LoginStyles, RegisterStyles } from '../../styles/styles';
import { Text } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import TextInputIcon from '../../components/TextInputIcon';
import { Icons } from '../../assets/Icons/Icons';
import { Button } from 'native-base';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Spinner } from 'native-base';
import { Divider } from 'native-base';
import { useForm } from 'react-hook-form';
import { LoginSchemaType } from '../../types';
import { LoginSchema } from '../../validations/Auth/schema';
import zodResolver from "@hookform/resolvers/zod"
import { Box } from 'native-base';
import { useRouter } from 'expo-router';

function Login() {
    const [credentials, setCredentials] = useState<LoginSchemaType>({
        username: 'rootuser',
        password: 'rootpassword'
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const handleSubmitButton = (data: LoginSchemaType) => {
        if (data.username == credentials.username && data.password == credentials.password) {
            setTimeout(() => {
                setLoading(true);
                router.replace("/tabs")
            }, 2000);
        }
        setLoading(false);
    }
    // Form Validation
    const [data, handleData] = useState<LoginSchemaType>({
        username: "",
        password: ""
    });
    const {
        handleSubmit,
        formState: { errors },
    } = useForm<LoginSchemaType>({
        resolver: zodResolver.zodResolver(LoginSchema),
        defaultValues: { ...data },
        values: { ...data }
    });
    //
    return (
        <LinearGradient
            colors={["#228B29", "#6A9"]}
            style={LoginStyles.container}
        >
            <VStack space={3} alignItems="start">
                <View>
                    <Image
                        backgroundColor="#fff"
                        borderBottomRadius={100}
                        width="container"
                        height="290"
                        source={require('../../assets/logo.png')}
                        alt="image" />
                </View>
                <View>
                    <Text fontSize="xl" style={LoginStyles.heading}>GreenSage Connect Login</Text>
                </View>
                <View>
                    <TextInputIcon
                        type='text'
                        placeholder="Username/Phone Number"
                        w="80%"
                        value={data.username}
                        InputLeftElement={<Box style={LoginStyles.icon}><Icons.loginUser color='black' /></Box>}
                        onChangeText={(text: string) => handleData({ ...data, username: text })}
                    />
                    <Text style={{ color: "#f77" }} textAlign="center">
                        {errors.username?.message?.toString()}
                    </Text>
                </View>
                <View>
                    <TextInputIcon
                        type='password'
                        placeholder="Password"
                        w="80%"
                        InputLeftElement={<Box style={LoginStyles.icon}><Icons.loginLock color='black' /></Box>}
                        value={data.password}
                        onChangeText={(text: string) => handleData({ ...data, password: text })}
                    />
                    <Text style={{ color: "#f77" }} textAlign="center">
                        {errors.password?.message?.toString()}
                    </Text>
                </View>
                <View style={{
                    alignItems: "center",
                    paddingTop: 10
                }}>
                    <Button
                        style={RegisterStyles.button}
                        backgroundColor="#228B29"
                        // pressed animation
                        _pressed={{
                            backgroundColor: "#6A9",
                            _text: {
                                color: "black",
                            },
                        }}
                        disabled={loading}
                        onPress={handleSubmit(handleSubmitButton)}
                    >
                        {loading && <Spinner accessibilityLabel="Loading posts" color="emerald.500" />}
                        {loading ? 'Signing in' : 'Login'}
                    </Button>
                </View>
                <Divider width="70%" mx="auto" bgColor="black" />
                <View style={LoginStyles.linkView}>
                    <Text>Don't have an account?</Text>
                    <Link href="/Auth/register" style={LoginStyles.link}>Register</Link>
                </View>
            </VStack>
        </LinearGradient >
    );
}
export default Login;
