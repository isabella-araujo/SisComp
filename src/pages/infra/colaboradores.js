import { addDoc, collection, doc, getDocs, setDoc } from "@firebase/firestore";
import { db } from "../../infra/firebase";

export async function inserirColaborador(novoColaborador) {
    const docRef = await addDoc(collection(db, "colaboradores"), novoColaborador);
    return docRef.id;
}

export async function listarColaboradores() {
    let retorno;
    await getDocs(collection(db, "colaboradores"))
        .then((querySnapshot) => {
            retorno = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        });
    return retorno;
}

export async function alterarColaborador(colaborador) {
    await setDoc(doc(db, "colaboradores", colaborador.id), colaborador);
}