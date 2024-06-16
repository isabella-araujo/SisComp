import { db } from "../../../infra/firebase";
import { addDoc, collection, deleteDoc, getDocs, getDoc, doc, setDoc } from "firebase/firestore";

export async function inserirContato(novoContato) {
    const docRef = await addDoc(collection(db, "contatos"), novoContato);
    return docRef.id;
}

export async function listarContatos() {
    let retorno;
    await getDocs(collection(db, "contatos"))
        .then((querySnapshot) => {
            retorno = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        });
    return retorno;
}

export async function obterContato(id) {
    const docRef = doc(db, "contatos", id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
}

export async function excluirContato(id) {
    await deleteDoc(doc(db, "contatos", id));
}

export async function alterarContato(contato) {
    await setDoc(doc(db, "contatos", contato.id), contato);
}
