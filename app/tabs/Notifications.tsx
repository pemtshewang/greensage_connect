
import { FlatList } from "native-base";
import { notification } from "../../styles/styles";
import { Image } from "native-base";
import { View, Text } from "native-base";
const Notification=() => {
    const data = [
        {
            id:'50',
            post_title: 'Low Temperature',
            Postimage: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fedcprofessionalhomeinspections.com%2Fwp-content%2Fuploads%2F2023%2F03%2Fhow-to-lower-humidity-in-your-house.jpg&tbnid=cUXmmDRQb4vNBM&vet=12ahUKEwjIgrHMzoaDAxVNmmMGHZiOBxQQMygwegUIARDZAQ..i&imgrefurl=https%3A%2F%2Fedcprofessionalhomeinspections.com%2Fblog%2Fhow-to-lower-humidity-in-your-house%2F&docid=p3DJd-hCV9zQmM&w=2000&h=1400&q=Humidity%20pic&ved=2ahUKEwjIgrHMzoaDAxVNmmMGHZiOBxQQMygwegUIARDZAQ',            
            Time: '9:00',
        },
        {
            id:'50',
            post_title: 'Low Temperature',
            Postimage: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fedcprofessionalhomeinspections.com%2Fwp-content%2Fuploads%2F2023%2F03%2Fhow-to-lower-humidity-in-your-house.jpg&tbnid=cUXmmDRQb4vNBM&vet=12ahUKEwjIgrHMzoaDAxVNmmMGHZiOBxQQMygwegUIARDZAQ..i&imgrefurl=https%3A%2F%2Fedcprofessionalhomeinspections.com%2Fblog%2Fhow-to-lower-humidity-in-your-house%2F&docid=p3DJd-hCV9zQmM&w=2000&h=1400&q=Humidity%20pic&ved=2ahUKEwjIgrHMzoaDAxVNmmMGHZiOBxQQMygwegUIARDZAQ',            
            Time: '9:00',
        },
        {
            id:'50',
            post_title: 'Low Temperature',
            Postimage: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fedcprofessionalhomeinspections.com%2Fwp-content%2Fuploads%2F2023%2F03%2Fhow-to-lower-humidity-in-your-house.jpg&tbnid=cUXmmDRQb4vNBM&vet=12ahUKEwjIgrHMzoaDAxVNmmMGHZiOBxQQMygwegUIARDZAQ..i&imgrefurl=https%3A%2F%2Fedcprofessionalhomeinspections.com%2Fblog%2Fhow-to-lower-humidity-in-your-house%2F&docid=p3DJd-hCV9zQmM&w=2000&h=1400&q=Humidity%20pic&ved=2ahUKEwjIgrHMzoaDAxVNmmMGHZiOBxQQMygwegUIARDZAQ',            
            Time: '9:00',
        },
        {
            id:'50',
            post_title: 'Low Temperature',
            Postimage: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fedcprofessionalhomeinspections.com%2Fwp-content%2Fuploads%2F2023%2F03%2Fhow-to-lower-humidity-in-your-house.jpg&tbnid=cUXmmDRQb4vNBM&vet=12ahUKEwjIgrHMzoaDAxVNmmMGHZiOBxQQMygwegUIARDZAQ..i&imgrefurl=https%3A%2F%2Fedcprofessionalhomeinspections.com%2Fblog%2Fhow-to-lower-humidity-in-your-house%2F&docid=p3DJd-hCV9zQmM&w=2000&h=1400&q=Humidity%20pic&ved=2ahUKEwjIgrHMzoaDAxVNmmMGHZiOBxQQMygwegUIARDZAQ',            
            Time: '9:00',
        },
        {
            id:'50',
            post_title: 'Low Temperature',
            Postimage: '../../assets/temperature.jpg',            
            Time: '9:00',
        },
       
 
    ]
    return (
        <View>
          <Text   style = { notification.testStyle}>
              Notification
          </Text>
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
                            source={require(item.Postimage)}
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

