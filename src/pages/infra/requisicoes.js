import { addDoc, collection, getDocs, doc, setDoc, serverTimestamp, deleteDoc } from "firebase/firestore";
import { db } from "../../infra/firebase";

export async function inserirRequisicao(novaRequisicao) {
    novaRequisicao.criadaEm = serverTimestamp();

    const docRef = await addDoc(collection(db, "requisições"), novaRequisicao);

    return docRef.id;
}

export async function listarRequisicoes() {
    let retorno;
    await getDocs(collection(db, "requisições"))
        .then((querySnapshot) => {
            retorno = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        });
    console.log(retorno)
    return retorno;
}

export async function alterarRequisicao(requisicao) {
    await setDoc(doc(db, "requisições", requisicao.id), requisicao);
}

export async function excluirRequisicao(id) {
    await deleteDoc(doc(db, "requisições", id));
}
