import { View } from "native-base";
import NewsContainer from "../../../../components/NewsContainer";
import { useLocalSearchParams } from "expo-router";
import { Text } from "native-base";

const PostDetail = () => {
  const { postId } = useLocalSearchParams();
  return (
    <View paddingX="0">
      <Text>
        You are viewing {postId?.toString()}
      </Text>
    </View>
  );
}
export default PostDetail; 
