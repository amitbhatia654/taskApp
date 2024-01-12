import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const FireBaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyARsxrylwBawuMXUqbgzqU-P9ELNiX4PfE",
  authDomain: "blogging-task.firebaseapp.com",
  projectId: "blogging-task",
  storageBucket: "blogging-task.appspot.com",
  messagingSenderId: "644622861697",
  appId: "1:644622861697:web:c0b6e5a0e31e913dc9d480",
};

export const useFirebase = () => useContext(FireBaseContext);

const firebaseApp = initializeApp(firebaseConfig); //creating instance of firebase app
const firebaseAuth = getAuth(firebaseApp); // creating instance of firebase authentication
const fireStore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export const FireBaseProvider = (props) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  });
  const signupUserWithEmailAndPass = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
      return "Register Successfully";
    } catch (error) {
      return error.message;
    }
  };

  const signInWithEmailAndPass = async (email, password) => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      return "Loggin SuccessFully";
    } catch (error) {
      return error.message;
    }
  };

  const handleCreateNewPost = async (title, image, description) => {
    const imageRef = ref(
      storage,
      `uploads/coverImage/${Date.now()}-${image.name}`
    );
    const uploadResult = await uploadBytes(imageRef, image);

    const result = await addDoc(collection(fireStore, "blogposts"), {
      title,
      description,
      imageUrl: uploadResult.ref.fullPath,
      userEmail: isUserLoggedIn.email,
      userId: isUserLoggedIn.uid,
    });

    return result.id;
  };

  const getAllPosts = () => {
    return getDocs(collection(fireStore, "blogposts"));
  };

  const getPostbyId = async (id) => {
    const docRef = doc(fireStore, "blogposts", id);
    const result = await getDoc(docRef);
    return result.data();
  };

  const getImageUrl = (path) => {
    return getDownloadURL(ref(storage, path));
  };

  const isUserLoggedIn = user ? user : null;

  const SignOutUser = () => {
    signOut(firebaseAuth);
  };

  const deletePost = async (id) => {
    await deleteDoc(doc(fireStore, "blogposts", id));
    return "post Deleted Successfully";
  };

  const UpdatePost = async (id, title, image, description) => {
    try {
      const imageRef = ref(
        storage,
        `uploads/coverImage/${Date.now()}-${image.name}`
      );
      const uploadResult = await uploadBytes(imageRef, image);

      const PostRef = doc(fireStore, "blogposts", id);
      const res = await updateDoc(PostRef, {
        title,
        imageUrl: uploadResult.ref.fullPath,
        description,
      });
      return res;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  };

  return (
    <FireBaseContext.Provider
      value={{
        signupUserWithEmailAndPass,
        signInWithEmailAndPass,
        isUserLoggedIn,
        handleCreateNewPost,
        getAllPosts,
        getPostbyId,
        getImageUrl,
        deletePost,
        SignOutUser,
        UpdatePost,
      }}
    >
      {props.children}
    </FireBaseContext.Provider>
  );
};
