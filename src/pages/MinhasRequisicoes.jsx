import { useContext, useEffect, useState } from "react";
import { listarRequisicoes } from "./infra/requisicoes";
import Requisicao from "../components/Requisicao";
import Title from "../components/Title";
import { UserContext } from "../assets/UserContext";

export default function MinhasRequisicoes() {
    const [requisicoes, setRequisicoes] = useState([]);
    const usuario = useContext(UserContext);
    useEffect(() => {
        async function fetchData() {
            const requisicoes = await listarRequisicoes();
            const minhasRequisicoes = requisicoes.filter(item =>  item.requisicao.idUsuario === usuario.id);

            setRequisicoes(minhasRequisicoes);
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