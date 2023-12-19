import { View, Text,Button } from "native-base";
import { useGreenhouseStore } from "../zustand/store";

const HomeView = () => {
    const store = useGreenhouseStore();
    return(
        <View>
            <Button onPress={
                () =>{
                    store.addGreenhouse({
                        id: "1",
                        name: "Greenhouse 1",
                        ipAddress: "",
                        backgroundImage: "",
                        isConnected: false,
                        temperature: 0,
                        humidity: 0
                    });
            }}>
                Add dummy 
            </Button>
        </View>
    )
}

export default HomeView;
