import { View,Text } from "native-base";
import { ActivityIndicator } from "react-native";


export default function AnimatedSpinner({message}:{
    message:string
}){
    return <View flex="1" alignItems="center" justifyContent="center">
        <ActivityIndicator 
        accessibilityRole="progressbar"
        accessibilityLabel="spinner"
        size="large"/>
        <Text marginTop="10" color="gray.500" style={{
            fontFamily: "OpenSans"
        }}>{message}</Text>
    </View>
}