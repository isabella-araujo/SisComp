import { db } from "../../infra/firebase";
import { addDoc, collection, deleteDoc, getDocs, getDoc, doc, setDoc } from "firebase/firestore";

export async function inserirCotacao(novoCotacao) {
    const docRef = await addDoc(collection(db, "cotacoes"), novoCotacao);
    return docRef.id;
}

export async function listarCotacoes() {
    let retorno;
    await getDocs(collection(db, "cotacoes"))
        .then((querySnapshot) => {
            retorno = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        });
    return retorno;
}

export async function obterCotacao(id) {
    const docRef = doc(db, "cotacoes", id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
}

export async function excluirCotacao(id) {
    await deleteDoc(doc(db, "cotacoes", id));
}

export async function alterarCotacao(cotacao) {
    await setDoc(doc(db, "cotacoes", cotacao.id), cotacao);
}

