import './style.css';
import imagem from './imagem.png'

export default function Home() {
    return (
        <div className='container-home'>
            <div className="container-direito">
                <h1 className='titulo-home'>Administre suas compras em um só lugar</h1>

                <p className='texto'>Gerencie cotações e fornecedores de forma simples e eficiente. Cadastre, acompanhe e gerencie todas as cotações e fornecedores em um só lugar.</p>
            </div>
            <div className="container-esquerdo">
                <img className='w-3/5' src={imagem} alt="" />
            </div>
        </div>
    );
}