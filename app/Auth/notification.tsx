
import { FlatList } from "native-base";
import { notification } from "../../styles/styles";
import { Image } from "native-base";
import { View } from "native-base";
const Notification=() => {
    const data = [
        {
            id:'50',
            post_title: 'Low Temperature',
            Postimage: './assets/temperature.jpg',            
            Time: '9:00',
        },
        {
            id:'51',
            post_title: 'Low Humidity',
            Postimage: '../Auth/assets/Humidity.jpg',            
            Time: '9:00',
        },
        {
            id:'50',
            post_title: 'Low Temperature',
            Postimage: '../Auth/assets/temperature.jpg',            
            Time: '9:00',
        },
        {
            id:'50',
            post_title: 'Low Temperature',
            Postimage: './assets/temperature.jpg',            
            Time: '9:00',
        },
        {
            id:'51',
            post_title: 'Low Humidity',
            Postimage: '../Auth/assets/Humidity.jpg',            
            Time: '9:00',
        },
        {
            id:'50',
            post_title: 'Low Temperature',
            Postimage: '../Auth/app/assets/Humidity.jpg',            
            Time: '9:00',
        },

 
    ]
    return (
        <View>
            <FlatList 
            data={data} 
            keyExtractor={(_item, index) => {
                return index.toString();
            }}
            renderItem={({item})=>{
                return (
                
                <View style = {notification.itemstyle}>
                    <View style={notification.imageView}>
                        <Image 
                            alt="image"
                            style={notification.imagestyle} 
                            source={{uri:item.Postimage}}
                            size= {64}
                        />
                    </View>
                </View>
                );
            } }
            />
                 
        </View>

    );

};
export default Notification;

