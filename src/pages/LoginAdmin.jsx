import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Logo from "../components/Logo";
import './css/login.css'
import Erro from "../components/Erro";
import { useState } from "react";

export default function LoginAdmin({ setAdmin }) {
    const navigate = useNavigate();
    const [erro, setErro] = useState('');

    function logarAdmin(e) {
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        if(email === "admin1@admin.acme.com.br" && senha === "admin123") {
            setAdmin(true);
            navigate('/');
            setErro('');
        } else {
            setErro("Credenciais inválidas");
        }
    }

    return (
        <div className="login">
            <div className="container-login">
                <Logo />
                <input className="input" type="email" placeholder="Email" id="email" />
                <input className="input" type="password" placeholder="Senha" id="senha"/>
                <p>É colaborador? <Link className="links" to="/login">Entre aqui.</Link></p>
                
                <button onClick={logarAdmin}>
                    Entrar
                </button>

                { erro &&
                    <Erro>{erro}</Erro>
                }
            </div>
        </div>
    );
}