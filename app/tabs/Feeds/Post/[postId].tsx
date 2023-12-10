import { View } from "native-base";
import { useLocalSearchParams } from "expo-router";
import { data } from "../../../../api/dummy";
import NewsContainer from "../../../../components/NewsContainer";

export default function Post() {
  const { postId } = useLocalSearchParams<{ postId: string }>();
  const post = data.find((post) => post.id === postId);
  return (
    <View>
      <NewsContainer {...post} />
    </View>
  );
}
