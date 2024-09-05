import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../infra/firebase"

export async function logarUsuario(email, senha) {
    let retorno = new Object();
    await signInWithEmailAndPassword(auth, email, senha)
        .then((credenciais) => {
            retorno.id = credenciais.user.uid;
            retorno.email = email;
            retorno.senha = senha;
        })
        .catch((error) => {
            console.log(`${error.code} = ${error.messsage}`)
            retorno.erro = "Login Inválido";
        })
    return retorno;
}

//-----------------------------------------------------------------------

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export async function criarConta(email, senha) {
    let retorno = new Object();
    await createUserWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
            retorno.id = userCredential.user.uid;
            retorno.email = email;
            retorno.senha = senha;
        })
        .catch((error) => {
            console.log(`${error.code} = ${error.messsage}`)
            retorno.erro = "Login Inválido";
        });

    return retorno;
}

// ----------------------------------------------------------------------

import { signOut } from "firebase/auth";

export async function deslogarUsuario() {
    try {
        await signOut(auth); 
        const retorno = { id: null, email: " ", senha: " " };
        return retorno;
    } catch (error) {
        console.log(`${error.code} = ${error.message}`);
        return null;
    }
}
