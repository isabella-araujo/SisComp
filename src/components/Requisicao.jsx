import { useEffect, useState } from 'react';
import './css/requisicao.css'
import Title from './Title';

export default function Requisicao({ requisicao, size }) {
    const [status, setStatus] = useState('');
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
        } else {
            status = "Aberta";
        }
        setStatus(status);
    }

    useEffect(() => {
        definirStatus();
    }, [requisicao]);

    return (
        <div style={styles.requisicao} className="requisicao">
            <div className="container-header">
                <div className='container-info'>
                    <Title color='#f0f0f0' size='1rem'>ID do Colaborador:</Title>
                    <p>{requisicao.requisicao.idUsuario}</p>
                </div>
                <div className='container-info'>
                    <Title color='#f0f0f0' size='1rem'>Status:</Title>
                    <p>{status}</p>
                </div>
            </div>
            <div className="container-section">
                <div className='container-info'>
                    <Title size='1rem'>Produto:</Title>
                    <p>{requisicao.requisicao.produto.nome}</p>
                </div>
                <div className='container-info'>
                    <Title size='1rem'>Quantidade:</Title>
                    <p>{requisicao.requisicao.quantidade}</p>
                </div>
                <div className='container-info-obse'>
                    <Title size='1rem'>Observações:</Title>
                    <p>{requisicao.requisicao.observacoes}</p>
                </div>
            </div>
        </div>
    );
}