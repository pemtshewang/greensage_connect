import { PostType } from "../../../types";
import { useState } from "react";
import { View } from "native-base";
import App from "../../../components/Dashboard/temp_humid";

export default function SingleNewsPage() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const data = [
    {
      index: 1,
      greenhouse1: 0,
      greenhouse2: 0
    },
    {
      index: 2,
      greenhouse1: 1,
      greenhouse2: 2
    },
    {
      index: 3,
      greenhouse1: 2,
      greenhouse2: 5
    },
    {
      index: 4,
      greenhouse1: 8,
      greenhouse2: 3
    }
  ]
  return (
    <View  >
      <App data={data} />
    </View>
  );
}

