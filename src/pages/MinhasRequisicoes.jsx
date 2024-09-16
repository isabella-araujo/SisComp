import { useContext, useEffect, useState } from "react";
import { listarRequisicoes } from "./infra/requisicoes";
import Requisicao from "../components/Requisicao";
import Title from "../components/Title";
import { UserContext } from "../assets/UserContext";
import Button from "../components/Button";

export default function MinhasRequisicoes() {
    const [requisicoes, setRequisicoes] = useState([]);
    const usuario = useContext(UserContext);

    useEffect(() => {
        async function fetchData() {
            await atualizarRequisicoes();
        }
        fetchData()
    }, []);

    async function atualizarRequisicoes() {
        const requisicoes = await listarRequisicoes();
        const minhasRequisicoes = requisicoes.filter(item => item.idUsuario === usuario.id);
        const requiOrdernadas = minhasRequisicoes.sort((a, b) => new Date(a.criadaEm.seconds * 1000 + a.criadaEm.nanoseconds / 1e6) - new Date(b.criadaEm.seconds * 1000 + b.criadaEm.nanoseconds / 1e6));
        setRequisicoes(requiOrdernadas);
    }

    return (
        <div className="lista-requisicoes">
            <Title>Minhas Requisições</Title>
            <Button size="200px" onClick={atualizarRequisicoes}>Atualizar Requisições</Button>
            {requisicoes.length == 0 &&
                <p>Sem requisições</p>
            }
            {requisicoes.length > 0 &&
                <div className="container-requisicoes">
                    {requisicoes.map((item) => (<Requisicao key={item.id} requisicao={item} size="86%" />))}
                </div>
            }
        </div>
    );
}