const {
  NEXT_PUBLIC_FIREBASE_API_KEY,
  NEXT_PUBLIC_FIREBASE_APP_ID,
  NEXT_PUBLIC_FIREBASE_PROJECT_ID
} = process.env;

const apiKey = NEXT_PUBLIC_FIREBASE_API_KEY || "";
const appId = NEXT_PUBLIC_FIREBASE_APP_ID || "";
const projectId = NEXT_PUBLIC_FIREBASE_PROJECT_ID || "";

const config = {
  apiKey,
  projectId,
  appId,
  authDomain: `${projectId}.firebaseapp.com`,
  databaseURL: `https://${projectId}.firebaseio.com/`,
  storageBucket: `gs://${projectId}.appspot.com`
};

export default config;
