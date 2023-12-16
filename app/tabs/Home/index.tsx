import { View,Heading } from "native-base"
import GreenhouseNavContainer from "../../../components/GreehouseNavContainer";

const IndexPage =() =>{
    return(
        <View style={{
            padding: 10
        }}>
            <Heading>Available Greenhouses</Heading>
            <GreenhouseNavContainer id={1} imageUrl="../assets/logo.png"/>
        </View>
    )
}
export default IndexPage;