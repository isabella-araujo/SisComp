import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { regexEmail, regexNumerico } from "../../assets/Regex";
import { excluirContato, inserirContato, obterContato, alterarContato } from "./infra/contatos";
import { listarFornecedores } from "../Fornecedores/infra/fornecedores";

export default function Cadastro({ idEmEdicao, setIdEmEdicao }) {
    const { register, handleSubmit, formState: { errors, isSubmitted }, reset, setValue } = useForm();
    const [fornecedores, setFornecedores] = useState([]);

    useEffect(() => {
        async function fetchData() {
            if (idEmEdicao && !isSubmitted) {
                const contato = await obterContato(idEmEdicao);
                setValue("fornecedor", contato.fornecedor);
                setValue("email", contato.email);
                setValue("fone", contato.fone);
            } else {
                reset();
            }

            const fornecedores = await listarFornecedores();
            setFornecedores(fornecedores);
        }

        fetchData();
    }, [idEmEdicao]);

    async function submeterDados(dados) {
        if(idEmEdicao) {
            await alterarContato({...dados, id: idEmEdicao});
            setIdEmEdicao('');
        } else {
            let id = await inserirContato(dados);
            setIdEmEdicao(id);
        }
        reset();
    }

    async function handleExcluir() {
        await excluirContato(idEmEdicao);
        setIdEmEdicao("");
    }

    return (
        <div>
            <form className="container-cadastro" onSubmit={handleSubmit(submeterDados)}>

                <label className="container-label" htmlFor="fornecedores">Fornecedor</label>
                <select className="container-input" name="fornecedores" {...register("fornecedor", {
                    required: "O campo fornecedor é obrigatório"
                })}>
                    {fornecedores.map(fornecedor => (
                        <option value={fornecedor.nome} key={fornecedor.id}>{fornecedor.nome}</option>
                    ))}
                </select>

                <label className="container-label" htmlFor="email">Email</label>
                <input className="container-input" placeholder='Email' size={30} {...register('email', {
                    required: "O campo email é obrigatório",
                    validate: {
                        minLength: (value) => value.length >= 5 || "O campo email precisa ter pelo menos 5 caracteres",
                        maxLength: (value) => value.length <= 30 || "O campo email pode ter até 30 caracteres",
                        matchPattern: (value) => regexEmail.test(value) || "Email inválido"
                    },
                })} />

                <div className="container-error">
                    {errors.email?.message && (
                        <div>{errors.email.message}</div>
                    )}
                </div>

                <label className="container-label" htmlFor="fone">Telefone</label>
                <input className="container-input" placeholder='Telefone' size={14} {...register('fone', {
                    required: "O campo telefone é obrigatório",
                    validate: {
                        minLength: (value) => value.length >= 8 || "O campo telefone precisa ter pelo menos 8 dígitos",
                        matchPattern: (value) => regexNumerico.test(value) || "O campo telefone tem que ser numérico",
                    },
                })} />

                <div className="container-error">
                    {errors.fone?.message && (
                        <div>{errors.fone.message}</div>
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