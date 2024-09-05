import './css/login.css'
import { logarUsuario } from "../infra/usuarios";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { useState } from "react";
import Erro from "../components/Erro";

export default function Login({setUsuario}) {
    const navigate = useNavigate();
    const [erro, setErro] = useState('');

    async function handleClick(e) {
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;
        let usuario = await logarUsuario(email, senha);
        if(usuario.id) {
            setUsuario(usuario);
            navigate("/");
            setErro('');
        } else {
            setErro("Credenciais inválidas");
        }
    }

    return(
        <div className="login">
            <div className="container-login">
                <Logo />
                <input className="input" type="email" placeholder="Email" id="email" />
                <input className="input" type="password" placeholder="Senha" id="senha"/>
                <p>É administrador? <Link className="links" to="/login-admin">Entre aqui</Link></p>
                <p>Ainda não tem uma conta? <Link className="links" to="/criar-conta">Criar conta</Link></p>
                
                <button onClick={handleClick}>
                    Entrar
                </button>

                { erro &&
                    <Erro>{erro}</Erro>
                }
            </div>
        </div>
    );
}