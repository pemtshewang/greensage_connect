import { Button, View, Text, Box, ScrollView } from "native-base";
import { LoginStyles } from "../../styles/styles";
import TextInputIcon from "../../components/TextInputIcon";
import { VStack } from "native-base";
import { Icons } from "../../assets/Icons/Icons";
import { Link } from "expo-router";
import { RegisterStyles } from "../../styles/styles";
import { LinearGradient } from "expo-linear-gradient";
import { Divider } from "native-base";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "../../validations/Auth/schema";
import { SignUpSchemaType } from "../../types";
import { Spinner } from "native-base";
import { SelectList } from "react-native-dropdown-select-list";
import { categories, subCategories } from "../../api/data/dzongkhag";
import OTPModal from "../../components/OTPmodal";
import OTPContext from "../../context/OTPContext";
import createToast from "../../hooks/toast";
function Register() {
  const [category, setCategory] = React.useState("");
  const [subcategory, setSubCategory] = React.useState("");
  const [loading, setLoading] = useState(false);
  const [isOTPModalVisible, setOTPModalVisible] = useState(false);
  const [id, setID] = useState("");
  const { toastMessage } = createToast();
  const handleSubmitButton = async (data: SignUpSchemaType) => {
    setLoading(true);
    const res = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}/api/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.username,
        password: data.password,
        mobile: `+975${data.phoneNumber}`,
        cid: data.idNumber,
        dzongkhag: data.dzongkhag,
        gewog: data.gewog
      }),
    });
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      setID(data?.id);
      setOTPModalVisible(true);
    } else {
      toastMessage({
        type: "error",
        message: "Registration Failed"
      });
    }
    setLoading(false);
  };
  const [data, handleData] = useState<{
    username: string;
    phoneNumber: string;
    idNumber: string;
    password: string;
    confirmPassword: string;
    dzongkhag: string;
    gewog: string;
  }>({
    username: "",
    phoneNumber: "",
    idNumber: "",
    password: "",
    confirmPassword: "",
    dzongkhag: "",
    gewog: "",
  });
  // Form Validation
  const {
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: { ...data },
    values: { ...data },
  });
  return (
    <OTPContext.Provider value={{ id, setID }}>
      <LinearGradient colors={["#228929", "#6A9"]} style={{
        flex: 1,
      }}>
        <OTPModal mobile={"+975" + data.phoneNumber} modalVisible={isOTPModalVisible} setModalVisible={setOTPModalVisible} />
        <VStack space={1} paddingX={10}  >
          <View mb="3" paddingTop="5">
            <Text fontSize="xl" style={{
              color: '#fff'
            }}>
              Register to GreenSage Connect
            </Text>
          </View>
          <View w="100%">
            <TextInputIcon
              type="text"
              placeholder="Pick your username"
              InputLeftElement={
                <Box style={LoginStyles.icon}>
                  <Icons.loginUser color="black" />
                </Box>
              }
              value={data.username}
              onChangeText={(text) => handleData({ ...data, username: text })}
            />
            <Text style={{ color: "#f55" }}>
              {errors.username?.message?.toString()}
            </Text>
          </View>
          <View w="100%">
            <TextInputIcon
              type="text"
              placeholder="Enter your phone number"
              InputLeftElement={
                <Box style={LoginStyles.icon}>
                  <Icons.phone color="black" />
                </Box>
              }
              keyboardType="numeric"
              maxLength={8}
              value={data.phoneNumber}
              onChangeText={(text) =>
                handleData({ ...data, phoneNumber: text })
              }
            />
            <Text style={{ color: "#f55" }}>
              {errors.phoneNumber?.message?.toString()}
            </Text>
          </View>
          <View w="100%">
            <TextInputIcon
              type="text"
              placeholder="Enter your Identity Card Number"
              InputLeftElement={
                <Box style={LoginStyles.icon}>
                  <Icons.bookUser color="black" />
                </Box>
              }
              value={data.idNumber}
              onChangeText={(text) => handleData({ ...data, idNumber: text })}
            />
            <Text style={{ color: "#f55" }}>
              {errors.idNumber?.message?.toString()}
            </Text>
          </View>
          <View w="100%">
            <SelectList
              boxStyles={{
                borderRadius: 3,
                borderWidth: 2,
                borderColor: "#000",
              }}
              searchPlaceholder={"Search Dzongkhag"}
              notFoundText={"Dzongkhag Not found"}
              inputStyles={{ color: `${category ? "#000" : "#A0A0A0"}` }}
              dropdownTextStyles={{ color: "#E5E5E5" }}
              setSelected={setCategory}
              onSelect={() => {
                handleData({ ...data, dzongkhag: category });
              }}
              data={categories}
              placeholder={"Select Dzongkhag"}
            />
            <Text style={{ color: "#f55" }}>
              {errors.dzongkhag?.message?.toString()}
            </Text>
          </View>
          <View w="100%">
            <SelectList
              boxStyles={{
                borderRadius: 3,
                borderWidth: 2,
                borderColor: "#000",
              }}
              searchPlaceholder={"Search Geog"}
              notFoundText={"Gewog Not found"}
              inputStyles={{ color: `${subcategory ? "#000" : "#A0A0A0"}` }}
              dropdownTextStyles={{ color: "#E5E5E5" }}
              onSelect={() => {
                handleData({
                  ...data,
                  gewog: subCategories[data.dzongkhag][subcategory].value,
                });
              }}
              setSelected={setSubCategory}
              data={subCategories[category]}
              placeholder={"Select Gewog"}
            />
            <Text style={{ color: "#f55" }}>
              {errors.gewog?.message?.toString()}
            </Text>
          </View>
          <View w="100%">
            <TextInputIcon
              type="password"
              placeholder="Pick a strong password"
              InputLeftElement={
                <Box style={LoginStyles.icon}>
                  <Icons.keyRound color="black" />
                </Box>
              }
              value={data.password}
              onChangeText={(text) => handleData({ ...data, password: text })}
            />
            <Text style={{ color: "#f55" }}>
              {errors.password?.message?.toString()}
            </Text>
          </View>
          <View w="100%">
            <TextInputIcon
              type="password"
              placeholder="Enter your password again"
              InputLeftElement={
                <Box style={LoginStyles.icon}>
                  <Icons.keyRound color="black" />
                </Box>
              }
              value={data.confirmPassword}
              onChangeText={(text) =>
                handleData({ ...data, confirmPassword: text })
              }
            />
            <Text style={{ color: "#f55" }}>
              {errors.confirmPassword?.message?.toString()}
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
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
              {loading ? (
                <Box flexDirection="row">
                  <Spinner
                    accessibilityLabel="Loading posts"
                    color="emerald.500"
                  />
                  <Text color="#fff">Registering</Text>
                </Box>
              ) : (
                <Text textAlign="center" color="#fff">
                  Register
                </Text>
              )}
            </Button>
          </View>
          <Divider width="70%" mx="auto" bgColor="black" />
          <View style={RegisterStyles.linkView}>
            <Text>Already have an account?</Text>
            <Link href="/Auth/login" style={RegisterStyles.link}>
              Login
            </Link>
          </View>
        </VStack>
      </LinearGradient>
    </OTPContext.Provider>
  );
}
export default Register;
