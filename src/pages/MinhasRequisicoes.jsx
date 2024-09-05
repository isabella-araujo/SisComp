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
            const minhasRequisicoes = requisicoes.filter(item =>  item.idUsuario === usuario.id);
            const requiOrdernadas = requisicoes.sort((a, b) => new Date(a.criadaEm.seconds * 1000 + a.criadaEm.nanoseconds / 1e6) - new Date(b.criadaEm.seconds * 1000 + b.criadaEm.nanoseconds / 1e6));
            setRequisicoes(requiOrdernadas);
        }
        fetchData()
    }, []);

    return (
        <div className="lista-requisicoes">
            <Title>Minhas Requisições</Title>

            <div className="container-requisicoes">
                {requisicoes.map((item) => (<Requisicao key={item.id} requisicao={item} size="86%" />))}
            </div>
        </div>
    );
}