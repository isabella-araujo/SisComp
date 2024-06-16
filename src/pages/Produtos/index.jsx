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
    }, [idEmEdicao]);

    return (
        <div className="flex flex-col gap-2 px-5">
            <h3 className="py-5 text-center text-6xl font-bold text-gray-600">Produtos</h3>
            <Cadastro idEmEdicao={idEmEdicao} setIdEmEdicao={setIdEmEdicao} />
            <ListaProdutos produtos={produtos} setIdEmEdicao={setIdEmEdicao} />
        </div>
    );
}