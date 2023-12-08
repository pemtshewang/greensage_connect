import type { PostType } from "../../types";
import { useState, useEffect } from "react";
import NewsContainer from "../../components/NewsContainer";
import { View } from "native-base";
import { getPosts } from "../../api/dummy";

export default function SingleNewsPage() {
  const [posts, setPosts] = useState<PostType[]>([]);
  useEffect(() => {
    getPosts().then((data: PostType) => {
      setPosts(data);
    });
  }, []);
  return (
    <View>
      {
        posts.map((post) => {
          return (
            <NewsContainer {...post} key={post.id} />
          )
        })
      }
    </View>
  );
}

