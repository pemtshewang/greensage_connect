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
import { useState } from 'react';
import { Spinner } from 'native-base';
import { FormControl } from 'native-base';
import { Divider } from 'native-base';
import { useForm } from 'react-hook-form';
import { LoginSchemaType } from '../../types';
import { LoginSchema } from '../../validations/Auth/schema';
import zodResolver from "@hookform/resolvers/zod"

function Login() {
    const [loading, setLoading] = useState(false);
    const handleSubmitButton = (data: LoginSchemaType) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }
    // Form Validation
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginSchemaType>({
        resolver: zodResolver.zodResolver(LoginSchema)
    });
    //
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
                <FormControl isRequired
                    style={LoginStyles.inputField}>
                    <View>
                        <TextInputIcon
                            type='text'
                            placeholder="Username/Phone Number"
                            width="80%"
                            icon={<Icons.loginUser color='black' />}
                            {...register("username", { required: true })}
                        />
                        {errors.username?.message}
                    </View>
                    <View>
                        <TextInputIcon
                            type='password'
                            placeholder="Password"
                            width="80%"
                            icon={<Icons.loginLock color='black' />}
                            {...register("password", { required: true })}
                        />
                        <FormControl.ErrorMessage
                            startIcon={<Icons.database color='black' />}
                        >
                            {errors.password?.message}
                        </FormControl.ErrorMessage>
                    </View>
                    <View style={{
                        alignItems: "center",
                        paddingTop: 10
                    }}>
                        <Button
                            style={LoginStyles.button}
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
                </FormControl>
                <Divider width="70%" mx="auto" bgColor="black" />
                <View style={LoginStyles.linkView}>
                    <Text>Don't have an account?</Text>
                    <Link href="/Auth/register" style={LoginStyles.link}>Register</Link>
                </View>
            </VStack>
        </LinearGradient>
    );
}
export default Login;
