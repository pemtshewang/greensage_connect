import { VStack } from "native-base";
import { Image } from "native-base";
import { View } from "native-base";
import { LoginStyles, RegisterStyles } from "../../styles/styles";
import { Text } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import TextInputIcon from "../../components/TextInputIcon";
import { Icons } from "../../assets/Icons/Icons";
import { Button } from "native-base";
import { Link } from "expo-router";
import { useState } from "react";
import { Spinner } from "native-base";
import { Divider } from "native-base";
import { useForm } from "react-hook-form";
import { LoginSchemaType } from "../../types";
import { LoginSchema } from "../../validations/Auth/schema";
import zodResolver from "@hookform/resolvers/zod";
import { Box } from "native-base";
import { useRouter } from "expo-router";
import createToast from "../../hooks/toast";
import { save } from "../../securestore";
import { getValueFor } from "../../securestore";

const signIn = async (data: LoginSchemaType) => {
  data.username = data.username.trim();
  data.password = data.password.trim();
  const res = await fetch("http://192.168.0.143:3000/api/auth/user/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  if (res.ok) {
    const data = await res.json();
    return data;
  }
  return false;
}

function Login() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toastMessage } = createToast();
  const handleSubmitButton = async (data: LoginSchemaType) => {
    setLoading(true);
    try {
      const res = await signIn(data);
      if (res) {
        toastMessage({
          type: "success",
          message: "Login Successful",
        });
        save("token", JSON.stringify(res));
        setTimeout(() => {
          setLoading(false);
          router.push("/tabs/Home");
        }, 1000);
      } else {
        setLoading(false);
        toastMessage({
          type: "error",
          message: "Invalid Username or Password",
        });
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      toastMessage({
        type: "error",
        message: "Something went wrong",
      });
    }
  };
  // Form Validation
  const [data, handleData] = useState<LoginSchemaType>({
    username: "",
    password: "",
  });
  const {
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver.zodResolver(LoginSchema),
    defaultValues: { ...data },
    values: { ...data },
  });
  //
  return (
    <LinearGradient colors={["#228B29", "#6A9"]} style={LoginStyles.container} >
      <VStack space={3} alignItems="start">
        <View bg="white" padding="1" alignItems="center" borderBottomRadius={50}>
          <Image
            style={{
              width: 300,
              height: 280,
            }}
            alt="image"
            source={require("../../assets/logo.png")}
          />
        </View>
        <View>
          <Text fontSize="xl" style={LoginStyles.heading}>
            GreenSage Connect Login
          </Text>
        </View>
        <View>
          <TextInputIcon
            type="text"
            placeholder="Username/Phone Number"
            w="80%"
            value={data.username}
            InputLeftElement={
              <Box style={LoginStyles.icon}>
                <Icons.loginUser color="black" />
              </Box>
            }
            onChangeText={(text: string) =>
              handleData({ ...data, username: text })
            }
          />
          <Text style={{ color: "#f77" }} textAlign="center">
            {errors.username?.message?.toString()}
          </Text>
        </View>
        <View>
          <TextInputIcon
            type="password"
            placeholder="Password"
            w="80%"
            InputLeftElement={
              <Box style={LoginStyles.icon}>
                <Icons.loginLock color="black" />
              </Box>
            }
            value={data.password}
            onChangeText={(text: string) =>
              handleData({ ...data, password: text })
            }
          />
          <Text style={{ color: "#f77" }} textAlign="center">
            {errors.password?.message?.toString()}
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
            paddingTop: 10,
          }}
        >
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
            {loading && <Spinner color="white" />}
            {loading ? "Signing in" : "Login"}
          </Button>
        </View>
        <Divider width="70%" mx="auto" bgColor="black" />
        <View style={LoginStyles.linkView}>
          <Text>Don't have an account?</Text>
          <Link href="/Auth/register" style={LoginStyles.link}>
            Register
          </Link>
        </View>
      </VStack>
    </LinearGradient >
  );
}
export default Login;
