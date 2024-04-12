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

const signIn = async (data: LoginSchemaType) => {
  data.username = data.username.trim();
  data.password = data.password.trim();
  const res = await fetch(
    `${process.env.EXPO_PUBLIC_BASE_URL}/api/auth/user/signin`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-store",
    },
  );
  if (res.ok) {
    const result = await res.json();
    return result;
  }
  return null;
};

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
    <LinearGradient colors={["#228B29", "#6A9"]} style={LoginStyles.container}>
      <VStack flex={1} space={3} alignItems="start">
        <View
          bg="white"
          padding="3"
          flexDirection="row-reverse"
          justifyContent="center"
          borderBottomRadius={99}
        >
          <Image
            marginLeft="6"
            alt="image"
            width={280}
            height={280}
            source={require("../../assets/logo.png")}
          />
        </View>
        <View>
          <Text
            fontSize="xl"
            fontWeight="extraBlack"
            style={LoginStyles.heading}
          >
            GreenSage Connect Login
          </Text>
        </View>
        <View marginTop="6">
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
          <Text style={{ color: "#f22" }} textAlign="center">
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
          <Text style={{ color: "#f22" }} textAlign="center">
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
            fontFamily="OpenSans"
            disabled={loading}
            onPress={handleSubmit(handleSubmitButton)}
          >
            {loading ? (
              <Spinner color="white" />
            ) : (
              <Text
                color="white"
                fontFamily="OpenSans"
                letterSpacing={1}
                fontWeight="300"
              >
                Login
              </Text>
            )}
          </Button>
        </View>
        <Divider width="70%" mx="auto" bgColor="black" marginY="4" />
        <View style={LoginStyles.linkView}>
          <Text
            style={{
              fontFamily: "OpenSans",
              fontSize: 15,
            }}
          >
            Don't have an account?
          </Text>
          <Link href="/Auth/register" style={LoginStyles.link}>
            Register
          </Link>
        </View>
        <View
          marginBottom={5}
          flexDirection="column-reverse"
          alignItems="center"
          flex={1}
        >
          <Text fontFamily="OpenSans" fontSize={11} color="coolGray.700">
            Greensage Connect @{new Date().getFullYear()}
          </Text>
        </View>
      </VStack>
    </LinearGradient>
  );
}
export default Login;
