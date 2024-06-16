import { FaCartShopping } from "react-icons/fa6";
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import './css/style.css'

export default function Navbar() {

    function openMenu() {
        if(menu.classList.contains('close')) {
            menu.classList.remove('close');
            menu.classList.add('open');
        } else {
            menu.classList.remove('open');
            menu.classList.add('close');
        }
    }

    useEffect(() => {
        const menu = document.querySelector("#menu");
    })

    return (
        <div className="container-navbar shadow-lg text-white">

            <div className="container-mobile">
                <div className="container-logo">
                    <FaCartShopping className="text-4xl" />
                    <span className="font-semibold text-3xl tracking-tight">ACME</span>
                </div>
                <FiMenu className="text-4xl" id='icon-menu' onClick={openMenu} />
            </div>

            <div className="container-menu">
                <div className="close" id="menu">
                    <nav>
                        <ul className="container-links">
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to='/fornecedores'>Fornecedores</Link>
                            </li>
                            <li>
                                <Link to='/produtos'>Produtos</Link>
                            </li>
                            <li>
                                <Link to='/cotacoes'>Cotações</Link>
                            </li>
                            <li>
                                <Link to='/contatos'>Contatos</Link>
                            </li>
                        </ul>
                    </nav>
                    <button id="logout" className="text-lg px-4 py-2 mx-6 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Logout</button>
                </div>
            </div>
        </div>
    );
}