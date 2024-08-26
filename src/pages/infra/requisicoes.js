import { addDoc, collection, getDocs, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../infra/firebase";

export async function inserirRequisicao(novaRequisicao) {
    const docRef = await addDoc(collection(db, "requisições"), {
        requisicao: novaRequisicao,
        criadaEm: serverTimestamp()
    });
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
