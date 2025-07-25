import { collection, doc, getDocs, onSnapshot, writeBatch } from "firebase/firestore";
import { useEffect, useState } from "react";
import { InsectCardData } from "./types/Insect";
import { db } from "./utils/firebase";
// hooks/useAllUsers.ts

export const useUserCards = (uid?: string | null): [InsectCardData[], (card: InsectCardData) => Promise<void>] => {
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

  // 카드 삭제 함수
  const removeUserCard = async (card: InsectCardData) => {
    if (!uid) return;
    const userRef = doc(db, "users", uid);
    // arrayRemove는 객체 전체가 일치해야 하므로, card 객체가 그대로 저장되어야 정상 동작
    await import("firebase/firestore").then(({ updateDoc, arrayRemove }) =>
      updateDoc(userRef, {
        showcaseCards: arrayRemove(card),
      })
    );
  };

  return [cards, removeUserCard];
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


// 모든 유저 showcaseCards 데이터 삭제 - 파이어스토어에서 모든 유저 데이터를 삭제하는 함수
export const deleteAllUserShowcaseCards = async () => {
  const usersCollection = collection(db, "users");
  const querySnapshot = await getDocs(usersCollection);

  const batch = writeBatch(db);
  querySnapshot.forEach((docSnap) => {
    batch.update(docSnap.ref, { showcaseCards: [] });
  });

  await batch.commit();
  console.log("All users' showcaseCards deleted successfully.");
};
