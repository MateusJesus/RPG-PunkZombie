"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  orderBy,
  updateDoc,
  limit,
  startAfter,
} from "firebase/firestore";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingPage, setLoadingPage] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser?.uid !== user?.uid) {
        setUser(authUser);
      }
      setLoadingPage(false);
    });

    return () => unsubscribe();
  }, [user]);

  const signUp = async (email, password, name) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await updateProfile(user, { displayName: name });
    setUser({ ...user, displayName: name });
    return user;
  };

  const signIn = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    setUser(userCredential.user);
    return userCredential.user;
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const salvarFicha = async (ficha) => {
    try {
      if (!user) {
        throw new Error("Usuário não autenticado.");
      }

      const fichaComUsuario = {
        ...ficha,
        uid: user.uid,
        usuario: user.displayName,
        data_hora: new Date(),
      };

      const fichasRef = collection(db, "fichas");
      const docRef = await addDoc(fichasRef, fichaComUsuario);
      console.log("Ficha salva com ID:", docRef.id);
    } catch (error) {
      console.error("Erro ao salvar a ficha:", error.message);
    }
  };

  const editarFicha = async (idFicha, dadosAtualizados) => {
    try {
      if (!user) {
        throw new Error("Usuário não autenticado.");
      }

      const fichaComUsuario = {
        ...dadosAtualizados,
        uid: user.uid,
        usuario: user.displayName,
      };

      const fichaRef = doc(db, "fichas", idFicha);
      await updateDoc(fichaRef, fichaComUsuario);

      console.log("Ficha atualizada com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar a ficha:", error.message);
    }
  };

  const carregarFichasPublicas = async (lastDoc = null) => {
    const fichasRef = collection(db, "fichas");
    let q = query(
      fichasRef,
      where("config.view", "==", "publica"),
      orderBy("data_hora", "desc"),
      limit(2)
    );

    if (lastDoc) {
      q = query(
        fichasRef,
        where("config.view", "==", "publica"),
        orderBy("data_hora", "desc"),
        startAfter(lastDoc),
        limit(2)
      );
    }

    const snapshot = await getDocs(q);
    const fichas = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const lastVisible = snapshot.docs[snapshot.docs.length - 1];

    return { fichas, lastVisible };
  };

  const carregarMinhasFichas = async () => {
    const fichasRef = collection(db, "fichas");
    const q = query(
      fichasRef,
      where("uid", "==", user.uid),
      orderBy("data_hora", "desc")
    );

    try {
      const snapshot = await getDocs(q);
      const fichasPublicas = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return fichasPublicas;
    } catch (error) {
      console.error("Erro ao carregar fichas públicas:", error);
      return [];
    }
  };

  const abrirFicha = async (idFicha) => {
    try {
      const docRef = doc(db, "fichas", idFicha);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setLoadingPage(false);
        return {
          id: docSnap.id,
          ...docSnap.data(),
        };
      } else {
        console.log("Ficha não encontrada");
        return null;
      }
    } catch (error) {
      setLoadingPage(false);
      console.error("Erro ao carregar ficha:", error);
      return null;
    }
  };

  // const carregarFichasPublicas = async () => {
  //   if (!user) return [];

  //   const fichasRef = collection(db, "fichas");
  //   const q = query(fichasRef, where("uid", "==", user.uid));

  //   try {
  //     const snapshot = await getDocs(q);
  //     const fichasDoUsuario = snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     return fichasDoUsuario;
  //   } catch (error) {
  //     console.error("Erro ao carregar fichas:", error);
  //     return [];
  //   }
  // };

  return (
    <AuthContext.Provider
      value={{
        user,
        loadingPage,
        signUp,
        signIn,
        logout,
        salvarFicha,
        carregarFichasPublicas,
        carregarMinhasFichas,
        abrirFicha,
        editarFicha,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
