import { Button, View, Text, Box, Select, CheckIcon, ScrollView } from "native-base";
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
import { ChevronDownIcon } from "native-base";
import { SelectList } from 'react-native-dropdown-select-list'
import { color } from "native-base/lib/typescript/theme/styled-system";

function Register() {

    const [category, setCategory] = React.useState("");
    const [subcategory, setSubCategory] = React.useState("");
    const categories = [
        {key:'bumthang', value:'Bhumthang'},
        {key:'chhukha', value:'Chhukha'},
        {key:'dagana', value:'Dagana'},
        {key:'gasa', value:'Gasa'},
        {key:'haa', value:'Haa'},
        {key:'lhuentse', value:'Lhuentse'},
        {key:'mongar', value:'Mongar'},
        {key:'paro', value:'Paro'},
        {key:'pemagatshel', value:'Pema Gatshel'},
        {key:'punakha', value:'Punakha'},
        {key:'samdrupjongkhar', value:'Samdrup Jongkhar'},

        {key:'samtse', value:'Samtse'},
        {key:'sarpang', value:'Sarpang'},
        {key:'thimphu', value:'Thimphu'},
        {key:'trashigang', value:'Trashigang'},
        {key:'trashiyangtse', value:'Trashi Yangtse'},
        {key:'trongsa', value:'Trongsa'},
        {key:'tsirang', value:'Tsirang'},
        {key:'wangduephodrang', value:'Wangdue Phodrang'},
        {key:'zhemgang', value:'Zhemgang'},





    

        
    ]
    const subcategories = {
        'bumthang':[
        {key:'1', value:'Chhoekhor'},
        {key:'2', value:'chhume'},
        {key:'3', value:'Tang'},
        {key:'4', value:'Ura'},

        ],

        'chhukha':[
            {key:'6', value:'Bjachho'},
            {key:'7', value:'Bongo'},
            {key:'8', value:'Chapcha'},
            {key:'9', value:'Darla'},
            {key:'10', value:'Dungna'},
            {key:'11', value:'Geling'},
            {key:'18', value:'Getana'},
            {key:'19', value:'Lokchina'},
            {key:'20', value:'Metakha'},
            {key:'21', value:'Phuentsholing'},
            {key:'22', value:'Sampheling'},
        ],

        'dagana':[
            {key:'23', value:'Dorona'},
            {key:'24', value:'Drujegang'},
            {key:'25', value:'Gesarling'},
            {key:'26', value:'Goshi'},
            {key:'27', value:'Kana'},
            {key:'28', value:'Karmaling'},
            {key:'29', value:'Khebisa'},
            {key:'30', value:'Lajab'},
            {key:'31', value:'Lhamoi Zingkha'},
            {key:'32', value:'Nichula'},
            {key:'33', value:'Trashiding'},
            {key:'34', value:'Tsangkha'},
            {key:'35', value:'Tsendagang'},
            {key:'36', value:'Tseza'},

        ],

        'gasa':[
        {key:'37', value:'Khamaed'},
        {key:'38', value:'Khatoe'},
        {key:'39', value:'Laya'},
        {key:'40', value:'Lunana'},

        ],

        'haa':[
            {key:'41', value:'Bji'},
            {key:'42', value:'Gakiling'},
            {key:'43', value:'Katsho'},
            {key:'44', value:'Samar'},
            {key:'45', value:'Sangbay'},
            {key:'46', value:'Uesu'},
        ],


        'lhuentse':[
            {key:'47', value:'Gangzur'},
            {key:'48', value:'Khoma'},
            {key:'49', value:'Jarey'},
            {key:'50', value:'Kurtoed'},
            {key:'51', value:'Menbi'},
            {key:'52', value:'Metsho'},
            {key:'53', value:'Minjay'},
            {key:'54', value:'Tsenkhar'},
        ],

        'mongar':[
            {key:'55', value:'Balam'},
            {key:'56', value:'Chali'},
            {key:'57', value:'Chaskhar'},
            {key:'58', value:'Drametse'},
            {key:'59', value:'Drepong'},
            {key:'60', value:'Gongdue'},
            {key:'61', value:'Jurmey'},
            {key:'62', value:'Kengkhar'},
            {key:'63', value:'Mongar'},
            {key:'64', value:'Narang'},
            {key:'65', value:'Ngatshang'},
            {key:'66', value:'Saling'},
            {key:'67', value:'Shermuhoong'},
            {key:'68', value:'Silambi'},
            {key:'69', value:'Thangrong'},
            {key:'70', value:'Tsakaling'},
            {key:'71', value:'Tsamang'},
        ],

        'paro':[
            {key:'72', value:'Dokar'},
            {key:'73', value:'Dopshari'},
            {key:'74', value:'Doteng'},
            {key:'75', value:'Hungrel'},
            {key:'76', value:'Lamgong'},
            {key:'77', value:'Lungnyi'},
            {key:'78', value:'Naja'},
            {key:'79', value:'Shapa'},
            {key:'80', value:'Tsento'},
            {key:'81', value:'Wangchang'},
            
        ],

        'pemagatshel':[
            {key:'74', value:'Chimoong'},
            {key:'75', value:'Chokhorling'},
            {key:'76', value:'Chongshing'},
            {key:'77', value:'Dechheling'},
            {key:'78', value:'Dungmaed'},
            {key:'79', value:'Khar'},
            {key:'80', value:'Nanong'},
            {key:'81', value:'Norbugang'},
            {key:'82', value:'Shumar'},
            {key:'83', value:'Yurung'},
            {key:'84', value:'Zobel'},
   
        ],

        'punakha':[
            {key:'85', value:'Chhubug'},
            {key:'86', value:'Barp'},
            {key:'87', value:'Dzomi'},
            {key:'88', value:'Goenshari'},
            {key:'89', value:'Guma'},
            {key:'90', value:'Kabisa'},
            {key:'91', value:'Lingmukha'},
            {key:'92', value:'Shenga Bjemi'},
            {key:'93', value:'Talog'},
            {key:'94', value:'Toepisa'},
            {key:'95', value:'Toewang'},
   
        ],

        'samdrupjongkhar':[
            {key:'96', value:'Dewathang'},
            {key:'97', value:'Gomdar'},
            {key:'98', value:'Langchenphu'},
            {key:'99', value:'Lauri'},
            {key:'100', value:'Martshala'},
            {key:'101', value:'Orong'},
            {key:'102', value:'Pemathang'},
            {key:'103', value:'Phuntshothang'},
            {key:'104', value:'Samrang'},
            {key:'105', value:'Serthi'},
            {key:'106', value:'Wangphu'},
   
        ],

        'samtse':[
            {key:'107', value:'Dungtoe'},
            {key:'108', value:'Dophoogchen'},
            {key:'109', value:'Duenchukha'},
            {key:'110', value:'Namgaychhoeling'},
            {key:'111', value:'Norbugang'},
            {key:'112', value:'Norgaygang'},
            {key:'113', value:'Pemaling'},
            {key:'114', value:'Phuentshogpelri'},
            {key:'115', value:'Samtse'},
            {key:'116', value:'Sangngagchhoeling'},
            {key:'117', value:'Tading'},
            {key:'118', value:'Tashicholing'},
            {key:'119', value:'Tendruk'},
            {key:'120', value:'Ugentse'},
            {key:'121', value:'Yoeseltse'},
   
        ],

        'sarpang':[
            {key:'122', value:'Chhuzagang'},
            {key:'123', value:'Chhudzom'},
            {key:'124', value:'Dekiling'},
            {key:'125', value:'Gakiling'},
            {key:'126', value:'Gelephu'},
            {key:'127', value:'Jigmechholing'},
            {key:'128', value:'Samtenling'},
            {key:'129', value:'Senggey'},
            {key:'130', value:'Sherzhong'},
            {key:'131', value:'Shompangkha'},
            {key:'132', value:'Tareythang'},
            {key:'133', value:'Umling'},

            
        ],

        'thimphu':[
            {key:'134', value:'Chang'},
            {key:'135', value:'Darkala'},
            {key:'136', value:'Genye'},
            {key:'137', value:'Kawang'},
            {key:'138', value:'Lingzhi'},
            {key:'139', value:'Mewang'},
            {key:'140', value:'Naro'},
            {key:'141', value:'Soe'},  
            
        ],

        'trashigang':[
            {key:'142', value:'Bartsham'},
            {key:'143', value:'Bidung'},
            {key:'144', value:'Kanglung'},
            {key:'145', value:'Kangpar'},
            {key:'146', value:'Khaling'},
            {key:'147', value:'Lumang'},
            {key:'148', value:'Merag'},
            {key:'149', value:'Phongmed'},
            {key:'150', value:'Radi'},
            {key:'151', value:'Sagteng'},
            {key:'152', value:'Samkhar'},
            {key:'153', value:'Shongphoog'},
            {key:'154', value:'Thrimshing'},
            {key:'155', value:'Uzorong'},
            {key:'156', value:'Yangnyer'},

            
        ],

        'trashiyangtse':[
            {key:'157', value:'Bumdeling'},
            {key:'158', value:'Jamkhar'},
            {key:'159', value:'Khamdang'},
            {key:'160', value:'Ramjar'},
            {key:'161', value:'Toetsho'},
            {key:'162', value:'Tomzhang'},
            {key:'163', value:'Yalang'},
            {key:'164', value:'Yangtse'},  
            
        ],

        'trongsa':[
            {key:'165', value:'Dragteng'},
            {key:'166', value:'Korphoog'},
            {key:'167', value:'Langthil'},
            {key:'168', value:'Nubi'},
            {key:'169', value:'Tangsibji'},
            
        ],

        'tsirang':[
            {key:'170', value:'Barshong'},
            {key:'171', value:'Dunglegang'},
            {key:'172', value:'Gosarling'},
            {key:'173', value:'Kikhorthang'},
            {key:'174', value:'Mendrelgang'},
            {key:'175', value:'Patshaling'},
            {key:'176', value:'Phuntenchu'},
            {key:'177', value:'Rangthangling'},
            {key:'178', value:'Semjong'},
            {key:'179', value:'Sergithang'},
            {key:'180', value:'Tsholingkhar'},
            {key:'181', value:'Tsirangtoe'},  
              
            
        ],

        'wangduephodrang':[
            {key:'182', value:'Athang'},
            {key:'183', value:'Bjendag'},
            {key:'184', value:'Darkar'},
            {key:'185', value:'Dangchu'},
            {key:'186', value:'Gangteng'},
            {key:'187', value:'Gasetsho Gom'},
            {key:'188', value:'Gasetsho Wom'},
            {key:'189', value:'Kazhi'},
            {key:'190', value:'Nahi'},
            {key:'191', value:'Nyisho'},
            {key:'192', value:'Phangyul'},
            {key:'193', value:'Phobji'},
            {key:'194', value:'Ruepisa'},
            {key:'195', value:'Sephu'},
            {key:'196', value:'Thedtsho'},  
                
                
        ],

        'zhemgang':[
            {key:'197', value:'Bardo'},
            {key:'198', value:'Bjoka'},
            {key:'199', value:'Goshing'},
            {key:'200', value:'Nangkor'},
            {key:'201', value:'Ngangla'},
            {key:'202', value:'Phangkhar'},
            {key:'203', value:'Shingkhar'},
            {key:'204', value:'Trong'},
              
              
            
        ],




    }

    const [loading, setLoading] = useState(false);
    const handleSubmitButton = (data: SignUpSchemaType) => {
        setLoading(true);
    }
    const [data, handleData] = useState<SignUpSchemaType>({
        username: "",
        phoneNumber: "",
        idNumber: "",
        password: "",
        confirmPassword: ""
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

    function setService(itemValue: string): void {
        throw new Error("Function not implemented.");
    }

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
                {/* <View>
                    <VStack paddingBottom={5}>
                        <Box maxW='100%' >
                            <Select borderWidth={2} borderColor={'#000'} minWidth="100%" accessibilityLabel="Choose Service" placeholder="Choose Dzongkhag" _selectedItem={{
                                bg: "teal.600",
                                endIcon: < CheckIcon size="5" />
                            }} mt={1} onValueChange={itemValue => setService(itemValue)}>
                                <Select.Item label="UX Research" value="ux" />
                                <Select.Item label="Web Development" value="web" />
                                <Select.Item label="Cross Platform Development" value="cross" />
                                <Select.Item label="UI Designing" value="ui" />
                                <Select.Item label="Backend Development" value="backend" />
                            </Select>
                        </Box>
                    </VStack>

                </View> */}
                
                <View width="100%" style={RegisterStyles.selecStyle}>
                    
                    <SelectList
                        searchPlaceholder={"Search Dzongkhag"}
                        notFoundText={"Dzongkhag Not found"}
                        inputStyles={{color:'#E5E5E5'}}
                        dropdownTextStyles={{color:'#E5E5E5'}}
                        setSelected={setCategory}
                        data={categories}
                        placeholder={"Select Dzongkhag" }
                        // defaultOption={{key:'Select', value:'Tashigang'}}
                    />
                    

                </View>
                <View width="100%" marginTop={4} marginBottom={4} style={RegisterStyles.selecStyle}>
                    <SelectList
                        searchPlaceholder={"Search Geog"}
                        notFoundText={"Geog Not found"} 
                        inputStyles={{color:'#E5E5E5'}}
                        dropdownTextStyles={{color:'#E5E5E5'}}
                        setSelected={setSubCategory}
                        data={subcategories[category]}
                        placeholder={"Select Geog"}
                        // defaultOption={}
                    />

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
                        type='confirm_password'
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
