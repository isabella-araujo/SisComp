import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { alterarProduto, excluirProduto, inserirProduto, obterProduto,  } from "./infra/produtos";

export default function Cadastro({ idEmEdicao, setIdEmEdicao }) {
    const { register, handleSubmit, formState: { errors, isSubmitted }, reset, setValue } = useForm();

    useEffect(() => {
        async function fetchData() {
            if (idEmEdicao && !isSubmitted) {
                const produto = await obterProduto(idEmEdicao);
                setValue("nome", produto.nome);
            } else {
                reset();
            }
        }

        fetchData();
    }, [idEmEdicao]);

    async function submeterDados(dados) {
        if(idEmEdicao) {
            await alterarProduto({...dados, id: idEmEdicao});
            setIdEmEdicao('');
        } else {
            let id = await inserirProduto(dados);
            setIdEmEdicao(id);
        }
        reset();
    }

    async function handleExcluir() {
        await excluirProduto(idEmEdicao);
        setIdEmEdicao("");
    }

    return (
        <div>
            <form className="container-cadastro" onSubmit={handleSubmit(submeterDados)}>
                <label className="container-label" htmlFor="nome">Nome</label>
                <input className="container-input" placeholder='Nome' size={80} {...register('nome', {
                    required: "O campo nome é obrigatório",
                    validate: {
                        minLength: (value) => value.length >= 5 || "O campo nome precisa ter pelo menos 5 caracteres",
                        maxLength: (value) => value.length <= 80 || "O campo nome pode ter até 80 caracteres",
                    },
                })} />

                <div className="container-error">
                    {errors.nome?.message && (
                        <div>{errors.nome.message}</div>
                    )}
                </div>

                <div className="container-buttons">
                    <input type="submit" value="Salvar" />
                    <input type="button" value="Excluir" onClick={handleExcluir} />
                </div>
            </form>
        </div>
    );
}