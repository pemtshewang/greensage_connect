import { Button, View, Text, Box, ScrollView } from "native-base";
import { LoginStyles } from "../../styles/styles";
import TextInputIcon from "../../components/TextInputIcon";
import { VStack } from 'native-base';
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
import { SelectList } from 'react-native-dropdown-select-list'
import { categories, subCategories } from "../../api/data/dzongkhag";

function Register() {

    const [category, setCategory] = React.useState("");
    const [subcategory, setSubCategory] = React.useState("");

    const [loading, setLoading] = useState(false);
    const handleSubmitButton = (data: SignUpSchemaType) => {
        setLoading(true);
    }
    const [data, handleData] = useState<SignUpSchemaType>({
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
        values: { ...data }
    });

    return (
        <LinearGradient
            colors={["#228B29", "#6A9"]}
            style={LoginStyles.container}
        >
            <ScrollView>
                <VStack space={2} alignItems="center" paddingX={10}>
                    <View mb="5">
                        <Text fontSize="xl" style={LoginStyles.heading} >Register to GreenSage Connect</Text>
                    </View>
                    <View w="100%">
                        <TextInputIcon
                            type='text'
                            placeholder="Pick your username"
                            InputLeftElement={<Box style={LoginStyles.icon}><Icons.loginUser color='black' /></Box>}
                            value={data.username}
                            onChangeText={(text) => handleData({ ...data, username: text })}
                        />
                        <Text style={{ color: "#f77" }} >
                            {errors.username?.message?.toString()}
                        </Text>
                    </View>
                    <View w="100%">
                        <TextInputIcon
                            type='text'
                            placeholder="Enter your phone number"
                            InputLeftElement={<Box style={LoginStyles.icon}><Icons.phone color='black' /></Box>}
                            keyboardType="numeric"
                            maxLength={8}
                            value={data.phoneNumber}
                            onChangeText={(text) => handleData({ ...data, phoneNumber: text })}
                        />
                        <Text style={{ color: "#f77" }}>
                            {errors.phoneNumber?.message?.toString()}
                        </Text>
                    </View>
                    <View w="100%">
                        <TextInputIcon
                            type='text'
                            placeholder="Enter your Identity Card Number"
                            InputLeftElement={<Box style={LoginStyles.icon}><Icons.bookUser color='black' /></Box>}
                            value={data.idNumber}
                            onChangeText={(text) => handleData({ ...data, idNumber: text })}
                        />
                        <Text style={{ color: "#f77" }}>
                            {errors.idNumber?.message?.toString()}
                        </Text>
                    </View>
                    <View w="100%">
                        <SelectList
                            boxStyles={{
                                borderRadius: 3,
                                borderWidth: 2,
                                borderColor: "#000"
                            }}
                            searchPlaceholder={"Search Dzongkhag"}
                            notFoundText={"Dzongkhag Not found"}
                            inputStyles={{ color: `${category ? "#000" : "#A0A0A0"}` }}
                            dropdownTextStyles={{ color: '#E5E5E5' }}
                            setSelected={setCategory}
                            onSelect={
                                () => {
                                    handleData({ ...data, dzongkhag: category })
                                }
                            }
                            data={categories}
                            placeholder={"Select Dzongkhag"}
                        />
                        <Text style={{ color: "#f77" }}>
                            {errors.dzongkhag?.message?.toString()}
                        </Text>
                    </View>
                    <View w="100%">
                        <SelectList
                            boxStyles={{
                                borderRadius: 3,
                                borderWidth: 2,
                                borderColor: "#000"
                            }}
                            searchPlaceholder={"Search Geog"}
                            notFoundText={"Geog Not found"}
                            inputStyles={{ color: `${subcategory ? "#000" : "#A0A0A0"}` }}
                            dropdownTextStyles={{ color: '#E5E5E5' }}
                            onSelect={
                                () => {
                                    handleData({ ...data, gewog: subcategory })
                                }
                            }
                            setSelected={setSubCategory}
                            data={subCategories[category]}
                            placeholder={"Select Gewog"}
                        />
                        <Text style={{ color: "#f77" }}>
                            {errors.gewog?.message?.toString()}
                        </Text>
                    </View>
                    <View w="100%">
                        <TextInputIcon
                            type='password'
                            placeholder="Pick a strong password"
                            InputLeftElement={<Box style={LoginStyles.icon}><Icons.keyRound color='black' /></Box>}
                            value={data.password}
                            onChangeText={(text) => handleData({ ...data, password: text })}
                        />
                        <Text style={{ color: "#f77" }}>
                            {errors.password?.message?.toString()}
                        </Text>
                    </View>
                    <View w="100%">
                        <TextInputIcon
                            type='password'
                            placeholder="Enter your password again"
                            InputLeftElement={<Box style={LoginStyles.icon}><Icons.keyRound color='black' /></Box>}
                            value={data.confirmPassword}
                            onChangeText={(text) => handleData({ ...data, confirmPassword: text })}
                        />
                        <Text style={{ color: "#f77" }} >
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
                            {loading && <Spinner accessibilityLabel="Loading posts" color="emerald.500" />}
                            {loading ? 'Signing up' : 'Register'}
                        </Button>
                    </View>
                    <Divider width="70%" mx="auto" bgColor="black" />
                    <View style={RegisterStyles.linkView}>
                        <Text>Already have an account?</Text>
                        <Link href="/Auth/login" style={RegisterStyles.link}>Login</Link>
                    </View>
                </VStack>

            </ScrollView>

        </LinearGradient>
    );
}
export default Register;
