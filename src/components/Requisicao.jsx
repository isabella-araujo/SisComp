import './css/requisicao.css'
import Title from './Title';

export default function Requisicao({ requisicao, size }) {
    const styles = {
        requisicao: {
            width: size ? size : '100%',
        }
    }

    return (
        <div style={styles.requisicao} className="requisicao">
            <div className="container-header">
                <div className='container-info'>
                    <Title color='#f0f0f0' size='1rem'>ID do Colaborador:</Title>
                    <p>{requisicao.requisicao.idUsuario}</p>
                </div>
                <div className='container-info'>
                    <Title color='#f0f0f0' size='1rem'>Status:</Title>
                    <p>Aberta</p>
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
                    <Title  size='1rem'>Observações:</Title>
                    <p>{requisicao.requisicao.observacoes}</p>
                </div>
            </div>
        </div>
    );
}