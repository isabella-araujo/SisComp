import './css/home.css';
import Img from './assets/home.png'
import Title from '../components/Title';

export default function Home() {
    return (
        <div className='container-home'>
            <div className="container-direito">
                <Title>Administre suas compras em um só lugar</Title>

                <p className='texto'>Gerencie cotações e fornecedores de forma simples e eficiente. Cadastre, acompanhe e gerencie todas as cotações e fornecedores em um só lugar.</p>
            </div>
            <div className="container-esquerdo">
                <img src={Img} alt="" />
            </div>
        </div>
    );
}