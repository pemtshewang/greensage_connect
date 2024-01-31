import { View } from "native-base";
import { useLocalSearchParams } from "expo-router";
import { useContext } from "react";
import NewsFeedContext from "../../../../context/NewsFeedContext";
import NewsFeedDetail from "../../../../components/NewsFeedDetail";

const PostDetail = () => {
  const { postId } = useLocalSearchParams();
  const { newsFeed, setNewsFeed } = useContext(NewsFeedContext);
  const targetNews = newsFeed.find((news) => news.id === postId);
  return (
    <View paddingX="0">
      <NewsFeedDetail {...targetNews} />
    </View>
  );
}
export default PostDetail; 
