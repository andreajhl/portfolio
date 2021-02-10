import axios from "axios";

const BASE_URL =
  "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@famosos&api_key=gwz20im2peo6p2vpmuo61welkwowi6jzltm2dhnq";

export const getPost = async () => {
  try {
    const response = await axios.get(BASE_URL);
    response.data.items = response.data.items.filter(
      (el) => el.categories.length > 4
    );
    return response.data.items.map(({ description, ...post }) => {
      const [, descriptionContent] = new RegExp("<p>(.*?)</p>").exec(
        description
      );

      return {
        ...post,
        description: descriptionContent
      };
    });
  } catch (error) {
    console.log(error);
    return [];
  }
};
