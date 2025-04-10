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
import { v4 as uuidv4 } from "uuid";

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

  const carregarFichasPublicas = async () => {
    const fichasRef = collection(db, "fichas");
    let q = query(
      fichasRef,
      where("config.view", "==", "publica"),
      orderBy("data_hora", "desc")
    );

    const snapshot = await getDocs(q);
    const fichas = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return { fichas };
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
        jogadoresUids: [],
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
      username: user.displayName || "Jogador",
      fichas: [], // já segue a nova estrutura
    };

    if (campanha.jogadores?.some((j) => j.uid === user.uid)) {
      throw new Error("Você já está na campanha.");
    }

    const permissaoFichas = campanha.configGeral?.permissaoFichas;
    const senhaAcesso = campanha.configGeral?.senha_acesso;

    if (permissaoFichas === "auto") {
      if (senhaAcesso && senhaAcesso !== senhaDigitada) {
        throw new Error("Senha incorreta.");
      }

      await updateDoc(campanhaRef, {
        jogadores: arrayUnion(novoJogador),
        jogadoresUids: arrayUnion(user.uid),
      });

      return { sucesso: true, tipo: "entrada-direta" };
    }

    if (permissaoFichas === "aprovacao") {
      if (senhaAcesso && senhaAcesso !== senhaDigitada) {
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

  const sairDaCampanha = async (idCampanha, uidJogador) => {
    try {
      const campanhaRef = doc(db, "campanhas", idCampanha);
      const campanhaSnap = await getDoc(campanhaRef);

      if (!campanhaSnap.exists()) throw new Error("Campanha não encontrada");

      const dados = campanhaSnap.data();

      const jogadoresAtualizados =
        dados.jogadores?.filter((j) => j.uid !== uidJogador) || [];

      await updateDoc(campanhaRef, {
        jogadores: jogadoresAtualizados,
      });

      console.log("Jogador removido da campanha com sucesso!");
    } catch (error) {
      console.error("Erro ao sair da campanha:", error);
      throw error;
    }
  };

  const gerenciarPedidoEntrada = async (idCampanha, jogadorObj, acao) => {
    const campanhaRef = doc(db, "campanhas", idCampanha);
    const campanhaSnap = await getDoc(campanhaRef);

    if (!campanhaSnap.exists()) {
      throw new Error("Campanha não encontrada.");
    }

    await updateDoc(campanhaRef, {
      pedidosEntrada: arrayRemove(jogadorObj),
    });

    if (acao === "aceitar") {
      await updateDoc(campanhaRef, {
        jogadores: arrayUnion({
          ...jogadorObj,
          fichas: [],
        }),
        jogadoresUids: arrayUnion(jogadorObj.uid),
      });
    }

    if (acao === "remover") {
      await updateDoc(campanhaRef, {
        jogadores: arrayRemove(jogadorObj),
        jogadoresUids: arrayRemove(jogadorObj.uid),
      });
    }
  };

  const adicionarConteudoCampanha = async (campanhaId, conteudo) => {
    if (!user) throw new Error("Usuário não autenticado.");

    const campanhaRef = doc(db, "campanhas", campanhaId);
    const campanhaSnap = await getDoc(campanhaRef);

    if (!campanhaSnap.exists()) {
      throw new Error("Campanha não encontrada.");
    }

    const campanha = campanhaSnap.data();

    const isMestre = user.uid === campanha.mestreId;

    const jogadoresPodeAdicionar =
      campanha.configGeral.permissaoConteudo === "jogadoresContent";

    if (!isMestre && !jogadoresPodeAdicionar) {
      throw new Error(
        "Apenas o mestre pode adicionar conteúdo nesta campanha."
      );
    }

    if (!isMestre && jogadoresPodeAdicionar) {
      const ehJogador = campanha.jogadores?.some((j) => j.uid === user.uid);
      if (!ehJogador) {
        throw new Error(
          "Apenas jogadores da campanha podem adicionar conteúdo."
        );
      }
    }

    const novoConteudo = {
      ...conteudo,
      addPor: user.uid,
      username: isMestre ? user.displayName + " (Mestre)" : user.displayName,
      id: uuidv4(),
    };

    await updateDoc(campanhaRef, {
      contents: arrayUnion(novoConteudo),
    });

    return { sucesso: true, mensagem: "Conteúdo adicionado com sucesso!" };
  };

  const getConteudosCampanha = async (campanhaId) => {
    if (!campanhaId) throw new Error("ID da campanha inválido.");

    const campanhaRef = doc(db, "campanhas", campanhaId);
    const campanhaSnap = await getDoc(campanhaRef);

    if (!campanhaSnap.exists()) throw new Error("Campanha não encontrada.");

    const campanha = campanhaSnap.data();

    const todosConteudos = campanha.contents || [];
    const visiveis = todosConteudos;

    return visiveis.sort(
      (a, b) =>
        new Date(b.criadoEm?.seconds || 0) - new Date(a.criadoEm?.seconds || 0)
    );
  };

  const editarConteudoCampanha = async (idCampanha, idConteudo, novosDados) => {
    const campanhaRef = doc(db, "campanhas", idCampanha);
    const campanhaSnap = await getDoc(campanhaRef);
    if (!campanhaSnap.exists()) throw new Error("Campanha não encontrada");

    const dados = campanhaSnap.data();
    const contents = dados.contents || [];

    const atualizados = contents.map((c) =>
      c.id === idConteudo ? { ...c, ...novosDados } : c
    );

    await updateDoc(campanhaRef, { contents: atualizados });
  };

  const excluirConteudoCampanha = async (idCampanha, idConteudo) => {
    const campanhaRef = doc(db, "campanhas", idCampanha);
    const campanhaSnap = await getDoc(campanhaRef);
    if (!campanhaSnap.exists()) throw new Error("Campanha não encontrada");

    const dados = campanhaSnap.data();
    const contents = dados.contents || [];

    const atualizados = contents.filter((c) => c.id !== idConteudo);

    await updateDoc(campanhaRef, { contents: atualizados });
  };

  const adicionarFichaCampanha = async (campanhaId, fichaId) => {
    if (!user) return;

    try {
      const campanhaRef = doc(db, "campanhas", campanhaId);
      const campanhaSnap = await getDoc(campanhaRef);
      if (!campanhaSnap.exists()) throw new Error("Campanha não encontrada.");

      const campanhaData = campanhaSnap.data();
      let jogadores = campanhaData.jogadores || [];
      const maxFichas = Number(campanhaData?.configGeral?.max_fichas || 0);
      const isMestre = campanhaData.mestreId === user.uid;

      if (isMestre) {
        const indexMestre = jogadores.findIndex(
          (j) => j.uid === user.uid && j.papel === "mestre"
        );

        if (indexMestre !== -1) {
          const mestre = jogadores[indexMestre];
          if (!mestre.fichas.includes(fichaId)) {
            mestre.fichas.push(fichaId);
            jogadores[indexMestre] = mestre;
          }
        } else {
          jogadores.push({
            uid: user.uid,
            username: user.displayName || "Mestre",
            fichas: [fichaId],
            papel: "mestre",
          });
        }
      } else {
        const indexJogador = jogadores.findIndex((j) => j.uid === user.uid);
        if (indexJogador !== -1) {
          const jogador = jogadores[indexJogador];

          // Limite de fichas
          if (jogador.fichas.length >= maxFichas) {
            throw new Error(
              "Você atingiu o limite de fichas para esta campanha."
            );
          }

          if (!jogador.fichas.includes(fichaId)) {
            jogador.fichas.push(fichaId);
            jogadores[indexJogador] = jogador;
          }
        } else {
          // Novo jogador
          if (maxFichas === 0) {
            throw new Error("Esta campanha não permite fichas para jogadores.");
          }

          jogadores.push({
            uid: user.uid,
            username: user.displayName || "Jogador",
            fichas: [fichaId],
            papel: "jogador",
          });
        }
      }

      await updateDoc(campanhaRef, { jogadores });

      const fichaRef = doc(db, "fichas", fichaId);
      await updateDoc(fichaRef, {
        "config.belongs": "sim",
        "config.belongs_input": campanhaId,
      });

      return true;
    } catch (error) {
      console.error("Erro ao adicionar ficha à campanha:", error.message);
      throw error; // deixa estourar o erro para o front exibir
    }
  };

  const desvincularFichaDaCampanha = async (idFicha, campanhaId) => {
    if (!idFicha || !campanhaId) {
      console.error("ID da campanha ou da ficha está indefinido!");
      return;
    }

    try {
      const campanhaRef = doc(db, "campanhas", campanhaId);
      const campanhaSnap = await getDoc(campanhaRef);

      if (!campanhaSnap.exists()) throw new Error("Campanha não encontrada");

      const campanhaData = campanhaSnap.data();
      let jogadores = campanhaData.jogadores || [];

      const jogadorIndex = jogadores.findIndex((j) => j.uid === user.uid);

      if (jogadorIndex !== -1) {
        let jogador = jogadores[jogadorIndex];
        jogador.fichas = jogador.fichas.filter((f) => f !== idFicha);

        jogadores[jogadorIndex] = jogador;

        await updateDoc(campanhaRef, { jogadores });

        // Atualiza a ficha também
        const fichaRef = doc(db, "fichas", idFicha);
        await updateDoc(fichaRef, {
          "config.belongs": "nao",
          "config.belongs_input": "",
        });

        console.log("Ficha desvinculada com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao desvincular ficha:", error);
    }
  };

  const getFichasCampanha = async (idCampanha) => {
    try {
      const campanhaRef = doc(db, "campanhas", idCampanha);
      const campanhaSnap = await getDoc(campanhaRef);

      if (!campanhaSnap.exists()) {
        throw new Error("Campanha não encontrada.");
      }

      const campanhaData = campanhaSnap.data();
      const jogadores = campanhaData.jogadores || [];

      let fichasCompletas = [];

      for (const jogador of jogadores) {
        const { uid, fichas = [], username } = jogador;

        if (fichas.length === 0) continue;

        const fichasQuery = query(
          collection(db, "fichas"),
          where("__name__", "in", fichas)
        );

        const fichasSnap = await getDocs(fichasQuery);
        const fichasJogador = fichasSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          uid,
          username,
        }));

        fichasCompletas = [...fichasCompletas, ...fichasJogador];
      }

      return fichasCompletas;
    } catch (error) {
      console.error("Erro ao buscar fichas da campanha:", error);
      return [];
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
        sairDaCampanha,
        gerenciarPedidoEntrada,
        adicionarConteudoCampanha,
        getConteudosCampanha,
        editarConteudoCampanha,
        excluirConteudoCampanha,
        adicionarFichaCampanha,
        desvincularFichaDaCampanha,
        getFichasCampanha,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
