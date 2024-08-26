import { useContext, useEffect, useState } from "react";
import { listarProdutos } from "./Produtos/infra/produtos";
import Container from "../components/Container";
import { UserContext } from "../assets/UserContext";
import Input from "../components/Input";
import Button from "../components/Button";
import Title from "../components/Title";
import Perfil from "../components/Perfil";
import './css/requisicaocompra.css'
import { inserirRequisicao, listarRequisicoes } from "./infra/requisicoes";

export default function RequisicaoCompra() {
    const [produtos, setProdutos] = useState([]);
    const [produto, setProduto] = useState({
        id: '',
        nome: ''
    });
    const usuario = useContext(UserContext);
    const [requisicao, setRequisicao] = useState({
        idUsuario: usuario.id,
        produto: {},
        quantidade: 0,
        observacoes: "",
        cotacoes: [null],
    });
    const [requisicoes, setRequisicoes] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const produtos = await listarProdutos();
            setProdutos(produtos);
            const requisicoes = await listarRequisicoes();
            const minhasRequisicoes = requisicoes.filter(item =>  item.requisicao.idUsuario === usuario.id);

            setRequisicoes(minhasRequisicoes);
        }

        fetchData()
    }, []);

    async function handleSubmit() {
        await inserirRequisicao(requisicao, usuario);
        console.log(requisicao)
    }


    function handleChange(e) {
        const produtoId = e.target.value;
        const produtoSelecionado = produtos.find(item => item.id === produtoId);

        setProduto(produtoSelecionado);

        if (produtoSelecionado) {
            setRequisicao({ ...requisicao, produto: produtoSelecionado });
        }
    }


    return (
        <div className="requisicao-compra">
            <Title>Requisições de Compras</Title>
            <div className="container-requisicao-compra">
                <Perfil width='90%' usuario={usuario} />
                <Container width='90%'>
                    <div className="container-cadastro-header">
                        <div className="container-status">
                            <Title size='1rem'>ID do Colaborador:</Title>
                            <p> {usuario.id}</p>
                        </div>
                    </div>

                    <select
                        className="container-input"
                        value={produto.id}
                        onChange={handleChange}
                    >
                        <option value='' selected disabled>Selecione um produto...</option>
                        {produtos.map(item => (
                            <option value={item.id} key={item.id}>{item.nome}</option>
                        ))}
                    </select>
                    <Input
                        name="quantidade"
                        type="number"
                        value={requisicao.quantidade}
                        placeholder="Quantidade"
                        maxLength="30"
                        size="4"
                        onChange={(e) => setRequisicao({ ...requisicao, quantidade: e.target.value })}
                    />
                    <textarea
                        className="container-input"
                        placeholder="Observações..."
                        value={requisicao.observacoes}
                        onChange={(e) => setRequisicao({ ...requisicao, observacoes: e.target.value })}
                        style={{ resize: 'none', height: '100px', width: 'auto' }}
                    />

                    <Button onClick={handleSubmit}>
                        Cadastrar
                    </Button>
                </Container>
            </div>
        </div>
    );
}