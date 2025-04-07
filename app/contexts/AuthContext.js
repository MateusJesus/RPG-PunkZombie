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
  arrayUnion,
  arrayRemove,
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
      return docRef.id;
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

  const carregarMinhasFichas = async (lastDoc = null) => {
    const fichasRef = collection(db, "fichas");
    let q = query(
      fichasRef,
      where("uid", "==", user.uid),
      orderBy("data_hora", "desc"),
      limit(4)
    );

    if (lastDoc) {
      q = query(
        fichasRef,
        where("uid", "==", user.uid),
        orderBy("data_hora", "desc"),
        startAfter(lastDoc),
        limit(4)
      );
    }

    try {
      const snapshot = await getDocs(q);
      const fichas = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const lastVisible = snapshot.docs[snapshot.docs.length - 1];
      return { fichas, lastVisible };
    } catch (error) {
      console.error("Erro ao carregar fichas do usuário:", error);
      return { fichas: [], lastVisible: null };
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

  const criarCampanha = async (dados) => {
    try {
      const docRef = await addDoc(collection(db, "campanhas"), {
        ...dados,
        mestreId: user.uid,
        criadoEm: new Date(),
      });
      console.log("Campanha criada com ID:", docRef.id);
      return docRef.id;
    } catch (error) {
      console.error("Erro ao criar campanha:", error);
      throw error;
    }
  };

  const abrirCampanha = async (id) => {
    try {
      const docRef = doc(db, "campanhas", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        throw new Error("Campanha não encontrada.");
      }
    } catch (error) {
      console.error("Erro ao abrir campanha:", error);
      throw error;
    }
  };

  const editarCampanha = async (id, dados) => {
    try {
      const docRef = doc(db, "campanhas", id);
      await updateDoc(docRef, {
        ...dados,
        atualizadoEm: new Date(),
      });
      console.log("Campanha atualizada com sucesso!");
    } catch (error) {
      console.error("Erro ao editar campanha:", error);
      throw error;
    }
  };

  const adicionarJogador = async (codigoCampanha, senhaDigitada) => {
    if (!user) throw new Error("Usuário não autenticado.");

    const campanhaRef = doc(db, "campanhas", codigoCampanha);
    const campanhaSnap = await getDoc(campanhaRef);

    if (!campanhaSnap.exists()) {
      throw new Error("Campanha não encontrada.");
    }

    const campanha = campanhaSnap.data();

    const novoJogador = {
      uid: user.uid,
      nome: user.displayName || "Jogador",
    };

    if (campanha.jogadores?.some((j) => j.uid === user.uid)) {
      throw new Error("Você já está na campanha.");
    }

    if (campanha.permissaoFichas === "auto") {
      if (campanha.senha_acesso && campanha.senha_acesso !== senhaDigitada) {
        throw new Error("Senha incorreta.");
      }

      await updateDoc(campanhaRef, {
        jogadores: arrayUnion(novoJogador),
      });

      return { sucesso: true, tipo: "entrada-direta" };
    }

    if (campanha.permissaoFichas === "aprovacao") {
      if (campanha.senha_acesso && campanha.senha_acesso !== senhaDigitada) {
        throw new Error("Senha incorreta.");
      }

      if (campanha.pedidosEntrada?.some((p) => p.uid === user.uid)) {
        throw new Error("Você já pediu para entrar.");
      }

      await updateDoc(campanhaRef, {
        pedidosEntrada: arrayUnion(novoJogador),
      });

      return { sucesso: true, tipo: "pedido-enviado" };
    }

    throw new Error("Permissão de entrada inválida ou não configurada.");
  };

  const gerenciarPedidoEntrada = async (idCampanha, jogadorObj, acao) => {
    const campanhaRef = doc(db, "campanhas", idCampanha);
    const campanhaSnap = await getDoc(campanhaRef);

    if (!campanhaSnap.exists()) {
      throw new Error("Campanha não encontrada.");
    }

    const campanha = campanhaSnap.data();

    await updateDoc(campanhaRef, {
      pedidosEntrada: arrayRemove(jogadorObj),
    });

    if (acao === "aceitar") {
      await updateDoc(campanhaRef, {
        jogadores: arrayUnion(jogadorObj),
      });
    }

    if (acao === "remover") {
      await updateDoc(campanhaRef, {
        jogadores: arrayRemove(jogadorObj),
      });
    }
  };

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
        criarCampanha,
        abrirCampanha,
        editarCampanha,
        adicionarJogador,
        gerenciarPedidoEntrada,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
