import { useEffect, useState } from "react";
import Input from "../../components/Input";
import { alterarFornecedor, inserirFornecedor, obterFornecedor } from "./infra/fornecedores";
import obterEnderecoPorCep from "../../infra/viacep";
import Container from "../../components/Container";
import IconButton from "../../components/IconButton";
import { FaSearch } from "react-icons/fa";
import "./../style.css"
import Button from "../../components/Button";
import { validarCamposFornecedor } from "./infra/validar";
import Erro from "../../components/Erro";
import Alerta from "../../components/Alerta";

export default function Cadastro({ idEmEdicao, setIdEmEdicao }) {
    const [fornecedor, setFornecedor] = useState({ nome: "", cnpj: "", endereco: { cep: '' } });
    const [loading, setLoading] = useState(false);
    const [erros, setErros] = useState({ nome: '', cnpj: '', endereco: { cep: '', uf: '' } });

    useEffect(() => {
        async function fetchData() {
            if (idEmEdicao) {
                const fornecedor = await obterFornecedor(idEmEdicao);
                setFornecedor({ nome: fornecedor.nome, cnpj: fornecedor.cnpj, endereco: { cep: fornecedor.endereco.cep } })
            } else {
                setFornecedor({ nome: "", cnpj: "", endereco: {} });
            }
        }

        fetchData();
    }, [idEmEdicao]);

    async function handleSubmit(e) {
        e.preventDefault();
        let valido = validarCamposFornecedor(setErros, fornecedor);

        if (valido) {
            setLoading(true);
            try {
                if (idEmEdicao) {
                    await alterarFornecedor({ ...fornecedor, id: idEmEdicao });
                    setIdEmEdicao('');
                } else {
                    const id = await inserirFornecedor(fornecedor);
                    setIdEmEdicao(id);
                }
            } catch (error) {
                console.error('Erro ao salvar fornecedor:', error);
            } finally {
                setLoading(false);
            }
        }
    }

    async function obterEndereco() {
        let endCep;
        if (fornecedor.endereco.cep.length >= 8 && fornecedor.endereco.cep.length <= 9) {
            setErros({
                ...erros,
                endereco: { cep: '' }
            });

            try {
                endCep = await obterEnderecoPorCep(fornecedor.endereco.cep);

                setFornecedor({
                    ...fornecedor,
                    endereco: { ...endCep, cep: fornecedor.endereco.cep }
                });
            } catch (error) {
                console.error("Endereço não encontrado", error);

                setErros({
                    ...erros,
                    endereco: { cep: 'Endereço não encontrado. Verifique o CEP.' }
                });
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(false);
            setErros({
                ...erros,
                endereco: { cep: 'CEP inválido.' }
            });
        }
    }

    function handleChangeCep(e) {
        const value = e.target.value;

        setFornecedor({ ...fornecedor, endereco: { ...fornecedor.endereco, cep: value } });

        value.length >= 8 && value.length <= 9 ? erros.endereco.cep = "" : erros.endereco.cep = 'O CEP precisa ter entre 8 e 9 caracteres.';
    }

    function handleChangeNome(e) {
        const value = e.target.value;

        setFornecedor({
            ...fornecedor, nome: value
        });

        value.length >= 4 && value.length <= 30 ? erros.nome = '' : erros.nome = 'O nome precisa ter entre 4 e 30 caracteres.';
    }

    function handleChangeCnpj(e) {
        const value = e.target.value;

        setFornecedor({
            ...fornecedor, cnpj: value
        });

        value.length === 18 ? erros.cnpj = '' : erros.cnpj = 'O CNPJ precisa ter 18 caracteres.';
    }

    return (
        <>
            <Container>
                <Input
                    name="nome"
                    type="text"
                    value={fornecedor.nome}
                    placeholder="Nome do Fornecedor"
                    maxLength="30" 
                    size="4"
                    onChange={handleChangeNome}
                />
                {erros.nome && <Erro>{erros.nome}</Erro>}

                <Input
                    name="cnpj"
                    type="text"
                    value={fornecedor.cnpj}
                    placeholder="00.000.000/0000-00"
                    maxLength="18" 
                    size="18"
                    onChange={handleChangeCnpj}
                />
                {erros.cnpj && <Erro>{erros.cnpj}</Erro>}
                
                <div className="container-cep">
                    <Input
                        name="cep"
                        type="text"
                        value={fornecedor.endereco.cep}
                        placeholder="00000-000"
                        maxLength="9" 
                        size="8"
                        onChange={handleChangeCep}
                    />
                    <IconButton onClick={obterEndereco}>
                        <FaSearch />
                    </IconButton>
                </div>
                {erros.endereco.cep && <Erro>{erros.endereco.cep}</Erro>}

                <Input
                    name="logradouro"
                    type="text"
                    value={fornecedor.endereco?.logradouro || ''}
                    placeholder="Logradouro"
                    disabled
                />

                <Input
                    name="bairro"
                    type="text"
                    value={fornecedor.endereco?.bairro || ''}
                    placeholder="Bairro"
                    disabled
                />

                <Input
                    name="uf"
                    type="text"
                    value={fornecedor.endereco?.uf || ''}
                    placeholder="UF"
                    disabled
                />

                {loading && <Alerta>Carregando...</Alerta>}

                <Button onClick={handleSubmit} disabled={loading}>
                    {loading ? 'Salvando...' : 'Salvar'}
                </Button>
                {erros.endereco.uf && <Erro>{erros.endereco.uf}</Erro>}
            </Container>
        </>
    );
}