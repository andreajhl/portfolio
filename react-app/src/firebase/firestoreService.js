import { filter } from "compression";
import firebase from "./init";

const database = firebase.firestore();

export const getDocuments = async (collectionPath) => {
  try {
    const { docs } = await database.collection(collectionPath).where('deleted','==',null).get();
    return docs.map((doc) => doc.data());
  } catch (error) {
    console.error(error);
  }
};

const getLastVisibleDocument = (docs) => docs[docs.length - 1];

const firstQueryHandler = async (collectionPath, celebrityId) => await database
.collection(collectionPath)
.where('celebrityId', '==', celebrityId)
.where('deleted', '==', null)
.orderBy('created', 'desc')
.limit(2)
.get();

const paginateQueryHandler = async (collectionPath, celebrityId, filterRange) =>
  await database
    .collection(collectionPath)
    .where('celebrityId', '==', celebrityId)
    .where('deleted', '==', null)
    .orderBy('created', 'desc')
    .limit(2)
    .startAfter(filterRange)
    .get();

export const getPostFromCelebrity = async (
  collectionPath,
  celebrityId,
  filterRange,
  handlerUpdateFilterRange,
  firstQuery
) => {
  try {
    let results = [];
    if(firstQuery){
      const { docs } = await firstQueryHandler(collectionPath, celebrityId);
        // Get the last visible document
        const lastVisible = getLastVisibleDocument(docs);
        handlerUpdateFilterRange(lastVisible);
        results = docs.map((doc) => doc.data());
    }else{
      const { docs } = await paginateQueryHandler(
        collectionPath,
        celebrityId,
        filterRange
      );
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
