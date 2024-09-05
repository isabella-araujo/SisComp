import { useEffect, useState } from "react";
import { listarRequisicoes } from "./infra/requisicoes";
import Title from "../components/Title";
import './css/listarequisicoes.css'
import RequisicaoAdmin from "../components/RequisicaoAdmin";
import Cadastro from "./Cotacoes/Cadastro";
import Cotacao from "../components/Cotacao";

export default function ListaRequisicoes() {
    const [requisicoes, setRequisicoes] = useState([]);
    const [requisicao, setRequisicao] = useState({});

    useEffect(() => {
        async function fetchData() {
            const requisicoes = await listarRequisicoes();
            const requiOrdernadas = requisicoes.sort((a, b) => new Date(a.criadaEm.seconds * 1000 + a.criadaEm.nanoseconds / 1e6) - new Date(b.criadaEm.seconds * 1000 + b.criadaEm.nanoseconds / 1e6));
            setRequisicoes(requiOrdernadas);
        }
        fetchData()
        console.log("atualizou")
    });

    return (
        <div className="lista-requisicoes">
            <Title>Requisições de Compras</Title>
            <div className="cadastro-cotacao">
                <Cadastro setRequisicao={setRequisicao} requisicao={requisicao} />
            </div>
            <div className="container-requisicoes">
                {requisicoes.map((item, index) => (
                    <div>
                        <RequisicaoAdmin
                            key={index}
                            requisicao={item}
                            setRequisicao={setRequisicao}
                        >
                            {item.cotacoes.map((cotacao, index) => (
                            <Cotacao key={index} cotacao={cotacao} />
                        ))}
                        </RequisicaoAdmin>
                    </div>
                ))}
            </div>
        </div>
    );
}