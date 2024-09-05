import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { alterarCotacao, excluirCotacao, inserirCotacao, obterCotacao } from "./infra/cotacoes";
import { regexPreco } from "../../assets/Regex";
import { listarProdutos } from "../Produtos/infra/produtos";
import { listarFornecedores } from "../Fornecedores/infra/fornecedores";
import { alterarRequisicao } from "../infra/requisicoes";
import Title from "../../components/Title";

export default function Cadastro({ idEmEdicao, setIdEmEdicao, setRequisicao, requisicao }) {
    const { register, handleSubmit, formState: { errors, isSubmitted }, reset, setValue } = useForm();
    const [fornecedores, setFornecedores] = useState([]);

    useEffect(() => {
        async function fetchData() {
            if (idEmEdicao && !isSubmitted) {
                const cotacao = await obterCotacao(idEmEdicao);
                setValue("preco", cotacao.preco);
                setValue("fornecedor", cotacao.fornecedor);
            } else {
                reset();
            }
            const fornecedores = await listarFornecedores();
            setFornecedores(fornecedores);
        }

        fetchData();
    }, [idEmEdicao]);

    async function submeterDados(dados) {
        if (idEmEdicao) {
            await alterarCotacao({ ...dados, id: idEmEdicao });
            setIdEmEdicao('');
            setRequisicao({});
        } else {
            console.log(dados)
            let id = await inserirCotacao(dados);
            await alterarRequisicao({ ...requisicao, cotacoes: [...(requisicao.cotacoes || []), dados] });
        }
        reset();
    }

    return (
        <div>
            <form className="container-cadastro" onSubmit={handleSubmit(submeterDados)}>
                <Title size='1.5rem'>Cotando requisição: {requisicao.id}</Title>
                <label className="container-label" htmlFor="fornecedores">Fornecedor</label>
                <select className="container-input" name="fornecedores" {...register("fornecedor", {
                    required: "O campo fornecedor é obrigatório"
                })}
                    defaultValue=""
                >
                    <option value="" selected disabled>Selecione um fornecedor...</option>
                    {fornecedores.map(fornecedor => (
                        <option value={fornecedor.nome} key={fornecedor.id}>{fornecedor.nome}</option>
                    ))}
                </select>

                <label className="container-label" htmlFor="preco">Preço</label>
                <input className="container-input" placeholder='Preço' size={10} {...register('preco', {
                    required: "O campo preço é obrigatório",
                    validate: {
                        matchPattern: (value) => regexPreco.test(value) || "O campo preço deve ser númerico.",
                    },
                })} />

                <div className="container-error">
                    {errors.preco?.message && (
                        <div>{errors.preco.message}</div>
                    )}
                </div>

                <div className="container-buttons">
                    <input type="submit" value="Salvar" />
                </div>
            </form>
        </div>
    );
}