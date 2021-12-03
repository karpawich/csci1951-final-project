import { initializeApp } from "@firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, list, processItems, processPrefixes } from "@firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjRD3joAiTqKmzik78XAqwblshtZ5-fts",
  authDomain: "triplemisw.firebaseapp.com",
  projectId: "triplemisw",
  storageBucket: "triplemisw.appspot.com",
  messagingSenderId: "801413721622",
  appId: "1:801413721622:web:a01b7ddabf3ee8ead2cf37"
};
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

/**
 * Uploads any file inputted from an html input
 * @param file the file must be an individual file, not the whole array
 * @param setProgress the hook to update the progress state variable
 * @param userId the user id from which the file comes
 * @returns the url of the upload or NULL on failure
 */
export const uploadFile = (file, setProgress, userId) => {
  return new Promise((resolve, reject) => {
     // make storage ref based on user
    const storageRef = ref(storage, `uploaded/${userId}/${file.name}`);

    // start the upload
    const task = uploadBytesResumable(storageRef, file)

    // track progress
    task.on('state_changed', snapshot => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      // set progress state from component
      setProgress(progress);
    }, error => {
      console.error('Error uploading file in firebaseStorage.ts');
      // null on fail
      setProgress(0);
      reject(error);
    }, async () => {
      // get the download url :)
      const downloadUrl = await getDownloadURL(task.snapshot.ref);
      setProgress(0);
      resolve(downloadUrl);
    })
  })
}