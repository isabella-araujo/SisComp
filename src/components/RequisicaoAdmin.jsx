import { useEffect, useState } from 'react';
import Button from './Button';
import './css/requisicao.css'
import Title from './Title';
import { excluirCotacao } from '../pages/infra/cotacoes';
import { excluirRequisicao } from '../pages/infra/requisicoes';

export default function RequisicaoAdmin({ requisicao, setRequisicao, size, children }) {
    const [status, setStatus] = useState('');
    const dataFormatada = new Date(requisicao.criadaEm.seconds * 1000 + requisicao.criadaEm.nanoseconds / 1e6).toLocaleString();
    const styles = {
        requisicao: {
            width: size ? size : '100%',
        }
    }

    function definirStatus() {
        let status = '';
        if (requisicao.cotacoes?.length >= 3) {
            status = "Cotada";
        } else if (requisicao.cotacoes?.length >= 1 && requisicao.cotacoes?.length <= 3) {
            status = "Em cotação";
        } else if(requisicao.cotacoes?.length === 0) {
            status = "Aberta";
        }
        setStatus(status);
    }

    useEffect(() => {
        console.log(requisicao);
        definirStatus();
    }, [requisicao]);

    return (
        <div style={styles.requisicao} className="requisicao">
            <div className="container-header">
                <div className='container-info'>
                    <Title color='#f0f0f0' size='1rem'>ID da Requisição:</Title>
                    <p>{requisicao.id}</p> 
                </div>
                <div className='container-info'>
                    <Title color='#f0f0f0' size='1rem'>Status:</Title>
                    <p>{status}</p>
                </div>
            </div>
            <div className="container-section">
                <div className='container-info'>
                    <Title size='1rem'>ID do Colaborador:</Title>
                    <p>{requisicao.idUsuario}</p> 
                </div>
                <div className='container-info'>
                    <Title size='1rem'>Data de Criação:</Title>
                    <p>{dataFormatada}</p>
                </div>
                <div className='container-info'>
                    <Title size='1rem'>Produto:</Title>
                    <p>{requisicao.produto.nome}</p>
                </div>
                <div className='container-info'>
                    <Title size='1rem'>Quantidade:</Title>
                    <p>{requisicao.quantidade}</p>
                </div>
                <div className='container-info-obse'>
                    <Title size='1rem'>Observações:</Title>
                    <p>{requisicao.observacoes}</p>
                </div>
                <Button onClick={() => setRequisicao(requisicao)} size='40%'>Adicionar Cotação</Button>
                
                {children}
            </div>
        </div>
    );
}