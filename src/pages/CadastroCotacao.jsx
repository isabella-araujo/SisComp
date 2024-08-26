import { useState } from "react";
import Title from "../components/Title";
import Container from "../components/Container";
import Input from "../components/Input";
import Button from "../components/Button";
import { inserirCotacao } from "./infra/cotacoes";
import { alterarRequisicao } from "./infra/requisicoes";

export default function CadastroCotacao({ requisicao, idRequisicao }) {
    const [cotacao, setCotacao] = useState({
        idRequisicao: idRequisicao,
        preco: '',
        data: '',
    });

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await inserirCotacao(cotacao);
            await alterarRequisicao({...requisicao, cotacao: cotacao})
        } catch (error) {
            console.error('Erro ao salvar requisicao:', error);
        }
        // chamar inserirCotacao.
        // chamar alterarRequisicao ({..requisicao, cotacao})
    }

    return (
        <div className="cadastro-cotacao">
            <Title>Cotação</Title>
            <div>
                <Title size='1rem'>ID da Requisição:</Title>
                <p>{idRequisicao}</p>
                <Container>
                    <Input
                        type='number'
                        placeholder='Preço'
                        value={cotacao.preco}
                        onClick={(e) => setCotacao({ ...cotacao, preco: e.target.value })}

                    />
                    <Input
                        type='date'
                        value={cotacao.data}
                        onClick={(e) => setCotacao({ ...cotacao, data: e.target.value })}
                    />
                    <Button size='40%' onClick={handleSubmit}>Salvar</Button>
                </Container>
            </div>
        </div>
    );
}