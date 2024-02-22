import { Button, View, Text, Box, VStack, HStack, Checkbox, Divider, Spinner, ScrollView, } from "native-base";
import { RegisterStyles } from "../../styles/styles";
import React, { useState } from "react";
import createToast from "../../hooks/toast";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import OTPContext from "../../context/OTPContext";
import { LoginStyles } from "../../styles/styles";
import { SignUpSchema } from "../../validations/Auth/schema";
import { SignUpSchemaType } from "../../types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import OTPModal from "../../components/OTPmodal";
import TextInputIcon from "../../components/TextInputIcon";
import Icons from "../../assets/Icons/Icons";
import { categories, subCategories } from "../../api/data/dzongkhag";
import { SelectList } from "react-native-dropdown-select-list";
import getLocation from "../../utils/getlocation";
import { Pressable } from "react-native";
import { TCModal } from "../../components/TermsAndCondition";

function Register() {
  const [category, setCategory] = React.useState("");
  const [locationPermission, setLocationPermission] = useState(false);
  const [subcategory, setSubCategory] = React.useState("");
  const [loading, setLoading] = useState(false);
  const [isOTPModalVisible, setOTPModalVisible] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false); //
  const [otp, setOtp] = useState<number>();
  const [id, setID] = useState("");
  const [tcFormVisible, settcFormVisible] = useState(false);
  const [location, setLocation] = useState<{
    latitude: string,
    longitude: string
  } | null>(null);
  const { toastMessage } = createToast();
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

  const handleSubmitButton = async (data: SignUpSchemaType) => {
    setLoading(true);
    if (locationPermission) {
      const location = await getLocation();
      setLocation({
        longitude: location?.coords.longitude.toString() as string,
        latitude: location?.coords.latitude.toString() as string,
      });
    }
    const res = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}/api/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.username,
        password: data.password,
        mobile: `${data.phoneNumber}`,
        cid: data.idNumber,
        dzongkhag: data.dzongkhag,
        gewog: data.gewog,
        location: location
      }),
    });
    if (res.ok) {
      const data = await res.json();
      setID(data?.id);
      setOtp(data?.code);
      setOTPModalVisible(true);
    } else {
      toastMessage({
        type: "error",
        message: "Registration Failed"
      });
    }
    setLoading(false);
  };

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
      <LinearGradient colors={["#228929", "#6A9"]} style={{ flex: 1 }}>
        <OTPModal mobile={data.phoneNumber} otp={Number(otp)} modalVisible={isOTPModalVisible} setModalVisible={setOTPModalVisible} />
        <ScrollView>
          <VStack space={1} paddingX={10}>
            <View mb="3" paddingTop="5">
              <Text textAlign="center" fontSize="xl" style={{ color: '#fff' }}>
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
            <VStack space={3}>
              <HStack space={6}>
                <Checkbox
                  shadow={2}
                  value="test"
                  _checked={{ bg: "green.500" }}
                  accessibilityLabel="tc checkbox"
                  isChecked={termsAccepted}
                  onChange={() => setTermsAccepted(!termsAccepted)}
                >
                  I accept the <Pressable onPress={() => settcFormVisible(true)}><Text underline color="white">terms & conditions</Text></Pressable>
                </Checkbox>
              </HStack>
              <HStack space={6}>
                <Checkbox
                  shadow={2}
                  value="locationPermission"
                  accessibilityLabel="location"
                  _checked={{ bg: "green.500" }}
                  isChecked={locationPermission}
                  onChange={() => {
                    setLocationPermission(!locationPermission);
                  }}
                >
                  Provide location for admin analytics
                </Checkbox>
              </HStack>
            </VStack>
            <View style={{ alignItems: "center" }}>
              <Button
                style={RegisterStyles.button}
                backgroundColor={(loading || !termsAccepted) ? "#a0a0a0" : "#228B29"}
                // pressed animation
                _pressed={{
                  backgroundColor: "#6A9",
                  _text: {
                    color: "black",
                  },
                }}
                disabled={loading || !termsAccepted}
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
                  (loading || !termsAccepted) ? (
                    <>
                      <Icons.banIcon color="#fff" />
                    </>
                  ) :
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
        </ScrollView>
        <TCModal modalVisible={tcFormVisible} setModalVisible={settcFormVisible} />
      </LinearGradient>
    </OTPContext.Provider>
  );
}
export default Register;
