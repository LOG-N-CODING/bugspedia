import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { InsectCardData } from "./types/Insect";
import { db } from "./utils/firebase";
// hooks/useAllUsers.ts

export const useUserCards = (uid?: string | null): InsectCardData[] => {
  const [cards, setCards] = useState<InsectCardData[]>([]);

  useEffect(() => {
    if (!uid) return;

    const userRef = doc(db, "users", uid);

    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setCards(data.showcaseCards || []);
      }
    });

    return () => unsubscribe();
  }, [uid]);

  return cards;
};

export interface AppUser {
  uid: string;
  displayName: string;
  photoURL?: string;
  points: number;
  showcaseCollection: string[]; // array of card IDs
  cards: number; // number of cards
}

export const useAllUsers = () => {
  const [users, setUsers] = useState<AppUser[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersData = querySnapshot.docs.map((doc) => ({
        uid: doc.id,
        ...doc.data(),
      })) as AppUser[];
      setUsers(usersData);
    };

    fetchUsers();
  }, []);

  return users;
};
