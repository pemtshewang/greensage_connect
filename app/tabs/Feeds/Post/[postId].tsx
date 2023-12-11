import { View } from "native-base";
import NewsContainer from "../../../../components/NewsContainer";
import { data } from "../../../../api/dummy";
import { useLocalSearchParams } from "expo-router";
import { Text } from "native-base";

const PostDetail = () => {
  const { postId } = useLocalSearchParams();
  const post = data.find((post) => post.id === postId);
  return (
    <View paddingX="0">
      <Text>
        You are viewing {postId?.toString()}
      </Text>
    </View>
  );
}
export default PostDetail; 
