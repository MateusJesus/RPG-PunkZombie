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
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { usePathname, useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loadingPage, setLoadingPage] = useState(true);
  const [imageFicha, setImageFicha] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser?.uid !== user?.uid) {
        setUser(authUser);
        setLoadingPage(false);
      }
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    setImageFicha(null);
  }, [pathname]);

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

  const uploadImagemFicha = async (imagemFile) => {
    const formData = new FormData();
    formData.append("file", imagemFile);

    const res = await fetch("/api/uploadImgFicha", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`Falha no upload da imagem: ${res.status}`);
    }

    return await res.json(); // Retorna { url, public_id }
  };

  const processarImagemFicha = async (ficha, imageFicha) => {
    try {
      let fichaAtualizada = {
        ...ficha,
        imagem: "",
        imagemId: "",
      };

      // Se já existe imagem antiga, deleta antes

      if ((ficha.imagemId && imageFicha) || ficha.imagem === "delete") {
        try {
          const resDelete = await fetch(
            `/api/uploadImgFicha?public_id=${ficha.imagemId}`,
            { method: "DELETE" }
          );
          const deleteData = await resDelete.json();
          console.log("Imagem antiga deletada:", deleteData);
        } catch (err) {
          console.error("Erro ao deletar imagem antiga:", err);
        }

        fichaAtualizada = {
          ...ficha,
          imagem: "",
          imagemId: "",
        };

        // Limpa estado local
      }

      if (!imageFicha) {
        setImageFicha(null);
        return {
          ...ficha,
          imagem: ficha.imagem === "delete" ? "" : ficha.imagem,
          imagemId: ficha.imagem === "delete" ? "" : ficha.imagemId,
        };
      } else {
        // Faz upload da nova imagem
        const uploadResult = await uploadImagemFicha(imageFicha);
        console.log("Nova imagem enviada com sucesso:", uploadResult);

        // Atualiza ficha com nova imagem
        fichaAtualizada = {
          ...ficha,
          imagem: uploadResult.url,
          imagemId: uploadResult.public_id,
        };

        // Limpa estado local
        setImageFicha(null);

        return fichaAtualizada;
      }
    } catch (err) {
      console.error("Erro ao processar imagem:", err);
      return ficha; // Se falhar, retorna ficha original
    }
  };

  // Salvar ficha
  const salvarFicha = async (ficha) => {
    try {
      if (!user) throw new Error("Usuário não autenticado.");

      let fichaComUsuario = {
        ...ficha,
        uid: user.uid,
        usuario: user.displayName,
        data_hora: new Date(),
      };

      // Processa a imagem antes de salvar
      fichaComUsuario = await processarImagemFicha(fichaComUsuario, imageFicha);

      const fichasRef = collection(db, "fichas");
      const docRef = await addDoc(fichasRef, fichaComUsuario);

      return docRef.id;
    } catch (error) {
      console.error("Erro ao salvar a ficha:", error.message);
    }
  };

  // Editar ficha
  const editarFicha = async (idFicha, dadosAtualizados) => {
    try {
      if (!user) throw new Error("Usuário não autenticado.");

      let fichaComUsuario = {
        ...dadosAtualizados,
        uid: user.uid,
        usuario: user.displayName,
      };

      // Processa a imagem antes de atualizar
      fichaComUsuario = await processarImagemFicha(fichaComUsuario, imageFicha);

      const fichaRef = doc(db, "fichas", idFicha);
      await updateDoc(fichaRef, fichaComUsuario);

      return fichaComUsuario;
    } catch (error) {
      console.error("Erro ao atualizar a ficha:", error.message);
      return false;
    }
  };

  const editarFichaMestre = async (idFicha, dadosAtualizados) => {
    try {
      if (!user) throw new Error("Usuário não autenticado.");

      if (
        !dadosAtualizados?.config?.campaigns_master ||
        !dadosAtualizados?.config?.belongs ||
        !dadosAtualizados?.config?.belongs_input
      ) {
        throw new Error("Campos obrigatórios da campanha ausentes no update.");
      }

      const fichaRef = doc(db, "fichas", idFicha);
      const fichaSnap = await getDoc(fichaRef);

      if (!fichaSnap.exists()) {
        throw new Error("Ficha não encontrada.");
      }

      const fichaOriginal = fichaSnap.data();

      let fichaComPermissao = {
        ...dadosAtualizados,
        uid: fichaOriginal.uid,
        usuario: fichaOriginal.usuario,
      };

      fichaComPermissao = await processarImagemFicha(
        fichaComPermissao,
        imageFicha
      );

      const campanhaRef = doc(
        db,
        "campanhas",
        dadosAtualizados.config.belongs_input
      );

      const campanhaSnap = await getDoc(campanhaRef);

      if (!campanhaSnap.exists()) {
        throw new Error("Campanha não encontrada.");
      }

      const campanhaData = campanhaSnap.data();

      if (campanhaData.mestreId !== user.uid) {
        throw new Error("Você não tem permissão para editar essa ficha.");
      }

      await updateDoc(fichaRef, fichaComPermissao);
      console.log("Ficha atualizada com sucesso!");

      return fichaComPermissao;
    } catch (error) {
      console.error("Erro ao atualizar a ficha:", error.message);
      return false;
    }
  };

  const deletarFicha = async (ficha) => {
    try {
      if (!user) throw new Error("Usuário não autenticado.");

      const fichaRef = doc(db, "fichas", ficha.id);

      if (ficha.config.belongs_input) {
        await desvincularFichaDaCampanha(ficha.id, ficha.config.belongs_input);
      }

      if (ficha.imagem) {
        await processarImagemFicha(ficha, imageFicha);
      }

      await deleteDoc(fichaRef);
      console.log("Ficha deletada com sucesso!");
      return true;
    } catch (error) {
      console.error("Erro ao deletar a ficha:", error.message);
      return false;
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
        const dadosFicha = {
          id: docSnap.id,
          ...docSnap.data(),
        };

        return dadosFicha;
      } else {
        console.log("Ficha não encontrada");
        return null;
      }
    } catch (error) {
      return null;
    }
  };

  const criarCampanha = async (dados) => {
    try {
      const docRef = await addDoc(collection(db, "campanhas"), {
        ...dados,
        jogadoresUids: [],
        mestreId: user.uid,
        username: user.displayName,
        criadoEm: new Date(),
        jogadores: [
          {
            username: user.displayName,
            viewOpening: true,
            fichas: [],
            uid: user.uid,
            papel: "mestre",
          },
        ],
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
        return {
          id: docSnap.id,
          ...docSnap.data(),
        };
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
      viewOpening: true,
      fichas: [],
    };

    if (campanha.jogadores?.some((j) => j.uid === user.uid)) {
      throw new Error("Você já está na campanha.");
    }

    const permissaoFichas = campanha.configGeral?.permissaoFichas;
    const senhaAcesso = campanha.configGeral?.senha_acesso;

    const maxPlayers = parseInt(campanha.configGeral?.max_players || 0) + 1;
    const jogadoresAtuais = campanha.jogadores?.length || 0;

    if (maxPlayers > 0 && jogadoresAtuais >= maxPlayers) {
      throw new Error("A campanha atingiu o número máximo de jogadores.");
    }

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
      const fichaUpdate = {
        "config.belongs": "sim",
        "config.belongs_input": campanhaId,
      };

      const fichaSnap = await getDoc(fichaRef);
      const fichaData = fichaSnap.data();
      if (fichaData?.config?.view === "privada") {
        fichaUpdate["config.view"] = "privada_link";
      }

      await updateDoc(fichaRef, fichaUpdate);

      return true;
    } catch (error) {
      console.error("Erro ao adicionar ficha à campanha:", error.message);
      throw error;
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
          "config.campaigns_players": "nao",
          "config.campaigns_master": "",
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

  const alterarViewOpening = async (idCampanha, uidJogador, novoValor) => {
    try {
      const campanhaRef = doc(db, "campanhas", idCampanha);
      const campanhaSnap = await getDoc(campanhaRef);

      if (campanhaSnap.exists()) {
        const campanhaData = campanhaSnap.data();
        const jogadores = campanhaData.jogadores || [];

        const index = jogadores.findIndex((j) => j.uid === uidJogador);

        if (index !== -1) {
          jogadores[index].viewOpening = novoValor;

          await updateDoc(campanhaRef, {
            jogadores,
          });
        } else {
          console.warn("Jogador não encontrado na campanha.");
        }
      }
    } catch (error) {
      console.error("Erro ao alterar viewOpening:", error);
    }
  };

  const listarCampanhasPublicas = async () => {
    try {
      const campanhasSnapshot = await getDocs(
        query(
          collection(db, "campanhas"),
          where("configGeral.visibilidade", "==", "publico")
        )
      );

      const campanhas = campanhasSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return { campanhas };
    } catch (error) {
      console.error("Erro ao listar campanhas públicas:", error);
      return { campanhas: [] };
    }
  };

  const excluirCampanha = async (idCampanha) => {
    try {
      await deleteDoc(doc(db, "campanhas", idCampanha));
      alert("Campanha excluída com sucesso!");
      router.push("/campaigns");
    } catch (error) {
      console.error("Erro ao excluir campanha:", error);
      alert("Erro ao excluir campanha.");
    }
  };

  const toggleLikeCampanha = async (collectionName, docId, user, action) => {
    try {
      const userLikeRef = doc(db, collectionName, docId, "likes", user.uid);

      const userLikeDoc = await getDoc(userLikeRef);

      if (action === "like") {
        if (userLikeDoc.exists()) {
          await deleteDoc(userLikeRef);
        } else {
          await setDoc(userLikeRef, { likedAt: new Date() });
        }
      }

      if (action === "buscar") {
        return {
          liked: userLikeDoc.exists(),
          likes: (await getDocs(collection(db, collectionName, docId, "likes")))
            .size,
        };
      }

      const updatedLikesSnap = await getDocs(
        collection(db, collectionName, docId, "likes")
      );

      return {
        liked: !userLikeDoc.exists(),
        likes: updatedLikesSnap.size,
      };
    } catch (error) {
      console.error("Erro ao atualizar curtida:", error);
      return { liked: false, likes: 0 };
    }
  };

  const toggleLikeFicha = async (collectionName, docId, user, action) => {
    try {
      const userLikeRef = doc(db, collectionName, docId, "likes", user.uid);
      const userLikeDoc = await getDoc(userLikeRef);

      if (action === "like") {
        if (userLikeDoc.exists()) {
          await deleteDoc(userLikeRef);
        } else {
          await setDoc(userLikeRef, { likedAt: new Date() });
        }
      }

      if (action === "buscar") {
        return {
          liked: userLikeDoc.exists(),
          likes: (await getDocs(collection(db, collectionName, docId, "likes")))
            .size,
        };
      }

      const updatedLikesSnap = await getDocs(
        collection(db, collectionName, docId, "likes")
      );

      return {
        liked: !userLikeDoc.exists(),
        likes: updatedLikesSnap.size,
      };
    } catch (error) {
      console.error("Erro ao atualizar curtida:", error);
      return { liked: false, likes: 0 };
    }
  };

  const getFichasCampanhaVisiveis = async (
    jogadores,
    currentUser,
    mestreId
  ) => {
    const fichasVisiveis = [];

    for (const jogador of jogadores || []) {
      for (const fichaId of jogador.fichas || []) {
        const fichaRef = doc(db, "fichas", fichaId);
        const fichaSnap = await getDoc(fichaRef);

        if (!fichaSnap.exists()) continue;

        const fichaData = fichaSnap.data();

        const isOwner = fichaData.uid === currentUser.uid;
        const isMestre = currentUser.uid === mestreId;
        const isPublica = fichaData.config.view === "publica";
        const isPrivadaLink = fichaData.config.view === "privada_link";
        const permitirVer = fichaData.config.campaigns_players === "sim";

        if (isMestre) {
          fichasVisiveis.push({ id: fichaSnap.id, ...fichaData });
          continue;
        }

        if (isOwner || isPublica || (isPrivadaLink && permitirVer)) {
          fichasVisiveis.push({ id: fichaSnap.id, ...fichaData });
        }
      }
    }

    return fichasVisiveis;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loadingPage,
        setLoadingPage,
        setImageFicha,
        signUp,
        signIn,
        logout,
        salvarFicha,
        carregarFichasPublicas,
        carregarMinhasFichas,
        abrirFicha,
        editarFicha,
        deletarFicha,
        editarFichaMestre,
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
        alterarViewOpening,
        listarCampanhasPublicas,
        excluirCampanha,
        toggleLikeCampanha,
        toggleLikeFicha,
        getFichasCampanhaVisiveis,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
