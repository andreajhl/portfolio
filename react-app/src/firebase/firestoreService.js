import firebase from "./init";

const database = firebase.firestore();

export const getDocuments = async (collectionPath) => {
  try {
    const querySnapshot = await database.collection(collectionPath).get();
    return querySnapshot;
  } catch (error) {
    console.error(error);
  }
};
