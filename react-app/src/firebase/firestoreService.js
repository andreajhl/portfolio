import firebase from "./init";

const database = firebase.firestore();

export const getDocuments = async (collectionPath) => {
  try {
    const { docs } = await database
      .collection(collectionPath)
      .where("deleted", "==", null)
      .get();
    return docs.map((doc) => doc.data());
  } catch (error) {
    console.error(error);
  }
};

export const getPostsFromCelebrity = async (
  collectionPath,
  celebrityId,
  limit = 2
) => {
  try {
    const { docs } = await database
      .collection(collectionPath)
      .where("celebrityId", "==", celebrityId)
      .where("deleted", "==", null)
      .orderBy("created", "desc")
      .limit(limit)
      .get();
    return docs.map((doc) => doc.data());
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getLastVisibleDocument = (docs) => docs[docs.length - 1];

const firstQueryHandler = async (collectionPath, celebrityId) =>
  await database
    .collection(collectionPath)
    .where("celebrityId", "==", celebrityId)
    .where("deleted", "==", null)
    .orderBy("created", "desc")
    .limit(2)
    .get();

const paginateQueryHandler = async (collectionPath, celebrityId, indexFilter) =>
  await database
    .collection(collectionPath)
    .where("celebrityId", "==", celebrityId)
    .where("deleted", "==", null)
    .orderBy("created", "desc")
    .limit(2)
    .startAfter(indexFilter)
    .get();

export const getPostFromCelebrity = async (
  collectionPath,
  celebrityId,
  indexFilter,
  handlerUpdateFilterRange,
  isFirstQuery,
  handlerUpdateHasMorePost
) => {
  try {
    let results = [];
    if (isFirstQuery) {
      const { docs } = await firstQueryHandler(collectionPath, celebrityId);
      if (docs.length === 0) {
        handlerUpdateHasMorePost(false);
        return;
      }
      // Get the last visible document
      const lastVisible = getLastVisibleDocument(docs);
      handlerUpdateFilterRange(lastVisible);
      results = docs.map((doc) => doc.data());
    } else {
      const { docs } = await paginateQueryHandler(
        collectionPath,
        celebrityId,
        indexFilter
      );
      if (docs.length === 0) {
        handlerUpdateHasMorePost(false);
        return;
      }
      // Get the last visible document
      const lastVisible = getLastVisibleDocument(docs);
      handlerUpdateFilterRange(lastVisible);
      results = docs.map((doc) => doc.data());
    }
    return results;
  } catch (error) {
    console.error(error);
  }
};
