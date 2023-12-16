
import { FlatList } from "native-base";
import { notification } from "../../styles/styles";
import { View, Text, Image, ScrollView } from "react-native";
import { Icons } from "../../assets/Icons/Icons";
import { router } from "expo-router";
import { Pressable } from "react-native";
import { Link } from "native-base";

const Notification=() => {
    const data = [
        {
            id:'50',
            greenhousename: 'Greenhouse 1',
            post_title: 'Low Temperature',
            postimage: require('../../assets/temperature.jpg'),            
            Time: '9:00',
        },
        {
            id:'50',
            greenhousename: 'Greenhouse 1',
            post_title: 'Low Humidity',
            postimage: require('../../assets/Humidity.jpg'),            
            Time: '9:00',
        },
        {
            id:'50',
            greenhousename: 'Greenhouse 2',
            post_title: 'Low Temperature',
            postimage: require('../../assets/temperature.jpg'),            
            Time: '9:00',
        },
        {
            id:'50',
            greenhousename: 'Greenhouse 2',
            post_title: 'Low Huniduty',
            postimage: require('../../assets/Humidity.jpg'),            
            Time: '9:00',
        },
        {
            id:'50',
            greenhousename: 'Greenhouse 3',
            post_title: 'Low Temperature',
            postimage: require('../../assets/temperature.jpg'),            
            Time: '9:00',
        },
        {
            id:'50',
            greenhousename: 'Greenhouse 3',
            post_title: 'Low Humidity',
            postimage: require('../../assets/Humidity.jpg'),            
            Time: '9:00',
        },
        {
            id:'50',
            greenhousename: 'Greenhouse 3',
            post_title: 'Low Temperature',
            postimage: require('../../assets/temperature.jpg'),            
            Time: '9:00',
        },
        {
            id:'50',
            greenhousename: 'Greenhouse 3',
            post_title: 'Low Humidity',
            postimage: require('../../assets/Humidity.jpg'),            
            Time: '9:00',
        }
    
       
 
    ]
    return (
        <View >
             
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems:'center', alignSelf:'center'}}>
                <View>
                    <Text   style = { notification.testStyle}>
                        Notifications
                    </Text> 
                </View>
                <View>
                    <Icons.contentNotification
                    color={"black"}
                    style={{paddingTop:75, marginRight:60}}
                />
                </View>
                <View >
                    <Link href="../Profile">
                        <Icons.profile
                        color={"black"}

                    />
                    </Link>
                    
                </View>
                
                

            </View>
           
            
            <FlatList 
            data={data} 
            keyExtractor={(_item, index) => {
                return index.toString();
            }}
            
            renderItem={({item})=>{
                return (
                    <ScrollView>
                        <View  style = {notification.itemstyle} >
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                <View style={notification.imageView}>
                                <Image 
                                    accessibilityLabel="image"
                                    style={notification.imagestyle} 
                                    // source={require('../../assets/temperature.jpg')}

                                    source={item.postimage}
                                />
                            </View>
                            <View style={{ flexDirection:'row',marginLeft:10 }}>
                                <View>
                                    <Text style={{color:'#000',fontWeight:'bold', fontSize:23}}>
                                        {item.greenhousename}
                                    </Text>
                                    <Text style={{color:'#000', fontSize:17}}>
                                        {item.post_title}
                                    </Text>
                                    <Text style={{fontSize:15, color:'red'}} >
                                        {item.Time}
                                    </Text>
                                </View>
                            </View>

                            </View>
                    
                        
                        </View>
                    </ScrollView>
                
               
                );
            } }
            />
                 
        </View>

    );

};
export default Notification;

