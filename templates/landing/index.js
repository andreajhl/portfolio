const {
  readFilePromisified,
  replaceTemplateContent,
  getContentFromElements
} = require("../utils");

const {
  CELEBRITY_CARD_TEMPLATE_PATH,
  CELEBRITIES_DATA_PATH,
  CONTRACT_VIDEO_TEMPLATE_PATH,
  CONTRACTS_VIDEOS_DATA_PATH,
  LANDING_PAGE_TEMPLATE_PATH
} = require("../paths");

const getCelebritiesCards = async () => {
  const celebrityCardTemplate = await readFilePromisified(
    CELEBRITY_CARD_TEMPLATE_PATH
  );
  const celebritiesJSON = await readFilePromisified(CELEBRITIES_DATA_PATH);
  const celebritiesData = JSON.parse(celebritiesJSON);
  return getContentFromElements(celebritiesData, celebrityCardTemplate);
};

const getContractsVideos = async () => {
  const contractVideoTemplate = await readFilePromisified(
    CONTRACT_VIDEO_TEMPLATE_PATH
  );
  const contractsVideosJSON = await readFilePromisified(
    CONTRACTS_VIDEOS_DATA_PATH
  );
  const contractsVideosData = JSON.parse(contractsVideosJSON);
  const birthdayVideos = getContentFromElements(
    contractsVideosData.birthday,
    contractVideoTemplate
  );
  const inspirationVideos = getContentFromElements(
    contractsVideosData.inspiration,
    contractVideoTemplate
  );
  return { birthdayVideos, inspirationVideos };
};

module.exports = async () => {
  const landingPage = await readFilePromisified(LANDING_PAGE_TEMPLATE_PATH);
  const celebritiesCards = await getCelebritiesCards();
  const { birthdayVideos, inspirationVideos } = await getContractsVideos();
  return landingPage
    .replace("{{DATA_CELEBRITIES_CARDS}}", celebritiesCards)
    .replace("{{DATA_VIDEOS_LIST_BIRTHDAYS}}", birthdayVideos)
    .replace("{{DATA_VIDEOS_LIST_INSPIRATION}}", inspirationVideos);
};
