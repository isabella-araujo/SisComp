import { useEffect, useState } from "react";
import { listarRequisicoes } from "./infra/requisicoes";
import Title from "../components/Title";
import Requisicao from "../components/Requisicao";
import './css/listarequisicoes.css'

export default function ListaRequisicoes() {
    const [requisicoes, setRequisicoes] = useState([]);
    // recuperar colaboradores com useEffect
    // exibir colaboradores

    useEffect(() => {
        async function fetchData() {
            const requisicoes = await listarRequisicoes();
            setRequisicoes(requisicoes);
        }
        fetchData()
    }, []);
    return (
        <div className="lista-requisicoes">
            <Title>Requisições de Compras</Title>

            <div className="container-requisicoes">
                {requisicoes.map((item) => (<Requisicao requisicao={item} size="86%" />))}
            </div>
        </div>
    );
}