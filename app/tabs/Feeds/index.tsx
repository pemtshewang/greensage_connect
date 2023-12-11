import { PostType } from "../../../types";
import { useState, useEffect } from "react";
import NewsContainer from "../../../components/NewsContainer";
import { View } from "native-base";
import { getPosts } from "../../../api/dummy";
import { Spinner } from "native-base";

export default function SingleNewsPage() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getPosts().then((data: PostType) => {
      setPosts(data);
      setLoading(false);
    });
  }, []);
  return (
    <View paddingX="0" >
      {
        loading ? <Spinner color="black" /> : (
          posts.map((post) => {
            return (
              <NewsContainer {...post} key={post.id} />
            )
          })
        )
      }
    </View>
  );
}

