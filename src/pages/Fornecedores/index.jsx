import { useEffect, useState } from "react";
import { listarFornecedores } from "./infra/fornecedores";
import ListaCotacaos from "./ListaFornecedores";
import Cadastro from "./Cadastro";

export default function Fornecedores() {
    const [fornecedores, setFornecedores] = useState([]);
    const [idEmEdicao, setIdEmEdicao] = useState("");

    useEffect(() => {
        async function fetchData() {
            const novaListaFornecedores = await listarFornecedores();
            setFornecedores(novaListaFornecedores);
        }

        fetchData();
    });

    return (
        <div className="flex flex-col gap-2 px-5 lg:px-10 md:px-5">
            <h3 className="titulo">Fornecedores</h3>
            <Cadastro idEmEdicao={idEmEdicao} setIdEmEdicao={setIdEmEdicao} />
            <ListaCotacaos fornecedores={fornecedores} setIdEmEdicao={setIdEmEdicao} />
        </div>
    );
}