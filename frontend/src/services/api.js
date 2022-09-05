export const getStories = async () => {
  const response = await axios
    .get("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty")
    .then(({ data }) => data);
  const story_apis = response.map(
    (id) => `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
  );
  const stories = await axios.all(
    story_apis.map((endpoint) => axios.get(endpoint).then(({ data }) => data))
  );
};
