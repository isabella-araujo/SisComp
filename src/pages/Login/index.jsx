import { FaCartShopping } from "react-icons/fa6";
import './style.css'
import { logarUsuario } from "../../infra/usuarios";

export default function Login({setLogado}) {
    async function handleClick(e) {
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;
        let usuario = await logarUsuario(email, senha);
        if(usuario.id) {
            setLogado(true);
        } else {
            alert("Login inválido");
        }
    }

    return(
        <div className="login">
            <div className="container-login">
                <div className="container-logo">
                    <FaCartShopping className="text-4xl" />
                    <span class="font-semibold text-3xl">ACME</span>
                </div>
                <input className="input" type="email" placeholder="Email" id="email" />
                <input className="input" type="password" placeholder="Senha" id="senha"/>
                <button onClick={handleClick}>
                    Entrar
                </button>
            </div>
        </div>
    );
}