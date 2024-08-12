import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { alterarCotacao, excluirCotacao, inserirCotacao, obterCotacao } from "./infra/cotacoes";
import { regexPreco } from "../../assets/Regex";
import { listarProdutos } from "../Produtos/infra/produtos";
import { listarFornecedores } from "../Fornecedores/infra/fornecedores";


export default function Cadastro({ idEmEdicao, setIdEmEdicao }) {
    const { register, handleSubmit, formState: { errors, isSubmitted }, reset, setValue } = useForm();
    const [produtos, setProdutos] = useState([]);
    const [fornecedores, setFornecedores] = useState([]);

    useEffect(() => {
        async function fetchData() {
            if (idEmEdicao && !isSubmitted) {
                const cotacao = await obterCotacao(idEmEdicao);
                setValue("produto", cotacao.produto);
                setValue("preco", cotacao.preco);
                setValue("dataCompra", cotacao.dataCompra);
                setValue("fornecedor", cotacao.fornecedor);
            } else {
                reset();
            }

            const produtos = await listarProdutos();
            setProdutos(produtos);
            const fornecedores = await listarFornecedores();
            setFornecedores(fornecedores);
        }

        fetchData();
    }, [idEmEdicao]);

    async function submeterDados(dados) {
        if(idEmEdicao) {
            await alterarCotacao({...dados, id: idEmEdicao});
            setIdEmEdicao('');
        } else {
            let id = await inserirCotacao(dados);
            setIdEmEdicao(id);
        }
        reset();
    }

    return (
        <div>
            <form className="container-cadastro" onSubmit={handleSubmit(submeterDados)}>

                <label className="container-label" htmlFor="produtos">Escolha um produto:</label>
                <select className="container-input" name="produtos" {...register("produto", {
                    required: "O campo produto é obrigatório"
                })}
                    defaultValue=""
                >
                    <option value="" selected disabled>Selecione um produto...</option>
                    {produtos.map(produto => (
                        <option value={produto.nome} key={produto.id}>{produto.nome}</option>
                    ))}
                </select>

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

                <label className="container-label" htmlFor="dataCompra">Data da Compra</label>
                <input type="date" className="container-input" {...register('dataCompra', {
                    required: "O campo data da compra é obrigatório",
                })} />

                <div className="container-error">
                    {errors.dataCompra?.message && (
                        <div>{errors.dataCompra.message}</div>
                    )}
                </div>

                <div className="container-buttons">
                    <input type="submit" value="Salvar" />
                </div>
            </form>
        </div>
    );
}