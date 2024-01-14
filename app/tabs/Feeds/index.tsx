import { PostType } from "../../../types";
import { useState } from "react";
import { VStack } from "native-base";
import CardSkeleton from "../../../components/CardSkeleton";

export default function SingleNewsPage() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  return (
    <VStack marginBottom="5" space={5} paddingY="2" >
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </VStack>
  );
}

