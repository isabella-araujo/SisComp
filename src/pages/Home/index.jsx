import './style.css';
import imagem from './imagem.png'

export default function Home() {
    return (
        <div className='flex flex-row'>
            <div className="bg-gray-200 items-center justify-center w-3/6">
                <h1>Administre suas compras em um só lugar</h1>

                <p>Gerencie cotações e fornecedores de forma simples e eficiente. Cadastre, acompanhe e gerencie todas as cotações e fornecedores em um só lugar.</p>
            </div>
            <div className="w-3/6">
                <img className='w-3/5' src={imagem} alt="" />
            </div>
        </div>
    );
}