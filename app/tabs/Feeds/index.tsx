import React, { useState, useEffect, useContext } from "react";
import { VStack } from "native-base";
import { RefreshControl } from "react-native";
import CardSkeleton from "../../../components/CardSkeleton";
import { getValueFor } from "../../../securestore";
import createToast from "../../../hooks/toast";
import NewsContainer from "../../../components/NewsContainer";
import { PostType } from "../../../types";
import NewsFeedContext from "../../../context/NewsFeedContext";

async function getPosts() {
  const value = JSON.parse(await getValueFor("token") as string);
  const token = value?.accessToken?.token;
  const response = await fetch("http://192.168.0.143:3000/api/feeds", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  return false;
}

export default function NewsFeedPage() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { toastMessage } = createToast();
  const { newsFeed, setNewsFeed } = useContext(NewsFeedContext);

  const fetchData = async () => {
    setRefreshing(true);
    const data = await getPosts();
    setRefreshing(false);

    if (data) {
      setPosts([...data]);
      setNewsFeed([...data]);
    } else {
      toastMessage({
        type: "error",
        message: "Error while fetching the news feed",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [posts]);

  return (
    <VStack marginBottom="5" space={5} paddingY="2">
      <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
      {loading ? (
        <>
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </>
      ) : (
        posts.map((post, index) => (
          <NewsContainer
            key={index}
            id={post.id}
            title={post.title}
            content={post.content}
            createdAt={post.createdAt}
            image={post.image}
            author={post.author}
          />
        ))
      )}
    </VStack>
  );
}

