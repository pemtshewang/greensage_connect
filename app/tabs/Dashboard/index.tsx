import { PostType } from "../../../types";
import { useState, useEffect } from "react";
import NewsContainer from "../../../components/NewsContainer";
import { View } from "native-base";
import { Spinner } from "native-base";

export default function SingleNewsPage() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  return (
    <View paddingX="0" >
    </View>
  );
}

