import firebase from "./init";

const database = firebase.firestore();

export const getDocuments = async (collectionPath) => {
  try {
    const { docs } = await database.collection(collectionPath).where('celebrityId','==',1448).get();
    return docs.map((doc) => doc.data());
  } catch (error) {
    console.error(error);
  }
};
