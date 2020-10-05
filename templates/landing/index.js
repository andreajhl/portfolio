const {
  readFileSync,
  readFilePromisified,
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
  const birthday = getContentFromElements(
    contractsVideosData.birthday,
    contractVideoTemplate
  );
  const inspiration = getContentFromElements(
    contractsVideosData.inspiration,
    contractVideoTemplate
  );
  const love = getContentFromElements(
    contractsVideosData.love,
    contractVideoTemplate
  );
  const comedy = getContentFromElements(
    contractsVideosData.comedy,
    contractVideoTemplate
  );
  return { birthday, inspiration, love, comedy };
};

const getLandingPage = async () => {
  const landingPage = await readFilePromisified(LANDING_PAGE_TEMPLATE_PATH);
  const celebritiesCards = await getCelebritiesCards();
  const contractVideos = await getContractsVideos();
  return landingPage
    .replace("{{DATA_CELEBRITIES_CARDS}}", celebritiesCards)
    .replace("{{DATA_VIDEOS_LIST_BIRTHDAYS}}", contractVideos.birthday)
    .replace("{{DATA_VIDEOS_LIST_INSPIRATION}}", contractVideos.inspiration)
    .replace("{{DATA_VIDEOS_LIST_LOVE}}", contractVideos.love)
    .replace("{{DATA_VIDEOS_LIST_COMEDY}}", contractVideos.comedy);
};

const getCelebritiesCardsSync = () => {
  const celebrityCardTemplate = readFileSync(CELEBRITY_CARD_TEMPLATE_PATH);
  const celebritiesJSON = readFileSync(CELEBRITIES_DATA_PATH);
  const celebritiesData = JSON.parse(celebritiesJSON);
  return getContentFromElements(celebritiesData, celebrityCardTemplate);
};

const getContractsVideosSync = () => {
  const contractVideoTemplate = readFileSync(CONTRACT_VIDEO_TEMPLATE_PATH);
  const contractsVideosJSON = readFileSync(CONTRACTS_VIDEOS_DATA_PATH);
  const contractsVideosData = JSON.parse(contractsVideosJSON);
  const birthday = getContentFromElements(
    contractsVideosData.birthday,
    contractVideoTemplate
  );
  const inspiration = getContentFromElements(
    contractsVideosData.inspiration,
    contractVideoTemplate
  );
  const love = getContentFromElements(
    contractsVideosData.love,
    contractVideoTemplate
  );
  const comedy = getContentFromElements(
    contractsVideosData.comedy,
    contractVideoTemplate
  );
  return { birthday, inspiration, love, comedy };
};

const getLandingPageSync = () => {
  const landingPage = readFileSync(LANDING_PAGE_TEMPLATE_PATH);
  const celebritiesCards = getCelebritiesCardsSync();
  const contractVideos = getContractsVideosSync();
  return landingPage
    .replace("{{DATA_CELEBRITIES_CARDS}}", celebritiesCards)
    .replace("{{DATA_VIDEOS_LIST_BIRTHDAYS}}", contractVideos.birthday)
    .replace("{{DATA_VIDEOS_LIST_INSPIRATION}}", contractVideos.inspiration)
    .replace("{{DATA_VIDEOS_LIST_LOVE}}", contractVideos.love)
    .replace("{{DATA_VIDEOS_LIST_COMEDY}}", contractVideos.comedy);
};

module.exports = {
  getLandingPageSync,
  getLandingPage
};
