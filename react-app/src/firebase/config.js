const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "";
const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "";
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "";

const config = {
  apiKey,
  projectId,
  appId,
  authDomain: `${projectId}.firebaseapp.com`,
  databaseURL: `https://${projectId}.firebaseio.com/`,
  storageBucket: `gs://${projectId}.appspot.com`
};

export default config;
