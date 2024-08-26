import { useEffect, useState } from "react";
import { listarRequisicoes } from "./infra/requisicoes";
import Title from "../components/Title";
import './css/listarequisicoes.css'
import RequisicaoAdmin from "../components/RequisicaoAdmin";

export default function ListaRequisicoes() {
    const [requisicoes, setRequisicoes] = useState([]);
    const [open, setOpen] = useState(true);
    
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
                {requisicoes.map((item, index) => (
                    <RequisicaoAdmin 
                        key={index}
                        requisicao={item} 
                        size="86%" 
                    />))
                }
            </div>
        </div>
    );
}