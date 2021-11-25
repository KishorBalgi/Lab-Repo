// Firebase:
const { error } = require("console");
const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
  getDocs,
} = require("firebase/firestore");
const fs = require("fs");
const firebaseConfig = {
  apiKey: "AIzaSyCpXJ25rSB0UjTxxOCqM3W-uFCktu4j66k",
  authDomain: "lab-repo-d5554.firebaseapp.com",
  projectId: "lab-repo-d5554",
  storageBucket: "lab-repo-d5554.appspot.com",
  messagingSenderId: "595531760093",
  appId: "1:595531760093:web:b38fdf97a55164292b3634",
  measurementId: "G-19Z9XX2VZG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Database:
const db = getFirestore();
const col = collection(db, "third-sem");
const labs = doc(col, "labs");

// Get file:
exports.getFile = async (lab, file) => {
  try {
    const labCol = collection(labs, lab);
    const fileSnap = doc(labCol, file);
    const data = await getDoc(fileSnap);
    if (data.exists) {
      const fileData = data.data();
      return fileData;
    } else throw error;
  } catch {
    return error;
  }
};
// Write To Store:
exports.push = async (lab, data) => {
  const labCol = collection(labs, lab);
  const repo = doc(labCol, data.title);
  await setDoc(repo, data, { merge: true });
};
