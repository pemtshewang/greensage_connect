import {
  Button,
  View,
  Text,
  Box,
  VStack,
  HStack,
  Checkbox,
  Divider,
  ScrollView,
} from "native-base";
import { RegisterStyles } from "../../styles/styles";
import React, { useState } from "react";
import createToast from "../../hooks/toast";
import { Link, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { LoginStyles } from "../../styles/styles";
import { SignUpSchema } from "../../validations/Auth/schema";
import { SignUpSchemaType } from "../../types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInputIcon from "../../components/TextInputIcon";
import Icons from "../../assets/Icons/Icons";
import { categories, subCategories } from "../../api/data/dzongkhag";
import { SelectList } from "react-native-dropdown-select-list";
import getLocation from "../../utils/getlocation";
import { ActivityIndicator, Pressable } from "react-native";
import { TCModal } from "../../components/TermsAndCondition";
import RegistrantForm from "../../components/Forms/RegistrantForm";
import RegistrantIdContext from "../../context/RegistrantIdContext";

function Register() {
  const [registered, setIsRegistered] = useState<boolean>(false);
  const [registrantId, setRegistrantId] = useState<String | null>(null);
  const [category, setCategory] = React.useState("");
  const [locationPermission, setLocationPermission] = useState(false);
  const [subcategory, setSubCategory] = React.useState("");
  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false); //
  const [id, setID] = useState("");
  const router = useRouter();
  const [tcFormVisible, settcFormVisible] = useState(false);
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
    const formData = new FormData();
    if (locationPermission) {
      const location = await getLocation();
      formData.append("lat", location?.lat as string);
      formData.append("long", location?.long as string);
    }
    formData.append("username",data.username)
    formData.append("password", data.password);
    formData.append("mobile", data.phoneNumber);
    formData.append("cid", data.idNumber);
    formData.append("dzongkhag", data.dzongkhag);
    formData.append("gewog", data.gewog);
    try {
      const res = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}/api/user`, {
        //@ts-ignore
        headers: {
          registrantId: registrantId,
        },
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        toastMessage({
          type: "success",
          message: "Account Registration Successful, You may now login",
          duration: 2000,
        });
        setTimeout(() => {
          router.replace("/Auth/login");
        }, 1000);
      } else {
        const data = await res.json();
        toastMessage({
          type: "error",
          message: data?.message,
        });
      }
    } catch (err) {
      setLoading(false);
      toastMessage({
        type: "error",
        message: "Registration Failed, Try Submitting Again",
      });
    } finally {
      setLoading(false);
    }
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
    <LinearGradient colors={["#228929", "#6A4"]} style={{ flex: 1 }}>
      <RegistrantIdContext.Provider value={{ registrantId, setRegistrantId }}>
        {!registered ? (
          <RegistrantForm
            setIsRegistered={setIsRegistered}
          />
        ) : (
          <>
            <ScrollView>
              <VStack space={1} paddingX={10}>
                <View mb="3" paddingTop="5">
                  <Text
                    fontFamily="OpenSans"
                    textAlign="center"
                    fontSize="xl"
                    bold
                    style={{ color: "#fff" }}
                  >
                    Register to GreenSage Connect
                  </Text>
                </View>
                <View w="100%">
                  <TextInputIcon
                    // @ts-ignore
                    type="text"
                    placeholder="Pick your username"
                    InputLeftElement={
                      <Box style={LoginStyles.icon}>
                        <Icons.loginUser color="black" />
                      </Box>
                    }
                    value={data.username}
                    // @ts-ignore
                    onChangeText={(text) =>
                      handleData({ ...data, username: text })
                    }
                  />
                  <Text style={{ color: "#f55" }}>
                    {errors.username?.message?.toString()}
                  </Text>
                </View>
                <View w="100%">
                  <TextInputIcon
                    // @ts-ignore
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
                    // @ts-ignore
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
                    // @ts-ignore
                    type="text"
                    placeholder="Enter your Identity Card Number"
                    InputLeftElement={
                      <Box style={LoginStyles.icon}>
                        <Icons.bookUser color="black" />
                      </Box>
                    }
                    value={data.idNumber}
                    // @ts-ignore
                    onChangeText={(text) =>
                      handleData({ ...data, idNumber: text })
                    }
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
                    fontFamily="OpenSans"
                    searchPlaceholder={"Search Dzongkhag"}
                    notFoundText={"Dzongkhag Not found"}
                    inputStyles={{ color: `${category ? "#000" : "#f5efdf"}` }}
                    dropdownTextStyles={{ color: "#E5E5E5" }}
                    setSelected={setCategory}
                    onSelect={() => {
                      handleData({ ...data, dzongkhag: category });
                    }}
                    data={categories}
                    placeholder={"Select Dzongkhag"}
                    save="value"
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
                    dropdownStyles={{
                      borderColor: "black",
                    }}
                    searchPlaceholder={"Search Geog"}
                    notFoundText={"Gewog Not found"}
                    inputStyles={{
                      color: `${subcategory ? "#000" : "#f5efdf"}`,
                    }}
                    data={subCategories[category]}
                    dropdownTextStyles={{ color: "#E5E5E5" }}
                    // @ts-ignore
                    setSelected={(val) => {
                      setSubCategory(val);
                      handleData({
                        ...data,
                        gewog: val,
                      });
                    }}
                    save="value"
                    // onSelect={() => {
                    //   handleData({
                    //     ...data,
                    //     gewog: subCategories[category][subcategory],
                    //   });
                    // }}
                    placeholder={"Select Gewog"}
                  />
                  <Text style={{ color: "#f55" }}>
                    {errors.gewog?.message?.toString()}
                  </Text>
                </View>
                <View w="100%">
                  <TextInputIcon
                    // @ts-ignore
                    type="password"
                    placeholder="Pick a strong password"
                    InputLeftElement={
                      <Box style={LoginStyles.icon}>
                        <Icons.keyRound color="black" />
                      </Box>
                    }
                    value={data.password}
                    // @ts-ignore
                    onChangeText={(text) =>
                      handleData({ ...data, password: text })
                    }
                  />
                  <Text style={{ color: "#f55" }}>
                    {errors.password?.message?.toString()}
                  </Text>
                </View>
                <View w="100%">
                  <TextInputIcon
                    // @ts-ignore
                    type="password"
                    placeholder="Enter your password again"
                    InputLeftElement={
                      <Box style={LoginStyles.icon}>
                        <Icons.keyRound color="black" />
                      </Box>
                    }
                    value={data.confirmPassword}
                    // @ts-ignore
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
                      <Text fontFamily="OpenSans" fontSize={15}>
                        I accept the
                      </Text>
                      <Pressable onPress={() => settcFormVisible(true)}>
                        <Text
                          fontSize={15}
                          underline
                          fontFamily="OpenSans"
                          color="white"
                        >
                          terms & conditions
                        </Text>
                      </Pressable>
                    </Checkbox>
                  </HStack>
                  <HStack space={6}>
                    <Checkbox
                      fontFamily="OpenSans"
                      shadow={2}
                      value="locationPermission"
                      accessibilityLabel="location"
                      _checked={{ bg: "green.500" }}
                      isChecked={locationPermission}
                      onChange={() => {
                        setLocationPermission(!locationPermission);
                      }}
                    >
                      <Text fontSize={15} fontFamily="OpenSans">
                        Provide location for admin analytics
                      </Text>
                    </Checkbox>
                  </HStack>
                </VStack>
                <View style={{ alignItems: "center" }} marginY="5">
                  <Button
                    style={RegisterStyles.button}
                    backgroundColor={
                      loading || !termsAccepted ? "#a0a0a0" : "#228B29"
                    }
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
                      <Box flexDirection="row" justifyContent="center">
                        <ActivityIndicator color="white" />
                      </Box>
                    ) : loading || !termsAccepted ? (
                      <>
                        <Icons.banIcon color="#fff" />
                      </>
                    ) : (
                      <Text textAlign="center" color="#fff">
                        Register
                      </Text>
                    )}
                  </Button>
                </View>
                <Divider width="70%" mx="auto" bgColor="black" />
                <View style={RegisterStyles.linkView}>
                  <Text fontSize={15} fontFamily="OpenSans">
                    Already have an account?
                  </Text>
                  <Link href="/Auth/login" style={RegisterStyles.link}>
                    <Text
                      color="#fff"
                      fontWeight="800"
                      letterSpacing={1}
                      fontSize={15}
                      fontFamily="OpenSans"
                    >
                      Login
                    </Text>
                  </Link>
                </View>
              </VStack>
            </ScrollView>
            <TCModal
              modalVisible={tcFormVisible}
              setModalVisible={settcFormVisible}
            />
          </>
        )}
      </RegistrantIdContext.Provider>
    </LinearGradient>
  );
}
export default Register;
