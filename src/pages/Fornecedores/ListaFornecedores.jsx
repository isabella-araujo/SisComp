import DataTable from "react-data-table-component";
import { excluirFornecedor } from "./infra/fornecedores";
import { FaPen, FaTrash } from "react-icons/fa";
import IconButton from "../../components/IconButton";

export default function Lista({fornecedores = [], setIdEmEdicao}) {

    async function handleExcluir(row) {
        const id = row.id;
        console.log(id);
        await excluirFornecedor(id);
    }

    async function handleEditar(row) {
        const id = row.id;
        console.log(id);
        setIdEmEdicao(id);
    }

    const colunas = [
        {
            name: 'Nome',
            selector: row => row.nome,
            sortable: true,
        },
        {
            name: 'CNPJ',
            selector: row => row.cnpj,
            sortable: true,
        },
        {
            name: 'Endereço',
            selector: row => `${row.endereco.logradouro}, ${row.endereco.bairro} - ${row.endereco.uf}`,
            sortable: true,
        },
        {
            name: "",
            cell: row => (
                <div style={{display: 'flex', gap: '10px'}}>
                    <IconButton onClick={() => handleExcluir(row)}>
                        <FaTrash /> 
                    </IconButton>
                    <IconButton onClick={() => handleEditar(row)}>
                        <FaPen />
                    </IconButton>
                </div>
            )
        }
    ];

    const opcoes = { rowsPerPageText: 'Linhas por página:', rangeSeparatorText: 'de' };

    return (
        <>
            <DataTable
                columns={colunas}
                data={fornecedores}
                pagination
                paginationPerPage={5}
                dense
                responsive
                striped
                paginationComponentOptions={opcoes}
                noDataComponent="Cadastro Vazio"
            />
        </>
    );
}