import axios from "axios";

const getStories = async () => {
  const response = await axios
    .get("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty")
    .then(({ data }) => data);
  const story_apis = response.map(
    (id) => `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
  );
  // console.log(story_apis);
  return story_apis;
};

const displayStories = async (story_apis, currentStoriesLength) => {
  const newStoriesApis = story_apis.slice(
    currentStoriesLength - 1,
    currentStoriesLength + 11
  );
  const stories = await axios.all(
    story_apis.map((endpoint) => axios.get(endpoint).then(({ data }) => data))
  );
};

export { getStories, displayStories };
