import axios from "axios";
const BASE_URL =
  "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40mariagabriela-28371";

export const getPost = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data.items.map(({ description, ...post }) => {
      const [, descriptionContent] = new RegExp("<p>(.*?)</p>").exec(
        description
      );
      const cleanDescriptionText = descriptionContent.replace(
        /<\/?[^>]+(>|$)/g,
        ""
      );
      return {
        ...post,
        description: cleanDescriptionText
      };
    });
  } catch (error) {
    console.log(error);
  }
};
