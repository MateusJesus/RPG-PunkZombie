import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { updateProfile } from "firebase/auth";

export const signUp = async (email, senha, nome) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    senha
  );
  
  const user = userCredential.user;
  await updateProfile(user, {
    displayName: nome,
  });

  return user;
};

export const signIn = async (email, senha) => {
  return signInWithEmailAndPassword(auth, email, senha);
};
