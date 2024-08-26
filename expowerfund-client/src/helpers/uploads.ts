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

    const urlsforuse = await Promise.all(
      uploadedFilesRefs.map((fileRef: any) => getDownloadURL(fileRef.ref))
    );

    return urlsforuse;
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


/*
The selected code is an asynchronous function named `uploadFilesToFirebaseAndReturnUrls` that uploads files to Firebase Storage and returns their download URLs. It uses the Firebase Storage SDK for TypeScript.

Here's a breakdown of the code:

1. Import necessary functions and the Firebase app configuration from the respective modules.

```typescript
import { ref, getStorage, uploadBytes, getDownloadURL } from "firebase/storage";
import firebaseApp from "../config/firebase-config";
```

2. Define the `uploadFilesToFirebaseAndReturnUrls` function, which takes an array of files as a parameter.

```typescript
export const uploadFilesToFirebaseAndReturnUrls = async (files: any[]) => {
  try {
    // ...
  } catch (error: any) {
    throw new Error(error);
  }
};
```

3. Inside the function, create a reference to the Firebase Storage bucket and specify the folder where the files will be stored. In this case, the files will be stored in the "images" folder.

```typescript
const storageRef = ref(getStorage(firebaseApp), "images");
```

4. Use `Promise.all` to upload each file to Firebase Storage. For each file, create a reference to the file in the specified folder and upload the file using `uploadBytes`.

```typescript
const uploadedFilesRefs = await Promise.all(
  files.map((file) => {
    const fileRef = ref(storageRef, file.name);
    return uploadBytes(fileRef, file);
  })
);
```

5. Once all files are uploaded, use `Promise.all` again to get the download URLs for each file using `getDownloadURL`.

```typescript
const urls = await Promise.all(
  uploadedFilesRefs.map((fileRef: any) => getDownloadURL(fileRef.ref))
);
```

6. Return the array of download URLs.

```typescript
return urls;
```

7. If any error occurs during the upload or retrieval of download URLs, throw an error.

```typescript
catch (error: any) {
  throw new Error(error);
}
```

This code snippet demonstrates how to upload files to Firebase Storage and retrieve their download URLs using the Firebase Storage SDK for TypeScript.
*/