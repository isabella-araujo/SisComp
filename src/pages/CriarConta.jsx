import { Link, useNavigate } from "react-router-dom";
import { criarConta } from "../infra/usuarios";
import Logo from "../components/Logo";
import { inserirColaborador } from "./infra/colaboradores";
import { useEffect, useState } from "react";
import Erro from "../components/Erro";
import Alerta from "../components/Alerta";

export default function CriarConta() {
    const navigate = useNavigate();
    const [erros, setErros] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [credenciais, setCredenciais] = useState({
        email: '',
        confirmarSenha: '',
        senha: '',
        id: '',
        bloqueado: false
    });

    async function handleClick(e) {
        if (credenciais.senha === credenciais.confirmarSenha) {
            let usuario = await criarConta(credenciais.email, credenciais.senha);
            try {
                if (usuario.id) {
                    await inserirColaborador({ ...usuario, bloqueado: false });
                }
            } catch (error) {
                setMensagem("");
                setErros("Erro ao criar a conta.");
                console.error("Ocorreu um erro ao salvar o colaborador: " + error);
            } finally {
                setErros("");
                setMensagem("Conta criada com sucesso!");
            }
        } else {
            setErros("As senhas não são identicas.");
        }
    }

    useEffect(() => {
        setErros('');
        setMensagem('');
    }, [credenciais.senha, credenciais.confirmarSenha]);

    return (
        <div className="login">
            <div className="container-login">
                <Logo />
                <input
                    className="input"
                    type="email"
                    placeholder="Email"
                    value={credenciais.email}
                    onChange={(e) => setCredenciais({ ...credenciais, email: e.target.value })}
                />
                <input
                    className="input"
                    type="password"
                    placeholder="Senha"
                    value={credenciais.senha}
                    onChange={(e) => setCredenciais({ ...credenciais, senha: e.target.value })}
                />
                <input
                    className="input"
                    type="password"
                    placeholder="Confirmar Senha"
                    value={credenciais.confirmarSenha}
                    onChange={(e) => setCredenciais({ ...credenciais, confirmarSenha: e.target.value })}
                />

                <p>Já tem uma conta? <Link to="/login">Entre aqui.</Link></p>

                <button onClick={handleClick}>
                    Criar Conta
                </button>

                {erros &&
                    <Erro>{erros}</Erro>
                }
                {mensagem &&
                    <Alerta>{mensagem}</Alerta>
                }
            </div>
        </div>
    );
}