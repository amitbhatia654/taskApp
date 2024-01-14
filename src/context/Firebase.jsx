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
  query,
  where,
} from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const FireBaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyB0ptINASqG9tTQsR_Rl0ZykyBXAC0BWhs",
  authDomain: "taskapp-d6ec3.firebaseapp.com",
  projectId: "taskapp-d6ec3",
  storageBucket: "taskapp-d6ec3.appspot.com",
  messagingSenderId: "804664946011",
  appId: "1:804664946011:web:572251550cc85952abfe7e",
};

export const useFirebase = () => useContext(FireBaseContext);

const firebaseApp = initializeApp(firebaseConfig); //creating instance of firebase app
const firebaseAuth = getAuth(firebaseApp); // creating instance of firebase authentication
const fireStore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export const FireBaseProvider = (props) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    onAuthStateChanged(
      firebaseAuth,
      (user) => {
        if (user) setUser(user);
        else setUser(null);
      },
      []
    );
  });

  const isUserLoggedIn = user ? user : null;

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
      return "Login SuccessFully";
    } catch (error) {
      return error.message;
    }
  };

  const handleCreateNewTask = async (title, description, dueDate) => {
    const result = await addDoc(collection(fireStore, "allTasks"), {
      title,
      description,
      dueDate,
      status: "Pending",
      userEmail: isUserLoggedIn.email,
      userId: isUserLoggedIn.uid,
    });

    return result.id;
  };

  const getAllPosts = async (id) => {
    // const q = query(
    //   collection(fireStore, "allTasks"),
    //   where("userId", "===", firebaseAuth?.currentUser?.uid)
    // );
    // return await getDocs(q);
    return getDocs(collection(fireStore, "allTasks"));
  };

  const getPostbyId = async (id) => {
    const docRef = doc(fireStore, "allTasks", id);
    const result = await getDoc(docRef);
    return result.data();
  };

  const getImageUrl = (path) => {
    return getDownloadURL(ref(storage, path));
  };

  const SignOutUser = () => {
    signOut(firebaseAuth);
  };

  const deletePost = async (id) => {
    await deleteDoc(doc(fireStore, "allTasks", id));
    return "post Deleted Successfully";
  };

  const UpdatePost = async (id, title, description, dueDate, status) => {
    try {
      const PostRef = doc(fireStore, "allTasks", id);
      const res = await updateDoc(PostRef, {
        title,
        description,
        dueDate,
        status,
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
        handleCreateNewTask,
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
