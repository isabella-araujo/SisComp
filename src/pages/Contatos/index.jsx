import { useEffect, useState } from "react";
import { listarContatos } from "./infra/contatos";
import ListaContatos from "./ListaContatos";
import Cadastro from "./Cadastro";
import '../style.css'

export default function Contatos() {
    const [contatos, setContatos] = useState([]);
    const [idEmEdicao, setIdEmEdicao] = useState('');

    useEffect(() => {
        async function fetchData() {
            const novaListaContatos = await listarContatos();
            setContatos(novaListaContatos);
        }

        fetchData();
    });

    return(
        <div className="flex flex-col gap-2 px-5 lg:px-10 md:px-5">
            <h3 className="titulo">Contatos</h3>
            <Cadastro idEmEdicao={idEmEdicao} setIdEmEdicao={setIdEmEdicao} />
            <ListaContatos contatos={contatos} setIdEmEdicao={setIdEmEdicao} />
        </div>
    );
}