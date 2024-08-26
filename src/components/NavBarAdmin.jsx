import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ButtonOutlined from "./ButtonOutlined";
import Logo from "./Logo";
import { FiMenu } from "react-icons/fi";
import './css/navbar.css';

export default function NavBarAdmin({setAdmin}) {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    function toggle() {
        isOpen ? setIsOpen(false) : setIsOpen(true)
    }

    function handleClick(e) {
        setAdmin(false);
        navigate("/login-admin");
    }

    return (
        <div className="container-navbar shadow-lg text-white">
            <div className="container-logo">
                <Logo />
            </div>
            <div className="container-mobile">
                <Logo />
                <FiMenu className="text-4xl" onClick={toggle} />
            </div>

            <div className="container-menu">
                <div className={isOpen ? "open" : "close"} id="menu">
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
                                <Link to='/contatos'>Contatos</Link>
                            </li>
                            <li>
                                <Link to='/lista-requisicoes'>Requisições</Link>
                            </li>
                        </ul>
                    </nav>
                    <ButtonOutlined onClick={handleClick}>Logout</ButtonOutlined>
                </div>
            </div>
            <Outlet />
        </div>
    );
}