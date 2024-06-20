import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { alterarFornecedor, excluirFornecedor, inserirFornecedor, obterFornecedor } from "./infra/fornecedores";

export default function Cadastro({ idEmEdicao, setIdEmEdicao }) {
    const { register, handleSubmit, formState: { errors, isSubmitted }, reset, setValue } = useForm();

    useEffect(() => {
        async function fetchData() {
            if (idEmEdicao && !isSubmitted) {
                const fornecedor = await obterFornecedor(idEmEdicao);
                setValue("nome", fornecedor.nome);
                setValue("cnpj", fornecedor.cnpj);
            } else {
                reset();
            }
        }

        fetchData();
    }, [idEmEdicao]);

    async function submeterDados(dados) {
        if(idEmEdicao) {
            await alterarFornecedor({...dados, id: idEmEdicao});
            setIdEmEdicao('');
        } else {
            let id = await inserirFornecedor(dados);
            setIdEmEdicao(id);
        }
        reset();
    }

    async function handleExcluir() {
        await excluirFornecedor(idEmEdicao);
        setIdEmEdicao("");
    }

    return (
        <div>
            <form className="container-cadastro" onSubmit={handleSubmit(submeterDados)}>
            <label className="container-label" htmlFor="nome">Nome</label>
                <input className="container-input" placeholder='Nome' size={50} {...register('nome', {
                    required: "O campo nome é obrigatório",
                    validate: {
                        minLength: (value) => value.length >= 5 || "O campo nome precisa ter pelo menos 5 caracteres",
                        maxLength: (value) => value.length <= 50 || "O campo nome pode ter até 50 caracteres",
                    },
                })} />

                <div className="container-error">
                    {errors.nome?.message && (
                        <div>{errors.nome.message}</div>
                    )}
                </div>

                <label className="container-label" htmlFor="cnpj">CNPJ</label>
                <input className="container-input" placeholder='CNPJ' size={18} {...register('cnpj', {
                    required: "O campo CNPJ é obrigatório",
                    validate: {
                        minLength: (value) => value.length >= 14 || "O campo CNPJ precisa ter pelo menos 10 caracteres",
                        maxLength: (value) => value.length <= 18 || "O campo CNPJ pode ter até 50 caracteres",
                    },
                })} />

                <div className="container-error">
                    {errors.cnpj?.message && (
                        <div>{errors.cnpj.message}</div>
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