import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

export const criarFicha = async (userId, nomePersonagem, classe, atributos, publica) => {
  return addDoc(collection(db, "fichas"), {
    dono: userId,
    nomePersonagem,
    classe,
    atributos,
    publica,
    campanhaId: null
  });
};

// 🔹 Listar fichas públicas (comunidade)
export const listarFichasPublicas = async () => {
  const fichasRef = collection(db, "fichas");
  const q = query(fichasRef, where("publica", "==", true));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
