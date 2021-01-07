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
export const getPostFromCelebrity = async (collectionPath,celebrityId) => {
  try {
    const { docs } = await database.collection(collectionPath).where('celebrityId','==',celebrityId).where('deleted','==',null).get();
    return docs.map((doc) => doc.data());
  } catch (error) {
    console.error(error);
  }
};
