import { Link, useNavigate } from "react-router-dom";
import { criarConta } from "../infra/usuarios";
import Logo from "../components/Logo";

export default function CriarConta() {
    const navigate = useNavigate();

    async function handleClick(e) {
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;
        const confirmarSenha = document.getElementById("confirmarSenha").value;

        if(senha === confirmarSenha) {
            let usuario = await criarConta(email, senha);
            if(usuario.id) {
                alert("Conta criada com sucesso");
                navigate('/login');
            }
        } else {
            alert("Erro: não foi possível criar a conta");
        }
    }

    return(
        <div className="login">
            <div className="container-login">
                <Logo />
                <input className="input" type="email" placeholder="Email" id="email" />
                <input className="input" type="password" placeholder="Confirmar Senha" id="confirmarSenha"/>
                <input className="input" type="password" placeholder="Senha" id="senha"/>
                <p>Já tem uma conta? <Link to="/login">Entre aqui.</Link></p>
                
                <button onClick={handleClick}>
                    Criar Conta
                </button>
            </div>
        </div>
    );
}