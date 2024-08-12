import { useEffect, useState } from "react";
import { listarProdutos } from "./infra/produtos";
import ListaProdutos from "./ListaProdutos";
import Cadastro from "./Cadastro";

export default function Produtos() {
    const [produtos, setProdutos] = useState([]);
    const [idEmEdicao, setIdEmEdicao] = useState('');

    useEffect(() => {
        async function fetchData() {
            const novaListaProdutos = await listarProdutos();
            setProdutos(novaListaProdutos);
        }

        fetchData();
    });

    return (
        <div className="flex flex-col gap-2 px-5 lg:px-10 md:px-5">
            <h3 className="titulo">Produtos</h3>
            <Cadastro idEmEdicao={idEmEdicao} setIdEmEdicao={setIdEmEdicao} />
            <ListaProdutos produtos={produtos} setIdEmEdicao={setIdEmEdicao} />
        </div>
    );
}