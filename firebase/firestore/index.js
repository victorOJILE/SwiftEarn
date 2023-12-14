import { getFirestore, doc, collection, getDoc, getDocs, addDoc, setDoc, updateDoc, deleteDoc, query, where, increment, startAt, orderBy, limit } from 'firebase/firestore';
import firebase_app from '../config.js';

const db = getFirestore(firebase_app);

export { db, doc, collection, getDoc, getDocs, addDoc, setDoc, updateDoc, deleteDoc, query, where, increment, startAt, orderBy, limit };