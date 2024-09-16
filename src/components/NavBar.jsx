import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { deslogarUsuario } from "../infra/usuarios";
import Logo from "./Logo";
import { FiMenu } from "react-icons/fi";
import ButtonOutlined from "./ButtonOutlined";
import './css/navbar.css';

export default function NavBar({setUsuario}) {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    function toggle() {
        isOpen ? setIsOpen(false) : setIsOpen(true)
    }

    async function handleClick(e){
        let retorno = await deslogarUsuario();
        setUsuario(retorno);
        navigate("/login");
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
                                <Link to="/">Requisições de Compras</Link>
                            </li>
                            <li>
                                <Link to="/minhas-requisicoes">Minhas Requisições</Link>
                            </li>
                        </ul>
                    </nav>
                    <ButtonOutlined className="self-center" onClick={handleClick}>Logout</ButtonOutlined>
                </div>
            </div>
            <Outlet />
        </div>
    );
}