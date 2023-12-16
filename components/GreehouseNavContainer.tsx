import { Pressable } from "react-native"
import { View, Image } from "native-base"

const GreenhouseNavContainer = ({ id, imageUrl }: {
    id: number,
    imageUrl: string
}) => {
    return (
        <Pressable key={id}>
            <View>
                <Image
                    source={{ uri: "../assets/logo.png" }}
                    width="container"
                    alt="image"
                />
            </View>
        </Pressable>
    )
}
export default GreenhouseNavContainer;
