import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import config from './firebaseConfig';

const firebaseApp = initializeApp({
    apiKey: config.api_key,
    authDomain: config.auth_domain,
    projectId: config.project_id,
    storageBucket: config.storage_bucket,
    messagingSenderId: config.message_sender_id,
    appId: config.app_id,
    measurementId: config.measurement_id
});

const auth = getAuth(firebaseApp);

export default auth;
