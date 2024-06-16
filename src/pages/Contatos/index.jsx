import { useEffect, useState } from "react";
import { listarContatos } from "./infra/contatos";
import ListaContatos from "./ListaContatos";
import Cadastro from "./Cadastro";

export default function Contatos() {
    const [contatos, setContatos] = useState([]);
    const [idEmEdicao, setIdEmEdicao] = useState('');

    useEffect(() => {
        async function fetchData() {
            const novaListaContatos = await listarContatos();
            setContatos(novaListaContatos);
        }

        fetchData();
    }, [idEmEdicao]);

    return(
        <div className="flex flex-col gap-2 px-5">
            <h3 className="py-5 text-center text-6xl font-bold text-gray-600">Contatos</h3>
            <Cadastro idEmEdicao={idEmEdicao} setIdEmEdicao={setIdEmEdicao} />
            <ListaContatos contatos={contatos} setIdEmEdicao={setIdEmEdicao} />
        </div>
    );
}