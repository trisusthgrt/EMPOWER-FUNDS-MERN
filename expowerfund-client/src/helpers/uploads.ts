import { ref, getStorage, uploadBytes, getDownloadURL } from "firebase/storage";
import firebaseApp from "../config/firebase-config";

export const uploadFilesToFirebaseAndReturnUrls = async (files: any[]) => {
  try {
    const storageRef = ref(getStorage(firebaseApp), "images");

    const uploadedFilesRefs = await Promise.all(
      files.map((file) => {
        const fileRef = ref(storageRef, file.name);
        return uploadBytes(fileRef, file);
      })
    );

    const urls = await Promise.all(
      uploadedFilesRefs.map((fileRef: any) => getDownloadURL(fileRef.ref))
    );

    return urls;
  } catch (error: any) {
    throw new Error(error);
  }
};


// import { ref, getStorage, uploadBytes, getDownloadURL } from "firebase/storage";
// import firebaseApp from "../config/firebase-config";

// export const uploadFilesToFirebaseAndReturnUrls = async (files: File[]) => {
//   try {
//     // Change "images" to "videos" to store videos in the "videos" folder
//     const storageRef = ref(getStorage(firebaseApp), "videos");

//     const uploadedFilesRefs = await Promise.all(
//       files.map((file) => {
//         const fileRef = ref(storageRef, file.name);
//         return uploadBytes(fileRef, file);
//       })
//     );

//     const urls = await Promise.all(
//       uploadedFilesRefs.map((fileRef: any) => getDownloadURL(fileRef.ref))
//     );

//     return urls;
//   } catch (error: any) {
//     throw new Error(error);
//   }
// };
