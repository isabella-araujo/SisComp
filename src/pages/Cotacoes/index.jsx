import { useEffect, useState } from "react";
import { listarCotacoes } from "./infra/cotacoes";
import ListaCotacaos from "./ListaCotacoes";
import Cadastro from "./Cadastro";

export default function Cotacoes() {
    const [cotacoes, setCotacaos] = useState([]);
    const [idEmEdicao, setIdEmEdicao] = useState('');

    useEffect(() => {
        async function fetchData() {
            const novaListaCotacaos = await listarCotacoes();
            setCotacaos(novaListaCotacaos);
        }

        fetchData();
    }, [idEmEdicao]);

    return(
        <div className="flex flex-col gap-2 px-5">
            <h3 className="py-5 text-center text-6xl font-bold text-gray-600">Cotações</h3>
            <Cadastro idEmEdicao={idEmEdicao} setIdEmEdicao={setIdEmEdicao} />
            <ListaCotacaos cotacoes={cotacoes} setIdEmEdicao={setIdEmEdicao} />
        </div>
    );
}