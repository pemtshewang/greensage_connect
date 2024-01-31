import { createContext } from "react";
import { PostType } from "../types";

const NewsFeedContext = createContext<{
  newsFeed: PostType[];
  setNewsFeed: React.Dispatch<React.SetStateAction<PostType[]>>;
}>({
  newsFeed: [],
  setNewsFeed: () => { },
});

export default NewsFeedContext;
