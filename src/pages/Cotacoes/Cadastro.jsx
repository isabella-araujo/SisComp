import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { alterarCotacao, excluirCotacao, inserirCotacao, obterCotacao } from "./infra/cotacoes";
import { regexPreco } from "../../assets/Regex";

export default function Cadastro({ idEmEdicao, setIdEmEdicao }) {
    const { register, handleSubmit, formState: { errors, isSubmitted }, reset, setValue } = useForm();

    useEffect(() => {
        async function fetchData() {
            if (idEmEdicao && !isSubmitted) {
                const cotacao = await obterCotacao(idEmEdicao);
                setValue("produto", cotacao.produto);
                setValue("preco", cotacao.preco);
                setValue("dataCompra", cotacao.dataCompra);
            } else {
                reset();
            }
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

    async function handleExcluir() {
        await excluirCotacao(idEmEdicao);
        setIdEmEdicao("");
    }

    return (
        <div>
            <form className="container-cadastro" onSubmit={handleSubmit(submeterDados)}>
                <label className="container-label" htmlFor="produto">Nome do produto</label>
                <input className="container-input" placeholder='Nome do Produto' size={80} {...register('produto', {
                    required: "O campo produto é obrigatório",
                    validate: {
                        minLength: (value) => value.length >= 5 || "O campo produto precisa ter pelo menos 5 caracteres",
                        maxLength: (value) => value.length <= 80 || "O campo produto pode ter até 80 caracteres",
                    },
                })} />

                <div className="container-error">
                    {errors.produto?.message && (
                        <div>{errors.produto.message}</div>
                    )}
                </div>

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
                    <input type="button" value="Excluir" onClick={handleExcluir} />
                </div>
            </form>
        </div>
    );
}