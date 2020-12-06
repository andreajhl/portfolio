import axios from "axios";
const BASE_URL =
  // "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40mariagabriela-28371";
  "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40mariagabriela-28371&api_key=gwz20im2peo6p2vpmuo61welkwowi6jzltm2dhnq";


export const getPost = async () => {
  try {
    const response = await axios.get(BASE_URL);
    response.data.items = response.data.items.filter(el => el.categories.length > 4);
    return response.data.items;
  } catch (error) {
    console.log(error, 'Error');
  }
};
