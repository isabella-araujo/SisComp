import obterEnderecoPorCep from "../../../infra/viacep";

export function validarCamposFornecedor(setErros, fornecedor) {
    let valido = true;
    const novosErros = { nome: '', cnpj: '', endereco: { cep: '', uf:'' } };

    if (!fornecedor.nome || fornecedor.nome.length <= 4 || fornecedor.nome.length >= 30) {
        novosErros.nome = 'O nome precisa ter entre 4 e 30 caracteres.';
        valido = false;
    }

    if (!fornecedor.cnpj || fornecedor.cnpj.length !== 18) {
        novosErros.cnpj = 'O CNPJ precisa ter 18 caracteres.';
        valido = false;
    }

    if (!fornecedor.endereco.cep || fornecedor.endereco.cep.length < 8 || fornecedor.endereco.cep.length > 9) {
        novosErros.endereco.cep = 'O CEP precisa ter entre 8 e 9 caracteres.';
        valido = false;
    }

    if(!fornecedor.endereco.uf) {
        novosErros.endereco.uf = "É preciso fornecer o endereço para cadastrar."
    }

    setErros(novosErros);
    return valido;
}

// export async function validarEndereco(cep, setErros, erros) {
//     let endCep = {};
//     const novosErros = { endereco: { cep: '', uf:'' } };

//     if (cep.length >= 8 && cep.length <= 9) {
        
//         try {
//             endCep = await obterEnderecoPorCep(cep);
//         } catch (error) {
//             console.error("Endereço não encontrado:", error);
//             novosErros.endereco.cep = 'Endereço não encontrado. Verifique o CEP.'
//         }

//     } else {
//        novosErros.endereco.cep = 'CEP inválido.' 
//     }

//     setErros({...erros, novosErros})
//     return endCep;
// }