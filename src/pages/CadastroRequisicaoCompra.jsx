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
import Alerta from "../components/Alerta";
import Erro from "../components/Erro";

export default function CadastroRequisicaoCompra() {
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
        cotacoes: [],
    });
    const [mensagem, setMensagem] = useState('');
    const [erro, setErro] = useState('');

    useEffect(() => {
        async function fetchData() {
            const produtos = await listarProdutos();
            setProdutos(produtos);
        }

        fetchData()
    }, []);

    async function handleSubmit() {
        const id = await inserirRequisicao(requisicao, usuario);
        if (id) {
            setMensagem('Requisição cadastrada com sucesso!');
            setErro('');
        } else {
            setErro('Erro ao cadastrar a requisição');
            setMensagem('');
        }
        console.log(requisicao);
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
                <Perfil usuario={usuario} />
                <Container>
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
                    {mensagem && <Alerta>{mensagem}</Alerta>}
                    {erro && <Erro>{erro}</Erro>}
                </Container>
            </div>
        </div>
    );
}